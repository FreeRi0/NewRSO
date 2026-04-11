import {defineStore} from "pinia";

export const useReportPartTwoStore = defineStore('report-two', {
    state: () => ({
        /*
        * Объект для хранения данных эксперта ОШ
        */
        reportDataDH: {
            first: {},
            fourth: {},
            fifth: {},
            sixth: {},
            six: {},
            ninth: {},
            eleventh: {
                first: {},
                second: {},
            },
            twelfth: {},
        },
        /*
        * Объект для хранения файлов эксперта ОШ
        */
        reportDataDHFile: {
            first: null,
            fourth: null,
            fifth: null,
            sixth: null,
            six: {},
            ninth: {},
            eleventh: {
                first: null,
                second: null,
            },
            twelfth: null,
        },
        /*
        * Объект для хранения данных эксперта ЦШ
        */
        reportDataCH: {
            first: {},
            fourth: {},
            fifth: {},
            sixth: {},
            six: {},
            ninth: {},
            eleventh: {
                first: {},
                second: {},
            },
            twelfth: {},
        },
        /*
        * Объект для хранения файлов эксперта ЦШ
        */
        reportDataCHFile: {
            first: null,
            fourth: null,
            fifth: null,
            sixth: null,
            six: {},
            ninth: {},
            eleventh: {
                first: null,
                second: null,
            },
            twelfth: null,
        },
        /*
        * Объект для хранения подтверждения об отправке отчета на доработку экспертом ЦШ
        */
        returnReport: {
            first: false,
            fourth: false,
            fifth: false,
            sixth: false,
            six: {},
            ninth: {},
            eleventh: {
                first: false,
                second: false,
            },
            twelfth: false,
        },
        /*
        * Объект для хранения полученных данных от РШ и ОШ для отчета эксперта ЦШ
        */
        reportForCheckCH: {
            first: null,
            fourth: null,
            fifth: null,
            sixth: null,
            six: {},
            ninth: {},
            eleventh: {
                first: null,
                second: null,
            },
            twelfth: null,
        },

        isReportReject: {
            first: false,
            fourth: false,
            fifth: false,
            sixth: false,
            six: {},
            ninth: {},
            eleventh: {
                first: false,
                second: false,
            },
            twelfth: false,
        },

        reportReject: {
            first: null,
            fourth: null,
            fifth: null,
            sixth: null,
            six: {},
            ninth: {},
            eleventh: {
                first: null,
                second: null,
            },
            twelfth: false,
        },
        isReportRevision: false,

        /*
        * Переменная для хранения подтверждения полной верификации отчета экспертом ЦШ 
        * (verified_by_chq === true по всем показателям)
        */
        isAllReportsVerifiedByCH: false,
    })
})