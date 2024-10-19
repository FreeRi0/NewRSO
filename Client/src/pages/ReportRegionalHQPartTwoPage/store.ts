import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
            fourth: {},
            fifth: {},
            six: {},
            ninth: {},
            eleventh: {},
            twelfth: {},
            thirteenth: {},
        },
        reportDataDHFile: {
            first: null,
            fourth: null,
            ninth: {},
            eleventh: null,
            twelfth: null,
            thirteenth: null,
        }
    })
})