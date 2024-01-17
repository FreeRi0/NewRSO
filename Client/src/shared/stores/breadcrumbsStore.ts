import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { usePageStore } from './pageStore';
import useBreadcrumbs from '@shared/composables/useBreadcrumbs';
import { Breadcrumb } from '@shared/composables/useBreadcrumbs';

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const { currentPage, targetObjects } = usePageStore();

    const breadcrumbs = reactive<Array<Breadcrumb>>([]);

    watch(
        [currentPage, targetObjects],
        ([newCurrentPage, newTargetObjects]) => {
            console.log('change1', newTargetObjects);
            if (!newTargetObjects) return;

            breadcrumbs.splice(
                0,
                breadcrumbs.length,
                ...useBreadcrumbs({
                    route: newCurrentPage,
                    targetObjects: [...newTargetObjects],
                }),
            );
        },
        { immediate: true },
    );

    return {
        breadcrumbs,
        targetObjects,
    };
});
