import { usersApi } from '@shared/api';
import { computed, ref } from 'vue';

export function useChangeMembersFeeStatus() {
    const userIdList = ref<number[]>([]);
    const membersFeeStatus = ref<boolean>(true);

    const selectedUsersCount = computed(() => userIdList.value.length);

    const applyStatus = () => {
        const result = Promise.allSettled(
            userIdList.value.map((id) =>
                usersApi.setMembershipStatus(id, membersFeeStatus.value),
            ),
        );

        userIdList.value = [];

        return result;
    };

    return { userIdList, membersFeeStatus, applyStatus, selectedUsersCount };
}
