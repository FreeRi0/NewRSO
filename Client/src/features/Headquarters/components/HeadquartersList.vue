<template>
    <div v-if="headquarters.length > 0">
        <educationItem
            v-for="headquarter in headquarters"
            :headquarter="headquarter"
            :key="headquarter.id"
        />
    </div>
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
<style lang="scss" scoped></style>
