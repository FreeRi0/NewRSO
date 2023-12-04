<template>
    <div class="d-flex justify-end">
        <v-card class="px-14 py-15" max-width="580">
            <v-card-title class="text-h4 text-center">Регистрация</v-card-title>
            <v-form action="#" method="post" @submit.prevent="RegisterUser">
                <!-- <SelectRegion v-model="form.region"></SelectRegion> -->
                <Input
                    placeholder="Фамилия"
                    name="surname"
                    v-model:value.trim="form.last_name"
                />
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value.trim="form.first_name"
                />
                <Input
                    placeholder="Отчество(При наличии)"
                    name="patronomyc"
                    v-model:value.trim="form.patronymic_name"
                />
                <Input
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    name="phone"
                    v-model:value.trim="form.phone_number"
                />
                <Input
                    placeholder="Электронная почта"
                    name="email"
                    type="email"
                    v-model:value.trim="form.email"
                />
                <Input
                    name="date"
                    type="date"
                    v-model:value="form.date_of_birth"
                />
                <Input
                    placeholder="Придумайте логин"
                    name="login"
                    v-model:value.trim="form.username"
                />
                <PasswordInputVue
                    placeholder="Придумайте пароль"
                    name="password"
                    v-model:value.trim="form.password"
                ></PasswordInputVue>
                <PasswordInputVue
                    placeholder="Повторите пароль"
                    name="confirm"
                    v-model:value.trim="form.re_password"
                ></PasswordInputVue>
                <v-checkbox
                    label="Даю согласие на обработку моих  персональных данных в соответствии с законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных*."
                ></v-checkbox>

                <Button
                    label="Зарегистрироваться"
                    :loaded="isLoading"
                    :disabled="isLoading"
                    type="submit"
                    color="primary"
                >
              </Button>

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
import { ref, computed, onMounted, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';
import { HTTP } from '@app/http.ts';
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
import { SelectRegion } from '@shared/components/selects';

const form = ref({
    last_name: '',
    first_name: '',
    patronymic_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    username: '',
    password: '',
    re_password: '',
});

const isLoading = ref(false);

// const rules = computed(() => ({
//     surnameUser: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         minLength: helpers.withMessage(
//             `Минимальная длина: 2 символа`,
//             minLength(2),
//         ),
//     },
//     nameUser: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         minLength: helpers.withMessage(
//             `Минимальная длина: 2 символа`,
//             minLength(2),
//         ),
//     },
//     emailField: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         email: helpers.withMessage('Вы ввели неверный email', email),
//     },
//     loginField: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         minLength: helpers.withMessage(
//             `Минимальная длина: 5 символа`,
//             minLength(5),
//         ),
//     },
//     phoneField: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//     },
//     password: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         minLength: helpers.withMessage(
//             `Минимальная длина: 5 символов`,
//             minLength(5),
//         ),
//     },
//     confirmPassword: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         sameAsPassword: helpers.withMessage(
//             `Пароли не совпадают`,
//             sameAs(password.value),
//         ),
//     },
// }));

// const v = useVuelidate(rules, {
//     surnameUser,
//     nameUser,
//     password,
//     confirmPassword,
//     phoneField,
//     loginField,
//     emailField,
// });

const router = useRouter();
const swal = inject('$swal');

const RegisterUser = async () => {
    isLoading.value = true;
    axios
        .post('api/v1/register/', form.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
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

        })

        .catch((error) => {
            console.error('There was an error!', error);
            isLoading.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};
</script>
