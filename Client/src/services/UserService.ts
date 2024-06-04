import { HTTP } from '@app/http';

export function getUser() {
    return HTTP.get(`/rsousers/me/`,);
}
export function getRsouserById(id: string) {
    return HTTP.get(`/rsousers/${id}/`,);
}
