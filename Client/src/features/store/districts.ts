import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useDistrictsStore = defineStore('districts', {
    state: () => ({
        districts: [],
        members: [],
        district: {},
        isLoading: false,
    }),
    actions: {
        async searchDistricts(name: String) {
            const responseSearchDistricts = await HTTP.get(
                `/districts/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.districts = responseSearchDistricts.data;
        },
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

