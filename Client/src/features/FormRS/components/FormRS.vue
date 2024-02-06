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
                                isError.district_headquarter ||
                                isError.region ||
                                isError.commander
                            "
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
                            <label
                                for="district_headquarter"
                                class="form__label"
                                >Выберите окружной штаб
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                clearable
                                variant="outlined"
                                name="district_headquarter"
                                id="district_headquarter"
                                v-model="headquarter.district_headquarter"
                                address="districts/"
                            ></Select>
                            <p
                                class="form__error"
                                v-if="isError.district_headquarter"
                            >
                                * Это поле не может быть пустым.
                            </p>
                        </div>
                        <div class="form__field">
                            <label for="select-region" class="form__label"
                                >Выберите регион
                                <sup class="valid-red">*</sup>
                            </label>
                            <regionsDropdown
                                open-on-clear
                                id="select-region"
                                name="select_region"
                                placeholder="Например, Алтайский край"
                                v-model="headquarter.region"
                                @update:value="changeValue"
                                address="/regions/"
                            >
                            </regionsDropdown>
                            <p class="form__error" v-if="isError.region">
                                * Это поле не может быть пустым.
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
                        <div class="form__field form__field--commander">
                            <label class="form__label" for="beast"
                                >Командир штаба
                                <sup class="valid-red">*</sup>
                            </label>
                            <!-- здась поменяла -->
                            <Dropdown
                                v-if="!isCommanderLoading"
                                open-on-clear
                                id="beast"
                                name="edit_beast"
                                placeholder="Поиск по ФИО"
                                v-model="headquarter.commander"
                                @update:value="changeValue"
                                address="users/"
                            ></Dropdown>
                            <!-- здась поменяла -->
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
                                * Это поле не может быть пустым.
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
                            <!-- здесь поменяла -->
                            <MembersList
                                :items="sortedMembers"
                                :submited="submited"
                                :is-error-members="isErrorMembers"
                                v-if="members && !isMembersLoading"
                                @update-member="onUpdateMember"
                            ></MembersList>
                            <!-- здесь поменяла -->
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
                    <v-row no-gutters v-if="participants">
                        <v-col cols="4" class="d-flex justify-start">
                            Дополнительная информация
                        </v-col>
                        <p
                            class="form__error form__error--title"
                            v-if="
                                isError.founding_date || isError.conference_date
                            "
                        >
                            Заполните обязательные поля!
                        </p>
                    </v-row>
                    <v-row no-gutters v-else>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                        <p
                            class="form__error form__error--title"
                            v-if="
                                isError.founding_date || isError.conference_date
                            "
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
                        <div class="number_wrap">
                            <div class="form__field form_width">
                                <label for="founding_date" class="form__label"
                                    >Официальная дата (год) появления
                                    студенческих отрядов в регионе
                                    <sup class="valid-red">*</sup>
                                </label>
                                <Input
                                    class="form__input"
                                    type="number"
                                    id="founding_date"
                                    placeholder="1971"
                                    name="founding_date"
                                    v-model:value="headquarter.founding_date"
                                    :minlength="4"
                                    :maxlength="4"
                                />
                                <p
                                    class="form__error form__error--date"
                                    v-if="isError.founding_date"
                                >
                                    * Это поле не может быть пустым.
                                </p>
                            </div>

                            <di v class="form__field form_width">
                                <label for="conference_date" class="form__label"
                                    >Дата учредительной конференции
                                    регионального штаба
                                    <sup class="valid-red">*</sup>
                                </label>
                                <Input
                                    class="form__input"
                                    type="date"
                                    id="conference_date"
                                    name="conference_date"
                                    v-model:value="headquarter.conference_date"
                                />
                                <p
                                    class="form__error form__error--date"
                                    v-if="isError.conference_date"
                                >
                                    * Это поле не может быть пустым.
                                </p>
                            </di>
                            <div class="form__field form_width">
                                <label for="registry_number" class="form__label"
                                    >Регистрационный номер в реестре молодежных
                                    и детских общественных объединений,
                                    пользующихся государственной поддержкой
                                </label>
                                <Input
                                    class="form__input"
                                    type="number"
                                    placeholder="б/н"
                                    id="registry_number"
                                    name="registry_number"
                                    v-model:value="headquarter.registry_number"
                                />
                            </div>
                            <div class="form__field form_width">
                                <label for="registry_date" class="form__label"
                                    >Дата регистрации в реестре молодежных и
                                    детских общественных объединений,
                                    пользующихся государственной поддержкой
                                </label>
                                <Input
                                    class="form__input"
                                    type="date"
                                    id="registry_date"
                                    name="registry_date"
                                    v-model:value="headquarter.registry_date"
                                />
                            </div>
                        </div>
                        <div class="form__field">
                            <label
                                for="name_for_certificates"
                                class="form__label"
                                >Наименование регионального отделения в
                                Именительном падеже (для справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="name_for_certificates"
                                placeholder="Например, Новосибирское региональное отделение"
                                name="name_for_certificates"
                                v-model:value="
                                    headquarter.name_for_certificates
                                "
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterNameForCertificates }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="case_name" class="form__label"
                                >Наименование регионального отделения в
                                Предложном падеже (для справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="case_name"
                                placeholder="Например, Новосибирское региональное отделение"
                                name="case_name"
                                v-model:value="headquarter.case_name"
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterCaseName }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="legal_address" class="form__label"
                                >Юридический адрес регионального отделения (для
                                справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="legal_address"
                                placeholder="Например, 630005, г. Новосибирск, ул. Некрасова, д. 48, тел/факс (383)-210-38-71, электронная почта studnso@mail.ru."
                                name="legal_address"
                                v-model:value="headquarter.legal_address"
                                :maxlength="200"
                            />
                            <div class="form__counter">
                                {{ counterLegalAddress }} / 200
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="rs-requisites" class="form__label"
                                >Реквизиты регионального отделения (для
                                справок)</label
                            >
                            <TextareaAbout
                                :rows="2"
                                maxlength="500"
                                class="form__textarea"
                                id="requisites"
                                placeholder="Например, Расчетный счет 40703810695240700029 в филиале Сибирский ПАО Банк «ФК Открытие» г. Новосибирск, к/с 30101810250040000867, БИК 045004867, ИНН/КПП 5406970383/540601001, ОГРН 1115400003201."
                                name="requisites"
                                v-model:value="headquarter.requisites"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterRequisites }} / 500
                            </div>
                        </div>

                        <div class="form__field">
                            <label for="slogan" class="form__label"
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
                                    />
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
                                    />
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
import { ref, computed } from 'vue';
import { Input, TextareaAbout } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { Select, Dropdown, regionsDropdown } from '@shared/components/selects';
import { MembersList } from '@features/Members/components';
import { Icon } from '@iconify/vue';
import { HTTP } from '@app/http';
// import { useRoute } from 'vue-router';

// import {
//     helpers,
//     minLength,
//     required,
//     maxLength,
//     numeric,
//     email,
//     sameAs,
// } from '@vuelidate/validators';

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
    // здесь поменяла
    isCommanderLoading: {
        type: Boolean,
        default: false,
    },
    isMembersLoading: {
        type: Boolean,
        default: false,
    },
});

const headquarter = ref(props.headquarter);

//----------------------------------------------------------------------------------------------------------
const counterName = computed(() => {
    return headquarter.value.name.length || 0;
});
const counterNameForCertificates = computed(() => {
    return headquarter.value?.name_for_certificates?.length || 0;
});
const counterCaseName = computed(() => {
    return headquarter.value?.case_name?.length || 0;
});
const counterLegalAddress = computed(() => {
    return headquarter.value?.legal_address?.length || 0;
});
const counterRequisites = computed(() => {
    return headquarter.value?.requisites?.length || 0;
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

//--------------------------------------------------------------

// const route = useRoute();
// let id = route.params.id;

// const members = ref(props.members);
const searchMembers = ref('');

const sortedMembers = computed(() => {
    return props.members.filter((item) => {
        return item.user.last_name
            .toUpperCase()
            .includes(searchMembers.value.toUpperCase());
    });
});

const onUpdateMember = (event, id) => {
    emit('updateMember', event, id);
};

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};

//--Добавление логотипа-----------------------------------------------------------------------------

const fileEmblem = ref(props.fileEmblem);
const urlEmblem = ref(null);

const selectEmblem = (event) => {
    fileEmblem.value = event.target.files[0];
    headquarter.value.emblem = null;
    urlEmblem.value = URL.createObjectURL(fileEmblem.value);
    emit('selectEmblem', fileEmblem.value);
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
    headquarter.value.banner = null;
    urlBanner.value = URL.createObjectURL(fileBanner.value);
    emit('selectBanner', fileBanner.value);
};

const deleteBanner = () => {
    headquarter.value.banner = null;
    urlBanner.value = null;
    fileBanner.value = null;
    emit('deleteBanner', fileBanner.value);
};
</script>

<style lang="scss" scoped>
.form-button {
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

.p-dropdown-items-wrapper {
    // min-height: 400px;

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

.number_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 1070px) {
        flex-direction: column;
    }
}

.form_width {
    width: 46%;

    @media (max-width: 1070px) {
        width: 100%;
    }
}

.form_width .form-input {
    margin-top: auto;
    margin-bottom: 32px;
}

.form__field.form_width {
    margin-bottom: 0;
}
</style>
