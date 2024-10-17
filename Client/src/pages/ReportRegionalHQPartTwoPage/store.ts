import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
            fourth: {},
        },
        reportDataDHFile: {
            first: null,
            fourth: null,
        }
    })
})