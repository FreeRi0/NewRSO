<template>
    <div class="container">
        <div class="user-wrapper">
            <h2 class="page-title">Моя страница</h2>
            <BannerComp class="mt-3"></BannerComp>
            <div class="user-verify">
                <p class="user-verify__title">Верификация данных</p>
                <div class="user-verify__desc">
                    Уважаемый пользователь, для того, чтобы использовать полный
                    функционал личного кабинета, пройдите, пожалуйста,
                    верификацию. Верификация — это документальное подтверждение
                    ваших личных данных. Она займет всего несколько минут.
                </div>
            </div>

            <TextArea></TextArea>

           <photos></photos>

            <router-link to="/">
                <Button
                    name="verify-btn"
                    label="Пройти верификацию"
                    color="primary"
                ></Button
            ></router-link>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { BannerComp } from '@features/baner/components';
import {TextArea} from '@shared/components/inputs';
import {photos} from '@shared/components/photos';
</script>
<style lang="scss" scoped>
.user-wrapper {
    padding: 60px 0px 80px 0px;
}
.user-verify {
    margin-top: 60px;
    margin-bottom: 40px;
    &__title {
        font-size: 32px;
        font-weight: 600;
    }
    &__desc {
        font-size: 18px;
        font-weight: 40;
        margin-top: 40px;
        width: 835px;
    }
}
.btn {
    margin: 0px;
    height: 52px;
}
</style>
