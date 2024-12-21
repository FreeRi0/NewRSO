<template>
    <div class="wrap">
        <v-card class="regWrapper">
            <v-card-title class="text-h4 text-center regTitle">Регистрация</v-card-title>
            <v-form action="#" method="post" @submit.prevent="handleSubmit">
                <regionsDropdown open-on-clear id="reg" name="regdrop" placeholder="Выберите регион обучения"
                    v-model="form.region" @update:value="changeValue" class="mb-2 region-input" address="/regions/">
                </regionsDropdown>
                <Input placeholder="Фамилия" name="surname" height="40px" v-model:value.trim="form.last_name"
                    maxlength="25" pattern="[а-яА-ЯЁё\s]+" error-message="Введите не более 25 букв на кириллице" />
                <!-- <p class="error" v-if="isError.last_name">
                    {{ isError.last_name }}
                </p> -->
                <ErrorMessage :error="isError.last_name" />
                <Input placeholder="Имя" name="name" height="40px" v-model:value.trim="form.first_name" maxlength="20"
                    pattern="[а-яА-ЯЁё\s]+" error-message="Введите не более 20 букв на кириллице" />
                <!-- <p class="error" v-if="isError.first_name">
                    {{ isError.first_name }}
                </p> -->
                <ErrorMessage :error="isError.first_name" />
                <Input placeholder="Отчество (при наличии)" name="patronomyc" height="40px" maxlength="23"
                    pattern="[а-яА-ЯЁё\s]+" error-message="Введите не более 23 букв на кириллице"
                    v-model:value.trim="form.patronymic_name" />
                <div class="form-input">
                    <MaskInput type="tel" placeholder="+7 (999) 999-99-99" name="phone" class="mb-2 phone-input"
                        v-model="form.phone_number" mask="+7(###) ###-##-##" />
                </div>
                <Input placeholder="Электронная почта" name="email" type="email" height="40px" maxlength="256"
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+"
                    error-message="Введите адрес электронной почты в формате mail@example.com не более 256 символов на латинице"
                    v-model:value.trim="form.email" />
                <ErrorMessage :error="isError.email" />

                <date-picker v-model:value="form.date_of_birth" placeholder="Дата рождения" name="date" type="date"
                    :disabled-date="disableOutOfRangeDates" class="dateInput" value-type="date" :lang="langObject"
                    format="DD-MM-YYYY" :clearable="false"></date-picker>
                <!-- <p class="error" v-if="isError.date_of_birth">
                    Дата рождения в формате ДД.ММ.ГГГГ
                </p> -->
                <ErrorMessage :error="isError.date_of_birth" />
                <Input placeholder="Придумайте логин" name="login" height="40px" minlength="8" maxlength="20"
                    pattern="[a-zA-Z0-9.+-_@]+"
                    error-message="Введите от 8 до 20 символов на латинице, чисел и символы @ . + - _"
                    v-model:value.trim="form.username" />
                <!-- <p class="error" v-if="isError.username">
                    {{ isError.username }}
                </p> -->
                <ErrorMessage :error="isError.username" />

                <passwordInput class="mb-2" placeholder="Придумайте пароль" maxlength="20" minlength="8"
                    pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d.+-_@]{1,}$"
                    error-message="Введите от 8 до 20 символов на латинице, чисел и символы @ . + - _"
                    v-model:value="form.password" />
                <ErrorMessage :error="isError.password" />

                <passwordInput placeholder="Повторите пароль" maxlength="20" minlength="8" pattern="[a-zA-Z0-9.+-_@]+"
                    error-message="Введите от 8 до 20 символов на латинице, чисел и символы @ . + - _"
                    v-model:value="form.re_password" />
                <!-- <p class="error" v-if="isError.re_password">
                    {{ isError.re_password }}
                </p>
                <p class="error" v-else-if="isError.non_field_errors">
                    Пароли не совпадают
                </p> -->
                <ErrorMessage :error="isError.re_password" />
                <ErrorMessage :error="isError.non_field_errors" />


                <div class="regCheck">
                    <input v-model="form.personal_data_agreement" type="checkbox" @change="handleTermsState" />
                    <div class="regCheck_text">
                        Даю согласие на обработку моих персональных данных в
                        соответствии с законом от 27.07.2006 года № 152-ФЗ «О
                        персональных данных», на условиях и для целей,
                        определенных в Согласии на обработку персональных
                        данных.
                    </div>
                </div>

                <Button label="Зарегистрироваться" :loaded="isLoading" :disabled="isLoading ||
                    !form.personal_data_agreement ||
                    !form.region
                    " type="submit" color="primary">
                </Button>

                <div class="text-center goLog">
                    <router-link class="Reg_link ml-1" to="/">У меня уже есть аккаунт</router-link>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, passwordInput } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { Select, regionsDropdown } from '@shared/components/selects';
import { ErrorMessage } from '@shared/components/inputs';
import { useRegistration } from '@services/useRegister';

const { form,
    isLoading,
    isError,
    validated,
    termsError,
    handleTermsState,
    registerUser, } = useRegistration();

const router = useRouter();

const handleSubmit = async () => {
    if (await registerUser()) {
        router.push({ name: 'Login' });
    }
};

const today = new Date();

const maxDate = computed(() => {
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - 13);
    return date;
});

const minDate = computed(() => {
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - 100);
    return date;
});

const disableOutOfRangeDates = (date) => {
    return date > maxDate.value || date < minDate.value;
};

const langObject = {
    formatLocale: {
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        firstDayOfWeek: 1,
        firstWeekContainsDate: 1,
    }
};
</script>

<style lang="scss">
.btn {
    margin: 60px auto;
    margin-bottom: 15px;
}

.regWrapper {
    padding-top: 60px;
    padding-bottom: 60px;
    max-width: 580px;

    @media screen and (max-width: 768px) {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    @media screen and (max-width: 575px) {
        max-width: 328px;
    }
}

.Reg_link {
    text-decoration: underline;
    font-family: 'Bert Sans';
    color: #35383F;
    font-size: 18px;
    font-weight: 500;
}

.regCheck {
    margin-top: 20px;
    display: flex;
    margin-bottom: 28px;

    input {
        width: 20px;
        height: 20px;
        border: 1px solid #35383f;
    }

    &_text {
        max-width: 354px;
        font-size: 14px;
        color: #35383f;
        font-weight: 500;
        margin-left: 8px;

        @media screen and (max-width: 575px) {
            max-width: 270px;
        }
    }
}

.wrap {
    display: flex;
    justify-content: end;

    @media screen and (max-width: 768px) {
        justify-content: center;
    }
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}

.phone-input {
    height: 40px;
}


.region-input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    color: hsl(222, 9%, 23%);
    font-family: 'Bert Sans';
    margin-bottom: 8px;
}

.region-input::placeholder {
    color: #898989;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Bert Sans';
    margin-bottom: 8px;
}

.v-card {
    padding-left: 100px;
    padding-right: 100px;
    border-radius: 10px;
    box-shadow: 0px 4px 30px 0px #0000000D;

    @media screen and (max-width: 575px) {
        padding-left: 16px;
        padding-right: 16px;
    }
}

.regTitle {
    padding: 0rem 1rem;
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;

    @media screen and (max-width: 575px) {
        font-size: 32px;
    }
}

.regSelect {
    margin-left: 0px;
    border: 1px solid #a3a3a3;
    margin-bottom: 10px;
}

.v-selection-control {
    align-items: baseline;
}

.goLog {
    font-family: 'Bert Sans';
    font-size: 18px;
    font-weight: 400;
    color: #35383F;
}

#reg,
#input-3,
#input-5 {
    color: #a3a3a3;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    font-family: 'Bert Sans';
}

#reg {
    padding-top: 5px;
}

.v-autocomplete .v-field--dirty .v-autocomplete__selection {
    color: #000;
}

.RegisterWrapper {
    min-height: 100vh;
    background-image: url(/assets/regBR.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;
    padding-top: 60px;
    padding-bottom: 60px;

    @media screen and (max-width: 1440px) {
        background-image: url(/assets/regBR1440.jpg);
    }

    @media screen and (max-width: 1024px) {
        background-image: url(/assets/regBR1024.jpg);
    }

    @media screen and (max-width: 768px) {
        background-image: none;
        background-color: #d1d5d8;
    }
}

.option-select__title {
    font-family: 'Bert Sans';
}

input {
    font: normal;
}

.form-input input,
.dateInput input {
    box-sizing: border-box;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px 10px 16px;
    font-family: 'Bert Sans';
    width: 100%;
    color: #35383f;
}

.form-input input::placeholder,
.dateInput input::placeholder {
    color: #a3a3a3;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert Sans';
}

.form-input-requisites input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 110px 10px 16px;
    margin-bottom: 20px;
    width: 100%;
}

.dateInput .mx-input:hover,
.dateInput .mx-input:focus {
    border-color: #a3a3a3;
}

.v-autocomplete .v-field--dirty .v-autocomplete__selection {
    color: #35383f;
    font-size: 16px;
    font-family: 'Bert Sans';
    font-weight: 500;
}

.dateInput.mx-datepicker {
    width: 100%;
}

#login {
    margin-top: 6px;
}

.dateInput .mx-input {
    height: 40px;
}

.dateInput.mx-datepicker svg {
    margin-right: 6px;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}

.form-input input:invalid,
.password input:invalid {
    border: red solid 1px;

    &+.error-text {
        display: block;
    }
}
</style>
