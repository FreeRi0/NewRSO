<template>
    <div class="user-metric">
        <bannerPhoto
            v-if="canViewBanner"
            :banner="user.media?.banner"
            @upload-wall="uploadWall"
            @update-wall="updateWall"
            @delete-wall="deleteWall"
            :edited="false"
        ></bannerPhoto>
        <div class="user-metric__top" v-else>
            <div class="user-metric__top-img-wrapper">
                <img src="@/app/assets/user-banner.jpg" alt="Баннер личной страницы(пусто)" />
            </div>
        </div>

        <Avatar
            :avatar="user.media?.photo"
            @upload="uploadAva"
            @update="updateAva"
            @delete="deleteAva"
            :edited="false"
        ></Avatar>

        <div class="user-metric__bottom">
            <div class="user-data__wrapper">
                <div v-if="user" class="user-data__name">
                    <p>{{ user.last_name }}</p>
                    <p>{{ user.first_name }}</p>
                    <p>{{ user.patronymic_name }}</p>
                </div>

                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title" v-if="isCommander">
                            <p>Командир</p>
                        </li>
                        <li class="user-data__title" v-else-if="hasPosition">
                            <p>{{ getPositions() }}</p>
                        </li>
                        <li class="user-data__title" v-else>
                            <p>Кандидат</p>
                        </li>
                        <li class="user-data__title" v-for="position in positions" :key="position">
                            <p>{{ position }}</p>
                        </li>
                        <li class="user-data__regional-office" v-if="user.region">
                            <div v-for="item in regionals.filteredRegional.value" :key="item.name">
                                <p>{{ item.name }}</p>
                            </div>
                        </li>
                        <li v-if="user.education?.study_institution?.short_name">
                            <p>{{ user.education?.study_institution?.short_name }}</p>
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
                    <div class="user-data__social-network" v-if="canViewSocial">
                        <div class="user-data__link-vk mr-2">
                            <a :href="user.social_vk" target="_blank" v-if="isValidLink(user.social_vk)">
                                <SvgIcon icon-name="vk" />
                            </a>
                        </div>
                        <div class="user-data__link-telegram mr-2" v-if="isValidLink(user.social_tg)">
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
                        <div class="user-data__contact-contact_item" v-if="canViewPhone">
                            <SvgIcon icon-name="phone" />
                            <p class="ml-2">{{ user.phone_number }}</p>
                        </div>
                        <div class="user-data__contact-contact_item mail" v-if="canViewEmail">
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
import { Avatar, bannerPhoto } from '@shared/components/imagescomp';
import { useUserStore } from '@features/store/index';
import { useRegionalsStore } from '@features/store/regionals';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
import { SvgIcon } from '@shared/index';

const props = defineProps({
    banner: String,
    avatar: String,
    user: Object,
    education: Object,
    position: Object,
    commander: Object,
});

const userStore = useUserStore();
const roleStore = useRoleStore();
const regionalsStore = useRegionalsStore();
const regionals = storeToRefs(regionalsStore);

const emit = defineEmits(['upload', 'update', 'delete']);

const uploadAva = (imageAva) => emit('upload', imageAva);
const updateAva = (imageAva) => emit('update', imageAva);
const deleteAva = (imageAva) => emit('delete', imageAva);

const uploadWall = (imageWall) => emit('uploadWall', imageWall);
const updateWall = (imageWall) => emit('updateWall', imageWall);
const deleteWall = (imageWall) => emit('deleteWall', imageWall);

const canViewBanner = computed(() => {
    return checkPrivacy('privacy_photo');
});

const canViewSocial = computed(() => {
    return checkPrivacy('privacy_social');
});

const canViewPhone = computed(() => {
    return checkPrivacy('privacy_telephone');
});

const canViewEmail = computed(() => {
    return checkPrivacy('privacy_email');
});

const isCommander = computed(() => {
    return Object.values(props.commander).some(commander => commander?.id);
});

const hasPosition = computed(() => {
    return Object.values(props.position).some(position => position?.position);
});

const positions = computed(() => {
    return Object.values(props.position)
        .filter(position => position?.headquarter?.name)
        .map(position => position.headquarter.name);
});

const getPositions = () => {
    const position = Object.values(props.position).find(pos => pos?.position);
    return position ? position.position : 'Боец';
};

const isValidLink = (link) => {
    return link && !link.endsWith('/');
};

const copyL = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyMessage = document.querySelector('.copy-message');
    copyMessage.hidden = false;
    setTimeout(() => {
        copyMessage.hidden = true;
    }, 2000);
};

const checkPrivacy = (privacyType) => {
    const userPrivacy = props.user.privacy?.[privacyType];
    return (
        userPrivacy === 'Члены отряда' && props.user.detachment_id === userStore.currentUser.detachment_id ||
        userPrivacy === 'Руководство' && (
            (roleStore.roles.detachment_commander && roleStore.roles.detachment_commander?.id === props.user.detachment_id) ||
            (roleStore.roles.regionalheadquarter_commander && roleStore.roles.regionalheadquarter_commander?.id === props.user.regional_headquarter_id) ||
            roleStore.roles.localheadquarter_commander ||
            roleStore.roles.educationalheadquarter_commander ||
            roleStore.roles.districtheadquarter_commander ||
            roleStore.roles.centralheadquarter_commander
        ) ||
        userPrivacy === 'Все' ||
        userPrivacy === 'all'
    );
};

watch(() => props.user, (newUser) => {
    if (Object.keys(props.user).length === 0) return;
    regionalsStore.searchRegionals(props.user.region);
});

onMounted(() => {
    regionalsStore.searchRegionals(props.user.region);
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
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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