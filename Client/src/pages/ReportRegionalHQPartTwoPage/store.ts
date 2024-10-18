import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
            six: {},
            ninth: {}
        },
        reportDataDHFile: {
            first: null,
            ninth: {}
        }
    })
})