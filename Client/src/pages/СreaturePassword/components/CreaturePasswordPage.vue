<template>
    <div class="AuthWrapper">
        <v-container>
            <div class="d-flex justify-end">
                <v-card class="px-14 py-15" max-width="580">
                    <img
                        src="@/app/assets/icon/cross.svg"
                        alt="cross"
                        class="card_cross"
                    />
                    <v-card-title class="text-h4 text-center"
                        >Создание нового пароля</v-card-title
                    >
                    <v-form
                        class="LoginForm"
                        action="#"
                        method="post"
                        @submit.prevent="submitForm"
                    >
                        <p>
                            Пароль должен быть не короче 8 букв и цифр.
                            Используйте только буквы (a–z, A–Z), цифры и символы
                            ! @ # $ % ^ & * ( ) - _ + = ; : , . / ? \ | ` ~ { }
                        </p>
                        <PasswordInputVue
                            class="creaturePass__input"
                            placeholder="Новый пароль"
                            name="password"
                            v-model:value="v.password.$model"
                            :error="v.password.$errors"
                        ></PasswordInputVue>
                        <PasswordInputVue
                            class="creaturePass__input"
                            placeholder="Повторите новый пароль"
                            name="confirm"
                            v-model:value="v.confirmPassword.$model"
                            :error="v.confirmPassword.$errors"
                        ></PasswordInputVue>
                        <Button label="Сохранить" color="primary"></Button>
                    </v-form>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { PasswordInputVue } from '@shared/components/inputs';
import { helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

const password = ref('');
const confirmPassword = ref('');

const rules = computed(() => ({
    password: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        minLength: helpers.withMessage(
            `Минимальная длина: 5 символов`,
            minLength(5),
        ),
    },
    confirmPassword: {
        required: helpers.withMessage(
            `Поле обязательно для заполнения`,
            required,
        ),
        sameAsPassword: helpers.withMessage(
            `Пароли не совпадают`,
            sameAs(password.value),
        ),
    },
}));

const v = useVuelidate(rules, {
    password,
    confirmPassword,
});

const submitForm = () => {
    v.value.$touch();
    if (v.value.$error) return;
    alert('Form submitted');
};
</script>
<style lang="scss" scoped>
.btn {
    margin: 40px auto;
    margin-bottom: 15px;
    padding: 16px 32px;
}

.py-15 {
    padding-top: 98px !important;
    padding-bottom: 98px !important;
}
.px-14 {
    padding-right: 98px !important;
    padding-left: 98px !important;
}
.card_cross {
    position: absolute;
    top: 16px;
    right: 16px;
}
.v-card-title {
    padding: 0;
    overflow: visible;
    font-family: 'Akrobat';
}
p {
    color: #35383f;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
}
.text-h4 {
    font-family: 'Akrobat' !important;
    font-size: 40px;
}
</style>
@shared/components/selects/inputs