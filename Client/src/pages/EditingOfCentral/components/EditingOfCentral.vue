<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование центрального штаба</h1>

        <FormCentr :participants="true"></FormCentr>
        <!-- <FormCentr :participants="true" :unit="unit"></FormCentr> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormCentr } from '@features/FormCentr';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Центральный штаб', href: '#' },
    { pageTitle: 'Редактирование', href: '#' },
]);

// const unit = ref({
//     name: '',
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
