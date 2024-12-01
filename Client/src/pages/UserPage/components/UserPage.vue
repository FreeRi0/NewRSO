<template>
    <div class="container">
        <div class="user-wrapper" v-if="!userStore.isLoading">
            <h2 class="page-title">Страница пользователя</h2>
            <Wall 
                :user="userStore.user" 
                :education="education" 
                :user_region="region" 
                :position="roleStore.positions"
                :commander="roleStore.userRoles" 
                class="mt-3" 
                @upload-wall="uploadWall" 
                @update-wall="updateWall"
                @delete-wall="deleteWall" 
                @upload="uploadAva" 
                @update="updateAva" 
                @delete="deleteAva"
            />

            <div class="mt-14" v-if="canViewBio">
                {{ userStore.user.bio }}
            </div>
            <div class="mt-8 photoWrapper" v-if="canViewPhotos">
                <user-photo 
                    v-for="(photo, index) in media" 
                    :key="index" 
                    class="photo-item" 
                    :photo="photo" 
                    :add="false"
                    :number="index" 
                />
            </div>
            <div class="mt-8 photoWrapper" v-else>
                <div 
                    v-for="index in 4" 
                    :key="index" 
                    class="avatar-preview my_photo__plug photo-item"
                >
                    <img src="@/app/assets/user-banner.jpg" alt="Фото пользователя(пусто)" />
                </div>
            </div>
        </div>
        <v-progress-circular class="circleLoader" v-else indeterminate color="blue"></v-progress-circular>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Wall } from '@features/baner/components';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
// import { useSquadsStore } from '@features/store/squads';
// import { useRegionalsStore } from '@features/store/regionals';
import { userPhoto } from '@shared/components/imagescomp';

const userStore = useUserStore();
const roleStore = useRoleStore();
// const squadsStore = useSquadsStore();
// const regionalsStore = useRegionalsStore();

const education = ref({});
const region = ref({});
const media = ref({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
});

const route = useRoute();
let id = route.params.id;

const canView = (privacyType) => {
    const user = userStore.user;
    const roles = roleStore.roles;
    const privacy = user.privacy?.[privacyType];

    return user.is_verified ||
        (privacy === 'Члены отряда' && user.detachment_id === userStore.currentUser.detachment_id) ||
        (privacy === 'Руководство' && (
            (roles.detachment_commander && roles.detachment_commander?.id === user.detachment_id) ||
            (roles.regionalheadquarter_commander && roles.regionalheadquarter_commander?.id === user.regional_headquarter_id) ||
            roles.localheadquarter_commander ||
            roles.educationalheadquarter_commander ||
            roles.districtheadquarter_commander ||
            roles.centralheadquarter_commander
        )) ||
        privacy === 'Все' ||
        privacy === 'all';
};

const canViewBio = computed(() => canView('privacy_about'));
const canViewPhotos = computed(() => canView('privacy_photo'));

const updateMedia = (type, image) => {
    userStore.user.media[type] = image;
};

const uploadAva = (imageAva) => updateMedia('photo', imageAva);
const updateAva = (imageAva) => updateMedia('photo', imageAva);
const deleteAva = () => updateMedia('photo', null);

const uploadWall = (imageWall) => updateMedia('banner', imageWall);
const updateWall = (imageWall) => updateMedia('banner', imageWall);
const deleteWall = () => updateMedia('banner', null);

watch(
    () => route.params.id,
    async (newId) => {
        if (!newId && route.name !== "userpage") {
            return false;
        }
        id = newId;
        await userStore.getUserId(id);
        await roleStore.getPositions(id);
        await roleStore.getUserRoles(id);
    },
    {
        immediate: true,
        deep: true,
    },
);

watch(() => userStore.user.media, (photos) => {
    media.value = {
        photo1: photos?.photo1,
        photo2: photos?.photo2,
        photo3: photos?.photo3,
        photo4: photos?.photo4,
    };
}, { deep: true });
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