<template>
    <div class="container">
        <UiHeading> Членский взнос </UiHeading>
        <UiTabContainer initial-selection="my-contribution">
            <div class="buttons-container">
                <UiTab tab-id="my-contribution" v-slot="{ setSelectedTab, isSelected }">
                    <UiButton @click="setSelectedTab" :active="isSelected">
                        Мой членский взнос
                    </UiButton>
                </UiTab>
                <UiTab tab-id="contributors-list" v-slot="{ setSelectedTab, isSelected }">
                    <UiButton @click="setSelectedTab" :active="isSelected">
                        Данные об оплате членского взноса пользователями системы
                    </UiButton>
                </UiTab>
            </div>
            <div class="tab-views-container">
                <UiTabWindow tab-id="my-contribution">
                    <ContributionStatus :is-paid="authorizedUser?.membership_fee" :is-loading="isLoading" />
                </UiTabWindow>
                <UiTabWindow tab-id="contributors-list">
                    <div class="list-container">
                        <UiSearchInput v-model="searchQuery" placeholder="Поищем пользователей?" class="search" />
                        <div class="contributors-list-heading">
                            <UiButton @click="filtersMenu.openSideMenu()" class="filter-button" variant="tertiary">
                                <SvgIcon icon-name="filter" />
                            </UiButton>
                            <RoleGuard :needed-roles="[
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                            ]">
                                <UiCheckbox v-model="userIdList" :value="usersList.map(({ id }) => id)" />
                                <UiSelector v-model="membersFeeStatus" :options="[
                                    { label: 'Оплачен', value: true },
                                    { label: 'Не оплачен', value: false },
                                ]" />
                            </RoleGuard>
                            <SortBySelector :is-reversed="isReverseOrder" v-model="sortBy"
                                :reverse-sort-order="reverseSortOrder" class="sort-by" />
                        </div>
                        <aside class="filters">
                            <UiHeading variant="h4">Основные фильтры</UiHeading>
                            <RoleGuard :needed-roles="[
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                            ]">
                                <DistrictHeadquarterFilter v-slot="{ districtHeadquarters }">
                                    <UiSearchInput placeholder="Начните вводить" :auto-complete-values="districtHeadquarters
                                        " v-model="filters.district_headquarter__name
                                            " variant="small" />
                                </DistrictHeadquarterFilter>
                            </RoleGuard>

                            <p class="filter-info" v-if="filters.district_headquarter__name">
                                Выбрано:
                                {{ filters.district_headquarter__name }}
                            </p>

                            <RoleGuard :needed-roles="[
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                            ]">
                                <RegionalHeadquarterFilter :district-headquarter-name="filters.district_headquarter__name
                                    " v-slot="{ regionalHeadquarters }">
                                    <UiSearchInput placeholder="Начните вводить" :auto-complete-values="regionalHeadquarters
                                        " v-model="filters.regional_headquarter__name
                                            " variant="small" />
                                </RegionalHeadquarterFilter>
                            </RoleGuard>
                            <p class="filter-info" v-if="filters.regional_headquarter__name">
                                Выбрано:
                                {{ filters.regional_headquarter__name }}
                            </p>

                            <RoleGuard :needed-roles="[
                                UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                            ]">
                                <LocalHeadquarterFilter :regional-headquarter-name="filters.regional_headquarter__name
                                    " :district-headquarter-name="filters.district_headquarter__name
                                        " v-slot="{ localHeadquarters }">
                                    <UiSearchInput placeholder="Начните вводить" :auto-complete-values="localHeadquarters
                                        " v-model="filters.local_headquarter__name
                                            " variant="small" />
                                </LocalHeadquarterFilter>
                            </RoleGuard>
                            <p class="filter-info" v-if="filters.local_headquarter__name">
                                Выбрано:
                                {{ filters.local_headquarter__name }}
                            </p>

                            <RoleGuard :needed-roles="[
                                UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                UserRole.LOCAL_HEADQUARTER_COMMANDER,
                                UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                            ]">
                                <EducationalHeadquarterFilter :local-headquarter-name="filters.local_headquarter__name
                                    " :district-headquarter-name="filters.district_headquarter__name
                                        " :regional-headquarter-name="filters.regional_headquarter__name
                                        " v-slot="{ educationalHeadquarters }">
                                    <UiSearchInput placeholder="Начните вводить" :auto-complete-values="educationalHeadquarters
                                        " v-model="filters.educational_headquarter__name
                                            " variant="small" />
                                </EducationalHeadquarterFilter>
                            </RoleGuard>
                            <p class="filter-info" v-if="filters.educational_headquarter__name">
                                Выбрано:
                                {{ filters.educational_headquarter__name }}
                            </p>

                            <RoleGuard :needed-roles="[
                                UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                UserRole.LOCAL_HEADQUARTER_COMMANDER,
                                UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                UserRole.EDUCATIONAL_HEADQUARTER_COMMANDER,
                            ]">
                                <DetachmentHeadquarterFilter :local-headquarter-name="filters.local_headquarter__name
                                    " :district-headquarter-name="filters.district_headquarter__name
                                        " :regional-headquarter-name="filters.regional_headquarter__name
                                        " :educational-headquarter-name="filters.educational_headquarter__name
                                        " v-slot="{ educationalHeadquarters }">
                                    <UiSearchInput placeholder="Начните вводить" :auto-complete-values="educationalHeadquarters
                                        " v-model="filters.detachment__name" variant="small" />
                                </DetachmentHeadquarterFilter>
                            </RoleGuard>
                            <p class="filter-info" v-if="filters.detachment__name">
                                Выбрано:
                                {{ filters.detachment__name }}
                            </p>

                            <MemberFeeFilter v-model="filters.membership_fee" />

                            <p class="filter-info">
                                Показано {{ showedRecordsCount }} из
                                {{ totalCount }} результатов
                            </p>
                            <UiSideMenu title="Основные фильтры">
                                <RoleGuard :needed-roles="[
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]">
                                    <DistrictHeadquarterFilter v-slot="{ districtHeadquarters }">
                                        <UiSearchInput placeholder="Начните вводить" :auto-complete-values="districtHeadquarters
                                            " v-model="filters.district_headquarter__name
                                                " variant="small" />
                                    </DistrictHeadquarterFilter>
                                </RoleGuard>

                                <p class="filter-info" v-if="filters.district_headquarter__name">
                                    Выбрано:
                                    {{ filters.district_headquarter__name }}
                                </p>

                                <RoleGuard :needed-roles="[
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                ]">
                                    <RegionalHeadquarterFilter :district-headquarter-name="filters.district_headquarter__name
                                        " v-slot="{ regionalHeadquarters }">
                                        <UiSearchInput placeholder="Начните вводить" :auto-complete-values="regionalHeadquarters
                                            " v-model="filters.regional_headquarter__name
                                                " variant="small" />
                                    </RegionalHeadquarterFilter>
                                </RoleGuard>
                                <p class="filter-info" v-if="filters.regional_headquarter__name">
                                    Выбрано:
                                    {{ filters.regional_headquarter__name }}
                                </p>

                                <RoleGuard :needed-roles="[
                                    UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]">
                                    <LocalHeadquarterFilter :regional-headquarter-name="filters.regional_headquarter__name
                                        " :district-headquarter-name="filters.district_headquarter__name
                                            " v-slot="{ localHeadquarters }">
                                        <UiSearchInput placeholder="Начните вводить" :auto-complete-values="localHeadquarters
                                            " v-model="filters.local_headquarter__name
                                                " variant="small" />
                                    </LocalHeadquarterFilter>
                                </RoleGuard>
                                <p class="filter-info" v-if="filters.local_headquarter__name">
                                    Выбрано:
                                    {{ filters.local_headquarter__name }}
                                </p>

                                <RoleGuard :needed-roles="[
                                    UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    UserRole.LOCAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]">
                                    <EducationalHeadquarterFilter :local-headquarter-name="filters.local_headquarter__name
                                        " :district-headquarter-name="filters.district_headquarter__name
                                            " :regional-headquarter-name="filters.regional_headquarter__name
                                            " v-slot="{ educationalHeadquarters }">
                                        <UiSearchInput placeholder="Начните вводить" :auto-complete-values="educationalHeadquarters
                                            " v-model="filters.educational_headquarter__name
                                                " variant="small" />
                                    </EducationalHeadquarterFilter>
                                </RoleGuard>
                                <p class="filter-info" v-if="filters.educational_headquarter__name">
                                    Выбрано:
                                    {{ filters.educational_headquarter__name }}
                                </p>

                                <RoleGuard :needed-roles="[
                                    UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    UserRole.LOCAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                    UserRole.EDUCATIONAL_HEADQUARTER_COMMANDER,
                                ]">
                                    <DetachmentHeadquarterFilter :local-headquarter-name="filters.local_headquarter__name
                                        " :district-headquarter-name="filters.district_headquarter__name
                                            " :regional-headquarter-name="filters.regional_headquarter__name
                                            " :educational-headquarter-name="filters.educational_headquarter__name
                                            " v-slot="{ educationalHeadquarters }">
                                        <UiSearchInput placeholder="Начните вводить" :auto-complete-values="educationalHeadquarters
                                            " v-model="filters.detachment__name" variant="small" />
                                    </DetachmentHeadquarterFilter>
                                </RoleGuard>
                                <p class="filter-info" v-if="filters.detachment__name">
                                    Выбрано:
                                    {{ filters.detachment__name }}
                                </p>

                                <MemberFeeFilter v-model="filters.membership_fee" />

                                <p class="filter-info">
                                    Показано {{ showedRecordsCount }} из
                                    {{ totalCount }} результатов
                                </p>
                            </UiSideMenu>
                        </aside>
                        <div class="contributors-list-wrapper">
                            <TransitionGroup v-if="isResultsFound" name="list" tag="ul" class="contributors-list">
                                <li v-for="user in usersList" :key="user.id" class="list-item">
                                    <RoleGuard :needed-roles="[
                                        UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                        UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                        UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    ]">
                                        <UiButton variant="tertiary">
                                            <UiCheckbox v-model="userIdList" :value="user.id" />
                                        </UiButton>
                                    </RoleGuard>
                                    <ContributorItem :avatar-url="user.avatar.photo ?? undefined
                                        " :first-name="user.first_name" :last-name="user.last_name" :patronymic-name="user.patronymic_name ?? undefined
                                            " :birthday="user.date_of_birth" :is-fee-payed="user.membership_fee"
                                        :id="user.id" />
                                </li>
                            </TransitionGroup>
                            <UiButton variant="secondary" v-if="isLoadMoreBtnShowed" @click="next">Показать ещё
                            </UiButton>
                            <UiButton v-if="isLoadPrevBtnShowed" variant="secondary" @click="setPage(1)">Скрыть
                            </UiButton>
                            <p v-if="!isResultsFound" class="filter-info">
                                Результаты не найдены
                            </p>
                        </div>
                    </div>
                    <div class="change-status-list-wrapper" v-if="selectedUsersCount !== 0">
                        <UiHeading variant="h3">
                            Итого: {{ selectedUsersCount }}
                        </UiHeading>
                        <div class="change-status-list-wrapper">
                            <TransitionGroup v-if="isResultsFound" name="list" tag="ul"
                                class="contributors-list change">
                                <li v-for="user in selectedUsersList" :key="user.id" class="list-item">
                                    <ContributorItem :avatar-url="user.avatar.photo ?? undefined
                                        " :first-name="user.first_name" :last-name="user.last_name" :patronymic-name="user.patronymic_name ?? undefined
                                            " :birthday="user.date_of_birth" :is-fee-payed="membersFeeStatus"
                                        :id="user.id" />
                                    <UiButton variant="tertiary">
                                        <UiCheckbox v-model="userIdList" :value="user.id" />
                                    </UiButton>
                                </li>
                            </TransitionGroup>
                        </div>
                        <UiButton class="save-status-button" variant="secondary" @click="handleStatusChange">Сохранить
                        </UiButton>
                    </div>
                </UiTabWindow>
            </div>
        </UiTabContainer>
    </div>
</template>
<script setup lang="ts">
import { ContributionStatus, ContributorItem } from '@entities/Contributor';
import { RoleGuard, UserRole, useRole } from '@entities/Role';
import { useSession } from '@entities/Session';
import {
    DetachmentHeadquarterFilter,
    DistrictHeadquarterFilter,
    EducationalHeadquarterFilter,
    LocalHeadquarterFilter,
    MemberFeeFilter,
    RegionalHeadquarterFilter,
    SortBySelector,
    useUsersList,
} from '@entities/Users';
import { useChangeMembersFeeStatus } from '@features/changeMemebersFeeStatus';
import {
    SvgIcon,
    UiButton,
    UiCheckbox,
    UiHeading,
    UiSearchInput,
    UiSelector,
    UiSideMenu,
    UiTab,
    UiTabContainer,
    UiTabWindow,
    useSideMenu,
} from '@shared/ui';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

const { authorizedUser, isLoading } = storeToRefs(useSession());
const {
    searchQuery,
    isSinglePage,
    isResultsFound,
    setPage,
    usersList,
    filters,
    isLastPage,
    isReverseOrder,
    isFirstPage,
    next,
    totalCount,
    showedRecordsCount,
    setFilters,
    sortBy,
    reverseSortOrder,
    refetch,
} = useUsersList({ append: true, recordsPerPage: 24 });
const { userHeadquarters } = storeToRefs(useRole());
const filtersMenu = useSideMenu();
const { userIdList, selectedUsersCount, applyStatus, membersFeeStatus } =
    useChangeMembersFeeStatus();

const handleStatusChange = async () => {
    await applyStatus();
    setTimeout(() => console.log('timeout'), 1000);
    await refetch();
};

const selectedUsersList = computed(() =>
    usersList.value.filter(({ id }) => userIdList.value.includes(id)),
);

const isLoadMoreBtnShowed = computed(
    () => isResultsFound.value && !isSinglePage.value && !isLastPage.value,
);

const isLoadPrevBtnShowed = computed(
    () =>
        isResultsFound.value &&
        isLastPage.value &&
        !isFirstPage.value &&
        !isSinglePage.value,
);

watch(
    () => userHeadquarters.value,
    () => {
        setFilters({
            central_headquarter__name:
                userHeadquarters.value?.centralheadquarter_commander?.name,
            district_headquarter__name:
                userHeadquarters.value?.districtheadquarter_commander?.name,
            regional_headquarter__name:
                userHeadquarters.value?.regionalheadquarter_commander?.name,
            local_headquarter__name:
                userHeadquarters.value?.localheadquarter_commander?.name,
            educational_headquarter__name:
                userHeadquarters.value?.localheadquarter_commander?.name,
        });
    },
);
</script>
<style scoped>
.change-status-list-wrapper {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
}

.save-status-button {
    align-self: center;
}

.change-status-list {
    padding-top: 30px;
}

.buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 40px;
    padding-bottom: 60px;
}

.tab-views-container {
    padding-bottom: 40px;
}

.list-container {
    display: grid;
    grid-template-rows: 52px 52px 1fr;
    grid-template-columns: minmax(120px, 25%) 1fr;
    row-gap: 40px;
    column-gap: 20px;
    max-width: 100%;
}

.list-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
}

.search {
    grid-row: 1/2;
    grid-column: 1/-1;
}

.filters {
    grid-row: 2/-1;
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filter-info {
    color: #898989;
    font-size: 16px;
}

.contributors-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-self: stretch;
    justify-content: flex-start;
}

.contributors-list-heading {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}

.contributors-list-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.filter-text {
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
}

.radio-buttons-field {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    margin-bottom: 16px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

button.filter-button {
    width: 32px;
    height: 32px;
    --padding: 0;
    display: none;
}

@media screen and (max-width: 890px) {
    .list-container {
        grid-template-columns: 0 1fr;
        column-gap: 0;
    }

    .filters {
        overflow: hidden;
    }

    button.filter-button {
        display: flex;
    }
}

.sort-by {
    margin-left: auto;
}
</style>
