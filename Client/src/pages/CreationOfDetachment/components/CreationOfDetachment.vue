<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--create-lso">Создание ЛСО</h1>

        <FormCreateUnit />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormCreateUnit } from '@features/FormCreateUnit';

const pages = [
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'ЛСО', href: '#' },
    { pageTitle: 'Создание ЛСО', href: '#' },
];
</script>

<style lang="scss" scoped>
.title {
    //-----------------------------------общий класс для всех заголовков h1
    // font-family: ;
    font-size: 52px;
    line-height: 62px;
    font-weight: 700;
    color: #35383f;

    &--create-lso {
        margin-bottom: 50px;
    }
}
</style>
