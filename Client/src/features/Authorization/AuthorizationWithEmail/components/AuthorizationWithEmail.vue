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
                    v-model:value="data.nameUser"
                />
                <PasswordInputVue
                    placeholder="Пароль"
                    name="password"
                    v-model:value="data.password"
                ></PasswordInputVue>

                <Button label="Войти" color="primary"></Button>

                <v-card-text class="text-center"
                    >Забыли пароль?
                    <router-link to="/">Восстановить</router-link></v-card-text
                >
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
import axios from 'axios';
import { useRouter } from 'vue-router';

const data = ref({
    nameUser: '',
    password: '',
});



const router = useRouter();

const LoginUser = async () => {
    // await axios.post('url/login', {
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include',
    //     body: JSON.stringify(data),
    // });

    await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    })

    await router.push('/UserPage');
};

// const nameUser = ref('');
// const password = ref('');
</script>
