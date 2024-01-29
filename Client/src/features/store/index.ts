import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        currentUser: {},
    }),
    actions: {
        async getUser() {
            const response = await HTTP.get('rsousers/me', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.currentUser = response.data;
        },
        async getUserId() {
            const route = useRoute();
            let id = route.params.id;
            const response = await HTTP.get(`users/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.user = response.data;
        },
    },
});
