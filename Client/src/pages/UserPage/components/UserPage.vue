<template>
    <div class="container">
        <div class="user-wrapper">
            <h2 class="page-title">Моя страница</h2>
            <BannerComp class="mt-3"></BannerComp>
            <p>{{ message }}</p>
            <div class="user-verify">
                <p class="user-verify__title">Верификация данных</p>
                <div class="user-verify__desc">
                    Уважаемый пользователь, для того, чтобы использовать полный
                    функционал личного кабинета, пройдите, пожалуйста,
                    верификацию. Верификация — это документальное подтверждение
                    ваших личных данных. Она займет всего несколько минут.
                </div>
            </div>

            <router-link to="/PersonalData">
                <Button
                    name="verify-btn"
                    label="Пройти верификацию"
                    color="primary"
                ></Button
            ></router-link>

            <button v-if="user">Выйти</button>

            <TextArea class="mt-14"></TextArea>
            <v-row class="mt-8">
                <v-col v-for="n in 4" :key="n" class="d-flex">
                    <photos></photos>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { BannerComp } from '@features/baner/components';
import { TextArea } from '@shared/components/inputs';
import { photos } from '@shared/components/imagescomp';

import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const auth = computed(() => store.state.user)

const message = ref('');

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:5000/auth/users', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const content = await response.json();

        message.value = content.name;

        await store.dispatch('setAuth', true);
    } catch (error) {
        await store.dispatch('setAuth', false);
    }
});
</script>
<style lang="scss">
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
