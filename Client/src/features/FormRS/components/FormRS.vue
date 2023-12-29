<template>
    <form class="form" @submit.prevent="UploadData">
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Основная информация
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
                            <label for="name-hq"
                                >Наименование штаба
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="name-hq"
                                class="form__input"
                                placeholder="Например, Штаб СО Алтайского государственного медицинского университета (Штаб СО АГМУ)"
                                name="name_hq"
                                v-model:value="name"
                                :maxlength="100"
                                :clearable="true"
                            />
                            <div class="form__counter">
                                {{ counterName }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="district_headquarter"
                                >Выберите окружной штаб
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                clearable
                                variant="outlined"
                                name="district_headquarter"
                                id="district_headquarter"
                                v-model="district_headquarter"
                                address="api/v1/districts/"
                            ></Select>
                        </div>
                        <div class="form__field">
                            <label for="region"
                                >Выберите регион
                                <sup class="valid-red">*</sup>
                            </label>
                            <Select
                                clearable
                                variant="outlined"
                                name="region"
                                id="region"
                                v-model="region"
                                address="api/v1/regions/"
                            ></Select>
                        </div>

                        <div class="form__field">
                            <label for="city">Город</label>
                            <Input
                                class="form__input"
                                id="city"
                                placeholder="Например, Барнаул"
                                name="edit_city"
                                v-model:value="city"
                            />
                        </div>

                        <div class="form__field">
                            <label for="beast"
                                >Командир штаба
                                <sup class="valid-red">*</sup>
                            </label>

                            <!-- <Dropdown
                                :options="leaders"
                                id="commander"
                                name="commander"
                                v-model="detachment.commander"
                                :filterPlaceholder="'Поиск по ФИО'"
                                :resetFilterOnHide="true"
                                @update:value="changeValue"
                            ></Dropdown> -->

                            <Select
                                id="commander"
                                name="commander"
                                placeholder="Поиск по ФИО"
                                v-model="commander"
                                @update:value="changeValue"
                                address="api/v1/rsousers/"
                            ></Select>
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
                                v-model:value="social_vk"
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
                                v-model:value="social_tg"
                            />
                        </div>
                        <div class="form__field" v-if="editDistrict">
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
                                :submited="submited"
                                @updateMember="onUpdateMember"
                            ></MembersList>
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
                        <div class="test">
                            <div class="form__field form_width">
                                <label for="founding_date"
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
                                    v-model:value="founding_date"
                                    :minlength="4"
                                    :maxlength="4"
                                />
                            </div>

                            <div class="form__field form_width">
                                <label for="conference_date"
                                    >Дата учредительной конференции
                                    регионального штаба
                                    <sup class="valid-red">*</sup>
                                </label>
                                <Input
                                    class="form__input"
                                    type="date"
                                    id="conference_date"
                                    name="conference_date"
                                    v-model:value="conference_date"
                                />
                            </div>
                            <div class="form__field form_width">
                                <label for="registry_number"
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
                                    v-model:value="registry_number"
                                />
                            </div>
                            <div class="form__field form_width">
                                <label for="registry_date"
                                    >Дата регистрации в реестре молодежных и
                                    детских общественных объединений,
                                    пользующихся государственной поддержкой
                                </label>
                                <Input
                                    class="form__input"
                                    type="date"
                                    id="registry_date"
                                    name="registry_date"
                                    v-model:value="registry_date"
                                />
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="name_for_certificates"
                                >Наименование регионального отделения в
                                Именительном падеже (для справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="name_for_certificates"
                                placeholder="Например, Новосибирское региональное отделение"
                                name="name_for_certificates"
                                v-model:value="name_for_certificates"
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterNameForCertificates }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="case_name"
                                >Наименование регионального отделения в
                                Предложном падеже (для справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="case_name"
                                placeholder="Например, Новосибирское региональное отделение"
                                name="case_name"
                                v-model:value="case_name"
                                :maxlength="100"
                            />
                            <div class="form__counter">
                                {{ counterCaseName }} / 100
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="legal_address"
                                >Юридический адрес регионального отделения (для
                                справок)
                            </label>
                            <Input
                                class="form__input"
                                type="text"
                                id="legal_address"
                                placeholder="Например, 630005, г. Новосибирск, ул. Некрасова, д. 48, тел/факс (383)-210-38-71, электронная почта studnso@mail.ru."
                                name="legal_address"
                                v-model:value="legal_address"
                                :maxlength="200"
                            />
                            <div class="form__counter">
                                {{ counterLegalAddress }} / 200
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="rs-requisites"
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
                                v-model:value="requisites"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterRequisites }} / 500
                            </div>
                        </div>

                        <div class="form__field">
                            <label for="hq-slogan">Девиз штаба</label>
                            <Input
                                class="form__input"
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
                            <label for="about-hq">О штабе</label>
                            <TextareaAbout
                                :rows="6"
                                maxlength="500"
                                class="form__textarea"
                                id="about-hq"
                                placeholder="Описание регионального штаба"
                                name="about_hq"
                                v-model:value="about"
                            ></TextareaAbout>
                            <div class="form__counter">
                                {{ counterAbout }} / 1000
                            </div>
                        </div>
                        <div class="form__field">
                            <label for="upload-logo">Добавьте логотип</label>
                            <div class="user-metric__avatar-wrapper">
                                <div class="user-metric__avatar">
                                    <!-- Аватар пользователя  -->

                                    <img
                                        v-if="urlEmblem"
                                        :src="urlEmblem"
                                        alt="avatarka"
                                    />
                                    <img
                                        v-else
                                        id="profile-pic"
                                        src="@app/assets/user-avatar.png"
                                        alt="Аватарка(пусто)"
                                    />
                                </div>
                                <!-- Иконки редактирования аватар -->
                                <v-menu min-width="200px" rounded>
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            class="user-metric__avatar-add"
                                            icon
                                            v-bind="props"
                                        >
                                            <v-avatar size="large">
                                                <v-icon
                                                    icon="mdi-plus"
                                                ></v-icon>
                                            </v-avatar>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-text>
                                            <v-row justify="center">
                                                <v-dialog
                                                    v-model="dialog"
                                                    width="1024"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            props,
                                                        }"
                                                    >
                                                        <v-btn
                                                            rounded
                                                            variant="text"
                                                            v-bind="props"
                                                        >
                                                            Добавить логотип
                                                        </v-btn>
                                                    </template>
                                                    <v-card
                                                        class="uploadEmblem_wrap p-dropdown-items-wrapper"
                                                    >
                                                        <v-card-title>
                                                            <span
                                                                class="text-h5"
                                                                >Загрузите ваше
                                                                фото</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-file-input
                                                                        @change="
                                                                            selectFile
                                                                        "
                                                                        show-size
                                                                        prepend-icon="mdi-camera"
                                                                        counter
                                                                    ></v-file-input>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-card
                                                                        class="mt-5 mx-auto"
                                                                    >
                                                                        <img
                                                                            class="uploadEmblem_img"
                                                                            v-if="
                                                                                urlEmblem
                                                                            "
                                                                            :src="
                                                                                urlEmblem
                                                                            "
                                                                        />
                                                                    </v-card>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>
                                                        <v-card-actions
                                                            class="uploadBtn"
                                                        >
                                                            <v-btn
                                                                color="blue-darken-1"
                                                                variant="text"
                                                                @click="
                                                                    dialog = false;
                                                                    urlEmblem =
                                                                        null;
                                                                "
                                                            >
                                                                Закрыть
                                                            </v-btn>
                                                            <v-btn
                                                                :disabled="
                                                                    !fileEmblem
                                                                "
                                                                color="blue-darken-1"
                                                                variant="text"
                                                                type="submit"
                                                                @click="
                                                                    uploadAvatar()
                                                                "
                                                            >
                                                                Загрузить
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </div>
                            <span class="form__footnote"
                                >Рекомендуемый размер 80х80</span
                            >
                        </div>

                        <div class="form__field">
                            <label for="upload-banner">Добавьте баннер</label>
                            <div class="user-metric__top">
                                <div class="user-metric__top-img-wrapper">
                                    <!-- Заглушка Банер -->
                                    <img
                                        v-if="urlBanner"
                                        :src="urlBanner"
                                        alt="Баннер личной страницы"
                                    />

                                    <img
                                        v-else
                                        src="@/app/assets/user-banner.jpg"
                                        alt="Баннер личной страницы(пусто)"
                                    />
                                </div>
                                <v-menu min-width="200px" rounded>
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            class="user-metric__avatar-add"
                                            icon
                                            v-bind="props"
                                        >
                                            <v-avatar size="large">
                                                <v-icon
                                                    icon="mdi-plus"
                                                ></v-icon>
                                            </v-avatar>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-text>
                                            <v-row justify="center">
                                                <v-dialog
                                                    v-model="dialog"
                                                    width="1024"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            props,
                                                        }"
                                                    >
                                                        <v-btn
                                                            rounded
                                                            variant="text"
                                                            v-bind="props"
                                                        >
                                                            Добавить баннер
                                                        </v-btn>
                                                    </template>
                                                    <v-card
                                                        class="uploadEmblem_wrap p-dropdown-items-wrapper"
                                                    >
                                                        <v-card-title>
                                                            <span
                                                                class="text-h5"
                                                                >Загрузите ваш
                                                                баннер</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-file-input
                                                                        @change="
                                                                            selectBanner
                                                                        "
                                                                        show-size
                                                                        prepend-icon="mdi-camera"
                                                                        counter
                                                                    ></v-file-input>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-card
                                                                        class="mt-5 mx-auto"
                                                                    >
                                                                        <img
                                                                            v-if="
                                                                                urlBanner
                                                                            "
                                                                            :src="
                                                                                urlBanner
                                                                            "
                                                                        />
                                                                    </v-card>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="blue-darken-1"
                                                                variant="text"
                                                                @click="
                                                                    dialog = false;
                                                                    urlBanner =
                                                                        null;
                                                                "
                                                            >
                                                                Закрыть
                                                            </v-btn>
                                                            <v-btn
                                                                :disabled="
                                                                    !fileBanner
                                                                "
                                                                color="blue-darken-1"
                                                                variant="text"
                                                                type="submit"
                                                                @click="
                                                                    uploadBanner()
                                                                "
                                                            >
                                                                Загрузить
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
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

const emit = defineEmits(['update:value']);
const router = useRouter();

// const props = defineProps({
//     participants: {
//         type: Boolean,
//         default: false,
//     },
//     unit: {
//         type: Object,
//         default: () => ({}),
//     },
// });

const dialog = ref(false);
const urlEmblem = ref(null);
const urlBanner = ref(null);

const submited = ref(false);

const name = ref('');
const district_headquarter = ref(null);
const region = ref(null);
const founding_date = ref('');
const city = ref('');
const commander = ref(null);
const social_vk = ref('');
const social_tg = ref('');
const conference_date = ref('');
const registry_number = ref('');
const registry_date = ref('');
const name_for_certificates = ref('');
const case_name = ref('');
const legal_address = ref('');
const requisites = ref('');
const slogan = ref('');
const about = ref('');
const fileEmblem = ref(null);
const fileBanner = ref(null);

const selectFile = (event) => {
    fileEmblem.value = event.target.files[0];
    urlEmblem.value = URL.createObjectURL(fileEmblem.value);
};

const selectBanner = (event) => {
    fileBanner.value = event.target.files[0];
    urlBanner.value = URL.createObjectURL(fileBanner.value);
};

const uploadAvatar = () => {
    dialog.value = false;
};

const uploadBanner = () => {
    dialog.value = false;
};

const swal = inject('$swal');

const UploadData = async () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('district_headquarter', district_headquarter.value);
    formData.append('region', region.value);
    formData.append('founding_date', founding_date.value);
    formData.append('city', city.value);
    formData.append('commander', commander.value);
    formData.append('social_vk', social_vk.value);
    formData.append('social_tg', social_tg.value);
    formData.append('conference_date', conference_date.value);
    formData.append('registry_number', registry_number.value);
    formData.append('registry_date', registry_date.value);
    formData.append('name_for_certificates', name_for_certificates.value);
    formData.append('case_name', case_name.value);
    formData.append('legal_address', legal_address.value);
    formData.append('requisites', requisites.value);
    formData.append('slogan', slogan.value);
    formData.append('about', about.value);
    formData.append('emblem', fileEmblem.value);
    formData.append('banner', fileBanner.value);
    await axios
        .post('api/v1/regionals/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            // formData = response.data;
            console.log(response.data);
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/RegionalHeadquarters');
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

//----------------------------------------------------------------------------------------------------------
const counterName = computed(() => {
    return name.value.length || 0;
});
const counterNameForCertificates = computed(() => {
    return name_for_certificates.value.length || 0;
});
const counterCaseName = computed(() => {
    return case_name.value.length || 0;
});
const counterLegalAddress = computed(() => {
    return legal_address.value.length || 0;
});
const counterRequisites = computed(() => {
    return requisites.value.length || 0;
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

const searchMembers = ref('');

// ПОТОМ НАДО ВЕРНУТЬ!!!!!!!!!!!!!!!!!!!!!
// const sortedMembers = computed(() => {
//     return members.value.filter(item => {
//         return item.title
//             .toUpperCase()
//             .includes(searchMembers.value.toUpperCase());
//     });
// });

const onUpdateMember = (event, id) => {
    const targetMember = members.value.find((member) => member.id === id);

    const firstkey = Object.keys(event)[0];
    targetMember[firstkey] = event[firstkey];
};

const changeValue = (event) => {
    console.log(event);
    emit('update:value', event);
};

/* --------------------------------------------------------- Редактирование Штаба ------------------------------------------------------------ */

/* Функция получения и вставки в инпут данных с сервера */

// const districtid = route.params.id; /* Получим из URL параметра */
// const editDistrict = route.params.editDistrict;
// if (editDistrict) {
//     editingProfileDistrict();
// }
// const editingProfileDistrict = () => {
//     const getDataOfDistrict = async () => {
//         await HTTP.get(`/regionals/${districtid}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         })
//             .then((response) => {
//                 name = response.data.name;
//                 // переменовать под себя
//                 /* city = ref(props.unit.city);
// regional = ref(props.unit.regional);
// beast = ref(props.unit.beast);
// vk = ref(props.unit.vk);
// te = ref(props.unit.te);
// slogan = ref(props.unit.slogan);
// about = ref(props.unit.about);
// avatar = ref(props.unit.avatar);
// banner = ref(props.unit.banner);
// regNameI = ref(props.unit.regNameI);
// regNameP = ref(props.unit.regNameP);
// address = ref(props.unit.address);
// requisites = ref(props.unit.requisites);
// ofYear = ref(props.unit.ofYear);
// confDate = ref(props.unit.confDate);
// regNumber = ref(props.unit.regNumber);
// registryDate = ref(props.unit.registryDate); */
//             }) /* Получаем данные с сервера и обновляем инпуты*/
//             .catch(function (error) {
//                 console.log('failed ' + error);
//             });
//     };
// };

// /* Ф-ия отправки изменных данных на сервер */

// const sendEditingData = async () => {
//     try {
//         const formData = new FormData();
//         formData.append('name', name.value);
//         formData.append('founding_date', founding_date.value);
//         formData.append('city', city.value);
//         formData.append('commander', commander.value);
//         formData.append('social_vk', social_vk.value);
//         formData.append('social_tg', social_tg.value);
//         formData.append('slogan', slogan.value);
//         formData.append('about', about.value);
//         formData.append('emblem', fileEmblem.value);
//         formData.append('banner', fileBanner.value);

//         await HTTP.patch(
//             `/regionals/${districtid}`,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Token ' + localStorage.getItem('Token'),
//                 },
//             },
//             formData,
//         );
//     } catch (err) {
//         throw err;
//     }
// };
</script>

<style lang="scss" scoped>
// $expansion-panel-active-title-min-height 64px
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

.test {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.form_width {
    width: 46%;
}
</style>
