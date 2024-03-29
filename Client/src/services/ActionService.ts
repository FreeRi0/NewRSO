import { HTTP } from '@app/http';

//Получить данные по всем мероприятиям
export function getListActions() {
    return HTTP.get('/events/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function getListActionsBySearch(text: string) {
    return HTTP.get(`/events/?search=${text}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function getListActionsByFilter(text: string) {
    return HTTP.get(`/events/${text}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
//Изменить дату мероприятия
export function putTimeData(id: number, data: object) {
    return HTTP.put(`/events/${id}/time_data/`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
//Отправка формы мероприятия
export function createAction(data: object) {
    return HTTP.post('/events/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function getAction(id: number) {
    return HTTP.get(`/events/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function putAction(id: number, data: object) {
    return HTTP.put(`/events/${id}/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
//Отправка и изменение запросов
export function createQuestion(id: number, data: object) {
    return HTTP.post(`/events/${id}/answers`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function getQuestion(id: number) {
    return HTTP.get(`/events/${id}/answers`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
//Отправка и изменение организаторов мероприятия
export function createOrganizator(id: number, data: object) {
    return HTTP.post(`/events/${id}/organizers/`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function getOrganizator(id: number) {
    return HTTP.get(`/events/${id}/organizers`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}

export function putOrganizator(id: number, data: object, org_id: number) {
    return HTTP.put(`/events/${id}/organizers/${org_id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}

//Получить и добавить документы пользователя
export function getDocuments(id: number) {
    return HTTP.get(`/events/${id}/user_documents`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
export function putDocuments(id: number, data: object) {
    return HTTP.put(`/events/${id}/document_data/`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}

//Получить участников мероприятия
export function getParticipants(id: number) {
    return HTTP.get(`/events/${id}/participants`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}

//Временная функция
export function getRoles() {
    return HTTP.get(`/rsousers/me_commander`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}

export function getRsousers() {
    return HTTP.get(`/rsousers`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
