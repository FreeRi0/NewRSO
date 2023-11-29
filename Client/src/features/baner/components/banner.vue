<template>
    <div class="user-metric">
        <bannerPhoto></bannerPhoto>
        <Avatar></Avatar>
        <div class="user-metric__bottom">
            <!-- Данные пользователя  -->
            <div class="user-data__wrapper">
                <div class="user-data__name">
                    <h4 v-if="user">{{ user.username }}</h4>
                    <h4 v-else>Not auth</h4>
                </div>
                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title"><p>Кандидат</p></li>

                        <li class="user-data__regional-office">
                            <p>Ленинградское отделение</p>
                        </li>
                    </ul>
                </div>
                <!-- Контакты пользователя  -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Avatar } from '@shared/components/imagescomp';
import { bannerPhoto } from '@shared/components/imagescomp';
import axios from 'axios';

let user = ref(null);
const getUser = async () => {
    await axios
        .get('api/v1/users/me/', {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            user.value = response.data;
            console.log(user.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

getUser();

</script>
<style lang="scss" scoped>
.profile-settings-top {
    padding-top: 40px;
    margin-bottom: 40px;
}

.user-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 64px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);
}

.breadcrumbs-container ul {
    display: flex;
    list-style: none;
}

.breadcrumbs-slesh {
    margin: 0 4px;
}

.breadcrumbs-container a {
    display: block;
    text-decoration: none;
    /* хлебные_крошки */
    font-family: 'Akrobat';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.breadcrumbs-container a.active {
    display: block;
    text-decoration: none;
    /* хлебные_крошки */
    font-family: Akrobat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #1f7cc0;
}

.ps__title {
    margin: 40px 0;
}

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

.user-metric__bottom {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
}

/* Данные пользователя */
.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 32px 300px;
}

.user-data__name {
    margin-bottom: 32px;
}

.user-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.user-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.user-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.user-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.user-data__list p,
.user-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.user-data__introductions {
    display: flex;
    align-items: center;
}

.user-data__introductions p,
.user-data__introductions img {
    margin-right: 5px;
}
</style>
