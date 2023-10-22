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
            <v-form action="#" method="post">
                <Input
                    placeholder="Имя"
                    name="name"
                    v-model:value="nameUser"
                />
                <Input
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    v-model:value="password"
                />
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
import { Input } from '@shared/components/inputs';

const nameUser = ref('');
const password = ref('');
</script>
