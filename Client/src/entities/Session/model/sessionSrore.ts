import { usersApi } from '@shared/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const SESSION_STORE_KEY = 'store:session';

export const useSession = defineStore(SESSION_STORE_KEY, () => {
    const authorizedUser = ref<usersApi.CurrentUser | null>(null);
    const isLoading = ref<boolean>(false);

    const fetchAuthorizedUser = async () => {
        try {
            isLoading.value = true;
            const res = await usersApi.getAuthorizedUser();
            authorizedUser.value = res.data;
            console.log(res.data);
        } catch (err: unknown) {
            // TODO Нормальная обработка ошибки
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    fetchAuthorizedUser();

    return {
        authorizedUser,
        fetchAuthorizedUser,
        isLoading,
    };
});
