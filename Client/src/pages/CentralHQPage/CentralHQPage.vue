<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h1 class="title title--hq">Центральный штаб</h1>
        <BannerComp class="mt-3"></BannerComp>
        <HQandSquad></HQandSquad>
    </div>
</template>
<script setup>
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { BannerComp } from '@features/baner/components';
import HQandSquad from '../RegionalHQPage/components/HQandSquad.vue';

const pages = [
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Центральный штаб', href: '#' },
];
</script>
<style lang="scss" scoped></style>
