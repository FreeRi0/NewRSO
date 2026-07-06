<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex justify-end">
                <v-card class="px-14 py-15">
                    <SvgIcon iconName="cross" class="card_cross" @click="onBack" />
                    <v-card-title class="text-center">Смена почты</v-card-title>
                    <v-form class="login-form" @submit.prevent="submitForm">
                        <p>
                            В соответствии с законодательством Российской Федерации и в целях обеспечения
                            бесперебойного доступа к вашему аккаунту авторизация возможна только с использованием
                            почтовых адресов на российских доменах в зонах .ru, .su и .рф. Пожалуйста, привяжите
                            к аккаунту адрес на mail.ru, vk.ru, ya.ru или любом другом российском сервисе.
                        </p>
                        <Input class="recovery-input" placeholder="Новый адрес электронной почты" name="new_email"
                            type="email"
                            pattern="[a-zA-Z0-9._-]+@[a-zA-Zа-яёА-ЯЁ0-9-]+(\.[a-zA-Zа-яёА-ЯЁ0-9-]+)*\.[a-zA-Zа-яёА-ЯЁ]{2,}"
                            error-message="Введите адрес электронной почты в формате mail@example.com"
                            v-model:value.trim="newEmail" />
                        <p v-if="emailZoneError" class="error">{{ emailZoneError }}</p>
                        <ErrorMessage :error="errors.email" />
                        <Button label="Сохранить новую почту" class="recovery-btn" color="primary" type="submit"
                            :loaded="isLoading" :disabled="isLoading || !!emailZoneError || !newEmail"></Button>
                    </v-form>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Input, ErrorMessage } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { usePage } from '@shared';
import { useMessage } from '@services/useMessage';
import { useUserStore } from '@features/store';
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';

usePage({ isHidden: true });

const router = useRouter();
const userStore = useUserStore();
const { showMessage } = useMessage();

const isLoading = ref(false);
const newEmail = ref('');
const errors = ref({});

const EMAIL_TLD_STARTED_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Zа-яёА-ЯЁ0-9-]+(\.[a-zA-Zа-яёА-ЯЁ0-9-]+)*\.[a-zA-Zа-яёА-ЯЁ]+$/;
const EMAIL_ZONE_REGEX = /\.(ru|su|рф)$/i;

const emailZoneError = computed(() => {
    const value = newEmail.value;
    if (!value || !EMAIL_TLD_STARTED_REGEX.test(value) || EMAIL_ZONE_REGEX.test(value)) {
        return '';
    }
    return 'Адрес должен быть на российском домене в зоне .ru, .su или .рф.';
});

const onBack = () => {
    localStorage.removeItem('restricted_email');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    userStore.logOut();
    router.push({ name: 'Login' });
};

const submitForm = async () => {
    try {
        isLoading.value = true;
        await HTTP.patch('/rsousers/me/', { email: newEmail.value });
        localStorage.removeItem('restricted_email');
        await userStore.getUser();
        showMessage('Почта успешно изменена!', false);
        router.push({ name: 'mypage' });
    } catch (error) {
        errors.value = error.response?.data || {};
        const errorMessage = 'Не удалось сохранить новую почту: ' +
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
.login-form {
    margin-top: 20px;
}

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
