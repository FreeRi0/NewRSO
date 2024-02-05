import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useSquadsStore = defineStore('squads', {
    state: () => ({
        filteredSquads: [],
        squads: [],
        squad: {},
    }),
    actions: {
        async getSquads() {
            const responseSquads = await HTTP.get(`/detachments/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.squads = responseSquads.data;
        },
        async getSquadId(id: String) {
            const responseSquad = await HTTP.get(`/detachments/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.squad = responseSquad.data;
        },
        async getFilteredSquads(name: String) {
            const responseFilteredSquads = await HTTP.get(
                `/detachments/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.filteredSquads = responseFilteredSquads.data;
        },
    },
});
