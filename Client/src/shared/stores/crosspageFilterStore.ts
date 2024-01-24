import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCrosspageFilterStore = defineStore('filter', () => {
    const filters = ref<Record<string, unknown>>({});

    const currentFilters = computed(() => filters);

    function addFilter(filter: Record<string, unknown>) {
        filters.value = {
            ...filters.value,
            filter,
        };
    }

    return {
        filters: currentFilters,
        addFilter,
    };
});
