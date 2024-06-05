<template>
    <div class="container">
        <h1 class="title title--mb">Создание местного штаба</h1>

        <FormLHQ
            :headquarter="headquarter"
            :is-error="isError"
            @submit.prevent="changeHeadquarter"
            @select-file="onSelectFile"
            @reset-emblem="onResetEmblem"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
        ></FormLHQ>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { FormLHQ } from '@features/FormLHQ';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';

const router = useRouter();

const headquarter = ref({
    name: '',
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

const isEmblemChange = ref(false);
const isBannerChange = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectFile = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onResetEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};
const onResetBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const isError = ref({});
const swal = inject('$swal');

const getErrors = () => {
    if (isError.value.non_field_errors) return isError.value.non_field_errors;
    if (isError.value.detail) return isError.value.detail;
    else return 'Заполните обязательные поля';
};

const changeHeadquarter = async () => {
    const formData = new FormData();
    formData.append('name', headquarter.value.name);
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

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');

    HTTP.post('locals/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
            // console.log(response.data);
            swal.fire({
                position: 'center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push({
                name: 'LocalHQ',
                params: { id: response.data.id },
            });
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            console.log('Ошибки отправки формы', isError.value);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: `Ошибка - ${getErrors()}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>