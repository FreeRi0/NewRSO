<template>
    <p class="message">{{ message }}</p>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isPaid: boolean;
}>();

const message = computed(() =>
    props.isPaid
        ? 'Уважаемый пользователь, ваш членский взнос оплачен.'
        : 'Уважаемый пользователь, ваш членский взнос не оплачен.',
);
</script>
<style scoped>
.message {
    font-size: 18px;
}
</style>
