<template>
    <div class="rso-question">
        <div class="rso-question__title">Являетесь членом РСО?</div>
        <div class="checkbox" v-for="answer in answers" :key="answer.id">
            <RadioButton
                :value="answer.name"
                :label="answer.name"
                :id="answer.id"
                :checked="answer.checked"
                name="answer"
                v-model:checkedValue="selectedAnswer"
            />
        </div>
    </div>

    <form
        class="accordion-form"
        enctype="multipart/form-data"
        @submit.prevent="addData"
    >
        <p class="accordion-title">
            Для вступления в РСО внесите ниже персональные данные
        </p>

        <!-- <p>{{ selectedAnswer }}</p>
        <p>{{ selectedPass }}</p>
        <p>{{ selectedAnswer == 'Нет' && selectedPass == 'Нет' }}</p> -->
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
                <v-expansion-panel-text>
                    <div class="data-form">
                        <div class="form-field">
                            <label for="surname"
                                >Фамилия <span class="valid-red">*</span></label
                            >
                            <Input
                                class="input-big"
                                clearable
                                placeholder="Введите фамилию"
                                name="surname"
                                v-model:value="user.last_name"
                            />
                        </div>
                        <div class="form-field">
                            <label for="surname-lat">Фамилия(Латиницей) </label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="familia"
                                name="surname-lat"
                                v-model:value="user.last_name"
                            />
                        </div>
                        <div class="form-field">
                            <label for="name"
                                >Имя <span class="valid-red">*</span></label
                            >
                            <Input
                                class="input-big"
                                clearable
                                placeholder="Введите имя"
                                name="name"
                                v-model:value="user.first_name"
                            />
                        </div>
                        <div class="form-field">
                            <label for="name-lat">Имя(Латиницей)</label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="name"
                                name="name-lat"
                                v-model:value="user.first_name"
                            />
                        </div>
                        <div class="form-field">
                            <label for="patronomyc">Отчество</label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="Отчество"
                                name="patronomyc"
                                v-model:value="user.patronymic_name"
                            />
                        </div>
                        <div class="form-field">
                            <label for="patronomyc-lat"
                                >Отчество(Латиницей)</label
                            >
                            <Input
                                class="input-big"
                                clearable
                                placeholder="patronomyc"
                                name="patronomyc-lat"
                                v-model:value="patronomycLat"
                            />
                        </div>
                        <div class="checkbox-wrapper">
                            <p class="checkbox-wrapper__title">
                                Пол<span class="valid-red">*</span>
                            </p>
                            <div
                                class="checkbox"
                                v-for="sex in gender"
                                :key="sex.id"
                            >
                                <RadioButton
                                    :value="sex.name"
                                    :label="sex.name"
                                    :id="sex.id"
                                    :checked="sex.checked"
                                    name="sex"
                                    v-model:checkedValue="selectedSex"
                                />
                            </div>
                            {{ user.gender }}
                        </div>

                        <div class="form-field">
                            <label for="date_of_birth"
                                >Дата рождения<span class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                type="date"
                                name="date_of_birth"
                                class="input-small"
                                v-model:value="user.date_of_birth"
                            />
                        </div>
                    </div>
                    <div class="parents-wrapper" v-if="!user.is_adult">
                        <p class="parents-wrapper__title">
                            Законный представитель несовершенолетнего
                        </p>
                        <div class="parents">
                            <div class="parents-about">
                                <div class="form-field">
                                    <label for="surname-parent"
                                        >Фамилия<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="surname-parent"
                                        class="input-big"
                                        placeholder="Введите фамилию"
                                        v-model:value="
                                            parentData.parent_last_name
                                        "
                                    />
                                </div>
                                <div class="form-field">
                                    <label for=""
                                        >Кем является<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Select
                                        class="input-small"
                                        variant="outlined"
                                        clearable
                                        v-model="parentData.relationship"
                                        :names="parents"
                                    ></Select>
                                </div>

                                <div class="form-field">
                                    <label for="patronomyc-parent"
                                        >Отчество</label
                                    >
                                    <Input
                                        class="input-big"
                                        name="patronomyc-parent"
                                        placeholder="Введите Отчество"
                                        v-model:value="
                                            parentData.parent_patronymic_name
                                        "
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="date-parent"
                                        >Дата рождения<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="date"
                                        name="date-parent"
                                        class="input-small"
                                        v-model:value="
                                            parentData.parent_date_of_birth
                                        "
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="name-parent"
                                        >Имя<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="name-parent"
                                        class="input-big"
                                        placeholder="Введите имя"
                                        v-model:value="
                                            parentData.parent_first_name
                                        "
                                    />
                                </div>

                                <div class="form-field">
                                    <label for="phone-parent"
                                        >Телефон<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="tel"
                                        vmaska
                                        maska="+7 ### ###-##-##"
                                        name="phone-parent"
                                        class="input-small phone"
                                        placeholder="+7(__) __ __ _"
                                        v-model:value="
                                            parentData.parent_phone_number
                                        "
                                    />
                                </div>
                            </div>
                            <div class="how">
                                <div
                                    class="checkbox passport"
                                    id="checkbox-parent-pass"
                                >
                                    <p class="checkbox-title">
                                        Паспорт гражданина РФ<span
                                            class="valid-red"
                                            >*</span
                                        >
                                    </p>

                                    <div
                                        class="checkbox"
                                        v-for="passP in passportParent"
                                        :key="passP.id"
                                    >
                                        <RadioButton
                                            :value="passP.name"
                                            :label="passP.name"
                                            :id="passP.id"
                                            :checked="passP.checked"
                                            name="passParent"
                                            v-model:checkedValue="
                                                selectedPassParent
                                            "
                                        />
                                        <!-- {{ selectedPassParent }} -->
                                    </div>
                                </div>
                                <div
                                    class="addres"
                                    id="pass-no-addr"
                                    v-if="selectedPassParent == 'Да'"
                                >
                                    Адрес постоянной регистрации
                                </div>
                            </div>

                            <div
                                class="izm"
                                id="passport-parent-yes"
                                v-if="selectedPassParent == 'Да'"
                            >
                                <div class="form-field" id="pass-no-pass-id">
                                    <label for="passInput"
                                        >Номер и серия<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="passInput"
                                        class="input-small"
                                        vmaska
                                        maska="####-######"
                                        placeholder="__ __ ____"
                                        v-model:value="
                                            parentData.passport_number
                                        "
                                    />
                                </div>

                                <div class="form-field" id="pass-no-reg">
                                    <label for=""
                                        >Регион<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Select
                                        class="input-big"
                                        variant="outlined"
                                        clearable
                                        v-model="parentData.region"
                                        address="api/v1/regions/"
                                    ></Select>
                                </div>

                                <div class="form-field" id="pass-no-date">
                                    <label for="pass-date-parent"
                                        >Дата выдачи<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="date"
                                        name="pass-date-parent"
                                        class="input-small"
                                        v-model:value="parentData.passport_date"
                                    />
                                </div>

                                <div class="form-field" id="pass-no-locality">
                                    <label for="locality-parent"
                                        >Населенный пункт<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="locality-parent"
                                        class="input-big"
                                        placeholder="Москва"
                                        v-model:value="parentData.city"
                                    />
                                </div>

                                <div class="form-field" id="pass-no-pass">
                                    <label for="pass-id-parent"
                                        >Кем выдан<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="pass-id-parent"
                                        class="input-big"
                                        placeholder="Название организации"
                                        v-model:value="
                                            parentData.passport_authority
                                        "
                                    />
                                </div>

                                <div class="form-field" id="pass-no-street">
                                    <label for="addres-parent"
                                        >Улица, дом, квартира<span
                                            class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        name="addres-parent"
                                        class="input-big"
                                        placeholder="Москва"
                                        v-model:value="parentData.address"
                                    />
                                </div>
                            </div>
                            <div
                                id="no-passport"
                                class="form-data izm"
                                v-else="selectedPassParent == 'Нет'"
                            >
                                <div class="form-field one">
                                    <label for="pass-num"
                                        >Документ удостоверяющий личность
                                        <span class="valid-red">*</span></label
                                    >
                                    <Input
                                        type="text"
                                        class="input-full"
                                        placeholder="документ"
                                        v-model:value="foreignDocParent"
                                    />
                                </div>

                                <div class="form-field">
                                    <label for="pass-date"
                                        >Дата выдачи<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="date"
                                        name="pass-date"
                                        class="input-small"
                                        v-model:value="foreignDocDateParent"
                                    />
                                </div>

                                <div class="form-field">
                                    <label for="pass-id">серия номер</label>
                                    <Input
                                        type="text"
                                        id="pass-id"
                                        class="input-small pass-masked"
                                        placeholder="__ ___ ____"
                                        v-model:value="foreignNumberDocParent"
                                        vmaska
                                        maska="####-######"
                                    />
                                </div>
                                <div class="form-field one">
                                    <label for="org-id"
                                        >Кем выдан<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="text"
                                        id="org-id"
                                        class="input-full"
                                        placeholder="оуфмс по моковской обл"
                                        v-model:value="foreignOrgDocParent"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="work-book-foreign"
                                        >Трудовая книжка
                                    </label>
                                    <Input
                                        type="text"
                                        id="work-book-foreign"
                                        class="input-big mask-workbook"
                                        placeholder="AA 999999999"
                                        v-model:value="foreignWorkBookParent"
                                        vmaska
                                        maska="AA #########"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="INN-id-foreign">ИНН</label>
                                    <Input
                                        type="text"
                                        id="INN-id-foreign"
                                        class="input-big mask-inn"
                                        placeholder="AA 999999999"
                                        v-model:value="foreignINNParent"
                                        vmaska
                                        maska="AA #########"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="snils-id-foreign"
                                        >Номер СНИЛС</label
                                    >
                                    <Input
                                        type="text"
                                        id="snils-id-foreign"
                                        class="input-big mask-snils"
                                        placeholder="AA 999999999"
                                        v-model:value="foreignSNILSParent"
                                        vmaska
                                        maska="AA #########"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="btn"
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
                            Адрес и контакты
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
                <v-expansion-panel-text>
                    <div class="data-form none">
                        <p class="accordion-block-title">Контакты</p>
                        <p class="accordion-block-title">
                            Адрес постоянной регистрации
                        </p>
                        <div class="form-field">
                            <label for="phone-contact"
                                >Телефон<span class="valid-red">*</span></label
                            >
                            <Input
                                type="tel"
                                name="phone-contact"
                                class="input-small phone"
                                placeholder="+7(__) __ __ _"
                                v-model:value="user.phone_number"
                            />
                        </div>
                        <div class="form-field">
                            <label for=""
                                >Регион<span class="valid-red">*</span></label
                            >
                            <Select
                                variant="outlined"
                                clearable
                                v-model="regionData.reg_region_id"
                                placeholder="Например, Карачаево-Черкесское региональное отделение"
                                address="api/v1/regions/"
                            ></Select>
                        </div>
                        <div class="form-field">
                            <label for="email-contact"
                                >Электронная почта<span class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                type="email"
                                name="email-сontact"
                                class="input-big mask-email"
                                placeholder="mail@mail.com"
                                v-model:value="user.email"
                            />
                        </div>
                        <div class="form-field">
                            <label for="locality-contact"
                                >Населенный пункт<span class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                type="text"
                                name="locality-contact"
                                class="input-big"
                                placeholder="Москва"
                                v-model:value="regionData.reg_town"
                            />
                        </div>
                        <div class="scoial-networks">
                            <div class="add">
                                <div class="form-field">
                                    <label for="socials">Ссылка на ВК</label>
                                    <Input
                                        name="socials"
                                        class="input-big mask-vk"
                                        placeholder="https://vk.com/danya_porg"
                                        v-model:value="socialsVk"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="socials"
                                        >Ссылка на Телеграм</label
                                    >
                                    <Input
                                        name="socials"
                                        class="input-big mask-tg"
                                        placeholder="https://t.me/allenom"
                                        v-model:value="socialsTg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="addres-contact"
                                >Улица, дом, квартира<span class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                type="text"
                                name="addres-contact"
                                class="input-big"
                                placeholder="ул. Комсомольская, д. 42, кв. 56"
                                v-model:value="regionData.reg_house"
                            />
                        </div>
                        <div class="checkbox addr" id="checkbox">
                            <p class="checkbox-title">
                                Адрес фактического проживания совпадает с
                                адресом постоянной регистрации<span
                                    class="valid-red"
                                    >*</span
                                >
                            </p>

                            <div
                                class="checkbox"
                                v-for="addr in address"
                                :key="addr.id"
                            >
                                <RadioButton
                                    :value="addr.name"
                                    :label="addr.name"
                                    :id="addr.id"
                                    :checked="addr.checked"
                                    name="address"
                                    v-model:checkedValue="selectedAddress"
                                />
                            </div>
                        </div>

                        <div
                            class="addr-fact__wrapper"
                            id="addr-fact"
                            v-if="selectedAddress === 'Нет'"
                        >
                            <p class="accordion-block-title small">
                                Адрес фактического проживания
                            </p>
                            <div class="form-field">
                                <label for="">Регион</label>
                                <Select
                                    variant="outlined"
                                    clearable
                                    v-model="regionFact"
                                    address="api/v1/regions/"
                                ></Select>
                            </div>
                            <div class="form-field">
                                <label for="locality-fact"
                                    >Населенный пункт</label
                                >
                                <Input
                                    name="locality-fact"
                                    class="input-big"
                                    placeholder="Москва"
                                    v-model:value="localityFact"
                                />
                            </div>
                            <div class="form-field">
                                <label for="addres-fact"
                                    >Улица, дом, квартира</label
                                >
                                <Input
                                    type="text"
                                    name="addres-fact"
                                    class="input-big"
                                    placeholder="ул. Комсомольская, д. 42, кв. 56"
                                    v-model:value="addresFact"
                                />
                            </div>
                        </div>
                    </div>
                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            @click="openPanelOne"
                            size="large"
                        ></Button>
                        <Button
                            type="button"
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
                            Документы (паспорт, СНИЛС, ИНН, сведения о трудовой
                            деятельности, документ воинского учета)
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
                    <div class="data-form docs">
                        <div class="checkbox one">
                            <p class="checkbox-title">
                                Паспорт гражданина РФ<span class="valid-red"
                                    >*</span
                                >
                            </p>
                            <div
                                class="checkbox"
                                v-for="pas in passport"
                                :key="pas.id"
                            >
                                <RadioButton
                                    :value="pas.name"
                                    :label="pas.name"
                                    :id="pas.id"
                                    :checked="pas.checked"
                                    name="passport"
                                    v-model:checkedValue="selectedPass"
                                />
                            </div>
                        </div>
                        <div
                            id="yes-passport"
                            class="form-data izm"
                            v-if="selectedPass === 'Да'"
                        >
                            <div class="form-field">
                                <label for="pass-num"
                                    >Номер и серия<span class="valid-red"
                                        >*</span
                                    ></label
                                >
                                <Input
                                    name="pass-num "
                                    type="text"
                                    class="input-big"
                                    placeholder="__ __ ____"
                                    v-model:value="documentsData.pass_ser_num"
                                />
                            </div>

                            <div class="form-field">
                                <label for="pass-date"
                                    >Дата выдачи<span class="valid-red"
                                        >*</span
                                    ></label
                                >
                                <Input
                                    type="date"
                                    name="pass_date"
                                    class="input-small"
                                    v-model:value="documentsData.pass_date"
                                />
                            </div>

                            <div class="form-field one">
                                <label for="pass-id">Кем выдан</label>
                                <Input
                                    name="pass-id"
                                    type="text"
                                    class="input-full"
                                    placeholder="Название организации"
                                    v-model:value="documentsData.pass_whom"
                                />
                            </div>
                            <div class="form-field">
                                <label for="SNILS-id"
                                    >Номер СНИЛС<span class="valid-red"
                                        >*</span
                                    ></label
                                >
                                <Input
                                    name="SNILS-d"
                                    type="text"
                                    class="input-big mask-snils"
                                    placeholder="AA 999999999"
                                    v-model:value="documentsData.snils"
                                />
                            </div>
                            <div class="form-field">
                                <label for="INN-id"
                                    >ИНН<span class="valid-red">*</span></label
                                >
                                <Input
                                    name="INN-id"
                                    type="text"
                                    class="input-big mask-inn"
                                    placeholder="AA 999999999"
                                    v-model:value="documentsData.inn"
                                />
                            </div>
                            <div class="form-field">
                                <label for="work-book">Трудовая книжка </label>
                                <Input
                                    name="work_book"
                                    type="text"
                                    class="input-big mask-workbook"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="AA 999999999"
                                    v-model:value="documentsData.work_book_num"
                                />
                            </div>
                            <div class="form-field">
                                <label for="foreign-pass">Загранпаспорт</label>
                                <Input
                                    name="foreign-pass"
                                    type="text"
                                    class="input-big mask-foreign-pass"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="AA 999999999"
                                    v-model:value="
                                        documentsData.international_pass
                                    "
                                />
                            </div>
                            <div class="form-field">
                                <label for="">Документ воинского учета</label>
                                <Select
                                    variant="outlined"
                                    clearable
                                    class="select-big"
                                    v-model="selectedMilitary"
                                    :names="militaryDocs"
                                ></Select>
                            </div>
                            <div class="form-field">
                                <label for="military-id"
                                    >Серия и номер документов воинского
                                    учета</label
                                >
                                <Input
                                    name="military-id"
                                    type="text"
                                    class="input-big mask-military"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="AA 999999999"
                                    v-model:value="
                                        documentsData.mil_reg_doc_ser_num
                                    "
                                />
                            </div>
                        </div>
                        <div
                            id="no-passport"
                            class="form-data izm"
                            v-else="selectedPass === 'Нет'"
                        >
                            <div class="form-field one">
                                <label for="pass-num"
                                    >Документ удостоверяющий личность
                                    <span class="valid-red">*</span></label
                                >
                                <Input
                                    type="text"
                                    class="input-full"
                                    placeholder="документ"
                                    v-model:value="foreign.name"
                                />
                            </div>

                            <div class="form-field">
                                <label for="pass-date"
                                    >Дата выдачи<span class="valid-red"
                                        >*</span
                                    ></label
                                >
                                <Input
                                    type="date"
                                    name="pass-date"
                                    class="input-small"
                                    v-model:value="foreign.foreign_pass_date"
                                />
                            </div>

                            <div class="form-field">
                                <label for="pass-id">серия номер</label>
                                <Input
                                    type="text"
                                    id="pass-id"
                                    class="input-small pass-masked"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="__ ___ ____"
                                    v-model:value="foreign.foreign_pass_num"
                                />
                            </div>
                            <div class="form-field one">
                                <label for="org-id"
                                    >Кем выдан<span class="valid-red"
                                        >*</span
                                    ></label
                                >
                                <Input
                                    type="text"
                                    id="org-id"
                                    class="input-full"
                                    placeholder="оуфмс по моковской обл"
                                    v-model:value="foreign.foreign_pass_whom"
                                />
                            </div>
                            <div class="form-field">
                                <label for="work-book-foreign"
                                    >Трудовая книжка
                                </label>
                                <Input
                                    type="text"
                                    id="work-book-foreign"
                                    class="input-big mask-workbook"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="AA 999999999"
                                    v-model:value="foreign.work_book_num"
                                />
                            </div>
                            <div class="form-field">
                                <label for="INN-id-foreign">ИНН</label>
                                <Input
                                    type="text"
                                    id="INN-id-foreign"
                                    class="input-big mask-inn"
                                    vmaska
                                    maska="AA ##########"
                                    placeholder="AA 999999999"
                                    v-model:value="foreign.inn"
                                />
                            </div>
                            <div class="form-field">
                                <label for="snils-id-foreign"
                                    >Номер СНИЛС</label
                                >
                                <Input
                                    type="text"
                                    id="snils-id-foreign"
                                    vmaska
                                    maska="AA ##########"
                                    class="input-big mask-snils"
                                    placeholder="AA 999999999"
                                    v-model:value="foreign.snils"
                                />
                            </div>
                        </div>
                    </div>
                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                            @click="openPanelTwo"
                        ></Button>
                        <Button
                            type="button"
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                            @click="openPanelFour"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="panelFour">
                <v-expansion-panel-title >
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Информация об образовании
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
                    <div class="data-form simple" id="simplee">
                        <div class="form-field">
                            <label for="education-org"
                                >Образовательная организация<span
                                    class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                name="study_institution"
                                type="text"
                                id="education-org"
                                class="input-full"
                                placeholder="Введите название образовательной организации"
                                v-model:value="educationData.study_institution"
                            />
                        </div>
                        <div class="form-field">
                            <label for="facultet">Факультет</label>
                            <Input
                                name="study_faculty"
                                type="text"
                                id="facultet"
                                class="input-full"
                                placeholder="Ввведите название факультета"
                                v-model:value="educationData.study_faculty"
                            />
                        </div>
                        <div class="form-field">
                            <label for="course"
                                >Курс (класс)<span class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                name="study_year"
                                type="text"
                                id="course"
                                class="input-full"
                                placeholder="1 курс"
                                v-model:value="educationData.study_year"
                            />
                        </div>
                        <div class="form-field">
                            <label for="speciality">Специальность</label>
                            <Input
                                name="study_spec"
                                type="text"
                                id="speciality"
                                class="input-full"
                                placeholder="Введите название специальности"
                                v-model:value="educationData.study_specialty"
                            />
                        </div>
                    </div>
                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                            @click="openPanelThree"
                        ></Button>
                        <Button
                            type="button"
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                            @click="openPanelFive"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                value="panelFive"
                class="no-RSO"
                v-if="selectedAnswer == 'Нет'"
            >
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
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
                    <div class="RSO-blanks RSO" id="Blanks">
                        <p class="RSO-blanks__title RSO-title">
                            Скачайте бланки, распечатайте. Отсканируйте и
                            прикрепите заполненные заявления (оригиналы отнесите
                            в Региональное отделение).
                        </p>
                        <div class="blanks-wrapper">
                            <div class="RSO-statement">
                                <p class="statement-title">
                                    Заявление на вступление в РСО<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/download.svg"
                                            alt="download"
                                        />
                                        <button
                                            type="button"
                                            id="statement"
                                            class="download-blanks"
                                            @click="downloadBlankMembership"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                                <p class="statement-title">
                                    Согласие на обработку персональных
                                    данных<span class="valid-red">*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/download.svg"
                                            alt="download"
                                        />
                                        <button
                                            id="statement"
                                            class="download-blanks"
                                            type="button"
                                            @click="downloadBlankParent"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                                <p class="statement-title">
                                    Согласие законного представителя на
                                    обработку персональных данных
                                    несовершенолетнего<span class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-children">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/download.svg"
                                            alt="download"
                                        />
                                        <button
                                            id="statement"
                                            class="download-blanks"
                                            type="button"
                                            @click="downloadBlankPersonal"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload
                                        mode="basic"
                                        name="demo[]"
                                        accept="image/*"
                                        customUpload
                                        @uploader="customBase64Uploader"
                                    />
                                </div>
                            </div>
                            <div class="dowmload-all">
                                <button
                                    class="download-blanks"
                                    onclick="downloadAll()"
                                >
                                    <img
                                        src="@app/assets/icon/download.svg"
                                        alt="download"
                                    />

                                    Скачать все бланки
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="pass-details RSO">
                        <p class="pass-details__title RSO-title">
                            Загрузите копию паспорта
                        </p>
                        <div class="pass-details__wrapper">
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт гражданина РФ<span class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт законного представителя<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="others-docs RSO">
                        <p class="other-docs__title RSO-title">
                            Дополнительные документы
                        </p>
                        <div class="other-docs__wrapper">
                            <div class="other-docs__item">
                                <p class="statement-title">СНИЛС</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Военный билет</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-military">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Загранпаспорт</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-foreign-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="know-RSO">
                        <p class="know-RSO-title">Откуда вы узнали про РСО</p>
                        <textarea
                            name="know"
                            class="know"
                            cols="1"
                            rows="1"
                        ></textarea>
                        <div class="counter">
                            <span class="current">0</span>&nbsp;/
                            <span class="total">200</span>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                            @click="openPanelFour"
                        ></Button>
                        <Button
                            type="button"
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                class="yes-RSO"
                v-else-if="selectedAnswer == 'Да'"
            >
                <v-expansion-panel-title >
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
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
                    <div class="RSO-blanks RSO" id="Blanks">
                        <p class="RSO-blanks__title RSO-title">
                            Загрузите копию паспорта
                        </p>
                        <div class="pass-details__wrapper">
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт гражданина РФ<span class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт законного представителя<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="others-docs RSO">
                        <p class="other-docs__title RSO-title">
                            Дополнительные документы
                        </p>
                        <div class="other-docs__wrapper">
                            <div class="other-docs__item">
                                <p class="statement-title">СНИЛС</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Военный билет</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-military">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Загранпаспорт</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-foreign-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            type="button"
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            type="button"
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                class="no-RSO-foreign"
                v-else-if="selectedAnswer == 'Нет' && selectedPass == 'Нет'"
            >
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
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
                    <div class="RSO-blanks RSO" id="Blanks">
                        <p class="RSO-blanks__title RSO-title">
                            Скачайте бланки, распечатайте. Отсканируйте и
                            прикрепите заполненные заявления (оригиналы отнесите
                            в Региональное отделение).
                        </p>
                        <div class="blanks-wrapper">
                            <div class="RSO-statement">
                                <p class="statement-title">
                                    Заявление на вступление в РСО<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/download.svg"
                                            alt="download"
                                        />
                                        <button
                                            id="statement"
                                            class="download-blanks"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                                <p class="statement-title">
                                    Согласие на обработку персональных
                                    данных<span class="valid-red">*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/download.svg"
                                            alt="download"
                                        />
                                        <button
                                            id="consent-personal"
                                            class="download-blanks"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="dowmload-all">
                                <button
                                    class="download-blanks"
                                    onclick="downloadAll()"
                                >
                                    <img
                                        src="@app/assets/icon/download.svg"
                                        alt="download"
                                    />
                                    Скачать все бланки
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="pass-details RSO">
                        <p class="pass-details__title RSO-title">
                            Загрузите копию паспорта
                        </p>
                        <div class="pass-details__wrapper">
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт иностранного гражданина
                                    <span class="valid-red">*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="others-docs RSO">
                        <p class="other-docs__title RSO-title">
                            Дополнительные документы
                        </p>
                        <div class="other-docs__wrapper">
                            <div class="other-docs__item">
                                <p class="statement-title">СНИЛС</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="know-RSO">
                        <p class="know-RSO-title">Откуда вы узнали про РСО</p>
                        <textarea
                            name="know"
                            class="know"
                            cols="1"
                            rows="1"
                        ></textarea>
                        <div class="counter">
                            <span class="current">0</span>&nbsp;/
                            <span class="total">200</span>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            type="button"
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                class="yes-RSO-foreign"
                v-else-if="selectedAnswer == 'Да' && selectedPass == 'Нет'"
            >
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
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
                    <div class="RSO-blanks RSO" id="Blanks">
                        <p class="RSO-blanks__title RSO-title">
                            Следите, пожалуйста, за актуальностью загруженных
                            документов.
                        </p>
                        <div class="pass-details__wrapper">
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт иностранного гражданина<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт законного представителя<span
                                        class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="others-docs RSO">
                        <p class="other-docs__title RSO-title">
                            Дополнительные документы
                        </p>
                        <div class="other-docs__wrapper">
                            <div class="other-docs__item">
                                <p class="statement-title">СНИЛС</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Вид на жительство</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-foreign-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <img
                                            src="@app/assets/icon/file.svg"
                                            alt="file"
                                        />
                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <FileUpload></FileUpload>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions class="form__button-group">
                <Button
                    type="submit"
                    label="Отправить данные на верификацию"
                ></Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>
<script setup>
import { ref, computed, onMounted, reactive, inject } from 'vue';
import { RadioButton } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { FileUpload } from '@features/Upload/components';
// import { vMaska } from 'maska';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { Select } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import {
    helpers,
    minLength,
    required,
    maxLength,
    numeric,
    sameAs,
} from '@vuelidate/validators';
import { HTTP } from '@app/http';
import axios from 'axios';

let education = ref(null);
const router = useRouter();

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

const openPanelFour = () => {
    panel.value = 'panelFour';
};

const openPanelFive = () => {
    panel.value = 'panelFive';
};

// let endpoints = ['api/v1/users/me/education/', 'api/v1/users/me/documents/'];

const educationData = ref({
    study_institution: '',
    study_faculty: '',
    study_year: '',
    study_specialty: '',
});

const documentsData = ref({
    snils: '',
    inn: '',
    pass_ser_num: '',
    pass_whom: '',
    pass_date: '',
    work_book_num: '',
    international_pass: '',
    mil_reg_doc_ser_num: '',
});

const regionData = ref({
    reg_town: '',
    reg_house: '',
    reg_fact_same_address: true,
    reg_region_id: null,
});

const foreign = ref({
    name: '',
    foreign_pass_num: '',
    foreign_pass_whom: '',
    foreign_pass_date: '',
    snils: '',
    inn: '',
    work_book_num: '',
});

const parentData = ref({
    parent_last_name: '',
    parent_first_name: '',
    parent_patronymic_name: '',
    parent_date_of_birth: '',
    relationship: null,
    parent_phone_number: '',
    russian_passport: true,
    passport_number: '',
    passport_date: '',
    passport_authority: '',
    region: null,
    city: '',
    address: '',
});

const swal = inject('$swal');

let user = ref(null);

const getUser = async () => {
    await HTTP.get('/rsousers/me/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(user.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

getUser();

const downloadBlankPersonal = async () => {
    await HTTP.get(
        '/rsousers/me/statement/download_consent_to_the_processing_of_personal_data/',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'persnal.pdf');
            document.body.appendChild(docUrl);
            docUrl.click();
            console.log(response, 'success');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const downloadBlankMembership = async () => {
    await HTTP.get(
        '/rsousers/me/statement/download_membership_statement_file/',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'membership.pdf');
            document.body.appendChild(docUrl);
            docUrl.click();
            console.log(response, 'success');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
const downloadBlankParent = async () => {
    await HTTP.get(
        '/rsousers/me/statement/download_parent_consent_to_the_processing_of_personal_data/',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'parent.pdf');
            document.body.appendChild(docUrl);
            docUrl.click();
            console.log(response, 'success');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const addData = async () => {
    const axiosrequest1 = HTTP.post('/rsousers/me/region/', regionData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
    const axiosrequest2 = HTTP.post(
        '/rsousers/me/documents/',
        documentsData.value,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );
    const axiosrequest3 = HTTP.post(
        '/rsousers/me/education/',
        educationData.value,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );

    // const requests = ref([
    //     '/users/me/region/',
    //     ''
    // ])
    // you could also use destructuring to have an array of responses
    // await HTTP.all([axiosrequest1, axiosrequest2, axiosrequest3])
    //     .then(
    //         axios.spread(function (res1, res2, res3) {
    //             regionData.value = res1.data;
    //             documentsData.value = res2.data;
    //             educationData.value = res3.data;
    //             console.log(res1);
    //             console.log(res2);
    //             console.log(res3);
    //             swal.fire({
    //                 position: 'top-center',
    //                 icon: 'success',
    //                 title: 'успешно',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //         }),
    //     )
    //     .catch((error) => {
    //         console.error('There was an error!', error);
    //         swal.fire({
    //             position: 'top-center',
    //             icon: 'error',
    //             title: 'ошибка',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     });
    // HTTP
    // .post('/users/me/region/', regionData.value, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Token ' + localStorage.getItem('Token'),
    //     },
    // })
    // .then((response) => {
    //     regionData.value = response.data;
    //     console.log(response.data);
    //     swal.fire({
    //         position: 'top-center',
    //         icon: 'success',
    //         title: 'успешно',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     });
    // })
    // .catch((error) => {
    //     console.error('There was an error!', error);
    //     swal.fire({
    //         position: 'top-center',
    //         icon: 'error',
    //         title: 'ошибка',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     });
    // });

    // HTTP
    // .post('/users/me/foreign_documents/', foreign.value, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Token ' + localStorage.getItem('Token'),
    //     },
    // })
    // .then((response) => {
    //     foreign.value = response.data;
    //     console.log(response.data);
    //     swal.fire({
    //         position: 'top-center',
    //         icon: 'success',
    //         title: 'успешно',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     });
    // })
    // .catch((error) => {
    //     console.error('There was an error!', error);
    //     swal.fire({
    //         position: 'top-center',
    //         icon: 'error',
    //         title: 'ошибка',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     });
    // });
    // HTTP.post('/users/me/documents/', documentsData.value, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Token ' + localStorage.getItem('Token'),
    //     },
    // })
    //     .then((response) => {
    //         documentsData.value = response.data;
    //         console.log(response.data);
    //         swal.fire({
    //             position: 'top-center',
    //             icon: 'success',
    //             title: 'успешно',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     })
    //     .catch((error) => {
    //         console.error('There was an error!', error);
    //         swal.fire({
    //             position: 'top-center',
    //             icon: 'error',
    //             title: 'ошибка',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     });
    axios
        .post('api/v1/rsousers/me/education/', educationData.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            educationData.value = response.data;
            console.log(response.data);
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/UserPage');
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

const answers = ref([
    { name: 'Да', id: 'f1' },
    { name: 'Нет', id: 'f2', checked: true },
]);

const gender = ref([
    { name: 'male', id: 's1', checked: true },
    { name: 'female', id: 's2' },
]);

const passportParent = ref([
    { name: 'Да', id: 'pp1', checked: true },
    { name: 'Нет', id: 'pp2' },
]);
const parents = ref([
    {
        value: 'Отец',
        name: 'Отец',
    },
    { value: 'Мать', name: 'Мать' },
]);

const militaryDocs = ref([
    {
        value: 'Удостоверение гражданина,подлежащего призыву на военную службу',
        name: 'Удостоверение гражданина, подлежащего призыву на военную службу',
    },
    { value: 'Военный билтет', name: 'Военный билет' },
]);

const address = reactive([
    { name: 'Да', id: 'addr1' },
    { name: 'Нет', id: 'addr2', checked: true },
]);

const passport = reactive([
    { name: 'Да', id: 'pass1', checked: true },
    { name: 'Нет', id: 'pass2' },
]);

// const selectedSex = ref(user.gender);
const selectedAnswer = ref('Нет');
const selectedPassParent = ref('Да');
const selectedAddress = ref('Нет');
const selectedPass = ref('Да');

const nameParent = ref('');
const surnameParent = ref('');
const birthParent = ref('');
const phoneParent = ref('');
const patronomycParent = ref('');
const selectedMilitary = ref(0);
const passInputP = ref('');
const PassIdParent = ref('');
const localParent = ref('');
const passDateP = ref('');
const AddresParent = ref('');
const localityContact = ref('');
const regionContact = ref('');
const socialsVk = ref('');
const socialsTg = ref('');
const addresContact = ref('');
const regionFact = ref(null);
const addresFact = ref('');
const localityFact = ref('');
const passNumber = ref('');
const passDate = ref('');
const passOrg = ref('');
const snils = ref('');
const inn = ref('');
const foreignPass = ref('');
const workbook = ref('');
const militaryNumber = ref('');
</script>
<style lang="scss">
.accordion {
    color: #35383f;
    &-title {
        font-size: 20px;
        color: #35383f;
        font-weight: 700;
        margin-bottom: 40px;
        font-family: BERTSANS;
    }
}
.rso-question {
    margin-bottom: 40px;
    width: 300px;
    padding: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.v-col-4 {
    flex: none;
    max-width: 100%;
}
.checkbox {
    font-size: 16px;
    font-weight: 600;
    color: #35383f;
    display: inline-block;
    margin: 10px;
}

.checkbox-wrapper {
    &__title {
        font-size: 16px;
        color: #35383f;
        font-weight: 600;
        font-family: 'Bert-Sans', sans-serif;
    }
}

.data-form {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 140px;
    padding: 40px;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    margin-top: 40px;
}
.form-field label {
    font-size: 16px;
    font-family: BERTSANS;
    font-weight: 600;
    margin-bottom: 8px;
}

.input-big {
    width: 465px;
}

.input-small {
    width: 250px;
}

.input-full {
    width: 100%;
}

.nav-btn__wrapper {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
}
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
.parents {
    padding: 30px;
    &-about {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 140px;
    }
    &-wrapper {
        margin-top: 40px;
        border: 1px solid #1c5c94;
        border-radius: 10px;
        &__title {
            font-size: 24px;
            padding: 40px 40px 0px;
        }
    }
}

.izm {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 114px;
}
.addres {
    margin-top: 55px;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    font-family: 'Bert-Sans', sans-serif;
    font-weight: 600;
}

.simple {
    display: block;
}

.one {
    grid-column-start: 1;
    grid-column-end: 3;
    margin-bottom: 16px;
}

.select-small {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    width: 248px;
    min-height: 40px;
    text-indent: 16px;
    outline: none;
    font-family: 'BertSans';
    font-weight: 500;
    font-size: 16px;
    color: #898989;
    margin-bottom: 20px;
}

.select-big {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    width: 465px;
    min-height: 40px;
    text-indent: 16px;
    outline: none;
    font-family: 'BertSans';
    font-weight: 500;
    font-size: 16px;
    color: #898989;
    margin-bottom: 20px;
}

.how {
    display: grid;
    grid-template-columns: 1.5fr 1.15fr;
}

.RSO-blanks {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    padding: 40px 40px 0px 40px;
    &__title {
        font-size: 20px;
        font-weight: bold;
        width: 878px;
        margin-bottom: 40px;
    }
}

.dowmload-all a {
    color: #1c5c94;
    text-decoration: none;
}

.blanks-wrapper {
    display: grid;
    grid-template-columns: 4fr 1fr;
}

.pass-details__wrapper {
    display: flex;
    justify-content: space-between;
}

.other-docs__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.know {
    width: 100%;
    border: 1px solid #a3a3a3;
    margin-top: 8px;
    outline: none;
    overflow: hidden;
    padding: 16px 0px 16px 16px;
    text-align: left;
    resize: none;
    border-radius: 10px;
    background: #fff;
}

.RSO {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    padding: 40px 40px 40px 40px;
    margin-bottom: 40px;
    &-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 40px;
    }
}

// .no-RSO-foreign {

// }

// .yes-RSO-foreign {
//     display: none;
// }

.v-expansion-panel {
    &__shadow {
        box-shadow: none;
    }

    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 24px;
        font-weight: 600;
        background-color: transparent;
        border-bottom: 1px solid #939393;
        color: #35383f;
        padding: 16px 0px;

        &__overlay {
            display: none;
        }
    }
}

.v-expansion-panel:not(:first-child)::after {
    display: none;
}

.date {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
}
</style>
