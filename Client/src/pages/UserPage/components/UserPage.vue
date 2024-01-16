<template>
    <div class="container">
        <div class="user-wrapper">
            <Breadcrumbs :items="pages"></Breadcrumbs>
            <h2 class="page-title" v-if="currentUser">Моя страница</h2>
            <h2 class="page-title" v-else>
                Пользователь: {{ user.first_name }}
            </h2>
            <BannerComp
                :user="user"
                :education="education"
                :user_region="region"
                :edited="false"
                class="mt-3"
            ></BannerComp>
            <div class="user-verify" v-if="!user.is_verified">
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

            <div class="mt-14" v-if="user.is_verified">{{ user.bio }}</div>
            <div class="mt-8 d-flex">
                <userPhoto
                    class="photo-item"
                    :photo="user?.media?.photo1"
                    :add="false"
                ></userPhoto>
                <userPhoto2
                    class="photo-item"
                    :photo="user?.media?.photo2"
                    :add="false"
                ></userPhoto2>
                <userPhoto3
                    class="photo-item"
                    :photo="user?.media?.photo3"
                    :add="false"
                ></userPhoto3>
                <userPhoto4
                    class="photo-item"
                    :photo="user?.media?.photo4"
                    :add="false"
                ></userPhoto4>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { BannerComp } from '@features/baner/components';
import { TextArea } from '@shared/components/inputs';
import {
    userPhoto,
    userPhoto2,
    userPhoto3,
    userPhoto4,
} from '@shared/components/imagescomp';

import { ref, computed, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Моя страница', href: '#' },
]);

const user = ref({});
const currentUser = ref({});
const education = ref({});
const region = ref({});
const route = useRoute();
let id = route.params.id;

const getUser = async () => {
    await HTTP.get(`/rsousers/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const getMedia = async () => {
    await HTTP.get(`/rsousers/me/media/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            media.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getUser();
    }
});

watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        getUser();
    },
);

onMounted(() => {

    getUser();
});
</script>
<style lang="scss" scoped>
.user-wrapper {
    padding: 60px 0px 80px 0px;
}
.user-verify {
    margin-top: 60px;
    margin-bottom: 40px;
    &__title {
        font-size: 32px;
        color: #35383F;
        font-weight: 600;
        @media screen and (max-width: 575px) {
            font-size: 28px;
        }
    }
    &__desc {
        font-size: 18px;
        color: #35383F;
        font-weight: 40;
        margin-top: 40px;
        max-width: 835px;
        margin-bottom: 40px;
        @media screen and (max-width: 768px) {
            max-width: 620px;
        }
        @media screen and (max-width: 575px) {
            max-width: 328px;
        }
    }
}

.photo-item {
    width: 260px;
    margin-right: 20px;
}
.btn {
    margin: 0px;
    padding: 12px 62px;
    height: 52px;
}
</style>
