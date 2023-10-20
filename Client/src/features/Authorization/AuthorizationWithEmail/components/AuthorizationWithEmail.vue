<template>
    <div class="d-flex justify-end mb-6  ">
        <v-card class="mx-auto px-14 py-16 " max-width="586">
            <v-card-title class="text-h4 text-center"
                    >Вход в личный кабинет</v-card-title
                >
                <v-card-text class="text-center"
                    >У вас еще нет аккаунта? <router-link to="/">Зарегистрироваться</router-link>
                </v-card-text>
            <v-form action="#" method="post">
                <Input />

                <PasswordInputVue></PasswordInputVue>
                <div></div>
                <Button>Войти</Button>
                <v-card-text class="text-center">Забыли пароль? <router-link to="/">Восстановить</router-link></v-card-text>
            </v-form>
        </v-card>
        <!-- <v-form action="#" method="post" class="LoginForm">
                <Input />
                <PasswordInputVue></PasswordInputVue>
                <Button>Войти</Button>
            </v-form> -->
    </div>
</template>

<script setup lang="ts">
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { PasswordInputVue } from '@shared/components/inputs';

// pa-md-10 mx-lg-auto
</script>
