import { defineStore } from 'pinia';
import { HTTP } from '@app/http';
// import { useRoute } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        privateUser: {},
        userDocs: {},
        foreignUser: [],
        foreignParent: {},
        users: [],
        currentUser: {},
        count: {},
        isLoading: false,
    }),
    actions: {
        async getUser() {

            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const responseUser = await HTTP.get('rsousers/me/', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    });
                    if (!Number.isInteger(localStorage.getItem('user'))) {
                        localStorage.setItem('user', responseUser.data.id);
                    }
                    this.currentUser = responseUser.data;
                    this.isLoading = false;
                }, 10);
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getCountApp() {
            if (Object.keys(this.count).length) return;
            try {
                const responseCount = await HTTP.get(
                    'rsousers/me_notifications_count/',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.count = responseCount.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        async getUserId(id: String) {
            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const responseUserId = await HTTP.get(`save_users/${id}/`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    });
                    this.user = responseUserId.data;
                    this.isLoading = false;
                }, 10);
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getPrivateUserId(id: String) {
            const responsePrivate = await HTTP.get(`rsousers/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.privateUser = responsePrivate.data;
        },
        async getForeignDocsId(id: String) {
            const responseForeignDocsId = await HTTP.get(`rsousers/foreign_documents/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.foreignUser = responseForeignDocsId.data.results;
        },
        async getForeignDocs() {
            const responseForeignDocs = await HTTP.get(`rsousers/me/foreign_documents/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.userDocs = responseForeignDocs.data;
        },
        async getForeignParentId(id: String) {
            const responseForeignParent = await HTTP.get(`rsousers/foreign_parent_documents/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.foreignParent = responseForeignParent.data;
        },

        async searchUsers(name: String) {
            const responseSearch = await HTTP.get(`rsousers?search=${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });
            this.users = responseSearch.data;
        },
    },
});
