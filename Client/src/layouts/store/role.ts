import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: {},
    }),
    actions: {
        async getRoles() {
            const data = await HTTP.get('/rsousers/me_commander/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.roles = data.data;
        },
    },
});
