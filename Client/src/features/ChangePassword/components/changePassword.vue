<template>
    <div class="change_Login mb-8">
        <div class="change_Login_title">
            <p class="username-title">Ваш логин: {{ username }}</p>
            <button class="changeLog" v-on:click="show = !show">
                {{ show ? 'Скрыть' : 'Изменить' }}
            </button>
        </div>
        <Input v-show="show" placeholder="login" name="login" v-model:value="username" @input="validateUsername" />

        <p class="error-message" v-if="usernameError">{{ usernameError }}</p>
        <Button @click="updateUsername" v-show="show" :class="['save', usernameError ? 'disabled' : '']"
            label="Сохранить" color="primary" />
    </div>
    <div class="change_Password">
        <p class="pass-title">Изменить пароль</p>

        <div class="password-container">
            <Input :type="showOldPassword ? 'text' : 'password'" v-model:value="current_password" class="pass"
                placeholder="Введите старый пароль" @input="validatePassword" />
            <button type="button" class="toggle-password" @click="togglePasswordVisibility('old')">
                <img v-if="showOldPassword" src="@app/assets/eye-slash.png" alt="Скрыть пароль" />
                <img v-else src="@app/assets/eye.png" alt="Показать пароль" />
            </button>
            <!-- Выводим ошибку, если текущий пароль неверный -->
            <p class="error-message" v-show="currentPasswordError">{{ currentPasswordError }}</p>
        </div>



        <div class="password-container">
            <Input :type="showNewPassword ? 'text' : 'password'" v-model:value="new_password" class="pass"
                placeholder="Придумайте новый пароль" @input="validatePassword" />
            <button type=" button" class="toggle-password" @click="togglePasswordVisibility('new')">
                <img v-if="showNewPassword" src="@app/assets/eye-slash.png" alt="Скрыть пароль" />
                <img v-else src="@app/assets/eye.png" alt="Показать пароль" />
            </button>

        </div>

        <div class="password-container">
            <Input :type="showRepeatPassword ? 'text' : 'password'" v-model:value="re_password" class="pass"
                placeholder="Повторите пароль" @input="validatePassword" />
            <button type="button" class="toggle-password" @click="togglePasswordVisibility('repeat')">
                <img v-if="showRepeatPassword" src="@app/assets/eye-slash.png" alt="Скрыть пароль" />
                <img v-else src="@app/assets/eye.png" alt="Показать пароль" />
            </button>
        </div>

        <p class="message" v-show="newPasswordError">{{ newPasswordError }}</p>
        <p class="error-message" v-show="repeatPasswordError">{{ repeatPasswordError }}</p>

        <Button @click="changePasswordForm" class="save" :class="{
            'disabled': new_password !== re_password || newPasswordError || repeatPasswordError || currentPasswordError
        }" :disabled="new_password !== re_password || newPasswordError || repeatPasswordError || currentPasswordError"
            label="Сохранить" color="primary" />

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
const current_password = ref('');
const new_password = ref('');
const re_password = ref('');
const usernameError = ref(null);
const currentPasswordError = ref(null);
const newPasswordError = ref(null);
const repeatPasswordError = ref(null);
const swal = inject('$swal');
const isError = ref([]);
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showRepeatPassword = ref(false);

// Валидация логина
const validateUsername = () => {
    if (!username.value) {
        usernameError.value = 'Это поле не может быть пустым.';
    } else if (username.value.length > 20) {
        usernameError.value = 'Логин не может превышать 20 символов.';
    } else if (username.value.length < 8) {
        usernameError.value = 'Логин должен содержать минимум 8 символов.';
    } else {
        usernameError.value = null;
    }
};
const validatePassword = () => {
    let isValid = true; // Переменная для отслеживания состояния валидности

    // Валидация текущего пароля
    if (!current_password.value) {
        currentPasswordError.value = 'Пожалуйста, введите текущий пароль.';
        isValid = false;
    } else {
        currentPasswordError.value = null;
    }

    // Валидация нового пароля
    if (!new_password.value) {
        newPasswordError.value = 'Поля не могут быть пустыми.';
        isValid = false;
    } else if (new_password.value.length < 8) {
        newPasswordError.value = 'Пароль должен быть не короче 8 символов, включать буквы и цифры. Разрешены только символы ! @ # $ % ^ & * () - _ + = ; : , . / ? \\ | ~ {}';
        isValid = false;
    } else if (new_password.value.length > 20) {
        newPasswordError.value = 'Пароль не должен быть длиннее 20 символов.';
        isValid = false;
    } else if (/^[A-Za-z]+$/.test(new_password.value) || /^\d+$/.test(new_password.value) || /^[!@#$%^&*()\-_=;:,.?/\\|~{}]+$/.test(new_password.value)) {
        newPasswordError.value = 'Ненадежный пароль.';
        isValid = false;
    } else {
        newPasswordError.value = null;
    }

    // Валидация повторного пароля
    if (new_password.value !== re_password.value) {
        repeatPasswordError.value = 'Пароли не совпадают.';
        isValid = false;
    } else {
        repeatPasswordError.value = null;
    }

    // Возвращаем результат валидности
    return isValid;
};





const togglePasswordVisibility = (type) => {
    if (type === 'old') {
        showOldPassword.value = !showOldPassword.value;
    } else if (type === 'new') {
        showNewPassword.value = !showNewPassword.value;
    } else if (type === 'repeat') {
        showRepeatPassword.value = !showRepeatPassword.value;
    }
};

// Обновление логина
const updateUsername = async () => {
    validateUsername();
    if (usernameError.value) {
        return;
    }

    try {
        const response = await HTTP.patch(
            '/rsousers/me/',
            { username: username.value },
        );

        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });

        emit('changeUsername', response.data.username);
        isError.value = [];
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;

        swal.fire({
            position: 'center',
            icon: 'error',
            title: `ошибка`,
            showConfirmButton: false,
            timer: 2500,
        });
    }
};
// Изменение пароля
const changePasswordForm = async () => {
    // Валидация пароля
    if (!validatePassword()) {
        swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Пожалуйста, исправьте ошибки в форме.',
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }

    // Проверка, что новый и повторный пароли совпадают
    if (new_password.value !== re_password.value) {
        swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Пароли не совпадают.',
            showConfirmButton: false,
            timer: 2500,
        });
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
        );

        console.log('Password change successful:', response);

        localStorage.setItem('Token', response.data);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Пароль успешно изменен',
            showConfirmButton: false,
            timer: 1500,
        });

        // Сброс ошибки текущего пароля, если пароль был успешно изменен
        currentPasswordError.value = null;
    } catch (error) {
        console.error('Error while changing password:', error);

        if (error.response && error.response.data) {
            console.error('Error response:', error.response.data);

            // Если ошибка касается неверного текущего пароля
            if (error.response.data.current_password) {
                currentPasswordError.value = 'Неверный  пароль.';
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Неверный текущий пароль.',
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            // Если текущий пароль не введен
            else if (!current_password.value) {
                currentPasswordError.value = 'Пожалуйста, введите текущий пароль.';
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Пожалуйста, введите текущий пароль.',
                    showConfirmButton: false,
                    timer: 2500,
                });
            } else {
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ошибка при изменении пароля.',
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
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

.message {
    color: #5e5e5e;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 500;
}

.error-message {
    color: #ff4d4f;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 500;
}

.password-container {
    position: relative;
    margin-bottom: 20px;

    Input {
        width: 100%;
        padding-right: 50px; // Отступ для кнопки
        box-sizing: border-box;
    }


    .toggle-password {
        position: absolute;
        top: 50%;
        right: 10px; // Расположить кнопку внутри поля
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toggle-password img {
        width: 20px;
        height: 20px;
    }
}

.disabled {
    background-color: #aaa9a9; // Цвет кнопки при ошибке
    color: #ffffff;
    cursor: not-allowed;
    pointer-events: none;
    border: none;
}
</style>