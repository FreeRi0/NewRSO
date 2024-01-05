import { HTTP } from '@app/http';

export function getListActions(){
   return HTTP.get("/events/", {
       headers:{
           'Content-Type': 'application/json',
           Authorization: 'Token ' + localStorage.getItem('Token'),
       }
   });
}