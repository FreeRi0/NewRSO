import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
    }),
    actions: {
        async getUser() {
            const response = await HTTP.get('users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.user = response.data;
        },
    },
});
