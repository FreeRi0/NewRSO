<template>
    <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="changeDetachment"
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
                            <label class="form__label" for="name-squad"
                                >Название отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                :maxlength="30"
                                class="form__input"
                                id="name-squad"
                                placeholder="Например, Монолит"
                                name="name_squad"
                                v-model:value="detachment.name"
                            />
                            <div class="form__counter">
                                {{ counterSquad }} / 30
                            </div>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="select-direction"
                                >Выберите направление
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                name="select_direction"
                                id="select-direction"
                                placeholder="Например, ССО"
                                v-model="detachment.area"
                                address="api/v1/areas/"
                            ></Select>
                            <!-- <p>{{ detachment.area }}</p> -->
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="create-date"
                                >Дата основания
                                <sup class="valid-red">*</sup>
                            </label>
                            <!-- <input
                                id="create-date"
                                label="Дата основания"
                                name="create_date"
                                type="date"
                                placeholder=""
                                :value="v.date.$model"
                                :error="v.date.$errors"
                            /> -->
                            <Input
                                class="form__input"
                                id="create-date"
                                name="create_date"
                                type="date"
                                v-model:value="detachment.founding_date"
                            />
                            <!-- <Input
                                class="form__input"
                                id="create-date"
                                name="create_date"
                                placeholder="00.00.0000"
                                type="text"
                                onfocus="(this.type = 'date')"
                                v-model:value="v.date.$model"
                                :error="v.date.$errors"
                            /> -->
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="select-region"
                                >Выберите регион
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                clearable
                                variant="outlined"
                                name="select_region"
                                id="select-region"
                                placeholder="Например, Алтайский край"
                                v-model="detachment.region"
                                address="api/v1/regions/"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="city">Город </label>
                            <Input
                                class="form__input"
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model:value="detachment.city"
                            />
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="select-institution"
                                >Выберите учебное заведение
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                variant="outlined"
                                clearable
                                name="select_institution"
                                id="select-institution"
                                placeholder="Например, Алтайский государственный медицинский университет"
                                v-model="detachment.educational_institution"
                                address="api/v1/eduicational_institutions/"
                            ></Select>
                        </div>

                        <div class="form__field form__field--commander">
                            <label class="form__label" for="beast"
                                >Командир отряда:
                                <sup class="valid-red">*</sup>
                            </label>
                            <Dropdown
                                id="beast"
                                name="edit_beast"
                                placeholder="Поиск по ФИО"
                                v-model="detachment.commander"
                                @update:value="changeValue"
                                address="api/v1/rsousers/"
                            ></Dropdown>
                            <!-- <p>{{ detachment.commander }}</p> -->
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
                            <label class="form__label" for="social-media-vk"
                                >Группа отряда ВКонтакте
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                id="social-media-vk"
                                :maxlength="50"
                                placeholder="Например, https://vk.com/cco_monolit"
                                name="social_media_vk"
                                v-model:value="detachment.social_vk"
                            />
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="social-media-te"
                                >Группа отряда в Телеграмме
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                id="social-media-te"
                                :maxlength="50"
                                placeholder="Например, https://t.me/cco_monolit"
                                name="social_media_te"
                                v-model:value="detachment.social_tg"
                            />
                        </div>

                        <div class="form__field" v-if="participants">
                            <p class="form__label">
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
                                :submited="submited"
                                @update-member="onUpdateMember"
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
                            <label class="form__label" for="squad-slogan"
                                >Девиз отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="squad-slogan"
                                placeholder="Например, через тернии к звездам"
                                name="squad_slogan"
                                :maxlength="100"
                                v-model:value="detachment.slogan"
                            />
                            <div class="form__counter">
                                {{ counterSlogan }} / 100
                            </div>
                        </div>

                        <div class="form__field">
                            <label class="form__label" for="about-squad"
                                >Об отряде
                                <sup class="valid-red">*</sup>
                            </label>
                            <TextareaAbout
                                :rows="6"
                                maxlength="500"
                                class="form__textarea"
                                id="about-squad"
                                placeholder="Расскажите об отряде"
                                name="about_squad"
                                v-model:value="detachment.about"
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
                                    <img v-if="urlEmblem" :src="urlEmblem" />
                                </div>

                                <div class="photo-add__input">
                                    <label
                                        class="photo-add__label photo-add__label--logo"
                                        for="upload-logo"
                                        v-show="!urlEmblem"
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
                                    <input
                                        type="file"
                                        id="upload-logo"
                                        name="squad-logo"
                                        accept="image/*,image/jpeg"
                                        hidden
                                        @change="selectFile"
                                    />
                                    <div
                                        class="photo-add__edit-group photo-add__edit-group--position"
                                        v-show="urlEmblem"
                                    >
                                        <label
                                            class="photo-add__label-edit"
                                            for="upload-logo"
                                        >
                                            <span class="photo-add__label-text"
                                                >Изменить фото</span
                                            >
                                        </label>
                                        <button
                                            class="photo-add__button-clear"
                                            type="reset"
                                            @click="resetEmblem"
                                        >
                                            Удалить фото
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span class="form-field__footnote"
                                >Рекомендуемый размер 80х80</span
                            >
                        </div>

                        <div class="form__field photo-add">
                            <p class="form__label">Добавьте баннер</p>
                            <div class="photo-add__box photo-add__box--banner">
                                <div
                                    class="photo-add__img photo-add__img--banner"
                                >
                                    <img v-if="urlBanner" :src="urlBanner" />
                                    <img
                                        v-else
                                        src="@app/assets/banner-stub.png"
                                        alt="Баннер отряда(пусто)"
                                    />
                                </div>

                                <div class="photo-add__input">
                                    <label
                                        class="photo-add__label"
                                        for="upload-banner"
                                        v-show="!urlBanner"
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
                                    <input
                                        type="file"
                                        id="upload-banner"
                                        name="squad-banner"
                                        accept="image/*,image/jpeg"
                                        hidden
                                        @change="selectBanner"
                                    />
                                    <div
                                        class="photo-add__edit-group"
                                        v-show="urlBanner"
                                    >
                                        <label
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
                                </div>
                            </div>
                            <span class="form-field__footnote"
                                >Рекомендуемый размер 1920х768</span
                            >
                        </div>

                        <div class="form-field photo-add">
                            <p class="form__label">Добавьте фотографии</p>
                            <div class="photo-add__container">
                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img
                                            v-if="urlPhotoOne"
                                            :src="urlPhotoOne"
                                        />
                                        <img
                                            v-else
                                            src="@app/assets/photo-stub.png"
                                            alt="Фотография отряда(пусто)"
                                        />
                                    </div>

                                    <div class="photo-add__input">
                                        <label
                                            class="photo-add__label photo-add__label--position"
                                            for="upload-photo-one"
                                            v-show="!urlPhotoOne"
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
                                        <input
                                            type="file"
                                            id="upload-photo-one"
                                            accept="image/*,image/jpeg"
                                            hidden
                                            @change="selectPhotoOne"
                                        />
                                        <div
                                            class="photo-add__edit-group"
                                            v-show="urlPhotoOne"
                                        >
                                            <label
                                                class="photo-add__label-edit"
                                                for="upload-photo-one"
                                            >
                                                <span
                                                    class="photo-add__label-text"
                                                    >Изменить фото</span
                                                >
                                            </label>
                                            <button
                                                class="photo-add__button-clear"
                                                type="reset"
                                                @click="resetPhotoOne"
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img
                                            v-if="urlPhotoTwo"
                                            :src="urlPhotoTwo"
                                        />
                                        <img
                                            v-else
                                            src="@app/assets/photo-stub.png"
                                            alt="Фотография отряда(пусто)"
                                        />
                                    </div>

                                    <div class="photo-add__input">
                                        <label
                                            class="photo-add__label photo-add__label--position"
                                            for="upload-photo-two"
                                            v-show="!urlPhotoTwo"
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
                                        <input
                                            type="file"
                                            id="upload-photo-two"
                                            accept="image/*,image/jpeg"
                                            hidden
                                            @change="selectPhotoTwo"
                                        />
                                        <div
                                            class="photo-add__edit-group"
                                            v-show="urlPhotoTwo"
                                        >
                                            <label
                                                class="photo-add__label-edit"
                                                for="upload-photo-two"
                                            >
                                                <span
                                                    class="photo-add__label-text"
                                                    >Изменить фото</span
                                                >
                                            </label>
                                            <button
                                                class="photo-add__button-clear"
                                                type="reset"
                                                @click="resetPhotoTwo"
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img
                                            v-if="urlPhotoThree"
                                            :src="urlPhotoThree"
                                        />
                                        <img
                                            v-else
                                            src="@app/assets/photo-stub.png"
                                            alt="Фотография отряда(пусто)"
                                        />
                                    </div>

                                    <div class="photo-add__input">
                                        <label
                                            class="photo-add__label photo-add__label--position"
                                            for="upload-photo-three"
                                            v-show="!urlPhotoThree"
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
                                        <input
                                            type="file"
                                            id="upload-photo-three"
                                            accept="image/*,image/jpeg"
                                            hidden
                                            @change="selectPhotoThree"
                                        />
                                        <div
                                            class="photo-add__edit-group"
                                            v-show="urlPhotoThree"
                                        >
                                            <label
                                                class="photo-add__label-edit"
                                                for="upload-photo-three"
                                            >
                                                <span
                                                    class="photo-add__label-text"
                                                    >Изменить фото</span
                                                >
                                            </label>
                                            <button
                                                class="photo-add__button-clear"
                                                type="reset"
                                                @click="resetPhotoThree"
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="photo-add__box">
                                    <div class="photo-add__img">
                                        <img
                                            v-if="urlPhotoFour"
                                            :src="urlPhotoFour"
                                        />
                                        <img
                                            v-else
                                            src="@app/assets/photo-stub.png"
                                            alt="Фотография отряда(пусто)"
                                        />
                                    </div>

                                    <div class="photo-add__input">
                                        <label
                                            class="photo-add__label photo-add__label--position"
                                            for="upload-photo-four"
                                            v-show="!urlPhotoFour"
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
                                        <input
                                            type="file"
                                            id="upload-photo-four"
                                            accept="image/*,image/jpeg"
                                            hidden
                                            @change="selectPhotoFour"
                                        />
                                        <div
                                            class="photo-add__edit-group"
                                            v-show="urlPhotoFour"
                                        >
                                            <label
                                                class="photo-add__label-edit"
                                                for="upload-photo-four"
                                            >
                                                <span
                                                    class="photo-add__label-text"
                                                    >Изменить фото</span
                                                >
                                            </label>
                                            <button
                                                class="photo-add__button-clear"
                                                type="reset"
                                                @click="resetPhotoFour"
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    type="submit"
                    class="form-button"
                    variant="text"
                    label="Создать"
                    size="large"
                ></Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
// import { photos } from '@shared/components/imagescomp';
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

const emit = defineEmits(['update:value', 'changeDetachment', 'selectFile']);

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
    //   media: {
    //     fileEmblem: {
    //       type: String,
    //       default: null,
    //     },
    //     fileBanner: {
    //       type: String,
    //       default: null,
    //     },
    //     filePhotoOne: {
    //       type: String,
    //       default: null,
    //     },
    //     filePhotoTwo: {
    //       type: String,
    //       default: null,
    //     },
    //     filePhotoThree: {
    //       type: String,
    //       default: null,
    //     },
    //     filePhotoFour: {
    //       type: String,
    //       default: null,
    //     },
    //   },
    fileEmblem: {
        // type: String,
        default: null,
    },
});

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

// const v = useVuelidate(rules, {
//     name,
//     area,
//     founding_date,
//     region,
//     educational_institution,
//     commander,
//     social_vk,
//     social_tg,
//     slogan,
//     about,
//     // membersList, //-------------------
// });

// const swal = inject('$swal');

// const UploadData = async () => {
//     submited.value = true;
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

//------------------------------------------------------------------------------------------------

const counterSquad = computed(() => {
    return detachment.value.name.length || 0;
});

const counterSlogan = computed(() => {
    return detachment.value.slogan.length || 0;
});

const counterAbout = computed(() => {
    return detachment.value.about.length || 0;
});

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

const members = ref([]);

const getMembers = async () => {
    await axios
        .get('api/v1/detachments/1/members/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            members.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    getMembers();
});

// const members = ref([
//     {
//         id: 1,
//         user: {
//             first_name: 'Василий',
//             last_name: 'Петров',
//             patronymic_name: 'Иванович',
//         },
//         date_of_birth: '2019-08-24',
//         position: 0,
//         is_trusted: false,
//     },
//     {
//         id: 2,
//         user: {
//             first_name: 'Djhjyt;crb',
//             last_name: 'Lvhhbq',
//             patronymic_name: 'Lvbnhbtdbx',
//         },
//         date_of_birth: '2000-08-01',
//         position: 2,
//         is_trusted: true,
//     },
//     {
//         id: 3,
//         user: {
//             first_name: 'Петр',
//             last_name: 'Сидоров',
//             patronymic_name: 'Иванович',
//         },
//         date_of_birth: '2019-08-24',
//         position: 1,
//         is_trusted: false,
//     },
// ]);

const searchMembers = ref('');

const sortedMembers = computed(() => {
    return members.value.filter((item) => {
        // return item.title
        return item.user.last_name
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

//--Добавление логотипа-----------------------------------------------------------------------------

const fileEmblem = ref(props.fileEmblem);
console.log(fileEmblem);
const urlEmblem = ref(null);

const selectFile = (event) => {
    fileEmblem.value = event.target.files[0];
    console.log(fileEmblem.value);
    urlEmblem.value = URL.createObjectURL(fileEmblem.value);
};

const resetEmblem = () => {
    urlEmblem.value = null;
};
//--Добавление баннера-----------------------------------------------------------------------------
const fileBanner = ref(null);
const urlBanner = ref(null);

const selectBanner = (event) => {
    fileBanner.value = event.target.files[0];
    urlBanner.value = URL.createObjectURL(fileBanner.value);
};

const resetBanner = () => {
    urlBanner.value = null;
};
//--Добавление фото-----------------------------------------------------------------------------
const filePhotoOne = ref(null);
const urlPhotoOne = ref(null);
const selectPhotoOne = (event) => {
    filePhotoOne.value = event.target.files[0];
    urlPhotoOne.value = URL.createObjectURL(filePhotoOne.value);
};
const resetPhotoOne = () => {
    urlPhotoOne.value = null;
};

const filePhotoTwo = ref(null);
const urlPhotoTwo = ref(null);
const selectPhotoTwo = (event) => {
    filePhotoTwo.value = event.target.files[0];
    urlPhotoTwo.value = URL.createObjectURL(filePhotoTwo.value);
};
const resetPhotoTwo = () => {
    urlPhotoTwo.value = null;
};

const filePhotoThree = ref(null);
const urlPhotoThree = ref(null);
const selectPhotoThree = (event) => {
    filePhotoThree.value = event.target.files[0];
    urlPhotoThree.value = URL.createObjectURL(filePhotoThree.value);
};
const resetPhotoThree = () => {
    urlPhotoThree.value = null;
};

const filePhotoFour = ref(null);
const urlPhotoFour = ref(null);
const selectPhotoFour = (event) => {
    filePhotoFour.value = event.target.files[0];
    urlPhotoFour.value = URL.createObjectURL(filePhotoFour.value);
};
const resetPhotoFour = () => {
    urlPhotoFour.value = null;
};
</script>

<style lang="scss" scoped>
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
@shared/components/selects/inputs@shared/components/selects/inputs