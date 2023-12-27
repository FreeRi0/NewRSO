<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование местного штаба</h1>
        <FormLocal :participants="true"></FormLocal>
        <!-- <FormDH :participants="true" :unit="unit"></FormDH> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormLocal } from '@features/FormLocal';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Местные штабы', href: '#' },
    { pageTitle: 'Сыктывкарский местный штаб', href: '#' },
    { pageTitle: 'Редактирование', href: '#' },
]);

// const unit = ref({
//     title: '',
//     regional: null,
//     city: '',
//     beast: '',
//     vk: '',
//     te: '',
//     slogan: '',
//     about: '',
//     avatar: '',
//     banner: '',
//     regNameI: '',
//     regNameP: '',
//     address: '',
//     requisites: '',
//     ofDate: '',
// });
</script>

<style lang="scss"></style>
