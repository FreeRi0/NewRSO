import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
// import usePage from '@shared/composables/usePage';

// const { replaceTargetObjects } = usePage();
export const useLocalsStore = defineStore('local', {
    state: () => ({
        locals: [],
        members: [],
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
            this.locals = responseSearchLocals.data;
        },

        async getLocals() {
            try {
                const responseLocals = await HTTP.get(`/locals/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.locals = responseLocals.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
    },
});
