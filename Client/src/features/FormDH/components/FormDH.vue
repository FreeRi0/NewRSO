<template>
    <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="changeHeadquarter"
    >
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Основная информация
                        </v-col>
                        <p
                            class="form__error form__error--title"
                            v-if="
                                isError.name ||
                                isError.founding_date ||
                                isError.commander
                            "
                        >
                            Заполните обязательные поля!
                        </p>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="name-hq" class="form__label"
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
                                :clearable="true"
                            />
                            <p
                                class="form__error form__error--name"
                                v-if="isError.name"
                            >
                                * {{ isError.name[0] }}
                            </p>
                            <div class="form__counter">
                                {{ counterName }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="founding_date" class="form__label"
                                >Дата начала функционирования ОШ
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                type="date"
                                id="founding_date"
                                name="founding_date"
                                v-model:value="headquarter.founding_date"
                            />
                            <p class="form__error" v-if="isError.founding_date">
                                * {{ getErrorField('founding_date') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label for="city" class="form__label">Город</label>
                            <Input
                                class="form__input"
                                id="city"
                                placeholder="Например, Москва"
                                name="edit_city"
                                v-model:value="headquarter.city"
                            />
                        </div>
                        <div
                            v-if="
                                roles.roles.value
                                    .educationalheadquarter_commander ||
                                roles.roles.value
                                    .regionalheadquarter_commander ||
                                roles.roles.value
                                    .districtheadquarter_commander ||
                                roles.roles.value
                                    .centralheadquarter_commander ||
                                roles.roles.value.localheadquarter_commander ||
                                roles.roles.value.detachment_commander
                            "
                            class="form__field form__field--commander"
                        >
                            <label class="form__label" for="beast"
                                >Командир штаба
                                <sup class="valid-red">*</sup>
                            </label>
                            <div v-if="!isCommanderLoading">
                                <Dropdown
                                    open-on-clear
                                    id="beast"
                                    name="edit_beast"
                                    placeholder="Поиск по ФИО"
                                    v-model="headquarter.commander"
                                    @update:value="changeValue"
                                    address="users/"
                                ></Dropdown>
                            </div>
                            <v-progress-circular
                                class="circleLoader"
                                v-else
                                indeterminate
                                color="blue"
                            ></v-progress-circular>
                            <p
                                class="form__error form__error--commander"
                                v-if="isError.commander"
                            >
                                * {{ getErrorField('commander') }}
                            </p>
                        </div>
                    </div>
                    <v-card-actions class="form__button-group">
                        <Button
                            type="button"
                            variant="text"
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
                        <p
                            class="form__error form__error--title"
                            v-if="isErrorMembers.position"
                        >
                            Заполните обязательные поля!
                        </p>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="social-media-vk" class="form__label"
                                >Группа штаба ВКонтакте
                            </label>
                            <TextareaAbout
                                maxlength="50"
                                class="form__textarea form__textarea--mobile"
                                id="social-media-vk"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk"
                                v-model:value="headquarter.social_vk"
                            ></TextareaAbout>
                        </div>

                        <div class="form__field">
                            <label for="social-media-te" class="form__label"
                                >Группа штаба в Телеграм
                            </label>
                            <TextareaAbout
                                maxlength="50"
                                class="form__textarea form__textarea--mobile"
                                id="social-media-te"
                                placeholder="Например, https://t.me/+7pe98d2PqoJ"
                                name="social_media_te"
                                v-model:value="headquarter.social_tg"
                            ></TextareaAbout>
                        </div>
                        <div class="form__field" v-if="participants">
                            <p class="form__label">
                                Назначить на должность
                                <sup class="valid-red">*</sup>
                            </p>
                            <p
                                class="form__error form__error--members"
                                v-if="isErrorMembers.position"
                            >
                                * Заполните должность у каждого участника
                            </p>
                            <v-text-field
                                class="form__field-search"
                                variant="outlined"
                                type="text"
                                placeholder="Поиск по ФИО"
                                @keyup="searchMembersDH"
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
                            <div class="overlay" v-if="showModal"></div>
                            <DeleteModal
                                v-show="showModal === true"
                                :is-squad="false"
                                @close="close"
                                @delete="
                                    deleteMember(
                                        props.headquarter.id,
                                        deletedId,
                                    )
                                "
                            >
                            </DeleteModal>
                            <MembersList
                                :items="props.members"
                                :submited="submited"
                                :functions="positions.positions.value"
                                :is-error-members="isErrorMembers"
                                v-if="members && !isMembersLoading"
                                @update-member="onUpdateMember"
                                @delete-member="onDeleteMember"
                            ></MembersList>
                            <v-progress-circular
                                class="circleLoader"
                                v-else
                                indeterminate
                                color="blue"
                            ></v-progress-circular>
                        </div>
                    </div>
                    <v-card-actions class="form__button-group">
                        <Button
                            type="button"
                            class="form-button form-button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                            @click="openPanelOne"
                        ></Button>
                        <Button
                            type="button"
                            class="form-button form-button--next"
                            variant="text"
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
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="hq-slogan" class="form__label"
                                >Девиз штаба</label
                            >
                            <TextareaAbout
                                maxlength="100"
                                class="form__textarea form__textarea--mobile"
                                id="hq-slogan"
                                placeholder="Например, через тернии к звездам"
                                name="hq_slogan"
                                v-model:value="headquarter.slogan"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterSlogan }} / 100
                            </div>
                        </div>

                        <div class="form__field">
                            <label for="about-hq" class="form__label"
                                >О штабе</label
                            >
                            <TextareaAbout
                                :rows="6"
                                maxlength="500"
                                class="form__textarea"
                                id="about-hq"
                                placeholder="Описание регионального штаба"
                                name="about_hq"
                                v-model:value="headquarter.about"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterAbout }} / 1000
                            </div>
                        </div>
                        <div class="form__field photo-add">
                            <p class="form__label">Добавьте логотип</p>
                            <div class="photo-add__box photo-add__box--logo">
                                <div
                                    class="photo-add__img photo-add__img--logo"
                                >
                                    <img
                                        class="photo-add__image"
                                        :src="headquarter.emblem ?? urlEmblem"
                                    />
                                </div>

                                <div class="photo-add__input">
                                    <label
                                        @click="dialogLogo = true"
                                        class="photo-add__label photo-add__label--logo"
                                        for="upload-logo"
                                        v-if="!headquarter.emblem && !urlEmblem"
                                    >
                                        <svg
                                            class="logo-add__svg"
                                            aria-hidden="true"
                                            focusable="false"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                        >
                                            <g
                                                filter="url(#filter0_b_2686_15482)"
                                            >
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="24"
                                                    fill="black"
                                                    fill-opacity="0.4"
                                                />
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="23"
                                                    stroke="white"
                                                    stroke-width="2"
                                                />
                                            </g>
                                            <path
                                                d="M24.1328 15.1328L24.1328 33.1328"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M15.1328 24.1328H33.1328"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                            />
                                            <defs>
                                                <filter
                                                    id="filter0_b_2686_15482"
                                                    x="-36.9643"
                                                    y="-36.9643"
                                                    width="121.929"
                                                    height="121.929"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                >
                                                    <feFlood
                                                        flood-opacity="0"
                                                        result="BackgroundImageFix"
                                                    />
                                                    <feGaussianBlur
                                                        in="BackgroundImageFix"
                                                        stdDeviation="18.4821"
                                                    />
                                                    <feComposite
                                                        in2="SourceAlpha"
                                                        operator="in"
                                                        result="effect1_backgroundBlur_2686_15482"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in="SourceGraphic"
                                                        in2="effect1_backgroundBlur_2686_15482"
                                                        result="shape"
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </label>
                                    <div
                                        class="photo-add__edit-group photo-add__edit-group--position"
                                        v-else
                                    >
                                        <label
                                            @click="dialogLogo = true"
                                            class="photo-add__label-edit"
                                            for="upload-logo"
                                        >
                                            <span class="photo-add__label-text"
                                                >Изменить фото</span
                                            >
                                        </label>
                                        <button
                                            class="photo-add__button-clear"
                                            type="button"
                                            @click="deleteEmblem"
                                        >
                                            Удалить фото
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        id="upload-logo"
                                        name="squad-logo"
                                        hidden
                                        @change="selectEmblem"
                                        @click.prevent
                                    />
                                    <v-dialog v-model="dialogLogo" width="1024">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">
                                                    Загрузите ваше фото
                                                </span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-file-input
                                                            @change="
                                                                selectEmblem
                                                            "
                                                            type="file"
                                                            show-size
                                                            prepend-icon="mdi-camera"
                                                            counter
                                                        />
                                                    </v-row>
                                                    <v-row
                                                        class="align-center justify-end"
                                                    >
                                                        <v-btn
                                                            v-if="logoPreview"
                                                            class="button-wrapper mt-5"
                                                            @click="
                                                                cropImage(
                                                                    'logo',
                                                                )
                                                            "
                                                            prepend-icon="crop"
                                                            variant="plain"
                                                            >Обрезать
                                                            фото</v-btn
                                                        >
                                                    </v-row>
                                                    <v-row>
                                                        <Cropper
                                                            ref="cropper"
                                                            class="cropper mt-5 mx-auto"
                                                            :src="logoPreview"
                                                        />
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue-darken-1"
                                                    variant="text"
                                                    @click="dialogLogo = false"
                                                >
                                                    Закрыть
                                                </v-btn>
                                                <v-btn
                                                    :disabled="!fileEmblem"
                                                    color="blue-darken-1"
                                                    variant="text"
                                                    type="submit"
                                                    @click="uploadPhoto('logo')"
                                                >
                                                    Загрузить
                                                </v-btn>
                                            </v-card-actions>
                                            <p
                                                class="error"
                                                v-if="isError.detail"
                                            >
                                                {{ isError.detail }}
                                            </p>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </div>
                            <span class="form__footnote"
                                >Рекомендуемый размер 80х80</span
                            >
                        </div>

                        <div class="form__field photo-add">
                            <p class="form__label">Добавьте баннер</p>
                            <div class="photo-add__box photo-add__box--banner">
                                <div
                                    class="photo-add__img photo-add__img--banner"
                                >
                                    <img
                                        v-if="headquarter.banner ?? urlBanner"
                                        class="photo-add__image"
                                        :src="headquarter.banner ?? urlBanner"
                                    />
                                    <img
                                        v-else
                                        src="@app/assets/banner-stub.png"
                                        alt="Баннер отряда(пусто)"
                                    />
                                </div>

                                <div class="photo-add__input">
                                    <label
                                        @click="dialogBanner = true"
                                        class="photo-add__label"
                                        for="upload-banner"
                                        v-if="!headquarter.banner && !urlBanner"
                                    >
                                        <svg
                                            class=""
                                            aria-hidden="true"
                                            focusable="false"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                        >
                                            <g
                                                filter="url(#filter0_b_2686_15482)"
                                            >
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="24"
                                                    fill="black"
                                                    fill-opacity="0.4"
                                                />
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="23"
                                                    stroke="white"
                                                    stroke-width="2"
                                                />
                                            </g>
                                            <path
                                                d="M24.1328 15.1328L24.1328 33.1328"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M15.1328 24.1328H33.1328"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                            />
                                            <defs>
                                                <filter
                                                    id="filter0_b_2686_15482"
                                                    x="-36.9643"
                                                    y="-36.9643"
                                                    width="121.929"
                                                    height="121.929"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                >
                                                    <feFlood
                                                        flood-opacity="0"
                                                        result="BackgroundImageFix"
                                                    />
                                                    <feGaussianBlur
                                                        in="BackgroundImageFix"
                                                        stdDeviation="18.4821"
                                                    />
                                                    <feComposite
                                                        in2="SourceAlpha"
                                                        operator="in"
                                                        result="effect1_backgroundBlur_2686_15482"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in="SourceGraphic"
                                                        in2="effect1_backgroundBlur_2686_15482"
                                                        result="shape"
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </label>
                                    <div class="photo-add__edit-group" v-else>
                                        <label
                                            @click="dialogBanner = true"
                                            class="photo-add__label-edit"
                                            for="upload-banner"
                                        >
                                            <span class="photo-add__label-text"
                                                >Изменить фото</span
                                            >
                                        </label>
                                        <button
                                            class="photo-add__button-clear"
                                            type="reset"
                                            @click="deleteBanner"
                                        >
                                            Удалить фото
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        id="upload-banner"
                                        name="squad-banner"
                                        hidden
                                        @change="selectBanner"
                                        @click.prevent
                                    />
                                    <v-dialog
                                        v-model="dialogBanner"
                                        width="1024"
                                    >
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">
                                                    Загрузите ваше фото
                                                </span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-file-input
                                                            @change="
                                                                selectBanner
                                                            "
                                                            type="file"
                                                            show-size
                                                            prepend-icon="mdi-camera"
                                                            counter
                                                        />
                                                    </v-row>
                                                    <v-row
                                                        class="align-center justify-end"
                                                    >
                                                        <v-btn
                                                            v-if="bannerPreview"
                                                            class="button-wrapper mt-5"
                                                            @click="
                                                                cropImage(
                                                                    'banner',
                                                                )
                                                            "
                                                            prepend-icon="crop"
                                                            variant="plain"
                                                            >Обрезать
                                                            фото</v-btn
                                                        >
                                                    </v-row>
                                                    <v-row>
                                                        <Cropper
                                                            ref="cropper"
                                                            class="cropper mt-5 mx-auto"
                                                            :src="bannerPreview"
                                                        />
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue-darken-1"
                                                    variant="text"
                                                    @click="
                                                        dialogBanner = false
                                                    "
                                                >
                                                    Закрыть
                                                </v-btn>
                                                <v-btn
                                                    :disabled="!fileBanner"
                                                    color="blue-darken-1"
                                                    variant="text"
                                                    type="submit"
                                                    @click="
                                                        uploadPhoto('banner')
                                                    "
                                                >
                                                    Загрузить
                                                </v-btn>
                                            </v-card-actions>
                                            <p
                                                class="error"
                                                v-if="isError.detail"
                                            >
                                                {{ isError.detail }}
                                            </p>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </div>
                            <span class="form__footnote"
                                >Рекомендуемый размер 1920х768</span
                            >
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button
                    type="button"
                    v-show="showButtonPrev"
                    class="form-button form-button--prev"
                    variant="text"
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
import { ref, computed, onBeforeMount } from 'vue';
import { Input, TextareaAbout } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { Select, Dropdown } from '@shared/components/selects';
import { MembersList } from '@features/Members/components';
import { Icon } from '@iconify/vue';
import { HTTP } from '@app/http';
import { DeleteModal } from '@shared/components/dropdown';
import { useRoleStore } from '@layouts/store/role';
import { useDistrictsStore } from '@features/store/districts';
import { usePositionsStore } from '@features/store/positions';
import { storeToRefs } from 'pinia';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { SvgIcon } from '@shared/index';

const positionsStore = usePositionsStore();
const positions = storeToRefs(positionsStore);
const districtsStore = useDistrictsStore();

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);

const emit = defineEmits([
    'update:value',
    'updateMember',
    'changeHeadquarter',
    'selectEmblem',
    'deleteEmblem',
    'selectBanner',
    'deleteBanner',
]);

const props = defineProps({
    participants: {
        type: Boolean,
        default: false,
    },
    headquarter: {
        type: Object,
        default: () => ({}),
    },
    submited: {
        type: Boolean,
        default: false,
    },
    fileEmblem: {
        type: String,
        default: null,
    },
    fileBanner: {
        type: String,
        default: null,
    },
    members: {
        type: Array,
        default: () => [],
    },
    isError: {
        type: Object,
        default: () => ({}),
    },
    isErrorMembers: {
        type: Object,
        default: () => ({}),
    },
    isCommanderLoading: {
        type: Boolean,
        default: false,
    },
    isMembersLoading: {
        type: Boolean,
        default: false,
    },
});

const showModal = ref(false);
const deletedId = ref(null);

const getErrorField = (field) => {
    if (
        props.isError[field][0] ===
        'Некорректный тип. Ожидалось значение первичного ключа, получен str.'
    )
        return 'Это поле не может быть пустым.';
    else return props.isError[field][0];
};

const onDeleteMember = (memId) => {
    showModal.value = true;
    deletedId.value = memId;
    // console.log('mm', memId)
};

const close = () => {
    showModal.value = false;
};

const deleteMember = (id, membership_pk) => {
    try {
        const responseDelete = HTTP.delete(
            `/districts/${id}/members/${membership_pk}/`,
        );
        showModal.value = false;

        emit('deleteMember', membership_pk);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const headquarter = ref(props.headquarter);

//----------------------------------------------------------------------------------------------------------
const counterName = computed(() => {
    return headquarter.value.name.length || 0;
});

const counterSlogan = computed(() => {
    return headquarter.value?.slogan?.length || 0;
});

const counterAbout = computed(() => {
    return headquarter.value?.about?.length || 0;
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

//-----------------------------------------------------------------------
const searchMembers = ref('');

const timerSearch = ref(null);

const searchMembersDH = () => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        districtsStore.getSearchDHMembers(
            props.headquarter.id,
            searchMembers.value,
        );
    }, 400);
};

const onUpdateMember = (event, id) => {
    emit('updateMember', event, id);
};

const changeValue = (event) => {
    // console.log(event);
    emit('update:value', event);
};
//--Обрезать фото----------------------------------------------------------------------------
const cropper = ref();
const dialogLogo = ref(false);
const dialogBanner = ref(false);
let logoPreview = ref(null);
let bannerPreview = ref(null);

const cropImage = (type) => {
    if (cropper.value && type === 'logo') {
        const { canvas } = cropper.value.getResult();
        logoPreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            fileEmblem.value = new File([blob], 'logo.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }
    if (cropper.value && type === 'banner') {
        const { canvas } = cropper.value.getResult();
        bannerPreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            fileBanner.value = new File([blob], 'banner.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }
};
const uploadPhoto = (type) => {
    if (type === 'logo') {
        headquarter.value.emblem = null;
        urlEmblem.value = URL.createObjectURL(fileEmblem.value);

        emit('selectEmblem', fileEmblem.value);
        dialogLogo.value = false;
    }
    if (type === 'banner') {
        headquarter.value.banner = null;
        urlBanner.value = URL.createObjectURL(fileBanner.value);

        emit('selectBanner', fileBanner.value);
        dialogBanner.value = false;
    }
};

//--Добавление логотипа-----------------------------------------------------------------------------

const fileEmblem = ref(props.fileEmblem);
const urlEmblem = ref(null);

const selectEmblem = (event) => {
    fileEmblem.value = event.target.files[0];
    logoPreview.value = URL.createObjectURL(fileEmblem.value);
};

const deleteEmblem = () => {
    headquarter.value.emblem = null;
    urlEmblem.value = null;
    fileEmblem.value = null;
    emit('deleteEmblem', fileEmblem.value);
};

//--Добавление баннера-----------------------------------------------------------------------------
const fileBanner = ref(props.fileBanner);
const urlBanner = ref(null);

const selectBanner = (event) => {
    fileBanner.value = event.target.files[0];
    bannerPreview.value = URL.createObjectURL(fileBanner.value);
};

const deleteBanner = () => {
    headquarter.value.banner = null;
    urlBanner.value = null;
    fileBanner.value = null;
    emit('deleteBanner', fileBanner.value);
};

onBeforeMount(async () => {
    roleStore.getRoles();
    positionsStore.getPositions();
});
</script>

<style lang="scss" scoped>
.expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}
.form-button {
    width: 132px;
    min-height: 52px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-transform: none;
    display: flex;
    justify-content: center;
    margin-left: 20px;

    &--next,
    &--prev {
        width: 131px;
        color: #35383f;
        border: 2px solid #35383f;
        background-color: #ffffff;
    }

    &--prev {
        margin-right: 20px;
    }
}

.form_textarea {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
    width: 100%;
    resize: none;
}

.uploadEmblem_wrap {
    max-width: 800px;
    margin: auto;
}

.uploadEmblem_img {
    max-width: 500px;
}

.uploadBtn {
    justify-content: center;
}

.p-dropdown-items-wrapper {
    &::-webkit-scrollbar {
        /*стили полосы прокрутки */
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        /*стили зоны отслеживания */
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid #898989;
    }

    &::-webkit-scrollbar-thumb {
        /*стили бегунка */
        width: 8px;
        // height: 108px;
        border-radius: 10px;
        border: 1px solid #ffffff;
        background-color: #35383f;
    }
}

.date_central_wrap {
    display: flex;
    justify-content: space-between;
}
</style>
