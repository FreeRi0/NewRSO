import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({

        reportData: {
           six: {},
           ninth: {},
        },
        /*
        * Объект для хранения данных эксперта ОШ
        */
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
        /*
        * Объект для хранения файлов эксперта ОШ
        */
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

        reportDataFile: {
            ninth: {},
        },
        /*
        * Объект для хранения данных эксперта ЦШ
        */
        reportDataCH: {
            first: {},
            fourth: {},
            fifth: {},
            six: {},
            ninth: {},
            eleventh: {},
            twelfth: {},
            thirteenth: {},
            tenth: {
                first: {},
                second: {},
            },
            sixteenth: {},
        },
        /*
        * Объект для хранения файлов эксперта ЦШ
        */
        reportDataCHFile: {
            first: null,
            ninth: {},
            eleventh: null,
            twelfth: null,
            thirteenth: null,
            tenth: {
                first: null,
                second: null,
            },
        },
        /*
        * Объект для хранения подтверждения об отправке отчета на доработку экспертом ЦШ
        */
        returnReport: {
            first: false,
            fourth: false,
            fifth: false,
            six: {},
            ninth: {},
            eleventh: false,
            twelfth: false,
            thirteenth: false,
            tenth: {
                first: false,
                second: false,
            },
            sixteenth: false,
        },
        /*
        * Объект для хранения полученных данных от РШ и ОШ для отчета эксперта ЦШ
        */
        reportForCheckCH: {
            first: null,
            fourth: null,
            fifth: null,
            six: {},
            ninth: {},
            tenth: {
                first: null,
                second: null,
            },
            eleventh: null,
            twelfth: null,
            thirteenth: null,
            sixteenth: null,
        },

        isReportReject: {
            first: false,
            fourth: false,
            fifth: false,
            six: {},
            ninth: {},
            tenth: {
                first: false,
                second: false,
            },
            eleventh: false,
            twelfth: false,
            thirteenth: false,
            sixteenth: false,
        },

        reportReject: {
            first: null,
            fourth: null,
            fifth: null,
            six: {},
            ninth: {},
            tenth: {
                first: null,
                second: null,
            },
            sixteenth: null,
        },
        isReportRevision: false,

        /*
        * Переменная для хранения подтверждения полной верификации отчета экспертом ЦШ 
        * (verified_by_chq === true по всем показателям)
        */
        isAllReportsVerifiedByCH: false,
    })
})