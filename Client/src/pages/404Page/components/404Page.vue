<template>
    <div class="container">
        <!-- Страница Ошибка 404 -->
        <section class="error-404">
            <div class="container">
                <div class="error-404__container">
                    <!-- Текстовая информация об ошибке -->
                    <h1>404</h1>
                    <p>
                        Такой страницы не существует или она перемещена по
                        другому адресу
                    </p>
                    <!-- Кнопка с предложением вернуться в ЛК -->
                    <button class="error-404__button">
                        <a href="/MyPage">Вернуться в личный кабинет</a>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { usePage } from '@shared';

usePage({ isHidden: true });
</script>
<style scoped lang="scss">
/* base- потом удалить*/
* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

img {
    display: block;
    max-width: 100%;
}

body {
    margin: 0;
    font-family: 'BertSans', sans-serif;
    font-family: 'Akrobat', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    padding: 0;
    margin: 0;
}

h2 {
    /* Desktop/H-2 */
    font-family: 'Akrobat';
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

p {
    /* text */
    font-family: 'BertSans';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #35383f;
}

a {
    /* link */
    font-family: 'BertSans';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
}

::placeholder {
    color: #898989;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

button a {
    color: #ffffff;
    /* button_text */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-decoration: none;
}

.container {
    margin: 0 auto;
    max-width: 1180px;
}

.form-field {
    position: relative;
    display: flex;
    flex-direction: column;
}

.form-field input {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    padding: 10px 0px 10px 16px;
}

.form-field input:focus {
    outline: 0;
}

.form-field.success input {
    border-color: green;
}

.form-field.error input {
    border-color: red;
}

.form-field .error {
    color: red;
    font-size: 11px;
    height: 18px;
}

.form__wrapper {
    display: flex;
    justify-content: flex-end;
}

.form__title {
    font-weight: 600;
    margin-bottom: 40px;
}

/* Страница Ошибка 404 */
.error-404 {
    min-height: 660px;
}

.error-404__container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
    max-width: 730px;
    min-height: 116px;
}

.error-404 h1 {
    font-family: 'Inter';
    color: #91c9f7;
    font-style: normal;
    font-size: 232px;
    font-weight: 700;
    border: #39bfbf99;
    margin-bottom: 40px;
}

.error-404 div {
    display: flex;
    justify-content: center;
}

.error-404 p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 40px;
}

.error-404__button {
    display: block;
    box-sizing: border-box;
    width: 306px;
    min-height: 52px;
    border-radius: 10px;
    background: #39bfbf;
    border: none;
    outline: none;
}
</style>
