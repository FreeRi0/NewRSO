import { HTTP } from '@app/http';

export function getListActions(){
   return HTTP.get("/events/", {
       headers:{
           'Content-Type': 'application/json',
           Authorization: 'Token ' + localStorage.getItem('Token'),
       }
   });
}

export function getActionsBySearch({ data }: { data: any }){
    return HTTP.post("/events/", data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        }
    })
}