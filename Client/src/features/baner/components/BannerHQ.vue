<template>
    <div class="hq-metric" v-if="headquarter">
        <hqBanner :banner="headquarter.banner"></hqBanner>
        <hqAvatar :emblem="headquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ headquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="
                        headquarter.slogan && headquarter.slogan != 'null'
                    ">
                        {{ headquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ edict.short_name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания штаба</p>
                            <img src="@/app/assets/icon/calendar.svg" alt="calendar" />
                            <time datetime="2022-09-10">{{
                                headquarter.founding_date
                                }}</time>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__participant-counter-HQ">
                            <span>{{ headquarter.participants_count }}
                                {{ ending }}</span>
                        </div>
                        <div class="hq-data__social-network">
                            <div class="hq-data__link-vk" v-if="
                                headquarter.social_vk &&
                                headquarter.social_vk != 'null'
                            ">
                                <a :href="headquarter.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram" v-if="
                                headquarter.social_tg &&
                                headquarter.social_tg != 'null'
                            ">
                                <a :href="headquarter.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <img src="@/app/assets/icon/to-share-link.svg" alt="" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                            <!-- <pre>{{ userId }} {{ headquarter.commander.id }}</pre> -->
                        </div>
                    </div>

                    <router-link v-if="
                        userId &&
                        (userId === headquarter?.commander?.id ||
                            roles.roles.value.regionalheadquarter_commander
                                ?.id ===
                            headquarter?.regional_headquarter ||
                            roles.roles.value.localheadquarter_commander
                                ?.id === headquarter?.local_headquarter ||
                            roles.roles.value
                                .centralheadquarter_commander ||
                            IsTrusted)
                    " class="hq-data__link" :to="{
                        name: 'EditHQ',
                        params: { id: headquarter.id },
                    }">Редактировать штаб</router-link>
                    <Button v-else-if="!IsMember && !UserApplication"
                        @click="AddApplication('educationals', props.headquarter.id)" label="Вступить в штаб"
                        class="AddApplication"></Button>
                    <div v-else-if="UserApplication" class="user-data__link isApplicant">
                        Заявка на рассмотрении
                    </div>
                    <div v-else-if="IsMember" class="user-data__link isMember">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError">
                    {{ '' + isError?.non_field_errors }}
                </p>
                <p class="error" v-else-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                 <p class="error" v-else>
                    {{ '' + isError.error }}
                </p>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="localHeadquarter">
        <hqBanner :banner="localHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="localHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ localHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="
                        localHeadquarter.slogan &&
                        localHeadquarter.slogan != 'null'
                    ">
                        {{ localHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Local">
                        <li class="Squad-HQ__date-local">
                            <time datetime="2022-09-10">{{ localHeadquarter.founding_date }} — дата
                                проведения первого Общего собрания МШ</time>
                        </li>
                        <li class="hq-data__participant-counter">
                            <span>{{ localHeadquarter.participants_count }}
                                {{ ending }}</span>
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span>{{ localHeadquarter.members_count }}
                                {{ endingMember }}</span>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk" v-if="
                                localHeadquarter.social_vk &&
                                localHeadquarter.social_vk != 'null'
                            ">
                                <a :href="localHeadquarter.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram" v-if="
                                localHeadquarter.social_tg &&
                                localHeadquarter.social_tg != 'null'
                            ">
                                <a :href="localHeadquarter.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        userId &&
                        (userId === localHeadquarter?.commander?.id ||
                            roles.roles.value.regionalheadquarter_commander
                                ?.id ===
                            localHeadquarter.regional_headquarter ||
                            roles.roles.value
                                .centralheadquarter_commander ||
                            IsTrusted)
                    " class="hq-data__link" :to="{
                        name: 'FormLocal',
                        params: { id: localHeadquarter.id },
                    }">Редактировать штаб</router-link>
                    <Button v-else-if="!IsMember && !UserApplication"
                        @click="AddApplication('locals', props.localHeadquarter.id)" label="Вступить в штаб"
                        class="AddApplication"></Button>
                    <div v-else-if="UserApplication" class="user-data__link isApplicant">
                        Заявка на рассмотрении
                    </div>
                    <div v-else-if="IsMember" class="user-data__link isMember">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError?.non_field_errors }}
                </p>
                <p class="error" v-else-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                 <p class="error" v-else>
                    {{ '' + isError.error }}
                </p>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="districtHeadquarter">
        <hqBanner :banner="districtHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="districtHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ districtHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="
                        districtHeadquarter.slogan &&
                        districtHeadquarter.slogan != 'null'
                    ">
                        {{ districtHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10">{{ districtHeadquarter.founding_date }} — дата
                                начала функционирования ОШ</time>
                        </li>
                        <li class="hq-data__participant-counter">
                            <span>{{ districtHeadquarter.participants_count }}
                                {{ ending }}</span>
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span>{{ districtHeadquarter.members_count }}
                                {{ endingMember }}</span>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk" v-if="
                                districtHeadquarter.social_vk &&
                                districtHeadquarter.social_vk != 'null'
                            ">
                                <a :href="districtHeadquarter.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram" v-if="
                                districtHeadquarter.social_tg &&
                                districtHeadquarter.social_tg != 'null'
                            ">
                                <a :href="districtHeadquarter.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        userId &&
                        (userId === districtHeadquarter?.commander?.id ||
                            roles.roles.value
                                .centralheadquarter_commander ||
                            IsTrusted)
                    " class="hq-data__link" :to="{
                        name: 'FormDH',
                        params: { id: districtHeadquarter.id },
                    }">Редактировать штаб</router-link>
                    <Button v-else-if="!IsMember && !UserApplication"
                        @click="AddApplication('districts', props.districtHeadquarter.id)" label="Вступить в штаб"
                        class="AddApplication"></Button>
                    <div v-else-if="UserApplication" class="user-data__link isApplicant">
                        Заявка на рассмотрении
                    </div>
                    <div v-else-if="IsMember" class="user-data__link isMember">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError?.non_field_errors }}
                </p>
                <p class="error" v-else-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                 <p class="error" v-else>
                    {{ '' + isError.error }}
                </p>

            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="regionalHeadquarter">
        <hqBanner :banner="regionalHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="regionalHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ regionalHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="
                        regionalHeadquarter.slogan &&
                        regionalHeadquarter.slogan != 'null'
                    ">
                        {{ regionalHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10">{{ regionalHeadquarter.conference_date }} —
                                дата учредительной конференции РШ</time>
                        </li>
                        <li class="hq-data__participant-counter">
                            <span>{{ regionalHeadquarter.participants_count }}
                                {{ ending }}</span>
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span>{{ regionalHeadquarter.members_count }}
                                {{ endingMember }}</span>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk" v-if="
                                regionalHeadquarter.social_vk &&
                                regionalHeadquarter.social_vk != 'null'
                            ">
                                <a :href="regionalHeadquarter.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram" v-if="
                                regionalHeadquarter.social_tg &&
                                regionalHeadquarter.social_tg != 'null'
                            ">
                                <a :href="regionalHeadquarter.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        userId &&
                        (userId === regionalHeadquarter?.commander?.id ||
                            roles.roles.value.districtheadquarter_commander
                                ?.id ===
                            regionalHeadquarter.district_headquarter ||
                            roles.roles.value
                                .centralheadquarter_commander ||
                            IsTrusted)
                    " class="hq-data__link" :to="{
                        name: 'EditingOfRS',
                        params: { id: regionalHeadquarter.id },
                    }">Редактировать штаб</router-link>
                    <Button v-else-if="!IsMember && !UserApplication"
                        @click="AddApplication('regionals', props.regionalHeadquarter.id)" label="Вступить в штаб"
                        class="AddApplication"></Button>
                    <div v-else-if="UserApplication" class="user-data__link isApplicant">
                        Заявка на рассмотрении
                    </div>
                    <div v-else-if="IsMember" class="user-data__link isMember">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError?.non_field_errors }}
                </p>
                <p class="error" v-else-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                 <p class="error" v-else>
                    {{ '' + isError.error }}
                </p>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else>
        <hqBanner :banner="centralHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="centralHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ centralHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p v-if="
                        centralHeadquarter.slogan &&
                        centralHeadquarter.slogan != 'null'
                    ">
                        {{ centralHeadquarter.slogan }}
                    </p>
                </div>
                <div class="working_slogan">
                    <p>
                        {{ centralHeadquarter.working_years }} лет на благо
                        страны!
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__date-central">
                            <time datetime="2022-09-10">{{
                                centralHeadquarter.rso_founding_congress_date
                            }}
                                — дата первого Учредительного Съезда РСО</time>
                        </li>
                        <li class="hq-data__participant-counter">
                            <span>{{ centralHeadquarter.participants_count }}
                                {{ ending }}</span>
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span>{{ centralHeadquarter.members_count }}
                                {{ endingMember }}</span>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts-central">
                        <div class="hq-data__social-network-central">
                            <div class="hq-data__link-vk" v-if="
                                centralHeadquarter.social_vk &&
                                centralHeadquarter.social_vk != 'null'
                            ">
                                <a :href="centralHeadquarter.social_vk" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram" v-if="
                                centralHeadquarter.social_tg &&
                                centralHeadquarter.social_tg != 'null'
                            ">
                                <a :href="centralHeadquarter.social_tg" target="_blank">
                                    <img src="@/app/assets/icon/telegram-blue.svg" alt="" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <img src="@/app/assets/icon/to-share-link.svg" alt="" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                            <!-- <pre>{{ centralHeadquarter.commander.id }}</pre>
                            <pre>{{  IsTrusted }}</pre> -->
                        </div>
                    </div>
                    <router-link v-if="
                        userId &&
                        (userId === centralHeadquarter?.commander?.id ||
                            IsTrusted)
                    " class="hq-data__link" :to="{
                        name: 'FormCentral',
                    }">Редактировать штаб</router-link>
                    <Button v-else-if="!IsMember && !UserApplication" @click="AddApplication('centrals', 1)"
                        label="Вступить в штаб" class="AddApplication"></Button>
                    <div v-else-if="UserApplication" class="user-data__link isApplicant">
                        Заявка на рассмотрении
                    </div>
                    <div v-else-if="IsMember" class="user-data__link isMember">
                        Вы участник
                    </div>
                </div>
                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
                </p>
                <p class="error" v-else-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                 <p class="error" v-else>
                    {{ '' + isError.error }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, inject } from 'vue';
import { hqAvatar } from '@shared/components/imagescomp';
import { hqBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { Button } from '@shared/components/buttons';
const roleStore = useRoleStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);
const data = ref({});
const isError = ref([]);
const route = useRoute();
const applications = ref([]);
const swal = inject('$swal');
let userId = computed(() => {
    return user.currentUser.value.id;
});
const edict = ref({});

const roles = storeToRefs(roleStore);
let educComId = roles.roles.value.educationalheadquarter_commander;
let regionComId = roles.roles.value.regionalheadquarter_commander;
let districtComId = roles.roles.value.districtheadquarter_commander;
let centralComId = roles.roles.value.centralheadquarter_commander;
let localComId = roles.roles.value.localheadquarter_commander;
const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    headquarter: {
        type: Object,
        required: true,
    },
    districtHeadquarter: {
        type: Object,
        required: true,
    },
    localHeadquarter: {
        type: Object,
        required: true,
    },
    regionalHeadquarter: {
        type: Object,
        required: true,
    },
    centralHeadquarter: {
        type: Object,
        required: true,
    },
    edict: {
        type: Object,
    },
    member: {
        type: Object,
    },
    ending: {
        type: Number,
    },
    endingMember: {
        type: Number,
    },
});



const showErrors = () => {
    let error = document.querySelector('.error');
    error.style.display = 'block';


    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);
}

const aboutEduc = async () => {
    try {
        let id = props.headquarter?.educational_institution.id;
        const response = await HTTP.get(`/eduicational_institutions/${id}/`);

        edict.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const viewDetachments = async (url) => {
    let id = route.params.id;
    await HTTP.get(`/${url}/${id}/applications/`)
        .then((response) => {
            applications.value = response.data;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const IsTrusted = computed(() => {
    return props.member.find(
        (item) => item.user.id === userId.value && item.is_trusted === true,
    );
});

const UserApplication = computed(() => {
    return applications.value.find((item) => item.user.id === userId.value);
});

const IsMember = computed(() => {
    return props.member.find((item) => item.user.id === userId.value);
});
const AddApplication = async (url, id) => {
    try {
        const sendResponse = await HTTP.post(
            `/${url}/${id}/apply/`,
            data.value,
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });


    } catch (error) {
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
            showErrors();
        }

    }
};

watch(
    () => props.headquarter,

    (newheadquarter) => {
        if (Object.keys(props.headquarter).length === 0) {
            return;
        }
        aboutEduc();
    },
);
onMounted(() => {
    aboutEduc();
    viewDetachments('educationals');
    if (props.localHeadquarter) {
        viewDetachments('locals');
    }

    if (props.regionalHeadquarter) {
        viewDetachments('regionals');
    }

    if (props.districtHeadquarter) {
        viewDetachments('districts');
    }
    if (props.centralHeadquarter) {
        viewDetachments('centrals');
    }
});

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
.hq-metric {
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
    }
}

.ps__title {
    margin: 40px 0;
}

.isMember {
    width: 167px;
    height: 52px;
    background-color: #39BFBF;
    padding: 16px 32px;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    font-family: 'Bert Sans';
    font-weight: 600;
    line-height: 20px;
}

.isApplicant {
    width: 267px;
    height: 52px;
    background-color: #39BFBF;
    padding: 16px 32px;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    font-family: 'Bert Sans';
    font-weight: 600;
    line-height: 20px;

}

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

/* Данные пользователя */
.hq-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 16px 300px;
}

.hq-data__name {
    margin-bottom: 32px;
}

.hq-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.hq-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.hq-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.hq-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.hq-data__list p,
.hq-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.hq-data__introductions {
    display: flex;
    align-items: center;
}

.hq-data__introductions p,
.hq-data__introductions img {
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
    margin-top: 28px;
    margin-bottom: 9.5px;
}

.working_slogan {
    margin-bottom: 9.5px;
}

.Squad-HQ__list {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list-Reg {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list-Local {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list li,
.Squad-HQ__list-Local li,
.Squad-HQ__list-Reg li {
    border-right: none;
    margin: 0;
}

.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.Squad-HQ__date,
.Squad-HQ__date-local,
.Squad-HQ__date-Reg {
    display: flex;
}

.Squad-HQ__date-local time,
.Squad-HQ__date-Reg time,
.Squad-HQ__date-central time {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.Squad-HQ__date p {
    margin-right: 10px;
    max-width: 100%;
    width: 100%;
}

.hq-data__participant-counter-HQ span {
    border-right: none;
}

.hq-data__participant-counter span {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.hq-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    letter-spacing: 1.2px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.hq-data__link-share-link a {
    cursor: pointer;
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

.error {
    color: #DB0000;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Bert Sans';
    margin-top: 5px;
    margin-bottom: 5px;
    display: none;
    text-align: left;
}

.hq-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}

.hq-data__contacts {
    display: flex;
    flex-direction: column;
}

.hq-data__social-network {
    display: flex;
    column-gap: 12px;
    margin: 12px 0 0;
}

.hq-data__social-network-Reg,
.hq-data__social-network-central {
    display: flex;
    // justify-content: space-between;
    margin: 12px 0 0;
    column-gap: 12px;
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

@media ((max-width: 1095px)) {
    .Squad-HQ__university p {
        border-right: none;
    }

    .hq-data__wrapper {
        margin: 22px 0 16px 260px;
    }
}

@media ((max-width: 841px)) {

    .Squad-HQ__date-local time,
    .Squad-HQ__date-central time {
        border-right: none;
    }
}

@media ((max-width: 768px)) {
    .hq-metric {
        grid-template-columns: 10px 135px 135px 2fr 16px;
    }

    .hq-data__wrapper {
        margin: 22px 0 16px 240px;
    }

    .hq-data__contacts-wrapper {
        display: grid;
        row-gap: 20px;
    }

    .hq-data__contacts {
        align-items: start;
    }

    .hq-data__social-network {
        column-gap: 12px;
    }

    .Squad-HQ__date-Reg time {
        border-right: none;
    }
}

@media ((max-width: 590px)) {
    .hq-metric {
        display: block;
    }

    .hq-data__wrapper {
        margin: 0px 0 16px 0;
        align-items: center;
    }

    .user-metric__avatar-wrapper {
        grid-template-columns: 125px 125px;
        margin-left: 64px;
    }

    .hq-metric__bottom {
        grid-row-start: 4;
    }

    .Squad-HQ__date p {
        margin-right: 5px;
    }

    .hq-data__contacts {
        align-items: center;
    }

    .Squad-HQ__list,
    .Squad-HQ__list-Local,
    .Squad-HQ__list-Reg {
        display: block;
        text-align: center;
    }

    .Squad-HQ__name {
        text-align: center;
    }
}
</style>
@shared/components/inputs/imagescomp@shared/components/inputs/imagescomp
