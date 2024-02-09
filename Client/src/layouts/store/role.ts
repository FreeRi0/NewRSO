import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: {},
        myPositions: {},
        positions: {},
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

        async getMyPositions() {
            const dataMyPositions = await HTTP.get('/rsousers/me_positions/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.myPositions = dataMyPositions.data;
        },

        async getPositions(id: String) {
            const dataPositions = await HTTP.get(`/rsousers/${id}positions/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.positions = dataPositions.data;
        },
    },
});
