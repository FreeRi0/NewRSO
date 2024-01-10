<template>
    <div class="container">
        <Breadcrumbs></Breadcrumbs>

        <h1 class="title title--lso">Редактирование ЛСО</h1>

        <FormUnit
            :participants="true"
            :detachment="detachment"
            v-if="detachment"
            @submit.prevent="changeDetachment"
            @select-file="onSelectFile"
            @reset-file="onResetFile"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
            @select-photo-one="onSelectPhotoOne"
            @reset-phot-one="onResetPhotoOne"
            @select-photo-two="onSelectPhotoTwo"
            @reset-photo-two="onResetPhotoTwo"
            @select-photo-three="onSelectPhotoThree"
            @reset-photo-three="onResetPhotoThree"
            @select-photo-four="onSelectPhotoFour"
            @reset-photo-four="onResetPhotoFour"
        ></FormUnit>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { FormUnit } from '@features/FormUnit';
import axios from 'axios';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
console.log(route);
let id = route.params.id;

const detachment = ref(null);
// const detachment = ref({});

// const getDetachment = async () => {
//   await axios
//     .get("api/v1/detachments/1", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Token " + localStorage.getItem("Token"),
//       },
//     })
//     .then((response) => {
//       detachment.value = response.data;
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log("an error occured " + error);
//     });
// };

const getDetachment = async () => {
    console.log('id отряда для редактирования - ', id);
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            detachment.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getDetachment();
    }
});

watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        getDetachment();
    },
);

onMounted(() => {
    getDetachment();
});

const submited = ref(false);
const fileEmblem = ref(null);
const fileBanner = ref(null);
const filePhotoOne = ref(null);
const filePhotoTwo = ref(null);
const filePhotoThree = ref(null);
const filePhotoFour = ref(null);

const swal = inject('$swal');

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
const onSelectPhotoOne = (file) => {
    filePhotoOne.value = file;
};
const onResetPhotoOne = (file) => {
    filePhotoOne.value = file;
};
const onSelectPhotoTwo = (file) => {
    filePhotoTwo.value = file;
};
const onResetPhotoTwo = (file) => {
    filePhotoTwo.value = file;
};
const onSelectPhotoThree = (file) => {
    filePhotoThree.value = file;
};
const onResetPhotoThree = (file) => {
    filePhotoThree.value = file;
};
const onSelectPhotoFour = (file) => {
    filePhotoFour.value = file;
};
const onResetPhotoFour = (file) => {
    filePhotoFour.value = file;
};

const changeDetachment = async () => {
    // HTTP.put(`detachments/${id}/`, detachment.value, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Token " + localStorage.getItem("Token"),
    //   },
    // })
    //   .then((response) => {
    //     submited.value = true;
    //     detachment.value = response.data;
    //     console.log(response.data);
    //     swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: "успешно",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //     swal.fire({
    //       position: "top-center",
    //       icon: "error",
    //       title: "ошибка",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   });

    const formData = new FormData();
    formData.append('name', detachment.value.name);
    formData.append('area', detachment.value.area);
    formData.append('founding_date', detachment.value.founding_date);
    formData.append('region', detachment.value.region);
    formData.append('city', detachment.value.city);
    formData.append(
        'educational_institution',
        detachment.value.educational_institution,
    );
    formData.append('commander', detachment.value.commander);
    formData.append('social_vk', detachment.value.social_vk);
    formData.append('social_tg', detachment.value.social_tg);

    formData.append('slogan', detachment.value.slogan);
    formData.append('about', detachment.value.about);
    // console.log(
    //   "значение filePhotoOne при отпр формы - ",
    //   filePhotoOne.value,
    //   filePhotoTwo.value,
    //   filePhotoThree.value,
    //   filePhotoFour.value
    // );
    formData.append('emblem', fileEmblem.value);
    formData.append('banner', fileBanner.value);
    formData.append('photo1', filePhotoOne.value);
    formData.append('photo2', filePhotoTwo.value);
    formData.append('photo3', filePhotoThree.value);
    formData.append('photo4', filePhotoFour.value);

    HTTP.put(`/detachments/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
            // formData = response.data;
            console.log(response.data);
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            //   router.push("/AllSquads");
            // router.push({ name: 'user', params: { userId: '123' } })
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
