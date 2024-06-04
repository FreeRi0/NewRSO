import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const usePositionsStore = defineStore('positions', {
    state: () => ({
        positions: [],
        isLoading: false,
    }),
    actions: {
        async getPositions() {
            if (this.positions.length) return;
            try {
                this.isLoading = true;
                const responsePositions = await HTTP.get('positions/');
                this.positions = responsePositions.data.results;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },
    },
});
