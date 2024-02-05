import { HTTP } from '@app/http';

//Образовательные (Местные) штабы
export function getEducationals(){
    return HTTP.get("/educationals", {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}

//ЛСО
export function getDetachments(){
    return HTTP.get("/detachments/", {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}

//ЛСО
export function getDistrits(){
    return HTTP.get("/distrits/", {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}

//Универсальный запрос (Экспериментальное)

export function getParticipants(responce: string){
    return HTTP.get(`/${responce}/`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}