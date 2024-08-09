<template>
    <div class="container">
        <UiHeading> Членский взнос </UiHeading>
        <UiTabContainer initial-selection="my-contribution">
            <div class="buttons-container">
                <UiTab
                    tab-id="my-contribution"
                    v-slot="{ setSelectedTab, isSelected }"
                >
                    <UiButton @click="setSelectedTab" :active="isSelected">
                        Мой членский взнос
                    </UiButton>
                </UiTab>
                <UiTab
                    tab-id="contributors-list"
                    v-slot="{ setSelectedTab, isSelected }"
                >
                    <UiButton @click="setSelectedTab" :active="isSelected">
                        Данные об оплате членского взноса пользователями системы
                    </UiButton>
                </UiTab>
            </div>
            <div class="tab-views-container">
                <UiTabWindow tab-id="my-contribution">
                    <ContributionStatus
                        :is-paid="authorizedUser?.membership_fee"
                        :is-loading="isLoading"
                    />
                </UiTabWindow>
                <UiTabWindow tab-id="contributors-list">
                    <div class="list-container">
                        <UiSearchInput
                            v-model="filters.search"
                            placeholder="Поищем пользователей?"
                            class="search"
                        />
                        <aside class="filters">
                            <UiHeading variant="h4">Основные фильтры</UiHeading>
                            <RoleGuard
                                :needed-roles="[
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]"
                            >
                                <DistrictHeadquarterFilter
                                    v-slot="{ districtHeadquarters }"
                                >
                                    <UiSearchInput
                                        placeholder="Начните вводить"
                                        :auto-complete-values="
                                            districtHeadquarters
                                        "
                                        v-model="
                                            filters.district_headquarter__name
                                        "
                                        variant="small"
                                    />
                                </DistrictHeadquarterFilter>
                                <p
                                    class="filter-info"
                                    v-if="filters.district_headquarter__name"
                                >
                                    Выбрано:
                                    {{ filters.district_headquarter__name }}
                                </p>
                            </RoleGuard>

                            <p
                                class="filter-info"
                                v-if="filters.district_headquarter__name"
                            >
                                Выбрано:
                                {{ filters.district_headquarter__name }}
                            </p>

                            <RoleGuard
                                :needed-roles="[
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                ]"
                            >
                                <RegionalHeadquarterFilter
                                    :district-headquarter-name="
                                        filters.district_headquarter__name
                                    "
                                    v-slot="{ regionalHeadquarters }"
                                >
                                    <UiSearchInput
                                        placeholder="Начните вводить"
                                        :auto-complete-values="
                                            regionalHeadquarters
                                        "
                                        v-model="
                                            filters.regional_headquarter__name
                                        "
                                        variant="small"
                                    />
                                </RegionalHeadquarterFilter>
                            </RoleGuard>
                            <p
                                class="filter-info"
                                v-if="filters.regional_headquarter__name"
                            >
                                Выбрано:
                                {{ filters.regional_headquarter__name }}
                            </p>

                            <RoleGuard
                                :needed-roles="[
                                    UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]"
                            >
                                <LocalHeadquarterFilter
                                    :regional-headquarter-name="
                                        filters.regional_headquarter__name
                                    "
                                    v-slot="{ localHeadquarters }"
                                >
                                    <UiSearchInput
                                        placeholder="Начните вводить"
                                        :auto-complete-values="
                                            localHeadquarters
                                        "
                                        v-model="
                                            filters.local_headquarter__name
                                        "
                                        variant="small"
                                    />
                                </LocalHeadquarterFilter>
                            </RoleGuard>
                            <p
                                class="filter-info"
                                v-if="filters.local_headquarter__name"
                            >
                                Выбрано:
                                {{ filters.local_headquarter__name }}
                            </p>

                            <RoleGuard
                                :needed-roles="[
                                    UserRole.REGIONAL_HEADQUARTER_COMMANDER,
                                    UserRole.LOCAL_HEADQUARTER_COMMANDER,
                                    UserRole.DISTRICT_HEADQUARTER_COMMANDER,
                                    UserRole.CENTRAL_HEADQUARTER_COMMANDER,
                                ]"
                            >
                                <EducationalHeadquarterFilter
                                    :local-headquarter-name="
                                        filters.local_headquarter__name
                                    "
                                    v-slot="{ educationalHeadquarters }"
                                >
                                    <UiSearchInput
                                        placeholder="Начните вводить"
                                        :auto-complete-values="
                                            educationalHeadquarters
                                        "
                                        v-model="
                                            filters.educational_headquarter__name
                                        "
                                        variant="small"
                                    />
                                </EducationalHeadquarterFilter>
                            </RoleGuard>
                            <p
                                class="filter-info"
                                v-if="filters.educational_headquarter__name"
                            >
                                Выбрано:
                                {{ filters.educational_headquarter__name }}
                            </p>

                            <UiAccordion>
                                <template #header="{ toggle }">
                                    <UiHeading @click="toggle" variant="h4"
                                        >Членский взнос</UiHeading
                                    >
                                </template>
                                <template #content>
                                    <div
                                        class="radio-buttons-field filter-text"
                                    >
                                        <input
                                            v-model="filters.membership_fee"
                                            type="radio"
                                            id="fee0"
                                            name="fee"
                                            value=""
                                        />
                                        <label for="fee0">Все</label>
                                    </div>
                                    <div
                                        class="radio-buttons-field filter-text"
                                    >
                                        <input
                                            v-model="filters.membership_fee"
                                            type="radio"
                                            id="fee2"
                                            name="fee"
                                            :value="true"
                                        />
                                        <label for="fee2">Оплачен</label>
                                    </div>
                                    <div
                                        class="radio-buttons-field filter-text"
                                    >
                                        <input
                                            v-model="filters.membership_fee"
                                            type="radio"
                                            id="fee3"
                                            name="fee"
                                            :value="false"
                                        />
                                        <label for="fee3">Не оплачен</label>
                                    </div>
                                </template>
                            </UiAccordion>

                            <p class="filter-info">
                                Показано {{ showedRecordsCount }} из
                                {{ totalCount }} результатов
                            </p>
                        </aside>
                        <div class="contributors-list-wrapper">
                            <ul class="contributors-list">
                                <li v-for="user in usersList" :key="user.id">
                                    <ContributorItem
                                        :avatar-url="
                                            user.avatar.photo ?? undefined
                                        "
                                        :first-name="user.first_name"
                                        :last-name="user.last_name"
                                        :patronymic-name="
                                            user.patronymic_name ?? undefined
                                        "
                                        :birthday="user.date_of_birth"
                                        :is-fee-payed="user.membership_fee"
                                        :id="user.id"
                                    />
                                </li>
                            </ul>
                            <UiButton
                                variant="secondary"
                                v-if="!isLastPage"
                                @click="next"
                                >Показать ещё</UiButton
                            >
                            <UiButton
                                variant="secondary"
                                @click="setPage(1)"
                                v-else
                                >Скрыть</UiButton
                            >
                        </div>
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
    DistrictHeadquarterFilter,
    EducationalHeadquarterFilter,
    LocalHeadquarterFilter,
    MemberFeeFilter,
    RegionalHeadquarterFilter,
    useUsersList,
} from '@entities/Users';
import {
    UiAccordion,
    UiButton,
    UiHeading,
    UiSearchInput,
    UiTab,
    UiTabContainer,
    UiTabWindow,
} from '@shared/ui';
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

const { authorizedUser, isLoading } = storeToRefs(useSession());
const {
    setPage,
    usersList,
    filters,
    isLastPage,
    next,
    totalCount,
    showedRecordsCount,
    setFilters,
} = toRefs(useUsersList({ append: true }));
const { userHeadquarters } = toRefs(useRole());

watch(
    () => userHeadquarters.value,
    () => {
        setFilters.value({
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
<style lang="scss">
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
    grid-template-rows: 52px 1fr;
    grid-template-columns: minmax(120px, 25%) 1fr;
    row-gap: 40px;
    column-gap: 20px;
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
</style>
