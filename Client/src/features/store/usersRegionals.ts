import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useUsersRegionalsStore = defineStore('usersRegionals', {
    state: () => ({
        users: [],
    }),
    actions: {
        async searchUsers(name: String) {
            const responseUsers = await HTTP.get(
                `/rsousers/?search=${name}&regional_headquarter__name=${regHeadquarterName}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            this.users = responseUsers.data;
        },
    },
});
