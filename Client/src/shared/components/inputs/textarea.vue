<template>
    <v-textarea
        clearable
        counter
        :model-value="value"
        variant="outlined"
    ></v-textarea>
</template>
<script setup>
import { ref } from 'vue';
const value = ref('');
const rules = ref([v => v.length <= 25 || 'Max 25 characters']);
</script>
<style lang="scss"></style>
