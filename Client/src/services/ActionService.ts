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
export function createAction({ data }: { data: any }){
    return HTTP.post("/events/", data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}
