<template>
    <div class="AuthWrapper">
        <v-container>
            <div class="d-flex">
                <v-card class="px-14 py-15" max-width="580">
                    <img
                        src="@/app/assets/icon/cross.svg"
                        alt="cross"
                        class="card_cross"
                        @click="onBack"
                    />
                    <v-card-title class="text-center"
                        >Создание нового пароля</v-card-title
                    >
                    <v-form
                        class="LoginForm"
                        action="#"
                        method="post"
                        @submit.prevent="resetPasswordForm"
                    >
                        <p>
                            Пароль должен быть не короче 8 букв и цифр.
                            Используйте только буквы (a–z, A–Z), цифры и символы
                            ! @ # $ % ^ & * ( ) - _ + = ; : , . / ? \ | ` ~ { }
                        </p>

                        <Input
                            class="creaturePass__input"
                            placeholder="Новый пароль"
                            name="password"
                            v-model:value="new_password"
                        ></Input>
                        <Input
                            class="creaturePass__input"
                            placeholder="Повторите новый пароль"
                            name="confirm"
                            v-model:value="current_password"
                        ></Input>
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
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';

import { Input } from '@shared/components/inputs';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { usePage } from '@shared';

usePage({ isHidden: true });

const route = useRoute();
const router = useRouter();

const user = ref({});
const new_password = ref('');
const current_password = ref('');

const auth = computed(() => ({
    uid: route.params.uid,
    token: route.params.token,
}));
const onBack = () => {
    router.back();
};

const getPrivate = async () => {
    await HTTP.get('/users/me/', {
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
        const response = await HTTP.post('/users/reset_password_confirm/', {
            ...auth.value,
            new_password: new_password.value,
        });
        console.log(response.data);
        localStorage.setItem('Token', response.data.auth_token);
    } catch (error) {
        console.error(error);
    }
};
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
.d-flex {
    justify-content: end;
}

.card_cross {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
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
.v-card-title {
    overflow: visible;
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
    padding-top: 0rem;
    @media screen and (max-width: 575px) {
        font-size: 32px;
    }
}

.LoginForm p {
    color: #35383f;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
}
.creaturePass__input {
    text-indent: 16px;
    width: 100%;
}
@media ((max-width: 768px)) {
    .d-flex {
        justify-content: center;
    }
    .AuthWrapper {
        min-height: 0;
        padding-top: 100px;
        padding-bottom: 138px;
    }
}
@media ((max-width: 625px)) {
    .py-15 {
        padding-top: 60px !important;
        padding-bottom: 40px !important;
    }
    .px-14 {
        padding-right: 40px !important;
        padding-left: 40px !important;
    }
    .card_cross {
        right: 8px;
    }
}
@media ((max-width: 440px)) {
    .px-14 {
        padding-right: 15px !important;
        padding-left: 15px !important;
    }
    .v-card-title {
        font-size: 30px;
    }
}
</style>
@shared/components/selects/inputs
