import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
export const useEducationalsStore = defineStore('educationals', {
    state: () => ({
        educationals: [],
        members: [],
        educational: {},
        isLoading: false,
        totalEducationals: 0,
        EducationalsLimit: 4,
        nextEducationals: '',
    }),
    actions: {
        async searchEducationals(name: String) {
            const responseSearchEducationals = await HTTP.get(
                `/educationals/?search=${name}`,

                {
                    params: {
                        limit: this.EducationalsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.educationals = responseSearchEducationals.data.results;
        },
        async getEducationals(name: String) {
            try {
                this.isLoading = true;
                const responseEducationals = await HTTP.get(`/educationals/?ordering=${name}`, {
                    params: {
                        limit: this.EducationalsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.totalEducationals = responseEducationals.data.count;
                this.nextEducationals = responseEducationals.data.next;
                this.educationals = responseEducationals.data.results;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getNextEducationals() {
            try {
                this.isLoading = true;

                const responseEducNext = await HTTP.get(
                    this.nextEducationals.replace('http', 'https'),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.educationals = this.educationals.concat(
                    responseEducNext.data.results,
                );
                this.nextEducationals = responseEducNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },
        async getEducationalsId(id: String) {
            try {
                this.isLoading = true;
                const responseEducational = await HTTP.get(
                    `/educationals/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.educational = responseEducational.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        // async sortedEducationals(name: String) {
        //     const sortEducResp = await HTTP.get(
        //         `/educationals/?ordering=${name}`,

        //         {
        //             params: {
        //                 limit: this.EducationalsLimit,
        //             },
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         },
        //     );
        //     this.totalEducationals = sortEducResp.data.count;
        //     this.nextEducationals = sortEducResp.data.next;
        //     this.educationals = sortEducResp.data.results;
        // },
        async getEducationalsMembers(id: String) {
            try {
                this.isLoading = true;
                const responseMembers = await HTTP.get(
                    `/educationals/${id}/members/`,
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
    },
});
