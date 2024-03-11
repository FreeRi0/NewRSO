<template>
    <div v-if="items.length > 0">
        <registryItem
            v-for="(item, index) in items"
            :item="item"
            :key="index"
            :show-info="showInfo"
        ></registryItem>
    </div>

    <h2 v-else>не найдено...</h2>
</template>
<script setup>
import { registryItem } from '@entities/registry';
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    showInfo: {
        type: Boolean,
    },
});
</script>
<style lang="scss"></style>
