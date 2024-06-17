import { HTTP } from '@app/http';

//Получить данные по всем мероприятиям
export function getListActions() {
    return HTTP.get('/events/',);
}
export function getListActionsBySearch(text: string) {
    return HTTP.get(`/events/?search=${text}`,);
}
export function getListActionsByFilter(text: string) {
    return HTTP.get(`/events/${text}`,);
}
//Изменить дату мероприятия
export function putTimeData(id: number, data: object) {
    return HTTP.put(`/events/${id}/time_data/`, data,);
}
//Отправка формы мероприятия
export function createAction(data: object) {
    return HTTP.post('/events/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
    });
}
export function getAction(id: number) {
    return HTTP.get(`/events/${id}`,);
}
export function putAction(id: number, data: object) {
    return HTTP.put(`/events/${id}/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
    });
}
//Отправка и изменение запросов
export function createQuestion(id: number, data: object) {
    return HTTP.post(`/events/${id}/answers`, data,);
}
export function getQuestion(id: number) {
    return HTTP.get(`/events/${id}/answers`,);
}
//Отправка и изменение организаторов мероприятия
export function createOrganizator(id: number, data: object) {
    return HTTP.post(`/events/${id}/organizers/`, data,);
}
export function getOrganizator(id: number) {
    return HTTP.get(`/events/${id}/organizers`,);
}

export function putOrganizator(id: number, data: object, org_id: number) {
    return HTTP.put(`/events/${id}/organizers/${org_id}/`, data,);
}

export function patchOrganizator(id: number, data: object, org_id: number) {
    return HTTP.patch(`/events/${id}/organizers/${org_id}/`, data,);
}

export function deleteOrganizator(id: number, org_id: number) {
    return HTTP.delete(`/events/${id}/organizers/${org_id}/`,);
}

//Получить и добавить документы пользователя
export function getDocuments(id: number) {
    return HTTP.get(`/events/${id}/user_documents`,);
}
export function putDocuments(id: number, data: object) {
    return HTTP.put(`/events/${id}/document_data/`, data,);
}

//Получить участников мероприятия
export function getParticipants(id: number) {
    return HTTP.get(`/events/${id}/participants`,);
}

//Временная функция
export function getRoles() {
    return HTTP.get(`/rsousers/me_commander`,);
}

export function getRsousers() {
    return HTTP.get(`/rsousers`,);
}
