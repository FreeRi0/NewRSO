<template>
    <div class="d-flex justify-end">
        <v-card class="px-14 py-15" max-width="586">
            <v-card-title class="text-h4 text-center"
                >Вход в личный кабинет</v-card-title
            >

            <v-form action="#" method="post" @submit.prevent="LoginUser">
                <v-card-text class="text-center"
                    >У вас еще нет аккаунта?
                    <router-link to="/Register">Зарегистрироваться</router-link>
                </v-card-text>
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value="data.username"
                    class="username-input"
                />

                <p v-if="isError">{{ isError }}</p>
                <PasswordInputVue
                    placeholder="Пароль"
                    name="password"
                    v-model:value="data.password"
                ></PasswordInputVue>

                <p v-if="isError">{{ isError }}</p>
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
                    <router-link to="/">Восстановить</router-link></v-card-text
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
const isError = ref(null);
const isLoading = ref(false);
const swal = inject('$swal');
const router = useRouter();
const LoginUser = async () => {
    isLoading.value = true;
    HTTP.post('/token/login/', data.value)
        .then((response) => {
            data.value = response.data;
            localStorage.setItem('Token', response.data.auth_token);
            console.log(response.data);
            isLoading.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/UserPage');
            // router.push({ name: 'userpage'});
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
    padding-top: 2rem;
}

.v-card-text {
    padding: 0;
    padding-bottom: 2rem;
}
</style>
@shared/components/selects/inputs