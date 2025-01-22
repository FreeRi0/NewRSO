<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex justify-end">
                <v-card class="px-14 py-15">
                    <SvgIcon iconName="cross" class="card_cross" @click="onBack" />
                    <v-card-title class="text-center">Восстановление пароля</v-card-title>
                    <v-form class="login-form" @submit.prevent="submitForm">
                        <p>
                            Введите адрес электронной почты, который вы
                            указывали при регистрации. Мы отправим вам ссылку
                            для восстановления пароля.
                        </p>
                        <Input class="recovery-input" placeholder="Введите e-mail" name="email" type="email"
                            v-model:value="email" />
                        <ErrorMessage :error="errors.email" />
                        <Button label="Отправить" class="recovery-btn" color="primary" type="submit"
                            :loading="isLoading"></Button>
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
import { ErrorMessage } from '@shared/components/inputs';
import { useMessage } from '@services/useMessage'
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';

usePage({ isHidden: true });

const isLoading = ref(false);
const email = ref('');
const router = useRouter();
const errors = ref({});
const { showMessage } = useMessage();

const onBack = () => router.back();

const submitForm = async () => {
    try {
        isLoading.value = true;
        await HTTP.post('/reset_password/', { email: email.value });
        router.push({ name: 'RecoveryPassword' });
        showMessage('На вашу почту была отправлена ссылка для восстановления пароля.', false);

    } catch (error) {
        errors.value = error.response?.data || {};
        const errorMessage = 'Ошибка при восстановлении пароля: ' +
            (errors.value.non_field_errors?.[0] ||
                errors.value.email ||
                Object.values(errors.value).flat()[0] ||
                'Неизвестная ошибка');

        showMessage(errorMessage, true);

    } finally {
        isLoading.value = false;
    }
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

.recovery-btn {
    margin: 40px auto 15px;
}

.card_cross {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
}

.v-card {
    max-width: 580px;

    &-title {
        font-size: 40px;
        font-weight: 600;

        line-height: 48px;
        font-family: Akrobat;
        padding-top: 0rem;
        padding: 0;
        overflow: visible;

        @media screen and (max-width: 575px) {
            font-size: 30px;
        }
    }

    &-text {
        padding: 0;
        font-size: 18px;

        @media screen and (max-width: 575px) {
            font-size: 16px;
        }
    }
}

.recovery-input {
    text-indent: 16px;
    margin-top: 20px;
    width: 100%;

    &::placeholder {
        color: #898989;
        font-family: 'BertSans';
        font-size: 16px;
        font-weight: 400;
    }
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
    .AuthWrapper {
        padding-bottom: 118px;
    }
}
</style>
