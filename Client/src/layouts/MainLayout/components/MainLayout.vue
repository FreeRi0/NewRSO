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
import { useUserStore } from '@features/store/index';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());

import { useRoleStore } from '@layouts/store/role';
const roleStore = useRoleStore();
const userStore = useUserStore();
userStore.getUser();
roleStore.getRoles();

//запрос на коммандира
</script>

<style scoped lang="scss">
.notify__text {
    max-width: 980px;
    margin: 20px auto;
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
</style>
