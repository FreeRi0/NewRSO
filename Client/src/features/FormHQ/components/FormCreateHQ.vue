<template>
    <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="UploadData"
    >
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    transform="rotate(-180 16 16)"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="name-hq"
                                >Наименование штаба
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="name-hq"
                                placeholder="Например, Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)"
                                name="name_hq"
                                v-model:value="v.title.$model"
                                :error="v.title.$errors"
                                :maxlength="100"
                            />
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="name-hq"
                                placeholder="Например, Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)"
                                name="name_hq"
                                v-model="v.title.$model"
                                :error="v.title.$errors"
                                :maxlength="100"
                            /> -->
                            <div class="form__counter">
                                {{ counterTitle }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="select-institution"
                                >Выберите учебное заведение
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                :items="institutions"
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model:value="v.institution.$model"
                                :error="v.institution.$errors"
                            ></Select>
                            <!-- <sortByEducation
                                :options="institutions"
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="institution"
                            ></sortByEducation> -->
                        </div>

                        <div class="form__field">
                            <label for="create-date">Дата основания </label>
                            <!-- <input
                                id="create-date"
                                label="Дата основания"
                                name="create_date"
                                type="date"
                                placeholder=""
                                :value="data.date"
                            /> -->
                            <Input
                                id="create-date"
                                name="create_date"
                                type="date"
                                v-model:value="date"
                            />
                        </div>

                        <div class="form__field">
                            <label for="select-regional-office"
                                >Выберите региональное отделение
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                :items="regionalOffices"
                                name="select_regional-office"
                                id="select-regional-office"
                                placeholder="Например, Карачаево-Черкесское региональное отделение"
                                v-model:value="v.regional.$model"
                                :error="v.regional.$errors"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="city">Город</label>
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model="city"
                            /> -->
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model:value="v.city.$model"
                                :error="v.city.$errors"
                            /> -->
                            <Input
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model:value="city"
                            />
                        </div>

                        <div class="form__field">
                            <label for="beast"
                                >Командир штаба СО ОО:
                                <sup class="valid-red">*</sup>
                            </label>
                            <Dropdown
                                :options="leaders"
                                id="beast"
                                name="edit_beast"
                                v-model:value="v.beast.$model"
                                :error="v.beast.$errors"
                                :filterPlaceholder="'Поиск по ФИО'"
                                :resetFilterOnHide="true"
                            ></Dropdown>
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                            @click="openPanelTwo"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel value="panelTwo">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Контакты
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    transform="rotate(-180 16 16)"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="social-media-vk"
                                >Группа штаба ВКонтакте
                            </label>
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="social-media-vk"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk"
                                v-model="vk"
                            /> -->
                            <Input
                                id="social-media-vk"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk"
                                v-model:value="vk"
                            />
                        </div>

                        <div class="form__field">
                            <label for="social-media-te"
                                >Группа штаба в Телеграмме
                            </label>
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="social-media-te"
                                placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                name="social_media_te"
                                v-model="te"
                            /> -->
                            <Input
                                id="social-media-te"
                                placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                name="social_media_te"
                                v-model:value="te"
                            />
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                            @click="openPanelOne"
                        ></Button>
                        <Button
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                            @click="openPanelThree"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel value="panelThree">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15.5"
                                    transform="rotate(-180 16 16)"
                                    fill="#1F7CC0"
                                    stroke="#1F7CC0"
                                />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="hq-slogan">Девиз штаба </label>
                            <!-- <v-text-field
                                variant="outlined"
                                clearable
                                id="hq-slogan"
                                placeholder="Например, через тернии к звездам"
                                name="hq_slogan"
                                v-model:value="slogan"
                            /> -->
                            <Input
                                type="text"
                                id="hq-slogan"
                                placeholder="Например, через тернии к звездам"
                                name="hq_slogan"
                                v-model:value="slogan"
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterSlogan }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="about-hq">О штабе </label>
                            <!-- <v-textarea
                                rows="5"
                                no-resize
                                variant="outlined"
                                clearable
                                :maxlength="500"
                                class="form__input form__input--about"
                                id="about-hq"
                                placeholder="Расскажите о штабе"
                                name="about_hq"
                                v-model="about"
                            ></v-textarea> -->
                            <TextareaAbout
                                :rows="5"
                                maxlength="500"
                                class="form__input form__input--about"
                                id="about-hq"
                                placeholder="Расскажите о штабе"
                                name="about_hq"
                                v-model:value="about"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterAbout }} / 500
                            </div>
                        </div>

                        <div class="form__field">
                            <label for="upload-logo">Добавьте логотип</label>
                            <Avatar
                                name="upload_logo"
                                id="upload-logo"
                                v-model:value="avatar"
                            />
                            <span class="form__footnote"
                                >Рекомендуемый размер 80х80</span
                            >
                        </div>

                        <div class="form__field">
                            <label for="upload-banner">Добавьте баннер</label>
                            <bannerPhoto
                                name="upload_banner"
                                id="upload-banner"
                                v-model:value="banner"
                            />
                            <span class="form__footnote"
                                >Рекомендуемый размер 1920х768</span
                            >
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button
                    v-show="showButtonPrev"
                    class="form__button form__button--prev"
                    variant="text"
                    label="Назад"
                    size="large"
                    @click="openPanelTwo"
                ></Button>
                <Button
                    type="text"
                    class="form__button"
                    variant="text"
                    label="Сохранить"
                    size="large"
                ></Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import { Select } from '@shared/components/selects';
// import { sortByEducation } from '@shared/components/selects';
import { Dropdown } from '@shared/components/selects';
import { TextareaAbout } from '@shared/components/inputs';

import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';
import { useRouter } from 'vue-router';
import {
    helpers,
    minLength,
    required,
    maxLength,
    numeric,
    email,
    sameAs,
} from '@vuelidate/validators';

const title = ref('');
const date = ref('');
const institution = ref(null);
const city = ref('');
const regional = ref(null);
const beast = ref(null);
const vk = ref('');
const te = ref('');
const slogan = ref('');
const about = ref('');

const avatar = ref('');
const banner = ref('');

// const institutions = ref([
//     {
//         value: 'Алтайский государственный медицинский университет',
//         name: 'Алтайский государственный медицинский университет',
//     },
//     {
//         value: 'Амурская государственная медицинская академия',
//         name: 'Амурская государственная медицинская академия',
//     },
//     {
//         value: 'Амурский государственный университет',
//         name: 'Амурский государственный университет',
//     },
//     {
//         value: 'Владивостокский государственный медицинский университет',
//         name: 'Владивостокский государственный медицинский университет',
//     },
//     {
//         value: 'Владивостокский государственный университет экономики и сервиса',
//         name: 'Владивостокский государственный университет экономики и сервиса',
//     },
//     {
//         value: 'Дальневосточный государственный технический университет',
//         name: 'Дальневосточный государственный технический университет',
//     },
//     {
//         value: 'Дальневосточный федеральный университет',
//         name: 'Дальневосточный федеральный университет',
//     },
// ]);

const rules = computed(() => ({
    title: {
        required: helpers.withMessage(`* обязательно для заполнения`, required),
    },
    // date: {
    //     required: helpers.withMessage(`* обязательно для заполнения`, required),
    // },
    institution: {
        required: helpers.withMessage(`* обязательно для заполнения`, required),
    },
    // city: {
    //     required: helpers.withMessage(`* обязательно для заполнения`, required),
    // },
    regional: {
        required: helpers.withMessage(`* обязательно для заполнения`, required),
    },
    beast: {
        required: helpers.withMessage(`* обязательно для заполнения`, required),
    },
}));

const v = useVuelidate(rules, {
    title,
    // date,
    institution,
    // city,
    regional,
    beast,
});

const swal = inject('$swal');

const UploadData = async () => {
    // console.log(title);
    // console.log(institution);
    // console.log(regional);
    // console.log(beast);
    v.value.$touch();
    if (v.value.$error) {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    } else {
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Данные успешно сохранены',
            showConfirmButton: false,
            timer: 1500,
        });
        // функция очистки полей формы после успешной отправки данных на сервер
    }
};

//----------------------------------------------------------------------------------------------------------
const counterTitle = computed(() => {
    // console.log(title.value.length);
    return title.value.length || 0;
});

const counterSlogan = computed(() => {
    return slogan.value.length || 0;
});

const counterAbout = computed(() => {
    return about.value.length || 0;
});
//----------------------------------------------------------------------------------------------------------
const panel = ref();

const openPanelOne = () => {
    panel.value = 'panelOne';
};

const openPanelTwo = () => {
    panel.value = 'panelTwo';
};

const openPanelThree = () => {
    panel.value = 'panelThree';
};
//----------------------------------------------------------------------------------------------------------
const showButtonPrev = computed(() => {
    return panel.value === 'panelThree';
});

const institutions = ref([
    { title: 'Алтайский государственный медицинский университет' },
    { title: 'Амурская государственная медицинская академия' },
    { title: 'Амурский государственный университет' },
    { title: 'Владивостокский государственный медицинский университет' },
    {
        title: 'Владивостокский государственный университет экономики и сервиса',
    },
    { title: 'Дальневосточный государственный технический университет' },
    { title: 'Дальневосточный федеральный университет' },
]);

const regionalOffices = ref([
    { title: 'Карачаево-Черкесское региональное отделение' },
    { title: 'Московское региональное отделение' },
    { title: 'Амурское региональное отделение' },
    { title: 'Дальневосточное региональное отделение' },
    { title: 'Алтайское региональное отделение' },
]);

const leaders = ref([
    {
        id: 1,
        img: true,
        srcImg: 'foto-leader-squad-01.png',
        logo: true,
        iconStatus: 'icon-status-01.svg',
        title: 'Васильев Андрей Владимирович',
        date: '13.07.2000',
    },
    {
        id: 2,
        img: true,
        srcImg: 'foto-leader-squad-02.png',
        logo: true,
        iconStatus: 'icon-status-02.svg',
        title: 'Иванов Александр Петрович',
        date: '13.07.2000',
    },
    {
        id: 3,
        img: true,
        srcImg: 'foto-leader-squad-03.png',
        logo: true,
        iconStatus: 'icon-status-03.svg',
        title: 'Сидоров Дмитрий Олегович',
        date: '13.07.2000',
    },
    {
        id: 4,
        img: true,
        srcImg: 'foto-leader-squad-04.png',
        logo: true,
        iconStatus: 'icon-status-04.svg',
        title: 'Петрова Анастасия Владимировна',
        date: '13.07.2000',
    },
    {
        id: 5,
        img: true,
        srcImg: 'foto-leader-squad-05.png',
        logo: false,
        iconStatus: '',
        title: 'Петров Петр Петрович',
        date: '13.07.2000',
    },
    {
        id: 6,
        img: true,
        srcImg: 'foto-leader-squad-06.png',
        logo: false,
        iconStatus: '',
        title: 'Смирнова Елена Дмитриевна',
        date: '13.07.2000',
    },
    {
        id: 7,
        img: false,
        srcImg: '',
        logo: false,
        iconStatus: '',
        title: 'Николаева Ольга Васильевна',
        date: '13.07.2000',
    },
    {
        id: 8,
        img: true,
        srcImg: 'foto-leader-squad-08.png',
        logo: false,
        iconStatus: '',
        title: 'Васильев Михаил Владимирович',
        date: '13.07.2000',
    },
    {
        id: 9,
        img: true,
        srcImg: 'foto-leader-squad-09.png',
        logo: false,
        iconStatus: '',
        title: 'Олегов Иван Иванович',
        date: '13.07.2000',
    },
    {
        id: 10,
        img: true,
        srcImg: 'foto-leader-squad-10.png',
        logo: false,
        iconStatus: '',
        title: 'Певцов Дмитрий Владимирович',
        date: '13.07.2000',
    },
]);

const members = ref([
    {
        id: 1,
        img: true,
        srcImg: 'foto-leader-squad-01.png',
        logo: true,
        iconStatus: 'icon-status-01.svg',
        title: 'Васильев Андрей Владимирович',
        date: '13.07.2000',
        confidant: false,
    },
    {
        id: 2,
        img: true,
        srcImg: 'foto-leader-squad-02.png',
        logo: true,
        iconStatus: 'icon-status-02.svg',
        title: 'Иванов Александр Петрович',
        date: '13.07.2000',
        confidant: true,
    },
    {
        id: 3,
        img: true,
        srcImg: 'foto-leader-squad-03.png',
        logo: true,
        iconStatus: 'icon-status-03.svg',
        title: 'Сидоров Дмитрий Олегович',
        date: '13.07.2000',
        confidant: true,
    },
    {
        id: 4,
        img: true,
        srcImg: 'foto-leader-squad-04.png',
        logo: true,
        iconStatus: 'icon-status-04.svg',
        title: 'Петрова Анастасия Владимировна',
        date: '13.07.2000',
        confidant: false,
    },
    {
        id: 5,
        img: true,
        srcImg: 'foto-leader-squad-05.png',
        logo: false,
        iconStatus: '',
        title: 'Петров Петр Петрович',
        date: '13.07.2000',
        confidant: false,
    },
    {
        id: 6,
        img: true,
        srcImg: 'foto-leader-squad-06.png',
        logo: false,
        iconStatus: '',
        title: 'Смирнова Елена Дмитриевна',
        date: '13.07.2000',
        confidant: false,
    },
    {
        id: 7,
        img: false,
        srcImg: '',
        logo: false,
        iconStatus: '',
        title: 'Николаева Ольга Васильевна',
        date: '13.07.2000',
        confidant: false,
    },
]);

const searchMembers = ref('');

const sortedMembers = computed(() => {
    let tempMembers = members.value;

    tempMembers = tempMembers.filter((item) => {
        return item.title
            .toUpperCase()
            .includes(searchMembers.value.toUpperCase());
    });

    // console.log(tempMembers);

    return tempMembers;
});
</script>

<style lang="scss" scoped>
// $expansion-panel-active-title-min-height 64px
.form {
    font-family: 'BertSans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #35383f;
    background-color: transparent;

    &__inner-content {
        border-bottom: 1px solid #d9d9d9;
        background-color: #ffffff;
    }

    &__field-group {
        padding: 32px 16px 24px;
        background-color: #ffffff;
        // position: relative;

        // &::before {
        //     position: absolute;
        //     content: '';
        //     top: -8px;
        //     right: -24px;
        //     left: -24px;
        //     bottom: -16px;
        //     border: 1px solid #b6b6b6;
        //     border-radius: 10px;
        // }
    }

    &__field {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        label {
            width: fit-content;
            font-size: 16px;
            font-weight: 600;
            color: #35383f;
        }

        input {
            margin-bottom: 0;
            padding: 8px 44px 8px 20px;
            width: 100%;
            font-size: 16px;
            line-height: 21px;
            color: #898989;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
            // min-height: auto;
        }

        select {
            margin-bottom: 0;
            padding: 8px 54px 8px 20px;
            font-weight: 400;
            border: 1px solid #b6b6b6;
            // background-image: url('../images/icons/angel-down-form.svg');
            background-repeat: no-repeat;
            background-position: right 19px center;
            appearance: none;
        }

        textarea {
            border: 1px solid #b6b6b6;
            // margin-top: 8px;
            padding: 12px 20px;
            min-height: 101px;
            outline: none;
            overflow: hidden;
            text-align: left;
            resize: none;
            border-radius: 10px;
        }
    }

    &__counter {
        margin-top: 8px;
    }

    &__field-search {
        input {
            padding: 8px 20px 8px 54px;
        }
    }

    // &__field-direction {
    //     margin-bottom: 0;
    //     padding: 8px 44px 8px 20px;
    //     width: 100%;
    //     font-size: 16px;
    //     line-height: 21px;
    //     color: #898989;
    //     border: 1px solid #b6b6b6;
    //     border-radius: 10px;
    //     // min-height: auto;
    // }

    &__button-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 56px 0 44px;
    }

    &__button {
        width: 132px;
        min-height: 52px;
        margin: 0;
        padding: 16px 32px;
        font-family: 'Bert Sans';
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-transform: none;

        &--next,
        &--prev {
            width: 131px;
            color: #35383f;
            border: 2px solid #35383f;
            background-color: #ffffff;
        }

        &--prev {
            margin-inline-end: calc(-0.5rem + 20px);
        }
    }

    .valid-red {
        color: #db0000;
    }

    .user-metric__avatar-wrapper {
        align-self: flex-start;
    }

    .v-field__outline {
        display: none;
    }
}
//------------------------------------------------------------------------------
//Стили для компонента аккордион - пенесла в стили для страницы "Станицы ЛСО"
// .v-expansion-panel {
//     border-bottom: 1px solid #d9d9d9;

//     &__shadow {
//         box-shadow: none;
//     }

//     &--active,
//     &--after-active {
//         margin: 0;
//     }

//     &--active:not(:first-child) {
//         margin: 0;
//     }

//     &--active + .v-expansion-panel {
//         margin: 0;
//     }

//     .v-expansion-panel-title {
//         padding: 16px 0;
//         max-height: 60px;
//         font-family: 'Akrobat';
//         font-size: 24px;
//         line-height: 28px;
//         font-weight: 600;
//         background-color: transparent;

//         &--active {
//             margin-bottom: 40px;
//         }

//         &__overlay {
//             display: none;
//         }
//     }
// }
</style>
