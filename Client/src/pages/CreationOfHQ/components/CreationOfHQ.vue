<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание штаба СО ОО</h1>

        <!-- <FormHQ :unit="unit"></FormHQ> -->
        <FormHQ></FormHQ>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);

// const unit = ref({
//     title: '',
//     institution: null,
//     date: '',
//     regional: null,
//     city: '',
//     beast: '',
//     vk: '',
//     te: '',
//     slogan: '',
//     about: '',
//     avatar: '',
//     banner: '',
// });
</script>

<style lang="scss"></style>
