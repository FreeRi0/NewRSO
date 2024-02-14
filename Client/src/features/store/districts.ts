import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
// import usePage from '@shared/composables/usePage';


// const { replaceTargetObjects } = usePage();
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
        // async getEducationals() {
        //     try {
        //         this.isLoading = true;
        //         const responseEducationals = await HTTP.get(`/educationals/`, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: 'Token ' + localStorage.getItem('Token'),
        //             },
        //         });
        //         this.educationals = responseEducationals.data;
        //         this.isLoading = false;
        //     } catch (error) {
        //         console.log('an error occured ' + error);
        //         this.isLoading = false;
        //     }
        // },
        // async getEducationalsId(id: String) {
        //     try {
        //         this.isLoading = true;
        //         const responseEducational = await HTTP.get(
        //             `/educationals/${id}`,
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     Authorization:
        //                         'Token ' + localStorage.getItem('Token'),
        //                 },
        //             },
        //         );
        //         this.educational = responseEducational.data;
        //         // replaceTargetObjects([this.educational]);
        //         this.isLoading = false;
        //     } catch (error) {
        //         console.log('an error occured ' + error);
        //         this.isLoading = false;
        //     }
        // },
        // async getEducationalsMembers(id: String) {
        //     try {
        //         this.isLoading = true;
        //         const responseMembers = await HTTP.get(
        //             `/educationals/${id}/members/`,
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     Authorization:
        //                         'Token ' + localStorage.getItem('Token'),
        //                 },
        //             },
        //         );
        //         this.members = responseMembers.data;
        //         this.isLoading = false;
        //     } catch (error) {
        //         this.isLoading = false;
        //         console.log('an error occured ' + error);
        //     }
        // },
    },
});
