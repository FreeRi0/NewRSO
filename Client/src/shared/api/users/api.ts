import { HTTP } from '@app/http';
import {
    UserHeadquarters,
    type CurrentUser,
    GetUsersParams,
    User,
} from './types';
import { PaginatedResponse } from '../types';

export function getAuthorizedUser() {
    return HTTP.get<CurrentUser>('/rsousers/me');
}

export function getAuthorizedUserRoles() {
    return HTTP.get<UserHeadquarters>('/rsousers/me_commander');
}

export function getUsers(params?: GetUsersParams) {
    return HTTP.get<PaginatedResponse<User>>('/rsousers', {
        params,
    });
}
