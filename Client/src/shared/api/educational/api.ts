import { HTTP } from '@app/http';
import {
    GetEducationalHeadquartersParams,
    EducationalHeadquarter,
} from './types';
import { PaginatedResponse } from '../types';

export function getEducationalHeadquarters(
    params: GetEducationalHeadquartersParams,
) {
    return HTTP.get<PaginatedResponse<EducationalHeadquarter>>(
        '/educationals',
        {
            params,
        },
    );
}
