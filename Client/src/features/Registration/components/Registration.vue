<template>
    <div class="d-flex justify-end">
        <v-card class=" px-14 py-15" max-width="580">
            <v-card-title class="text-h4 text-center">Регистрация</v-card-title>
            <v-form action="#" method="post" @submit.prevent="submitForm">
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
                <Input
                    placeholder="Придумайте пароль"
                    name="password"
                    type="password"
                    v-model:value="v.password.$model"
                    :error="v.password.$errors"
                />
                <Input
                    placeholder="Повторите пароль"
                    name="confirm"
                    type="password"
                    v-model:value="v.confirmPassword.$model"
                    :error="v.confirmPassword.$errors"
                />
                <Button label="Зарегистрироваться" color="primary"></Button>

                <v-card-text class="text-center">
                    <router-link to="/login"
                        >У меня уже есть аккаунт</router-link
                    ></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { useVuelidate } from '@vuelidate/core';
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
    phoneField : {
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


const submitForm = () => {
  v.value.$touch()
  if (v.value.$error) return
  alert('Form submitted')
}
</script>
