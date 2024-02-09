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
                    <p>{{ squad.slogan }}</p>
                </div>
                <div class="squad__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ squad.educational_institution?.short_name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания ЛСО</p>
                            <img
                                src="@/app/assets/icon/calendar.svg"
                                alt="calendar"
                            />
                            <time datetime="2022-09-10">{{
                                squad.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="squad-data__contacts-wrapper">
                    <div class="squad-data__contacts">
                        <div class="squad-data__participant-counter">
                            <span>{{ member.length }} участников</span>
                        </div>
                        <div class="squad-data__social-network">
                            <div class="squad-data__link-vk">
                                <a href="https://vk.com" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="squad-data__link-telegram">
                                <a href="https://t.me" target="_blank">
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="squad-data__link-share-link">
                                <a href="#" target="_blank">
                                    <img
                                        src="@/app/assets/icon/to-share-link.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <!-- <pre>dddddssss   {{ userId }}</pre> -->
                        </div>
                    </div>
                    <!-- <pre>dddddddd{{ props.member }}</pre> -->
                    <!-- <pre>{{ IsTrusted }}</pre> -->
                    <!-- <pre>{{ regional?.commander?.id }}</pre>
                    <pre>{{ squad?.commander?.id }}</pre> -->

                    <router-link
                        v-if="
                            userId == squad.commander?.id ||
                            userId == regional.commander?.id ||
                            IsTrusted
                        "
                        :to="{
                            name: 'EditLSO',
                            params: { id: squad.id },
                        }"
                        class="user-data__link"
                        >Редактировать страницу</router-link
                    >

                    <Button
                        v-else-if="!IsMember && !UserApplication"
                        @click="AddApplication()"
                        label="Подать заявку"
                        class="AddApplication"
                    ></Button>

                    <div v-else-if="UserApplication" class="d-flex">
                        <div class="user-data__link mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="DeleteApplication()"
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>

                    <!--find искать id в computed-->

                    <div v-else-if="IsMember" class="user-data__link">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
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
});

const roleStore = useRoleStore();
const userStore = useUserStore();
const route = useRoute();
const user = storeToRefs(userStore);
const roles = storeToRefs(roleStore);
let comId = roles.roles.value.detachment_commander;
let userId = computed(() => {
    return user.currentUser.value.id;
});
// console.log('comId', comId);

// console.log('memberAA', props.member);

// const edict = ref({});
const regional = ref({});
const data = ref({});
const isError = ref([]);
const applications = ref([]);
const swal = inject('$swal');
// console.log('user', userId.value);
// console.log('member', props.member);


const viewDetachments = async () => {
    let id = route.params.id;
    console.log('idRoute', id);
    await HTTP.get(`/detachments/${id}/applications/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            applications.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const viewRegionals = async () => {
    let id = props.squad.regional_headquarter;
    console.log('idRouteReg', id);
    await HTTP.get(`/regionals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regional.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

//member сравнивать так же
const UserApplication = computed(() => {
    return applications.value.find((item) => item.user.id === userId.value);
});

const IsMember = computed(() => {
    return props.member.find((item) => item.user.id === userId.value);
});
const IsTrusted = computed(() => {
    return props.member.find(
        (item) => item.user.id === userId.value && item.is_trusted === true,
    );
});

console.log('member', IsMember);

watch(
    () => props.squad,

    (newSquad, oldSquad) => {
        if (Object.keys(props.squad).length === 0) {
            return;
        }
        viewRegionals();
    },
);

const AddApplication = async () => {
    try {
        let id = props.squad.id;
        const sendResponse = await HTTP.post(
            `/detachments/${id}/apply/`,
            data.value,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        viewDetachments();
        console.log('responseee', sendResponse.data);
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

const DeleteApplication = async () => {
    try {
        let id = props.squad.id;
        const delApplyResp = await HTTP.delete(`/detachments/${id}/apply/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        viewDetachments();
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

onMounted(() => {
    viewDetachments();
    viewRegionals();
});
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
    &__bottom {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
        padding: 20px 0px 16px 300px;
        @media screen and (max-width: 768px) {
            padding: 20px 00px 16px 300px;
        }
        @media screen and (max-width: 575px) {
            padding: 116px 14px 16px 14px;
        }
    }
}

/* Данные пользователя */
.squad-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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
    font-family: 'BertSans';
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
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
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
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
    @media screen and (max-width: 1024px) {
        height: auto;
    }
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
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
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
}

.squad-data__contacts {
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
}
.squad-data__social-network {
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
}
</style>
@shared/components/inputs/imagescomp@shared/components/inputs/imagescomp
