import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
        filteredRegional: [],
        filteredMyRegional: [],
        members: [],
        regional: {},
        institutions: [],
        isLoading: false,
        totalRegionals: 0,
        regionalsLimit: 4,
        nextRegionals: '',
    }),
    actions: {
        async searchRegionals(region: any) {
            try {
                const regionName = Object.keys(region).length
                    ? region.name
                    : region;
                const responseSearchRegionals = await HTTP.get(
                    `/regionals/?region=${regionName}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.filteredRegional = responseSearchRegionals.data.results;
            } catch (err) {
                console.log('an error occured ' + err);
            }
        },
        async searchMyRegionals(region: any) {
            try {
                const regionName = Object.keys(region).length
                    ? region.name
                    : region;
                const responseSearchMyRegionals = await HTTP.get(
                    `/regionals/?region=${regionName}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.filteredMyRegional =
                    responseSearchMyRegionals.data.results;
            } catch (err) {
                console.log('an error occured ' + err);
            }
        },
        async getRegionals() {
            try {
                this.isLoading = true;
                const responseRegionals = await HTTP.get(`/regionals/`, {
                    params: {
                        limit: this.regionalsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.totalRegionals = responseRegionals.data.count;
                this.regionals = responseRegionals.data.results;
                this.nextRegionals = responseRegionals.data.next;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getNextRegionals() {
            try {
                this.isLoading = true;

                const responseRegionalsNext = await HTTP.get(
                    this.nextRegionals.replace('http', 'https'),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.regionals = this.regionals.concat(
                    responseRegionalsNext.data.results,
                );
                this.nextRegionals = responseRegionalsNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },
        async getRegionalId(id: String) {
            try {
                this.isLoading = true;
                const responseRegional = await HTTP.get(`/regionals/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.regional = responseRegional.data;

                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getRegionalsMembers(id: String) {
            try {
                this.isLoading = true;
                const responseMembers = await HTTP.get(
                    `/regionals/${id}/members/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.members = responseMembers.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async searchRegions(name: String) {
            const responseSearchRegions = await HTTP.get(
                `/regions/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            this.regions = responseSearchRegions.data.results;
        },
        async getRegions() {
            if (this.regions.length) return;
            try {
                this.isLoading = true;
                const responseRegions = await HTTP.get(`/regions/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.regions = responseRegions.data.results;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async searchInstitution(name: String, region: any) {
            let url = `/eduicational_institutions/?search=${name}`;
            if (region) url += '&region__name=' + region;
            const responseInstitution = await HTTP.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.institutions = responseInstitution.data;
        },

        async searchRegionalsHead(name: String) {
            const responseSearchRegionalsHead = await HTTP.get(
                `/regionals/?search=${name}`,
                {
                    params: {
                        limit: this.regionalsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token' + localStorage.getItem('Token'),
                    },
                },
            );
            this.regionals = responseSearchRegionalsHead.data.results;
        },
    },
});
