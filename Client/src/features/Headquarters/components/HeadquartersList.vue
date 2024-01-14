<template>
    <educationItem
        v-for="headquarter in headquarters"
        :headquarter="headquarter"
        :key="headquarter.id"
        v-if="headquarters.length > 0"
    />
    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
import { educationItem } from '@entities/HeadquartersData';
const props = defineProps({
    headquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
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
//     }
// }
</style>
