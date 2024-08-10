import { HTTP } from '@app/http';
import { GetRegionalHeadquartersParams, RegionalHeadquarter } from './types';

export function getRegionalHeadquarters(params: GetRegionalHeadquartersParams) {
    return HTTP.get<RegionalHeadquarter[]>('/regionals', {
        params,
    });
}
