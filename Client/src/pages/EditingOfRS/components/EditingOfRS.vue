<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование регионального штаба</h1>
        <FormRS
            :participants="true"
            :headquarter="headquarter"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
        ></FormRS>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormRS } from '@features/FormRS';
import axios from 'axios';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';

const route = useRoute();
let id = route.params.id;

const { replaceTargetObjects } = usePage();

const submited = ref(false);

const headquarter = ref(null);

const getHeadquarter = async () => {
    await HTTP.get(`regionals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            replaceTargetObjects([headquarter.value]);
            // console.log(response);
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

const isEmblemChange = ref(false);
const isBannerChange = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const onDeleteEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onDeleteBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const swal = inject('$swal');

const changeHeadquarter = async () => {
    const formData = new FormData();

    formData.append('name', headquarter.value.name);
    formData.append(
        'district_headquarter',
        headquarter.value.district_headquarter,
    );
    formData.append('region', headquarter.value.region);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('conference_date', headquarter.value.conference_date);
    formData.append('registry_number', headquarter.value.registry_number);
    formData.append(
        'name_for_certificates',
        headquarter.value.name_for_certificates,
    );
    formData.append('case_name', headquarter.value.case_name);
    formData.append('legal_address', headquarter.value.legal_address);
    formData.append('requisites', headquarter.value.requisites);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    headquarter.value.registry_date
        ? formData.append('registry_date', headquarter.value.registry_date)
        : formData.append('registry_date', '');

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');

    HTTP.patch(`/regionals/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
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
