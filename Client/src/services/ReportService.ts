import { HTTP } from '@app/http';

export function createReport(data: object) {
    return HTTP.post('regional_competitions/statistical_report/', data)
}

export function getReport() {
    return HTTP.get('regional_competitions/statistical_report/me/')
}

export function patchReport(data: object) {
    return HTTP.patch('regional_competitions/statistical_report/me/', data)
}

export const reportPartTwoService = {
    createReport(data: object, panel: string, withFile = false) {
        return HTTP.post(`regional_competitions/reports/${panel}/`, data, {
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

    getReport(panel: string) {
        return HTTP.get(`regional_competitions/reports/${panel}/`)
    }
}