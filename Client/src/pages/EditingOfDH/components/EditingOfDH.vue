<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование окружного штаба</h1>
        <FormDH
            :participants="true"
            :headquarter="headquarter"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
        >
        </FormDH>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormDH } from '@features/FormDH';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';

const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);

const { replaceTargetObjects } = usePage();

const getHeadquarter = async () => {
    await HTTP.get(`districts/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            console.log(response);
            console.log('111');
            replaceTargetObjects([headquarter.value]);
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
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    // если в isEmblemChange, что-то есть, то отправь фоточку, а если нет, то отправь пустую строку - ничего
    // if (isEmblemChange.value) {
    //     if (fileEmblem.value) {
    //         formData.append('emblem', fileEmblem.value);
    //     } else {
    //         formData.append('emblem', '');
    //     }
    // }

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');

    HTTP.patch(`/districts/${id}/`, formData, {
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
