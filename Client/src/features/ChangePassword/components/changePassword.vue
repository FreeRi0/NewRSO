<template>
    <div class="change_Login mb-8">
        <div class="change_Login_title">
            <p class="username-title">Ваш логин: {{ username }}</p>
            <button class="changeLog" v-on:click="show = !show">
                {{ show ? 'Скрыть' : 'Изменить' }}
            </button>
        </div>
        <Input
            v-show="show"
            placeholder="login"
            name="login"
            v-model:value="username"
        />
        <p class="error" v-if="isError.username">{{ '' + isError.username }}</p>
        <Button
            @click="updateUsername"
            v-show="show"
            class="save"
            label="Сохранить"
            color="primary"
        ></Button>
    </div>
    <div class="change_Password" @submit.prevent="changePasswordForm">
        <p class="pass-title">Изменить пароль</p>
        <Input
            placeholder="   Введите старый пароль"
            name="password"
            v-model:value="current_password"
        ></Input>
        <Input
            placeholder="   Придумайте новый пароль"
            name="newPass"
            v-model:value="new_password"
        ></Input>
        <Input
            placeholder="   Повторите пароль"
            name="confirm"
            v-model:value="re_password"
        ></Input>
        <Button
            @click="changePasswordForm"
            class="save"
            label="Сохранить"
            color="primary"
            type="submit"
        ></Button>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const emit = defineEmits(['changeUsername']);

const userStore = useUserStore();
let currentUser = storeToRefs(userStore);
let username = ref(currentUser.currentUser.value.username);
const show = ref(false);
const new_password = ref('');
const re_password = ref('');
const current_password = ref('');

const swal = inject('$swal');
const isError = ref([]);
const updateUsername = async () => {
    try {
        const response = await HTTP.patch(
            '/rsousers/me/',
            { username: username.value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        emit('changeUsername', response.data.username);
        console.log('username changed!');
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
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

const changePasswordForm = async () => {
    if (new_password.value !== re_password.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await HTTP.post(
            '/users/set_password/',
            {
                new_password: new_password.value,
                current_password: current_password.value,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        console.log(response.data);
        localStorage.setItem('Token', response.data);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log(error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
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
</script>
<style lang="scss" scoped>
.change_Login {
    border: 1px solid #0000001a;
    border-radius: 6px;
    padding: 30px;
    max-width: 480px;
    @media screen and (max-width: 575px) {
        padding: 20px 16px 40px 16px;
    }
    &_title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
}

.change_Password {
    border: 1px solid #0000001a;
    border-radius: 6px;
    padding: 40px;
    margin-top: 40px;
    margin-bottom: 80px;
    max-width: 480px;
    @media screen and (max-width: 575px) {
        padding: 20px 16px 40px 16px;
    }
}

.username-title,
.pass-title {
    font-family: 'Akrobat';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    color: #35383f;
}

.pass-title {
    margin-bottom: 40px;
}

.changeLog {
    font-family: 'Akrobat';
    color: #1f7cc0;
    font-size: 16px;
    font-weight: 500;
}

.save {
    margin-top: 40px;
}
</style>
