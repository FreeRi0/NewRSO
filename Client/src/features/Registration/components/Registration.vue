<template>
    <div class="d-flex justify-end">
        <v-card class="px-14 py-15" max-width="580">
            <v-card-title class="text-h4 text-center">Регистрация</v-card-title>
            <v-form @submit.prevent="RegisterUser">
                <SelectRegion v-model:value="data.selectRegion"></SelectRegion>
                <Input
                    placeholder="Фамилия"
                    name="surname"
                    v-model:value="data.surnameUser"
                />
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value="data.userName"
                />
                <Input
                    placeholder="Отчество(При наличии)"
                    name="patronomyc"
                    v-model:value="data.patronomycField"
                />
                <Input
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    name="phone"
                    v-model:value="data.phoneField"
                />
                <Input
                    placeholder="Электронная почта"
                    name="email"
                    type="email"
                    v-model:value="data.email"
                />
                <Input
                    placeholder="Придумайте логин"
                    name="login"
                    v-model:value="data.login"
                />
                <PasswordInputVue
                    placeholder="Придумайте пароль"
                    name="password"
                    v-model:value="data.password"
                ></PasswordInputVue>
                <!-- <PasswordInputVue
                    placeholder="Повторите пароль"
                    name="confirm"
                    v-model:value="v.confirmPassword.$model"
                    :error="v.confirmPassword.$errors"
                ></PasswordInputVue> -->
                <v-checkbox
                    label="Даю согласие на обработку моих  персональных данных в соответствии с законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных*."
                ></v-checkbox>
                <!-- <Button label="Зарегистрироваться" color="primary"></Button> -->
                <button>Зарегистрироваться</button>

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
import { SelectRegion } from '@shared/components/selects';

const data = ref({
    selectRegion: 'Москва',
    surnameUser: '',
    userName: '',
    phoneField: '',
    patronomycField: '',
    emailField: '',
    loginField: '',
    password: '',
});

// const surnameUser = ref('');
// const nameUser = ref('');
// const patronomycField = ref('');
// const phoneField = ref('');
// const = ref('');
// const loginField = ref('');
// const password = ref('');

// const confirmPassword = ref('');

// const selectRegion = ref('');

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
//     selectRegion: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
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
//     selectRegion
// });

const router = useRouter();

const RegisterUser = async () => {
    //     await axios
    //         .post('http://localhost:5000/api/user/register', data)
    //         .then((response) => {
    //             router.push('/UserPage');
    //             console.log('You logged');
    //         })
    //         .catch(function (error) {
    //             console.log('an error occured ' + error);
    //       })

    await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    await router.push('/UserPage');
};
</script>
