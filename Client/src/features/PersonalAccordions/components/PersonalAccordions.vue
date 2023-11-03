<template>
    <div class="rso-question">
        <div class="rso-question__title">Являетесь членом РСО?</div>
        <div class="checkbox" v-for="answer in answers" :key="answer.id">
            <RadioButton
                :value="answer.name"
                :label="answer.name"
                :id="answer.id"
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
                                        v-model:value="v.phoneParent.$model"
                                        :error="v.phoneParent.$errors"
                                    />
                                </div>
                            </div>

                            <div class="izm" id="passport-parent-yes">
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
                                            name="passParent"
                                            v-model:checkedValue="
                                                selectedPassParent
                                            "
                                        />
                                    </div>
                                </div>

                                <div class="addres" id="pass-no-addr">
                                    Адрес постоянной регистрации
                                </div>

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
                            <label for=""
                                >Регион<span class="valid-red">*</span></label
                            >
                            <SelectRegion></SelectRegion>
                        </div>
                        <div class="form-field">
                    <label for="email-contact">Электронная почта<span class="valid-red">*</span></label>
                    <Input
                      type="email"
                      name="email"
                      id="email-contact mask-email"
                      class="input-big"
                      placeholder="mail@mail.com"
                    />
                  </div>
                  <div class="form-field">
                    <label for="locality-contact">Населенный пункт<span class="valid-red">*</span></label>
                    <Input
                      type="text"
                      name="reg_town"
                      class="input-big"
                      id="locality-contact"
                      placeholder="Москва"
                      />
                  </div>
                  <div class="scoial-networks">
                    <div class="add">
                      <div class="form-field">
                        <label for="socials">Ссылка на ВК</label>
                        <Input
                          name="social_vk"
                          value="{{user.profile.social_vk}}"
                          type="text"
                          id="socials"
                          class="input-big mask-vk"
                          placeholder="https://vk.com/danya_porg"
                        />
                      </div>
                        <div class="form-field">
                        <label for="socials">Ссылка на Телеграм</label>
                        <Input
                          name="social_tg"
                          id="socials"
                          class="input-big mask-tg"
                          placeholder="https://t.me/allenom"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-field">
                    <label for="addres-contact"
                      >Улица, дом, квартира</label
                    >
                    <Input
                      type="text"
                      name="reg_house"
                      id="addres-contact"
                      class="input-big"
                      placeholder="ул. Комсомольская, д. 42, кв. 56"
                    />

                  </div>
                  <div class="checkbox" id="checkbox">
                    <p class="checkbox-title">
                      Адрес фактического проживания совпадает с адресом
                      постоянной регистрации<span class="valid-red">*</span>
                    </p>

                  </div>

                  <div class="addr-fact__wrapper" id="addr-fact">
                    <p class="accordion-block-title small">
                      Адрес фактического проживания
                    </p>
                    <div class="form-field">
                      <label for="">Регион</label>
                      <SelectRegion></SelectRegion>
                    </div>
                    <div class="form-field">
                      <label for="locality-fact">Населенный пункт</label>
                      <Input

                        name="fact_town"

                        id="locality-fact"
                        class="input-big"
                        placeholder="Москва"
                      />

                    </div>
                    <div class="form-field">
                      <label for="addres-fact"
                        >Улица, дом, квартира</label
                      >
                      <Input
                        type="text"
                        name="fact_house"
                        id="addres-fact"
                        class="input-big"
                        placeholder="ул. Комсомольская, д. 42, кв. 56"
                      />

                    </div>
                  </div>
                    </div>
                    <v-card-actions class="form__button-group">
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
                            Оформление
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <div class="form__field-group">
                        <div class="form__field">
                            <label for="squad-slogan"
                                >Девиз отряда
                                <sup class="valid-red">*</sup>
                            </label>
                            <Input
                                id="squad-slogan"
                                label="Девиз отряда"
                                placeholder="Например, через тернии к звездам"
                                name="squad-slogan"
                            />
                        </div>

                        <div class="form__field">
                            <label for="about-squad"
                                >Об отряде
                                <sup class="valid-red">*</sup>
                            </label>
                            <textarea
                                id="about-squad"
                                placeholder="Расскажите об отряде"
                            ></textarea>
                        </div>

                        <!-- <v-col cols="3">
                            <v-text-field
                                v-model="trip.end"
                                label="End date"
                                type="date"
                            ></v-text-field>
                        </v-col>  -->
                    </div>
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
import { ref, computed } from 'vue';
import { RadioButton } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
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
const answers = ref([
    { name: 'Да', id: 'f1' },
    { name: 'Нет', id: 'f2' },
]);

const sexes = ref([
    { name: 'Мужской', id: 's1' },
    { name: 'Женский', id: 's2' },
]);

const passportParent = ref([
    { name: 'Да', id: 'pp1' },
    { name: 'Нет', id: 'pp2' },
]);
const parents = ref([
    {
        value: 'Отец',
        name: 'Отец',
    },
    { value: 'Мать', name: 'Мать' },
]);

const selectedSex = ref('');
const selectedAnswer = ref('');
const selectedPassParent = ref('');
const surname = ref('');
const name = ref('');
const patronomyc = ref('');
const patronomycLat = ref('');
const nameLat = ref('');
const surnameLat = ref('');
const birth = ref(null);
const nameParent = ref('');
const surnameParent = ref('');
const birthParent = ref('');
const phoneParent = ref('');
const patronomycParent = ref('');
const selectedParent = ref(0);
const passInputP = ref('');
const PassIdParent = ref('');
const localParent = ref('');
const passDateP = ref('');
const AddresParent = ref('');
const phoneContact = ref('')

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
    }
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
    phoneContact
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
        grid-column-gap: 182px;
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
    column-gap: 140px;
}
.addres {
    margin-top: 55px;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    font-family: 'Bert-Sans', sans-serif;
    font-weight: 600;
}
</style>
