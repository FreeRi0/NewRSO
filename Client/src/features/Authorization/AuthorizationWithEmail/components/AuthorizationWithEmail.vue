<template>
    <div class="d-flex justify-end align-self-center">
        <div class="Login">

            <form action="#" class="Login_form" method="post" @submit.prevent="LoginUser">
                <h2 class="Login_title">Вход в личный кабинет</h2>
                <Input placeholder="Логин" name="login" height="40px" v-model:value="data.username"
                    class="username-input mb-3 Login_input" />

                <p class="error" v-if="isError.username">
                    {{ '' + isError.username }}
                </p>
                <v-text-field class="password-input" :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" v-model="data.password" placeholder="Пароль"
                    variant="outlined" @click:append-inner="visible = !visible"></v-text-field>
                <p class="text-right mt-3"><router-link to="/RecoveryPass">Забыли пароль?</router-link>
                </p>

                <p class="error" v-if="isError.password">
                    {{ '' + isError.password }}
                </p>

                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
                </p>


                <Button class="Login_btn" type="submit" label="Войти" :loaded="isLoading" :disabled="isLoading"
                    color="primary"></Button>
                <p class="text-center Login_and">или</p>
                <div id="VkIdSdkOneTap"></div>
                <div class="text-center goReg">У вас нет аккаунта?
                    <router-link class="Login_link ml-1" to="/Register">Зарегистрироваться</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store/index';
import * as VKID from '@vkid/sdk';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const user = storeToRefs(userStore);
const data = ref({
    username: '',
    password: '',
});
const visible = ref(false);

const isError = ref([]);
const isLoading = ref(false);
const swal = inject('$swal');

const APP_ID = 51932483
const REDIRECT_URL = 'https://rso.sprint.1t.ru/MyPage'
const oneTap = new VKID.OneTap();


VKID.Config.set({
    app: APP_ID, // Идентификатор приложения.
    redirectUrl: REDIRECT_URL, // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82...' // Произвольная строка состояния приложения.
});


const LoginUser = async () => {
    try {
        isLoading.value = true;
        const response = await HTTP.post('/token/login/', data.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        data.value = response.data;
        localStorage.setItem('Token', response.data.auth_token);
        console.log(response.data);
        isLoading.value = false;
        router.push({
            name: 'mypage',
        });
        userStore.getUser();
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        isLoading.value = false;
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

onMounted(() => {
    const container = document.getElementById('VkIdSdkOneTap');
    console.log(container, oneTap)
    if (container) {
        console.log(container, oneTap)
        // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
        oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS });
    }
})

</script>


<style lang="scss">
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
    max-height: 592px;

    &_title {
        font-size: 40px;
        font-weight: 600;
        font-family: 'Akrobat';
        line-height: 48px;
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
        width: 100%;
        margin: 0px;
        height: 44px;
        margin-top: 40px;
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
}


.v-field {
    border-radius: 10px;
}

.password-input {
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-size: 16px;
    height: 40px;
    color: #35383f;
    font-family: 'Bert Sans';
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


.password-input::placeholder {
    color: #898989;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert-Sans';
}

.password-input:focus {
    outline: none;
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
    opacity: revert;
    font-weight: lighter;
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



.v-text-field input.v-field__input {
    padding: 0px 6px 6px 16px;
}

// :global(.v-input__control) {
//     min-height: 40px !important;
//     font-weight: 400;
// }


:global(.v-text-field .v-field--no-label input,
    .v-text-field .v-field--active input) {
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
