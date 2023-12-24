<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание регионального штаба</h1>

        <FormHQ :unit="unit"></FormHQ>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Региональные штабы', href: '#' },
    { pageTitle: 'Создание регионального штаба', href: '#' },
]);

const unit = ref({
    title: '',
    institution: null,
    date: '',
    regional: null,
    city: '',
    beast: '',
    vk: '',
    te: '',
    slogan: '',
    about: '',
    avatar: '',
    banner: '',
});
</script>

<style lang="scss"></style>
