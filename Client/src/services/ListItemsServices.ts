import { nextTick, computed, Ref } from "vue";

export const scrollToLastElement = async (vertical: boolean, selector: string) => {
    await nextTick(() => {
        const listItems = vertical
            ? document.querySelectorAll(selector)
            : document.querySelectorAll('.horizontal-item');

        // Проверка наличия элементов перед прокруткой  
        if (listItems.length > 0) {
            const lastLoadedElement = listItems[listItems.length - 1];
            lastLoadedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
        }
    });
};

export const ListPropsSquads = (
    itemsRef: Ref<any[]>, // Замените Item на фактический тип ваших данных  
    isLoadingRef: Ref<boolean>,
    verticalRef: Ref<boolean>
) => {
    return computed(() => ({
        squads: itemsRef.value,
        isLoading: isLoadingRef.value,
        horizontal: !verticalRef.value,
    }));
};
export const ListPropsMembers = (
    itemsRef: Ref<any[]>, // Замените Item на фактический тип ваших данных  
    isLoadingRef: Ref<boolean>,
    verticalRef: Ref<boolean>,
    isVerifiedRef: Ref<boolean>,
    verifiedMembers: Ref<any[]>
) => {
    return computed(() => ({
        participants: itemsRef.value,
        isLoading: isLoadingRef.value,
        horizontal: !verticalRef.value,
        isVerified: isVerifiedRef.value,
        verifiedMembers: verifiedMembers.value,
      
      

    }));
};

export const ListPropsHeadquarters = (
    itemsRef: Ref<any[]>, // Замените Item на фактический тип ваших данных  
    isLoadingRef: Ref<boolean>,
    verticalRef: Ref<boolean>,
    name: string
) => {
    return computed(() => ({
        headquarters: itemsRef.value,
        isLoading: isLoadingRef.value,
        horizontal: !verticalRef.value,
        name: name,
    }));
};  