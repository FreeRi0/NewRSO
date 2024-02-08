import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

// const { replaceTargetObjects } = usePage();
export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
        members: [],
        regional: {},
        institutions: [],
        isLoading: false,
    }),
    actions: {
        async searchRegionals(region: String) {
            const responseSearchRegionals = await HTTP.get(
                `/regionals/?search=${region}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.regionals = responseSearchRegionals.data;
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
                // replaceTargetObjects([this.regional]);
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
            try {
                this.isLoading = true;
                const responseRegions = await HTTP.get(`/regions/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.regions = responseRegions.data;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
        async searchInstitution(name: String) {
            const responseInstitution = await HTTP.get(
                `/eduicational_institutions/?search=${name}`,
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
