<template>
    <div class="d-flex justify-end align-self-center">
        <div class="Login">

            <form action="#" class="Login_form" method="post" @submit.prevent="Click">
                <h2 class="Login_title">Вход в личный кабинет</h2>
                <Input placeholder="Логин" name="login" height="40px" v-model:value="data.username"
                    class="username-input mb-3 Login_input" />

                <p class="error" v-if="isError.username">
                    {{ '' + isError.username }}
                </p>

                <passwordInput placeholder="Пароль" v-model:value="data.password" />
                <p class="text-right mt-3 mb-8"><router-link to="/recovery-pass">Забыли пароль?</router-link>
                </p>

                <p class="error" v-if="isError.password">
                    {{ '' + isError.password }}
                </p>

                <p class="error" v-if="isError.non_field_errors">
                    {{ '' + isError.non_field_errors }}
                </p>


                <Button class="Login_btn" type="submit" @click="LoginUser" label="Войти" :loaded="isLoading"
                    :disabled="isLoading" color="primary"></Button>
                <p class="text-center Login_and">или</p>
                <div id="VkIdSdkOAuthList"></div>
                <div class="text-center goReg">У вас нет аккаунта?
                    <router-link class="Login_link ml-1" to="/Register">Зарегистрироваться</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup scoped>
import { ref, inject, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input, passwordInput } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import * as VKID from '@vkid/sdk';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const roleStore = useRoleStore();
const user = storeToRefs(userStore);
const data = ref({
    username: '',
    password: '',
});

// let textVk = document.querySelector('.VkIdSdk_oauth_link_text');
// textVk.textContent = 'войдите через Вк'

const isError = ref([]);
const isLoading = ref(false);
const swal = inject('$swal');
const competition_pk = 1;

const CLIENT_ID = 51915086
const REDIRECT_URL = 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/my-page/'

// const oneTap = new VKID.OneTap();
const oauthList = new VKID.OAuthList();


// VKID.Config.set({
//     app: APP_ID, // Идентификатор приложения.
//     redirectUrl: REDIRECT_URL, // Адрес для перехода после авторизации.
//     state: 'dj29fnsadjsd82...' // Произвольная строка состояния приложения.
// });
VKID.Config.set({
    app: CLIENT_ID, // Идентификатор приложения.
    redirectUrl: REDIRECT_URL, // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
    codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
    scope: 'email phone' // Список прав доступа, которые нужны приложению.
});


const Click = () => {
    // console.log("Click");
}

const LoginUser = async () => {
    try {
        isLoading.value = true;
        const response = await HTTP.post('/jwt/create/', data.value);
        data.value = response.data;
        // console.log(response.data);
        localStorage.setItem('jwt_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        isLoading.value = false;
        router.push({
            name: 'mypage',
        });
        userStore.getUser();
        userStore.getCountApp();
        roleStore.getRoles();
        roleStore.getExperts();
        roleStore.getMyPositions();
        roleStore.getExperts();
        roleStore.getUserParticipantsStatus(competition_pk);


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
    // const container = document.getElementById('VkIdSdkOneTap');
    const container = document.getElementById('VkIdSdkOAuthList');
    const oauthListNames = [
        VKID.OAuthName.VK,
        VKID.OAuthName.MAIL,
        VKID.OAuthName.OK,
    ];
    if (container) {
        oauthList.render({ container: container, oauthList: oauthListNames, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS, styles: { height: 44, borderRadius: 8 } })
            .on(VKID.WidgetEvents.ERROR);
        // oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS });
    }
})

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
