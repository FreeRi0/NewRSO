import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserRole } from '../types';
import { usersApi } from '@shared/api';

const ROLE_STORE_KEY = 'store:roleStore';

export const useRole = defineStore(ROLE_STORE_KEY, () => {
    const userRoles = ref<UserRole[]>();
    const userHeadquarters = ref<usersApi.UserHeadquarters>();

    const setUserRoles = (rolesObject: usersApi.UserHeadquarters) => {
        const mappedRoles: UserRole[] = Object.entries(rolesObject)
            .filter(([, value]) => value)
            .map(([role]) => {
                switch (role) {
                    case 'centralheadquarter_commander':
                        return UserRole.CENTRAL_HEADQUARTER_COMMANDER;
                    case 'districtheadquarter_commander':
                        return UserRole.CENTRAL_HEADQUARTER_COMMANDER;
                    case 'regionalheadquarter_commander':
                        return UserRole.REGIONAL_HEADQUARTER_COMMANDER;
                    case 'localheadquarter_commander':
                        return UserRole.LOCAL_HEADQUARTER_COMMANDER;
                    case 'educationalheadquarter_commander':
                        return UserRole.REGIONAL_HEADQUARTER_COMMANDER;
                    case 'detachment_commander':
                        return UserRole.DETACHMENT_COMMANDER;
                    default:
                        return null;
                }
            })
            .filter((val) => val !== null) as UserRole[];
        userRoles.value = mappedRoles;
    };

    const fetchRoles = async () => {
        try {
            const res = await usersApi.getAuthorizedUserRoles();
            setUserRoles(res.data);
            userHeadquarters.value = res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const has = (role: UserRole) => userRoles.value?.includes(role);

    fetchRoles();

    return {
        fetchRoles,
        has,
        userHeadquarters,
    };
});
