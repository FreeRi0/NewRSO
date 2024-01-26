<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex justify-end">
                <v-card class="px-14 py-15" max-width="580">
                    <img
                        src="@/app/assets/icon/cross.svg"
                        alt="cross"
                        class="card_cross"
                        @click="onBack"
                    />
                    <v-card-title class="text-center"
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
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { usePage } from '@shared';

usePage({ isHidden: true });

const router = useRouter();

const data = ref({
    email: '',
});

const submitForm = () => {
    HTTP.post('/reset_password/', data.value, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            data.value = response.data;
            console.log('Пароль сброшен!');
        })
        .catch((error) => {
            console.error('Ошибка сброса пароля', error);
        });
};

const onBack = () => {
    router.back();
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
    cursor: pointer;
}
.v-card-title {
    padding: 0;
    overflow: visible;
}
.v-card-title {
    overflow: visible;
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
    margin-bottom: 20px;
}
.btn {
    margin: 40px auto;
    margin-bottom: 15px;
    padding: 16px 32px;
}
</style>
@shared/components/selects/inputs
