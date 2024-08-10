import { HTTP } from '@app/http';
import {
    EducationalHeadquarter,
    GetEducationalHeadquartersParams,
} from './types';

export function getEducationalHeadquarters(
    params: GetEducationalHeadquartersParams,
) {
    return HTTP.get<EducationalHeadquarter[]>('/educationals', {
        params,
    });
}
