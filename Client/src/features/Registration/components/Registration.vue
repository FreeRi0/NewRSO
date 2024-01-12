<template>
    <div class="d-flex justify-end">
        <v-card class="py-15" max-width="580">
            <v-card-title class="text-h4 text-center">Регистрация</v-card-title>
            <v-form action="#" method="post" @submit.prevent="RegisterUser">
                <Select
                    variant="outlined"
                    clearable
                    name="select_region"
                    id="select-region"
                    placeholder="Москва"
                    v-model="form.region"
                    address="/regions/"
                ></Select>
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
                <p class="error" v-if="isError.email">
                    {{ isError.email }}
                </p>
                <Input
                    name="date"
                    type="date"
                    v-model:value="form.date_of_birth"
                />
                <p class="error" v-if="isError.date_of_birth">
                    {{ isError.date_of_birth }}
                </p>
                <Input
                    placeholder="Придумайте логин"
                    name="login"
                    v-model:value.trim="form.username"
                />
                <p class="error" v-if="isError.username">
                    {{ isError.username }}
                </p>
                <Input
                    type="password"
                    placeholder="Придумайте пароль"
                    name="password"
                    v-model:value.trim="form.password"
                ></Input>
                <p class="error" v-if="isError.password">
                    {{ isError.password }}
                </p>
                <Input
                    type="password"
                    placeholder="Повторите пароль"
                    name="confirm"
                    v-model:value.trim="form.re_password"
                ></Input>
                <p class="error" v-if="isError.re_password">
                    {{ isError.re_password }}
                </p>
                <p class="error" v-else-if="isError.non_field_errors">
                    Пароли не совпадают
                </p>
                <v-checkbox
                    v-model="form.personal_data_agreement"
                    label="Даю согласие на обработку моих  персональных данных в соответствии с законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных."
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
.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}
.v-card {
    padding-left: 100px;
    padding-right: 100px;
}
.v-card-title {
    padding: 0rem 1rem;
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
}

a {
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
}
</style>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
import { useVuelidate } from '@vuelidate/core';
import { HTTP } from '@app/http';
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
import { Select } from '@shared/components/selects';

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
    personal_data_agreement: null,
});

const isLoading = ref(false);

const isError = ref([]);
const router = useRouter();
const swal = inject('$swal');

const RegisterUser = async () => {
    isLoading.value = true;
    HTTP.post('/register/', form.value, {
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

        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
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
