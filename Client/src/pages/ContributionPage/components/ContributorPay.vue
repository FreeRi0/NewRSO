<template>
    <div class="container">
        <div class="contributor">
            <h2 class="contributor-title">Членский взнос</h2>
            <div class="d-flex mt-7 buttonWrapper">
                <button
                    type="button"
                    class="contributorBtn"
                    :class="{ activee: picked === true }"
                    @click="picked = true"
                >
                    Мой членский взнос
                </button>

                <button
                    type="button"
                    class="contributorBtn"
                    :class="{ activee: picked === false }"
                    @click="picked = false"
                >
                    Данные об оплате членского взноса пользователями системы
                </button>
            </div>

            <div
                class="contributor-info"
                v-if="
                    picked === true &&
                    userStore.currentUser.membership_fee === false
                "
            >
                Уважаемый пользователь, ваш членский взнос не оплачен.
            </div>

            <div
                class="contributor-info"
                v-else-if="
                    picked === true &&
                    userStore.currentUser.membership_fee === true
                "
            >
                Уважаемый пользователь, ваш членский взнос оплачен.
            </div>

            <div
                v-else-if="
                    picked === false &&
                    roles.roles.value.regionalheadquarter_commander
                "
            >
                <div class="contributor-search">
                    <input
                        type="text"
                        id="search"
                        class="contributor-search__input"
                        v-model.trim="name"
                        placeholder="Поищем пользователей?"
                    />
                    <img src="@app/assets/icon/search.svg" alt="search" />
                </div>

                <div class="contributor-container">
                    <!-- <div class="filters">
                        <h3 class="filters-title">Основные фильтры</h3>
                        <v-expansion-panels>
                            <v-expansion-panel
                                v-if="
                                    roles.roles.value
                                        .centralheadquarter_commander
                                "
                            >
                                <v-expansion-panel-title>
                                    <template v-slot:default="{ expanded }">
                                        <v-row no-gutters>
                                            <v-col
                                                cols="4"
                                                class="d-flex justify-start"
                                            >
                                                Окружной штаб
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <districtSearchFilter
                                        open-on-clear
                                        id="reg"
                                        name="regdrop"
                                        placeholder="Выберите окружной штаб"
                                        v-model="district"
                                        @update:value="changeValue"
                                        class="mb-2 region-input"
                                        :items="districtsStore.districts"
                                        :SortDropdown="true"
                                    ></districtSearchFilter>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                            <v-expansion-panel v-if="district !== null">
                                <v-expansion-panel-title>
                                    <template v-slot:default="{ expanded }">
                                        <v-row no-gutters>
                                            <v-col
                                                cols="4"
                                                class="d-flex justify-start"
                                            >
                                                Региональный штаб
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <regionalsDropdown
                                        open-on-clear
                                        id="reg"
                                        name="regdrop"
                                        placeholder="Выберите рег штаб"
                                        v-model="reg"
                                        @update:value="changeValue"
                                        class="mb-2 region-input"
                                        :items="regionals"
                                        :SortDropdown="true"
                                    ></regionalsDropdown>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                            <v-expansion-panel v-if="reg !== null">
                                <v-expansion-panel-title>
                                    <template v-slot:default="{ expanded }">
                                        <v-row no-gutters>
                                            <v-col
                                                cols="4"
                                                class="d-flex justify-start"
                                            >
                                                Местный штаб
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <localSearchFilter
                                        open-on-clear
                                        id="reg"
                                        name="regdrop"
                                        placeholder="Выберите местный штаб"
                                        v-model="local"
                                        @update:value="changeValue"
                                        class="mb-2 region-input"
                                        :items="locals"
                                        :SortDropdown="true"
                                    ></localSearchFilter>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                            <v-expansion-panel v-if="local !== null">
                                <v-expansion-panel-title>
                                    <template v-slot:default="{ expanded }">
                                        <v-row no-gutters>
                                            <v-col
                                                cols="4"
                                                class="d-flex justify-start"
                                            >
                                                Обазовательный штаб
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <educationalsDropdown
                                        open-on-clear
                                        id="reg"
                                        name="regdrop"
                                        placeholder="Выберите обр штаб"
                                        v-model="educ"
                                        @update:value="changeValue"
                                        class="mb-2 region-input"
                                        :items="educHead"
                                        :SortDropdown="true"
                                    ></educationalsDropdown>
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel v-if="educ !== null">
                                <v-expansion-panel-title>
                                    <template v-slot:default="{ expanded }">
                                        <v-row no-gutters>
                                            <v-col
                                                cols="4"
                                                class="d-flex justify-start"
                                            >
                                                ЛСО
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <lsoSerachFilter
                                        open-on-clear
                                        id="reg"
                                        name="regdrop"
                                        placeholder="Выберите отряд"
                                        v-model="detachment"
                                        @update:value="changeValue"
                                        class="mb-2 region-input"
                                        :items="detachments"
                                        :SortDropdown="true"
                                    ></lsoSerachFilter>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>

                        <p>
                            Найдено пользователей:
                            {{ sortedParticipants.length }}
                        </p>
                    </div> -->

                    <div class="filters">
                        <filters
                            @update-district="updateDistrict"
                            @update-reg="updateReg"
                            @update-local="updateLocal"
                            @update-educ="updateEduc"
                            @update-detachment="updateDetachment"
                            :area="false"
                            :level-search="false"
                            :district="district"
                            :districts="districts"
                            :reg="reg"
                            :regionals="regionals"
                            :local="local"
                            :locals="locals"
                            :educ="educ"
                            :educ-head="educHead"
                            :detachment="detachment"
                            :detachments="detachments"
                            :roles="roles.roles.value"
                            :sorted-participants="sortedParticipants"
                        />
                    </div>
                    <div class="contributor-items">
                        <div class="contributor-sort">
                            <div class="contributor-sort__all">
                                <input
                                    type="checkbox"
                                    @click="select"
                                    v-model="checkboxAll"
                                />
                            </div>
                            <div class="sort-filters">
                                <div class="sort-select">
                                    <sortByEducation
                                        variant="outlined"
                                        clearable
                                        v-model="sortBy"
                                        :options="sortOptionss"
                                    ></sortByEducation>
                                </div>

                                <Button
                                    type="button"
                                    class="ascend"
                                    icon="switch"
                                    @click="ascending = !ascending"
                                    color="white"
                                ></Button>
                            </div>
                        </div>
                        <div class="contributor-wrapper">
                            <contributorsList
                                :participants="sortedParticipants"
                                :selected-peoples="selectedPeoples"
                                @change="changePeoples"
                                v-if="!isLoading"
                            ></contributorsList>
                            <v-progress-circular
                                class="circleLoader"
                                v-else
                                indeterminate
                                color="blue"
                            ></v-progress-circular>
                        </div>
                        <Button
                            @click="participantsVisible += step"
                            v-if="participantsVisible < participants.length"
                            label="Показать еще"
                        ></Button>
                        <Button
                            @click="participantsVisible -= step"
                            v-else
                            label="Свернуть все"
                        ></Button>
                    </div>
                </div>
                <div class="selectedItems" v-if="selectedPeoples.length > 0">
                    <h3>Итого: {{ selectedPeoples.length }}</h3>

                    <checkedContributors
                        @change="changePeoples"
                        :participants="selectedPeoples"
                    ></checkedContributors>
                </div>
            </div>
            <div v-else class="mt-12">
                Доступно только для командиров рег штабов
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { Dropdown } from '@shared/components/dropdown';
import { Input } from '@shared/components/inputs';
import {
    contributorsList,
    checkedContributors,
    filters,
} from '@features/Contributor/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';

const roleStore = useRoleStore();
const userStore = useUserStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();
const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();

const participants = storeToRefs(userStore);
const participantsVisible = ref(12);
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Членский взнос', href: '/contributorPay' },
]);

const selectedAnswer = ref('Пользователи');
const selectedCat = ref('Все');
const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const educHead = ref([]);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
const picked = ref(true);
const checkboxAll = ref(false);
const levelAccess = ref(7);
const step = ref(12);
const selectedPeoples = ref([]);
const ascending = ref(true);
const sortBy = ref('alphabetically');

const updateDistrict = (districtVal) => {
    viewContributorsData('?district_headquarter__name=' + districtVal);
    let districtId = districtsStore.districts.find(
        (dis) => dis.name == districtVal,
    )?.id;
    district.value = districtVal;
    regionals.value = regionalsStore.regionals.filter(
        (regional) => regional.district_headquarter == districtId,
    );
};

const updateReg = (regVal) => {
    if (regVal) {
        viewContributorsData('?regional_headquarter__name=' + regVal);
    } else if (levelAccess.value < 2) {
        viewContributorsData('?district_headquarter__name=' + district.value);
    }

    let regId = regionalsStore.regionals.find(
        (regional) => regional.name == regVal,
    )?.id;
    reg.value = regVal;
    locals.value = localsStore.locals.filter(
        (loc) => loc.regional_headquarter == regId,
    );
};
const updateLocal = (localVal) => {
    if (localVal) {
        viewContributorsData('?local_headquarter__name=' + localVal);
    } else if (levelAccess.value < 3) {
        viewContributorsData('?regional_headquarter__name=' + reg.value);
    }

    let locId = localsStore.locals.find((loc) => loc.name == localVal)?.id;
    local.value = localVal;
    educHead.value = educationalsStore.educationals.filter(
        (edh) => edh.local_headquarter == locId,
    );
};

const updateEduc = (educVal) => {
    if (educVal) {
        viewContributorsData('?educational_headquarter__name=' + educVal);
    } else if (levelAccess.value < 4) {
        viewContributorsData('?local_headquarter__name=' + local.value);
    }
    let educId = educationalsStore.educationals.find(
        (edh) => edh.name == educVal,
    )?.id;
    educ.value = educVal;
    detachments.value = squadsStore.squads.filter(
        (squad) => squad.educational_headquarter == educId,
    );
};

const updateDetachment = (detachmentVal) => {
    if (detachmentVal) {
        viewContributorsData('?detachment__name=' + detachmentVal);
    } else if (levelAccess.value < 5) {
        viewContributorsData('?educational_headquarter__name=' + educ.value);
    }
    detachment.value = detachmentVal;
};

const viewContributorsData = async (search) => {
    try {
        isLoading.value = true;

        const viewParticipantsResponse = await HTTP.get('/rsousers' + search, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        participants.users.value = viewParticipantsResponse.data;
        isLoading.value = false;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const select = (event) => {
    selectedPeoples.value = [];
    console.log('fffss', checkboxAll.value, event);
    if (event.target.checked) {
        console.log('fffss', checkboxAll.value, event);
        for (let index in participants.users.value) {
            console.log('arr', selectedPeoples.value);
            selectedPeoples.value.push(participants.users.value[index]);
        }
    }
};
const name = ref('');

const changePeoples = (CheckedUser, UserId) => {
    let participant = {};
    console.log('fff', CheckedUser, UserId);
    if (CheckedUser) {
        participant = participants.users.value.find(
            (item) => item.id == UserId,
        );
        selectedPeoples.value.push(participant);
    } else {
        selectedPeoples.value = selectedPeoples.value.filter(
            (item) => item.id !== UserId,
        );
    }
};

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'date_of_birth', name: 'По дате вступления в РСО' },
]);

const sortedParticipants = computed(() => {
    let tempParticipants = participants.users.value;
    if (name.value.length > 3) {
        userStore.searchUsers(name.value);
    } else if (roles.roles.value.centralheadquarter_commander) {
        return [];
    } else {
        // let search = '';
        // if (district.value) {
        //     search = '?district_headquarter__name=' + district.value;
        // } else if (reg.value) {
        //     search = '?regional_headquarter__name=' + reg.value;
        // }

        // viewContributorsData(search);
    }

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.first_name.toLowerCase(),
                fb = b.first_name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'date_of_birth') {
            let fc = a.date_of_birth,
                fn = b.date_of_birth;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        }
    });

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);
    return tempParticipants;
});

watch(
    () => roles.roles.value,

    (newRole, oldRole) => {
        if (!roles.roles.value.centralheadquarter_commander) {
            let search = '';

            if (roles.roles.value.districtheadquarter_commander) {
                district.value =
                    roles.roles.value.districtheadquarter_commander.name;
                search =
                    '?district_headquarter__name=' +
                    roles.roles.value.districtheadquarter_commander.name;
                levelAccess.value = 1;
            } else if (roles.roles.value.regionalheadquarter_commander) {
                reg.value =
                    roles.roles.value.regionalheadquarter_commander.name;
                search =
                    '?regional_headquarter__name=' +
                    roles.roles.value.regionalheadquarter_commander.name;
                levelAccess.value = 2;
            } else if (roles.roles.value.localheadquarter_commander) {
                local.value = roles.roles.value.localheadquarter_commander.name;
                search =
                    '?local_headquarter__name=' +
                    roles.roles.value.localheadquarter_commander.name;
                levelAccess.value = 3;
            } else if (roles.roles.value.educationalheadquarter_commander) {
                educ.value =
                    roles.roles.value.educationalheadquarter_commander.name;
                search =
                    '?educational_headquarter__name=' +
                    roles.roles.value.educationalheadquarter_commander.name;
                levelAccess.value = 4;
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
        }
    },
);

watch(
    () => regionalsStore.regionals,
    () => {
        regionals.value = regionalsStore.regionals;
    },
);

watch(
    () => localsStore.locals,
    () => {
        locals.value = localsStore.locals;
    },
);

watch(
    () => educationalsStore.educationals,
    () => {
        educHead.value = educationalsStore.educationals;
    },
);
watch(
    () => squadsStore.squads,
    () => {
        detachments.value = squadsStore.squads;
    },
);
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
    border: 1px solid #b6b6b6;
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
</style>
