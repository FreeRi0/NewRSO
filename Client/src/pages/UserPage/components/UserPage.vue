<template>
    <div class="container">
        <div class="user-wrapper" v-if="!isLoading.isLoading.value">
            <h2 class="page-title">Страница пользователя</h2>
            <Wall
                :user="user.user.value"
                :education="education"
                :user_region="region"
                :position="roles.positions.value"
                :commander="roles.userRoles.value"
                class="mt-3"
                @upload-wall="uploadWall"
                @update-wall="updateWall"
                @delete-wall="deleteWall"
                @upload="uploadAva"
                @update="updateAva"
                @delete="deleteAva"
            ></Wall>

            <div
                class="mt-14"
                v-if="
                    user.user.value.is_verified ||
                    (user.user.value.privacy?.privacy_about ===
                        'Члены отряда' &&
                        user.user.value.detachment_id ===
                            currentUser.currentUser.value.detachment_id) ||
                    (user.user.value.privacy?.privacy_about === 'Руководство' &&
                        ((roleStore.roles.detachment_commander &&
                            roleStore.roles.detachment_commander?.id ===
                                user.user.value.detachment_id) ||
                            (roleStore.roles.regionalheadquarter_commander &&
                                roleStore.roles.regionalheadquarter_commander
                                    ?.id ===
                                    user.user.value.regional_headquarter_id) ||
                            roleStore.roles.localheadquarter_commander ||
                            roleStore.roles.educationalheadquarter_commander ||
                            roleStore.roles.districtheadquarter_commander ||
                            roleStore.roles.centralheadquarter_commander)) ||
                    user.user.value.privacy?.privacy_about === 'Все' ||
                    user.user.value.privacy?.privacy_about === 'all'
                "
            >
                {{ user.user.value.bio }}
            </div>
            <div
                class="mt-8 photoWrapper"
                v-if="
                    (user.user.value.privacy?.privacy_photo ===
                        'Члены отряда' &&
                        user.user.value.detachment_id ===
                            currentUser.currentUser.value.detachment_id) ||
                    (user.user.value.privacy?.privacy_photo === 'Руководство' &&
                        ((roleStore.roles.detachment_commander &&
                            roleStore.roles.detachment_commander?.id ===
                                user.user.value.detachment_id) ||
                            (roleStore.roles.regionalheadquarter_commander &&
                                roleStore.roles.regionalheadquarter_commander
                                    ?.id ===
                                    user.user.value.regional_headquarter_id) ||
                            roleStore.roles.localheadquarter_commander ||
                            roleStore.roles.educationalheadquarter_commander ||
                            roleStore.roles.districtheadquarter_commander ||
                            roleStore.roles.centralheadquarter_commander)) ||
                    user.user.value.privacy?.privacy_photo === 'Все' ||
                    user.user.value.privacy?.privacy_photo === 'all'
                "
            >
                <userPhoto
                    class="photo-item"
                    :photo="user.user.value.media?.photo1"
                    :add="false"
                    @uploadUserPic="uploadUserPic"
                    @updateUserPic="updateUserPic"
                ></userPhoto>
                <userPhoto2
                    class="photo-item"
                    :photo="user.user.value.media?.photo2"
                    :add="false"
                ></userPhoto2>
                <userPhoto3
                    class="photo-item"
                    :photo="user.user.value.media?.photo3"
                    :add="false"
                ></userPhoto3>
                <userPhoto4
                    class="photo-item photo-item-last"
                    :photo="user.user.value.media?.photo4"
                    :add="false"
                ></userPhoto4>
            </div>
            <div class="mt-8 photoWrapper" v-else>
                <div class="avatar-preview my_photo__plug photo-item">
                    <img
                        src="@/app/assets/user-banner.jpg"
                        alt="Фото пользователя(пусто)"
                    />
                </div>
                <div class="avatar-preview my_photo__plug photo-item">
                    <img
                        src="@/app/assets/user-banner.jpg"
                        alt="Фото пользователя(пусто)"
                    />
                </div>
                <div class="avatar-preview my_photo__plug photo-item">
                    <img
                        src="@/app/assets/user-banner.jpg"
                        alt="Фото пользователя(пусто)"
                    />
                </div>
                <div class="avatar-preview my_photo__plug photo-item">
                    <img
                        src="@/app/assets/user-banner.jpg"
                        alt="Фото пользователя(пусто)"
                    />
                </div>
            </div>
        </div>
        <v-progress-circular
            class="circleLoader"
            v-else
            indeterminate
            color="blue"
        ></v-progress-circular>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { Wall } from '@features/baner/components';
import { TextArea } from '@shared/components/inputs';
import {
    userPhoto,
    userPhoto2,
    userPhoto3,
    userPhoto4,
} from '@shared/components/imagescomp';

import { ref, watch, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useUserStore } from '@features/store/index';

import { useRegionalsStore } from '@features/store/regionals';
import { useSquadsStore } from '@features/store/squads';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const roleStore = useRoleStore();
const squadsStore = useSquadsStore();
const regionalsStore = useRegionalsStore();
const regionals = storeToRefs(regionalsStore);
const regionalHeadquarter = storeToRefs(regionalsStore);
const roles = storeToRefs(roleStore);
const squad = storeToRefs(squadsStore);
const user = storeToRefs(userStore);
const currentUser = storeToRefs(userStore);
const isLoading = storeToRefs(userStore);
console.log('userTop', user.user.value);
const education = ref({});
const member = ref([]);
const region = ref({});
const route = useRoute();

let id = route.params.id;

const uploadAva = (imageAva) => {
    console.log('photo', imageAva);
    user.user.value.media.photo = imageAva;
};

const updateAva = (imageAva) => {
    console.log('photoUpdate', imageAva);
    user.user.value.media.photo = imageAva;
};

const deleteAva = (imageAva) => {
    console.log('photoDelete', imageAva);
    user.user.value.media.photo = imageAva;
};

const uploadWall = (imageWall) => {
    console.log('ban', imageWall);
    user.user.value.media.banner = imageWall;
};

const updateWall = (imageWall) => {
    console.log('banUpdate', imageWall);
    user.user.value.media.banner = imageWall;
};

const deleteWall = (imageWall) => {
    console.log('banDelete', imageWall);
    user.user.value.media.banner = imageWall;
};

watch(
    () => route.params.id,

    (newId) => {
        if (!newId || route.name !== 'userpage') return;
        id = newId;
        userStore.getUserId(id);
        roleStore.getPositions(id);
        roleStore.getUserRoles(id);
    },
);

onMounted(() => {
    userStore.getUserId(id);
    roleStore.getPositions(id);
    roleStore.getUserRoles(id);
});
</script>
<style lang="scss" scoped>
.user-wrapper {
    padding: 0px 0px 80px 0px;
}

.photoWrapper {
    display: flex;
    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 0.28fr 0.28fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        justify-content: center;
    }
    @media screen and (max-width: 575px) {
        grid-template-columns: 0.28fr;
    }
}
.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}

.user-verify {
    margin-top: 60px;
    margin-bottom: 40px;
    &__title {
        font-size: 32px;
        color: #35383f;
        font-weight: 600;
        @media screen and (max-width: 575px) {
            font-size: 28px;
        }
    }
    &__desc {
        font-size: 18px;
        color: #35383f;
        font-weight: 40;
        margin-top: 40px;
        max-width: 835px;
        margin-bottom: 40px;
        @media screen and (max-width: 768px) {
            max-width: 620px;
        }
        @media screen and (max-width: 575px) {
            width: 100%;
        }
    }
}

.photo-item {
    width: 280px;
    margin-right: 20px;
    @media screen and (max-width: 575px) {
        height: 373px;
        width: 280px;
        margin-right: 0;
    }
}
.photo-item-last {
    margin-right: 0;
}

.btn {
    margin: 0px;
    padding: 12px 62px;
    height: 52px;
    @media screen and (max-width: 575px) {
        margin: 0px auto;
        width: 100%;
    }
}
</style>
@shared/components/inputs/imagescomp
