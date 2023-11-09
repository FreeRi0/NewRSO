<template>
    <div>
        <label for="checkbox">{{ label }}</label>
        <!-- <input type="checkbox" id="checkbox" :model-value="checked" /> -->
    </div>

    <v-checkbox id="checkbox" :model-value="checked"></v-checkbox>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    checked: {
        type: Boolean,
        default: true,
    },
});
</script>

<style lang="scss" scoped>
// import { ref } from 'vue';
// const checked = ref(true);

// <label for="checkbox">{{ label }}</label>

// <input type="checkbox" id="checkbox" v-model="checked" />
</style>
