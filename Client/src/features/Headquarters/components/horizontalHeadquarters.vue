<template>
    <div>
        <educationItemHorizontal
            v-for="headquarter in headquarters"
            :headquarter="headquarter"
            :key="headquarter.id"
        ></educationItemHorizontal>
    </div>
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
