import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

export const usePageStore = defineStore('page', () => {
    const route = useRoute();

    const currentPage = ref<RouteLocationNormalizedLoaded>(route);
    const targetObjects = reactive<object[]>([]);

    watch(route, (newRoute) => {
        currentPage.value = newRoute;
    });

    function replaceTargetObjects(objs: object[]) {
        targetObjects.splice(0, targetObjects.length, ...objs);
    }

    function addNewTagetObject(targetObject: object) {
        targetObjects.push(targetObject);
    }

    function clearTargetObjects() {
        targetObjects.splice(0, targetObjects.length);
    }

    return {
        currentPage,
        targetObjects,
        addNewTagetObject,
        replaceTargetObjects,
        clearTargetObjects,
    };
});
