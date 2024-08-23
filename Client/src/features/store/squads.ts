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
        totalMembers: 0,
        SquadsLimit: 20,
        MembersLimit: 10,
        totalSquads: 0,
        nextSquads: '',
        totalCompetitions: 0,
    }),
    actions: {
        async getSquads(name: String) {
            try {
                this.isLoading = true;
                const responseSquads = await HTTP.get(`/detachments/?ordering=${name}`, {
                    params: {
                        limit: this.SquadsLimit,
                    },
                });
                this.totalSquads = responseSquads.data.count;
                this.squads = responseSquads.data.results;
                this.nextSquads = responseSquads.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },



        async getNextSquads() {
            try {
                this.isLoading = true;

                const responseSquadsNext = await HTTP.get(
                    this.nextSquads.replace('http', 'https')
                );

                this.squads = this.squads.concat(responseSquadsNext.data.results);
                this.nextSquads = responseSquadsNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },

        async getAreas() {
            try {
                const responseAreas = await HTTP.get('/areas/');
                this.areas = responseAreas.data.results;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
        async getCompetitionSquads() {
            try {
                this.isLoading = true;
                const responseCompetitionSquads = await HTTP.get(
                    `/competitions/1/participants/`,
                    {
                        params: {
                            limit: 351
                        },
                    },
                );
                this.totalCompetitions = responseCompetitionSquads.data.count;
                this.nextSquads = responseCompetitionSquads.data.next;
                this.competitionSquads = responseCompetitionSquads.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getNextCompetitionSquads() {
            try {
                this.isLoading = true;

                const responseSquadsNext = await HTTP.get(
                    this.nextSquads.replace('http', 'https')
                );

                this.competitionSquads = this.competitionSquads.concat(responseSquadsNext.data.results);
                this.nextSquads = responseSquadsNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },

        async searchCompetitionSquads(name: String) {
            const searchCompSquads = await HTTP.get(
                `/competitions/1/participants/?search=${name}`
            );
            this.competitionSquads = searchCompSquads.data.results;
        },

        async getSquadId(id: String) {
            try {
                this.isLoading = true;
                const responseSquad = await HTTP.get(`/detachments/${id}/`);
                this.squad = responseSquad.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getFilteredSquads(education: String) {
            const responseFilteredSquads = await HTTP.get(
                `/detachments/educational_institution__name=${education}`
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
                    },
                );
                this.totalMembers = responseMembers.data.count;
                this.members = responseMembers.data.results;
                this.nextSquads = responseMembers.data.next;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getSquadMembersNoLimit(id: String) {
            try {

                const responseMembers = await HTTP.get(
                    `/detachments/${id}/members/`
                );
                this.members = responseMembers.data.results;
            } catch (error) {

                console.log('an error occured ' + error);
            }
        },

        async getSearchSquadMembers(id: String, name: String) {
            try {

                const responseMembers = await HTTP.get(
                    `/detachments/${id}/members/?search=${name}`
                );
                this.totalMembers = responseMembers.data.count;
                this.members = responseMembers.data.results;
                this.nextSquads = responseMembers.data.next;

            } catch (error) {

                console.log('an error occured ' + error);
            }
        },

        async getNextMembers() {
            try {
                this.isLoading = true;

                const responseMembersNext = await HTTP.get(
                    this.nextSquads.replace('http', 'https')
                );
                this.members = this.members.concat(responseMembersNext.data.results);
                this.nextSquads = responseMembersNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },



        async searchSquads(name: String) {
            const searchSquadsResp = await HTTP.get(
                `/detachments/?search=${name}`,

                {
                    params: {
                        limit: this.SquadsLimit,
                    },
                },
            );
            this.squads = searchSquadsResp.data.results;
        },
    },
});
