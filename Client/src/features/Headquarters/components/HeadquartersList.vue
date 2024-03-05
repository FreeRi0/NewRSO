<template>
    <div class="headquarters-wrapper">
        <educationItem
            v-for="headquarter in headquarters"
            :headquarter="headquarter"
            :key="headquarter.id"
        />
    </div>
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
