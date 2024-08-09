import { HTTP } from '@app/http';
import { GetDistrictHeadquartersParams, DistrictHeadquarter } from './types';
import { PaginatedResponse } from '../types';

export function getDistrictHeadquarters(params: GetDistrictHeadquartersParams) {
    return HTTP.get<PaginatedResponse<DistrictHeadquarter>>('/districts', {
        params,
    });
}
