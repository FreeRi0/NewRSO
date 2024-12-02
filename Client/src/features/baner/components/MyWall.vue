<template>
    <div class="user-metric">
        <bannerPhoto
            :banner="user.media?.banner"
            @upload-wall="uploadWall"
            @update-wall="updateWall"
            @delete-wall="deleteWall"
            :edited="true"
        ></bannerPhoto>
        <Avatar
            :avatar="user.media?.photo"
            @upload="uploadAva"
            @update="updateAva"
            @delete="deleteAva"
            :edited="true"
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
                        <li class="user-data__regional-office" v-if="user.region && !regionalsStore.isLoading">
                            <div v-for="item in regionals.filteredMyRegional.value" :key="item.name">
                                <p>{{ item.name }}</p>
                            </div>
                        </li>
                        <li v-else>Загрузка региона...</li>
                        <li v-if="user.education?.study_institution?.short_name">
                            <p>{{ user.education?.study_institution?.short_name }}</p>
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
                        <div class="user-data__link-vk mr-2" v-if="isValidLink(user.social_vk)">
                            <a :href="user.social_vk" target="_blank">
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
import { ref, watch, computed } from 'vue';
import { Avatar, bannerPhoto } from '@shared/components/imagescomp';
import { useRegionalsStore } from '@features/store/regionals';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
import { SvgIcon } from '@shared/index';

const props = defineProps({
    banner: String,
    avatar: String,
    user: Object,
    education: Object,
});

const emit = defineEmits(['upload', 'update', 'delete']);

const uploadAva = (imageAva) => emit('upload', imageAva);
const updateAva = (imageAva) => emit('update', imageAva);
const deleteAva = (imageAva) => emit('delete', imageAva);

const uploadWall = (imageWall) => emit('uploadWall', imageWall);
const updateWall = (imageWall) => emit('updateWall', imageWall);
const deleteWall = (imageWall) => emit('deleteWall', imageWall);

const regionalsStore = useRegionalsStore();
const roleStore = useRoleStore();
const regionals = storeToRefs(regionalsStore);

const isCommander = computed(() => {
    return Object.values(roleStore.roles).some(role => role !== null);
});

const hasPosition = computed(() => {
    return Object.values(roleStore.myPositions).some(position => position?.position);
});

const positions = computed(() => {
    return Object.values(roleStore.myPositions)
        .filter(position => position?.headquarter?.name)
        .map(position => position.headquarter.name);
});

const getPositions = () => {
    const position = Object.values(roleStore.myPositions).find(pos => pos?.position);
    return position ? position.position : 'Неизвестная должность';
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

watch(() => props.user, (newUser) => {
    if (Object.keys(props.user).length === 0) return;
    regionalsStore.searchMyRegionals(props.user.region);
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

    @media screen and (min-width: 320px) and (max-width: 480px) {
        display: block;
    }
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
    @media screen and (min-width: 320px) and  (max-width: 480px) {
        padding: 0px 0px 0px 0px;
        margin-top:-90px;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        transform: translateX(-10px)
    }
}

.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    @media screen and (min-width: 320px) and  (max-width: 480px) {
        display: block;
        transform: translateX(10px);
        align-items: center;
    }
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