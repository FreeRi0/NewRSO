import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
export const useLocalsStore = defineStore('local', {
    state: () => ({
        locals: [],
        local: {},
        isLoading: false,
    }),
    actions: {
        async searchLocals(name: String) {
            const responseSearchLocals = await HTTP.get(
                `/locals/?search=${name}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.locals = responseSearchLocals.data.results;
        },

        async getLocals() {
            if (this.locals.length) return;
            try {
                this.isLoading = true;
                const responseLocals = await HTTP.get(`/locals/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.locals = responseLocals.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
    },
});
