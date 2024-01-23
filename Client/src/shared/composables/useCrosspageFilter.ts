interface CrosspageFilter {
    pageName: string;
    filters: Record<string, unknown>;
}

export default function useCrosspageFilter() {
    // const crosspageFilterStore = useCrosspageFilterStore();

    function addFilter(filter: CrosspageFilter) {
        let previousPageFilters: Record<string, unknown> = {};
        const previousPageFiltersLocalStorage = localStorage.getItem(
            `${filter.pageName}_filters`,
        );

        if (previousPageFiltersLocalStorage)
            previousPageFilters = JSON.parse(previousPageFiltersLocalStorage);

        localStorage.setItem(
            `${filter.pageName}_filters`,
            JSON.stringify({
                ...previousPageFilters,
                ...filter.filters,
            }),
        );
    }

    function removeFilters(pageName: string, filtersProperties: Array<string>) {
        let pageFilters: Record<string, unknown> = {};
        const pageFiltersLocalStorage = localStorage.getItem(
            `${pageName}_filters`,
        );

        if (pageFiltersLocalStorage) {
            pageFilters = JSON.parse(pageFiltersLocalStorage);
        }

        filtersProperties.forEach((propName) => {
            delete pageFilters[propName];
        });

        localStorage.setItem(
            `${pageName}_filters`,
            JSON.stringify(pageFilters),
        );
    }

    function replaceFilters(filter: CrosspageFilter) {
        localStorage.setItem(
            `${filter.pageName}_filters`,
            JSON.stringify(filter.filters),
        );
    }

    return {
        addFilter,
        removeFilters,
        replaceFilters,
    };
}
