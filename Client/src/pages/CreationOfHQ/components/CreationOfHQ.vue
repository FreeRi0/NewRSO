<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Создание штаба СО ОО</h1>

        <FormHQ
            :headquarter="headquarter"
            @submit.prevent="changeHeadquarter"
        ></FormHQ>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';
import axios from 'axios';

const pages = ref([
    { pageTitle: 'Структура' },
    { pageTitle: 'Штабы СО ОО', href: '/AllHeadquarters' },
    { pageTitle: 'Создание штаба СО ОО', href: '#' },
]);

const headquarter = ref({
    name: '',
    educational_institution: null,
    founding_date: '',
    regional_headquarter: null,
    city: '',
    commander: null,
    social_vk: '',
    social_tg: '',
    slogan: '',
    about: '',
    emblem: null,
    banner: null,
});

const submited = ref(false);

const swal = inject('$swal');

const changeHeadquarter = async () => {
    axios
        .post('api/v1/educationals/', headquarter.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            submited.value = true;
            headquarter.value = response.data;
            console.log(response.data);
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        })
        .catch((error) => {
            console.error('There was an error!', error);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};
</script>

<style lang="scss"></style>
