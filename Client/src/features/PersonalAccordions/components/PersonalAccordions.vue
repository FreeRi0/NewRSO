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

    <form class="accordion-form" enctype="multipart/form-data">
        <p class="accordion-title">
            Для вступления в РСО внесите ниже персональные данные
        </p>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                        </v-row>
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
                                v-model:value="v.surname.$model"
                                :error="v.surname.$errors"
                            />
                        </div>
                        <div class="form-field">
                            <label for="surname-lat">Фамилия(Латиницей) </label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="familia"
                                name="surname-lat"
                                v-model:value="surnameLat"
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
                                v-model:value="v.name.$model"
                                :error="v.name.$errors"
                            />
                        </div>
                        <div class="form-field">
                            <label for="name-lat">Имя(Латиницей)</label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="name"
                                name="name-lat"
                                v-model:value="nameLat"
                            />
                        </div>
                        <div class="form-field">
                            <label for="patronomyc">Отчество</label>
                            <Input
                                class="input-big"
                                clearable
                                placeholder="Отчество"
                                name="patronomyc"
                                v-model:value="patronomyc"
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
                                v-for="sex in sexes"
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
                                v-model="v.birth.$model"
                                :error="v.birth.$errors"
                            />
                        </div>
                    </div>
                    <div class="parents-wrapper">
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
                                        v-model:value="v.surnameParent.$model"
                                        :error="v.surnameParent.$errors"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for=""
                                        >Кем является<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <sortByEducation
                                        class="input-small"
                                        v-model="selectedParent"
                                        :options="parents"
                                    ></sortByEducation>
                                </div>

                                <div class="form-field">
                                    <label for="patronomyc-parent"
                                        >Отчество</label
                                    >
                                    <Input
                                        class="input-big"
                                        name="patronomyc-parent"
                                        placeholder="Введите Отчество"
                                        v-model="patronomycParent"
                                    />
                                </div>
                                <div class="form-field">
                                    <label for="date-parent"
                                        >Дата рождения<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="datetime-local"
                                        name="date-parent"
                                        class="input-small"
                                        v-model:value="v.birthParent.$model"
                                        :error="v.birthParent.$errors"
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
                                        v-model:value="v.nameParent.$model"
                                        :error="v.nameParent.$errors"
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
                                        name="phone-parent"
                                        class="input-small phone"
                                        placeholder="+7(__) __ __ _"
                                        @change="ageValid"
                                        v-model:value="v.phoneParent.$model"
                                        :error="v.phoneParent.$errors"
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
                                        class="input-small pass-masked"
                                        placeholder="__ __ ____"
                                        v-model:value="v.passInputP.$model"
                                        :error="v.passInputP.$errors"
                                    />
                                </div>

                                <div class="form-field" id="pass-no-reg">
                                    <label for=""
                                        >Регион<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <SelectRegion
                                        class="input-big"
                                    ></SelectRegion>
                                </div>

                                <div class="form-field" id="pass-no-date">
                                    <label for="pass-date-parent"
                                        >Дата выдачи<span class="valid-red"
                                            >*</span
                                        ></label
                                    >
                                    <Input
                                        type="datetime-local"
                                        name="pass-date-parent"
                                        class="input-small"
                                        v-model:value="v.passDateP.$model"
                                        :error="v.passDateP.$errors"
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
                                        v-model:value="v.localParent.$model"
                                        :error="v.localParent.$errors"
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
                                        v-model:value="v.PassIdParent.$model"
                                        :error="v.PassIdParent.$errors"
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
                                        v-model:value="v.AddresParent.$model"
                                        :error="v.AddresParent.$errors"
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
                                    />
                                </div>

                                <div class="form-field">
                                    <label for="pass-id">серия номер</label>
                                    <Input
                                        type="text"
                                        id="pass-id"
                                        class="input-small pass-masked"
                                        placeholder="__ ___ ____"
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
                                    />
                                </div>
                                <!-- <div class="NoPass one"></div>
                          <div class="one">
                                   <Button
                            class="add-doc-foreign"
                            onclick="add_document_field_NoPass()"
                          >
                            +Добавить документ
                          </Button>
                          </div> -->
                                <div class="form-field">
                                    <label for="work-book-foreign"
                                        >Трудовая книжка
                                    </label>
                                    <Input
                                        type="text"
                                        id="work-book-foreign"
                                        class="input-big mask-workbook"
                                        placeholder="AA 999999999"
                                    />
                                    <div class="error"></div>
                                </div>
                                <div class="form-field">
                                    <label for="INN-id-foreign">ИНН</label>
                                    <Input
                                        type="text"
                                        id="INN-id-foreign"
                                        class="input-big mask-inn"
                                        placeholder="AA 999999999"
                                    />
                                    <div class="error"></div>
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-card-actions class="nav-btn__wrapper">
                        <Button class="btn" label="Далее" size="large"></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Адрес и контакты
                        </v-col>
                    </v-row>
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
                                v-model:value="v.phoneContact.$model"
                                :error="v.phoneContact.$errors"
                            />
                        </div>
                        <div class="form-field">
                            <label for="regionContact"
                                >Регион<span class="valid-red">*</span></label
                            >
                            <SelectRegion
                                v-model="v.regionContact.$model"
                                :error="v.regionContact.$errors"
                            ></SelectRegion>
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
                                v-model:value="v.emailContact.$model"
                                :error="v.emailContact.$errors"
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
                                v-model:value="v.localityContact.$model"
                                :error="v.localityContact.$errors"
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
                                v-model:value="v.addresContact.$model"
                                :error="v.addresContact.$errors"
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
                                <SelectRegion
                                    v-model="regionFact"
                                ></SelectRegion>
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

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Документы (паспорт, СНИЛС, ИНН, сведения о трудовой
                            деятельности, документ воинского учета)
                        </v-col>
                    </v-row>
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
                                    v-model:value="v.passNumber.$model"
                                    :error="v.passNumber.$errors"
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
                                    v-model:value="v.passDate.$model"
                                    :error="v.passDate.$errors"
                                />
                            </div>

                            <div class="form-field one">
                                <label for="pass-id">Кем выдан</label>
                                <Input
                                    name="pass-id"
                                    type="text"
                                    class="input-full"
                                    placeholder="Название организации"
                                    v-model:value="v.passOrg.$model"
                                    :error="v.passOrg.$errors"
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
                                    v-model:value="v.snils.$model"
                                    :error="v.snils.$errors"
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
                                    v-model:value="v.inn.$model"
                                    :error="v.inn.$errors"
                                />
                            </div>
                            <div class="form-field">
                                <label for="work-book">Трудовая книжка </label>
                                <Input
                                    name="work_book"
                                    type="text"
                                    class="input-big mask-workbook"
                                    placeholder="AA 999999999"
                                    v-model:value="workbook"
                                />
                            </div>
                            <div class="form-field">
                                <label for="foreign-pass">Загранпаспорт</label>
                                <Input
                                    name="foreign-pass"
                                    type="text"
                                    class="input-big mask-foreign-pass"
                                    placeholder="AA 999999999"
                                    v-model:value="foreignPass"
                                />
                            </div>
                            <div class="form-field">
                                <label for="">Документ воинского учета</label>
                                <sortByEducation
                                    class="select-big"
                                    v-model="selectedMilitary"
                                    :options="militaryDocs"
                                ></sortByEducation>
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
                                    placeholder="AA 999999999"
                                    v-model:value="militaryNumber"
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
                                />
                            </div>

                            <div class="form-field">
                                <label for="pass-id">серия номер</label>
                                <Input
                                    type="text"
                                    id="pass-id"
                                    class="input-small pass-masked"
                                    placeholder="__ ___ ____"
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
                                />
                            </div>
                            <!-- <div class="NoPass one"></div>
                          <div class="one">
                                   <Button
                            class="add-doc-foreign"
                            onclick="add_document_field_NoPass()"
                          >
                            +Добавить документ
                          </Button>
                          </div> -->
                            <div class="form-field">
                                <label for="work-book-foreign"
                                    >Трудовая книжка
                                </label>
                                <Input
                                    type="text"
                                    id="work-book-foreign"
                                    class="input-big mask-workbook"
                                    placeholder="AA 999999999"
                                />
                                <div class="error"></div>
                            </div>
                            <div class="form-field">
                                <label for="INN-id-foreign">ИНН</label>
                                <Input
                                    type="text"
                                    id="INN-id-foreign"
                                    class="input-big mask-inn"
                                    placeholder="AA 999999999"
                                />
                                <div class="error"></div>
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
                                />
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
            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Информация об образовании
                        </v-col>
                    </v-row>
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
                                v-model:value="v.educationOrg.$model"
                                :error="v.educationOrg.$errors"
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
                                v-model:value="facultet"
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
                                v-model:value="v.course.$model"
                                :error="v.course.$errors"
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
                                v-model:value="speciality"
                            />
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
            <v-expansion-panel class="no-RSO" v-if="selectedAnswer == 'Нет'">
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
                        </v-col>
                    </v-row>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                                fill="#1F7CC0"
                                            />
                                            <path
                                                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                                stroke="#1F7CC0"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                                fill="#1F7CC0"
                                            />
                                            <path
                                                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                                stroke="#1F7CC0"
                                            />
                                        </svg>
                                        <button
                                            id="consent-personal"
                                            class="download-blanks"
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
                                        <p id="file-chosen-children">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                                fill="#1F7CC0"
                                            />
                                            <path
                                                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                                stroke="#1F7CC0"
                                            />
                                        </svg>
                                        <button
                                            id="consent-child"
                                            class="download-blanks"
                                        >
                                            Скачать бланк
                                        </button>
                                    </div>
                                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" />
                                </div>
                            </div>
                            <div class="dowmload-all">
                                <button
                                    class="download-blanks"
                                    onclick="downloadAll()"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                            fill="#1F7CC0"
                                        />
                                        <path
                                            d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                            stroke="#1F7CC0"
                                        />
                                    </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel class="yes-RSO" v-else="selectedAnswer == 'Да'">
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
                        </v-col>
                    </v-row>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
            <v-expansion-panel class="no-RSO-foreign" v-if="selectedAnswer == 'Нет' && selectedPass == 'Нет'">
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Заявление о вступлении в РСО и скан-копии документов
                        </v-col>
                    </v-row>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
                                        <p id="file-chosen-statement">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                                fill="#1F7CC0"
                                            />
                                            <path
                                                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                                stroke="#1F7CC0"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
                                        <p id="file-chosen-personal">
                                            Файл в формате pdf, png, jpeg
                                            размером не более 7 мб
                                        </p>
                                    </div>
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                                fill="#1F7CC0"
                                            />
                                            <path
                                                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                                stroke="#1F7CC0"
                                            />
                                        </svg>
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
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
                                            fill="#1F7CC0"
                                        />
                                        <path
                                            d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                            stroke="#1F7CC0"
                                        />
                                    </svg>
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
                                    Паспорт иностранного гражданина <span class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                            class="form__button form__button--next"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel class="yes-RSO-foreign" v-else="selectedAnswer == 'Да' && selectedPass == 'Нет'">
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Скан-копии документов
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="RSO-blanks RSO" id="Blanks">
                        <p class="RSO-blanks__title RSO-title">
                            Следите, пожалуйста, за актуальностью загруженных документов.
                        </p>
                        <div class="pass-details__wrapper">
                            <div class="pass-details__item">
                                <p class="statement-title">
                                    Паспорт иностранного гражданина<span class="valid-red"
                                        >*</span
                                    >
                                </p>
                                <div class="statement-wrapper">
                                    <div class="statement-item">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                                stroke="#35383F"
                                            />
                                            <path
                                                d="M9 13L15 13"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M9 17L13 17"
                                                stroke="#35383F"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                                stroke="#35383F"
                                            />
                                        </svg>
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
                    class="form__button"
                    variant="text"
                    label="Отправить данные на верификацию"
                    size="large"
                ></Button>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>
<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { RadioButton } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { FileUpload } from '@features/Upload/components';
import { useVuelidate } from '@vuelidate/core';
import { SelectRegion, sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import {
    helpers,
    minLength,
    required,
    maxLength,
    numeric,
    sameAs,
} from '@vuelidate/validators';
// import FileUpload from 'primevue/fileupload';

const answers = ref([
    { name: 'Да', id: 'f1' },
    { name: 'Нет', id: 'f2', checked: true },
]);

const sexes = ref([
    { name: 'Мужской', id: 's1', checked: true },
    { name: 'Женский', id: 's2' },
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

const selectedSex = ref('Мужской');
const selectedAnswer = ref('Нет');
const selectedPassParent = ref('Да');
const selectedAddress = ref('Нет');
const selectedPass = ref('Да');
const surname = ref('');
const name = ref('');
const patronomyc = ref('');
const patronomycLat = ref('');
const nameLat = ref('');
const surnameLat = ref('');
const birth = ref('');
const nameParent = ref('');
const surnameParent = ref('');
const birthParent = ref('');
const phoneParent = ref('');
const patronomycParent = ref('');
const selectedMilitary = ref(0);
const selectedParent = ref(0);
const passInputP = ref('');
const PassIdParent = ref('');
const localParent = ref('');
const passDateP = ref('');
const AddresParent = ref('');
const phoneContact = ref('');
const emailContact = ref('');
const localityContact = ref('');
const regionContact = ref('');
const socialsVk = ref('');
const socialsTg = ref('');
const addresContact = ref('');
const regionFact = ref('');
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
const educationOrg = ref('');
const speciality = ref('');
const course = ref('');
const facultet = ref('');

const rules = computed(() => ({
    surname: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    surnameParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    name: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    nameParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    birth: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    birthParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    phoneParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    AddresParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    localParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    passDateP: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    passInputP: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    PassIdParent: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    phoneContact: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    emailContact: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        email: helpers.withMessage('Вы ввели неверный email', emailContact),
    },

    regionContact: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    localityContact: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    addresContact: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    passNumber: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    passDate: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    snils: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    inn: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    passOrg: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    educationOrg: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    course: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
}));

const v = useVuelidate(rules, {
    surname,
    name,
    birth,
    birthParent,
    nameParent,
    surnameParent,
    phoneParent,
    passDateP,
    passInputP,
    localParent,
    AddresParent,
    PassIdParent,
    phoneContact,
    emailContact,
    regionContact,
    localityContact,
    addresContact,
    passNumber,
    passDate,
    snils,
    inn,
    passOrg,
    educationOrg,
    course,
});
</script>
<style lang="scss" scoped>
.accordion {
    &-form {
    }
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
.btn {
    background-color: white;
    font-size: 16px;
    color: #35383f;
    border-radius: 10px;
    padding: 16px 40px 16px 40px;
    border: 2px solid #35383f;
    margin-right: 20px;
    cursor: pointer;
    margin: 0px;
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
    background: url(../images/icons/angel-down.svg) no-repeat right;
    appearance: none;
    background-position-x: calc(100% - 16px);
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
    background: url(../images/icons/angel-down.svg) no-repeat right;
    appearance: none;
    background-position-x: calc(100% - 16px);
}

.how {
    display: grid;
    grid-template-columns: 1.5fr 1.15fr;
}

.RSO-blanks {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    padding: 40px 40px 0px 40px;
}

.dowmload-all a {
    color: #1c5c94;
    text-decoration: none;
}
.RSO-blanks__title {
    font-size: 20px;
    font-weight: bold;
    width: 878px;
    margin-bottom: 40px;
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
}

.RSO-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 40px;
}

.no-RSO-foreign {
    display: none;
}

.yes-RSO-foreign {
  display: none;
}
</style>
