import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
        filteredRegional: [],
        filteredMyRegional: [],
        filteredMembers: [],
        members: [],
        regional: {},
        institutions: [],
        isLoading: false,
        totalRegionals: 0,
        regionalsLimit: 20,
        nextRegionals: '',
    }),
    actions: {
        async searchRegionals(region: any) {
            try {
                const regionName = Object.keys(region).length
                    ? region.name
                    : region;
                const responseSearchRegionals = await HTTP.get(
                    `/regionals/?region=${regionName}`
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
                    `/regionals/?region=${regionName}`
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
                const responseRegionals = await HTTP.get(
                    `/regionals/`
                );
                this.regionals = responseRegionals.data.results;

                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getRegionalsForFilters(name: String) {
            try {
                this.isLoading = true;
                const responseRegionals = await HTTP.get(`/regionals/?ordering=${name}`);
                this.regionals = responseRegionals.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getRegionalId(id: String) {
            try {
                this.isLoading = true;
                const responseRegional = await HTTP.get(`/regionals/${id}`);
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
                    `/regionals/${id}/members/`
                );
                this.members = responseMembers.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getSearchMembers(id: String, name: String) {
            try {
                const responseMembers = await HTTP.get(
                    `/regionals/${id}/members/?search=${name}`
                );
                this.members = responseMembers.data.results;

            } catch (error) {
                console.log('an error occured ' + error);
            }
        },


        async searchRegions(name: String) {
            const responseSearchRegions = await HTTP.get(
                `/regions/?search=${name}`
            );
            this.regions = responseSearchRegions.data;
        },
        async getRegions() {
            if (this.regions.length) return;
            try {
                this.isLoading = true;
                const responseRegions = await HTTP.get(`/regions/` + `?limit=-1`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.regions = responseRegions.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async searchInstitution(name: String) {
            let url = `/eduicational_institutions/?search=${name}`;
            // if (region) url += '&region__name=' + region;
            const responseInstitution = await HTTP.get(url);
            this.institutions = responseInstitution.data.results;
        },

        async searchRegionalsHead(name: String) {
            const responseSearchRegionalsHead = await HTTP.get(
                `/regionals/?search=${name}`,
                {
                    params: {
                        limit: this.regionalsLimit,
                    },
                },
            );
            this.regionals = responseSearchRegionalsHead.data.results;
        },
    },
});
