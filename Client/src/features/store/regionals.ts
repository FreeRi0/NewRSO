import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
    }),
    actions: {
        async getRegionals(region: String) {
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
            const responseRegions = await HTTP.get(
                `/regions/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            this.regions = responseRegions.data;
        },
    },
});
