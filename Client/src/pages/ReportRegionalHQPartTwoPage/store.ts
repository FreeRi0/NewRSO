import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
        },
        reportDataDHFile: {
            first: null,
        }
    })
})