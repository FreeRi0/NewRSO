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
        /*
        * Объект для хранения данных эксперта ЦШ
        */
        reportDataCH: {
            first: {},
            fourth: {},
            fifth: {},
            eleventh: {},
            twelfth: {},
            thirteenth: {},
            tenth: {
                first: {},
                second: {},
            },
        },
        /*
        * Объект для хранения файлов эксперта ЦШ
        */
        reportDataCHFile: {
            first: null,
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
            eleventh: false,
            tenth: {
                first: false,
                second: false,
            },
        },
        /*
        * Объект для хранения полученных данных от РШ и ОШ для отчета эксперта ЦШ
        */
        reportForCheckCH: {
            first: null,
            fourth: null,
            tenth: {
                first: null,
                second: null,
            },
        }
    })
})