import { HTTP } from '@app/http';
import { DistrictHeadquarter, GetDistrictHeadquartersParams } from './types';

export function getDistrictHeadquarters(
    params?: GetDistrictHeadquartersParams,
) {
    return HTTP.get<DistrictHeadquarter[]>('/districts', {
        params,
    });
}
