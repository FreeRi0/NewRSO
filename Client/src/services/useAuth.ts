import { ref, Ref } from 'vue';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { HTTP } from '@app/http';
import { useMessage } from './useMessage'


interface FormData {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
    non_field_errors?: string[];
}

export function useAuth() {
    const userStore = useUserStore();
    const roleStore = useRoleStore();
    const formData: Ref<FormData> = ref({ username: '', password: '' });
    const errors: Ref<Errors> = ref({});
    const isLoading = ref(false);
    const { showMessage } = useMessage();
    const loginUser = async (): Promise<boolean> => {
        try {
            isLoading.value = true;
            const response = await HTTP.post('/jwt/create/', formData.value);
            localStorage.setItem('jwt_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            await Promise.all([
                userStore.getUser(),
                userStore.getCountApp(),
                roleStore.getRoles(),
                roleStore.getExperts(),
                roleStore.getMyPositions(),
                roleStore.getUserParticipantsStatus('1')
            ]);

            showMessage('Вы успешно авторизовались!', false);
            return true;
        } catch (error: any) {
            errors.value = error.response?.data || { non_field_errors: ['An unexpected error occurred'] };
            const errorMessage = 'Ошибка авторизации: ' +
                (errors.value.non_field_errors?.[0] ||
                    errors.value.username ||
                    errors.value.password ||
                    Object.values(errors.value).flat()[0] ||
                    'Неизвестная ошибка');

            showMessage(errorMessage, true);
            return false;
        } finally {
            isLoading.value = false;
        }
    };
    return { loginUser, formData, errors, isLoading };
}