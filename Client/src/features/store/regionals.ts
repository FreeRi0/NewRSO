import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useRegionalsStore = defineStore('regionals', {
    state: () => ({
        regions: [],
        regionals: [],
    }),
    actions: {
        async getRegions() {
            const responseRegions = await HTTP.get('/regions', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.regions = responseRegions.data;
        },
        // async getRegionals(region) {
        //     const responseRegionals = await HTTP.get(
        //         `/regionals/?search=${region}`,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: 'Token ' + localStorage.getItem('Token'),
        //             },
        //         },
        //     );
        //     this.regionals = responseRegionals.data;
        // },
    },
});
