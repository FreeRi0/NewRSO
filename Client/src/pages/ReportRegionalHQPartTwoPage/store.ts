import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
            fourth: {},
            fifth: {},
            eleventh: {},
            twelfth: {},
            thirteenth: {},
        },
        reportDataDHFile: {
            first: null,
            fourth: null,
            eleventh: null,
            twelfth: null,
            thirteenth: null,
        }
    })
})