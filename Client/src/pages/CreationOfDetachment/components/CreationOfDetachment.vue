<template>
    <div class="container">
        <h1 class="title title--mb">Создание ЛСО</h1>
        <FormUnit
            :detachment="detachment"
            :is-error="isError"
            @submit.prevent="changeDetachment"
            @select-file="onSelectFile"
            @reset-emblem="onResetEmblem"
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
import { ref, inject } from 'vue';
import { FormUnit } from '@features/FormUnit';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const user = storeToRefs(userStore);
const meId = user.currentUser.value.id;
console.log(meId);

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const meRoles = roles.roles.value;
console.log(meRoles);

const educComId = roles.roles.value.educationalheadquarter_commander;
const regionComId = roles.roles.value.regionalheadquarter_commander;
const districtComId = roles.roles.value.districtheadquarter_commander;
const centralComId = roles.roles.value.centralheadquarter_commander;
const localComId = roles.roles.value.localheadquarter_commander;
const detComId = roles.roles.value.detachment_commander;

const router = useRouter();

const detachment = ref({
    name: '',
    area: null,
    founding_date: '',
    region: null,
    city: '',
    educational_institution: null,
    commander: null,
    meId: meId,
    social_vk: '',
    social_tg: '',
    slogan: '',
    about: '',
    emblem: null,
    banner: null,
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
});

const submited = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);
const filePhotoOne = ref(null);
const filePhotoTwo = ref(null);
const filePhotoThree = ref(null);
const filePhotoFour = ref(null);

const isEmblemChange = ref(false);
const isBannerChange = ref(false);
const isPhotoOne = ref(false);
const isPhotoTwo = ref(false);
const isPhotoThree = ref(false);
const isPhotoFour = ref(false);

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
const onSelectPhotoOne = (file) => {
    isPhotoOne.value = true;
    filePhotoOne.value = file;
};
const onResetPhotoOne = (file) => {
    isPhotoOne.value = true;
    filePhotoOne.value = file;
};
const onSelectPhotoTwo = (file) => {
    isPhotoTwo.value = true;
    filePhotoTwo.value = file;
};
const onResetPhotoTwo = (file) => {
    isPhotoTwo.value = true;
    filePhotoTwo.value = file;
};
const onSelectPhotoThree = (file) => {
    isPhotoThree.value = true;
    filePhotoThree.value = file;
};
const onResetPhotoThree = (file) => {
    isPhotoThree.value = true;
    filePhotoThree.value = file;
};
const onSelectPhotoFour = (file) => {
    isPhotoFour.value = true;
    filePhotoFour.value = file;
};
const onResetPhotoFour = (file) => {
    isPhotoFour.value = true;
    filePhotoFour.value = file;
};

const isError = ref({});
const swal = inject('$swal');

const changeDetachment = async () => {
    const formData = new FormData();
    formData.append('name', detachment.value.name);
    formData.append('area', detachment.value.area);
    formData.append('founding_date', detachment.value.founding_date);
    formData.append('region', detachment.value.region);
    formData.append('city', detachment.value.city);
    if (detachment.value.educational_institution) {
        formData.append(
            'educational_institution',
            detachment.value.educational_institution,
        );
    } else formData.append('educational_institution', '');

    if (
        !educComId ||
        !regionComId ||
        !districtComId ||
        !centralComId ||
        !localComId ||
        !detComId
    ) {
        formData.append('commander', detachment.value.meId);
    } else formData.append('commander', detachment.value.commander);
    formData.append('social_vk', detachment.value.social_vk);
    formData.append('social_tg', detachment.value.social_tg);
    formData.append('slogan', detachment.value.slogan);
    formData.append('about', detachment.value.about);

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');
    if (isPhotoOne.value)
        filePhotoOne.value
            ? formData.append('photo1', filePhotoOne.value)
            : formData.append('photo1', '');
    if (isPhotoTwo.value)
        filePhotoTwo.value
            ? formData.append('photo2', filePhotoTwo.value)
            : formData.append('photo2', '');
    if (isPhotoThree.value)
        filePhotoThree.value
            ? formData.append('photo3', filePhotoThree.value)
            : formData.append('photo3', '');
    if (isPhotoFour.value)
        filePhotoFour.value
            ? formData.append('photo4', filePhotoFour.value)
            : formData.append('photo4', '');

    HTTP.post('detachments/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
            console.log(response.data);
            swal.fire({
                position: 'center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push({
                name: 'lso',
                params: { id: response.data.id },
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
                title: `ошибка- ${isError.value.non_field_errors}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>
