<template>
    <div class="container">
        <h2 class="action-title">Реестр участников</h2>
        <div class="contributor-search">
            <input
                type="text"
                id="search"
                class="contributor-search__input"
                @keyup="searchContributors"
                v-model="name"
                placeholder="Начинавйте ввод?"
            />
            <img src="@app/assets/icon/search.svg" alt="search" />
        </div>

        <!-- <div class="row-cols-2 action-slides">
            <div class="col" style="width: 100%">
                <div class="sort-container">
                    <div class="sort-layout sort-types">
                        <Button
                            v-if="vertical"
                            type="button"
                            class="dashboard sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        >
                        </Button>
                        <Button
                            v-else="!vertical"
                            type="button"
                            class="dashboardD sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        >
                        </Button>
                        <Button
                            v-if="!vertical"
                            type="button"
                            class="menuuA sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
                        <Button
                            v-else="vertical"
                            type="button"
                            class="menuu sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
                    </div>
                    <div class="sort-alphabet">
                        <sortByEducation
                            variant="outlined"
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-select select"
                        ></sortByEducation>
                        <Button
                            type="button"
                            class="ascend sort-button"
                            icon="switch"
                            @click="ascending = !ascending"
                            color="white"
                        ></Button>
                    </div>
                </div>
                <div class="sort-container">
                    <div class="postcard-container">
                        <div v-if="vertical" v-for="element in SelectList">
                            <ParticipantsCard
                                :action="element"
                            ></ParticipantsCard>
                        </div>
                        <div
                            v-if="!vertical"
                            v-for="element in SelectList"
                        ></div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="contributor-container">
            <div class="filters">
                <filters
                    @update-district="updateDistrict"
                    @update-reg="updateReg"
                    @update-local="updateLocal"
                    @update-educ="updateEduc"
                    @update-detachment="updateDetachment"
                    :level-search="true"
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
                />
            </div>
            <div class="contributor-items">
                <div class="contributor-sort">
                    <div class="sort-layout sort-types">
                        <Button
                            v-if="vertical"
                            type="button"
                            class="dashboard sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        >
                        </Button>
                        <Button
                            v-else="!vertical"
                            type="button"
                            class="dashboardD sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        >
                        </Button>
                        <Button
                            v-if="!vertical"
                            type="button"
                            class="menuuA sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
                        <Button
                            v-else="vertical"
                            type="button"
                            class="menuu sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
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
                <!-- <div class="contributor-wrapper">
                    <template
                        v-for="participant in sortedParticipants"
                        :key="participant.id"
                    >
                        <contributionAccessItem :participant="participant" />
                    </template>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
//Общий стиль компонента
.action {
    &-title {
        height: 116px;
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 32px;
        }
    }
    &-slides {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
}
//Стили аккордеонов
.settings {
    &-container {
        width: 320px;
        margin-right: 16px;
        margin-bottom: 20px;
    }
    &-text {
        align-items: baseline;
    }
    &-buttoms {
        width: 100%;
        margin-top: 40px;
        height: 40px;
        display: flex;
        justify-content: space-around;
    }
    &-select {
        padding-right: 5px;
    }
    &-btm {
        width: 114px;
        border-radius: 10px;
        background-color: #39bfbf;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-btminv {
        width: 114px;
        border-radius: 10px;
        border: 2px solid #35383f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-body {
        display: flex;
        flex-direction: column;
    }
}
//Стиль карточки
.postcard {
    &-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    &-containerline {
        display: flex;
        width: 100%;
        flex-direction: column;
    }
}
//Стиль сортировки
.sort {
    &-container {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    &-select {
        margin-right: 8px;
    }
    &-types {
        height: 50px;
    }
    &-button {
        margin-right: 5px;
        border: 1px solid black;
        border-radius: 5px;
        width: 25px;
        height: 25px;
    }
    &-alphabet {
        width: 320px;
        display: flex;
        justify-content: flex-end;
    }
    &-select {
        height: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    &-radio {
    }
    .education {
        width: 305px;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
}
.dashboard {
    background-image: url('@app/assets/icon/darhboard-active.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.dashboardD {
    background-image: url('@app/assets/icon/darhboard-disable.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.menuuA {
    background-image: url('@app/assets/icon/MenuA.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.menuu {
    background-image: url('@app/assets/icon/Menu.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
//Стиль карточки
.postcard {
    &-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    &-containerline {
        display: flex;
        width: 100%;
        flex-direction: column;
    }
}
//Стиль поисковика
.searcher {
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
}
.squads-search {
    position: relative;
    box-sizing: border-box;

    svg {
        position: absolute;
        top: 10px;
        left: 16px;
    }

    &__input {
        width: 100%;
        padding: 13px 0px 10px 60px;
        border-radius: 10px;
        border: 1px solid black;
    }
}
</style>

<script setup>
import { ref, computed, watch, inject, onMounted, onActivated } from 'vue';
import { sortByEducation } from '@shared/components/selects';
import { filters } from '@features/Contributor/components';
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
//Сортировк
const vertical = ref(true);
const ascending = ref(true);
const levelAccess = ref(7);
const name = ref('');

const sortBy = ref('alphabetically');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
    { value: 'members_count', name: 'Количеству участников' },
]);

//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

const updateDistrict = (districtVal) => {
    let search = '';
    search = '?district_headquarter__name=' + districtVal;

    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);

    let districtId = districtsStore.districts.find(
        (dis) => dis.name == districtVal,
    )?.id;
    district.value = districtVal;
    regionals.value = regionalsStore.regionals.filter(
        (regional) => regional.district_headquarter == districtId,
    );
};

const updateReg = (regVal) => {
    let search = '';
    if (regVal) {
        search = '?regional_headquarter__name=' + regVal;
    } else if (levelAccess.value < 2) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);

    let regId = regionalsStore.regionals.find(
        (regional) => regional.name == regVal,
    )?.id;
    reg.value = regVal;
    locals.value = localsStore.locals.filter(
        (loc) => loc.regional_headquarter == regId,
    );
};
const updateLocal = (localVal) => {
    let search = '';
    if (localVal) {
        search = '?local_headquarter__name=' + localVal;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);

    let locId = localsStore.locals.find((loc) => loc.name == localVal)?.id;
    local.value = localVal;
    educHead.value = educationalsStore.educationals.filter(
        (edh) => edh.local_headquarter == locId,
    );
};

const updateEduc = (educVal) => {
    let search = '';
    if (educVal) {
        search = '?educational_headquarter__name=' + educVal;
    } else if (levelAccess.value < 4) {
        search = '?local_headquarter__name=' + local.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    let educId = educationalsStore.educationals.find(
        (edh) => edh.name == educVal,
    )?.id;
    educ.value = educVal;
    detachments.value = squadsStore.squads.filter(
        (squad) => squad.educational_headquarter == educId,
    );
};

const updateDetachment = (detachmentVal) => {
    let search = '';
    if (detachmentVal) {
        search = '?detachment__name=' + detachmentVal;
    } else if (levelAccess.value < 5) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    detachment.value = detachmentVal;
};

const searchContributors = (event) => {
    let search = '';
    if (!name.value && roles.roles.value.centralheadquarter_commander) {
        return [];
    }
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
    if (search) {
        search += '&search=' + name.value;
    }

    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        viewContributorsData(search);
    }, 400);
};

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
