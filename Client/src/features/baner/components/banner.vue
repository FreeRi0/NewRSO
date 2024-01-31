<template>
    <div class="user-metric">
        <bannerPhoto
            :banner="user?.media?.banner"
            @upload-wall="uploadWall"
            @update-wall="updateWall"
            @delete-wall="deleteWall"
        ></bannerPhoto>
        <Avatar
            :avatar="user?.media?.photo"
            @upload="uploadAva"
            @update="updateAva"
            @delete="deleteAva"
            :edited="false"
        ></Avatar>
        <Avatar
            :avatar="user?.media?.photo"
            @upload="uploadAva"
            @update="updateAva"
            @delete="deleteAva"
            :edited="true"
        ></Avatar>
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
                        <!-- <li class="user-data__title" ><p> Кандитат</p></li> -->
                        <li class="user-data__title" v-if="detachment?.name">
                            <p>ССО "{{ detachment?.name }}"</p>
                        </li>
                        <li
                            class="user-data__title"
                            v-if="educationalHeadquarter?.name"
                        >
                            <p>Штаб {{ educationalHeadquarter?.name }}</p>
                        </li>
                        <li class="user-data__regional-office">
                            <p v-if="user.region">
                                {{
                                    regionals.find(
                                        (reg) => reg.region === user.region,
                                    )?.name
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

const emit = defineEmits(['upload', 'update', 'delete']);

const uploadAva = (imageAva) => {
    console.log('photo', imageAva);
    emit('upload', imageAva);
    console.log('ghhhgh');
};

const updateAva = (imageAva) => {
    console.log('photoUpdate', imageAva);
    emit('update', imageAva);
    console.log('update');
};

const deleteAva = (imageAva) => {
    console.log('photoDel', imageAva);
    emit('delete', imageAva);
    console.log('del');
};

const uploadWall = (imageWall) => {
    console.log('ban', imageWall);
    emit('uploadWall', imageWall);
    console.log('ghhhgh');
};

const updateWall = (imageWall) => {
    console.log('banUpdate', imageWall);
    emit('updateWall', imageWall);
    console.log('update');
};
const deleteWall = (imageWall) => {
    console.log('banDelete', imageWall);
    emit('deleteWall', imageWall);
    console.log('delete');
};

const regionals = ref([]);
const detachment = ref({});
const educationalHeadquarter = ref({});
const participant = ref({});

const getUserData = async () => {
    try {
        const responseRegionals = await HTTP.get(`/regionals/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        const responseSquad = ref(null);
        if (props.user.detachment_id) {
            let id = props.user.detachment_id;
            const responseSquad = await HTTP.get(`/detachments/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
        }
        const responseEducHead = ref(null);
        if (props.user.educational_headquarter_id) {
            let id = props.user.educational_headquarter_id;
            const responseEducHead = await HTTP.get(`/educationals/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
        }
        regionals.value = responseRegionals.data;
        detachment.value = responseSquad.data;
        educationalHeadquarter.value = responseEducHead.data;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

watch(
    () => props.user,

    (newUser, oldUser) => {
        if (Object.keys(props.user).length === 0) {
            return;
        }
        getUserData();
    },
);

onMounted(() => {
    getUserData();
});
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
