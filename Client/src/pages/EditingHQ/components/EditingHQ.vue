<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование штаба СО ОО</h1>

        <FormHQ :participants="true" :unit="unit"></FormHQ>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Штаб КГПИ', href: '#' },
    { pageTitle: 'Редактирование штаба СО ОО', href: '#' },
]);

const imgAvatarUrl = ref('@app/assets/lso/logo-invar');
const imgDataUrl = ref('@app/assets/lso/banner-invar');

const unit = ref({
    title: 'Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)',
    institution: 'Алтайский государственный медицинский университет',
    date: '2010-10-10',
    regional: 'Алтайское региональное отделение',
    city: 'Барнаул',
    beast: {
        id: 5,
        img: true,
        srcImg: 'foto-leader-squad-05.png',
        logo: false,
        iconStatus: '',
        title: 'Петров Петр Петрович',
        date: '13.07.2000',
    },
    vk: 'https://vk.com/regionalHQ',
    te: 'https://t.me/regionalHQ',
    slogan: 'Через тернии к звездам!',
    about: 'Основной целью деятельности Штаба является развитие деятельности студенческих отрядов в Университете. Развитие традиций движения, организация обучения руководителей студенческих отрядов, организация досуговых мероприятий и поддержка творческих коллективов. ',
    avatar: imgAvatarUrl,
    banner: imgDataUrl,
});
</script>

<style lang="scss"></style>
