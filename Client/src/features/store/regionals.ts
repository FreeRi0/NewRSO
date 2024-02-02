import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
        institutions: []
    }),
    actions: {
        async searchRegionals(region: String) {
            const responseRegionals = await HTTP.get(
                `/regionals/?search=${region}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.regionals = responseRegionals.data;
        },
        async searchRegions(name: String) {
            const responseRegions = await HTTP.get(`/regions/?search=${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.regions = responseRegions.data;
        },
        async searchInstitution(name: String) {
            const responseInstitution = await HTTP.get(`/eduicational_institutions/?search=${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.institutions = responseInstitution.data;
        },
    },
});
