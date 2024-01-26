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
                        @submit.prevent="resetPasswordForm"
                    >
                        <v-text-field
                            class="password-input"
                            :append-inner-icon="
                                visible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            :type="visible ? 'text' : 'password'"
                            density="compact"
                            v-model="current_password"
                            placeholder="Текущий пароль"
                            variant="outlined"
                            @click:append-inner="visible = !visible"
                        ></v-text-field>
                        <v-text-field
                            class="password-input"
                            :append-inner-icon="
                                visible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            :type="visible ? 'text' : 'password'"
                            density="compact"
                            v-model="new_password"
                            placeholder="Новый пароль"
                            variant="outlined"
                            @click:append-inner="visible = !visible"
                        ></v-text-field>
                        <p>
                            Пароль должен быть не короче 8 букв и цифр.
                            Используйте только буквы (a–z, A–Z), цифры и символы
                            ! @ # $ % ^ & * ( ) - _ + = ; : , . / ? \ | ` ~ { }
                        </p>

                        <Button
                            label="Сохранить"
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
import { ref, computed } from 'vue';
import axios from 'axios';
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import { helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

// const rules = computed(() => ({
//     password: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         minLength: helpers.withMessage(
//             `Минимальная длина: 5 символов`,
//             minLength(5),
//         ),
//     },
//     confirmPassword: {
//         required: helpers.withMessage(
//             `Поле обязательно для заполнения`,
//             required,
//         ),
//         sameAsPassword: helpers.withMessage(
//             `Пароли не совпадают`,
//             sameAs(password.value),
//         ),
//     },
// }));

// const v = useVuelidate(rules, {
//     password,
//     confirmPassword,
// });
//
//
//
// const data = ref({
//     new_password: '',
//     current_password: '',
// });

// const resetPasswordForm = () => {
//     if (data.new_password === data.current_password) {
//         HTTP.post('/users/set_password/', data.value)
//             .then((response) => {
//                 data.value = response.data;
//                 localStorage.setItem('Token', response.data.auth_token);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     } else {
//         // Обработка случая, когда пароли не совпадают
//     }
// };
const user = ref({});
const new_password = ref('');
const current_password = ref('');
const token = localStorage.getItem('Token');

const uid = user.value.id;

const data = ref({
    uid,
    token,
    new_password: new_password.value,
});

const getPrivate = async () => {
    await HTTP.get('/rsousers/me/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

getPrivate();

const resetPasswordForm = async () => {
    if (new_password.value !== current_password.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post(
            '/users/reset_password_confirm/',
            data,
        );
        console.log(response.data);
        localStorage.setItem('Token', response.data.auth_token);
    } catch (error) {
        console.error(error);
    }
};

// const user = ref({
//   uid: $route.query.uid || '',
//   token: $route.query.token || '',
//   newPassword: '',
// });

// const createPassword = async () => {
//   try {
//     const response = await axios.post('/users/reset_password_confirm/', user);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };
</script>
<style lang="scss">
.btn {
    margin: 40px auto;
    margin-bottom: 15px;
    padding: 16px 32px;
}

.v-field {
    border-radius: 10px;
}

.v-field.v-field--appended {
    --v-field-padding-end: 10px;
}

.v-input--density-compact .v-field--variant-outlined,
.v-input--density-compact .v-field--single-line,
.v-input--density-compact .v-field--no-label {
    --v-field-padding-bottom: 10px;
}

.v-field--variant-outlined,
.v-field--single-line,
.v-field--no-label {
    --v-field-padding-top: 5px;
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

.password-input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    color: #35383f;
    font-weight: normal;
    font-family: 'Bert-Sans';
}

.password-input::placeholder {
    color: #898989;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert-Sans';
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
