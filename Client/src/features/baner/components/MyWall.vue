<template>
    <div class="user-metric">
        <bannerPhoto :banner="user.media?.banner" @upload-wall="uploadWall" @update-wall="updateWall"
            @delete-wall="deleteWall" :edited="true"></bannerPhoto>
        <Avatar :avatar="user.media?.photo" @upload="uploadAva" @update="updateAva" @delete="deleteAva" :edited="true">
        </Avatar>

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
                        <li class="user-data__title" v-if="
                            roleStore.roles.detachment_commander !== null ||
                            roleStore.roles
                                .educationalheadquarter_commander !==
                            null ||
                            roleStore.roles.localheadquarter_commander !==
                            null ||
                            roleStore.roles
                                .regionalheadquarter_commander !== null ||
                            roleStore.roles
                                .districtheadquarter_commander !== null ||
                            roleStore.roles.centralheadquarter_commander !==
                            null
                        ">
                            <p>Командир</p>
                        </li>
                        <li class="user-data__title" v-else-if="
                            roleStore.myPositions
                                ?.userdetachmentposition ||
                            roleStore.myPositions
                                ?.userregionalheadquarterposition ||
                            roleStore.myPositions
                                ?.usereducationalheadquarterposition ||
                            roleStore.myPositions
                                ?.userlocalheadquarterposition ||
                            roleStore.myPositions
                                ?.userdistrictheadquarterposition ||
                            roleStore.myPositions
                                ?.usercentralheadquarterposition
                        ">
                            <p>
                                {{
                                    getPositions()
                                }}
                            </p>
                        </li>
                        <li class="user-data__title" v-else>
                            <p>Кандидат</p>
                        </li>
                        <li class="user-data__title" v-if="
                            roleStore.myPositions
                                ?.userdetachmentposition">
                            <p>{{
                                roleStore.myPositions
                                    ?.userdetachmentposition?.headquarter?.name }}</p>
                        </li>

                        <li class="user-data__title" v-if="
                            roleStore.myPositions
                                ?.usereducationalheadquarterposition">
                            <p>{{
                                roleStore.myPositions
                                    .usereducationalheadquarterposition
                                    ?.headquarter?.name }}</p>
                        </li>
                        <li class="user-data__title" v-if="
                            roleStore.myPositions
                                ?.userlocalheadquarterposition">
                            <p>{{
                                roleStore.myPositions
                                    .userlocalheadquarterposition
                                    ?.headquarter?.name
                            }}</p>
                        </li>
                        <li class="user-data__regional-office">
                            <div v-if="user.region && !isLoading.isLoading.value">
                                <div v-for="item in regionals.filteredMyRegional
                                    .value">
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>

                            <p v-else>Загрузка региона...</p>
                        </li>

                        <li class="user-data__title" v-if="
                            roleStore.myPositions
                                ?.userdistrictheadquarterposition">
                            <p>{{
                                roleStore.myPositions
                                    .userdistrictheadquarterposition
                                    ?.headquarter?.name }}</p>
                        </li>

                        <li v-if="user.education?.study_institution?.short_name">
                            <p>
                                {{
                                    user.education?.study_institution
                                        ?.short_name
                                }}
                            </p>
                        </li>

                        <li v-if="user.education?.study_faculty">
                            <p>{{ user.education?.study_faculty }}</p>
                        </li>

                        <li v-if="user.education?.study_specialty">
                            <p>{{ user.education?.study_specialty }}</p>
                        </li>

                        <li v-if="user.education?.study_year">
                            <p>Курс {{ user.education?.study_year }}</p>
                        </li>
                    </ul>
                </div>
                <div class="user-data__contact">
                    <div class="user-data__social-network">
                        <div class="user-data__link-vk mr-2" v-if="
                            user.social_vk &&
                            user.social_vk !== 'https://vk.com/'
                        ">
                            <a :href="user.social_vk" target="_blank">
                                <SvgIcon icon-name="vk" />
                            </a>
                        </div>
                        <div class="user-data__link-telegram mr-2" v-if="
                            user.social_tg &&
                            user.social_tg !== 'https://t.me/'
                        ">
                            <a :href="user.social_tg">
                                <SvgIcon icon-name="telegram" />
                            </a>
                        </div>
                        <div class="user-data__link-share-link">
                            <a @click="copyL">
                                <SvgIcon icon-name="share-link" />
                            </a>
                            <div class="copy-message" hidden>
                                Ссылка скопирована
                            </div>
                        </div>
                    </div>
                    <div class="user-data__contact-contact">
                        <div class="user-data__contact-contact_item">
                            <SvgIcon icon-name="phone" />
                            <p class="ml-2">{{ user.phone_number }}</p>
                        </div>
                        <div class="user-data__contact-contact_item mail">
                            <SvgIcon icon-name="mail" />
                            <p class="ml-2">{{ user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { testUpload, Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRegionalsStore } from '@features/store/regionals';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
import { SvgIcon } from '@shared/index';

const props = defineProps({
    banner: {
        type: String,
    },
    avatar: {
        type: String,
    },
    user: {
        type: Object,
    },
    education: {
        type: Object,
    },
});
const emit = defineEmits(['upload', 'update', 'delete']);

const uploadAva = (imageAva) => {
    // console.log('photo', imageAva);
    emit('upload', imageAva);
    // console.log('ghhhgh');
};

const updateAva = (imageAva) => {
    // console.log('photoUpdate', imageAva);
    emit('update', imageAva);
    // console.log('update');
};

const deleteAva = (imageAva) => {
    // console.log('photoDel', imageAva);
    emit('delete', imageAva);
    // console.log('del');
};

const uploadWall = (imageWall) => {
    // console.log('ban', imageWall);
    emit('uploadWall', imageWall);
    // console.log('ghhhgh');
};

const updateWall = (imageWall) => {
    // console.log('banUpdate', imageWall);
    emit('updateWall', imageWall);
    // console.log('update');
};
const deleteWall = (imageWall) => {
    // console.log('banDelete', imageWall);
    emit('deleteWall', imageWall);
    // console.log('delete');
};

const regionalsStore = useRegionalsStore();
const roleStore = useRoleStore();
const role = storeToRefs(roleStore);
const regionals = storeToRefs(regionalsStore);
const isLoading = storeToRefs(regionalsStore);

const participant = ref({});

const getPositions = () => {
    switch (roleStore.myPositions?.userdetachmentposition?.position || roleStore.myPositions?.usereducationalheadquarterposition?.position || roleStore.myPositions?.userlocalheadquarterposition?.position || roleStore.myPositions?.userregionalheadquarterposition?.position || roleStore.myPositions?.userdistrictheadquarterposition?.position || roleStore.myPositions?.usercentralheadquarterposition?.position) {
        case 'Комиссар':
            return 'Комиссар';
        case 'Боец':
            return 'Боец';

        case 'Комиссар': case 'Боец':
            return 'Комиссар'

        default:
            return 'Неизвестная должность';
    }
};

watch(
    () => props.user,

    (newUser, oldUser) => {
        if (Object.keys(props.user).length === 0) {
            return;
        }
        regionalsStore.searchMyRegionals(props.user.region);
    },
);

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

.user-data__link-share-link a {
    cursor: pointer;
}
</style>
@shared/components/inputs/imagescomp@shared/components/inputs/imagescomp
