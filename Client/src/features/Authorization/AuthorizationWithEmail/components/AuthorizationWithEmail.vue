<template>
    <div class="d-flex justify-end">
        <v-card class="px-14 py-15" max-width="586">
            <v-card-title class="text-h4 text-center"
                >Вход в личный кабинет</v-card-title
            >
            <v-card-text class="text-center"
                >У вас еще нет аккаунта?
                <router-link to="/Register">Зарегистрироваться</router-link>
            </v-card-text>
            <v-form action="#" method="post" @submit.prevent="LoginUser">
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value="data.username"
                />
                <PasswordInputVue
                    placeholder="Пароль"
                    name="password"
                    v-model:value="data.password"
                ></PasswordInputVue>

                <!-- <Button label="Войти" color="primary"></Button> -->
                <button>Войти</button>
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
import axios from 'axios';
import { useRouter } from 'vue-router';

const data = ref({
    username: '',
    password: '',
});

const users = ref([]);

const swal = inject('$swal');
const router = useRouter();

const LoginUser = async () => {
    axios
        .post('api/v1/token/login/', data.value  )
        .then((response) => {
            data.value = response.data;
            localStorage.setItem('Token', response.data.token );
           console.log(response.data)
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/UserPage');
        })

        .catch((error) => {
            console.error('There was an error!', error);
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
