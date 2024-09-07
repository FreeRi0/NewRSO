<template>
    <div class="user-metrichq__top">
        <div class="user-metrichq__top-img-wrapper">
            <!-- Заглушка Банер -->

            <img :src="banner" alt="Баннер отряда" v-if="banner" />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Баннер штаба(пусто)"
                v-else
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const imgDataHQUrl = ref('');
const route = useRoute();
const id = route.params.id;

const props = defineProps({
    banner: String,
});
</script>
<style lang="scss"></style>
