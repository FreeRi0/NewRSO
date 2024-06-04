import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
export const useEducationalsStore = defineStore('educationals', {
    state: () => ({
        educationals: [],
        members: [],
        educational: {},
        isLoading: false,
        totalEducationals: 0,
        EducationalsLimit: 20,
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
                    `/educationals/${id}` );
                this.educational = responseEducational.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getEducationalsMembers(id: String) {
            try {
                this.isLoading = true;
                const responseMembers = await HTTP.get(
                    `/educationals/${id}/members/`);
                this.members = responseMembers.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getSearchEducationalsMembers(id: String, name: String) {
            try {
                const responseMembers = await HTTP.get(
                    `/educationals/${id}/members/?search=${name}`);
                this.members = responseMembers.data.results;

            } catch (error) {

                console.log('an error occured ' + error);
            }
        },
    },
});
