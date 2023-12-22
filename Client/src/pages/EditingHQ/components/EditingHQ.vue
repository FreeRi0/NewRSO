<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>

        <h1 class="title title--lso">Редактирование штаба СО ОО</h1>

        <FormHQ
            :participants="true"
            :headquarter="headquarter"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
        ></FormHQ>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';
import axios from 'axios';

const pages = ref([
    { pageTitle: 'Структура' },
    { pageTitle: 'Штабы СО ОО', href: '/AllHeadquarters' },
    { pageTitle: 'Штаб КГПИ', href: '#' },
    { pageTitle: 'Редактирование штаба СО ОО', href: '#' },
]);

const submited = ref(false);

const headquarter = ref(null);

const getHeadquarter = async () => {
    await axios
        .get('api/v1/educationals/1', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            headquarter.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    getHeadquarter();
});

const swal = inject('$swal');

const changeHeadquarter = async () => {
    axios
        .put('api/v1/educationals/1/', headquarter.value, {
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
