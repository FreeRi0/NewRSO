import { HTTP } from '@app/http';
import { GetLocalHeadquartersParams, LocalHeadquarter } from './types';

export function getLocalHeadquarters(params: GetLocalHeadquartersParams) {
    return HTTP.get<LocalHeadquarter[]>('/locals', {
        params,
    });
}
