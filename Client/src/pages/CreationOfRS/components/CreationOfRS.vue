<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание регионального штаба</h1>

        <FormRS :unit="unit"></FormRS>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormRS } from '@features/FormRS';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Региональные штабы', href: '#' },
    { pageTitle: 'Создание регионального штаба', href: '#' },
]);

const unit = ref({
    title: '',
    regional: null,
    city: '',
    beast: '',
    vk: '',
    te: '',
    slogan: '',
    about: '',
    avatar: '',
    banner: '',
    regNameI: '',
    regNameP: '',
    address: '',
    requisites: '',
    ofDate: '',
});
</script>

<style lang="scss"></style>
