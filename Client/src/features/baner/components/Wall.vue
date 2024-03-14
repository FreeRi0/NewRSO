<template>
    <div class="user-metric">
        <bannerPhoto
            v-if="
                (props.user.privacy?.privacy_photo === 'Члены отряда' &&
                    props.user.detachment_id ===
                        currentUser.currentUser.value.detachment_id) ||
                (props.user.privacy?.privacy_email === 'Руководство' &&
                    ((roleStore.roles.detachment_commander &&
                        roleStore.roles.detachment_commander?.id ===
                            props.user.detachment_id) ||
                        (roleStore.roles.regionalheadquarter_commander &&
                            roleStore.roles.regionalheadquarter_commander
                                ?.id === props.user.regional_headquarter_id) ||
                        roleStore.roles.localheadquarter_commander ||
                        roleStore.roles.educationalheadquarter_commander ||
                        roleStore.roles.districtheadquarter_commander ||
                        roleStore.roles.centralheadquarter_commander)) ||
                props.user.privacy?.privacy_email === 'Все' ||
                props.user.privacy?.privacy_email === 'all'
            "
            :banner="user.media?.banner"
            @upload-wall="uploadWall"
            @update-wall="updateWall"
            @delete-wall="deleteWall"
            :edited="false"
        ></bannerPhoto>
        <div class="user-metric__top" v-else>
            <div class="user-metric__top-img-wrapper">
                <img
                    src="@/app/assets/user-banner.jpg"
                    alt="Баннер личной страницы(пусто)"
                />
            </div>
        </div>

        <Avatar
            v-if="
                (props.user.privacy?.privacy_photo === 'Члены отряда' &&
                    props.user.detachment_id ===
                        currentUser.currentUser.value.detachment_id) ||
                (props.user.privacy?.privacy_email === 'Руководство' &&
                    ((roleStore.roles.detachment_commander &&
                        roleStore.roles.detachment_commander?.id ===
                           props.user.detachment_id) ||
                        (roleStore.roles.regionalheadquarter_commander &&
                            roleStore.roles.regionalheadquarter_commander
                                ?.id === props.user.regional_headquarter_id) ||
                        roleStore.roles.localheadquarter_commander ||
                        roleStore.roles.educationalheadquarter_commander ||
                        roleStore.roles.districtheadquarter_commander ||
                        roleStore.roles.centralheadquarter_commander)) ||
                props.user.privacy?.privacy_email === 'Все' ||
                props.user.privacy?.privacy_email === 'all'
            "
            :avatar="user.media?.photo"
            @upload="uploadAva"
            @update="updateAva"
            @delete="deleteAva"
            :edited="false"
        ></Avatar>
        <div class="user-metric__avatar-wrapper" v-else>
            <div class="user-metric__avatar">
                <img
                    id="profile-pic"
                    src="@app/assets/user-avatar.png"
                    alt="Аватарка(пусто)"
                />
            </div>
        </div>

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
                        <li
                            class="user-data__title"
                            v-if="
                                commander.detachment_commander?.id ||
                                commander.educationalheadquarter_commander
                                    ?.id ||
                                commander.localheadquarter_commander?.id ||
                                commander.regionalheadquarter_commander?.id ||
                                commander.districtheadquarter_commander?.id ||
                                commander.centralheadquarter_commander
                            "
                        >
                            <p>Командир</p>
                        </li>
                        <li
                            class="user-data__title"
                            v-else-if="
                                position?.userdetachmentposition ||
                                position.userregionalheadquarterposition ||
                                position.userlocalheadquarterposition ||
                                position.userdistrictheadquarterposition ||
                                position?.usercentralheadquarterposition
                            "
                        >
                            <p>
                                {{
                                    position.userdetachmentposition?.position ??
                                    position.usereducationalheadquarterposition
                                        ?.position ??
                                    position.userregionalheadquarterposition
                                        ?.position ??
                                    position.userlocalheadquarterposition
                                        ?.position ??
                                    position.userdistrictheadquarterposition
                                        ?.position ??
                                    position.usercentralheadquarterposition
                                        ?.position
                                }}
                            </p>
                        </li>
                        <li class="user-data__title" v-else><p>Кандитат</p></li>
                        <!-- <li class="user-data__title" v-if="detachment?.name">
                            <p>{{ detachment?.name }}</p>
                        </li> -->
                        <li
                            class="user-data__title"
                            v-if="
                                position?.userdetachmentposition ||
                                position.userregionalheadquarterposition ||
                                position.userlocalheadquarterposition ||
                                position.userdistrictheadquarterposition ||
                                position?.usercentralheadquarterposition
                            "
                        >
                            <p>
                                {{
                                    position.userdetachmentposition?.headquarter
                                        ?.name ??
                                    position.usereducationalheadquarterposition
                                        ?.headquarter?.name
                                }}
                            </p>
                        </li>
                        <li
                            class="user-data__title"
                            v-if="educationalHeadquarter?.name"
                        >
                            <p>Штаб {{ educationalHeadquarter?.name }}</p>
                        </li>
                        <li class="user-data__regional-office">
                            <div v-if="user.region">
                                <div
                                    v-for="item in regionals.filteredRegional
                                        .value"
                                >
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>
                        </li>
                        <li v-if="user?.education?.study_faculty">
                            <p>{{ user?.education?.study_faculty }}</p>
                        </li>

                        <li v-if="user?.education?.study_specialty">
                            <p>{{ user?.education?.study_specialty }}</p>
                        </li>
                        <!-- <pre>ss{{ id }}</pre> -->

                        <li v-if="user?.education?.study_year">
                            <p>Курс {{ user?.education?.study_year }}</p>
                        </li>
                    </ul>
                </div>
                <div class="user-data__contact">
                    <div
                        class="user-data__social-network"
                        v-if="
                            (props.user.privacy?.privacy_social ===
                                'Члены отряда' &&
                                props.user.detachment_id ===
                                    currentUser.currentUser.value
                                        .detachment_id) ||
                            (props.user.privacy?.privacy_social ===
                                'Руководство' &&
                                ((roleStore.roles.detachment_commander &&
                                    roleStore.roles.detachment_commander?.id ===
                                        props.user.detachment_id) ||
                                    (roleStore.roles
                                        .regionalheadquarter_commander &&
                                        roleStore.roles
                                            .regionalheadquarter_commander
                                            ?.id === props.user.regional_headquarter_id) ||
                                    roleStore.roles
                                        .localheadquarter_commander ||
                                    roleStore.roles
                                        .educationalheadquarter_commander ||
                                    roleStore.roles
                                        .districtheadquarter_commander ||
                                    roleStore.roles
                                        .centralheadquarter_commander)) ||
                            props.user.privacy?.privacy_social === 'Все' || props.user.privacy?.privacy_social === 'all'

                        "
                    >
                        <div class="user-data__link-vk mr-2">
                            <a
                                :href="user.social_vk"
                                target="_blank"
                                v-if="user.social_vk"
                            >
                                <img src="@/app/assets/icon/vk-blue.svg" />
                            </a>
                        </div>
                        <div
                            class="user-data__link-telegram mr-2"
                            v-if="user.social_tg"
                        >
                            <a :href="user.social_tg">
                                <img
                                    src="@/app/assets/icon/telegram-blue.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div class="user-data__link-share-link">
                            <a @click="copyL">
                                <img
                                    src="@/app/assets/icon/to-share-link.svg"
                                    alt=""
                                />
                            </a>
                            <div class="copy-message" hidden>
                                Ссылка скопирована
                            </div>
                        </div>
                    </div>
                    <div class="user-data__contact-contact">
                        <div
                            class="user-data__contact-contact_item"
                            v-if="
                                (props.user.privacy?.privacy_telephone ===
                                    'Члены отряда' &&
                                    props.user.detachment_id ===
                                        currentUser.currentUser.value
                                            .detachment_id) ||
                                (props.user.privacy?.privacy_telephone ===
                                    'Руководство' &&
                                    ((roleStore.roles.detachment_commander &&
                                        roleStore.roles.detachment_commander
                                            ?.id === props.user.detachment_id) ||
                                        (roleStore.roles
                                            .regionalheadquarter_commander &&
                                            roleStore.roles
                                                .regionalheadquarter_commander
                                                ?.id === props.user.regional_headquarter_id) ||
                                        roleStore.roles
                                            .localheadquarter_commander ||
                                        roleStore.roles
                                            .educationalheadquarter_commander ||
                                        roleStore.roles
                                            .districtheadquarter_commander ||
                                        roleStore.roles
                                            .centralheadquarter_commander)) ||
                                props.user.privacy?.privacy_telephone === 'Все' || props.user.privacy?.privacy_telephone === 'all'
                            "
                        >
                            <img
                                src="@/app/assets/icon/phone.svg"
                                alt="phone"
                            />
                            <p class="ml-2">{{ user.phone_number }}</p>
                        </div>
                        <div
                            class="user-data__contact-contact_item mail"
                            v-if="
                                (props.user.privacy?.privacy_email ===
                                    'Члены отряда' &&
                                    props.user.detachment_id ===
                                        userStore.currentUser.detachment_id) ||
                                (props.user.privacy?.privacy_email ===
                                    'Руководство' &&
                                    ((roleStore.roles.detachment_commander &&
                                        roleStore.roles.detachment_commander
                                            ?.id === props.user.detachment_id) ||
                                        (roleStore.roles
                                            .regionalheadquarter_commander &&
                                            roleStore.roles
                                                .regionalheadquarter_commander
                                                ?.id ===
                                                props.user.regional_headquarter_id) ||
                                        roleStore.roles
                                            .localheadquarter_commander ||
                                        roleStore.roles
                                            .educationalheadquarter_commander ||
                                        roleStore.roles
                                            .districtheadquarter_commander ||
                                        roleStore.roles
                                            .centralheadquarter_commander)) ||
                                props.user.privacy?.privacy_email === 'Все' || props.user.privacy?.privacy_email === 'all'

                            "
                        >
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
import { ref, onMounted, watch, computed } from 'vue';
import { testUpload, Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { useRegionalsStore } from '@features/store/regionals';
import { useRoleStore } from '@layouts/store/role';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

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
    position: {
        type: Object,
    },
    commander: {
        type: Object,
    },
});

const userStore = useUserStore();
const roleStore = useRoleStore();
const squadsStore = useSquadsStore();
const currentUser = storeToRefs(userStore);
const roles = storeToRefs(roleStore);
const squad = storeToRefs(squadsStore);

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

const regionalsStore = useRegionalsStore();
const regionals = storeToRefs(regionalsStore);
const regionalHeadquarter = storeToRefs(regionalsStore);
const detachment = ref({});
const educationalHeadquarter = ref({});
const getUserData = async () => {
    try {
        if (props.user.detachment_id) {
            const responseSquad = await HTTP.get(
                `/detachments/${props.user.detachment_id}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            detachment.value = responseSquad.data;
        }

        if (props.user.educational_headquarter_id) {
            const responseEducHead = await HTTP.get(
                `/educationals/${props.user.educational_headquarter_id}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );

            educationalHeadquarter.value = responseEducHead.data;
        }
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
        // getUserData();
        regionalsStore.searchRegionals(props.user.region);
    },
);

onMounted(() => {
    regionalsStore.searchRegionals(props.user.region);
    getUserData();
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
