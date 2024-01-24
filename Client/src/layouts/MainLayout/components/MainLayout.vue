<template>
    <div>
        <div class="container">
            <p class="notify__text">
                Рады приветствовать на нашем сайте, который мы запустили к
                старту мероприятий юбилейного года РСО. Обычно при запуске
                платформ и одновременной регистрации/работе пользователей с
                разных устройств могут появляться неполадки. Если вы с ними
                столкнетесь, то сообщите нам об этом по адресу электронной
                почты:
                <a href="mailto:rso.login@yandex.ru">rso.login@yandex.ru</a>.
            </p>
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
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';

const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());

// import { useRoleStore } from '@layouts/store/role';
// const roleStore = useRoleStore();
// roleStore.getRoles();

//запрос на коммандира
</script>

<style scoped lang="scss">
.notify__text {
    margin: 20px 0;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 14px;
    line-height: 22px;
    color: #35383f;

    & > a {
        text-decoration: underline;
    }
}
</style>
