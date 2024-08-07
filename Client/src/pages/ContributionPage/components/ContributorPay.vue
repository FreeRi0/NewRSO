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
                        :is-paid="
                            session.authorizedUser?.membership_fee ?? false
                        "
                    />
                </UiTabWindow>
                <UiTabWindow tab-id="contributors-list">
                    <div class="list-container">
                        <UiSearchInput class="search" />
                        <aside></aside>
                    </div>
                    <RoleGuard
                        :neededRoles="[UserRole.REGIONAL_HEADQUARTER_COMMANDER]"
                    >
                    </RoleGuard>
                </UiTabWindow>
            </div>
        </UiTabContainer>
    </div>
</template>
<script setup lang="ts">
import { ContributionStatus } from '@entities/Contributor';
import { RoleGuard, UserRole } from '@entities/Role';
import { useSession } from '@entities/Session';
import {
    UiButton,
    UiHeading,
    UiSearchInput,
    UiTab,
    UiTabContainer,
    UiTabWindow,
} from '@shared/ui';

const session = useSession();
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
    grid-template-rows: 52px minmax(300px, 1fr);
}

.search {
    grid-row: 1/2;
}
</style>
