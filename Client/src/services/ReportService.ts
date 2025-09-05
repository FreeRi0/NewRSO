import { HTTP } from '@app/http';

// Для рейтинго РО 2024 года
// const APPLICATION_NAME = "regional_competitions"

// Для рейтинга РО 2025 года
const APPLICATION_NAME = "regional_competitions_2025"

export function createReport(data: object, withFile = false) {
    return HTTP.post(`${APPLICATION_NAME}/statistical_report/`, data, {
        headers: {
            'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
        },
    })
}

export function getReport() {
    return HTTP.get(`${APPLICATION_NAME}/statistical_report/me_first/`)
}

export function getReportForSecond() {
    return HTTP.get(`${APPLICATION_NAME}/statistical_report/me/`)
}

export function getCurrentReport(id: string) {
    return HTTP.get(`${APPLICATION_NAME}/statistical_report/${id}/`)
}

export function getCurrentOldReport(id: string) {
    return HTTP.get(`${APPLICATION_NAME}/statistical_report/old_first/${id}/`)
}

export function patchReport(data: object) {
    return HTTP.patch(`${APPLICATION_NAME}/statistical_report/me/`, data)
}

export function editReport(data: object) {
    return HTTP.put(`/${APPLICATION_NAME}/statistical_report/me/`, data)
}

export const reportPartTwoService = {
    createReport(data: object, panel: string, withFile = false) {
        return HTTP.post(`${APPLICATION_NAME}/reports/${panel}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createReportId(data: object, panel: string, id: string, withFile = false) {
        return HTTP.post(`${APPLICATION_NAME}/reports/${panel}/${id}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createReportDraft(data: object, panel: string, withFile = false) {
        return HTTP.put(`${APPLICATION_NAME}/me/reports/${panel}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },
    createReportDraftId(data: object, panel: string, id: string, withFile = false) {
        return HTTP.put(`${APPLICATION_NAME}/me/reports/${panel}/${id}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    
    getReport(panel: string) {
        return HTTP.get(`${APPLICATION_NAME}/me/reports/${panel}/`)
    },

    getReportId(panel: string, id: string) {
        return HTTP.get(`${APPLICATION_NAME}/me/reports/${panel}/${id}/`)
    },
    getReportDH(panel: string, reportId: string) {
        return HTTP.get(`${APPLICATION_NAME}/reports/${panel}/${reportId}/`)
    },

    createMultipleReport(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.post(`${APPLICATION_NAME}/reports/${panel}/${reportNumber}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },
    createMultipleReportAll(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.post(`${APPLICATION_NAME}/me/reports/${panel}/${reportNumber}/all`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    createMultipleReportDraft(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.put(`${APPLICATION_NAME}/me/reports/${panel}/${reportNumber}/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    getMultipleReport(panel: string, reportNumber: string) {
        return HTTP.get(`${APPLICATION_NAME}/me/reports/${panel}/${reportNumber}/`)
    },

    getMultipleReportDH(panel: string, reportNumber: string, reportId: string) {
        return HTTP.get(`/${APPLICATION_NAME}/reports/${panel}/${reportNumber}/${reportId}/`)
    },

    sendReport(data: object, panel: string) {
        return HTTP.post(`${APPLICATION_NAME}/me/reports/${panel}/send`, data)
    },

    sendReportWithSlash(data: object, panel: string) {
        return HTTP.post(`${APPLICATION_NAME}/me/reports/${panel}/send/`, data)
    },

    sendMultipleReport(data: object, panel: string, reportNumber: string) {
        return HTTP.post(`${APPLICATION_NAME}/me/reports/${panel}/${reportNumber}/send`, data)
    },

    sendReportDH(data: object, panel: string, reportNumber: string, withFile = false) {
        return HTTP.put(`${APPLICATION_NAME}/reports/${panel}/${reportNumber}/district_review/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },
    sendReportDHMultiply(data: object, panel: string, reportId: string,  reportNumber: string, withFile = false) {
        return HTTP.put(`${APPLICATION_NAME}/reports/${panel}/${reportId}/${reportNumber}/district_review/`, data, {
            headers: {
                'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
            },
        })
    },

    sendReportCH(data: object, panel: string, reportNumber: string, withFile = false, isReturn = false) {
        if (!isReturn) {
            return HTTP.put(`${APPLICATION_NAME}/reports/${panel}/${reportNumber}/central_review/`, data, {
                headers: {
                    'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
                },
            });
            // console.log('ВЕРИФИЦИРОВАН ЦШ');
        } else {
            return HTTP.delete(`${APPLICATION_NAME}/reports/${panel}/${reportNumber}/central_review/`, {
                headers: {
                    'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
                },
                data,
            });
            // console.log('НА ДОРАБОТКУ');
        }
    },

    sendMultipleReportCH(data: object, panel: string, reportId: string,  reportNumber: string, withFile = false, isReturn = false) {
        if (!isReturn) {
            return HTTP.put(`${APPLICATION_NAME}/reports/${panel}/${reportId}/${reportNumber}/central_review/`, data, {
                headers: {
                    'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
                },
            });
        } else {
            return HTTP.delete(`${APPLICATION_NAME}/reports/${panel}/${reportId}/${reportNumber}/central_review/`, {
                headers: {
                    'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
                },
                data,
            });
        }
    },

    getSentReports() {
        return HTTP.get(`/${APPLICATION_NAME}/get_sent_reports/`)
    }
}