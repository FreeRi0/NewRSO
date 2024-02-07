import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
import usePage from '@shared/composables/usePage';

export const useSquadsStore = defineStore('squads', {
    state: () => ({
        members: [],
        squads: [],
        squad: {},
        competitionSquads: [],
        isLoading: false,
    }),
    actions: {
        async getSquads() {
            try {
                this.isLoading = true;
                    const responseSquads = await HTTP.get('detachments/', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    });
                    this.squads = responseSquads.data;
                    this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async getCompetitionSquads() {
            try {
                this.isLoading = true;
                const responseCompetitionSquads = await HTTP.get('/competitions/1/participants', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.competitionSquads = responseCompetitionSquads.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getSquadId(id: String) {
            try {
                const { replaceTargetObjects } = usePage();
                this.isLoading = true;
                const responseSquad = await HTTP.get(`/detachments/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.squad = responseSquad.data;
                replaceTargetObjects([this.squad]);
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
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
    },
});
