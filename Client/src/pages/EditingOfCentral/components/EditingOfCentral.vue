<template>
    <div class="container container--top">
        <h1 class="title title--lso">Редактирование центрального штаба</h1>
        <FormCentr
            :participants="true"
            :headquarter="headquarter"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
        >
        </FormCentr>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormCentr } from '@features/FormCentr';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';

const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);

const { replaceTargetObjects } = usePage();

const getHeadquarter = async () => {
    await HTTP.get(`centrals/1/`, {
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

/**
 * переменные на удаление фото из БД
 */
const isEmblemChange = ref(false);
const isBannerChange = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectEmblem = (file) => {
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
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
    formData.append('date_students', headquarter.value.date_students);
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('date_first', headquarter.value.date_first);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    if (fileEmblem.value) formData.append('emblem', fileEmblem.value);
    if (fileBanner.value) formData.append('banner', fileBanner.value);

    /**
     * можно написать в этом же if, через или, но нужно указать что именно мы принимает null
     * переписать запрос в корректный вид, чтобы не было задвоения
     */
    // Условия удалени фото из БД
    if (isEmblemChange.value && !fileEmblem.value) {
        HTTP.patch(
            '/centrals/1/',
            { emblem: fileEmblem.value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        )
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
    }

    if (isBannerChange.value && !fileBanner.value) {
        HTTP.patch(
            '/centrals/1/',
            { banner: fileBanner.value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        )
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
    }

    HTTP.patch('/centrals/1/', formData, {
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
