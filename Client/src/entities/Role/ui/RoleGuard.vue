<template>
    <component :is="isShowed ? $slots.default : null" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { UserRole } from '../types';
import { useRole } from '../model/roleStore';

const roles = useRole();
const props = defineProps<{
    /**
     * Массив ролей, для которых будет показываться обернутое содержимое
     */
    neededRoles: UserRole[];
}>();

const isShowed = computed(() =>
    props.neededRoles.some((role) => roles.has(role)),
);
</script>
