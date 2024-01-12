<template>
    <div class="container">
        <!-- ЗДЕСЬ ПОМЕНЯЛА -->
        <Breadcrumbs></Breadcrumbs>

        <h1 class="title title--lso">Редактирование местного штаба</h1>
        <!-- ЗДЕСЬ ПОМЕНЯЛА -->
        <FormLocal
            :participants="true"
            :headquarter="headquarter"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-file="onSelectFile"
            @reset-file="onResetFile"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
        ></FormLocal>
        <!-- <FormDH :participants="true" :unit="unit"></FormDH> -->
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
// ЗДЕСЬ ПОМЕНЯЛА
import { FormLocal } from '@features/FormLocal';
import axios from 'axios';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

// const pages = ref([
//     { pageTitle: 'Структура' },
//     { pageTitle: 'Штабы СО ОО', href: '/AllHeadquarters' },
//     { pageTitle: 'Штаб КГПИ', href: '#' },
//     { pageTitle: 'Редактирование штаба СО ОО', href: '#' },
// ]);

const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);

const getHeadquarter = async () => {
    // ЗДЕСЬ ПОМЕНЯЛА
    await HTTP.get(`locals/${id}/`, {
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

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getHeadquarter();
    }
});

watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        getHeadquarter();
    },
);

onMounted(() => {
    getHeadquarter();
});

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectFile = (file) => {
    fileEmblem.value = file;
};
const onResetFile = (file) => {
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
    fileBanner.value = file;
};
const onResetBanner = (file) => {
    fileBanner.value = file;
};

const swal = inject('$swal');

// ЗДЕСЬ ПОМЕНЯЛА, не работает редактирование фото
const changeHeadquarter = async () => {
    const formData = new FormData();

    formData.append('name', headquarter.value.name);
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('regional_headquarter', headquarter.value.regional_headquarter);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);
    formData.append('emblem', fileEmblem.value);
    formData.append('banner', fileBanner.value);

    HTTP.put(`/locals/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
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

// ----------------Проба json-----------------------
// const changeHeadquarter = async () => {
//     // const formData = new FormData();

//     // formData.append('name', headquarter.value.name);
//     // formData.append('founding_date', headquarter.value.founding_date);
//     // formData.append('regional_headquarter', headquarter.value.regional_headquarter);
//     // formData.append('city', headquarter.value.city);
//     // formData.append('commander', headquarter.value.commander);
//     // formData.append('social_vk', headquarter.value.social_vk);
//     // formData.append('social_tg', headquarter.value.social_tg);
//     // formData.append('slogan', headquarter.value.slogan);
//     // formData.append('about', headquarter.value.about);
//     // formData.append('emblem', fileEmblem.value);
//     // formData.append('banner', fileBanner.value);

//     HTTP.put(`/locals/${id}/`, headquarter.value, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             submited.value = true;
//             console.log(response.data);
//             swal.fire({
//                 position: 'top-center',
//                 icon: 'success',
//                 title: 'успешно',
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//         })
//         .catch((error) => {
//             console.error('There was an error!', error);
//             swal.fire({
//                 position: 'top-center',
//                 icon: 'error',
//                 title: 'ошибка',
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//         });
// };
</script>

<style lang="scss"></style>
