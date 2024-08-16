<template>
    <UiSkeleton v-if="isLoading" :height="20" width="54ch" />
    <p v-else class="message">{{ message }}</p>
</template>
<script setup lang="ts">
import { UiSkeleton } from '@shared/ui';
import { computed } from 'vue';

const props = defineProps<{
    isPaid?: boolean;
    isLoading?: boolean;
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
