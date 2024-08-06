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

export const fourthPanelService = {
    createReport(data: object) {
        return HTTP.post('regional_competitions/reports/4/', data)
    },

    createReportDraft(data: object) {
        return HTTP.put('regional_competitions/me/reports/4/', data)
    },

    getReport() {
        return HTTP.get('regional_competitions/reports/4/')
    }
}