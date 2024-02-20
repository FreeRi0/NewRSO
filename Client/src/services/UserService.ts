import { HTTP } from '@app/http';

export function getRsouserById(id: string) {
    return HTTP.get(`/rsousers/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
}
