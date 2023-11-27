<template>
    <div class="squads-banner">
        <div class="squads-banner__text">
            Студенческие отряды — это больше, чем работа. Километры впечатлений,
            тысячи друзей и лето с пользой!
        </div>
        <Button label="Создать отряд" color="create" v-if="admin"
            ><router-link to="/"></router-link
        ></Button>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';

const admin = ref(true);
</script>
<style lang="scss" scoped>
.squads-banner {
    padding: 26px 40px;
    background-image: url('@app/assets/createBanner.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        padding: 34px 80px 34px 20px;
    }
    @media screen and (max-width: 575px) {
        padding: 18px 20px 18px 20px;
    }
    &__text {
        color: #ffffff;
        font-size: 29px;
        font-family: 'Akrobat';
        width: 740px;
        @media screen and (max-width: 1024px) {
            font-size: 24px;
            width: 64%;
        }
        @media screen and (max-width: 768px) {
            font-size: 24px;
            width: 100%;
            margin-bottom: 20px;
        }
        @media screen and (max-width: 575px) {
            font-size: 20px;
        }
    }
}

.btn {
    color: #35383f;
}
</style>
