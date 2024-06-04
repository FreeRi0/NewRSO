import { HTTP } from '@app/http';

//Образовательные (Местные) штабы
export function getEducationals() {
    return HTTP.get('/educationals',);
}

//ЛСО
export function getDetachments() {
    return HTTP.get('/detachments/',);
}

//ЛСО
export function getDistrits() {
    return HTTP.get('/distrits/',);
}

//Универсальный запрос (Экспериментальное)

export function getParticipants(id: string) {
    return HTTP.get(`/events/${id}/paticipants/`,);
}
