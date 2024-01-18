import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useAppStore = defineStore('app', {
    state: () => ({
        user: {},
    }),
    actions: {
        async getUser() {
            const data = await HTTP.get('/rsousers/me/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.user = data.data;
        },
    },

    // state: () => ({
    //     user: {},
    // }),
    // actions: {
    //     async getUser() {
    //         // const data = await HTTP.get('rsousers/me');
    //         // this.user = data?.data;
    //         await HTTP.get('/rsousers/me/', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Token ' + localStorage.getItem('Token'),
    //             },
    //         })
    //             .then((response) => {
    //                 this.user = response.data;
    //                 console.log(this.user);
    //             })
    //             .catch(function (error) {
    //                 console.log('an error occured ' + error);
    //             });
    //     },
    // },
});
