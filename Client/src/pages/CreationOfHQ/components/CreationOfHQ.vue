<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание штаба СО ОО</h1>

        <FormCreateHQ :unit="unit"></FormCreateHQ>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormCreateHQ } from '@features/FormHQ';

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Штабы СО ОО', href: '#' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);

const unit = ref({
    title: '',
    institution: '',
    date: '',
    regionalOffice: '',
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

<style lang="scss">
.v-expansion-panel {
    .v-field__outline {
        display: flex;
        border-radius: 10px;
    }
}
</style>
