<template>
    <div class="container container--top">
        <h1 class="title title--lso">Редактирование штаба СО ОО</h1>
        <FormHQ
            :participants="true"
            :headquarter="headquarter"
            
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
        ></FormHQ>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormHQ } from '@features/FormHQ';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';
// import { useRouter } from 'vue-router';

// const router = useRouter();

const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);

const { replaceTargetObjects } = usePage();

const getHeadquarter = async () => {
    await HTTP.get(`educationals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            replaceTargetObjects([headquarter.value]);
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

    if (fileEmblem.value) formData.append('emblem', fileEmblem.value);
    if (fileBanner.value) formData.append('banner', fileBanner.value);

    if (isEmblemChange.value && !fileEmblem.value) {
        HTTP.patch(
            `/educationals/${id}/`,
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
            `/educationals/${id}/`,
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

    HTTP.patch(`/educationals/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
            // console.log(response.data);
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            // router.push({
            //     name: 'HQ',
            //     params: { id: headquarter.value.id },
            // });
        })
        // .catch((error) => {
        //     console.error('There was an error!', error);
        .catch(({ response }) => {
            // isError.value = response.data;
            console.error('There was an error!', response.data);
            // console.log('Ошибки отправки формы', isError.value);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                // title: `ошибка - ${isError.value.non_field_errors}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>
