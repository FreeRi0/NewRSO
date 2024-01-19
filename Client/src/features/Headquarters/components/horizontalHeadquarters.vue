<template>
    <div v-if="headquarters.length > 0">
        <educationItemHorizontal
            v-for="headquarter in headquarters"
            :headquarter="headquarter"
            :key="headquarter.id"
        ></educationItemHorizontal>
    </div>

    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
import { educationItemHorizontal } from '@entities/HeadquartersData';
const props = defineProps({
    headquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;

    &-category-full {
        text-align: center;
        font-size: 18px;
        font-family: 'Akrobat';
        margin-left: 20px;
        margin-right: 5px;
        color: #1e1e1e;
    }
}
</style>
