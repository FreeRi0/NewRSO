<template>
    <div class="d-flex justify-end align-self-center">
        <v-card>
            <v-card-title class="text-center"
                >Вход в личный кабинет</v-card-title
            >

            <v-form action="#" method="post" @submit.prevent="LoginUser">
                <v-card-text class="text-center goReg"
                    >У вас еще нет аккаунта?
                    <router-link class="authLinks" to="/Register"
                        >Зарегистрироваться</router-link
                    >
                </v-card-text>

                <Input
                    placeholder="Логин"
                    name="login"
                    v-model:value="data.username"
                    class="username-input"
                />

                <p class="error" v-if="isError.username">
                    {{ '' + isError.username }}
                </p>
                <v-text-field
                    class="password-input"
                    :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    v-model="data.password"
                    placeholder="Пароль"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>

                <p class="error" v-if="isError.password">
                    {{ '' + isError.password }}
                </p>

                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
                </p>

                <Button
                    class="login_btn"
                    type="submit"
                    label="Войти"
                    :loaded="isLoading"
                    :disabled="isLoading"
                    color="primary"
                ></Button>

                <v-card-text class="text-center"
                    >Забыли пароль?
                    <router-link class="authLinks" to="/RecoveryPass"
                        >Восстановить</router-link
                    ></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore);
const data = ref({
    username: '',
    password: '',
});
const visible = ref(false);

const isError = ref([]);
const isLoading = ref(false);
const swal = inject('$swal');
const router = useRouter();

const LoginUser = async () => {
    try {
        isLoading.value = true;
        const response = await HTTP.post('/token/login/', data.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        data.value = response.data;
        localStorage.setItem('Token', response.data.auth_token);
        console.log(response.data);
        isLoading.value = false;
        router.push({
            name: 'mypage',
        });
        userStore.getUser();
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
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

<style lang="scss">
.justify-end {
    @media screen and (max-width: 768px) {
        justify-content: center !important;
    }
}

.v-field {
    border-radius: 10px;
}

.v-field.v-field--appended {
    --v-field-padding-end: 10px;
}

.v-field--variant-outlined,
.v-field--single-line,
.v-field--no-label {
    --v-field-padding-top: 5px;
}
.login_btn {
    margin-top: 40px;
}

.v-card-title {
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
    padding-top: 0rem;
    @media screen and (max-width: 575px) {
        font-size: 28px;
    }
}
.v-card-text {
    padding: 0;
    font-size: 18px;
    @media screen and (max-width: 575px) {
        font-size: 16px;
    }
}

.goReg {
    margin-bottom: 20px;
}
.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}

.password-input {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    color: #35383f;
    font-weight: normal;
    font-family: 'Bert Sans';
}

.password-input::placeholder {
    color: #898989;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert-Sans';
}

.v-card {
    padding: 98px;
    @media screen and (max-width: 768px) {
        padding: 60px 98px;
    }
    @media screen and (max-width: 575px) {
        padding: 60px 16px;
    }
}

.password-input input.v-field__input::placeholder {
    color: #a3a3a3;
    opacity: revert;
    font-weight: lighter;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}
.v-input__control {
    font-weight: 500;
}

.authLinks {
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
}
:global(.v-input__control) {
    min-height: 45px;
    font-weight: 500;
}
:global(.v-text-field input.v-field__input) {
    padding: 12px 6px 9px 16px;
}

.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
    border-radius: 10px;
}
@media ((max-width: 768px)) {
    .AuthWrapper {
        min-height: 0;
        padding: 100px 0;
    }
}
@media ((max-width: 550px)) {
    .AuthWrapper {
        padding: 60px 0;
    }
}
</style>
