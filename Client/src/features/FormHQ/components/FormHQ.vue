<template>
    <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="createHeadquarter"
    >
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                            <!-- <div v-if="">обязательно для заполнения</div> -->
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
                                class="form__input"
                                placeholder="Например, Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)"
                                name="name_hq"
                                v-model:value="headquarter.name"
                                :maxlength="100"
                            />
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
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model:value="
                                    headquarter.educational_institution
                                "
                                address="api/v1/eduicational_institutions/"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="create-date">Дата основания </label>
                            <!-- <input
                                id="create-date"
                                label="Дата основания"
                                name="create_date"
                                type="date"
                                placeholder=""
                                ::value="v.date.$model"
                                :error="v.date.$errors"
                            /> -->
                            <Input
                                class="form__input"
                                id="create-date"
                                name="create_date"
                                type="date"
                                v-model:value="headquarter.founding_date"
                            />
                        </div>

                        <!-- создать api и поле для регионального отделения -->
                        <div class="form__field">
                            <label for="select-regional-office"
                                >Выберите региональное отделение
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                name="select_regional-office"
                                id="select-regional-office"
                                placeholder="Например, Карачаево-Черкесское региональное отделение"
                                v-model:value="
                                    headquarter.educational_institution
                                "
                                address="api/v1/regionals/"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="city">Город</label>
                            <Input
                                class="form__input"
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model:value="headquarter.city"
                            />
                        </div>

                        <div class="form__field">
                            <label for="beast"
                                >Командир штаба СО ОО:
                                <sup class="valid-red">*</sup>
                            </label>
                            <Dropdown
                                id="beast"
                                name="edit_beast"
                                v-model="headquarter.commander"
                                @update:value="changeValue"
                                address="api/v1/users/"
                            ></Dropdown>
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            variant="text"
                            type="button"
                            class="form-button form-button--next"
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
                            <Input
                                class="form__input"
                                id="social-media-vk"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk"
                                v-model:value="headquarter.social_vk"
                            />
                        </div>

                        <div class="form__field">
                            <label for="social-media-te"
                                >Группа штаба в Телеграмме
                            </label>
                            <Input
                                class="form__input"
                                id="social-media-te"
                                placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                name="social_media_te"
                                v-model:value="headquarter.social_tg"
                            />
                        </div>

                        <div class="form__field" v-if="participants">
                            <p>
                                Участники отряда
                                <sup class="valid-red">*</sup>
                            </p>
                            <v-text-field
                                class="form__field-search"
                                variant="outlined"
                                type="text"
                                placeholder="Поиск по ФИО"
                                v-model="searchMembers"
                            >
                                <template #prepend-inner>
                                    <Icon
                                        icon="clarity-search-line"
                                        color="#222222"
                                        width="24"
                                        height="24"
                                    >
                                    </Icon>
                                </template>
                            </v-text-field>
                            <MembersList
                                :items="sortedMembers"
                                :validate="v"
                                :submited="submited"
                                @updateMember="onUpdateMember"
                            ></MembersList>
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button
                            class="form-button form-button--prev"
                            variant="text"
                            type="button"
                            label="Назад"
                            size="large"
                            @click="openPanelOne"
                        ></Button>
                        <Button
                            class="form-button form-button--next"
                            variant="text"
                            type="button"
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
                            <label for="hq-slogan">Девиз штаба</label>
                            <Input
                                class="form__input"
                                type="text"
                                id="hq-slogan"
                                placeholder="Например, через тернии к звездам"
                                name="hq_slogan"
                                v-model:value="headquarter.slogan"
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterSlogan }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="about-hq">О штабе</label>
                            <TextareaAbout
                                :rows="6"
                                maxlength="500"
                                class="form__textarea"
                                id="about-hq"
                                placeholder="Расскажите о штабе"
                                name="about_hq"
                                v-model:value="headquarter.about"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterAbout }} / 500
                            </div>
                        </div>

                        <!-- <div class="form__field">
                            <label for="upload-logo">Добавьте логотип</label>
                            <Avatar
                                name="upload_logo"
                                id="upload-logo"
                                v-model:value="headquarter.emblem"
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
                                v-model:value="headquarter.banner"
                            />
                            <span class="form__footnote"
                                >Рекомендуемый размер 1920х768</span
                            >
                        </div> -->
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button
                    v-show="showButtonPrev"
                    class="form-button form-button--prev"
                    variant="text"
                    type="button"
                    label="Назад"
                    size="large"
                    @click="openPanelTwo"
                ></Button>
                <Button
                    type="submit"
                    class="form-button"
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
import { Dropdown } from '@shared/components/selects';
import { MembersList } from '@features/Members/components';
import { Icon } from '@iconify/vue';
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

const emit = defineEmits(['update:value']);

const props = defineProps({
    participants: {
        type: Boolean,
        default: false,
    },
    // unit: {
    //     type: Object,
    //     default: () => ({}),
    // },
});

const headquarter = ref({
    name: '',
    founding_date: '',
    city: '',
    educational_institution: null,
    //региональное отделение??????????? : null,
    commander: null,
    social_vk: '',
    social_tg: '',
    slogan: '',
    about: '',
    emblem: '',
    banner: '',
});

const swal = inject('$swal');

const createHeadquarter = async () => {
    axios
        .post('api/v1/educationals/', headquarter.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            headquarter.value = response.data;
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

const submited = ref(false);

// const title = ref(props.unit.title);
// const date = ref(props.unit.date);
// const institution = ref(props.unit.institution);
// const city = ref(props.unit.city);
// const regional = ref(props.unit.regional);
// const beast = ref(props.unit.beast);
// const vk = ref(props.unit.vk);
// const te = ref(props.unit.te);
// const slogan = ref(props.unit.slogan);
// const about = ref(props.unit.about);

// const avatar = ref(props.unit.avatar);
// const banner = ref(props.unit.banner);

// const rules = computed(() => ({
//     title: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     institution: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     regional: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     beast: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
// }));

// const v = useVuelidate(rules, {
//     title,
//     institution,
//     regional,
//     beast,
// });

// const swal = inject('$swal');

// const UploadData = async () => {
//     v.value.$touch();
//     if (v.value.$error) {
//         swal.fire({
//             icon: 'error',
//             title: 'Упсс...',
//             text: 'Что-то пошло не так!',
//         });
//     } else {
//         swal.fire({
//             position: 'top-center',
//             icon: 'success',
//             title: 'Данные успешно сохранены',
//             showConfirmButton: false,
//             timer: 1500,
//         });
//         // функция очистки полей формы после успешной отправки данных на сервер
//     }
// };

//----------------------------------------------------------------------------------------------------------
const counterTitle = computed(() => {
    // console.log(title.value.length);
    return headquarter.value.name.length || 0;
});

const counterSlogan = computed(() => {
    return headquarter.value.slogan.length || 0;
});

const counterAbout = computed(() => {
    return headquarter.value.about.length || 0;
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
        position: null,
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
        position: null,
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
        position: null,
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
        position: null,
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
        position: null,
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
        position: null,
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
        position: null,
        confidant: false,
    },
]);

const searchMembers = ref('');

const sortedMembers = computed(() => {
    return members.value.filter((item) => {
        return item.title
            .toUpperCase()
            .includes(searchMembers.value.toUpperCase());
    });
});

const onUpdateMember = (event, id) => {
    const targetMember = members.value.find((member) => member.id === id);

    const firstkey = Object.keys(event)[0];
    targetMember[firstkey] = event[firstkey];
};

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};
</script>

<style lang="scss" scoped>
// $expansion-panel-active-title-min-height 64px
.form-button {
    width: 132px;
    min-height: 52px;
    margin: 0 10px;
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
}
</style>
