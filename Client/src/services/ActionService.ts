import { HTTP } from '@app/http';

//Получить данные по всем мероприятиям
export function getListActions(){
   return HTTP.get("/events/", {
       headers:{
           'Content-Type': 'application/json',
           Authorization: 'Token ' + localStorage.getItem('Token'),
       }
   });
}
//Отправка формы мероприятия
export function createAction(data: object){
    return HTTP.post("/events/", data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}
//Отправка и изменение запросов
export function createQuestion(id: number, data: object){
    return HTTP.post(`/events/${id}/answers`, data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    });
}
export function getQuestion(id: number){
    return HTTP.get(`/events/${id}/answers`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}
//Отправка и изменение организаторов мероприятия
export function createOrganizator(id: number, data: object){
    return HTTP.post(`/events/${id}/organizers`, data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    });
}
export function getOrganizator(id: number){
    return HTTP.get(`/events/${id}/organizers`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    });
}