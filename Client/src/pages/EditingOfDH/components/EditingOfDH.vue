<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование окружного штаба</h1>
        <FormDH :participants="true"></FormDH>
        <!-- <FormDH :participants="true" :unit="unit"></FormDH> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormDH } from '@features/FormDH';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Окружные штабы', href: '#' },
    { pageTitle: 'Штаб Центрального федерального округа', href: '#' },
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

