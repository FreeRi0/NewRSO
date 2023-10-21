<template>
    <div class="d-flex justify-end mb-6">
        <v-card class="mx-auto px-14 py-16" max-width="586">
            <v-card-title class="text-h4 text-center"
                >Вход в личный кабинет</v-card-title
            >
            <v-card-text class="text-center"
                >У вас еще нет аккаунта?
                <router-link to="/Register">Зарегистрироваться</router-link>
            </v-card-text>
            <v-form action="#" method="post">
                <Input placeholder="Имя" name="name" v-model:value="v.nameUser.$model" :error="v.nameUser.$errors" />
                <Input placeholder="Пароль" name="password" type="password" v-model:value="v.password.$model" :error="v.password.$errors" />
                <Button>Войти</Button>
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
import { useVuelidate } from '@vuelidate/core'
import {helpers, minLength } from '@vuelidate/validators';

const nameUser = ref('');
const password = ref('');

const rules = computed(() => ({
    nameUser: {
        minLength: helpers.withMessage(`Минимальная длина: 2 символа`, minLength(2)),
    },
    password : {
        minLength: helpers.withMessage(`Минимальная длина: 8 символов`, minLength(8)),
    }
}));

const v = useVuelidate(rules, {nameUser, password});


// pa-md-10 mx-lg-auto
</script>
