import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        currentUser: {},
        regions: []
    }),
    actions: {
        async getRegions() {
            const { data } = await HTTP.get('/regions', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.regions = data;
        },
        async getUser() {
            const response = await HTTP.get('rsousers/me', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },

            });
            this.currentUser = response.data;
            this.currentUser.region = this.regions.find(
                (region) => region.name === this.currentUser.region,
            )?.id;

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
