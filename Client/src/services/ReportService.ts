import { HTTP } from '@app/http';

export function createReport(data: object) {
    return HTTP.post('regional_competitions/statistical_report/', data)
}

export function getReport() {
    return HTTP.get('regional_competitions/statistical_report/me_first/')
}

export function getReportForSecond() {
    return HTTP.get('regional_competitions/statistical_report/me/')
}

export function getCurrentReport(id: string) {
    return HTTP.get(`regional_competitions/statistical_report/${id}/`)
}

export function patchReport(data: object) {
    return HTTP.patch('regional_competitions/statistical_report/me/', data)
}

export function editReport(data: object) {
    return HTTP.put('/regional_competitions/statistical_report/me/', data)
}

export const reportPartTwoService = {
    createReport(data: object, panel: string, withFile = false) {
        return HTTP.post(`regional_competitions/reports/${panel}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createReportId(data: object, panel: string, id: string, withFile = false) {
        return HTTP.post(`regional_competitions/reports/${panel}/${id}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createReportDraft(data: object, panel: string, withFile = false) {
        return HTTP.put(`regional_competitions/me/reports/${panel}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },
    createReportDraftId(data: object, panel: string, id: string, withFile = false) {
        return HTTP.put(`regional_competitions/me/reports/${panel}/${id}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    
    getReport(panel: string) {
        return HTTP.get(`regional_competitions/me/reports/${panel}/`)
    },

    getReportId(panel: string, id: string) {
        return HTTP.get(`regional_competitions/me/reports/${panel}/${id}/`)
    },
    getReportDH(panel: string, reportId: string) {
        return HTTP.get(`regional_competitions/reports/${panel}/${reportId}/`)
    },

    createMultipleReport(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.post(`regional_competitions/reports/${panel}/${reportNumber}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },
    createMultipleReportAll(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.post(`regional_competitions/me/reports/${panel}/${reportNumber}/all`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createMultipleReportDraft(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.put(`regional_competitions/me/reports/${panel}/${reportNumber}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    getMultipleReport(panel: string, reportNumber: string) {
        return HTTP.get(`regional_competitions/me/reports/${panel}/${reportNumber}/`)
    },

    getMultipleReportDH(panel: string, reportNumber: string, reportId: string) {
        return HTTP.get(`/regional_competitions/reports/${panel}/${reportNumber}/${reportId}/`)
    },

    sendReport(data: object, panel: string) {
        return HTTP.post(`regional_competitions/me/reports/${panel}/send`, data)
    },

    sendReportWithSlash(data: object, panel: string) {
        return HTTP.post(`regional_competitions/me/reports/${panel}/send/`, data)
    },

    sendMultipleReport(data: object, panel: string, reportNumber: string) {
        return HTTP.post(`regional_competitions/me/reports/${panel}/${reportNumber}/send`, data)
    },

    sendReportDH(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.put(`regional_competitions/reports/${panel}/${reportNumber}/district_review/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    getSentReports() {
        return HTTP.get('/regional_competitions/get_sent_reports/')
    }
}