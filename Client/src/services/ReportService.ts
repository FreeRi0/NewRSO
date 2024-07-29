import { HTTP } from '@app/http';

export function createReport(data) {
    return HTTP.post('regional_competitions/statistical_report/', data)
}

export function getReport() {
    return HTTP.get('regional_competitions/statistical_report/me/')
}

export function patchReport(data) {
    return HTTP.patch('regional_competitions/statistical_report/me/', data)
}