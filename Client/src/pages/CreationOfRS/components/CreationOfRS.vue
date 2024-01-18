<template>
    <div class="container">
        <h1 class="title title--lso">Создание регионального штаба</h1>
        <FormRS
            :headquarter="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-file="onSelectFile"
            @reset-file="onResetFile"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
        ></FormRS>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { FormRS } from '@features/FormRS';
import { HTTP } from '@app/http';
// import { districtItem } from '@entities/HeadquartersData/components/index';

const headquarter = ref({
    name: '',
    district_headquarter: null,
    region: null,
    city: '',
    commander: null,
    social_vk: '',
    social_tg: '',
    founding_date: '',
    conference_date: '',
    registry_number: '',
    registry_date: '',
    name_for_certificates: '',
    case_name: '',
    legal_address: '',
    requisites: '',
    slogan: '',
    about: '',
    emblem: null,
    banner: null,
});

const submited = ref(false);

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

const changeHeadquarter = async () => {
    const formData = new FormData();
    formData.append('name', headquarter.value.name);
    formData.append('district_headquarter', headquarter.value.district_headquarter);
    formData.append('region', headquarter.value.region);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('conference_date', headquarter.value.conference_date);
    formData.append('registry_number', headquarter.value.registry_number);
    formData.append('registry_date', headquarter.value.registry_date);
    formData.append('name_for_certificates', headquarter.value.name_for_certificates);
    formData.append('case_name', headquarter.value.case_name);
    formData.append('legal_address', headquarter.value.legal_address);
    formData.append('requisites', headquarter.value.requisites);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);
    formData.append('emblem', fileEmblem.value);
    formData.append('banner', fileBanner.value);

    HTTP.post('regionals/', formData, {
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
</script>
