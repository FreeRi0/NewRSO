<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование ЛСО</h1>

        <FormUnit :participants="true" :unit="unit"></FormUnit>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormUnit } from '@features/FormUnit';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'ЛСО', href: '#' },
    { pageTitle: 'ССО «Инвар»', href: '#' },
    { pageTitle: 'Редактирование', href: '#' },
]);

const imgAvatarUrl = ref('@app/assets/lso/logo-invar');
const imgDataUrl = ref('@app/assets/lso/banner-invar');

const unit = ref({
    squad: 'Инвар',
    direction: 'ССО',
    date: '2003-08-16',
    region: ' Алтайский край',
    city: 'Бийск',
    institution: 'Алтайский государственный медицинский университет',
    beast: {
        id: 3,
        img: true,
        srcImg: 'foto-leader-squad-03.png',
        logo: true,
        iconStatus: 'icon-status-03.svg',
        title: 'Сидоров Дмитрий Олегович',
        date: '13.07.2000',
    },
    vk: 'https://vk.com/cco_invar',
    te: 'https://t.me/cco_invar',
    slogan: 'Через тернии к звездам!',
    about: 'Студенческий отряд "Инвар" был основан в 1995 году на базе одного из ведущих вузов нашего региона. Идея создания отряда возникла благодаря нескольким амбициозным студентам, чья основная цель была содействовать активной жизнедеятельности студенческого сообщества и общественной сферы.',
    avatar: imgAvatarUrl,
    banner: imgDataUrl,
    photoOne: '', //------------------------------------------------------------
    photoTwo: '',
    photoThree: '',
    photoFour: '',
});
</script>

<style lang="scss"></style>
