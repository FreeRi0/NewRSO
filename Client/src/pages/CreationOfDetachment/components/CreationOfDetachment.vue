<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание ЛСО</h1>

        <FormUnit :unit="unit"></FormUnit>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormUnit } from '@features/FormUnit';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'ЛСО', href: '#' },
    { pageTitle: 'Создание ЛСО', href: '#' },
]);

const unit = ref({
    squad: '',
    direction: null,
    date: '',
    region: null,
    city: '',
    institution: null,
    beast: null,
    vk: '',
    te: '',
    slogan: '',
    about: '',
    avatar: '',
    banner: '',
    photoOne: '',
    photoTwo: '',
    photoThree: '',
    photoFour: '',
});
</script>

<style lang="scss"></style>
