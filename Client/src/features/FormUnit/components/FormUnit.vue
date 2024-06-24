<template>
    <form class="form" enctype="multipart/form-data" @submit.prevent="changeDetachment">
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                            <p class="form__error form__error--title" v-if="
                                isError.name ||
                                isError.area ||
                                isError.founding_date ||
                                isError.region ||
                                isError.commander
                            ">
                                Заполните обязательные поля!
                            </p>
                        </v-row>
                    </template>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" fill="#1F7CC0" stroke="#1F7CC0" />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" transform="rotate(-180 16 16)" fill="#1F7CC0"
                                    stroke="#1F7CC0" />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label class="form__label" for="name-squad">Название отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input :maxlength="30" class="form__input" id="name-squad" placeholder="Например, Монолит"
                                name="name_squad" v-model:value="detachment.name" />
                            <p class="form__error form__error--name" v-if="isError.name">
                                * {{ isError.name[0] }}
                            </p>
                            <div class="form__counter">
                                {{ counterSquad }} / 30
                            </div>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="select-direction">Направление
                                <sup class="valid-red">*</sup>
                            </label>
                            <SearchSelect :items="areas.areas.value" open-on-clear id="select-direction"
                                name="select_direction" placeholder="Например, ССО" v-model="detachment.area"
                                @update:value="changeValue"></SearchSelect>
                            <p class="form__error bottom-25" v-if="isError.area">
                                * {{ getErrorField('area') }}
                            </p>
                            <!-- <p>{{ detachment.area }}</p> -->
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="create-date">Дата основания
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input class="form__input" id="create-date" name="create_date" type="date"
                                v-model:value="detachment.founding_date" />
                            <p class="form__error bottom-20" v-if="isError.founding_date">
                                * {{ getErrorField('founding_date') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="select-region">Регион
                                <sup class="valid-red">*</sup>
                            </label>
                            <SearchSelect :items="regions.regions.value" open-on-clear id="select-region"
                                name="select_region" placeholder="Например, Алтайский край" v-model="detachment.region"
                                @update:value="changeValue">
                            </SearchSelect>
                            <p class="form__error bottom-25" v-if="isError.region">
                                * {{ getErrorField('region') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="city">Город </label>
                            <Input class="form__input" id="city" placeholder="Например, Барнаул" name="edit_city"
                                v-model:value="detachment.city" />
                        </div>

                        <!-- <div class="form__field">
                            <label class="form__label" for="select-institution">Выберите учебное заведение
                                 <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="detachment.educational_institution"
                                address="eduicational_institutions/"
                            ></Select>
                            <educInstitutionDropdown open-on-clear id="select-institution" name="select_institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="detachment.educational_institution" @update:value="changeValue"
                                :SortDropdown="false" address="eduicational_institutions/"></educInstitutionDropdown>
                             <p
                                class="form__error"
                                v-if="isError.educational_institution"
                            >
                                * Это поле не может быть пустым.
                            </p>
                        </div> -->
                        <template v-if="detachment.region">
                            <div v-if="
                                roles.roles.value
                                    .educationalheadquarter_commander ||
                                roles.roles.value
                                    .regionalheadquarter_commander ||
                                roles.roles.value
                                    .districtheadquarter_commander ||
                                roles.roles.value
                                    .centralheadquarter_commander ||
                                roles.roles.value
                                    .localheadquarter_commander ||
                                roles.roles.value.detachment_commander
                            " class="form__field form__field--commander">
                                <label class="form__label" for="beast">Командир отряда:
                                    <sup class="valid-red">*</sup>
                                </label>
                                <div v-if="!isCommanderLoading">
                                    <DropdownCommander open-on-clear id="beast" name="edit_beast"
                                        placeholder="Поиск по ФИО" v-model="detachment.commander"
                                        @update:value="changeValue" address="rsousers" :query="regionName">
                                    </DropdownCommander>
                                </div>
                                <v-progress-circular class="circleLoader" v-else indeterminate
                                    color="blue"></v-progress-circular>
                                <p class="form__error form__error--commander" v-if="isError.commander">
                                    * {{ getErrorField('commander') }}
                                </p>
                            </div>
                        </template>

                        <div class="form__field" v-if="detachment.region">
                            <label class="form__label" for="select-headquarter">Штаб СО ОО
                            </label>
                            <SearchSelect :items="headquarterRegion.value" open-on-clear id="select-region"
                                name="select-headquarter" placeholder="Выберите штаб"
                                v-model="detachment.educational_headquarter" @update:value="changeValue">
                            </SearchSelect>

                            <p class="form__error" v-if="isError.region">
                                * {{ getErrorField('headquarter') }}
                            </p>
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button variant="text" type="button" class="form-button form-button--next" label="Далее"
                            size="large" @click="openPanelTwo"></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel value="panelTwo">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Контакты
                        </v-col>
                        <p class="form__error form__error--title" v-if="isErrorMembers.position">
                            Заполните обязательные поля!
                        </p>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" fill="#1F7CC0" stroke="#1F7CC0" />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" transform="rotate(-180 16 16)" fill="#1F7CC0"
                                    stroke="#1F7CC0" />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label class="form__label" for="social-media-vk">Группа отряда ВКонтакте
                            </label>
                            <TextareaAbout maxlength="50" class="form__textarea form__textarea--mobile"
                                id="social-media-vk" placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk" v-model:value="detachment.social_vk"></TextareaAbout>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="social-media-te">Группа отряда в Телеграм
                            </label>
                            <TextareaAbout maxlength="50" class="form__textarea form__textarea--mobile"
                                id="social-media-te" placeholder="Например, https://t.me/cco_monolit"
                                name="social_media_te" v-model:value="detachment.social_tg"></TextareaAbout>
                        </div>

                        <div class="form__field" v-if="participants">
                            <p class="form__label">
                                Участники отряда
                                <sup class="valid-red">*</sup>
                            </p>
                            <p class="form__error form__error--members" v-if="isErrorMembers.position">
                                * Заполните должность у каждого участника
                            </p>
                            <v-text-field class="form__field-search" variant="outlined" type="text"
                                placeholder="Поиск по ФИО" @keyup="searchDMembers" v-model="searchMembers">
                                <template #prepend-inner>
                                    <Icon icon="clarity-search-line" color="#222222" width="24" height="24">
                                    </Icon>
                                </template>
                            </v-text-field>
                            <div class="overlay" v-if="showModal"></div>
                            <DeleteModal :is-squad="true" v-show="showModal === true" @close="close" @delete="
                                deleteMember(props.detachment.id, deletedId)
                                ">
                            </DeleteModal>
                            <MembersList :items="props.members" :submited="submited" :unit="'отряд'"
                                :functions="positions.positions.value" :is-error-members="isErrorMembers"
                                v-if="members && !isMembersLoading" @update-member="onUpdateMember"
                                @delete-member="onDeleteMember">
                            </MembersList>
                            <v-progress-circular class="circleLoader" v-else indeterminate
                                color="blue"></v-progress-circular>
                        </div>
                    </div>

                    <v-card-actions class="form__button-group">
                        <Button class="form-button form-button--prev" variant="text" type="button" label="Назад"
                            size="large" @click="openPanelOne"></Button>
                        <Button class="form-button form-button--next" variant="text" type="button" label="Далее"
                            size="large" @click="openPanelThree"></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel value="panelThree">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                        <!-- <p
                            class="form__error form__error--title"
                            v-if="isError.slogan || isError.about"
                        >
                            Заполните обязательные поля!
                        </p> -->
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon v-if="!expanded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" fill="#1F7CC0" stroke="#1F7CC0" />
                                <path
                                    d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                        <v-icon v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <circle cx="16" cy="16" r="15.5" transform="rotate(-180 16 16)" fill="#1F7CC0"
                                    stroke="#1F7CC0" />
                                <path
                                    d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label class="form__label" for="squad-slogan">Девиз отряда
                            </label>
                            <TextareaAbout maxlength="100" class="form__textarea form__textarea--mobile"
                                id="squad-slogan" placeholder="Например, через тернии к звездам" name="squad_slogan"
                                v-model:value="detachment.slogan"></TextareaAbout>
                            <div class="form__counter">
                                {{ counterSlogan }} / 100
                            </div>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="about-squad">Об отряде
                            </label>
                            <TextareaAbout :rows="6" maxlength="500" class="form__textarea" id="about-squad"
                                placeholder="Расскажите об отряде" name="about_squad" v-model:value="detachment.about">
                            </TextareaAbout>
                            <div class="form__counter">
                                {{ counterAbout }} / 500
                            </div>
                        </div>

                        <div class="form__field photo-add">
                            <p class="form__label">Логотип</p>
                            <div class="photo-add__box photo-add__box--logo">
                                <div class="photo-add__img photo-add__img--logo">
                                    <img class="photo-add__image" :src="detachment.emblem ?? urlEmblem" />
                                </div>

                                <div class="photo-add__input">
                                    <label @click="dialogLogo = true" class="photo-add__label photo-add__label--logo"
                                        for="upload-logo" v-if="!detachment.emblem && !urlEmblem">
                                        <svg class="logo-add__svg" aria-hidden="true" focusable="false"
                                            xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                            viewBox="0 0 48 48" fill="none">
                                            <g filter="url(#filter0_b_2686_15482)">
                                                <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                            </g>
                                            <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white" stroke-width="2"
                                                stroke-linecap="round" />
                                            <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                stroke-linecap="round" />
                                            <defs>
                                                <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                    width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="18.4821" />
                                                    <feComposite in2="SourceAlpha" operator="in"
                                                        result="effect1_backgroundBlur_2686_15482" />
                                                    <feBlend mode="normal" in="SourceGraphic"
                                                        in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </label>
                                    <div class="photo-add__edit-group photo-add__edit-group--position" v-else>
                                        <label class="photo-add__label-edit" for="upload-logo"
                                            @click="dialogLogo = true">
                                            <span class="photo-add__label-text">Изменить фото</span>
                                        </label>
                                        <button class="photo-add__button-clear" type="button" @click="resetEmblem">
                                            Удалить фото
                                        </button>
                                    </div>
                                    <input type="file" id="upload-logo" name="squad-logo" hidden @change="selectFile"
                                        @click.prevent />
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
                                                        <v-file-input @change="selectFile" type="file" show-size
                                                            prepend-icon="mdi-camera" counter />
                                                    </v-row>
                                                    <v-row class="align-center justify-end">
                                                        <v-btn v-if="logoPreview" class="button-wrapper mt-5" @click="
                                                            cropImage(
                                                                'logo',
                                                            )
                                                            " prepend-icon="crop" variant="plain">Обрезать
                                                            фото</v-btn>
                                                    </v-row>
                                                    <v-row>
                                                        <Cropper ref="cropper" class="cropper mt-5 mx-auto"
                                                            :src="logoPreview" />
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="dialogLogo = false">
                                                    Закрыть
                                                </v-btn>
                                                <v-btn :disabled="!fileEmblem" color="blue-darken-1" variant="text"
                                                    type="submit" @click="uploadPhoto('logo')">
                                                    Загрузить
                                                </v-btn>
                                            </v-card-actions>
                                            <p class="error" v-if="isError.detail">
                                                {{ isError.detail }}
                                            </p>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </div>
                            <span class="form__footnote">Рекомендуемый размер 80х80</span>
                        </div>

                        <div class="form__field photo-add">
                            <p class="form__label">Баннер</p>
                            <div class="photo-add__box photo-add__box--banner">
                                <div class="photo-add__img photo-add__img--banner">
                                    <img v-if="detachment.banner ?? urlBanner" class="photo-add__image"
                                        :src="detachment.banner ?? urlBanner" />
                                    <img v-else src="@app/assets/banner-stub.png" alt="Баннер отряда(пусто)" />
                                </div>

                                <div class="photo-add__input">
                                    <label class="photo-add__label" for="upload-banner"
                                        v-if="!detachment.banner && !urlBanner" @click="dialogBanner = true">
                                        <svg class="" aria-hidden="true" focusable="false"
                                            xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                            viewBox="0 0 48 48" fill="none">
                                            <g filter="url(#filter0_b_2686_15482)">
                                                <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                            </g>
                                            <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white" stroke-width="2"
                                                stroke-linecap="round" />
                                            <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                stroke-linecap="round" />
                                            <defs>
                                                <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                    width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="18.4821" />
                                                    <feComposite in2="SourceAlpha" operator="in"
                                                        result="effect1_backgroundBlur_2686_15482" />
                                                    <feBlend mode="normal" in="SourceGraphic"
                                                        in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </label>
                                    <div class="photo-add__edit-group" v-else>
                                        <label class="photo-add__label-edit" for="upload-banner"
                                            @click="dialogBanner = true">
                                            <span class="photo-add__label-text">Изменить фото</span>
                                        </label>
                                        <button class="photo-add__button-clear" type="reset" @click="resetBanner">
                                            Удалить фото
                                        </button>
                                    </div>
                                    <input type="file" id="upload-banner" name="squad-banner" hidden
                                        @change="selectBanner" @click.prevent />
                                    <v-dialog v-model="dialogBanner" width="1024">
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">
                                                    Загрузите ваше фото
                                                </span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-file-input @change="selectBanner
                                                            " type="file" show-size prepend-icon="mdi-camera"
                                                            counter />
                                                    </v-row>
                                                    <v-row class="align-center justify-end">
                                                        <v-btn v-if="bannerPreview" class="button-wrapper mt-5" @click="
                                                            cropImage(
                                                                'banner',
                                                            )
                                                            " prepend-icon="crop" variant="plain">Обрезать
                                                            фото</v-btn>
                                                    </v-row>
                                                    <v-row>
                                                        <Cropper ref="cropper" class="cropper mt-5 mx-auto"
                                                            :src="bannerPreview" />
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="
                                                    dialogBanner = false
                                                    ">
                                                    Закрыть
                                                </v-btn>
                                                <v-btn :disabled="!fileBanner" color="blue-darken-1" variant="text"
                                                    type="submit" @click="
                                                        uploadPhoto('banner')
                                                        ">
                                                    Загрузить
                                                </v-btn>
                                            </v-card-actions>
                                            <p class="error" v-if="isError.detail">
                                                {{ isError.detail }}
                                            </p>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </div>
                            <span class="form__footnote">Рекомендуемый размер 1180*200</span>
                        </div>

                        <div class="form-field photo-add">
                            <p class="form__label">Фотографии</p>
                            <div class="photo-add__container">
                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img v-if="
                                            detachment.photo1 ?? urlPhotoOne
                                        " class="photo-add__image" :src="detachment.photo1 ?? urlPhotoOne
                                                " />
                                        <img v-else src="@app/assets/photo-stub.png" alt="Фотография отряда(пусто)" />
                                    </div>

                                    <div class="photo-add__input">
                                        <label @click="dialogPhotoOne = true"
                                            class="photo-add__label photo-add__label--position" for="upload-photo-one"
                                            v-if="
                                                !detachment.photo1 &&
                                                !urlPhotoOne
                                            ">
                                            <svg class="" aria-hidden="true" focusable="false"
                                                xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                                viewBox="0 0 48 48" fill="none">
                                                <g filter="url(#filter0_b_2686_15482)">
                                                    <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                    <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                                </g>
                                                <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white"
                                                    stroke-width="2" stroke-linecap="round" />
                                                <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                    stroke-linecap="round" />
                                                <defs>
                                                    <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                        width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                        color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feGaussianBlur in="BackgroundImageFix"
                                                            stdDeviation="18.4821" />
                                                        <feComposite in2="SourceAlpha" operator="in"
                                                            result="effect1_backgroundBlur_2686_15482" />
                                                        <feBlend mode="normal" in="SourceGraphic"
                                                            in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </label>
                                        <div class="photo-add__edit-group" v-else>
                                            <label class="photo-add__label-edit" for="upload-photo-one"
                                                @click="dialogPhotoOne = true">
                                                <span class="photo-add__label-text">Изменить фото</span>
                                            </label>
                                            <button class="photo-add__button-clear" type="reset" @click="resetPhotoOne">
                                                Удалить фото
                                            </button>
                                        </div>
                                        <input type="file" id="upload-photo-one" hidden @change="selectPhotoOne"
                                            @click.prevent />
                                        <v-dialog v-model="dialogPhotoOne" width="1024">
                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">
                                                        Загрузите ваше фото
                                                    </span>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-file-input @change="selectPhotoOne
                                                                " type="file" show-size prepend-icon="mdi-camera"
                                                                counter />
                                                        </v-row>
                                                        <v-row class="align-center justify-end">
                                                            <v-btn v-if="
                                                                photoOnePreview
                                                            " class="button-wrapper mt-5" @click="
                                                                    cropImage(
                                                                        'photoOne',
                                                                    )
                                                                    " prepend-icon="crop" variant="plain">Обрезать
                                                                фото</v-btn>
                                                        </v-row>
                                                        <v-row>
                                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="photoOnePreview
                                                                " />
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue-darken-1" variant="text" @click="
                                                        dialogPhotoOne = false
                                                        ">
                                                        Закрыть
                                                    </v-btn>
                                                    <v-btn :disabled="!filePhotoOne
                                                        " color="blue-darken-1" variant="text" type="submit" @click="
                                                            uploadPhoto(
                                                                'photoOne',
                                                            )
                                                            ">
                                                        Загрузить
                                                    </v-btn>
                                                </v-card-actions>
                                                <p class="error" v-if="isError.detail">
                                                    {{ isError.detail }}
                                                </p>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img v-if="
                                            detachment.photo2 ?? urlPhotoTwo
                                        " class="photo-add__image" :src="detachment.photo2 ?? urlPhotoTwo
                                                " />
                                        <img v-else src="@app/assets/photo-stub.png" alt="Фотография отряда(пусто)" />
                                    </div>

                                    <div class="photo-add__input">
                                        <label @click="dialogPhotoTwo = true"
                                            class="photo-add__label photo-add__label--position" for="upload-photo-two"
                                            v-if="
                                                !detachment.photo2 &&
                                                !urlPhotoTwo
                                            ">
                                            <svg class="" aria-hidden="true" focusable="false"
                                                xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                                viewBox="0 0 48 48" fill="none">
                                                <g filter="url(#filter0_b_2686_15482)">
                                                    <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                    <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                                </g>
                                                <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white"
                                                    stroke-width="2" stroke-linecap="round" />
                                                <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                    stroke-linecap="round" />
                                                <defs>
                                                    <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                        width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                        color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feGaussianBlur in="BackgroundImageFix"
                                                            stdDeviation="18.4821" />
                                                        <feComposite in2="SourceAlpha" operator="in"
                                                            result="effect1_backgroundBlur_2686_15482" />
                                                        <feBlend mode="normal" in="SourceGraphic"
                                                            in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </label>
                                        <div class="photo-add__edit-group" v-else>
                                            <label @click="dialogPhotoTwo = true" class="photo-add__label-edit"
                                                for="upload-photo-two">
                                                <span class="photo-add__label-text">Изменить фото</span>
                                            </label>
                                            <button class="photo-add__button-clear" type="reset" @click="resetPhotoTwo">
                                                Удалить фото
                                            </button>
                                        </div>
                                        <input type="file" id="upload-photo-two" hidden @change="selectPhotoTwo"
                                            @click.prevent />
                                        <v-dialog v-model="dialogPhotoTwo" width="1024">
                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">
                                                        Загрузите ваше фото
                                                    </span>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-file-input @change="selectPhotoTwo
                                                                " type="file" show-size prepend-icon="mdi-camera"
                                                                counter />
                                                        </v-row>
                                                        <v-row class="align-center justify-end">
                                                            <v-btn v-if="
                                                                photoTwoPreview
                                                            " class="button-wrapper mt-5" @click="
                                                                    cropImage(
                                                                        'photoTwo',
                                                                    )
                                                                    " prepend-icon="crop" variant="plain">Обрезать
                                                                фото</v-btn>
                                                        </v-row>
                                                        <v-row>
                                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="photoTwoPreview
                                                                " />
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue-darken-1" variant="text" @click="
                                                        dialogPhotoTwo = false
                                                        ">
                                                        Закрыть
                                                    </v-btn>
                                                    <v-btn :disabled="!filePhotoTwo
                                                        " color="blue-darken-1" variant="text" type="submit" @click="
                                                            uploadPhoto(
                                                                'photoTwo',
                                                            )
                                                            ">
                                                        Загрузить
                                                    </v-btn>
                                                </v-card-actions>
                                                <p class="error" v-if="isError.detail">
                                                    {{ isError.detail }}
                                                </p>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img v-if="
                                            detachment.photo3 ??
                                            urlPhotoThree
                                        " class="photo-add__image" :src="detachment.photo3 ??
                                                urlPhotoThree
                                                " />
                                        <img v-else src="@app/assets/photo-stub.png" alt="Фотография отряда(пусто)" />
                                    </div>

                                    <div class="photo-add__input">
                                        <label @click="dialogPhotoThree = true"
                                            class="photo-add__label photo-add__label--position" for="upload-photo-three"
                                            v-if="
                                                !detachment.photo3 &&
                                                !urlPhotoThree
                                            ">
                                            <svg class="" aria-hidden="true" focusable="false"
                                                xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                                viewBox="0 0 48 48" fill="none">
                                                <g filter="url(#filter0_b_2686_15482)">
                                                    <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                    <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                                </g>
                                                <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white"
                                                    stroke-width="2" stroke-linecap="round" />
                                                <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                    stroke-linecap="round" />
                                                <defs>
                                                    <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                        width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                        color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feGaussianBlur in="BackgroundImageFix"
                                                            stdDeviation="18.4821" />
                                                        <feComposite in2="SourceAlpha" operator="in"
                                                            result="effect1_backgroundBlur_2686_15482" />
                                                        <feBlend mode="normal" in="SourceGraphic"
                                                            in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </label>
                                        <div class="photo-add__edit-group" v-else>
                                            <label @click="dialogPhotoThree = true" class="photo-add__label-edit"
                                                for="upload-photo-three">
                                                <span class="photo-add__label-text">Изменить фото</span>
                                            </label>
                                            <button class="photo-add__button-clear" type="reset"
                                                @click="resetPhotoThree">
                                                Удалить фото
                                            </button>
                                        </div>
                                        <input type="file" id="upload-photo-three" hidden @change="selectPhotoThree"
                                            @click.prevent />
                                        <v-dialog v-model="dialogPhotoThree" width="1024">
                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">
                                                        Загрузите ваше фото
                                                    </span>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-file-input @change="selectPhotoThree
                                                                " type="file" show-size prepend-icon="mdi-camera"
                                                                counter />
                                                        </v-row>
                                                        <v-row class="align-center justify-end">
                                                            <v-btn v-if="
                                                                photoThreePreview
                                                            " class="button-wrapper mt-5" @click="
                                                                    cropImage(
                                                                        'photoThree',
                                                                    )
                                                                    " prepend-icon="crop" variant="plain">Обрезать
                                                                фото</v-btn>
                                                        </v-row>
                                                        <v-row>
                                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="photoThreePreview
                                                                " />
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue-darken-1" variant="text" @click="
                                                        dialogPhotoThree = false
                                                        ">
                                                        Закрыть
                                                    </v-btn>
                                                    <v-btn :disabled="!filePhotoThree
                                                        " color="blue-darken-1" variant="text" type="submit" @click="
                                                            uploadPhoto(
                                                                'photoThree',
                                                            )
                                                            ">
                                                        Загрузить
                                                    </v-btn>
                                                </v-card-actions>
                                                <p class="error" v-if="isError.detail">
                                                    {{ isError.detail }}
                                                </p>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img v-if="
                                            detachment.photo4 ??
                                            urlPhotoFour
                                        " class="photo-add__image" :src="detachment.photo4 ??
                                                urlPhotoFour
                                                " />
                                        <img v-else src="@app/assets/photo-stub.png" alt="Фотография отряда(пусто)" />
                                    </div>

                                    <div class="photo-add__input">
                                        <label @click="dialogPhotoFour = true"
                                            class="photo-add__label photo-add__label--position" for="upload-photo-four"
                                            v-if="
                                                !detachment.photo4 &&
                                                !urlPhotoFour
                                            ">
                                            <svg class="" aria-hidden="true" focusable="false"
                                                xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                                viewBox="0 0 48 48" fill="none">
                                                <g filter="url(#filter0_b_2686_15482)">
                                                    <circle cx="24" cy="24" r="24" fill="black" fill-opacity="0.4" />
                                                    <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" />
                                                </g>
                                                <path d="M24.1328 15.1328L24.1328 33.1328" stroke="white"
                                                    stroke-width="2" stroke-linecap="round" />
                                                <path d="M15.1328 24.1328H33.1328" stroke="white" stroke-width="2"
                                                    stroke-linecap="round" />
                                                <defs>
                                                    <filter id="filter0_b_2686_15482" x="-36.9643" y="-36.9643"
                                                        width="121.929" height="121.929" filterUnits="userSpaceOnUse"
                                                        color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feGaussianBlur in="BackgroundImageFix"
                                                            stdDeviation="18.4821" />
                                                        <feComposite in2="SourceAlpha" operator="in"
                                                            result="effect1_backgroundBlur_2686_15482" />
                                                        <feBlend mode="normal" in="SourceGraphic"
                                                            in2="effect1_backgroundBlur_2686_15482" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </label>
                                        <div class="photo-add__edit-group" v-else>
                                            <label @click="dialogPhotoFour = true" class="photo-add__label-edit"
                                                for="upload-photo-four">
                                                <span class="photo-add__label-text">Изменить фото</span>
                                            </label>
                                            <button class="photo-add__button-clear" type="reset"
                                                @click="resetPhotoFour">
                                                Удалить фото
                                            </button>
                                        </div>
                                        <input type="file" id="upload-photo-four" hidden @change="selectPhotoFour"
                                            @click.prevent />
                                        <v-dialog v-model="dialogPhotoFour" width="1024">
                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">
                                                        Загрузите ваше фото
                                                    </span>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-file-input @change="selectPhotoFour
                                                                " type="file" show-size prepend-icon="mdi-camera"
                                                                counter />
                                                        </v-row>
                                                        <v-row class="align-center justify-end">
                                                            <v-btn v-if="
                                                                photoFourPreview
                                                            " class="button-wrapper mt-5" @click="
                                                                    cropImage(
                                                                        'photoFour',
                                                                    )
                                                                    " prepend-icon="crop" variant="plain">Обрезать
                                                                фото</v-btn>
                                                        </v-row>
                                                        <v-row>
                                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="photoFourPreview
                                                                " />
                                                        </v-row>
                                                    </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue-darken-1" variant="text" @click="
                                                        dialogPhotoFour = false
                                                        ">
                                                        Закрыть
                                                    </v-btn>
                                                    <v-btn :disabled="!filePhotoFour
                                                        " color="blue-darken-1" variant="text" type="submit" @click="
                                                            uploadPhoto(
                                                                'photoFour',
                                                            )
                                                            ">
                                                        Загрузить
                                                    </v-btn>
                                                </v-card-actions>
                                                <p class="error" v-if="isError.detail">
                                                    {{ isError.detail }}
                                                </p>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button v-show="showButtonPrev" class="form-button form-button--prev" variant="text" type="button"
                    label="Назад" size="large" @click="openPanelTwo"></Button>
                <Button v-if="!participants" type="submit" class="form-button" variant="text" label="Создать"
                    size="large">
                </Button>
                <Button v-else type="submit" class="form-button" variant="text" label="Сохранить" size="large">
                </Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { DeleteModal } from '@shared/components/dropdown';
import { HTTP } from '@app/http';
// import { Select } from '@shared/components/selects';
import { SearchSelect } from '@shared/components/selects';
// import { educInstitutionDropdown } from '@shared/components/selects';
// import { Dropdown } from '@shared/components/selects';
import { DropdownCommander } from '@shared/components/selects';
import { MembersList } from '@features/Members/components';
import { Icon } from '@iconify/vue';
import { TextareaAbout } from '@shared/components/inputs';
import { useRoleStore } from '@layouts/store/role';
import { useSquadsStore } from '@features/store/squads';
import { useRegionalsStore } from '@features/store/regionals';
import { usePositionsStore } from '@features/store/positions';
import { storeToRefs } from 'pinia';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const areasStore = useSquadsStore();
const areas = storeToRefs(areasStore);
const showModal = ref(false);
const regionalsStore = useRegionalsStore();
const regions = storeToRefs(regionalsStore);

const positionsStore = usePositionsStore();
const positions = storeToRefs(positionsStore);

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);

const emit = defineEmits([
    'update:value',
    'updateMember',
    'deleteMember',
    'changeDetachment',
    'selectFile',
    'resetEmblem',
    'selectBanner',
    'resetBanner',
    'selectPhotoOne',
    'resetPhotoOne',
    'selectPhotoTwo',
    'resetPhotoTwo',
    'selectPhotoThree',
    'resetPhotoThree',
    'selectPhotoFour',
    'resetPhotoFour',
]);

const props = defineProps({
    participants: {
        type: Boolean,
        default: false,
    },
    detachment: {
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
    filePhotoOne: {
        type: String,
        default: null,
    },
    filePhotoTwo: {
        type: String,
        default: null,
    },
    filePhotoThree: {
        type: String,
        default: null,
    },
    filePhotoFour: {
        type: String,
        default: null,
    },
    isError: {
        type: Object,
        default: () => ({}),
    },
    isErrorMembers: {
        type: Object,
        default: () => ({}),
    },
    members: {
        type: Array,
        default: () => [],
    },
    isCommanderLoading: {
        type: Boolean,
        default: false,
    },
    isMembersLoading: {
        type: Boolean,
        default: false,
    },
    regionName: {
        type: String,
        default: '',
    },
    headquarterRegion: {
        type: Array,
        default: () => [],
    },
    headquarterItems: {
        type: Array,
        default: () => [],
    },
});

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
            `/detachments/${id}/members/${membership_pk}/`,

        );
        showModal.value = false;
        // console.log(responseDelete);
        emit('deleteMember', membership_pk);
        // areasStore.getSquadMembers(props.detachment.id);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const detachment = ref(props.detachment);

//-------------------------------------Валидация полей-------------------------------------------
// const name = ref(props.detachment.name);
// const area = ref(props.detachment.area);
// const founding_date = ref(props.detachment.founding_date);
// const region = ref(props.detachment.region);
// const city = ref(props.detachment.city);
// const educational_institution = ref(props.detachment.educational_institution);
// const commander = ref(props.detachment.commandert);
// const social_vk = ref(props.detachment.social_vk);
// const social_tg = ref(props.detachment.social_tg);
// const slogan = ref(props.detachment.slogan);
// const about = ref(props.detachment.about);
// const avatar = ref(props.unit.avatar);
// const banner = ref(props.unit.banner);
// const photoOne = ref(props.unit.photoOne);
// const photoTwo = ref(props.unit.photoTwo);
// const photoThree = ref(props.unit.photoThree);
// const photoFour = ref(props.unit.photoFour);

// const rules = computed(() => ({
//     name: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     area: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     founding_date: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     region: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     educational_institution: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     commander: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     social_vk: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     social_tg: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     slogan: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     about: {
//         required: helpers.withMessage(`* обязательно для заполнения`, required),
//     },
//     // membersList: {
//     //     //--------------------------------
//     //     // required,
//     //     $each: helpers.forEach({
//     //         position: {
//     //             required: helpers.withMessage(
//     //                 `* обязательно для заполнения`,
//     //                 required,
//     //             ),
//     //         },
//     //     }),
//     // },
// }));

//------------------------------------------------------------------------------------------------

const getRegionName = computed(() => {
    let item = regions.regions.value.filter(
        (item) => item.id === detachment.value.region,
    );
    return item[0]?.name;
});

const regionName = ref(props.regionName);
regionName.value = getRegionName;

const headquarterItems = ref(props.headquarterItems);

const getHeadquarter = async () => {
    await HTTP.get('educationals',)
        .then((res) => {
            headquarterItems.value = res.data.results;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
const getHeadquarterRegion = computed(() => {
    return headquarterItems.value.filter(
        (item) =>
            item?.educational_institution?.region?.id ===
            detachment?.value.region,
    );
});

const headquarterRegion = ref(props.headquarterRegion);
headquarterRegion.value = getHeadquarterRegion;

// const queryCommander = computed(() => {

//     return {search:'ssss', region:getRegionName.value};
// });

const counterSquad = computed(() => {
    return detachment.value.name.length || 0;
});

const counterSlogan = computed(() => {
    if (detachment.value.slogan) {
        return detachment.value.slogan.length;
    } else return 0;
});

const counterAbout = computed(() => {
    if (detachment.value.about) {
        return detachment.value.about.length;
    } else return 0;
});

// const searchCommander = async() => {
//     try {
//         isLoading.value = true;
//         setTimeout(async () => {
//             const ItemResponse = await HTTP.get(props.address, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             items.value = ItemResponse.data;
//             isLoading.value = false;
//         }, 500);
//     } catch (error) {
//         console.log('an error occured ' + error);
//     }
//     console.log(detachment.value.commanderName);
// };

//------------------------------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------------------------
const showButtonPrev = computed(() => {
    return panel.value === 'panelThree';
});

const searchMembers = ref('');

const timerSearch = ref(null);

const searchDMembers = () => {
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        areasStore.getSearchSquadMembers(props.detachment.id, searchMembers.value)
    }, 400);
}

const onUpdateMember = (event, id) => {
    emit('updateMember', event, id);
};

const changeValue = (event) => {
    // console.log(event);
    emit('update:value', event);
};
//--Обрезание фото----------------------------------------------------------------------------------
const cropper = ref();
const dialogLogo = ref(false);
const dialogBanner = ref(false);
const dialogPhotoOne = ref(false);
const dialogPhotoTwo = ref(false);
const dialogPhotoThree = ref(false);
const dialogPhotoFour = ref(false);
let logoPreview = ref(null);
let bannerPreview = ref(null);
let photoOnePreview = ref(null);
let photoTwoPreview = ref(null);
let photoThreePreview = ref(null);
let photoFourPreview = ref(null);

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

    if (cropper.value && type === 'photoOne') {
        const { canvas } = cropper.value.getResult();
        photoOnePreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            filePhotoOne.value = new File([blob], 'photoOne.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }

    if (cropper.value && type === 'photoTwo') {
        const { canvas } = cropper.value.getResult();
        photoTwoPreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            filePhotoTwo.value = new File([blob], 'photoTwo.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }

    if (cropper.value && type === 'photoThree') {
        const { canvas } = cropper.value.getResult();
        photoThreePreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            filePhotoThree.value = new File([blob], 'photoThree.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }

    if (cropper.value && type === 'photoFour') {
        const { canvas } = cropper.value.getResult();
        photoFourPreview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            filePhotoFour.value = new File([blob], 'photoFour.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }
};

const uploadPhoto = (type) => {
    if (type === 'logo') {
        detachment.value.emblem = null;
        urlEmblem.value = URL.createObjectURL(fileEmblem.value);
        // console.log("значение emblem после изм - ", detachment.value.emblem);

        emit('selectFile', fileEmblem.value);
        dialogLogo.value = false;
    }
    if (type === 'banner') {
        detachment.value.banner = null;
        urlBanner.value = URL.createObjectURL(fileBanner.value);

        emit('selectBanner', fileBanner.value);
        dialogBanner.value = false;
    }

    if (type === 'photoOne') {
        detachment.value.photo1 = null;
        urlPhotoOne.value = URL.createObjectURL(filePhotoOne.value);

        emit('selectPhotoOne', filePhotoOne.value);
        dialogPhotoOne.value = false;
    }

    if (type === 'photoTwo') {
        detachment.value.photo2 = null;
        urlPhotoTwo.value = URL.createObjectURL(filePhotoTwo.value);

        emit('selectPhotoTwo', filePhotoTwo.value);
        dialogPhotoTwo.value = false;
    }

    if (type === 'photoThree') {
        detachment.value.photo3 = null;
        urlPhotoThree.value = URL.createObjectURL(filePhotoThree.value);

        emit('selectPhotoThree', filePhotoThree.value);
        dialogPhotoThree.value = false;
    }

    if (type === 'photoFour') {
        detachment.value.photo4 = null;
        urlPhotoFour.value = URL.createObjectURL(filePhotoFour.value);

        emit('selectPhotoFour', filePhotoFour.value);
        dialogPhotoFour.value = false;
    }
};
//--Добавление логотипа-----------------------------------------------------------------------------

const fileEmblem = ref(props.fileEmblem);
const urlEmblem = ref(null);

const selectFile = (event) => {
    fileEmblem.value = event.target.files[0];
    // console.log("значение fileEmblem после изм - ", fileEmblem.value);
    logoPreview.value = URL.createObjectURL(fileEmblem.value);
};

const resetEmblem = () => {
    // console.log(fileEmblem.value);
    detachment.value.emblem = null;
    urlEmblem.value = null;

    fileEmblem.value = null;
    // console.log(fileEmblem.value);

    emit('resetEmblem', fileEmblem.value);
};
//--Добавление баннера-----------------------------------------------------------------------------
const fileBanner = ref(props.fileBanner);
const urlBanner = ref(null);

const selectBanner = (event) => {
    fileBanner.value = event.target.files[0];
    bannerPreview.value = URL.createObjectURL(fileBanner.value);
};

const resetBanner = () => {
    detachment.value.banner = null;
    urlBanner.value = null;
    fileBanner.value = null;
    emit('resetBanner', fileBanner.value);
};
//--Добавление фото-----------------------------------------------------------------------------
const filePhotoOne = ref(props.filePhotoOne);
const urlPhotoOne = ref(null);

const selectPhotoOne = (event) => {
    filePhotoOne.value = event.target.files[0];
    // console.log('значение file после изм - ', filePhotoOne.value);
    photoOnePreview.value = URL.createObjectURL(filePhotoOne.value);
};
const resetPhotoOne = () => {
    detachment.value.photo1 = null;
    urlPhotoOne.value = null;
    filePhotoOne.value = null;
    emit('resetPhotoOne', filePhotoOne.value);
};
//-----------------------------------------------------------------------------
const filePhotoTwo = ref(props.filePhotoTwo);
const urlPhotoTwo = ref(null);

const selectPhotoTwo = (event) => {
    filePhotoTwo.value = event.target.files[0];
    // console.log('значение file после изм - ', filePhotoTwo.value);
    photoTwoPreview.value = URL.createObjectURL(filePhotoTwo.value);
};
const resetPhotoTwo = () => {
    detachment.value.photo2 = null;
    urlPhotoTwo.value = null;
    filePhotoTwo.value = null;
    emit('resetPhotoTwo', filePhotoTwo.value);
};
//----------------------------------------------------------------------------
const filePhotoThree = ref(props.filePhotoThree);
const urlPhotoThree = ref(null);

const selectPhotoThree = (event) => {
    filePhotoThree.value = event.target.files[0];
    // console.log('значение file после изм - ', filePhotoThree.value);
    photoThreePreview.value = URL.createObjectURL(filePhotoThree.value);
};
const resetPhotoThree = () => {
    detachment.value.photo3 = null;
    urlPhotoThree.value = null;
    filePhotoThree.value = null;
    emit('resetPhotoThree', filePhotoThree.value);
};
//---------------------------------------------------------------------------
const filePhotoFour = ref(props.filePhotoFour);
const urlPhotoFour = ref(null);

const selectPhotoFour = (event) => {
    filePhotoFour.value = event.target.files[0];
    // console.log('значение file после изм - ', filePhotoFour.value);
    photoFourPreview.value = URL.createObjectURL(filePhotoFour.value);
};
const resetPhotoFour = () => {
    detachment.value.photo4 = null;
    urlPhotoFour.value = null;
    filePhotoFour.value = null;
    emit('resetPhotoFour', filePhotoFour.value);
};

onBeforeMount(async () => {
    areasStore.getAreas();
    regionalsStore.getRegions();
    roleStore.getRoles();
    positionsStore.getPositions();
    getHeadquarter();
});

watch(
    () => detachment.value.region,
    () => {
        detachment.value.educational_headquarter = null;
        detachment.value.commander = null;
    },
);
</script>

<style lang="scss" scoped>
.bottom-25 {
    bottom: -25px;
}

.bottom-20 {
    bottom: -25px;
}

.overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #fcfcfcb2;
    opacity: 0.6;
}

.form-button {
    width: 132px;
    min-height: 52px;
    margin: 0 10px;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
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
@shared/components/selects/inputs@shared/components/selects/inputs
<!-- <img v-if="detachment.emblem" :src="detachment.emblem" /> -->
