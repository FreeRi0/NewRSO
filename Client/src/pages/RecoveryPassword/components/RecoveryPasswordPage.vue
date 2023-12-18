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
                        >Восстановление пароля</v-card-title
                    >
                    <v-form
                        class="LoginForm"
                        action="#"
                        method="post"
                        @submit.prevent="submitForm"
                    >
                        <p>
                            Введите адрес электронной почты, который вы
                            указывали при регистрации. Мы отправим вам ссылку
                            для восстановления пароля.
                        </p>
                        <Input
                            class="recoveryPass__input"
                            placeholder="Введите e-mail"
                            name="email"
                            type="email"
                            v-model:value="data.email"
                        />
                        <Button
                            label="Отправить"
                            color="primary"
                            type="submit"
                        ></Button>
                    </v-form>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { helpers, required, email } from '@vuelidate/validators';
import { IMaskDirective } from 'vue-imask';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

// const rules = computed(() => ({
//     emailField: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         email: helpers.withMessage('Вы ввели неверный email', email),
//     },
// }));

// const v = useVuelidate(rules, {
//     emailField,
// });

const data = ref({
    email: '',
});

const submitForm = () => {
    axios
        .post(
            'http://127.0.0.1:8000/api/v1/users/reset_password/',
            data.value,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        .then((response) => {
            data.value = response.data;
            console.log('Пароль сброшен!');
        })
        .catch((error) => {
            console.error('Ошибка сброса пароля', error);
        });
};
</script>
<style lang="scss" scoped>
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
}
.recoveryPass__input {
    text-indent: 16px;
    margin-top: 20px;
    width: 100%;
}
.recoveryPass__input::placeholder {
    color: #898989;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
p {
    color: #35383f;
    font-family: 'Verdana';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.btn {
    margin: 40px auto;
    margin-bottom: 15px;
    padding: 16px 32px;
}
</style>
@shared/components/selects/inputs