<template>
    <div class="container">
        <div class="user-wrapper">
            <h2 class="page-title">Моя страница</h2>
            <banner
                :user="currentUser.currentUser.value"
                :education="education"
                :user_region="region"
                :edited="true"
                class="mt-3"
                @upload-wall="uploadWall"
                @update-wall="updateWall"
                @delete-wall="deleteWall"
                @upload="uploadAva"
                @update="updateAva"
                @delete="deleteAva"
            ></banner>
            <div class="user-verify" v-if="!currentUser.currentUser.value.is_verified">
                <p class="user-verify__title">Верификация данных</p>
                <div class="user-verify__desc">
                    Уважаемый пользователь, для того, чтобы использовать полный
                    функционал личного кабинета, пройдите, пожалуйста,
                    верификацию. Верификация — это документальное подтверждение
                    ваших личных данных. Она займет всего несколько минут.
                </div>
                <router-link to="/PersonalData">
                    <Button
                        class="user-verify__btn"
                        name="verify-btn"
                        label="Пройти верификацию"
                        color="primary"
                    ></Button
                ></router-link>
            </div>

            <div class="mt-14" v-if="currentUser.currentUser.value.is_verified">
                {{ currentUser.currentUser.value.bio }}
            </div>
            <div class="mt-8 photoWrapper">
                <userPhoto
                    class="photo-item"
                    :photo="currentUser.currentUser.value.media?.photo1"
                    :add="false"
                    @uploadUserPic="uploadUserPic"
                    @updateUserPic="updateUserPic"
                ></userPhoto>
                <userPhoto2
                    class="photo-item"
                    :photo="currentUser.currentUser.value.media?.photo2"
                    :add="false"
                ></userPhoto2>
                <userPhoto3
                    class="photo-item"
                    :photo="currentUser.currentUser.value.media?.photo3"
                    :add="false"
                ></userPhoto3>
                <userPhoto4
                    class="photo-item"
                    :photo="currentUser.currentUser.value.media?.photo4"
                    :add="false"
                ></userPhoto4>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { banner } from '@features/baner/components';
import { TextArea } from '@shared/components/inputs';
import {
    userPhoto,
    userPhoto2,
    userPhoto3,
    userPhoto4,
} from '@shared/components/imagescomp';

import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const currentUser = storeToRefs(userStore);
console.log('userTop', currentUser.currentUser.value);
const education = ref({});
const region = ref({});

const uploadAva = (imageAva) => {
    console.log('photo', imageAva);
    currentUser.currentUser.value.media.photo = imageAva;
};

const updateAva = (imageAva) => {
    console.log('photoUpdate', imageAva);
    currentUser.currentUser.value.media.photo = imageAva;
};

const deleteAva = (imageAva) => {
    console.log('photoDelete', imageAva);
    currentUser.currentUser.value.media.photo = imageAva;
};

const uploadWall = (imageWall) => {
    console.log('ban', imageWall);
    currentUser.currentUser.value.media.banner = imageWall;
};

const updateWall = (imageWall) => {
    console.log('banUpdate', imageWall);
    currentUser.currentUser.value.media.banner = imageWall;
};

const deleteWall = (imageWall) => {
    console.log('banDelete', imageWall);
    currentUser.currentUser.value.media.banner = imageWall;
};
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
    width: 260px;
    margin-right: 20px;
    @media screen and (max-width: 575px) {
        height: 373px;
        width: 280px;
        margin-right: 0;
    }
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
