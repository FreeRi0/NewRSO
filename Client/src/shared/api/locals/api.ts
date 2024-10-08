import { HTTP } from '@app/http';
import { GetLocalHeadquartersParams, LocalHeadquarter } from './types';
import { PaginatedResponse } from '../types';

export function getLocalHeadquarters(
    params?: GetLocalHeadquartersParams,
) {
    // в дженерике массив убери, там автоматически подставляется
    return HTTP.get<PaginatedResponse<LocalHeadquarter>>('/locals', {
        params,
    });
}

