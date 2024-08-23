import { HTTP } from '@app/http';
import { GetRegionalHeadquartersParams, RegionalHeadquarter } from './types';
import { PaginatedResponse } from '../types';

export function getRegionalHeadquarters(params?: GetRegionalHeadquartersParams) {
    return HTTP.get<PaginatedResponse<RegionalHeadquarter>>('/regionals', {
        params,
    });
}
