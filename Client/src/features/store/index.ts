import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        privateUser: {},
        userDocs: {},
        parentDocs: {},
        foreignUser: [],
        foreignParent: [],
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
                    const responseUser = await HTTP.get('rsousers/me/');
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
            try {
                const responseCount = await HTTP.get(
                    'rsousers/me_notifications_count/');
                this.count = responseCount.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        async getUserId(id: String) {
            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const responseUserId = await HTTP.get(`save_users/${id}/`);
                    this.user = responseUserId.data;
                    this.isLoading = false;
                }, 10);
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getPrivateUserId(id: String) {
            const responsePrivate = await HTTP.get(`rsousers/${id}/`);
            this.privateUser = responsePrivate.data;
        },
        async getForeignDocsId(id: String) {
            const responseForeignDocsId = await HTTP.get(`rsousers/foreign_documents/${id}/`);
            this.foreignUser = responseForeignDocsId.data.results;
        },
        async getForeignDocs() {
            const responseForeignDocs = await HTTP.get(`rsousers/me/foreign_documents/`, {

            });
            this.userDocs = responseForeignDocs.data;
        },
        async getForeignParentId(id: String) {
            const responseForeignParentId = await HTTP.get(`rsousers/foreign_parent_documents/${id}/`);
            this.foreignParent = responseForeignParentId.data.results;
        },

        async getForeignParent() {
            const responseForeignParent = await HTTP.get(`rsousers/me/foreign_parent_documents/`, {

            });
            this.parentDocs = responseForeignParent.data;
        },

        async searchUsers(name: String) {
            const responseSearch = await HTTP.get(`rsousers?search=${name}`);
            this.users = responseSearch.data;
        },
    },
});
