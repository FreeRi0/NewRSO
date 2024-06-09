import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useDistrictsStore = defineStore('districts', {
    state: () => ({
        districts: [],
        district: {},
        members: [],
        isLoading: false,
    }),
    actions: {
        async getDistricts() {
            if (this.districts.length) return;
            try {
                this.isLoading = true;
                const responseDistricts = await HTTP.get(`/districts/`);
                this.districts = responseDistricts.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getDHMembers(id: String) {
            try {

                const responseMembers = await HTTP.get(
                    `/districts/${id}/members/`);
                this.members = responseMembers.data.results;
            } catch (error) {

                console.log('an error occured ' + error);
            }
        },
        async getSearchDHMembers(id: String, name: String) {
            try {
                const responseMembers = await HTTP.get(
                    `/districts/${id}/members/?search=${name}`);
                this.members = responseMembers.data.results;

            } catch (error) {

                console.log('an error occured ' + error);
            }
        },

    },
});
