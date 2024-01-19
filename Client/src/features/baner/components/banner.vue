<template>
    <div class="user-metric">
        <bannerPhoto :banner="user?.media?.banner" v-if="user"></bannerPhoto>
        <Avatar :avatar="user?.media?.photo" v-if="user"></Avatar>
        <div class="user-metric__bottom">
            <!-- Данные пользователя  -->
            <div class="user-data__wrapper">
                <div v-if="user" class="user-data__name">
                    <p>{{ user.last_name }}</p>
                    <p>{{ user.first_name }}</p>
                    <p>{{ user.patronymic_name }}</p>
                </div>

                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title"><p>Кандидат</p></li>
                        <li class="user-data__title" v-if="detachment?.name">
                            <p> ССО "{{ detachment?.name }}"</p>
                        </li>
                        <li class="user-data__title" v-if="educationalHeadquarter?.name">
                            <p>Штаб {{ educationalHeadquarter?.name  }}</p>
                        </li>
                        <li class="user-data__regional-office">
                            <p v-if="user?.user_region?.reg_region">
                                {{
                                    regionals[user?.user_region?.reg_region - 1]
                                        ?.name
                                }}
                            </p>
                        </li>
                        <li v-if="user?.education?.study_faculty">
                            <p>{{ user?.education?.study_faculty }}</p>
                        </li>

                        <li v-if="user?.education?.study_specialty">
                            <p>{{ user?.education?.study_specialty }}</p>
                        </li>

                        <li v-if="user?.education?.study_year">
                            <p>Курс {{ user?.education?.study_year }}</p>
                        </li>
                    </ul>
                </div>
                <div class="user-data__contact">
                    <div class="user-data__social-network">
                        <div class="user-data__link-vk mr-2">
                            <a :href="user.social_vk" target="_blank">
                                <img src="@/app/assets/icon/vk-blue.svg" />
                            </a>
                        </div>
                        <div class="user-data__link-telegram mr-2">
                            <a :href="user.social_tg">
                                <img
                                    src="@/app/assets/icon/telegram-blue.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div class="user-data__link-share-link">
                            <a href="#" target="_blank">
                                <img
                                    src="@/app/assets/icon/to-share-link.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                    <div class="user-data__contact-contact">
                        <div class="user-data__contact-contact_item">
                            <img
                                src="@/app/assets/icon/phone.svg"
                                alt="phone"
                            />
                            <p class="ml-2">{{ user.phone_number }}</p>
                        </div>
                        <div class="user-data__contact-contact_item mail">
                            <img src="@/app/assets/icon/mail.svg" alt="mail" />
                            <p class="ml-2">{{ user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { testUpload, Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const props = defineProps({
    banner: {
        type: String,
    },
    avatar: {
        type: String,
    },
    edited: {
        type: Boolean,
    },
    user: {
        type: Object,
    },
    currentUser: {
        type: Object,
    },
    education: {
        type: Object,
    },
});

const regionals = ref([]);
const detachment = ref({});
const educationalHeadquarter = ref({});

const getRegionals = async () => {
    await HTTP.get(`/regionals/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regionals.value = response.data;
            console.log(regionals.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getDetachment = async () => {
    let id = props.user.detachment_id;
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            detachment.value = response.data;
            console.log(regionals.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getEducationalHeadquarter = async () => {
    let id = props.user.educational_headquarter_id;
    await HTTP.get(`/educationals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            educationalHeadquarter.value = response.data;
            console.log(regionals.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    getRegionals();
    getDetachment();
    getEducationalHeadquarter();
});

watch(
    () => props.user,

    (newUser, oldUser) => {
        if (Object.keys(props.user).length === 0) {
            return;
        }
        getDetachment();
        getEducationalHeadquarter();
    },
);
</script>
<style lang="scss" scoped>
.profile-settings-top {
    padding-top: 40px;
    margin-bottom: 40px;
}

.user-metric {
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
}

.user-metric__bottom {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    padding: 36px 38px 32px 300px;
    @media screen and (max-width: 768px) {
        padding: 116px 90px 36px 60px;
    }
    @media screen and (max-width: 575px) {
        padding: 116px 14px 32px 14px;
    }
}

/* Данные пользователя */
.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.user-data__name {
    display: flex;
    margin-bottom: 32px;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
}
.user-data__social-network {
    display: flex;
    align-items: center;
    margin-right: 40px;
    @media screen and (max-width: 768px) {
        margin-top: 16px;
        margin-right: 0;
    }
    @media screen and (max-width: 575px) {
        margin-top: 16px;
        margin-right: 0;
    }
}

.user-data__contact {
    display: flex;
    p {
        color: #35383f;
    }
    &-contact {
        display: flex;
        @media screen and (max-width: 575px) {
            flex-direction: column;
            align-items: center;
        }
        &_item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            @media screen and (max-width: 575px) {
                margin-right: 0;
            }
        }
    }
    @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
    }
    @media screen and (max-width: 575px) {
        flex-direction: column-reverse;
        align-items: center;
    }
}

.user-data__name p {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
    margin-right: 8px;
}

.user-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
}

.user-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    @media screen and (max-width: 575px) {
        justify-content: center;
    }
}

.user-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 3px;
}

.user-data__list-wrapper li:last-child {
    border-right: none;
}

.user-data__list p,
.user-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.user-data__introductions {
    display: flex;
    align-items: center;
}

.user-data__introductions p,
.user-data__introductions img {
    margin-right: 5px;
}
</style>
