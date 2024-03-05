import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useSquadsStore = defineStore('squads', {
    state: () => ({
        members: [],
        squads: [],
        squad: {},
        areas: [],
        competitionSquads: [],
        isLoading: false,
        limit: 20,
        total: 0,
    }),
    actions: {
        async getSquads() {
            if (this.squads.length) return;
            try {
                this.isLoading = true;
                const responseSquads = await HTTP.get('/detachments/', {
                    params: {
                        _limit: this.limit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.total = Math.ceil(
                    responseSquads.headers['x-total-count'] / this.limit,
                );
                this.squads = responseSquads.data; // добавить .data
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async getAreas() {
            if (this.areas.length) return;
            try {
                this.isLoading = true;
                const responseAreas = await HTTP.get('/areas/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.areas = responseAreas.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async getCompetitionSquads() {
            if(this.competitionSquads.length) return;
            try {
                this.isLoading = true;
                const responseCompetitionSquads = await HTTP.get(
                    '/competitions/1/participants/',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.competitionSquads = responseCompetitionSquads.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getSquadId(id: String) {
            try {
                this.isLoading = true;
                const responseSquad = await HTTP.get(`/detachments/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.squad = responseSquad.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getFilteredSquads(education: String) {
            const responseFilteredSquads = await HTTP.get(
                `/detachments/educational_institution__name=${education}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.squads = responseFilteredSquads.data;
        },
        async getSquadMembers(id: String) {
            try {
                this.isLoading = true;
                const responseMembers = await HTTP.get(
                    `/detachments/${id}/members/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.members = responseMembers.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async searchSquads(name: String) {
            const searchSquadsResp = await HTTP.get(
                `/detachments/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            this.squads = searchSquadsResp.data;
        },
    },
});
