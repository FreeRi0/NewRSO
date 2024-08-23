import { HTTP } from '@app/http';
import { DistrictHeadquarter, GetDistrictHeadquartersParams } from './types';
import { PaginatedResponse } from '../types';

export function getDistrictHeadquarters(
    params?:  GetDistrictHeadquartersParams,
) {
                     // в дженерике массив убери, там автоматически подставляется
    return HTTP.get<PaginatedResponse<DistrictHeadquarter>>('/districts', {
        params,
    });
}