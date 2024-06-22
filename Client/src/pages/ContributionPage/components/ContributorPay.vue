<template>
    <div class="container">
        <div class="contributor">
            <h2 class="contributor-title">Членский взнос</h2>
            <div class="d-flex mt-7 buttonWrapper">
                <button type="button" class="contributorBtn" :class="{ activee: picked === true }"
                    @click="picked = true">
                    Мой членский взнос
                </button>

                <button type="button" class="contributorBtn" :class="{ activee: picked === false }"
                    @click="picked = false">
                    Данные об оплате членского взноса пользователями системы
                </button>
            </div>

            <div class="contributor-info" v-if="
                picked === true &&
                userStore.currentUser.membership_fee === false
            ">
                Уважаемый пользователь, ваш членский взнос не оплачен.
            </div>

            <div class="contributor-info" v-else-if="
                picked === true &&
                userStore.currentUser.membership_fee === true
            ">
                Уважаемый пользователь, ваш членский взнос оплачен.
            </div>

            <div v-else-if="picked === false">
                <div class="contributor-search">
                    <input type="text" id="search" class="contributor-search__input" @keyup="searchContributors"
                        v-model="name" placeholder="Поищем пользователей?" />
                    <img src="@app/assets/icon/search.svg" alt="search" />
                </div>

                <div class="contributor-container">
                    <div class="filters">
                        <filters @update-district="updateDistrict" @update-reg="updateReg" @update-local="updateLocal"
                            @update-educ="updateEduc" @update-detachment="updateDetachment"
                            @search-detachment="searchDetachment" :district="district" :districts="districts" :reg="reg"
                            :regionals="regionals" :local="local" :locals="locals" :educ="educ" :educ-head="educHead"
                            :detachment="detachment" :detachments="detachments" :roles="roles.roles.value"
                            :sorted-participants="participants" />
                    </div>
                    <div class="contributor-items">
                        <div class="contributor-sort">
                            <div class="d-flex align-center" v-if="
                                roleStore.roles
                                    .regionalheadquarter_commander
                            ">
                                <div class="contributor-sort__all">
                                    <input type="checkbox" @click="select" placeholder="Выбрать все"
                                        v-model="checkboxAll" />
                                </div>
                                <div class="ml-3">Выбрать всё</div>
                            </div>
                            <div class="participants__actions">
                                <div class="participants__actions-select mr-3">
                                    <sortByEducation placeholder="Выберете действие" variant="outlined" clearable
                                        v-model="action" :options="actionsList"></sortByEducation>
                                </div>
                            </div>

                            <div class="sort-filters">
                                <div class="sort-select">
                                    <sortByEducation variant="outlined" clearable v-model="sortBy"
                                        :options="sortOptionss" :sorts-boolean="false" class="Sort-alphabet">
                                    </sortByEducation>
                                </div>

                                <Button type="button" class="ascend" iconn="iconn" @click="ascending = !ascending"
                                    color="white"></Button>
                            </div>
                        </div>
                        <div class="contributor-wrapper">
                            <template v-for="participant in participants" :key="participant.id">
                                <contributionAccessItem :participant="participant"
                                    @select="onToggleSelectCompetition" />
                            </template>
                            <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate
                                color="blue"></v-progress-circular>
                            <p v-else-if="!isLoading && !participants.length">
                                Ничего не найдено
                            </p>
                        </div>
                        <template v-if="users.count && users.count > limit">
                            <Button @click="next" v-if="participants.length < users.count"
                                label="Показать еще"></Button>
                            <Button @click="prev" v-else label="Свернуть все"></Button>
                        </template>
                    </div>
                </div>
                <div class="selectedItems" v-if="selectedPeoples.length > 0">
                    <h3>Итого: {{ selectedPeoples.length }}</h3>
                    <selectedContributionAccessItem v-for="participant in selectedPeoples" :action="action"
                        :participant="participant" :key="participant.id" @select="onToggleSelectCompetition" />
                </div>
                <div class="participants__btn" v-if="selectedPeoples.length">
                    <Button :loaded="isLoading" :disabled="isLoading || !action" class="save" type="button"
                        label="Сохранить" @click="onAction"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { filters } from '@features/Contributor/components';
import {
    contributionAccessItem,
    selectedContributionAccessItem,
} from '@entities/ReferencesPeoples';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed, watch, inject, onMounted, onActivated } from 'vue';

import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();

const userStore = useUserStore();
const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();
const users = ref({});
const limit = 12;
const action = ref('Оплачен');
const participants = ref([]);
const actionsList = ref([
    {
        value: 'Оплачен',
        name: 'Оплачен',
    },
    { value: 'Не оплачен', name: 'Не оплачен' },
]);
const swal = inject('$swal');
const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const educHead = ref([]);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const timerSearch = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
const isError = ref([]);
const picked = ref(true);
const checkboxAll = ref(false);
const levelAccess = ref(7);
const name = ref('');
const selectedPeoples = ref([]);
const ascending = ref(true);
const sortBy = ref('last_name');

const next = () => {
    let search = '';
    if (district.value) {
        search += '?district_headquarter__name=' + district.value;
    }
    if (reg.value) {
        search += '?regional_headquarter__name=' + reg.value;
    }
    if (local.value) {
        search += '?local_headquarter__name=' + local.value;
    }
    if (educ.value) {
        search += '?educational_headquarter__name=' + educ.value;
    }
    if (detachment.value) {
        search = '?detachment__name=' + detachment.value;
    }
    viewContributorsData(search, '', 'next');
};

const prev = () => {
    let search = '';
    if (district.value) {
        search += '?district_headquarter__name=' + district.value;
    }
    if (reg.value) {
        search += '?regional_headquarter__name=' + reg.value;
    }
    if (local.value) {
        search += '?local_headquarter__name=' + local.value;
    }
    if (educ.value) {
        search += '?educational_headquarter__name=' + educ.value;
    }
    if (detachment.value) {
        search = '?detachment__name=' + detachment.value;
    }
    viewContributorsData(search, '', '');

};

const sortOptionss = ref([
    {
        value: 'last_name',
        name: 'Алфавиту от А - Я',
    },
]);

const viewContributorsData = async (search, pagination, orderLimit) => {
    // if (isLoading.value) return false;
    try {
        isLoading.value = true;
        let data = [];
        let url = '/rsousers';
        if (search) data.push(search);
        if (orderLimit) data.push('limit=' + orderLimit);
        else if (!pagination) data.push('limit=' + limit);
        else if (pagination == 'next')
            url = users.value.next.replace('http', 'https');

        if (sortBy.value && !pagination)
            data.push(
                'ordering=' + (ascending.value ? '' : '-') + sortBy.value,
            );
        const viewParticipantsResponse = await HTTP.get(url + data.join('&'));

        isLoading.value = false;
        let response = viewParticipantsResponse.data;
        if (pagination) {
            response.results = [
                ...users.value.results,
                ...response.results,
            ];
        }
        users.value = response;
        participants.value = response.results;
        selectedPeoples.value = [];

        if (search.indexOf('districts') >= 0) {
            districts.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('regionals') >= 0) {
            regionals.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('locals') >= 0) {
            locals.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('educationals') >= 0) {
            educHead.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('detachments') >= 0) {
            detachments.value = viewParticipantsResponse.data.results;
        }
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const getFiltersData = async (resp, search) => {
    try {
        isLoading.value = true;
        const viewHeadquartersResponse = await HTTP.get(resp + search,);
        isLoading.value = false;

        if (resp.indexOf('districts') >= 0) {
            districts.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('regionals') >= 0) {
            regionals.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('locals') >= 0) {
            locals.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('educationals') >= 0) {
            educHead.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('detachments') >= 0) {
            detachments.value = viewHeadquartersResponse.data.results;
        }
    } catch (error) {
        console.log('an error occured ' + error);
    }
};
const updateDistrict = (districtVal) => {
    let search = '';
    if (districtVal) {
        search = '?district_headquarter__name=' + districtVal;
    } else {
        search = '';
    }

    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/regionals/', search);

    district.value = districtVal;
};

const searchDetachment = (name) => {
    let search = [];
    // if (district.value) {
    //     search.push('district_headquarter__name=' + district.value);
    // }
    if (name && reg.value) {
        search.push('regional_headquarter__name=' + reg.value + '&' + 'search=' + name);
    }
    // if (local.value) {
    //     search.push('local_headquarter__name=' + local.value);
    // }
    // if (educ.value) {
    //     search.push('educational_headquarter__name=' + educ.value);
    // }
    // if (name) search.push('search=' + name);

    if (!name && reg.value) {
        search.push('regional_headquarter__name=' + reg.value);
    }
    if (!name && district.value) {
        search.push('district_headquarter__name=' + district.value);
    }
    if (!name && local.value) {
        search.push('local_headquarter__name=' + local.value);
    }
    if (!name && educ.value) {
        search.push('educational_headquarter__name=' + educ.value);
    }
    if (!name && detachment.value) {
        search.push('detachment__name=' + detachment.value);
    }
    getFiltersData('/detachments/', '?' + search.join('&'));

    detachment.value = name;
}

const updateReg = (regVal) => {
    let search = '';
    if (regVal) {
        search = '?regional_headquarter__name=' + regVal;
    } else if (levelAccess.value < 2) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/locals/', search);
    getFiltersData('/educationals/', search);
    getFiltersData('/detachments/', search);

    reg.value = regVal;
};
const updateLocal = (localVal) => {
    let search = '';
    if (localVal) {
        search = '?local_headquarter__name=' + localVal;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search, !localVal);
    getFiltersData('/educationals/', search);

    local.value = localVal;
};

const updateEduc = (educVal) => {
    let search = '';
    if (educVal) {
        search = '?educational_headquarter__name=' + educVal;
    } else if (local.value) {
        search = '?local_headquarter__name=' + local.value;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    } else if (levelAccess.value < 4) {
        search = '?local_headquarter__name=' + local.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);

    educ.value = educVal;
};

const updateDetachment = (detachmentVal) => {
    let search = '';
    if (detachmentVal) {
        search = '?detachment__name=' + detachmentVal;

    } else if (levelAccess.value === 2) {
        search = '?regional_headquarter__name=' + reg.value;
    } else if (levelAccess.value < 5) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);

    detachment.value = detachmentVal;
};

const select = (event) => {
    selectedPeoples.value = [];

    if (event.target.checked) {

        for (let index in participants.value) {


            participants.value[index].selected = true;
            selectedPeoples.value.push(participants.value[index]);
        }
    } else {
        for (let index in participants.value) {

            participants.value[index].selected = false;
        }
    }
};

const onToggleSelectCompetition = (participant, checked) => {
    if (checked) {
        participant.selected = checked;
        selectedPeoples.value.push(participant);
    } else {
        participant.selected = checked;
        selectedPeoples.value = selectedPeoples.value.filter(
            (c) => c.id !== participant.id,
        );
    }
};

const ChangeStatus = async (id) => {
    try {
        const changeStatus = await HTTP.post(
            `rsousers/${id}/membership_fee_status/`,
            {},

        );
        checkboxAll.value = false;

        for (let i in participants.value) {
            if (id === participants.value[i].id) {
                participants.value[i].membership_fee = true;
            }
        }
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const ChangeCancelStatus = async (id) => {
    try {
        const changeCancelStatus = await HTTP.delete(
            `rsousers/${id}/membership_fee_status/`,

            {},
        );

        checkboxAll.value = false;
        for (let i in participants.value) {
            if (id === participants.value[i].id) {
                participants.value[i].membership_fee = false;
            }
        }
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};
const getUsersByRoles = () => {
    if (!Object.keys(roleStore.roles).length) return false;
    if (!roles.roles.value.centralheadquarter_commander) {
        let search = '';
        if (roles.roles.value.districtheadquarter_commander) {
            district.value =
                roles.roles.value.districtheadquarter_commander.name;
            search =
                '?district_headquarter__name=' +
                roles.roles.value.districtheadquarter_commander.name;
            levelAccess.value = 1;
            getFiltersData('/regionals/', search);
        } else if (roles.roles.value.regionalheadquarter_commander) {
            reg.value = roles.roles.value.regionalheadquarter_commander.name;
            search =
                '?regional_headquarter__name=' +
                roles.roles.value.regionalheadquarter_commander.name;
            locals.value = localsStore.locals.filter(
                (loc) => loc.regional_headquarter == reg.value,
            );
            detachments.value = squadsStore.squads.filter((det) => det.regional_headquarter == reg.value,
            );
            levelAccess.value = 2;
            getFiltersData('/educationals/', search);
            getFiltersData('/locals/', search);
            getFiltersData('/detachments/', search);
        } else if (roles.roles.value.localheadquarter_commander) {
            local.value = roles.roles.value.localheadquarter_commander.name;
            search =
                '?local_headquarter__name=' +
                roles.roles.value.localheadquarter_commander.name;
            levelAccess.value = 3;
            getFiltersData('/educationals/', search);
        } else if (roles.roles.value.educationalheadquarter_commander) {
            educ.value =
                roles.roles.value.educationalheadquarter_commander.name;
            search =
                '?educational_headquarter__name=' +
                roles.roles.value.educationalheadquarter_commander.name;
            levelAccess.value = 4;
            getFiltersData('/detachments/', search);
        } else if (roles.roles.value.detachment_commander) {
            detachment.value = roles.roles.value.detachment_commander.name;
            search =
                '?detachment__name=' +
                roles.roles.value.detachment_commander.name;
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
                (participant) => participant.id != application.id,
            );
        }
        let search = '';
        if (district.value) {
            search = '?district_headquarter__name=' + district.value;
        } else if (reg.value) {
            search = '?regional_headquarter__name=' + reg.value;
        } else if (local.value) {
            search = '?local_headquarter__name=' + local.value;
        } else if (educ.value) {
            search = '?educational_headquarter__name=' + educ.value;
        } else if (detachment.value) {
            search = '?detachment__name=' + detachment.value;
        }
    } catch (e) {
        console.log('error action', e);
    }
};



const searchContributors = (event) => {
    let search = '';
    if (!name.value && roles.roles.value.centralheadquarter_commander) {
        return [];
    }
    if (district.value) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (reg.value) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (local.value) {
        search = '?local_headquarter__name=' + local.value;
    }
    if (educ.value) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (detachment.value) {
        search = '?detachment__name=' + detachment.value;
    }
    if (search) {
        search += '&search=' + name.value;
    }

    if (!name.value && reg.value) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (!name.value && district.value) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (!name.value && local.value) {
        search = '?local_headquarter__name=' + local.value;
    }
    if (!name.value && educ.value) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (!name.value && detachment.value) {
        search = '?detachment__name=' + detachment.value;
    }

    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        viewContributorsData(search, '', '');
    }, 400);
};

watch(
    () => roles.roles.value,

    (newRole, oldRole) => {
        getUsersByRoles();
    },
);

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
                (dis) => (dis.name = district.value),
            )?.id
            : roleStore.roles.districtheadquarter_commander?.id;
        regionals.value = regionalsStore.regionals.filter(
            (reg) => reg.district_headquarter == district.value,
        );
    },
);

watch(
    () => localsStore.locals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name == reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter == regID,
        );
    },
);

watch(
    () => educationalsStore.educationals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name == reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        let locID = localsStore.locals.length
            ? localsStore.locals.find((loc) => loc.name == local.value)?.id
            : roleStore.roles.localheadquarter_commander?.id;
        educHead.value = educationalsStore.educationals.filter(
            (edh) => edh.regional_headquarter == regID,
        );
        if (local.value) {
            educHead.value = educationalsStore.educationals.filter(
                (edh) => edh.local_headquarter == locID,
            );
        }
    },
);

watch(
    () => sortBy.value,
    () => {
        let search = '';
        if (district.value) {
            search += '?district_headquarter__name=' + district.value;
        }
        if (reg.value) {
            search += '?regional_headquarter__name=' + reg.value;
        }
        if (local.value) {
            search += '?local_headquarter__name=' + local.value;
        }
        if (educ.value) {
            search += '?educational_headquarter__name=' + educ.value;
        }
        if (detachment.value) {
            search = '?detachment__name=' + detachment.value;
        }
        viewContributorsData(search, '', participants.value.length);
    },
);
watch(
    () => ascending.value,
    () => {
        let search = '';
        if (district.value) {
            search += '?district_headquarter__name=' + district.value;
        }
        if (reg.value) {
            search += '?regional_headquarter__name=' + reg.value;
        }
        if (local.value) {
            search += '?local_headquarter__name=' + local.value;
        }
        if (educ.value) {
            search += '?educational_headquarter__name=' + educ.value;
        }
        if (detachment.value) {
            search = '?detachment__name=' + detachment.value;
        }
        viewContributorsData(search, '', participants.value.length);
    },
);

onMounted(() => {
    getUsersByRoles();
});
</script>
<style lang="scss">
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

p {
    color: #898989;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    margin: 7px;
}

.buttonWrapper {
    @media (max-width: 1024px) {
        flex-wrap: wrap;
        max-width: 650px;
    }
}

.activee {
    background-color: #1c5c94;
    color: white;
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

    &--active+.v-expansion-panel {
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
