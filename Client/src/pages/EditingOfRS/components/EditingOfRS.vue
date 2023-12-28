<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование регионального штаба</h1>
        <FormRS></FormRS>
        <!-- <FormRS :participants="true" :unit="unit"></FormRS> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormRS } from '@features/FormRS';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Региональные штабы', href: '#' },
    { pageTitle: 'Татарстанский региональный штаб', href: '#' },
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
