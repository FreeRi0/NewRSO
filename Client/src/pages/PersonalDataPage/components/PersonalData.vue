<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h2 class="profile-title">Настройки профиля</h2>
        <BannerComp></BannerComp>
        <!--Табы-->
        <div class="d-flex mt-9 mb-9">
            <button
                type="button"
                class="contributorBtn"
                :class="{ active: picked === true }"
                @click="picked = true"
            >
                Моя страница
            </button>

            <button
                type="button"
                class="contributorBtn"
                :class="{ active: picked === false }"
                @click="picked = false"
            >
                Персональные данные
            </button>
        </div>
        <AccordionsPersonal v-if="picked === false"></AccordionsPersonal>
        <userData v-else="picked === true"></userData>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { AccordionsPersonal } from '@features/PersonalAccordions/components';
import { BannerComp } from '@features/baner/components';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import {userData} from '@features/userData/components'

const picked = ref(false);
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

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    margin: 7px;
}

.active {
    background-color: #1c5c94;
    color: white;
}

</style>
