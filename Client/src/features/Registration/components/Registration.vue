<template>
    <div class="wrap">
        <v-card class="regWrapper">
            <v-card-title class="text-h4 text-center regTitle"
                >Регистрация</v-card-title
            >
            <v-form action="#" method="post" @submit.prevent="RegisterUser">
                <regionsDropdown
                    open-on-clear
                    id="reg"
                    name="regdrop"
                    placeholder="Выберите регион обучения"
                    v-model="form.region"
                    @update:value="changeValue"
                    class="mb-2 region-input"
                    address="/regions/"
                ></regionsDropdown>
                <Input
                    placeholder="Фамилия"
                    name="surname"
                    v-model:value.trim="form.last_name"
                />
                <p class="error" v-if="isError.last_name">
                    {{ isError.last_name }}
                </p>
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value.trim="form.first_name"
                />
                <p class="error" v-if="isError.first_name">
                    {{ isError.first_name }}
                </p>
                <Input
                    placeholder="Отчество (при наличии)"
                    name="patronomyc"
                    v-model:value.trim="form.patronymic_name"
                />
                <div class="form-input">
                    <MaskInput
                        type="tel"
                        placeholder="+7 (999) 999-99-99"
                        name="phone"
                        class="mb-2"
                        v-model="form.phone_number"
                        mask="+7(###) ###-##-##"
                    />
                </div>
                <Input
                    placeholder="Электронная почта"
                    name="email"
                    type="email"
                    v-model:value.trim="form.email"
                />
                <p class="error" v-if="isError.email">
                    {{ isError.email }}
                </p>
                <Input
                    name="date"
                    type="date"
                    class="dateInput"
                    placeholder="Дата рождения"
                    v-model:value="form.date_of_birth"
                />
                <p class="error" v-if="isError.date_of_birth">
                    Дата рождения в формате ДД.ММ.ГГГГ
                </p>
                <Input
                    placeholder="Придумайте логин"
                    name="login"
                    v-model:value.trim="form.username"
                />
                <p class="error" v-if="isError.username">
                    {{ isError.username }}
                </p>
                <v-text-field
                    class="password-input"
                    :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    v-model="form.password"
                    placeholder="Придумайте пароль"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
                <p class="error" v-if="isError.password">
                    {{ isError.password }}
                </p>
                <v-text-field
                    class="password-input"
                    :append-inner-icon="!visibleRe ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visibleRe ? 'text' : 'password'"
                    density="compact"
                    v-model="form.re_password"
                    placeholder="Повторите пароль"
                    variant="outlined"
                    @click:append-inner="visibleRe = !visibleRe"
                ></v-text-field>

                <p class="error" v-if="isError.re_password">
                    {{ isError.re_password }}
                </p>
                <p class="error" v-else-if="isError.non_field_errors">
                    Пароли не совпадают
                </p>

                <div class="regCheck">
                    <input
                        v-model="form.personal_data_agreement"
                        type="checkbox"
                        @change="handleTermsState"
                    />
                    <div class="regCheck_text">
                        Даю согласие на обработку моих персональных данных в
                        соответствии с законом от 27.07.2006 года № 152-ФЗ «О
                        персональных данных», на условиях и для целей,
                        определенных в Согласии на обработку персональных
                        данных.
                    </div>
                </div>

                <Button
                    label="Зарегистрироваться"
                    :loaded="isLoading"
                    :disabled="
                        isLoading ||
                        !form.personal_data_agreement ||
                        !form.region
                    "
                    type="submit"
                    color="primary"
                >
                </Button>

                <v-card-text class="text-center goLog">
                    <router-link to="/"
                        >У меня уже есть аккаунт</router-link
                    ></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>
// onfocusin="(this.type='date')" // onfocusout="(this.type='text')"

<style lang="scss">
.v-field {
    border-radius: 10px;
}

.v-field.v-field--appended {
    --v-field-padding-end: 10px;
}
.v-field--prepended {
    padding-inline-start: 0px;
}

.v-input--density-compact .v-field--variant-outlined,
.v-input--density-compact .v-field--single-line,
.v-input--density-compact .v-field--no-label {
    --v-field-padding-bottom: 10px;
}

.v-field--variant-outlined,
.v-field--single-line,
.v-field--no-label {
    --v-field-padding-top: 5px;
}

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

.dateInput {
    height: 48px;
}

.dateInput:before {
    content: attr(placeholder) !important;
    color: #aaa;
    margin-right: 0.5em;
}
.dateInput:focus:before,
.dateInput:valid:before {
    content: '';
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

.password-input,
.region-input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    color: #35383f;
    font-family: 'Bert Sans';
    margin-bottom: 8px;
}

.password-input::placeholder,
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
    a {
        text-decoration: underline;
        font-weight: bold;
        font-size: 18px;
    }
}
.v-field__prepend-inner {
    display: none;
}
#reg,
#input-3,
#input-5 {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
}
#reg {
    padding-top: 5px;
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
.v-input__control {
    min-height: 45px;
    font-weight: 500;
}
.option-select__title {
    font-family: 'Bert sans';
}

input {
    font: normal;
}

.form-input input {
    box-sizing: border-box;
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
    font-family: 'Bert Sans';
    width: 100%;
    color: #35383f;
}

.form-input input::placeholder {
    color: #a3a3a3;
    font-size: 16px;
    color: #a3a3a3;
    font-weight: 500;
    font-family: 'Bert Sans';
}

.form-input-requisites input {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 110px 10px 16px;
    margin-bottom: 20px;
    width: 100%;
}
</style>

<script setup>
import { ref, inject, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { Select, regionsDropdown } from '@shared/components/selects';

const visible = ref(false);
const visibleRe = ref(false);
const validated = ref(false);
const form = ref({
    region: null,
    last_name: '',
    first_name: '',
    patronymic_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    username: '',
    password: '',
    re_password: '',
    personal_data_agreement: false,
});

const isLoading = ref(false);
const isError = ref([]);
const router = useRouter();
const swal = inject('$swal');

const termsError = computed(() => {
    return validated.value && !form.personal_data_agreement;
});
const handleTermsState = () => {
    validated.value = false;
};
const RegisterUser = async () => {
    try {
        isLoading.value = true;
        validated.value = true;
        const response = await HTTP.post('/register/', form.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        form.value = response.data;
        console.log(response.data);
        isLoading.value = false;
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        router.push('/');
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
</script>
