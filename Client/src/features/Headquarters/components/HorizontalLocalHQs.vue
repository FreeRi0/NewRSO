<template>
    <div>
        <localItemHorizontal
            v-for="localHeadquarter in localHeadquarters"
            :local-headquarter="localHeadquarter"
            :key="localHeadquarter.id"
        ></localItemHorizontal>
    </div>
</template>
<script setup>
import { localItemHorizontal } from '@entities/HeadquartersData';
const props = defineProps({
    localHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">
.horizontal {
    &-item {
        border: 1px solid grey;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 4px 20px;
    }
    &-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
}
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
