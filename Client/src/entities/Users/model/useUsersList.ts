import { usersApi } from '@shared/api';
import { toReactive, watchDebounced } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';

type Filters = Omit<usersApi.GetUsersParams, 'offset' | 'limit'>;

type Props = {
    /**
     * С какой страницы начинаем загрузку
     *
     * @default 1
     */
    initialPage?: number;
    /**
     * Сколько записей на каждой странице
     *
     * @default 12
     */
    recordsPerPage?: number;
    /**
     * Добавлять ли записи с новых страниц к предыдущим
     * Если false - при переходе на следующую страницу
     * массив пользователей будет перезаписан (то есть
     * в нем всегда будет recordsPerPage записей)
     * Если true - записи с новых страниц добавляются к старым
     * (первая страница - в массиве recordsPerPage пользователей,
     * вторая страница - длинна массива recordsPerPage * 2 и т.д.)
     *
     *  @default false
     */
    append?: boolean;
    /**
     * @default 1000
     */
    debounce?: number;
    /**
     * @default 2000
     */
    maxWait?: number;
};

export function useUsersList({
    initialPage = 1,
    recordsPerPage = 12,
    append = false,
    debounce = 1000,
    maxWait = 2000,
}: Props = {}) {
    const filters = ref<Filters>({});
    const usersList = ref<usersApi.User[]>([]);
    const currentPage = ref<number>(initialPage);
    const totalCount = ref<number>(0);
    const searchQuery = ref<string>('');

    const maxPage = computed(() =>
        Math.ceil(totalCount.value / recordsPerPage),
    );
    const isLastPage = computed(() => currentPage.value >= maxPage.value);
    const isFirstPage = computed(() => currentPage.value <= 1);
    const isResultsFound = computed(() => totalCount.value > 0);
    const isSinglePage = computed(() => isLastPage.value && isFirstPage.value);

    const showedRecordsCount = computed(() => usersList.value.length);

    const next = async () => {
        if (isLastPage.value) {
            return;
        }

        currentPage.value++;
        const offset = (currentPage.value - 1) * recordsPerPage;
        const loadedUsers = await usersApi.getUsers({
            ...filters.value,
            search: searchQuery.value,
            limit: recordsPerPage,
            offset,
        });
        if (append) {
            usersList.value = usersList.value.concat(loadedUsers.data.results);
            return;
        }
        usersList.value = loadedUsers.data.results;
        totalCount.value = loadedUsers.data.count;
    };

    const prev = async () => {
        if (isFirstPage.value) {
            return;
        }

        currentPage.value--;

        if (append) {
            usersList.value = usersList.value.slice(
                0,
                currentPage.value * recordsPerPage,
            );
            return;
        }

        await setPage(currentPage.value);
    };

    const fetchPage = async (page: number) => {
        currentPage.value = page;

        if (append) {
            const limit = recordsPerPage * page;
            const loadedUsers = await usersApi.getUsers({
                ...filters.value,
                search: searchQuery.value,
                limit,
                offset: 0,
            });
            usersList.value = loadedUsers.data.results;
            totalCount.value = loadedUsers.data.count;
            return;
        }
        const offset = (currentPage.value - 1) * recordsPerPage;
        const loadedUsers = await usersApi.getUsers({
            ...filters.value,
            search: searchQuery.value,
            limit: recordsPerPage,
            offset,
        });

        usersList.value = loadedUsers.data.results;
        totalCount.value = loadedUsers.data.count;
    };

    const setPage = async (page: number) => {
        if (page < 1) {
            return;
        }

        await fetchPage(page);
    };

    const setFilters = (newFilters: Filters) => {
        filters.value = {
            ...filters.value,
            ...newFilters,
        };
    };

    const refetch = async () => {
        await setPage(1);
    };

    fetchPage(currentPage.value);

    watch(filters, () => refetch(), { deep: true });
    watchDebounced(searchQuery, () => refetch(), { debounce, maxWait });

    watch(
        () => filters.value.central_headquarter__name,
        () => {
            setFilters({
                district_headquarter__name: '',
            });
        },
    );

    watch(
        () => filters.value.district_headquarter__name,
        () => {
            setFilters({
                regional_headquarter__name: '',
            });
        },
    );

    watch(
        () => filters.value.regional_headquarter__name,
        () => {
            setFilters({
                local_headquarter__name: '',
            });
        },
    );

    watch(
        () => filters.value.local_headquarter__name,
        () => {
            setFilters({
                educational_headquarter__name: '',
            });
        },
    );

    return toReactive({
        searchQuery,
        isResultsFound,
        isSinglePage,
        filters,
        usersList,
        isLastPage,
        isFirstPage,
        currentPage,
        totalCount,
        next,
        prev,
        setPage,
        refetch,
        setFilters,
        showedRecordsCount,
    });
}
