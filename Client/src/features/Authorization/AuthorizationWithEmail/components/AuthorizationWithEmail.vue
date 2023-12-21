<template>
    <div class="d-flex justify-end align-self-center">
        <v-card class="" height="535px">
            <v-card-title class="text-center"
                >Вход в личный кабинет</v-card-title
            >

            <v-form action="#" method="post" @submit.prevent="LoginUser">
                <v-card-text class="text-center"
                    >У вас еще нет аккаунта?
                    <router-link to="/Register">Зарегистрироваться</router-link>
                </v-card-text>
                <Input
                    placeholder="Логин"
                    name="name"
                    v-model:value="data.username"
                    class="username-input"
                />

                <p v-if="isError">{{ isError.username }}</p>
                <Input
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    v-model:value="data.password"
                ></Input>

                <p v-if="isError">{{ isError.password }}</p>
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
                    <router-link to="/RecoveryPass"
                        >Восстановить</router-link
                    ></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
import { HTTP } from '@app/http';
// import axios from 'axios';
import { useRouter } from 'vue-router';

const data = ref({
    username: '',
    password: '',
});

// const user = ref({});
const isError = ref([]);
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

<style lang="scss" scoped>
.login_btn {
    margin-top: 40px;
}

.v-card-title {
    padding: 0rem 1rem;
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
    padding-top: 0rem;
}
.v-card-text {
    padding: 0;
    margin-bottom: 20px;
    font-size: 18px;
}

.v-card {
    padding: 105px 98px;
}

a {
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
}
</style>
