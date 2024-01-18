import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { onActivated, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { usePageStore } from '..';

interface Params {
    targetObjects: Record<string, unknown>[];
    notUsedHooks?: boolean;
}

function getCountIsObjectLabels(route: RouteLocationNormalizedLoaded) {
    let counter = 0;

    if (route.meta.isObject) counter++;

    counter += route.matched.reduce((count, matchedRoute) => {
        return matchedRoute.meta.isObject ? ++count : count;
    }, 0);

    return counter;
}

export default function usePage(
    params: Params = { targetObjects: [], notUsedHooks: false },
) {
    const { targetObjects, notUsedHooks } = params;

    const pageStore = usePageStore();

    const replaceTargetObjects = (targetObjects: Record<string, unknown>[]) => {
        pageStore.replaceTargetObjects(targetObjects);
    };

    function handleReplace() {
        if (!targetObjects.length) return;
        pageStore.replaceTargetObjects(targetObjects);
    }

    function addTargetObject(targetObject: Record<string, unknown>) {
        pageStore.addTargetObject(targetObject);
    }

    if (!notUsedHooks) {
        onMounted(() => {
            handleReplace();
        });

        onActivated(() => {
            handleReplace();
        });
    }

    onBeforeRouteLeave((to, from) => {
        const devideCount =
            getCountIsObjectLabels(to) - getCountIsObjectLabels(from);

        if (devideCount >= 0) return true;

        pageStore.removeLastObjects(devideCount * -1);
    });

    return {
        addTargetObject,
        replaceTargetObjects,
    };
}
