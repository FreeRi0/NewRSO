import { HTTP } from '@app/http';

export function createReport(data) {
    return HTTP.post('regional_competitions/statistical_report/', data)
}