<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание штаба СО ОО</h1>

        <FormCreateUnit :data="dataCreateHQ"></FormCreateUnit>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormCreateUnit } from '@features/FormCreateUnit';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: ' Создание штаба СО ОО', href: '#' },
]);

const dataCreateHQ = ref({
    squadIsVisible: false,
    headquartersIsVisibe: true,
    squad: '',
    direction: '',
    date: '',
    region: '',
    city: '',
    institution: '',
    beast: '',
    vk: '',
    te: '',
    slogan: '',
    about: '',
    avatar: '',
    banner: '',
    participants: false,
});
</script>

<style lang="scss">
.v-expansion-panel {
    border-bottom: 1px solid #d9d9d9;

    &__shadow {
        box-shadow: none;
    }

    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        padding: 16px 0;
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 24px;
        line-height: 28px;
        font-weight: 600;
        background-color: transparent;

        &--active {
            margin-bottom: 40px;
        }

        &__overlay {
            display: none;
        }
    }
}
</style>
