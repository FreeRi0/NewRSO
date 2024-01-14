<template>
    <div class="container container--top">
        <Breadcrumbs></Breadcrumbs>

        <h1 class="title title--lso">Редактирование штаба СО ОО</h1>

        <FormHQ
            :participants="true"
            :headquarter="headquarter"
            :is-error="isError"
            v-if="headquarter && isError"
            @submit.prevent="changeHeadquarter"
            @select-file="onSelectFile"
            @reset-file="onResetFile"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
        ></FormHQ>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormHQ } from '@features/FormHQ';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);

const getHeadquarter = async () => {
    await HTTP.get(`educationals/${id}/`, {
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

const isError = ref({});
const swal = inject('$swal');

const changeHeadquarter = async () => {
    const formData = new FormData();
    formData.append('name', headquarter.value.name);
    formData.append(
        'educational_institution',
        headquarter.value.educational_institution,
    );
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append(
        'regional_headquarter',
        headquarter.value.regional_headquarter,
    );
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);

    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);
    formData.append('emblem', fileEmblem.value);
    formData.append('banner', fileBanner.value);

    HTTP.put(`/educationals/${id}/`, formData, {
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
            router.push({
                name: 'HQ',
                params: { id: headquarter.value.id },
            });
        })
        // .catch((error) => {
        //     console.error('There was an error!', error);
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            console.log('Ошибки отправки формы', isError.value);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: `ошибка - ${isError.value.non_field_errors}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>
