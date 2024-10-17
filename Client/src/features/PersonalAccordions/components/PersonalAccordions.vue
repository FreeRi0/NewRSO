<template>
    <div class="rso-question">
        <div class="rso-question__title">Являетесь членом РСО?</div>
        <div class="checkbox" v-for="answer in answers" :key="answer.id">
            <input class="radiobutton" type="radio" :id="answer.id" :label="answer.name" :value="answer.value"
                :name="answer.name" :checked="props.user.is_rso_member === answer.value"
                v-model="props.user.is_rso_member" />
            <label :for="id">{{ answer.name }}</label>
        </div>
    </div>

    <form class="accordion-form" enctype="multipart/form-data" @submit.prevent="updateData">
        <p class="accordion-title">
            Для вступления в РСО внесите ниже персональные данные.
        </p>
        <v-expansion-panels v-model="panel">
            <v-expansion-panel value="panelOne">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Основная информация
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="data-form">
                        <div class="form-field">
                            <label for="surname">Фамилия
                                <span class="valid-red">&nbsp;*</span>
                            </label>
                            <Input class="input-big" clearable placeholder="Введите фамилию" name="surname"
                                v-model:value="props.user.last_name" />
                            <p class="error-form" v-if="isError.last_name">
                                {{ isError.last_name }}
                            </p>
                        </div>
                        <div class="form-field">
                            <label for="surname-lat">Фамилия (Латиницей)</label>
                            <Input class="input-big" clearable placeholder="Familia" name="surname-lat"
                                v-model:value="props.user.last_name_lat" />
                            <p class="error-form" v-if="isError.last_name_lat">
                                {{ isError.last_name_lat }}
                            </p>
                        </div>

                        <div class="form-field">
                            <label for="name">Имя
                                <span class="valid-red">&nbsp;*</span>
                            </label>
                            <Input class="input-big" clearable placeholder="Введите имя" name="name"
                                v-model:value="props.user.first_name" />
                            <p class="error-form" v-if="isError.first_name">
                                {{ isError.first_name }}
                            </p>
                        </div>
                        <div class="form-field">
                            <label for="name-lat">Имя (Латиницей)</label>
                            <Input class="input-big" clearable placeholder="Imia" name="name-lat"
                                v-model:value="props.user.first_name_lat" />
                            <p class="error-form" v-if="isError.first_name_lat">
                                {{ isError.first_name_lat }}
                            </p>
                        </div>
                        <div class="form-field">
                            <label for="patronomyc">Отчество</label>
                            <Input class="input-big" clearable placeholder="Введите отчество" name="patronomyc"
                                v-model:value="props.user.patronymic_name" />
                            <p class="error-form" v-if="isError.patronymic_name">
                                {{ isError.patronymic_name }}
                            </p>
                        </div>
                        <div class="form-field">
                            <label for="patronomyc-lat">Отчество (Латиницей)</label>
                            <Input class="input-big" clearable placeholder="Otchestvo" name="patronomyc-lat"
                                v-model:value="props.user.patronymic_lat" />
                            <p class="error-form" v-if="isError.patronymic_lat">
                                {{ isError.patronymic_lat }}
                            </p>
                        </div>

                        <div class="checkbox-wrapper">
                            <p class="checkbox-wrapper__title">
                                Пол<span class="valid-red">&nbsp;*</span>
                            </p>
                            <div class="checkbox" v-for="sex in gender" :key="sex.id">
                                <input class="radiobutton" type="radio" :id="sex.id" :label="sex.name"
                                    :value="sex.value" :name="sex.name" :checked="props.user.gender === sex.value"
                                    v-model="props.user.gender" />
                                <label :for="id">{{ sex.name }}</label>
                            </div>
                        </div>

                        <div class="form-field">
                            <label for="date_of_birth">Дата рождения<span class="valid-red">&nbsp;*</span></label>
                            <Input type="date" name="date_of_birth" class="input-small"
                                v-model:value="props.user.date_of_birth" />
                        </div>
                    </div>
                    <div class="parents-wrapper" v-if="!props.user.is_adult">
                        <p class="parents-wrapper__title">
                            Законный представитель несовершеннолетнего
                        </p>
                        <div class="parents">
                            <div class="parents-about">
                                <div class="form-field">
                                    <label for="surname-parent">Фамилия<span class="valid-red">&nbsp;*</span></label>
                                    <Input name="surname-parent" class="input-big" placeholder="Введите фамилию"
                                        v-model:value="props.user.parent.parent_last_name
                                            " />
                                </div>
                                <div class="form-field">
                                    <label for="">Кем является<span class="valid-red">&nbsp;*</span></label>
                                    <sortByEducation class="input-small" variant="outlined" clearable
                                        placeholder="Выберете родителя" v-model="props.user.parent.relationship"
                                        :options="parents" :sorts-boolean="false">
                                    </sortByEducation>
                                </div>

                                <!-- <p>{{ user.is_adult }}</p> -->
                                <div class="form-field">
                                    <label for="name-parent">Имя<span class="valid-red">&nbsp;*</span></label>
                                    <Input name="name-parent" class="input-big" placeholder="Введите имя" v-model:value="props.user.parent.parent_first_name
                                        " />
                                </div>
                                <div class="form-field">
                                    <label for="date-parent">Дата рождения<span class="valid-red">&nbsp;*</span></label>
                                    <Input type="date" name="date-parent" class="input-small" v-model:value="props.user.parent
                                        .parent_date_of_birth
                                        " />
                                </div>
                                <div class="form-field">
                                    <label for="patronomyc-parent">Отчество</label>
                                    <Input class="input-big" name="patronomyc-parent" placeholder="Введите отчество"
                                        v-model:value="props.user.parent
                                            .parent_patronymic_name
                                            " />
                                </div>

                                <div class="form-field">
                                    <label for="phone-parent">Телефон<span class="valid-red">&nbsp;*</span></label>
                                    <div class="input-small phone">
                                        <MaskInput type="tel" placeholder="+7(___) ___ __ __" name="phone-parent"
                                            :value="user.parent.parent_phone_number
                                                " v-model="user.parent.parent_phone_number
                                                    " mask="+7(###) ###-##-##" />
                                    </div>
                                </div>
                            </div>
                            <div class="how">
                                <div class="checkbox passport" id="checkbox-parent-pass">
                                    <p class="checkbox-title">
                                        Паспорт гражданина РФ<span class="valid-red">&nbsp;*</span>
                                    </p>

                                    <div class="checkbox" v-for="passP in passportParent" :key="passP.id">
                                        <input class="radiobutton" type="radio" :id="passP.id" :label="passP.name"
                                            :value="passP.value" :name="passP.name" :checked="props.user.parent
                                                .russian_passport ===
                                                passP.value
                                                " v-model="props.user.parent
                                                    .russian_passport
                                                    " />
                                        <label :for="id">{{
                                            passP.name
                                        }}</label>
                                    </div>
                                </div>
                                <div class="addres" id="pass-no-addr" v-if="props.user.parent.russian_passport">
                                    Адрес постоянной регистрации
                                </div>
                            </div>

                            <div class="izm" id="passport-parent-yes" v-if="props.user.parent.russian_passport">
                                <div class="form-field" id="pass-no-pass-id">
                                    <label for="passInput">Номер и серия<span class="valid-red">&nbsp;*</span></label>
                                    <div class="input-small passport-number">
                                        <MaskInput name="passInput" mask="## ## ######" placeholder="__ __ ______"
                                            :value="user.parent.passport_number" v-model="user.parent.passport_number
                                                " />
                                    </div>
                                </div>

                                <div class="form-field" id="pass-no-reg">
                                    <label for="">Регион<span class="valid-red">&nbsp;*</span></label>
                                    <regionsDropdown open-on-clear id="reg" name="regdrop" placeholder="Выберите регион"
                                        v-model="props.user.parent.region" @update:value="changeValue"
                                        address="/regions/" class="mb-2">
                                    </regionsDropdown>
                                </div>

                                <div class="form-field" id="pass-no-date">
                                    <label for="pass-date-parent">Дата выдачи<span
                                            class="valid-red">&nbsp;*</span></label>
                                    <Input type="date" name="pass-date-parent" class="input-small" max="9999-12-31"
                                        v-model:value="props.user.parent.passport_date
                                            " />
                                </div>

                                <div class="form-field" id="pass-no-locality">
                                    <label for="locality-parent">Населенный пункт<span
                                            class="valid-red">&nbsp;*</span></label>
                                    <Input name="locality-parent" class="input-big"
                                        placeholder="Например, город Новосибирск"
                                        v-model:value="props.user.parent.city" />
                                </div>

                                <div class="form-field" id="pass-no-pass">
                                    <label for="pass-id-parent">Кем выдан<span class="valid-red">&nbsp;*</span></label>
                                    <Input name="pass-id-parent" class="input-big"
                                        placeholder="Введите полное название организации как в паспорте" v-model:value="props.user.parent.passport_authority
                                            " />
                                </div>

                                <div class="form-field" id="pass-no-street">
                                    <label for="addres-parent">Улица, дом, квартира<span
                                            class="valid-red">&nbsp;*</span></label>
                                    <Input name="addres-parent" class="input-big"
                                        placeholder="Например, ул. Приморская, дом 10, кв. 255" v-model:value="props.user.parent.address
                                            " />
                                </div>
                            </div>
                            <div id="no-passport" class="form-data izm" v-else="!props.user.parent.russian_passport">
                                <div class="form-field one" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="pass-num">Документ удостоверяющий личность
                                        <span class="valid-red">*</span></label>
                                    <Input type="text" class="input-full"
                                        placeholder="Паспорт инностранного гражданина, вид на жительство или иной документ"
                                        v-model:value="item.name" :max-length="200" />
                                    <div class="form__counter">
                                        {{ counterForeignParent }} / 200
                                    </div>
                                </div>
                                <div class="form-field one" v-else>
                                    <label for="pass-num">Документ удостоверяющий личность
                                        <span class="valid-red">*</span></label>
                                    <Input type="text" class="input-full"
                                        placeholder="Паспорт инностранного гражданина, вид на жительство или иной документ"
                                        v-model:value="props.foreignParent.name" :max-length="200" />
                                    <div class="form__counter">
                                        {{ counterForeignParent }} / 200
                                    </div>
                                </div>

                                <div class="form-field" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="pass-date">Дата выдачи<span class="valid-red">*</span></label>
                                    <Input type="date" name="pass-date" class="input-small"
                                        v-model:value="item.foreign_pass_date" />
                                </div>

                                <div class="form-field" v-else>
                                    <label for="pass-date">Дата выдачи<span class="valid-red">*</span></label>
                                    <Input type="date" name="pass-date" class="input-small" v-model:value="props.foreignParent
                                        .foreign_pass_date
                                        " />
                                </div>

                                <div class="form-field" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="pass-id">Серия номер</label>
                                    <Input type="text" id="pass-id" class="input-small pass-masked"
                                        placeholder="__ ___ ____" v-model:value="item.foreign_pass_num" vmaska
                                        maska="####-######" :max-length="50" />
                                    <div class="form__counter">
                                        {{ counterForeignParentNumber }} / 50
                                    </div>
                                </div>

                                <div class="form-field" v-else>
                                    <label for="pass-id">Серия номер</label>
                                    <Input type="text" id="pass-id" class="input-small pass-masked"
                                        placeholder="__ ___ ____" v-model:value="props.foreignParent.foreign_pass_num
                                            " vmaska maska="####-######" :max-length="50" />
                                    <div class="form__counter">
                                        {{ counterForeignParentNumber }} / 50
                                    </div>
                                </div>

                                <div class="form-field one" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="org-id">Кем выдан<span class="valid-red">*</span></label>
                                    <Input type="text" id="org-id" class="input-full" placeholder="Страна"
                                        v-model:value="item.foreign_pass_whom" :max-length="230" />
                                    <div class="form__counter">
                                        {{ counterForeignParentOrg }} / 230
                                    </div>
                                </div>

                                <div class="form-field one" v-else>
                                    <label for="org-id">Кем выдан<span class="valid-red">*</span></label>
                                    <Input type="text" id="org-id" class="input-full" placeholder="Страна"
                                        v-model:value="props.foreignParent
                                            .foreign_pass_whom
                                            " :max-length="230" />
                                    <div class="form__counter">
                                        {{ counterForeignParentOrg }} / 230
                                    </div>
                                </div>
                                <div class="form-field" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="work-book-foreign">Трудовая книжка
                                    </label>
                                    <Input type="text" id="work-book-foreign" class="input-big mask-workbook"
                                        placeholder="AA 999999999" v-model:value="item.work_book_num" vmaska
                                        maska="AA #########" :max-length="15" />
                                    <div class="form__counter">
                                        {{ counterForeignParentWork }} / 15
                                    </div>
                                </div>
                                <div class="form-field" v-else>
                                    <label for="work-book-foreign">Трудовая книжка
                                    </label>
                                    <Input type="text" id="work-book-foreign" class="input-big mask-workbook"
                                        placeholder="AA 999999999" v-model:value="props.foreignParent.work_book_num
                                            " vmaska maska="AA #########" :max-length="15" />
                                    <div class="form__counter">
                                        {{ counterForeignParentWork }} / 15
                                    </div>
                                </div>
                                <div class="form-field" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="INN-id-foreign">ИНН</label>
                                    <Input type="text" id="INN-id-foreign" class="input-big mask-inn"
                                        placeholder="AA 999999999" v-model:value="item.inn" vmaska maska="AA #########"
                                        :max-length="12" />
                                    <div class="form__counter">
                                        {{ counterForeignParentInn }} / 12
                                    </div>
                                </div>
                                <div class="form-field" v-else>
                                    <label for="INN-id-foreign">ИНН</label>
                                    <Input type="text" id="INN-id-foreign" class="input-big mask-inn"
                                        placeholder="AA 999999999" v-model:value="props.foreignParent.inn" vmaska
                                        maska="AA #########" :max-length="12" />
                                    <div class="form__counter">
                                        {{ counterForeignParentInn }} / 12
                                    </div>
                                </div>
                                <div class="form-field" v-if="props.isArr" v-for="item in props.foreignParent">
                                    <label for="snils-id-foreign">Номер СНИЛС</label>
                                    <Input type="text" id="snils-id-foreign" class="input-big mask-snils"
                                        placeholder="AA 999999999" v-model:value="item.snils" vmaska
                                        maska="AA #########" :max-length="30" />
                                    <div class="form__counter">
                                        {{ counterForeignParentSnils }} / 30
                                    </div>
                                </div>

                                <div class="form-field" v-else>
                                    <label for="snils-id-foreign">Номер СНИЛС</label>
                                    <Input type="text" id="snils-id-foreign" class="input-big mask-snils"
                                        placeholder="AA 999999999" v-model:value="props.foreignParent.snils
                                            " vmaska maska="AA #########" :max-length="30" />
                                    <div class="form__counter">
                                        {{ counterForeignParentSnils }} / 30
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--next" label="Далее" size="large"
                            @click="openPanelTwo">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
                <p class="error" v-if="isError.gender">
                    Гендер пользователя обязательное поле
                </p>
                <p class="error" v-if="isError.first_name">
                    Имя пользователя обязательное поле
                </p>
                <p class="error" v-if="isError.first_name">
                    Фамилия пользователя
                </p>

            </v-expansion-panel>

            <v-expansion-panel value="panelTwo">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Адрес и контакты
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
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
                            <label for="phone-contact">Телефон<span class="valid-red">&nbsp;*</span></label>
                            <div class="input-small phone">
                                <MaskInput type="tel" placeholder="+7(___) ___ __ __" name="phone-contact"
                                    :value="user.phone_number" v-model="user.phone_number" mask="+7(###) ###-##-##" />
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="">Регион<span class="valid-red">&nbsp;*</span></label>
                            <regionsDropdown open-on-clear id="reg" name="regdrop" placeholder="Выберите регион"
                                v-model="props.user.user_region.reg_region_id" @update:value="changeValue"
                                address="/regions/" class="mb-2"></regionsDropdown>
                        </div>
                        <div class="form-field">
                            <label for="email-contact">Электронная почта<span class="valid-red">&nbsp;*</span></label>
                            <Input name="email-сontact" class="input-big mask-email" placeholder="mail@mail.com"
                                v-model:value="props.user.email" />

                            <p class="error-form" v-if="isError.email">{{ isError.email }}</p>
                        </div>
                        <div class="form-field">
                            <label for="locality-contact">Населенный пункт<span class="valid-red">&nbsp;*</span></label>
                            <Input type="text" name="locality-contact" class="input-big" placeholder="Город"
                                v-model:value="props.user.user_region.reg_town" :max-length="40" />
                            <div class="form__counter">
                                {{ counterTown }} / 40
                            </div>
                        </div>

                        <div class="scoial-networks">
                            <div class="add">
                                <div class="form-field">
                                    <label for="socials">Ссылка на ВК</label>
                                    <Input name="socials" class="input-big mask-vk"
                                        placeholder="https://vk.com/id (или никнейм)"
                                        v-model:value="props.user.social_vk" :max-length="50" />
                                    <div class="form__counter">
                                        {{ counterVk }} / 50
                                    </div>
                                </div>
                                <div class="form-field">
                                    <label for="socials">Ссылка на Телеграм</label>
                                    <Input name="socials" class="input-big mask-tg" placeholder="https://t.me/username"
                                        v-model:value="props.user.social_tg" :max-length="50" />
                                    <div class="form__counter">
                                        {{ counterTg }} / 50
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="addres-contact">Улица, дом, квартира<span
                                    class="valid-red">&nbsp;*</span></label>
                            <Input type="text" name="addres-contact" class="input-big"
                                placeholder="Например, ул. Приморская, дом 10, кв. 255"
                                v-model:value="props.user.user_region.reg_house" :max-length="250" />
                            <div class="form__counter">
                                {{ counterHouse }} / 250
                            </div>
                        </div>
                        <div class="checkbox addr" id="checkbox">
                            <p class="checkbox-title">
                                Адрес фактического проживания совпадает с
                                адресом постоянной регистрации<span class="valid-red">&nbsp;*</span>
                            </p>

                            <div class="checkbox" v-for="addr in address" :key="addr.id">
                                <input class="radiobutton" type="radio" :id="addr.id" :label="addr.id"
                                    :value="addr.value" :name="addr.name" :checked="props.user.user_region
                                        .reg_fact_same_address ===
                                        addr.value
                                        " v-model="props.user.user_region
                                            .reg_fact_same_address
                                            " />
                                <label :for="id">{{ addr.name }}</label>
                            </div>
                        </div>


                        <!-- <p>value: {{ regionData.reg_fact_same_address}}</p> -->
                        <div class="addr-fact__wrapper" id="addr-fact"
                            v-if="!props.user.user_region.reg_fact_same_address">
                            <p class="accordion-block-title small">
                                Адрес фактического проживания
                            </p>
                            <div class="form-field">
                                <label for="">Регион</label>
                                <regionsDropdown open-on-clear id="reg" name="regdrop" placeholder="Выберите регион"
                                    v-model="props.user.user_region.fact_region_id
                                        " @update:value="changeValue" address="/regions/" class="mb-2">
                                </regionsDropdown>
                            </div>
                            <div class="form-field">
                                <label for="locality-fact">Населенный пункт</label>
                                <Input name="locality-fact" class="input-big" placeholder="Город" v-model:value="props.user.user_region.fact_town
                                    " :max-length="40" />
                                <div class="form__counter">
                                    {{ counterFactTown }} / 40
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="addres-fact">Улица, дом, квартира</label>
                                <Input type="text" name="addres-fact" class="input-big"
                                    placeholder="Например, ул. Приморская, дом 10, кв. 255" v-model:value="props.user.user_region.fact_house
                                        " :max-length="250" />
                                <div class="form__counter">
                                    {{ counterFactHouse }} / 250
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            @click="openPanelOne" size="large">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large"
                            @click="openPanelThree">
                            Далее
                        </button>
                    </v-card-actions>

                </v-expansion-panel-text>
                <p class="error" v-if="isError.detail">
                    <!-- {{ isError.detail }} -->Данные региона пользователя уже
                    существуют
                </p>
            </v-expansion-panel>
            <p class="error" v-if="isError.email">
                {{ '' + isError.email }}
            </p>
            <v-expansion-panel value="panelThree">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start desctop">
                            Документы (паспорт, СНИЛС, ИНН, сведения о трудовой
                            деятельности, документ воинского учета)
                        </v-col>
                        <v-col cols="4" class="d-flex justify-start adaptive">
                            Документы
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="data-form docs">
                        <div class="checkbox one">
                            <p class="checkbox-title">
                                Паспорт гражданина РФ<span class="valid-red">&nbsp;*</span>
                            </p>
                            <div class="checkbox" v-for="pas in passport" :key="pas.id">
                                <input class="radiobutton" type="radio" :id="pas.id" :label="pas.id" :value="pas.value"
                                    :name="pas.name" :checked="props.user.documents
                                        ?.russian_passport === pas.value
                                        " v-model="props.user.documents.russian_passport
                                            " />
                                <label :for="id">{{ pas.name }}</label>
                            </div>
                        </div>
                        <!-- <pre>{{ documents.russian_passport }}</pre> -->
                        <div class="form-data izm" v-if="props.user.documents.russian_passport">
                            <div class="form-field">
                                <label for="pass-num">Номер и серия<span class="valid-red">&nbsp;*</span></label>
                                <div class="input-big">
                                    <MaskInput name="pass-num " type="text" mask="## ## ######"
                                        placeholder="__ __ ______" :value="user.documents.pass_ser_num"
                                        v-model="user.documents.pass_ser_num" />
                                </div>
                                <!-- <div class="form__counter">
                                    {{ counterPass }} / 20
                                </div> -->
                            </div>

                            <div class="form-field">
                                <label for="pass-date">Дата выдачи<span class="valid-red">&nbsp;*</span></label>
                                <Input type="date" name="pass_date" class="input-small" v-model:value="props.user.documents.pass_date
                                    " />
                            </div>

                            <div class="form-field one">
                                <label for="pass-id">Кем выдан</label>
                                <Input name="pass-id" type="text" class="input-full"
                                    placeholder="Например, ОВД Советского района города Новосибирска и может быть длиннее"
                                    v-model:value="props.user.documents.pass_whom
                                        " :max-length="230" />
                                <div class="form__counter">
                                    {{ counterPassWhom }} / 230
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="SNILS-id">Номер СНИЛС<span class="valid-red">&nbsp;*</span></label>
                                <div class="input-big mask-snils">
                                    <MaskInput name="SNILS-d" mask="###-###-### ##" type="text"
                                        placeholder="___-___-___ __" :value="user.documents.snils"
                                        v-model="user.documents.snils" />
                                </div>

                                <!-- <div class="form__counter">
                                    {{ counterSnils }} / 30
                                </div> -->
                            </div>
                            <div class="form-field">
                                <label for="INN-id">ИНН<span class="valid-red">&nbsp;*</span></label>
                                <Input name="INN-id" type="text" class="input-big mask-inn"
                                    v-model:value="props.user.documents.inn" :max-length="12" />
                                <div class="form__counter">
                                    {{ counterInn }} / 12
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="work-book">Трудовая книжка </label>
                                <Input name="work_book" type="text" class="input-big mask-workbook" vmaska
                                    maska="AA ##########" v-model:value="props.user.documents.work_book_num
                                        " :max-length="30" />
                                <div class="form__counter">
                                    {{ counterWorkbook }} / 30
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="foreign-pass">Загранпаспорт</label>
                                <Input name="foreign-pass" type="text" class="input-big mask-foreign-pass" vmaska
                                    maska="AA ##########" v-model:value="props.user.documents.international_pass
                                        " :max-length="30" />

                                <div class="form__counter">
                                    {{ counterIntPass }} / 30
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="">Документ воинского учета</label>

                                <sortByEducation placeholder="Выберите документ" clearable variant="outlined" v-model="props.user.documents.mil_reg_doc_type
                                    " :options="militaryDocs" class="select-big" :sorts-boolean="false">
                                </sortByEducation>
                                <p class="error" v-if="isError.mil_reg_doc_type">
                                    {{ '' + isError.mil_reg_doc_type }}
                                </p>
                            </div>

                            <div class="form-field">
                                <label for="military-id">Серия и номер документов воинского
                                    учета</label>
                                <Input name="military-id" type="text" class="input-big mask-military" vmaska
                                    maska="AA ##########" v-model:value="props.user.documents.mil_reg_doc_ser_num
                                        " :max-length="30" />

                                <div class="form__counter">
                                    {{ counterMilitary }} / 30
                                </div>
                            </div>
                        </div>
                        <div class="form-data izm" v-else-if="!props.user.documents.russian_passport">
                            <div class="form-field one" v-for="item in props.foreignUserDocs"
                                v-if="props.isArr === true">
                                <label for="pass-num">Документ удостоверяющий личность
                                    <span class="valid-red">&nbsp;*</span></label>
                                <Input type="text" class="input-full"
                                    placeholder="Паспорт инностранного гражданина, вид на жительство или иной документ"
                                    v-model:value="item.name" :max-length="200" />
                                <div class="form__counter">
                                    {{ counterOtherDoc }} / 200
                                </div>
                            </div>

                            <div v-else class="form-field one">
                                <label for="pass-num">Документ удостоверяющий личность
                                    <span class="valid-red">&nbsp;*</span></label>
                                <Input type="text" class="input-full"
                                    placeholder="Паспорт инностранного гражданина, вид на жительство или иной документ"
                                    v-model:value="props.foreignUserDocs.name" :max-length="200" />
                                <div class="form__counter">
                                    {{ counterOtherDoc }} / 200
                                </div>
                            </div>

                            <div class="form-field" v-for="item in props.foreignUserDocs" v-if="props.isArr === true">
                                <label for="pass-date">Дата выдачи<span class="valid-red">&nbsp;*</span></label>
                                <Input type="date" name="pass-date" class="input-small"
                                    v-model:value="item.foreign_pass_date" />
                            </div>

                            <div class="form-field" v-else>
                                <label for="pass-date">Дата выдачи<span class="valid-red">&nbsp;*</span></label>
                                <Input type="date" name="pass-date" class="input-small" v-model:value="props.foreignUserDocs.foreign_pass_date
                                    " />
                            </div>

                            <div class="form-field" v-for="item in props.foreignUserDocs" v-if="props.isArr === true">
                                <label for="pass-id">Серия и номер</label>
                                <Input type="text" id="pass-id" class="input-small pass-masked" vmaska
                                    maska="AA ##########" v-model:value="item.foreign_pass_num" :max-length="50" />
                                <div class="form__counter">
                                    {{ counterOtherPassNum }} / 50
                                </div>
                            </div>

                            <div class="form-field" v-else>
                                <label for="pass-id">Серия и номер</label>
                                <Input type="text" id="pass-id" class="input-small pass-masked" vmaska
                                    maska="AA ##########" v-model:value="props.foreignUserDocs.foreign_pass_num
                                        " :max-length="50" />
                                <div class="form__counter">
                                    {{ counterOtherPassNum }} / 50
                                </div>
                            </div>
                            <div class="form-field one" v-for="item in props.foreignUserDocs"
                                v-if="props.isArr === true">
                                <label for="org-id">Кем выдан<span class="valid-red">&nbsp;*</span></label>
                                <Input type="text" id="org-id" class="input-full" placeholder="Страна"
                                    v-model:value="item.foreign_pass_whom" :max-length="230" />
                                <div class="form__counter">
                                    {{ counterOtherPassWhom }} / 230
                                </div>
                            </div>

                            <div class="form-field one" v-else>
                                <label for="org-id">Кем выдан<span class="valid-red">&nbsp;*</span></label>
                                <Input type="text" id="org-id" class="input-full" placeholder="Страна" v-model:value="props.foreignUserDocs.foreign_pass_whom
                                    " :max-length="230" />
                                <div class="form__counter">
                                    {{ counterOtherPassWhom }} / 230
                                </div>
                            </div>
                            <div class="form-field" v-for="item in props.foreignUserDocs" v-if="props.isArr === true">
                                <label for="work-book-foreign">Трудовая книжка
                                </label>
                                <Input type="text" id="work-book-foreign" class="input-big mask-workbook" vmaska
                                    maska="AA ##########" v-model:value="item.work_book_num" :max-length="15" />
                                <div class="form__counter">
                                    {{ counterOtherWorkbook }} / 15
                                </div>
                            </div>

                            <div class="form-field" v-else>
                                <label for="work-book-foreign">Трудовая книжка
                                </label>
                                <Input type="text" id="work-book-foreign" class="input-big mask-workbook" vmaska
                                    maska="AA ##########" v-model:value="props.foreignUserDocs.work_book_num
                                        " :max-length="15" />
                                <div class="form__counter">
                                    {{ counterOtherWorkbook }} / 15
                                </div>
                            </div>
                            <div class="form-field" v-for="item in props.foreignUserDocs" v-if="props.isArr === true">
                                <label for="INN-id-foreign">ИНН</label>
                                <Input type="text" id="INN-id-foreign" class="input-big mask-inn" vmaska
                                    maska="AA ##########" v-model:value="item.inn" :max-length="12" />
                                <div class="form__counter">
                                    {{ counterOtherInn }} / 12
                                </div>
                            </div>

                            <div class="form-field" v-else>
                                <label for="INN-id-foreign">ИНН</label>
                                <Input type="text" id="INN-id-foreign" class="input-big mask-inn" vmaska
                                    maska="AA ##########" v-model:value="props.foreignUserDocs.inn" :max-length="12" />
                                <div class="form__counter">
                                    {{ counterOtherInn }} / 12
                                </div>
                            </div>
                            <div class="form-field" v-for="item in props.foreignUserDocs" v-if="props.isArr === true">
                                <label for="snils-id-foreign">Номер СНИЛС</label>
                                <Input type="text" id="snils-id-foreign" vmaska maska="AA ##########"
                                    class="input-big mask-snils" v-model:value="item.snils" :max-length="30" />
                                <div class="form__counter">
                                    {{ counterOtherSnils }} / 30
                                </div>
                            </div>

                            <div class="form-field" v-else>
                                <label for="snils-id-foreign">Номер СНИЛС</label>
                                <Input type="text" id="snils-id-foreign" vmaska maska="AA ##########"
                                    class="input-big mask-snils" v-model:value="props.foreignUserDocs.snils"
                                    :max-length="30" />
                                <div class="form__counter">
                                    {{ counterOtherSnils }} / 30
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            size="large" @click="openPanelTwo">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large"
                            @click="openPanelFour">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
                <p class="error" v-if="isError.detail">
                    Данные документов пользователя уже существуют
                </p>
            </v-expansion-panel>
            <v-expansion-panel value="panelFour">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Информация об образовании
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="data-form simple" id="simplee">
                        <div class="form-field">
                            <label for="education-org">Образовательная организация<span
                                    class="valid-red">&nbsp;*</span></label>

                            <educInstitutionDropdown open-on-clear id="reg" name="regdrop"
                                placeholder="Введите название образовательной организации"
                                v-model="props.user.education.study_institution" @update:value="changeValue"
                                class="mb-2" :SortDropdown="false"></educInstitutionDropdown>
                        </div>
                        <div class="form-field">
                            <label for="facultet">Факультет</label>
                            <Input name="study_faculty" type="text" id="facultet" class="input-full"
                                placeholder="Ввведите название факультета" v-model:value="props.user.education.study_faculty
                                    " :max-length="200" />
                            <div class="form__counter">
                                {{ counterFacultet }} / 200
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="course">Курс (класс)<span class="valid-red">&nbsp;*</span></label>
                            <Input name="study_year" type="text" class="input-full"
                                placeholder="Например, 1 курс, магистратура"
                                v-model:value="props.user.education.study_year" :max-length="50" />
                            <div class="form__counter">
                                {{ counterCourse }} / 50
                            </div>
                        </div>
                        <p class="error" v-if="isError.study_year">
                            {{ '' + isError.study_year }}
                        </p>
                        <div class="form-field">
                            <label for="speciality">Специальность</label>
                            <Input name="study_spec" type="text" id="speciality" class="input-full"
                                placeholder="Введите название специальности" v-model:value="props.user.education.study_specialty
                                    " :max-length="100" />
                            <div class="form__counter">
                                {{ counterSpeciality }} / 100
                            </div>
                        </div>
                    </div>
                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            @click="openPanelThree">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large"
                            @click="openPanelFive">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
                <p class="error" v-if="isError.detail">
                    Образовательные данные пользователя уже существуют
                </p>
            </v-expansion-panel>
            <v-expansion-panel value="panelFive" class="no-RSO" v-if="
                props.user.is_rso_member === false &&
                props.user.documents?.russian_passport
            ">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
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
                                    Заявление на вступление в РСО<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />
                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="download" />
                                        <button type="button" id="statement" class="download-blanks"
                                            @click="downloadBlankMembership">
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <div class="statement-wrapper">
                                        <div class="statement-item">
                                            <SvgIcon iconName="add-file" />

                                            <!-- <FileUpload
                                                mode="advanced"
                                                name="demo[]"
                                                accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000"
                                                invalidFileSizeMessage="Превышен размер загружаемого файла"
                                                @select="statementUp"
                                                chooseLabel="Выбрать файл"
                                            /> -->
                                            <FileUpload mode="advanced" name="demo[]" accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000"
                                                invalidFileSizeMessage="Превышен размер загружаемого файла"
                                                @select="statementUp" v-if="!statement" chooseLabel="Выбрать файл">
                                                <!-- <template

                                                #content="{
                                                    removeFileCallback,
                                                }"
                                            >

                                            </template> -->
                                            </FileUpload>
                                            <div v-else-if="statement">
                                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                    <div
                                                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                        <span class="font-semibold">{{
                                                            statement.name
                                                            }}</span>
                                                        <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statement-item" v-if="
                                            props.user.statement.statement
                                        ">
                                            <a :href="props.user.statement
                                                .statement
                                                " target="_blank">Заявление</a>
                                        </div>
                                    </div>
                                </div>
                                <p class="statement-title">
                                    Согласие на обработку персональных
                                    данных<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="download" />
                                        <button id="statement" class="download-blanks" type="button"
                                            @click="downloadBlankParent">
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <div class="statement-wrapper">
                                        <div class="statement-item">
                                            <SvgIcon iconName="add-file" />

                                            <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000" :customUpload="true" @select="selectPersonal"
                                                chooseLabel="Выбрать файл" v-if="!consent_personal_data" />
                                            <div v-else-if="
                                                consent_personal_data
                                            ">
                                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                    <div
                                                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                        <span class="font-semibold">{{
                                                            consent_personal_data.name
                                                            }}</span>
                                                        <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statement-item" v-if="
                                            props.user.statement
                                                .consent_personal_data
                                        ">
                                            <a :href="props.user.statement
                                                .consent_personal_data
                                                " target="_blank">Согласие</a>
                                        </div>
                                    </div>
                                </div>
                                <p class="statement-title" v-if="!props.user.is_adult">
                                    Согласие законного представителя на
                                    обработку персональных данных
                                    несовершеннолетнего<span class="valid-red">
                                        &nbsp;*</span>
                                </p>
                                <div class="statement-wrapper" v-if="!props.user.is_adult">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-children">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="download" />
                                        <button id="statement" class="download-blanks" type="button"
                                            @click="downloadBlankPersonal">
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <div class="statement-wrapper">
                                        <div class="statement-item">
                                            <SvgIcon iconName="add-file" />
                                            <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000" :customUpload="true"
                                                @select="selectParentPersonal" chooseLabel="Выбрать файл" v-if="
                                                    !consent_personal_data_representative
                                                " />
                                            <div v-else-if="
                                                consent_personal_data_representative
                                            ">
                                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                    <div
                                                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                        <span class="font-semibold">{{
                                                            consent_personal_data_representative.name
                                                            }}</span>
                                                        <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statement-item" v-if="
                                            props.user.statement
                                                .consent_personal_data_representative
                                        ">
                                            <a :href="props.user.statement
                                                .consent_personal_data_representative
                                                " target="_blank">Согласие несовершеннолетнего</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dowmload-all">
                                <button class="download-blanks allBlanks" @click="downloadAll" type="button">
                                    <SvgIcon iconName="download" />
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
                                    Паспорт гражданина РФ<span class="valid-red sub">
                                        &nbsp;*&nbsp;<sup>для гражданина РФ</sup></span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-wrapper">
                                        <div class="statement-item">
                                            <SvgIcon iconName="add-file" />
                                            <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000" :customUpload="true" @select="selectPass"
                                                chooseLabel="Выбрать файл" v-if="!passportUpload" />
                                            <div v-else-if="passportUpload">
                                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                    <div
                                                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                        <span class="font-semibold">{{
                                                            passportUpload.name
                                                            }}</span>
                                                        <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statement-item" v-if="props.user.statement.passport">
                                            <a :href="props.user.statement
                                                .passport
                                                " target="_blank">Паспорт</a>
                                        </div>
                                    </div>
                                </div>

                                <p class="error" v-if="isError.passport">
                                    Обязательное поле
                                </p>
                            </div>
                            <div class="pass-details__item" v-if="!props.user.is_adult">
                                <p class="statement-title">
                                    Паспорт законного представителя<span class="valid-red">
                                        &nbsp;*&nbsp;<sup>для несовершеннолетних</sup></span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-wrapper">
                                        <div class="statement-item">
                                            <SvgIcon iconName="add-file" />
                                            <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                                :maxFileSize="7000000" :customUpload="true" @select="selectParentPersonalPass
                                                    " chooseLabel="Выбрать файл" v-if="!passport_representative" />
                                            <div v-else-if="
                                                passport_representative
                                            ">
                                                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                    <div
                                                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                        <span class="font-semibold">{{
                                                            passport_representative.name
                                                            }}</span>
                                                        <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="statement-item" v-if="
                                            props.user.statement
                                                .passport_representative
                                        ">
                                            <a :href="props.user.statement
                                                .passport_representative
                                                " target="_blank">Паспорт родителя</a>
                                        </div>
                                    </div>
                                </div>
                                <p class="error" v-if="isError.passport_representative">
                                    Обязательное поле
                                </p>
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
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectSnils"
                                            chooseLabel="Выбрать файл" v-if="!snils_file" />
                                        <div v-else-if="snils_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        snils_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.snils_file">
                                        <a :href="props.user.statement.snils_file
                                            " target="_blank">СНИЛС</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Военный билет</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-military">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectMilitary"
                                            chooseLabel="Выбрать файл" v-if="!military_document" />
                                        <div v-else-if="military_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        military_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .military_document
                                    ">
                                        <a :href="props.user.statement
                                            .military_document
                                            " target="_blank">Военный билет</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectINN"
                                            chooseLabel="Выбрать файл" v-if="!inn_file" />
                                        <div v-else-if="inn_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        inn_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.inn_file">
                                        <a :href="props.user.statement.inn_file
                                            " target="_blank">ИНН</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Загранпаспорт</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-foreign-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectIntPass"
                                            chooseLabel="Выбрать файл" v-if="!international_passport" />
                                        <div v-else-if="international_passport">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        international_passport.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .international_passport
                                    ">
                                        <a :href="props.user.statement
                                            .international_passport
                                            " target="_blank">Загранпаспорт</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectEmployment"
                                            chooseLabel="Выбрать файл" v-if="!employment_document" />
                                        <div v-else-if="employment_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        employment_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .employment_document
                                    ">
                                        <a :href="props.user.statement
                                            .employment_document
                                            " target="_blank">Трудовая книжка</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="know-RSO">
                        <p class="know-RSO-title">Откуда вы узнали про РСО</p>
                        <TextArea class="know" name="know" placeholder="Например, на сайте университета"
                            v-model:value="props.user.statement.rso_info_from" :max-length="200"></TextArea>
                        <div class="form__counter">{{ counterKnow }} / 200</div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            size="large" @click="openPanelFour">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel class="yes-RSO" v-else-if="
                props.user.is_rso_member === true &&
                props.user.documents?.russian_passport
            ">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
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
                                    Паспорт гражданина РФ<span class="valid-red">
                                        &nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectPass"
                                            chooseLabel="Выбрать файл" v-if="!passportUpload" />
                                        <div v-else-if="passportUpload">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        passportUpload.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.passport">
                                        <a :href="props.user.statement.passport
                                            " target="_blank">Паспорт</a>
                                    </div>
                                </div>
                            </div>
                            <div class="pass-details__item">
                                <p class="statement-title" v-if="!props.user.is_adult">
                                    Паспорт законного представителя<span class="valid-red">
                                        &nbsp;*</span>
                                </p>
                                <div class="statement-wrapper" v-if="!props.user.is_adult">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true"
                                            @select="selectParentPersonalPass" chooseLabel="Выбрать файл"
                                            v-if="!passport_representative" />
                                        <div v-else-if="passport_representative">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        passport_representative.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .passport_representative
                                    ">
                                        <a :href="props.user.statement
                                            .passport_representative
                                            " target="_blank">Паспорт родителя</a>
                                    </div>
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
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectSnils"
                                            chooseLabel="Выбрать файл" v-if="!snils_file" />
                                        <div v-else-if="snils_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        snils_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.snils_file">
                                        <a :href="props.user.statement.snils_file
                                            " target="_blank">СНИЛС</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Военный билет</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-military">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectMilitary"
                                            chooseLabel="Выбрать файл" v-if="!military_document" />
                                        <div v-else-if="military_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        military_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .military_document
                                    ">
                                        <a :href="props.user.statement
                                            .military_document
                                            " target="_blank">Военный билет</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectINN"
                                            chooseLabel="Выбрать файл" v-if="!inn_file" />
                                        <div v-else-if="inn_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        inn_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.inn_file">
                                        <a :href="props.user.statement.inn_file
                                            " target="_blank">ИНН</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Загранпаспорт</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-foreign-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectIntPass"
                                            chooseLabel="Выбрать файл" v-if="!international_passport" />
                                        <div v-else-if="international_passport">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        international_passport.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .international_passport
                                    ">
                                        <a :href="props.user.statement
                                            .international_passport
                                            " target="_blank">Загранпаспорт</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectEmployment"
                                            chooseLabel="Выбрать файл" v-if="!employment_document" />

                                        <div v-else-if="employment_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        employment_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .employment_document
                                    ">
                                        <a :href="props.user.statement
                                            .employment_document
                                            " target="_blank">Трудовая книжка</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            size="large" @click="openPanelFour">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel class="no-RSO-foreign" v-else-if="
                props.user.is_rso_member === false &&
                !props.user.documents?.russian_passport
            ">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
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
                                    Заявление на вступление в РСО<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="download" />
                                        <button id="statement" class="download-blanks" type="button"
                                            @click="downloadBlankMembership">
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="statementUp"
                                            v-if="!statement" chooseLabel="Выбрать файл" />
                                        <div v-else-if="statement">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        statement.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.statement">
                                        <a :href="props.user.statement.statement
                                            " target="_blank">Заявление</a>
                                    </div>
                                </div>
                                <p class="statement-title">
                                    Согласие на обработку персональных
                                    данных<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="download" />
                                        <button id="statement" class="download-blanks" type="button"
                                            @click="downloadBlankParent">
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectPersonal"
                                            chooseLabel="Выбрать файл" v-if="!consent_personal_data" />
                                        <div v-else-if="consent_personal_data">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        consent_personal_data.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .consent_personal_data
                                    ">
                                        <a :href="props.user.statement
                                            .consent_personal_data
                                            " target="_blank">Согласие</a>
                                    </div>
                                </div>
                            </div>
                            <div class="dowmload-all">
                                <button class="download-blanks allBlanks" @click="downloadAll" type="button">
                                    <SvgIcon iconName="download" />
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
                                    <span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectPass"
                                            chooseLabel="Выбрать файл" v-if="!passportUpload" />
                                        <div v-else-if="passportUpload">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        passportUpload.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.passport">
                                        <a :href="props.user.statement.passport
                                            " target="_blank">Паспорт</a>
                                    </div>
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
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectSnils"
                                            v-if="!snils_file" chooseLabel="Выбрать файл" />
                                        <div v-else-if="snils_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        snils_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.snils_file">
                                        <a :href="props.user.statement.snils_file
                                            " target="_blank">СНИЛС</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectINN"
                                            v-if="!inn_file" chooseLabel="Выбрать файл" />
                                        <div v-else-if="inn_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        inn_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.inn_file">
                                        <a :href="props.user.statement.inn_file
                                            " target="_blank">ИНН</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectEmployment"
                                            chooseLabel="Выбрать файл" v-if="!employment_document" />
                                        <div v-else-if="employment_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        employment_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .employment_document
                                    ">
                                        <a :href="props.user.statement
                                            .employment_document
                                            " target="_blank">Трудовая книжка</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="know-RSO">
                        <p class="know-RSO-title">Откуда вы узнали про РСО</p>

                        <TextArea class="know" name="know" placeholder="Напиши что нибудь"
                            v-model:value="props.user.statement.rso_info_from" :max-length="200"></TextArea>

                        <div class="form__counter">{{ counterKnow }} / 200</div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            size="large" @click="openPanelFour">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel class="yes-RSO-foreign" v-else="
                    props.user.is_rso_member === true &&
                    !props.user.documents?.russian_passport
                ">
                <v-expansion-panel-title>
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
                        </v-col>
                    </v-row>
                    <template v-slot:actions="{ expanded }">
                        <v-icon>
                            <SvgIcon icon-name="wrap" :class="{ expanded }" />
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
                                    Паспорт иностранного гражданина<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectPass"
                                            chooseLabel="Выбрать файл" v-if="!passportUpload" />
                                        <div v-else-if="passportUpload">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        passportUpload.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.passport">
                                        <a :href="props.user.statement.passport
                                            " target="_blank">Паспорт</a>
                                    </div>
                                </div>
                            </div>
                            <div class="pass-details__item" v-if="!props.user.is_adult">
                                <p class="statement-title">
                                    Паспорт законного представителя<span class="valid-red">&nbsp;*</span>
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-parent-pass">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true"
                                            @select="selectParentPersonalPass" chooseLabel="Выбрать файл"
                                            v-if="!passport_representative" />
                                        <div v-else-if="passport_representative">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        passport_representative.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .passport_representative
                                    ">
                                        <a :href="props.user.statement
                                            .passport_representative
                                            " target="_blank">Паспорт родителя</a>
                                    </div>
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
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-snils">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectSnils"
                                            chooseLabel="Выбрать файл" v-if="!snils_file" />
                                        <div v-else-if="snils_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        snils_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.snils_file">
                                        <a :href="props.user.statement.snils_file
                                            " target="_blank">СНИЛС</a>
                                    </div>
                                </div>
                            </div>
                            <div class="other-docs__item">
                                <p class="statement-title">ИНН</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-INN">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectINN"
                                            v-if="!inn_file" chooseLabel="Выбрать файл" />
                                        <div v-else-if="inn_file">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        inn_file.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="props.user.statement.inn_file">
                                        <a :href="props.user.statement.inn_file
                                            " target="_blank">ИНН</a>
                                    </div>
                                </div>
                            </div>

                            <div class="other-docs__item">
                                <p class="statement-title">Трудовая книжка</p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <SvgIcon iconName="file" />

                                        <p id="file-chosen-workbook">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <SvgIcon iconName="add-file" />
                                        <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                                            :maxFileSize="7000000" :customUpload="true" @select="selectEmployment"
                                            chooseLabel="Выбрать файл" v-if="!employment_document" />
                                        <div v-else-if="employment_document">
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div
                                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <span class="font-semibold">{{
                                                        employment_document.name
                                                        }}</span>
                                                    <!-- <div>
                                                                {{
                                                                    formatSize(
                                                                        statement.size,
                                                                    )
                                                                }}
                                                            </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statement-item" v-if="
                                        props.user.statement
                                            .employment_document
                                    ">
                                        <a :href="props.user.statement
                                            .employment_document
                                            " target="_blank">Трудовая книжка</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <button type="button" class="form__button form__button--prev" variant="text" label="Назад"
                            size="large" @click="openPanelFour">
                            Назад
                        </button>
                        <button type="button" class="form__button form__button--next" label="Далее" size="large">
                            Далее
                        </button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions v-if="props.button" class="form__button-group d-flex justify-space-between">
                <Button :disabled="isLoading ||
                    !props.user.first_name ||
                    !props.user.last_name ||
                    !props.user.gender ||
                    !props.user.date_of_birth ||
                    !props.user.email ||
                    !props.user.phone_number ||
                    !props.user.user_region.reg_town ||
                    !props.user.user_region.reg_region_id ||
                    !props.user.user_region.reg_house ||
                    !props.user.education.study_institution ||
                    !props.user.education.study_year ||
                    (props.user.documents.russian_passport &&
                        (!props.user.documents.pass_ser_num ||
                            !props.user.documents.pass_date ||
                            !props.user.documents.inn ||
                            !props.user.documents.snils)) ||
                    (props.user.documents.russian_passport === false &&
                        (!props.foreignUserDocs.name ||
                            !props.foreignUserDocs.foreign_pass_date ||
                            !props.foreignUserDocs.foreign_pass_whom)) ||
                    (props.user.is_adult === false &&
                        (!props.user.parent.parent_first_name ||
                            !props.user.parent.parent_last_name ||
                            !props.user.parent.parent_date_of_birth ||
                            !props.user.parent.relationship ||
                            !props.user.parent.parent_phone_number)) ||
                    (props.user.is_adult === false &&
                        props.user.parent.russian_passport &&
                        (!props.user.parent.passport_number ||
                            !props.user.parent.passport_date ||
                            !props.user.parent.parent_date_of_birth ||
                            !props.user.parent.passport_authority ||
                            !props.user.parent.region ||
                            !props.user.parent.city ||
                            !props.user.parent.address)) ||
                    (props.user.is_adult === false &&
                        props.user.parent.russian_passport === false &&
                        (!props.foreignParent.name ||
                            !props.foreignParent.foreign_pass_date ||
                            !props.foreignParent.foreign_pass_whom))
                    " :loaded="isLoading" v-if="
                        props.user.sent_verification === false &&
                        props.user.is_verified === false
                    " type="submit" label="Отправить данные на верификацию"></Button>

                <Button v-else :disabled="isLoading" :loaded="isLoading" type="submit"
                    label="Редактировать данные"></Button>
            </v-card-actions>
        </v-expansion-panels>
        <p class="error" v-if="isError.error">{{ '' + isError.error }}</p>
    </form>
</template>
<script setup>
import { ref, computed, onMounted, reactive, inject } from 'vue';
import { Input } from '@shared/components/inputs';
import { useRouter } from 'vue-router';
import {
    Select,
    sortByEducation,
    regionsDropdown,
    educInstitutionDropdown,
} from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { TextArea } from '@shared/components/inputs';
import { MaskInput } from 'vue-3-mask';
import { userData } from '@features/userData';
import { SvgIcon } from '@shared/ui/SvgIcon';
const props = defineProps({
    button: Boolean,
    user: Object,
    disabled: Boolean,
    foreignUserDocs: Array,
    isArr: Boolean,
    foreignParent: Array,
});
const emit = defineEmits([
    'updateUserData',
    'updateDocData',
    'updateEducData',
    'updateFileData',
    'updateParentData',
    'updateStatus',
]);
const onNumber = ref('');
const router = useRouter();
const userStore = useUserStore();
const panel = ref();
const isError = ref({});
const isLoading = ref(false);
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

const swal = inject('$swal');

const data = ref({});

const applications = ref([]);
const statement = ref(null);
const consent_personal_data = ref(null);
const consent_personal_data_representative = ref(null);
const passportUpload = ref(null);
const passport_representative = ref(null);
const snils_file = ref(null);
const inn_file = ref(null);
const international_passport = ref(null);
const employment_document = ref(null);
const military_document = ref(null);

const isStatementChange = ref(false);
const isConsent_personal_dataChange = ref(false);
const isConsent_personal_data_representativeChange = ref(false);

const isPassChange = ref(false);
const isParentPassChange = ref(false);

const isSnilsChange = ref(false);
const isInnChange = ref(false);
const isEmployeChange = ref(false);
const isMilitaryChange = ref(false);
const isForeignChange = ref(false);

const formatSize = (size) => {
    if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
    } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB';
    } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB';
    }
    return size.toString() + ' B';
};

const statementUp = (event) => {
    statement.value = event.files[0];

    isStatementChange.value = true;
};

const selectPersonal = (event) => {
    consent_personal_data.value = event.files[0];

    isConsent_personal_dataChange.value = true;
};

const selectParentPersonal = (event) => {
    consent_personal_data_representative.value = event.files[0];

    isConsent_personal_data_representativeChange.value = true;
};

const selectPass = (event) => {
    passportUpload.value = event.files[0];

    isPassChange.value = true;
};

const selectParentPersonalPass = (event) => {
    passport_representative.value = event.files[0];

    isParentPassChange.value = true;
};
const selectINN = (event) => {
    inn_file.value = event.files[0];

    isInnChange.value = true;
};

const selectSnils = (event) => {
    snils_file.value = event.files[0];

    isSnilsChange.value = true;
};

const selectEmployment = (event) => {
    employment_document.value = event.files[0];
    isEmployeChange.value = true;
};

const selectIntPass = (event) => {
    international_passport.value = event.files[0];

    isForeignChange.value = true;
};

const selectMilitary = (event) => {
    military_document.value = event.files[0];

    isMilitaryChange.value = true;
};

const counterCourse = computed(() => {
    return props.user.education.study_year?.length || 0;
});

const counterSpeciality = computed(() => {
    return props.user.education.study_specialty?.length || 0;
});

const counterFacultet = computed(() => {
    return props.user.education.study_faculty?.length || 0;
});

const counterTown = computed(() => {
    return props.user.user_region.reg_town?.length || 0;
});

const counterFactTown = computed(() => {
    return props.user.user_region?.fact_town?.length || 0;
});

const counterFactHouse = computed(() => {
    return props.user.user_region?.fact_house?.length || 0;
});

const counterHouse = computed(() => {
    return props.user.user_region.reg_house?.length || 0;
});

const counterVk = computed(() => {
    return props.user.social_vk?.length || 0;
});

const counterForeignParent = computed(() => {
    return props.foreignParent.name?.length || 0;
});
const counterForeignParentOrg = computed(() => {
    return props.foreignParent.foreign_pass_whom?.length || 0;
});
const counterForeignParentNumber = computed(() => {
    return props.foreignParent.foreign_pass_num?.length || 0;
});
const counterForeignParentInn = computed(() => {
    return props.foreignParent.inn?.length || 0;
});

const counterForeignParentWork = computed(() => {
    return props.foreignParent.work_book_num?.length || 0;
});
const counterForeignParentSnils = computed(() => {
    return props.foreignParent.snils?.length || 0;
});
const counterTg = computed(() => {
    return props.user.social_tg?.length || 0;
});

const counterSnils = computed(() => {
    return props.user.documents.snils?.length || 0;
});

const counterInn = computed(() => {
    return props.user.documents.inn?.length || 0;
});

const counterWorkbook = computed(() => {
    return props.user.documents.work_book_num?.length || 0;
});
const counterMilitary = computed(() => {
    return props.user.documents.mil_reg_doc_ser_num?.length || 0;
});
const counterIntPass = computed(() => {
    return props.user.documents.international_pass?.length || 0;
});

const counterPass = computed(() => {
    return props.user.documents.pass_ser_num?.length || 0;
});

const counterOtherDoc = computed(() => {
    return props.foreignUserDocs.name?.length || 0;
});

const counterOtherWorkbook = computed(() => {
    return props.foreignUserDocs.work_book_num?.length || 0;
});

const counterOtherPassNum = computed(() => {
    return props.foreignUserDocs.foreign_pass_num?.length || 0;
});

const counterOtherPassWhom = computed(() => {
    return props.foreignUserDocs.foreign_pass_whom?.length || 0;
});

const counterOtherSnils = computed(() => {
    return props.foreignUserDocs.snils?.length || 0;
});

const counterOtherInn = computed(() => {
    return props.foreignUserDocs.inn?.length || 0;
});

const counterPassWhom = computed(() => {
    return props.user.documents.pass_whom?.length || 0;
});
const counterKnow = computed(() => {
    return props.user.statement.rso_info_from?.length || 0;
});







// const updateValue = (event) => {
//     console.log('textt');
//     emit('update:value', event.target.value);
//     console.log('textt', event.target.value);
// };

const downloadBlankPersonal = async () => {
    await HTTP.get(
        '/rsousers/me/statement/download_consent_to_the_processing_of_personal_data/',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'persnal.rtf');
            document.body.appendChild(docUrl);
            docUrl.click();
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
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'membership.rtf');
            document.body.appendChild(docUrl);
            docUrl.click();
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
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
            responseType: 'blob',
        },
    )
        .then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'parent.rtf');
            document.body.appendChild(docUrl);
            docUrl.click();
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const downloadAll = async () => {
    await HTTP.get('/rsousers/me/statement/download_all_forms/', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
        responseType: 'blob',
    })
        .then((response) => {
            const url = new Blob([response.data], { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.zip');
            document.body.appendChild(link);
            link.click();
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};


const kyrillicPattern = /^[а-яА-ЯЁё\s]+$/;
const latinPattern = /^[a-zA-Z\s]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Универсальная функция для проверки поля
const validateField = (fieldValue, maxLength, pattern, isRequired, fieldDisplayName) => {
    // Проверка на обязательное поле
    if (isRequired && !fieldValue) {
        return `${fieldDisplayName} является обязательным полем!`;
    }

    // Специальная проверка для email

    if (fieldDisplayName === 'Электронная почта') {
        const containsCyrillic = /[а-яА-ЯЁё]/.test(fieldValue);
        if (containsCyrillic) {
            return `Адрес электронной почты не должен содержать кириллические символы!`;
        }
        // Проверка на корректный формат email
        if (fieldValue && !emailPattern.test(fieldValue)) {
            return `Пожалуйста, введите корректный адрес электронной почты!`;
        }
        // Проверка на максимальную длину
        if (fieldValue && fieldValue.length > maxLength) {
            return `Адрес электронной почты не может превышать ${maxLength} символов!`;
        }
    }

    // Общая проверка для других полей (кириллица/латиница)
    if (fieldValue && !pattern.test(fieldValue)) {
        return `${fieldDisplayName} содержит некорректные символы!`;
    }

    // Проверка на максимальную длину для всех полей
    if (fieldValue && fieldValue.length > maxLength) {
        return `${fieldDisplayName} не может превышать ${maxLength} символов!`;
    }

    return null; // Нет ошибок
};


const updateData = async () => {
    try {
        // Очищаем все ошибки динамически
        Object.keys(isError.value).forEach(key => {
            isError.value[key] = null;
        });

        isLoading.value = true; // Устанавливаем индикатор загрузки
        let hasError = false; // Флаг, указывающий на наличие ошибок

        // Регулярные выражения для кириллицы и латиницы
        // Персональная длина символов для каждого поля
        const maxLength = {
            last_name: 25,
            first_name: 20,
            patronymic_name: 23,
            email: 256
        };

        // Проверка каждого поля с использованием универсальной функции
        const fieldsToValidate = [
            { fieldName: 'last_name', fieldValue: props.user.last_name, maxLength: maxLength.last_name, pattern: kyrillicPattern, isRequired: true, displayName: 'Фамилия' },
            { fieldName: 'last_name_lat', fieldValue: props.user.last_name_lat, maxLength: maxLength.last_name, pattern: latinPattern, isRequired: false, displayName: 'Фамилия (латиницей)' },
            { fieldName: 'first_name', fieldValue: props.user.first_name, maxLength: maxLength.first_name, pattern: kyrillicPattern, isRequired: true, displayName: 'Имя' },
            { fieldName: 'first_name_lat', fieldValue: props.user.first_name_lat, maxLength: maxLength.first_name, pattern: latinPattern, isRequired: false, displayName: 'Имя (латиницей)' },
            { fieldName: 'patronymic_name', fieldValue: props.user.patronymic_name, maxLength: maxLength.patronymic_name, pattern: kyrillicPattern, isRequired: false, displayName: 'Отчество' },
            { fieldName: 'patronymic_lat', fieldValue: props.user.patronymic_lat, maxLength: maxLength.patronymic_name, pattern: latinPattern, isRequired: false, displayName: 'Отчество (латиницей)' },
            { fieldName: 'email', fieldValue: props.user.email, maxLength: maxLength.email, pattern: emailPattern, isRequired: true, displayName: 'Электронная почта' }
        ];

        // Цикл для проверки всех полей
        fieldsToValidate.forEach(field => {
            const error = validateField(field.fieldValue, field.maxLength, field.pattern, field.isRequired, field.displayName);
            if (error) {
                isError.value[field.fieldName] = error;
                hasError = true;
            }
        });
        if (hasError) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ошибка в данных',
                text: 'Некоторые поля заполнены неверно. Пожалуйста, проверьте введенные данные.',
                showConfirmButton: true
            });
            isLoading.value = false; // Останавливаем индикатор загрузки
            return; // Прерываем выполнение, если есть ошибки
        }

        // Если есть ошибки, остановить выполнение
        if (hasError) {
            isLoading.value = false; // Останавливаем индикатор загрузки
            return; // Прерываем выполнение, если есть ошибки
        }

        // Если ошибок нет, продолжаем отправку данных
        let fd = new FormData();
        fd.append('rso_info_from', props.user.statement.rso_info_from);




        // Логика добавления файлов
        if (isStatementChange.value)
            statement.value
                ? fd.append('statement', statement.value)
                : fd.append('statement', '');

        if (isConsent_personal_dataChange.value)
            consent_personal_data.value
                ? fd.append('consent_personal_data', consent_personal_data.value)
                : fd.append('consent_personal_data', '');

        if (isConsent_personal_data_representativeChange.value)
            consent_personal_data_representative.value
                ? fd.append(
                    'consent_personal_data_representative',
                    consent_personal_data_representative.value,
                )
                : fd.append('consent_personal_data_representative', '');

        if (isPassChange.value)
            passportUpload.value
                ? fd.append(' passport', passportUpload.value)
                : fd.append(' passport', '');

        if (isParentPassChange.value)
            passport_representative.value
                ? fd.append('passport_representative', passport_representative.value)
                : fd.append('passport_representative', '');

        if (isInnChange.value)
            inn_file.value
                ? fd.append('inn_file', inn_file.value)
                : fd.append('inn_file', '');

        if (isSnilsChange.value)
            snils_file.value
                ? fd.append('snils_file', snils_file.value)
                : fd.append('snils_file', '');

        if (isEmployeChange.value)
            employment_document.value
                ? fd.append('employment_document', employment_document.value)
                : fd.append('employment_document', '');

        if (isMilitaryChange.value)
            military_document.value
                ? fd.append('military_document', military_document.value)
                : fd.append('military_document', '');

        if (isForeignChange.value)
            international_passport.value
                ? fd.append('international_passport', international_passport.value)
                : fd.append('international_passport', '');

        // Отправляем основной запрос на сервер
        const axiosrequest1 = await HTTP.patch('/rsousers/me/', {
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            patronymic_name: props.user.patronymic_name,
            last_name_lat: props.user.last_name_lat,
            first_name_lat: props.user.first_name_lat,
            patronymic_name_lat: props.user.patronymic_name_lat,
            date_of_birth: props.user.date_of_birth,
            gender: props.user.gender,
            email: props.user.email,
            phone_number: props.user.phone_number,
            social_vk: props.user.social_vk,
            social_tg: props.user.social_tg,
            is_rso_member: props.user.is_rso_member,
        });


        const axiosrequestParent = ref({
            parent_last_name: '',
            parent_first_name: '',
            parent_patronymic_name: '',
            parent_date_of_birth: '',
            relationship: '',
            parent_phone_number: '',
            russian_passport: null,
            passport_number: '',
            passport_date: '',
            passport_authority: '',
            region: '',
            city: '',
            address: '',
        });
        if (
            !props.user.is_adult &&
            (props.user.parent.russian_passport ||
                !props.user.parent.russian_passport)
        ) {
            const parentRequest = await HTTP.patch('/rsousers/me/parent/', {
                parent_last_name: props.user.parent.parent_last_name,
                parent_first_name: props.user.parent.parent_first_name,
                parent_patronymic_name:
                    props.user.parent.parent_patronymic_name,
                parent_date_of_birth: props.user.parent.parent_date_of_birth,
                relationship: props.user.parent.relationship,
                parent_phone_number: props.user.parent.parent_phone_number,
                russian_passport: props.user.parent.russian_passport,
                passport_number: props.user.parent.passport_number,
                passport_date: props.user.parent.passport_date,
                passport_authority: props.user.parent.passport_authority,
                region: props.user.parent.region,
                city: props.user.parent.city,
                address: props.user.parent.address,
            });
            axiosrequestParent.value = parentRequest.data;
        }

        const axiosrequestForeignDocsParent = ref(null);
        if (!props.user.is_adult && !props.user.parent.russian_passport) {
            const axiosrequestForeignDocsParent = await HTTP.post(
                '/rsousers/me/foreign_parent_documents/',
                {
                    name: props.foreignParent.name,
                    foreign_pass_num: props.foreignParent.foreign_pass_num,
                    foreign_pass_whom: props.foreignParent.foreign_pass_whom,
                    foreign_pass_date: props.foreignParent.foreign_pass_date,
                    snils: props.foreignParent.snils,
                    inn: props.foreignParent.inn,
                    work_book_num: props.foreignParent.work_book_num,
                },
            );
        }

        const axiosrequest2 = await HTTP.patch('/rsousers/me/region/', {
            reg_region_id: props.user.user_region.reg_region_id,
            reg_town: props.user.user_region.reg_town,
            reg_house: props.user.user_region.reg_house,
            reg_fact_same_address: props.user.user_region.reg_fact_same_address,
            fact_region_id: props.user.user_region.fact_region_id,
            fact_town: props.user.user_region.fact_town,
            fact_house: props.user.user_region.fact_house,
        });
        const axiosrequest3 = await HTTP.patch('/rsousers/me/documents/', {
            snils: props.user.documents.snils,
            russian_passport: props.user.documents.russian_passport,
            inn: props.user.documents.inn,
            pass_ser_num: props.user.documents.pass_ser_num,
            pass_town: props.user.documents.pass_town,
            pass_whom: props.user.documents.pass_whom,
            pass_date: props.user.documents.pass_date,
            pass_code: props.user.documents.pass_code,
            pass_address: props.user.documents.pass_address,
            work_book_num: props.user.documents.work_book_num,
            international_pass: props.user.documents.international_pass,
            mil_reg_doc_type: props.user.documents.mil_reg_doc_type,
            mil_reg_doc_ser_num: props.user.documents.mil_reg_doc_ser_num,
        });

        const axiosrequestForeignDocs = ref(null);
        if (!props.user.documents.russian_passport) {
            const axiosrequestForeignDocs = await HTTP.patch(
                '/rsousers/me/foreign_documents/',
                {
                    name: props.foreignUserDocs.name,
                    foreign_pass_num: props.foreignUserDocs.foreign_pass_num,
                    foreign_pass_whom: props.foreignUserDocs.foreign_pass_whom,
                    foreign_pass_date: props.foreignUserDocs.foreign_pass_date,
                    snils: props.foreignUserDocs.snils,
                    inn: props.foreignUserDocs.inn,
                    work_book_num: props.foreignUserDocs.work_book_num,
                },
            );
        }

        let studyEducationId = Number.isInteger(
            props.user.education.study_institution,
        )
            ? props.user.education.study_institution
            : props.user.education.study_institution?.id;
        const axiosrequest4 = await HTTP.patch('/rsousers/me/education/', {
            study_institution: studyEducationId,
            study_faculty: props.user.education.study_faculty,
            study_year: props.user.education.study_year,
            study_specialty: props.user.education.study_specialty,
        });

        const axiosrequest5 = await HTTP.patch('/rsousers/me/statement/', fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            },
        });
        const axiosrequest6 = ref(null);

        if (
            props.user.sent_verification === false &&
            props.user.is_verified === false
        ) {
            const axiosrequest6 = await HTTP.post(
                '/rsousers/me/apply_for_verification/',
                data.value,
            );
        }

        props.foreignUserDocs = axiosrequestForeignDocs.value?.data;
        fd = axiosrequest5.data;
        data.value = axiosrequest6.value?.data;
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1000,
        });
        isLoading.value = false;
        emit('updateUserData', axiosrequest1.data);
        emit('updateRegionData', axiosrequest2.data);
        emit('updateDocData', axiosrequest3.data);
        emit('updateEducData', axiosrequest4.data);
        emit('updateFileData', axiosrequest5.data);
        emit('updateParentData', axiosrequestParent.value);
        emit('updateStatus', axiosrequest6.value?.data);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        isLoading.value = false;
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const answers = ref([
    { name: 'Да', value: true, id: 'f1' },
    { name: 'Нет', value: false, id: 'f2' },
]);

const gender = ref([
    { name: 'Мужской', value: 'male', id: 'm1' },
    { name: 'Женский', value: 'female', id: 'f1' },
]);

const passportParent = ref([
    { name: 'Да', value: true, id: 'pp1' },
    { name: 'Нет', value: false, id: 'pp2' },
]);
const parents = ref([
    {
        value: 'father',
        name: 'Отец',
    },
    { value: 'mother', name: 'Мать' },
]);

const militaryDocs = ref([
    {
        value: 'military_ticket',
        name: 'Удостоверение гражданина подлежащего вызову на срочную военную службу',
    },
    { value: 'military_certificate', name: 'Военный билет' },
]);

const address = ref([
    { name: 'Да', value: true, id: 'Да' },
    { name: 'Нет', value: false, id: 'Нет' },
]);

const passport = ref([
    { name: 'Да', value: true, id: 'Да' },
    { name: 'Нет', value: false, id: 'Нет' },
]);
</script>
<style lang="scss">
.expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.accordion {
    color: #35383f;

    &-title {
        font-size: 20px;
        color: #35383f;
        font-weight: 600;
        margin-bottom: 40px;
        font-family: 'Bert Sans';
    }

    &-form {
        padding-bottom: 40px;
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

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}


.error-form {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: start;
}

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.data-form {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 40px;
    padding: 40px;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    margin-top: 40px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        column-gap: 0px;
    }

    @media (max-width: 575px) {
        display: flex;
        flex-direction: column;
    }
}

.form-field label {
    font-size: 16px;
    font-family: 'Bert Sans';
    font-weight: 600;
    margin-bottom: 8px;
}

.input-small {
    width: 250px !important;

    @media (max-width: 768px) {
        width: 100% !important;
    }
}

.input-full {
    width: 100% !important;
}

.input-big {
    width: 465px !important;

    @media (max-width: 1024px) {
        width: 100% !important;
    }
}

.desctop {
    display: block;

    @media (max-width: 768px) {
        display: none !important;
    }
}

.adaptive {
    display: none !important;

    @media (max-width: 768px) {
        display: block !important;
    }
}

.nav-btn__wrapper {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
}

.form__button {
    width: 132px;
    min-height: 52px;
    margin: 0;
    padding: 16px 32px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-transform: none;
    border-radius: 10px;

    &--next,
    &--prev {
        width: 131px;
        color: #35383f;
        border: 2px solid #35383f;
        background-color: #ffffff;
        margin-left: 10px;
        margin-right: 10px;
    }
}

.parents {
    padding: 30px;

    &-about {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 140px;

        @media (max-width: 768px) {
            column-gap: 40px;
        }

        @media (max-width: 575px) {
            display: flex;
            flex-direction: column;
        }
    }

    &-wrapper {
        margin-top: 40px;
        border: 1px solid #1c5c94;
        border-radius: 10px;

        &__title {
            font-size: 24px;
            padding: 40px 40px 0px;

            @media (max-width: 768px) {
                font-size: 18px;
            }
        }
    }
}

.radiobutton {
    display: inline-flex;
    align-items: center;
    user-select: none;
    content: '';
    display: inline-block;
    width: 20px;
    height: 15px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 6px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    border-radius: 50%;
}

.izm {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 114px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 40px;
    }

    @media (max-width: 575px) {
        display: flex;
        flex-direction: column;
    }
}

.addres {
    margin-top: 55px;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    font-family: 'Bert-Sans', sans-serif;
    font-weight: 600;
    margin-left: 18px;
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
    border: 1px solid #939393;
    border-radius: 10px;
    width: 248px;
    min-height: 40px;
    text-indent: 16px;
    outline: none;
    font-family: 'BertSans';
    font-weight: 500;
    font-size: 16px;
    color: #35383f;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }
}

.select-big {
    border: 1px solid #939393;
    border-radius: 10px;
    width: 465px;
    min-height: 40px;
    outline: none;
    font-family: 'BertSans';
    font-weight: 500;
    font-size: 16px;
    color: #35383f;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }
}

.v-select__selection span {
    font-size: 16px;
    color: #35383f;
    font-weight: 400;
    font-family: 'Bert Sans';
}

.how {
    display: grid;
    grid-template-columns: 1.5fr 1.15fr;

    @media (max-width: 575px) {
        display: flex;
        flex-direction: column;
    }
}

.RSO-blanks {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    padding: 40px 40px 0px 40px;
    margin-top: 40px;

    &__title {
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        margin-bottom: 40px;

        @media (max-width: 575px) {
            font-size: 16px;
            font-weight: normal;
        }
    }
}

.download-blanks {
    color: #1f7cc0;
    margin-left: 3px;
}

.allBlanks {
    display: flex;
}

.dowmload-all {
    display: block !important;

    @media (max-width: 768px) {
        display: none !important;
    }
}

.blanks-wrapper {
    display: grid;
    grid-template-columns: 4fr 1fr;

    @media (max-width: 768px) {
        grid-template-columns: 5fr;
    }
}

.pass-details__wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
}

.other-docs__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
}

.know {
    width: 100%;
    border: 1px solid #a3a3a3;
    margin-top: 8px;
    outline: none;
    overflow: hidden;
    padding: 8px 20px 8px 20px;
    text-align: left;
    resize: none;
    height: 40px;
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

    &--active+.v-expansion-panel {
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

.statement-title {
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 14px;
        max-width: 500px;
    }
}

.statement-item {
    display: flex;
    margin-top: 12px;
    margin-right: 30px;
}

.statement-item p,
.statement-item a {
    text-decoration: none;
    font-size: 16px;
    display: block;
    margin-left: 8px;

    @media (max-width: 768px) {
        font-size: 14px;
        max-width: 290px;
    }
}

.statement-item a {
    color: #1f7cc0;
}

.statement-wrapper {
    display: flex;
    margin-bottom: 40px;
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.p-icon {
    display: none !important;
}

.p-button-label {
    color: #1f7cc0;
    margin-left: 5px;
}

.valid-red {
    color: red;
}

.statement-title sup {
    color: #000000de;
    font-weight: 500;
}

.accordion-block-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.v-expansion-panel-text__wrapper {
    padding: 0;
}

.v-expansion-panel-title--active {
    border-bottom: none !important;
}

.phone input,
.passport-number input,
.input-big input {
    box-sizing: border-box;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
    font-family: 'Bert Sans';
    color: #35383f;
}

@media (max-width: 768px) {

    .parents-wrapper__title,
    .accordion-block-title {
        font-size: 18px;
    }
}
</style>
