import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useDistrictsStore = defineStore('districts', {
    state: () => ({
        districts: [],
    }),
    actions: {
        async getDistricts() {
            if (this.districts.length) return;
            try {
                const responseDistricts = await HTTP.get(`/districts/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.districts = responseDistricts.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
    },
});

