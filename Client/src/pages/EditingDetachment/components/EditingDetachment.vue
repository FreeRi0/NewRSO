<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование ЛСО</h1>

        <!-- <FormCreateUnit /> -->
        <FormCreateUnit :data="dataEditLso"></FormCreateUnit>

        <Checkbox label="ТЕСТ"></Checkbox>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormCreateUnit } from '@features/FormCreateUnit';
import { Checkbox } from '@shared/components/checkboxes'; //------------------------------------

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'ЛСО', href: '#' },
    { pageTitle: 'ССО «Инвар»', href: '#' },
    { pageTitle: 'Редактирование', href: '#' },
]);

const imgAvatarUrl = ref('@app/assets/lso/logo-invar');
const imgDataUrl = ref('@app/assets/lso/banner-invar');

const dataEditLso = ref({
    squad: 'Инвар',
    direction: 'ССО',
    date: '2003-08-16',
    region: ' Алтайский край',
    city: 'Бийск',
    institution: 'Алтайский государственный медицинский университет',
    beast: '',
    vk: 'https://vk.com/cco_invar',
    te: 'https://t.me/cco_invar',
    slogan: 'Через тернии к звездам!',
    about: 'Студенческий отряд "Инвар" был основан в 1995 году на базе одного из ведущих вузов нашего региона. Идея создания отряда возникла благодаря нескольким амбициозным студентам, чья основная цель была содействовать активной жизнедеятельности студенческого сообщества и общественной сферы.',
    avatar: imgAvatarUrl,
    banner: imgDataUrl,
    participants: true,
}); //-------------------------------------------------------------------------
</script>

<style lang="scss">
.title {
    //-----------------------------------общий класс для всех заголовков h1
    // font-family: ;
    font-size: 52px;
    line-height: 62px;
    font-weight: 700;
    color: #35383f;

    &--lso {
        margin-bottom: 50px;
    }
}

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
