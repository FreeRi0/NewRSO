<template>
    <div
        :class="{ 'top': isLoading || !localHeadquarters.length, 'headquarters-wrapper': !isLoading && localHeadquarters.length }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="localHeadquarters.length">
                <localItem v-for="localHeadquarter in localHeadquarters" :local-headquarter="localHeadquarter"
                    :key="localHeadquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { localItem } from '@entities/HeadquartersData/components';
const props = defineProps({
    localHeadquarters: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}

// .round-img {
//     width: 128px;
//     height: 128px;
//     display: block;
//     margin: 0px auto;
//     @media screen and (max-width: 575px) {
//         width: 100px;
//         height: 100px;
//     }
// }
// .headquarters-wrapper__item {
//     margin: 0px auto;
//     width: 180px;
//     @media screen and (max-width: 575px) {
//         width: 150px;
//     }
//     &-title {
//         text-align: center;
//         font-size: 20px;
//         font-family: 'Akrobat';
//         color: #1e1e1e;
//         @media screen and (max-width: 575px) {
//             font-size: 16px;
//         }
//     }</style>
