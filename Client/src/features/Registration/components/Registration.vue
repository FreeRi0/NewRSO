<template>
    <div class="d-flex justify-end">
        <v-card class="px-14 py-15" max-width="580">
            <v-card-title class="text-h4 text-center">Регистрация</v-card-title>
            <v-form action="#" method="post" @submit.prevent="RegisterUser">

                <SelectRegion></SelectRegion>
                <Input
                    placeholder="Фамилия"
                    name="surname"
                    v-model:value="v.surnameUser.$model"
                    :error="v.surnameUser.$errors"
                />
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value="v.nameUser.$model"
                    :error="v.nameUser.$errors"
                />
                <Input
                    placeholder="Отчество(При наличии)"
                    name="patronomyc"
                    v-model:value="patronomycField"
                />
                <Input
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    name="phone"
                    v-model:value="v.phoneField.$model"
                    :error="v.phoneField.$errors"
                />
                <Input
                    placeholder="Электронная почта"
                    name="email"
                    type="email"
                    v-model:value="v.emailField.$model"
                    :error="v.emailField.$errors"
                />
                <Input
                    placeholder="Придумайте логин"
                    name="login"
                    v-model:value="v.loginField.$model"
                    :error="v.loginField.$errors"
                />
                <PasswordInputVue
                    placeholder="Придумайте пароль"
                    name="password"
                    v-model:value="v.password.$model"
                    :error="v.password.$errors"
                ></PasswordInputVue>
                <PasswordInputVue
                    placeholder="Повторите пароль"
                    name="confirm"
                    v-model:value="v.confirmPassword.$model"
                    :error="v.confirmPassword.$errors"
                ></PasswordInputVue>
                <v-checkbox
                    label="Даю согласие на обработку моих  персональных данных в соответствии с законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных*."
                ></v-checkbox>
                <Button label="Зарегистрироваться" color="primary"></Button>

                <v-card-text class="text-center">
                    <router-link to="/"
                        >У меня уже есть аккаунт</router-link
                    ></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>

<style lang="scss" scoped>
.btn {
    margin: 60px auto;
    margin-bottom: 15px;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
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
import { IMaskDirective } from 'vue-imask';
import {SelectRegion} from '@shared/components/selects'

const surnameUser = ref('');
const nameUser = ref('');
const patronomycField = ref('');
const phoneField = ref('');
const emailField = ref('');
const loginField = ref('');
const password = ref('');
const confirmPassword = ref('');


const rules = computed(() => ({
    surnameUser: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    nameUser: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 2 символа`,
            minLength(2),
        ),
    },
    emailField: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        email: helpers.withMessage('Вы ввели неверный email', email),
    },
    loginField: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 5 символа`,
            minLength(5),
        ),
    },
    phoneField: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
    },
    password: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 5 символов`,
            minLength(5),
        ),
    },
    confirmPassword: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        sameAsPassword: helpers.withMessage(
            `Пароли не совпадают`,
            sameAs(password.value),
        ),
    },
}));

const v = useVuelidate(rules, {
    surnameUser,
    nameUser,
    password,
    confirmPassword,
    phoneField,
    loginField,
    emailField,
});

const router = useRouter();

const RegisterUser = async () => {
    await axios.post('url', {
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(data)
    });
    await router.push('/');
};
</script>
//