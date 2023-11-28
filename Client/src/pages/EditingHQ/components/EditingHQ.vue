<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование штаба СО ОО</h1>

        <FormEditHQ :participantsHQ="true" :unit="unit"></FormEditHQ>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormEditHQ } from '@features/FormEditHQ';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Штаб КГПИ', href: '#' },
    { pageTitle: 'Редактирование штаба СО ОО', href: '#' },
]);

const unit = ref({
    title: 'Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)',
    institution: 'Алтайский государственный медицинский университет',
    date: '2003-08-16',
    regionalOffice: 'Алтайское региональное отделение',
    city: 'Барнаул',
    beast: '',
    vk: 'https://vk.com/regionalHQ',
    te: 'https://t.me/regionalHQ',
    slogan: 'Через тернии к звездам!',
    about: 'Основной целью деятельности Штаба является развитие деятельности студенческих отрядов в Университете. Развитие традиций движения, организация обучения руководителей студенческих отрядов, организация досуговых мероприятий и поддержка творческих коллективов. ',
    avatar: '',
    banner: '',
});
</script>

<style lang="scss"></style>
