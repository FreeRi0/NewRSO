<template>
    <div class="change_Login">
        <div class="change_Login_title">
            <p class="username-title">Ваш логин: {{ user.username }}</p>
            <button class="changeLog" v-on:click="visible = !visible">
                {{ visible ? 'Скрыть' : 'Изменить' }}
            </button>
        </div>
        <Input
            v-show="visible"
            placeholder="   login"
            name="surname"
            v-model:value="user.username"
        />
        <p class="error" v-if="isError.last_name">
            {{ 'Фамилия пользователя, ' + isError.last_name }}
        </p>
        <p class="error" v-if="isError.first_name">
            {{ 'Имя пользователя, ' + isError.first_name }}
        </p>
        <p class="error" v-if="isError.gender">
            {{ 'Гендер, ' + isError.gender }}
        </p>
        <p class="error" v-if="isError.username">{{ '' + isError.username }}</p>
        <Button
            @click="updateUsername"
            v-show="visible"
            class="save"
            label="Сохранить"
            color="primary"
        ></Button>
    </div>
    <div class="change_Password" @submit.prevent="resetPasswordForm">
        <p class="pass-title">Изменить пароль</p>
        <Input
            placeholder="   Введите старый пароль"
            name="password"
            v-model:value="user.password_old"
        ></Input>
        <Input
            placeholder="   Придумайте новый пароль"
            name="newPass"
            v-model:value="user.password"
        ></Input>
        <Input
            placeholder="   Повторите пароль"
            name="confirm"
            v-model:value="user.re_password"
        ></Input>
        <Button class="save" label="Сохранить" color="primary"></Button>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const user = ref({
    username: '',
    password_old: '',
});
const password = ref('');
const re_password = ref('');
const swal = inject('$swal');
const isError = ref([]);
const visible = ref(false);
const route = useRoute();

const auth = computed(() => ({
    uid: route.params.uid,
    token: route.params.token,
}));

const getUser = async () => {
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

onMounted(() => {
    getUser();
});

const updateUsername = async () => {
    await HTTP.patch('/rsousers/me/', user.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            user.value = response.data;
            console.log(response.data);
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};
const resetPasswordForm = async () => {
    if (password.value !== re_password.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await HTTP.post('/users/reset_password_confirm/', {
            ...auth.value,
            password: password.value,
        });
        console.log(response.data);
        localStorage.setItem('Token', response.data.auth_token);
    } catch (error) {
        console.error(error);
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
