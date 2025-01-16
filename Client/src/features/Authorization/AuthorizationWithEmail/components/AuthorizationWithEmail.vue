<template>
    <div class="d-flex justify-end align-self-center">
        <div class="Login">
            <form class="Login_form" @submit.prevent="handleSubmit">
                <h2 class="Login_title">Вход в личный кабинет</h2>
                <Input placeholder="Логин" name="login"  height="40px" v-model:value="formData.username"
                    class="username-input mb-3 Login_input" />
                <ErrorMessage :error="errors.username" />

                <passwordInput placeholder="Пароль" v-model:value="formData.password" />
                <p class="text-right mt-3 mb-8">
                    <router-link to="/recovery-pass">Забыли пароль?</router-link>
                </p>
                <ErrorMessage :error="errors.password" />
                <ErrorMessage :error="errors.non_field_errors" />

                <Button class="Login_btn" type="submit" label="Войти" :loaded="isLoading" :disabled="isLoading"
                    color="primary" />
                <p class="text-center Login_and">или</p>
                <div id="VkIdSdkOAuthList"></div>
                <p class="text-center goReg">
                    У вас нет аккаунта?
                    <router-link class="Login_link ml-1" to="/Register">Зарегистрироваться</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script  setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@shared/components/buttons';
import { Input, passwordInput } from '@shared/components/inputs';
import { useAuth } from '@services/useAuth';
import { useVkAuth } from '@services/useVkAuth';
import {ErrorMessage} from '@shared/components/inputs';

const router = useRouter();
const { loginUser, formData, errors, isLoading } = useAuth();
const { initVkAuth } = useVkAuth();

const handleSubmit = async () => {
    if (await loginUser()) {
        router.push({ name: 'mypage' });
    }
};

onMounted(() => {
    initVkAuth();
});
</script>

<style lang="scss" scoped>
.justify-end {
    @media screen and (max-width: 768px) {
        justify-content: center !important;
    }
}


.Login {
    background-color: #FFFFFF;
    box-shadow: 0px 4px 30px 0px #0000000D;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;

    &_title {
        font-size: 40px;
        font-weight: 600;
        font-family: 'Akrobat';
        line-height: 28px;
        margin-bottom: 48px;
        text-align: center;

        @media screen and (max-width: 575px) {
            font-size: 32px;
            margin-bottom: 40px;
        }
    }

    &_form {
        padding: 80px 60px;
        width: 100%;

        @media screen and (max-width: 1024px) {
            padding: 68px 60px;
        }

        @media screen and (max-width: 1024px) {
            padding: 48px 16px;
        }

    }



    &_btn {
        border-radius: 8px !important;
        width: 100%;
        margin: 0px;
        height: 44px;
        padding: 0px 24px !important;

    }

    &_and {
        margin: 20px 0px;
        color: #A3A3A3;
        font-weight: 400;
        font-family: 'Bert Sans';
    }


    &_link {
        text-decoration: underline;
        font-family: 'Bert Sans';
        color: #35383F;
        font-size: 18px;
        font-weight: 500;
    }

    &_input {
        border-radius: 8px !important;
    }
}


.v-field {
    border-radius: 8px;
}

.goReg {
    margin-top: 40px;
}

.v-field.v-field--appended {
    --v-field-padding-end: 10px;
}

.v-field--variant-outlined,
.v-field--single-line,
.v-field--no-label {
    --v-field-padding-top: 5px;
}



.v-card-title {
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
    padding-top: 0rem;

    @media screen and (max-width: 575px) {
        font-size: 28px;
    }
}

.v-card-text {
    padding: 0;
    font-size: 18px;

    @media screen and (max-width: 575px) {
        font-size: 16px;
    }
}

.goReg {
    font-family: 'Bert Sans';
    font-size: 18px;
    font-weight: 400;
    color: #35383F;

}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}



.v-card {
    padding: 98px;

    @media screen and (max-width: 768px) {
        padding: 60px 98px;
    }

    @media screen and (max-width: 575px) {
        padding: 60px 16px;
    }
}

.password-input input.v-field__input::placeholder {
    color: #a3a3a3;
    font-weight: 500;
    font-family: 'Bert-Sans';
}

.password-input input.v-field__input::placeholder,
.option-select .v-field__input input::placeholder {
    color: #a3a3a3;
    opacity: revert;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}

.authLinks {
    text-decoration: underline;
    font-weight: bold;
    font-size: 18px;
}


.VkIdWebSdk__button_mltngh {
    border-radius: 10px;
}

#flelhu .VkIdWebSdk__button_flelhu {
    border-radius: 10px;
}

@font-face {
    font-family: 'Akrobat';
    src: url('@app/assets/fonts/Akrobat.woff2');
}

@media ((max-width: 768px)) {
    .AuthWrapper {
        min-height: 0;
        padding: 100px 0;
    }
}

@media ((max-width: 550px)) {
    .AuthWrapper {
        padding: 60px 0;
    }
}
</style>
