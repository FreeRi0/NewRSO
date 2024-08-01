<template>
    <div class="squad-metric">
        <squadBanner :banner="squad.banner"></squadBanner>
        <squadAvatar :emblem="squad.emblem"></squadAvatar>
        <div class="squad-metric__bottom">
            <div class="squad-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ squad.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="squad.slogan && squad.slogan != 'null'">
                        {{ squad.slogan }}
                    </p>
                </div>
                <div class="squad__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university" v-if="squad.educational_institution?.short_name">
                            <p>
                                {{ squad.educational_institution?.short_name }}
                            </p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания ЛСО</p>
                            <img src="@/app/assets/icon/calendar.svg" alt="calendar" />
                            <time datetime="2022-09-10">{{
                                squad.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="squad-data__contacts-wrapper">
                    <div class="squad-data__contacts">
                        <div class="squad-data__participant-counter">
                            <span>{{ squad.participants_count }}
                                {{ ending }}</span>
                        </div>
                        <div class="squad-data__social-network">
                            <div class="squad-data__link-vk" v-if="
                                squad.social_vk && squad.social_vk != 'null'
                            ">
                                <a :href="squad.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="squad-data__link-telegram" v-if="
                                squad.social_tg && squad.social_tg != 'null'
                            ">
                                <a :href="squad.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="squad-data__link-share-link">
                                <a @click="copyL">
                                    <img src="@/app/assets/icon/to-share-link.svg" alt="" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                        </div>
                    </div>

                    <router-link v-if="
                        userId == squad.commander?.id ||
                        userId == regional.commander?.id ||
                        IsTrusted
                    " :to="{
                        name: 'EditLSO',
                        params: { id: squad.id },
                    }" class="user-data__link">Редактировать отряд</router-link>

                    <Button v-else-if="!IsMember && Object.keys(applications).length === 0 && userStore.currentUser.detachment_id === null" @click="AddApplication()" label="Подать заявку"
                        class="AddApplication"></Button>

                    <div v-else-if="Object.keys(applications).length !== 0" class="d-flex">
                        <div class="user-data__link mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button @click="DeleteApplication()" label="Удалить заявку" class="AddApplication"></Button>
                    </div>

                    <!--find искать id в computed-->

                    <div v-else-if="IsMember" class="user-data__link">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
                </p>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.error }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, inject, computed } from 'vue';
import { squadAvatar } from '@shared/components/imagescomp';
import { squadBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Button } from '@shared/components/buttons';
const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    squad: {
        type: Object,
        required: true,
    },
    member: {
        type: Array,
    },
    applications: {
        type: Array,
    },
    ending: {
        type: String,
    },
});

const roleStore = useRoleStore();
const userStore = useUserStore();
const route = useRoute();
const user = storeToRefs(userStore);
const roles = storeToRefs(roleStore);
let userId = computed(() => {
    return user.currentUser.value.id;
});

const regional = ref({});
const data = ref({});
const isError = ref([]);
const applications = ref({});
const swal = inject('$swal');

const filterApplications = async (id) => {
    try {
        const response = await HTTP.get(`/detachments/${id}/applications/?user_id=${userId.value}`);
        applications.value = response.data;
        console.log(applications.value)
    } catch (error) {
        console.log('an error occured ' + error);
    }
}
const viewRegionals = async () => {
    let id = props.squad.regional_headquarter;
    await HTTP.get(`/regionals/${id}/`)
        .then((response) => {
            regional.value = response.data;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};


const IsMember = computed(() => {
    return props.member.find((item) => item.user.id === userId.value);
});
const IsTrusted = computed(() => {
    return props.member.find(
        (item) => item.user.id === userId.value && item.is_trusted === true,
    );
});


watch(
    () => props.squad,

    (newSquad) => {
        if (Object.keys(props.squad).length === 0) {
            return;
        }
        filterApplications(props.squad.id);
        viewRegionals();
    },
);

const AddApplication = async () => {
    try {
        let id = props.squad.id;
        const sendResponse = await HTTP.post(
            `/detachments/${id}/apply/`,
            data.value,
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        sendResponse.data.user = applications.value;
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const DeleteApplication = async () => {
    try {
        let id = props.squad.id;
        const delApplyResp = await HTTP.delete(`/detachments/${id}/apply/`);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        applications.value = {};
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};


const copyL = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyMessage = document.querySelector('.copy-message');
    copyMessage.hidden = false;
    setTimeout(() => {
        copyMessage.hidden = true;
    }, 2000);
};
</script>
<style lang="scss" scoped>
.squad-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 16px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);

    @media screen and (max-width: 575px) {
        display: block;
    }

    &__bottom {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
        padding: 20px 0px 16px 300px;
    }
}

.squad-metric__bottom {
    @media screen and (max-width: 575px) {
        padding: 20px 0px 16px 0;
        text-align: center;
    }
}

/* Данные пользователя */
.squad-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    @media screen and (max-width: 575px) {
        align-items: center;
        margin: 0px 0 16px 0;
        flex-wrap: wrap;
    }
}

.user-metric__avatar-wrapper {
    @media screen and (max-width: 575px) {
        grid-template-columns: 125px 125px;
        justify-content: center;
        margin-left: 64px;
    }
}

.squad-data__name {
    margin-bottom: 32px;
}

.squad-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.squad-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}

.squad-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.squad-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.squad-data__list p,
.squad-data__list time {
    color: #35383f;
    /*  */
    font-family: 'Bert Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.squad-data__introductions {
    display: flex;
    align-items: center;
}

.AddApplication {
    margin: 0px;
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.squad-data__introductions p,
.squad-data__introductions img {
    margin-right: 5px;
}

.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media screen and (max-width: 575px) {
        text-align: center;
    }
}

.slogan {
    margin-top: 20px;
    margin-bottom: 9.5px;
}

.Squad-HQ__list {
    margin-bottom: 20px;
    // display: grid;
    // grid-template-columns: 360px 250px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 575px) {
        text-align: center;
        display: block;
    }
}

.Squad-HQ__list li {
    border-right: none;
    height: auto;
    margin: 0;
}

.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
    display: inline-block;

    @media screen and (max-width: 1024px) {
        border-right: none;
        margin-bottom: 10px;
        margin-right: 0;
        padding-right: 0;
    }
}

.Squad-HQ__date {
    display: flex;
}

.Squad-HQ__date p {
    margin-right: 22px;
}

.user-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.squad-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        flex-direction: column;
    }
}

.squad-data__contacts {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }

    @media screen and (max-width: 575px) {
        align-items: center;
    }
}

.squad-data__social-network {
    display: flex;
    column-gap: 12px;
    margin-top: 17px;
}

.copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #35383f;
    border-radius: 10px;
    color: #35383f;
    font-size: 16px;
    font-family: 'Bert Sans';
    text-align: center;
}

.squad-data__link-share-link a {
    cursor: pointer;
}
</style>
@shared/components/inputs/imagescomp@shared/components/inputs/imagescomp
