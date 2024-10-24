import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        reportDataDH: {
            first: {},
            fourth: {},
            fifth: {},
            six: {},
            ninth: {},
            tenth: {
                first: {},
                second: {},
            },
            eleventh: {},
            twelfth: {},
            thirteenth: {},
            sixteenth: {},
        },
        reportDataDHFile: {
            first: null,
            fourth: null,
            ninth: {},
            tenth: {
                first: null,
                second: null,
            },
            eleventh: null,
            twelfth: null,
            thirteenth: null,
        },
        reportDataCH: {
            eleventh: {},
            twelfth: {},
            thirteenth: {},
        },
        reportDataCHFile: {
            eleventh: null,
            twelfth: null,
            thirteenth: null,
        },
    })
})