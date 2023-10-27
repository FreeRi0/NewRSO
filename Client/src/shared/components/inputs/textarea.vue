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

// const rules = ref([v => v.length <= 3-- || 'Лимит 300 символов'])
</script>
<style lang="scss"></style>
