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
                this.filteredRegional = responseSearchRegionals.data;
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
                this.filteredMyRegional = responseSearchMyRegionals.data;
            } catch (err) {
                console.log('an error occured ' + err);
            }
        },
        async getRegionals() {
            try {
                this.isLoading = true;
                const responseRegionals = await HTTP.get(`/regionals/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.regionals = responseRegionals.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
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
                this.members = responseMembers.data;
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
            this.regions = responseSearchRegions.data;
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
                this.regions = responseRegions.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async searchInstitution(name: String, region: any) {
            let url = `/eduicational_institutions/?search=${name}`;
            if (region) url += '&region__name='+region;
            const responseInstitution = await HTTP.get(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.institutions = responseInstitution.data;
        },
    },
});
