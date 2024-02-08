<template>
    <div>
        <div class="container">
            <p class="notify__text">
                Рады приветствовать на&nbsp;нашем сайте, который
                мы&nbsp;запустили к&nbsp;старту мероприятий юбилейного года РСО.
                Обычно при запуске платформ и&nbsp;одновременной
                регистрации/работе пользователей с&nbsp;разных устройств могут
                появляться неполадки. Если вы&nbsp;с&nbsp;ними столкнетесь,
                то&nbsp;сообщите нам об&nbsp;этом по&nbsp;адресу электронной
                почты:
                <a href="mailto:rso.login@yandex.ru">rso.login@yandex.ru</a> или
                <a href="https://t.me/LK_RSO_Support"
                    >напишите нам в&nbsp;Телеграм</a
                >.
            </p>
            <div
                v-if="
                    currentUser.currentUser.value.is_verified === false &&
                    isAuth
                "
                class="required_verification"
            >
                <p>Необходимо верифицироваться до 25 февраля 2024 года</p>
            </div>
        </div>

        <app-breadcrumbs v-if="!hidden" :breadcrumbs="breadcrumbs" />

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@features/store/index';
import { useRegionalsStore } from '@features/store/regionals';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());

import { useRoleStore } from '@layouts/store/role';
const regionalsStore = useRegionalsStore();
const regionalHeadquarters = storeToRefs(regionalsStore);
const roleStore = useRoleStore();
const userStore = useUserStore();
const currentUser = storeToRefs(userStore);
console.log('user', currentUser.currentUser.value);

const isAuth = ref(!!localStorage.getItem('Token'));

onMounted(() => {
    userStore.getUser();
    roleStore.getRoles();
    regionalsStore.getRegionals();
});

//запрос на коммандира
</script>

<style scoped lang="scss">
.notify__text {
    max-width: 980px;
    margin: 28px auto;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 14px;
    line-height: 22px;
    color: #35383f;

    & > a {
        text-decoration: underline;
    }

    a:last-child {
        color: #1f7cc0;
        text-decoration: none;
    }
}
.required_verification {
    border: 1px solid #a3a3a3;
    border-radius: 7px;
    text-align: center;
    padding-top: 37.6px;
    padding-bottom: 37.6px;
    margin-bottom: 30px;
}
.required_verification p {
    font-size: 36px;
    line-height: 43.2px;
    font-family: 'Akrobat';
    font-weight: 500;
    color: #35383f;
}
</style>
