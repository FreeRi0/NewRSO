<template>
    <div class="container">
        <div class="change_Login">
            <div class="change_Login_title">
                <h2>Ваш логин: login</h2>
                <button>Изменить</button>
            </div>
            <Input
                placeholder="   login"
                name="surname"
                v-model:value="loginChange"
            />
            <Button label="Сохранить" color="primary"></Button>
        </div>
        <div class="change_Password">
            <h2>Изменить пароль</h2>
            <PasswordInputVue
                placeholder="   Введите старый пароль"
                name="password"
                v-model:value="v.passwordChange.$model"
                :error="v.passwordChange.$errors"
            ></PasswordInputVue>
            <PasswordInputVue
                placeholder="   Придумайте новый пароль"
                name="confirm"
                v-model:value="v.confirmPasswordChange.$model"
                :error="v.confirmPasswordChange.$errors"
            ></PasswordInputVue>
            <PasswordInputVue
                placeholder="   Повторите пароль"
                name="confirm"
                v-model:value="v.confirmPasswordChange.$model"
                :error="v.confirmPasswordChange.$errors"
            ></PasswordInputVue>
            <Button label="Сохранить" color="primary"></Button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, PasswordInputVue } from '@shared/components/inputs';
import { useVuelidate } from '@vuelidate/core';
import {
    helpers,
    minLength,
    required,
    maxLength,
    sameAs,
} from '@vuelidate/validators';

const passwordChange = ref('');
const confirmPasswordChange = ref('');
const loginChange = ref('');
const rules = computed(() => ({
    passwordChange: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 5 символов`,
            minLength(5)
        ),
    },
    confirmPasswordChange: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required
        ),
        sameAsPassword: helpers.withMessage(
            `Пароли не совпадают`,
            sameAs(passwordChange.value)
        ),
    },
}));

const v = useVuelidate(rules, {
    passwordChange,
    confirmPasswordChange,
});
</script>
<style lang="scss">
.container {
    max-width: 1000px;
}

.change_Login {
    border: 1px solid #0000001a;
    border-radius: 6px;
    padding: 30px;
}

.change_Password {
    border: 1px solid #0000001a;
    border-radius: 6px;
    padding: 40px;
    margin-top: 40px;
    margin-bottom: 80px;
}

h2 {
    font-family: 'Akrobat';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    color: #35383f;
}

.change_Login_title {
    display: flex;
    justify-content: space-between;
}
</style>
