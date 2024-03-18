import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
export const useLocalsStore = defineStore('local', {
    state: () => ({
        locals: [],
        local: {},
        isLoading: false,
        totalLocals: 0,
        nextLocals: '',
        localsLimit: 20,
    }),
    actions: {
        async searchLocals(name: String) {
            const responseSearchLocals = await HTTP.get(
                `/locals/?search=${name}`,
                {
                    params: {
                        limit: this.localsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.locals = responseSearchLocals.data.results;
        },

        async getLocals() {
            try {
                this.isLoading = true;
                const responseLocals = await HTTP.get(`/locals/`, {
                    params: {
                        limit: this.localsLimit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.totalLocals = responseLocals.data.count;
                this.locals = responseLocals.data.results;
                this.nextLocals = responseLocals.data.next;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getNextLocals() {
            try {
                this.isLoading = true;

                const responseLocalsNext = await HTTP.get(
                    this.nextLocals.replace('http', 'https'),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.locals = this.locals.concat(
                    responseLocalsNext.data.results,
                );
                this.nextLocals = responseLocalsNext.data.next;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured' + error);
                this.isLoading = false;
            }
        },
    },
});
