<template>
    <div>
        <v-select variant="outlined" clearable>
            <option v-for="item in items" :value="item.title" :key="item.title">
                {{ item.title }}
            </option>
        </v-select>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});
</script>

<style lang="scss" scoped></style>
