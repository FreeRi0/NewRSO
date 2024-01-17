import { onActivated, onMounted, watch } from 'vue';
import { usePageStore } from '..';

interface Params {
    targetObjects: object[];
    notUsedHooks?: boolean;
}

export default function usePage(
    params: Params = { targetObjects: [], notUsedHooks: false },
) {
    const { targetObjects, notUsedHooks } = params;

    const pageStore = usePageStore();
    pageStore.clearTargetObjects();

    const replaceTargetObjects = (targetObjects: object[]) => {
        pageStore.replaceTargetObjects(targetObjects);
    };

    function handleReplace() {
        if (!targetObjects.length) return;
        pageStore.replaceTargetObjects(targetObjects);
    }

    function addNewTargetObject(targetObject: object) {
        console.log('add', targetObject, targetObjects);
        pageStore.addNewTagetObject(targetObject);
    }

    watch(
        targetObjects,
        (newTargetObjects) => {
            if (!newTargetObjects?.length) return;
            pageStore.replaceTargetObjects(newTargetObjects);
        },
        { deep: true },
    );

    if (!notUsedHooks) {
        onMounted(() => {
            handleReplace();
        });

        onActivated(() => {
            handleReplace();
        });
    }

    return {
        addNewTargetObject,
        replaceTargetObjects,
    };
}
