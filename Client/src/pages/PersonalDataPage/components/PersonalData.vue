<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h2 class="profile-title">Настройки профиля</h2>
        <BannerComp></BannerComp>
        <!--Табы-->
        <AccordionsPersonal></AccordionsPersonal>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { AccordionsPersonal } from '@features/PersonalAccordions/components';
import { BannerComp } from '@features/baner/components';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Настройка профиля', href: '#' },
]);
</script>
<style lang="scss">
.profile-title {
  font-size: 40px;
  margin-bottom: 40px;
}
</style>
