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
        totalSquads: 0,
        totalMembers: 0,
        SquadsLimit: 3,
        MembersLimit: 3,
        CompetitionsLimit: 3,
        nextSquads: '',
        prevSquads: '',
        totalCompetitions: 0,
    }),
    actions: {
        async getSquads() {
            if (this.squads.length) return;
            try {
                this.isLoading = true;
                const responseSquads = await HTTP.get('/detachments/', {
                    params: {
                        limit: this.SquadsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.totalSquads = responseSquads.data.count;
                this.squads = responseSquads.data.results;
                this.nextSquads = responseSquads.data.next;
                this.prevSquads = responseSquads.data.previous;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getNextSquads() {
            try {
                this.isLoading = true;

                const responseSquads = await HTTP.get(
                    this.nextSquads.replace('http', 'https'),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.totalSquads = responseSquads.data.count;
                this.squads = responseSquads.data.results;
                this.nextSquads = responseSquads.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },

        async getPrevSquads() {
            try {
                this.isLoading = true;

                const responseSquads = await HTTP.get(
                    this.prevSquads.replace('http', 'https'),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.totalSquads = responseSquads.data.count;
                this.squads = responseSquads.data.results;
                this.prevSquads = responseSquads.data.previous;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
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
                this.areas = responseAreas.data.results;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async getCompetitionSquads() {
            if (this.competitionSquads.length) return;
            try {
                this.isLoading = true;
                const responseCompetitionSquads = await HTTP.get(
                    '/competitions/1/participants/',
                    {
                        params: {
                            limit: this.CompetitionsLimit,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.totalCompetitions = responseCompetitionSquads.data.count;
                this.competitionSquads = responseCompetitionSquads.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async searchCompetitionSquads(name: String) {
            const searchCompSquads = await HTTP.get(
                `/competitions/1/participants/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            this.competitionSquads = searchCompSquads.data.results;
        },

        async getSquadId(id: String) {
            try {
                this.isLoading = true;
                const responseSquad = await HTTP.get(`/detachments/${id}/`, {
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
                        params: {
                            limit: this.MembersLimit,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.totalMembers = responseMembers.data.count;
                this.members = responseMembers.data.results;
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
            this.squads = searchSquadsResp.data.results;
        },
    },
});
