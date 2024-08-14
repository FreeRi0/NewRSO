import { HTTP } from '@app/http';
import {
    DetachmentHeadquarter,
    GetDetachmentHeadquartersParams,
} from './types';

export function getDetachmentHeadquarters(
    params?: GetDetachmentHeadquartersParams,
) {
    return HTTP.get<DetachmentHeadquarter[]>('/detachments', {
        params,
    });
}
