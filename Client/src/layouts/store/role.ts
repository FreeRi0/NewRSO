import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: {},
        userRoles: {},
        myPositions: {},
        positions: {},
        isLoadingRoles: false,
        status: {}
    }),
    actions: {
        async getRoles() {
            // if (Object.keys(this.roles).length || this.isLoadingRoles) return;
            this.isLoadingRoles = true;
            const data = await HTTP.get('/rsousers/me_commander/');
            this.roles = data.data;
            this.isLoadingRoles = false;
        },

        async getUserRoles(id: String) {
            const dataUserRoles = await HTTP.get(`/rsousers/${id}/commander/`);
            this.userRoles = dataUserRoles.data;
        },

        async getUserParticipantsStatus(competition_pk: string) {
            const dataUserStatus = await HTTP.get(`/competitions/${competition_pk}/participants/status/`);
            this.status = dataUserStatus.data;
        },


        async getMyPositions() {
            const dataMyPositions = await HTTP.get('/rsousers/me_positions/');
            this.myPositions = dataMyPositions.data;
        },

        async getPositions(id: String) {
            const dataPositions = await HTTP.get(`/rsousers/${id}/positions/`);
            this.positions = dataPositions.data;
        },
    },
});
