<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex justify-end">
                <v-card class="px-14 py-15">
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
import { ref, inject } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { usePage } from '@shared';

usePage({ isHidden: true });

const isError = ref('');
const isLoading = ref(false);
const swal = inject('$swal');
const router = useRouter();

const data = ref({
    email: '',
});

const submitForm = async () => {
    try {
        isLoading.value = false;
        const response = await HTTP.post('/reset_password/', data.value);
        data.value = response.data;
        // console.log(response.data);
        isLoading.value = false;
        router.push({
            name: 'RecoveryPassword',
        });
        swal.fire({
            position: 'top-center',
            icon: '',
            title: 'На указанный e-mail отправлено письмо со ссылкой.',
            text: 'Пройдите по ней для восстановления пароля.',
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
.v-card {
    max-width: 580px;
}
.v-card-title {
    padding: 0;
    overflow: visible;
}
.v-card-title {
    font-size: 40px;
    font-weight: 600;
    font-family: Akrobat;
    padding-top: 0rem;
    @media screen and (max-width: 575px) {
        font-size: 32px;
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
@media ((max-width: 550px)) {
    .py-15 {
        padding-top: 60px !important;
        padding-bottom: 40px !important;
    }
    .px-14 {
        padding-right: 15px !important;
        padding-left: 15px !important;
    }
    .card_cross {
        right: 8px;
    }
}
@media ((max-width: 550px)) {
    .v-card-title {
        font-size: 30px;
    }
    .AuthWrapper {
        padding-bottom: 118px;
    }
}
</style>
@shared/components/selects/inputs
