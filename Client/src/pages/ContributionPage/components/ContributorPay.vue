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
            <div>
                <UiTabWindow tab-id="my-contribution">
                    <ContributionStatus
                        :is-paid="currentUser.currentUser.membership_fee"
                    />
                </UiTabWindow>
                <UiTabWindow tab-id="contributors-list">
                    <div class="contributor-search">
                        <input
                            type="text"
                            id="search"
                            class="contributor-search__input"
                            @keyup="searchContributors"
                            v-model="name"
                            placeholder="Поищем пользователей?"
                        />
                        <img src="@app/assets/icon/search.svg" alt="search" />
                    </div>

                    <div class="contributor-container">
                        <div class="filters">
                            <filters
                                @update-district="updateDistrict"
                                @update-reg="updateReg"
                                @update-local="updateLocal"
                                @update-educ="updateEduc"
                                @update-detachment="updateDetachment"
                                @update-membership="updateMembership"
                                @search-detachment="searchDetachment"
                                :district="district"
                                :districts="districts"
                                :reg="reg"
                                :regionals="regionals"
                                :local="local"
                                :locals="locals"
                                :membership="membership"
                                :educ="educ"
                                :educ-head="educHead"
                                :detachment="detachment"
                                :detachments="detachments"
                                :roles="roles.roles.value"
                                :sorted-participants="participants"
                                :count-participants="count"
                                :is-membership="true"
                            />
                        </div>
                        <div class="contributor-items">
                            <div class="contributor-sort">
                                <div
                                    class="d-flex align-center"
                                    v-if="
                                        roleStore.roles
                                            .regionalheadquarter_commander
                                    "
                                >
                                    <div class="contributor-sort__all">
                                        <input
                                            type="checkbox"
                                            @click="select"
                                            placeholder="Выбрать все"
                                            v-model="checkboxAll"
                                        />
                                    </div>
                                    <div class="ml-3">Выбрать всё</div>
                                </div>
                                <div class="participants__actions">
                                    <div
                                        class="participants__actions-select mr-3"
                                    >
                                        <sortByEducation
                                            placeholder="Выберете действие"
                                            variant="outlined"
                                            clearable
                                            v-model="action"
                                            :options="actionsList"
                                        ></sortByEducation>
                                    </div>
                                </div>

                                <div class="sort-filters">
                                    <div class="sort-select">
                                        <sortByEducation
                                            variant="outlined"
                                            clearable
                                            v-model="sortBy"
                                            :options="sortOptionss"
                                            :sorts-boolean="false"
                                            class="Sort-alphabet"
                                        >
                                        </sortByEducation>
                                    </div>

                                    <Button
                                        type="button"
                                        class="ascend"
                                        iconn="iconn"
                                        @click="ascending = !ascending"
                                        color="white"
                                    ></Button>
                                </div>
                            </div>
                            <div class="contributor-wrapper">
                                <template
                                    v-for="participant in participants"
                                    :key="participant.id"
                                >
                                    <contributionAccessItem
                                        :participant="participant"
                                        @select="onToggleSelectCompetition"
                                    />
                                </template>
                                <v-progress-circular
                                    class="circleLoader"
                                    v-if="isLoading"
                                    indeterminate
                                    color="blue"
                                ></v-progress-circular>
                                <p
                                    class="text-center"
                                    v-else-if="
                                        !isLoading && !participants.length
                                    "
                                >
                                    Ничего не найдено
                                </p>
                            </div>
                            <template v-if="users.count && users.count > limit">
                                <Button
                                    @click="next"
                                    v-if="participants.length < users.count"
                                    label="Показать еще"
                                ></Button>
                                <Button
                                    @click="prev"
                                    v-else
                                    label="Свернуть все"
                                ></Button>
                            </template>
                        </div>
                    </div>
                    <div
                        class="selectedItems"
                        v-if="selectedPeoples.length > 0"
                    >
                        <h3>Итого: {{ selectedPeoples.length }}</h3>
                        <selectedContributionAccessItem
                            v-for="participant in selectedPeoples"
                            :action="action"
                            :participant="participant"
                            :key="participant.id"
                            @select="onToggleSelectCompetition"
                        />
                    </div>
                    <div
                        class="participants__btn"
                        v-if="selectedPeoples.length"
                    >
                        <Button
                            :loaded="isLoading"
                            :disabled="isLoading || !action"
                            class="save"
                            type="button"
                            label="Сохранить"
                            @click="onAction"
                        ></Button>
                    </div>
                </UiTabWindow>
            </div>
        </UiTabContainer>
    </div>
</template>
<script setup>
// ⬆️⬆️⬆️ Здесь должно быть ещё lang="ts" (как и много где ещё), но приложение не сбилдится прост
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { inject, ref, watch, onMounted } from 'vue';
import {
    UiTab,
    UiTabContainer,
    UiTabWindow,
    UiButton,
    UiHeading,
} from '@shared/ui';
import { ContributionStatus } from '@entities/Contribution';
import { Button } from '@shared/components/buttons';
import { filters } from '@features/Contributor/components';
import {
    contributionAccessItem,
    selectedContributionAccessItem,
} from '@entities/ReferencesPeoples';
import { sortByEducation } from '@shared/components/selects';

const currentUser = useUserStore();
const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();

const users = ref({});
const limit = 12;
const action = ref('Оплачен');
const participants = ref([]);
const actionsList = ref([
    { value: 'Оплачен', name: 'Оплачен' },
    { value: 'Не оплачен', name: 'Не оплачен' },
]);
const swal = inject('$swal');
const regionals = ref([]);
const districts = ref([]);
const membership = ref('all');
const locals = ref([]);
const educHead = ref([]);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const timerSearch = ref(null);
const district = ref(null);
const count = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
const isError = ref([]);
const checkboxAll = ref(false);
const levelAccess = ref(7);
const name = ref('');
const selectedPeoples = ref([]);
const ascending = ref(true);
const sortBy = ref('last_name');
const sortOptionss = ref([{ value: 'last_name', name: 'Алфавиту от А - Я' }]);

const next = () => {
    let search = '';
    viewContributorsData(search, 'next');
    checkboxAll.value = false;
};

const buildSearchQuery = () => {
    let search = [];
    if (district.value)
        search.push(`district_headquarter__name=${district.value}`);
    if (reg.value) search.push(`regional_headquarter__name=${reg.value}`);
    if (local.value) search.push(`local_headquarter__name=${local.value}`);
    if (educ.value) search.push(`educational_headquarter__name=${educ.value}`);
    if (detachment.value) search.push(`detachment__name=${detachment.value}`);
    if (name.value) search.push(`search=${name.value}`);
    return search.length ? `?${search.join('&')}` : '';
};

const viewContributorsData = async (
    search = '',
    pagination = '',
    orderLimit = limit,
) => {
    try {
        isLoading.value = true;
        let url = '/rsousers';
        let data = [search, `limit=${orderLimit}`];
        if (pagination === 'next')
            url = users.value.next.replace('http', 'https');
        if (pagination !== 'next' && sortBy.value) {
            data.push(`ordering=${ascending.value ? '' : '-'}${sortBy.value}`);
        }

        const response = await HTTP.get(`${url}?${data.join('&')}`);
        isLoading.value = false;
        count.value = response.data.count;
        users.value = pagination
            ? {
                  ...users.value,
                  results: [...users.value.results, ...response.data.results],
              }
            : response.data;
        participants.value = users.value.results;
        selectedPeoples.value = [];

        if (search.includes('districts'))
            districts.value = response.data.results;
        else if (search.includes('regionals'))
            regionals.value = response.data.results;
        else if (search.includes('locals'))
            locals.value = response.data.results;
        else if (search.includes('educationals'))
            educHead.value = response.data.results;
        else if (search.includes('detachment_list'))
            detachments.value = response.data.results;
    } catch (error) {
        console.log('an error occurred ' + error);
    }
};

const getFiltersData = async (resp, search = '', lim = '') => {
    try {
        isLoading.value = true;
        const response = await HTTP.get(`${resp}${search}${lim}`);
        isLoading.value = false;

        if (resp.includes('districts')) districts.value = response.data.results;
        else if (resp.includes('regionals'))
            regionals.value = response.data.results;
        else if (resp.includes('locals')) locals.value = response.data.results;
        else if (resp.includes('educationals'))
            educHead.value = response.data.results;
        else if (resp.includes('detachment_list'))
            detachments.value = response.data.results;
    } catch (error) {
        console.log('an error occurred ' + error);
    }
};

const updateDistrict = (districtVal) => {
    district.value = districtVal;
    const search = buildSearchQuery();
    viewContributorsData(search);
    getFiltersData('/regionals/', search);
};

const searchDetachment = (name) => {
    detachment.value = name;
    const search = buildSearchQuery();
    getFiltersData('/detachment_list/', search, '&limit=500');
};

const updateReg = (regVal) => {
    reg.value = regVal;
    const search = buildSearchQuery();
    viewContributorsData(search);
    getFiltersData('/locals/', search);
    getFiltersData('/educationals/', search);
    getFiltersData('/detachment_list/', search, '&limit=500');
};

const updateLocal = (localVal) => {
    local.value = localVal;
    const search = buildSearchQuery();
    viewContributorsData(search);
    getFiltersData('/educationals/', search);
    getFiltersData('/detachment_list/', search, '&limit=500');
};

const updateEduc = (educVal) => {
    educ.value = educVal;
    const search = buildSearchQuery();
    viewContributorsData(search);
    getFiltersData('/detachment_list/', search, '&limit=500');
};

const updateDetachment = (detachmentVal) => {
    detachment.value = detachmentVal;
    const search = buildSearchQuery();
    viewContributorsData(search);
};

const updateMembership = (membershipVal) => {
    membership.value = membershipVal;
    let search = buildSearchQuery();
    if (membershipVal === 'paid') search += '&membership_fee=true';
    else if (membershipVal === 'notPaid') search += '&membership_fee=false';
    viewContributorsData(search);
};

const select = (event) => {
    selectedPeoples.value = [];
    participants.value.forEach((participant) => {
        participant.selected = event.target.checked;
        if (event.target.checked) selectedPeoples.value.push(participant);
    });
};

const onToggleSelectCompetition = (participant, checked) => {
    participant.selected = checked;
    if (checked) {
        selectedPeoples.value.push(participant);
    } else {
        selectedPeoples.value = selectedPeoples.value.filter(
            (c) => c.id !== participant.id,
        );
        checkboxAll.value = false;
    }
};

const ChangeStatus = async (id) => {
    try {
        await HTTP.post(`rsousers/${id}/membership_fee_status/`, {});
        checkboxAll.value = false;
        participants.value.forEach((participant) => {
            if (id === participant.id) participant.membership_fee = true;
        });
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const ChangeCancelStatus = async (id) => {
    try {
        await HTTP.delete(`rsousers/${id}/membership_fee_status/`, {});
        checkboxAll.value = false;
        participants.value.forEach((participant) => {
            if (id === participant.id) participant.membership_fee = false;
        });
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const getUsersByRoles = () => {
    if (!Object.keys(roleStore.roles).length) return false;
    let search = '';
    let lim = '';
    if (!roles.roles.value.centralheadquarter_commander) {
        if (roles.roles.value.districtheadquarter_commander) {
            district.value =
                roles.roles.value.districtheadquarter_commander.name;
            search = `?district_headquarter__name=${roles.roles.value.districtheadquarter_commander.name}`;
            levelAccess.value = 1;
            getFiltersData('/regionals/', search);
        } else if (roles.roles.value.regionalheadquarter_commander) {
            reg.value = roles.roles.value.regionalheadquarter_commander.name;
            search = `?regional_headquarter__name=${roles.roles.value.regionalheadquarter_commander.name}`;
            lim = '&limit=500';
            locals.value = localsStore.locals.filter(
                (loc) => loc.regional_headquarter === reg.value,
            );
            detachments.value = squadsStore.squads.filter(
                (det) => det.regional_headquarter === reg.value,
            );
            levelAccess.value = 2;
            getFiltersData('/educationals/', search, '');
            getFiltersData('/locals/', search, '');
            getFiltersData('/detachment_list/', search, lim);
        } else if (roles.roles.value.localheadquarter_commander) {
            local.value = roles.roles.value.localheadquarter_commander.name;
            search = `?local_headquarter__name=${roles.roles.value.localheadquarter_commander.name}`;
            levelAccess.value = 3;
            getFiltersData('/educationals/', search);
        } else if (roles.roles.value.educationalheadquarter_commander) {
            educ.value =
                roles.roles.value.educationalheadquarter_commander.name;
            search = `?educational_headquarter__name=${roles.roles.value.educationalheadquarter_commander.name}`;
            lim = '&limit=500';
            levelAccess.value = 4;
            getFiltersData('/detanchment_list/', search, lim);
        } else if (roles.roles.value.detachment_commander) {
            detachment.value = roles.roles.value.detachment_commander.name;
            search = `?detachment__name=${roles.roles.value.detachment_commander.name}`;
            levelAccess.value = 5;
        }
        viewContributorsData(search);
    } else {
        levelAccess.value = 0;
        getFiltersData('/districts/', search);
    }
};

const onAction = async () => {
    try {
        for (const application of selectedPeoples.value) {
            if (action.value === 'Оплачен') {
                await ChangeStatus(application.id);
            } else {
                await ChangeCancelStatus(application.id);
            }
            application.selected = false;
            selectedPeoples.value = selectedPeoples.value.filter(
                (participant) => participant.id !== application.id,
            );
        }
        const search = buildSearchQuery();
        viewContributorsData(search);
    } catch (e) {
        console.log('error action', e);
    }
};

const searchContributors = () => {
    const search = buildSearchQuery();
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        viewContributorsData(search, '', '');
    }, 400);
};

watch(() => roles.roles.value, getUsersByRoles);
watch(
    () => districtsStore.districts,
    () => {
        districts.value = districtsStore.districts;
    },
);
watch(
    () => regionalsStore.regionals,
    () => {
        let districtID = districtsStore.districts.length
            ? districtsStore.districts.find(
                  (dis) => dis.name === district.value,
              )?.id
            : roleStore.roles.districtheadquarter_commander?.id;
        regionals.value = regionalsStore.regionals.filter(
            (reg) => reg.district_headquarter === district.value,
        );
    },
);
watch(
    () => localsStore.locals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name === reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter === regID,
        );
    },
);
watch(
    () => educationalsStore.educationals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name === reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        let locID = localsStore.locals.length
            ? localsStore.locals.find((loc) => loc.name === local.value)?.id
            : roleStore.roles.localheadquarter_commander?.id;
        educHead.value = educationalsStore.educationals.filter(
            (edh) => edh.regional_headquarter === regID,
        );
        if (local.value) {
            educHead.value = educationalsStore.educationals.filter(
                (edh) => edh.local_headquarter === locID,
            );
        }
    },
);
watch(
    () => membership.value,
    () => {
        const search = buildSearchQuery();
        viewContributorsData(search);
    },
);
watch(
    () => sortBy.value,
    () => {
        const search = buildSearchQuery();
        viewContributorsData(search, '', participants.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        const search = buildSearchQuery();
        viewContributorsData(search, '', participants.value.length);
    },
);

onMounted(getUsersByRoles);
</script>
<style lang="scss">
.buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 40px;
    padding-bottom: 60px;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

p {
    color: #898989;
}

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}

.contributor {
    padding: 0px 0px 60px 0px;

    &-title {
        font-size: 52px;
    }

    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        @media (max-width: 1024px) {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 60px;
        }
    }

    &-container {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: baseline;
        grid-column-gap: 36px;
    }

    &-search {
        position: relative;
        box-sizing: border-box;
        margin: 60px 0px 0px 0px;

        img {
            position: absolute;
            top: 15px;
            left: 16px;
        }

        &__input {
            width: 100%;
            padding: 13px 0px 10px 60px;
            border-radius: 10px;
            border: 1px solid black;
        }
    }

    &-info {
        font-size: 18px;
        font-weight: 400;
        margin-top: 60px;
    }

    &-wrapper {
        padding-top: 40px;
    }
}

.refer {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 140px;
    margin-top: 60px;
}

.another {
    margin-top: 50px;
}

.form-field label {
    font-size: 16px;
    font-family: BERTSANS;
    font-weight: 600;
    margin-bottom: 8px;
}

.input-big {
    width: 465px;
}

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.ascend {
    margin-left: 5px;
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}

.input-full {
    width: 100%;
}

.contributor-sort__all {
    padding: 11px 12px;
    border: px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;

    input {
        width: 24px;
        height: 24px;
    }
}

.filter {
    margin-top: 20px;
    margin-bottom: 20px;
}

.filters-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 31px;
    margin-bottom: 24px;
}

.selectedItems {
    margin-top: 60px;

    h3 {
        margin-bottom: 40px;
    }
}

.sort {
    &-filters {
        align-items: flex-start;

        @media (max-width: 1024px) {
            margin-top: 20px;
        }
    }
}

.v-expansion-panel {
    &__shadow {
        box-shadow: none;
    }

    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 20px;
        font-weight: 600;
        background-color: transparent;

        &__overlay {
            display: none;
        }
    }
}

.v-expansion-panel:not(:first-child)::after {
    display: none;
}

.v-expansion-panel-title {
    padding: 7px 0px;
}

.participants__actions {
    width: 230px;
}

.option-select .v-field__input input::placeholder,
.form__select .v-field__input input::placeholder {
    color: #35383f;
    opacity: revert;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}

.v-input {
    border: 1px solid #35383f;
}

.Sort-alphabet {
    margin-right: 8px;
}
</style>
