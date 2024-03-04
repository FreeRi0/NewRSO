import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useDistrictsStore = defineStore('districts', {
    state: () => ({
        districts: [],
        district: {},
        isLoading: false,
    }),
    actions: {
        async getDistricts() {
            if (this.districts.length) return;
            try {
                this.isLoading = true;
                const responseDistricts = await HTTP.get(`/districts/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.districts = responseDistricts.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
    },
});

