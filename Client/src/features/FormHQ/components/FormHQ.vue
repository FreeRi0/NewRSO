<template>
    <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="changeHeadquarter"
    >
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                            <p
                                class="form__error form__error--title"
                                v-if="
                                    isError.name ||
                                    isError.educational_institution ||
                                    isError.founding_date ||
                                    isError.regional_headquarter ||
                                    isError.commander
                                "
                            >
                                Заполните обязательные поля!
                            </p>
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
                            <label class="form__label" for="name-hq"
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
                            <p
                                class="form__error form__error--name"
                                v-if="isError.name"
                            >
                                * {{ isError.name[0] }}
                            </p>
                            <div class="form__counter">
                                {{ counterTitle }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label class="form__label" for="select-institution"
                                >Выберите учебное заведение
                                <sup class="valid-red">*</sup>
                            </label>
                            <!-- <Select
                                class="form__select form__select--select"
                                variant="outlined"
                                clearable
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="headquarter.educational_institution"
                                address="eduicational_institutions/"
                            ></Select> -->
                            <educInstitutionDropdown
                                open-on-clear
                                id="select-institution"
                                name="select_institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="headquarter.educational_institution"
                                @update:value="changeValue"
                                :SortDropdown="false"

                            ></educInstitutionDropdown>
                            <p
                                class="form__error"
                                v-if="isError.educational_institution"
                            >
                                * {{ getErrorField('educational_institution') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="create-date"
                                >Дата основания
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                id="create-date"
                                name="create_date"
                                type="date"
                                v-model:value="headquarter.founding_date"
                            />
                            <p class="form__error" v-if="isError.founding_date">
                                * {{ getErrorField('founding_date') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label
                                class="form__label"
                                for="select-regional-office"
                                >Выберите региональное отделение
                                <sup class="valid-red">*</sup>
                            </label>
                            <SearchSelect
                                :items="regionalsStore.regionals"
                                open-on-clear

                                id="select-regional-office"
                                name="select_regional-office"
                                placeholder="Например, Карачаево-Черкесское региональное отделение"
                                v-model="headquarter.regional_headquarter"
                                @update:value="changeValue"
                            ></SearchSelect>
                            <p
                                class="form__error"
                                v-if="isError.regional_headquarter"
                            >
                                * {{ getErrorField('regional_headquarter') }}
                            </p>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="city">Город</label>
                            <Input
                                class="form__input"
                                id="city"
                                placeholder="Например, Москва"
                                name="edit_city"
                                v-model:value="headquarter.city"
                            />
                        </div>

                        <div class="form__field form__field--commander">
                            <label class="form__label" for="beast"
                                >Командир штаба СО ОО:
                                <sup class="valid-red">*</sup>
                            </label>
                            <Dropdown
                                v-if="!isCommanderLoading"
                                open-on-clear
                                id="beast"
                                name="edit_beast"
                                placeholder="Поиск по ФИО"
                                :is-reg="false"
                                v-model="headquarter.commander"
                                @update:value="changeValue"
                                :head-val="regionalsStore.regionals.find((item) => item.id == headquarter.regional_headquarter)?.name"

                            ></Dropdown>
                            <v-progress-circular
                                class="circleLoader"
                                v-else
                                indeterminate
                                color="blue"
                            ></v-progress-circular>
                            <!-- {{ headquarter.commander }} -->
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
                        <p
                            class="form__error form__error--title"
                            v-if="isErrorMembers.position"
                        >
                            Заполните обязательные поля!
                        </p>
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
                            <label class="form__label" for="social-media-vk"
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
                            <label class="form__label" for="social-media-te"
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
                                Участники штаба
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
                                @keyup="searchMemberHQ"
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
                            <DeleteModal :is-squad="false" v-show="showModal === true" @close="close" @delete="
                                deleteMember(props.headquarter.id, deletedId)
                                ">
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
                            <label class="form__label" for="hq-slogan"
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
                            <label class="form__label" for="about-hq"
                                >О штабе</label
                            >
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
                                            @click="resetEmblem"
                                        >
                                            Удалить фото
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        id="upload-logo"
                                        name="squad-logo"
                                        hidden
                                        @change="selectFile"
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
                                                            @change="selectFile"
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
                                            @click="resetBanner"
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
                    v-show="showButtonPrev"
                    class="form-button form-button--prev"
                    variant="text"
                    type="button"
                    label="Назад"
                    size="large"
                    @click="openPanelTwo"
                ></Button>
                <Button
                    v-if="!participants"
                    type="submit"
                    class="form-button"
                    variant="text"
                    label="Создать"
                    size="large"
                >
                </Button>
                <Button
                    v-else
                    type="submit"
                    class="form-button"
                    variant="text"
                    label="Сохранить"
                    size="large"
                >
                </Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { HTTP } from '@app/http';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
// import { Select } from '@shared/components/selects';
import { DeleteModal } from '@shared/components/dropdown';
import { SearchSelect } from '@shared/components/selects';
import { educInstitutionDropdown } from '@shared/components/selects';
// import { educationalsDropdown } from '@shared/components/selects';
import { Dropdown } from '@shared/components/selects';
import { MembersList } from '@features/Members/components';
import { Icon } from '@iconify/vue';
import { useEducationalsStore } from '@features/store/educationals';
import { TextareaAbout } from '@shared/components/inputs';
import { useRegionalsStore } from '@features/store/regionals';
import { usePositionsStore } from '@features/store/positions';
import { storeToRefs } from 'pinia';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const regionalsStore = useRegionalsStore();
const regionals = storeToRefs(regionalsStore);
const educationalsStore = useEducationalsStore();

const positionsStore = usePositionsStore();
const positions = storeToRefs(positionsStore);

const emit = defineEmits([
    'update:value',
    'updateMember',
    'changeHeadquarter',
    'selectFile',
    'resetEmblem',
    'selectBanner',
    'resetBanner',
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
    isId: {
        type: Boolean,
        default: false,
    }
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
            `/educationals/${id}/members/${membership_pk}/`,

        );
        showModal.value = false;

        emit('deleteMember', membership_pk);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const headquarter = ref(props.headquarter);




//--------------------------Валидация полей-----------------------------

//----------------------------------------------------------------------------------------------------------
const counterTitle = computed(() => {
    return headquarter.value.name.length || 0;
});

const counterSlogan = computed(() => {
    if (headquarter.value.slogan) {
        return headquarter.value.slogan.length;
    } else return 0;
});

const counterAbout = computed(() => {
    if (headquarter.value.about) {
        return headquarter.value.about.length;
    } else return 0;
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

const searchMembers = ref('');

// const sortedMembers = computed(() => {
//     return props.members.filter((item) => {
//         // return item.title
//         return item.user.last_name
//             .toUpperCase()
//             .includes(searchMembers.value.toUpperCase());
//     });
// });
const timerSearch = ref(null);

const searchMemberHQ = () => {
   clearTimeout(timerSearch.value);
   timerSearch.value = setTimeout(() => {
        educationalsStore.getSearchEducationalsMembers(props.headquarter.id, searchMembers.value)
   }, 400);
}

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
        //   console.log("значение emblem после изм - ", detachment.value.emblem);
        emit('selectFile', fileEmblem.value);
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
// console.log(fileEmblem);

const urlEmblem = ref(null);
// console.log("значение emblem до изм - ", urlEmblem);

const selectFile = (event) => {
    fileEmblem.value = event.target.files[0];
    // console.log("значение fileEmblem после изм - ", fileEmblem.value);

    logoPreview.value = URL.createObjectURL(fileEmblem.value);
};

const resetEmblem = () => {
    // console.log(fileEmblem.value);
    headquarter.value.emblem = null;
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
    headquarter.value.banner = null;
    urlBanner.value = null;
    fileBanner.value = null;
    emit('resetBanner', fileBanner.value);
};



onBeforeMount(async () => {
    regionalsStore.getRegionals();
    positionsStore.getPositions();
});
</script>

<style lang="scss" scoped>
// $expansion-panel-active-title-min-height 64px
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

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
</style>
@shared/components/selects/inputs@shared/components/selects/inputs
