import { HTTP } from '@app/http';
import {
    DetachmentHeadquarter,
    GetDetachmentHeadquartersParams,
} from './types';
import { PaginatedResponse } from '../types';

export function getDetachmentHeadquarters(
    params?: GetDetachmentHeadquartersParams,
) {
                     // в дженерике массив убери, там автоматически подставляется
    return HTTP.get<PaginatedResponse<DetachmentHeadquarter>>('/detachments', {
        params,
    });
}

