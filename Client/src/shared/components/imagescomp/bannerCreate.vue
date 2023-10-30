<template>
    <div class="squads-banner">
        <div class="squads-banner__text">
            Студенческие отряды — это больше, чем работа. Километры впечатлений,
            тысячи друзей и лето с пользой!
        </div>
        <Button label="Создать отряд" color="create" v-if="admin"
            ><router-link to="/"></router-link></Button
        >
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
    &__text {
        color: #ffffff;
        font-size: 29px;
        font-family: 'Akrobat';
        width: 740px;
    }
}

.btn {
    color: #35383F;
}
</style>
