<template>
    <div class="d-flex justify-end align-self-center">
        <v-card>
            <v-card-title class="text-center"
                >Вход в личный кабинет</v-card-title
            >

            <v-form action="#" method="post" @submit.prevent="LoginUser">
                <v-card-text class="text-center goReg"
                    >У вас еще нет аккаунта?
                    <router-link class="authLinks" to="/Register">Зарегистрироваться</router-link>
                </v-card-text>

                <Input
                    placeholder="Логин"
                    name="login"
                    v-model:value="data.username"
                    class="username-input"
                />

                <p class="error" v-if="isError.username">
                    {{ isError.username }}
                </p>
                <v-text-field
                    class="password-input"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    v-model="data.password"
                    placeholder="Пароль"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
                <!--
                    <Input
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Пароль"
                        name="password"
                        v-model:value="data.password"
                        class="username-password"
                    />
             -->

                <p class="error" v-if="isError.password">
                    {{ isError.password }}
                </p>

                <p class="error" v-if="isError.non_field_errors">
                    {{ isError.non_field_errors }}
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
import { ref, inject, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
// import axios from 'axios';
import { useRouter } from 'vue-router';

const data = ref({
    username: '',
    password: '',
});
const visible = ref(true);

const isError = ref('');
const isLoading = ref(false);
const swal = inject('$swal');
const router = useRouter();
const LoginUser = async () => {
    isLoading.value = true;
    await HTTP.post('/token/login/', data.value)
        .then((response) => {
            data.value = response.data;
            localStorage.setItem('Token', response.data.auth_token);
            HTTP.get(`/rsousers/me/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            })
                .then((response) => {
                    console.log(response);
                    router.push({
                        name: 'userpage',
                        params: { id: response.data.id },
                    });
                })
                .catch(function (error) {
                    console.log('an error occured ' + error);
                });
            console.log(response.data);
            isLoading.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });

            // router.push({ name: 'userpage', params: {id: response.data.id}});
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

<style lang="scss">

.v-field {
    border-radius: 10px;
}

.v-field.v-field--appended {
    --v-field-padding-end: 10px;
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
.login_btn {
    margin-top: 40px;
}

// .showPass {
//     border: none;
//     background-color: transparent;
//     cursor: pointer;
//     margin-left: -30px;
// }

.v-card-title {
    padding: 0rem 1rem;
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
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    color: #35383f;
    font-weight: normal;
    font-family: 'Bert-Sans';
}

.password-input::placeholder {
    color: #898989;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert-Sans';
}



.v-card {
    padding: 105px 98px;
    @media screen and (max-width: 768px) {
        padding: 60px 98px;
    }
    @media screen and (max-width: 575px) {
        padding: 60px 16px;
    }
}

.authLinks {
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
}
</style>
