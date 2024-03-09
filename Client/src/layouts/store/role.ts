import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: {},
        userRoles: {},
        myPositions: {},
        positions: {},
        isLoadingRoles: false
    }),
    actions: {
        async getRoles() {
            if (Object.keys(this.roles).length || this.isLoadingRoles) return;
            this.isLoadingRoles = true;
            const data = await HTTP.get('/rsousers/me_commander/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.roles = data.data;
            this.isLoadingRoles = false;
        },

        async getUserRoles(id: String) {
            const dataUserRoles = await HTTP.get(`/rsousers/${id}/commander/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.userRoles = dataUserRoles.data;
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
            const dataPositions = await HTTP.get(`/rsousers/${id}/positions/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.positions = dataPositions.data.results;
        },
    },
});
