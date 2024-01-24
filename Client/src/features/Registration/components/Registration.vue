<template>
    <div class="wrap">
        <v-card class="regWrapper">
            <v-card-title class="text-h4 text-center regTitle"
                >Регистрация</v-card-title
            >
            <v-form action="#" method="post" @submit.prevent="RegisterUser">
                <Select
                    variant="outlined"
                    clearable
                    class="regSelect"
                    name="select_region"
                    id="select-region"
                    placeholder="Регион ОО"
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
                <!-- <v-checkbox
                    v-model="form.personal_data_agreement"
                    label="Даю согласие на обработку моих  персональных данных в соответствии с законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных."
                ></v-checkbox> -->
                <div class="regCheck">
                    <input
                        v-model="form.personal_data_agreement"
                        type="checkbox"
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
                    :disabled="isLoading"
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

// a {

// }
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
