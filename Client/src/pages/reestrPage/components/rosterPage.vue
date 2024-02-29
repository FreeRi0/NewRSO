<template>
    <div class="container">
        <div class="contributor">
            <h2 class="contributor-title">Реестр участников</h2>
            <div class="contributor-search">
                <input
                    type="text"
                    id="search"
                    class="contributor-search__input"
                    @keyup="searchItems"
                    v-model="name"
                    placeholder="Начинайте ввод?"
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
                        :sorted-participants="sortedHeadquarters"
                    />
                </div>
                <div class="contributor-items">
                    <div class="contributor-sort">
                        <div class="sort-layout">
                            <button
                                class="showInfoBtn mr-4"
                                v-if="!showInfo"
                                @click="showInfo = !showInfo"
                            >
                                Показать статистику
                            </button>

                            <button
                                class="showInfoBtn mr-4"
                                v-else-if="showInfo"
                                @click="showInfo = !showInfo"
                            >
                                Скрыть статистику
                            </button>
                        </div>

                        <div class="sort-filters">
                            <div class="sort-select">
                                <sortByEducation
                                    variant="outlined"
                                    clearable
                                    v-model="sortBy"
                                    :options="sortOptionss"
                                    :sorts-boolean="false"
                                ></sortByEducation>
                            </div>

                            <Button
                                type="button"
                                class="ascend mb-2"
                                icon="switch"
                                @click="ascending = !ascending"
                                color="white"
                            ></Button>
                        </div>
                    </div>
                    <registryList
                        :items="sortedHeadquarters"
                        :show-info="showInfo"
                    ></registryList>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.contributor {
    padding: 0px 0px 60px 0px;
    &-title {
        font-size: 52px;
    }
    &-sort {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin-bottom: 32px;
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

.showInfoBtn {
    padding: 6px 16px;
    border: 1px solid #35383f;
    border-radius: 10px;
    margin-bottom: 8px;
    height: 40px;
}

.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
</style>

<script setup>
import { ref, computed, watch, inject, onMounted, onActivated } from 'vue';
import { sortByEducation } from '@shared/components/selects';
import { filters } from '@features/Contributor/components';
import { Button } from '@shared/components/buttons';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';
import { registryList } from '@features/registry/components';

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
const showInfo = ref(false);
const educ = ref(null);
const sortedVal = ref([]);
//Сортировк
const ascending = ref(true);
const levelAccess = ref(7);
const name = ref('');
let search = '';

const sortBy = ref('alphabetically');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    // { value: 'founding_date', name: 'Дате создания штаба' },
    // { value: 'members_count', name: 'Количеству участников' },
]);

const viewHeadquartersData = async (resp, search, join) => {
    try {
        isLoading.value = true;
        const viewHeadquartersResponse = await HTTP.get(resp + search, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        let response = viewHeadquartersResponse.data;
        if (join) {
            const viewHeadquartersResponsetTwo = await HTTP.get(
                '/educationals/' + search,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            response = response.concat(viewHeadquartersResponsetTwo.data);
        }
        sortedVal.value = response;
        isLoading.value = false;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

// const sortedItems = async () => {
//     let search = '';
//     let resp = '';
//     if (detachment.value) {
//         resp = '/rsousers';
//         search = '?detachment__name=' + detachment.value;
//     } else if (educ.value) {
//         resp = '/detachments/';
//         search = '?educational_headquarter__name=' + educ.value;
//     } else if (local.value) {
//         resp = '/educationals/';
//         search = '?local__name=' + local.value;
//     } else if (reg.value) {
//         resp = '/locals/';
//         search = '?regional__name=' + reg.value;
//     } else if (district.value) {
//         resp = '/regionals/';
//         search = '?district__name=' + district.value;
//     }
//     viewHeadquartersData(resp, search);
// };

const updateDistrict = (districtVal) => {
    let search = '';
    let resp = '/regionals/';
    search = '?district_headquarter__name=' + districtVal;

    if (name.value) search += '&search=' + name.value;
    viewHeadquartersData(resp, search);

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
    let resp = '/locals/';
    if (regVal) {
        search = '?regional_headquarter__name=' + regVal;
    } else if (levelAccess.value < 2) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewHeadquartersData(resp, search);

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
    let resp = localVal ? '/educationals/' : '/locals/';
    console.log('level', levelAccess.value, localVal);
    if (localVal) {
        search = '?local_headquarter__name=' + localVal;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (name.value) search += '&search=' + name.value;

    viewHeadquartersData(resp, search, !localVal);

    let locId = localsStore.locals.find((loc) => loc.name == localVal)?.id;
    let regId = regionalsStore.regionals.find(
        (regional) => regional.name == reg.value,
    )?.id;
    local.value = localVal;
    educHead.value = educationalsStore.educationals.filter(
        (edh) => locId && edh.local_headquarter == locId,
    );
};

const updateEduc = (educVal) => {
    let search = '';
    let resp = educVal
        ? '/detachments/'
        : local.value
        ? '/educationals/'
        : '/locals/';
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

    viewHeadquartersData(resp, search);
    // , educVal && !local.value
    let educId = educationalsStore.educationals.find(
        (edh) => edh.name == educVal,
    )?.id;
    let regId = regionalsStore.regionals.find(
        (regional) => regional.name == reg.value,
    )?.id;
    educ.value = educVal;
    detachments.value = squadsStore.squads.filter(
        (squad) => educId && squad.educational_headquarter == educId,
    );
};

const updateDetachment = (detachmentVal) => {
    let search = '';
    let resp = detachmentVal ? '/rsousers' : educ.value ? '/detachments/' : '';
    if (detachmentVal) {
        search = '?detachment__name=' + detachmentVal;
    } else if (levelAccess.value < 5) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (name.value) search += '&search=' + name.value;

    viewHeadquartersData(resp, search);
    detachment.value = detachmentVal;
};

const searchItems = (event) => {
    let search = '';
    let resp = '';
    if (!name.value && roles.roles.value.centralheadquarter_commander) {
        return [];
    }
    if (district.value) {
        resp = '/regionals/';
        // search = '?regional_headquarter__name=' + reg.value;
        search = '?district_headquarter__name=' + district.value;
    }
    if (reg.value) {
        resp = '/locals/';
        // search = '?local_headquarter__name=' + local.value;
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (local.value) {
        resp = local.value ? '/educationals/' : '/locals/';

        // search = '?educational_headquarter_name=' + educ.value;
        search = '?local_headquarter__name=' + local.value;
    }
    if (educ.value) {
        resp = educ.value
            ? '/detachments/'
            : local.value
            ? '/educationals/'
            : '/locals/';
        search = '?detachment__name=' + detachment.value;

        search = '?educational_headquarter__name=' + educ.value;
    }
    if (detachment.value) {
        resp = '/rsousers';
        search = '?detachment__name=' + detachment.value;
    }
    if (search) {
        search += '&search=' + name.value;
    }

    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        viewHeadquartersData(resp, search);
    }, 400);
};

const sortedHeadquarters = computed(() => {
    let tempHeadquarters = sortedVal.value;

    tempHeadquarters = tempHeadquarters.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a?.name.toLowerCase(),
                fb = b?.name.toLowerCase()

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        }
    });

    if (!ascending.value) {
        tempHeadquarters.reverse();
    }
    return tempHeadquarters;
});

watch(
    () => roles.roles.value,

    (newRole, oldRole) => {
        if (!roles.roles.value.centralheadquarter_commander) {
            let search = '';
            let resp = '';
            let join = false;

            if (roles.roles.value.districtheadquarter_commander) {
                district.value =
                    roles.roles.value.districtheadquarter_commander.name;
                search =
                    '?district_headquarter__name=' +
                    roles.roles.value.districtheadquarter_commander.name;
                resp = '/regionals/';
                levelAccess.value = 1;
            } else if (roles.roles.value.regionalheadquarter_commander) {
                reg.value =
                    roles.roles.value.regionalheadquarter_commander.name;
                search =
                    '?regional_headquarter__name=' +
                    roles.roles.value.regionalheadquarter_commander.name;
                resp = '/locals/';
                join = true;
                levelAccess.value = 2;
            } else if (roles.roles.value.localheadquarter_commander) {
                local.value = roles.roles.value.localheadquarter_commander.name;
                search =
                    '?local_headquarter__name=' +
                    roles.roles.value.localheadquarter_commander.name;
                resp = '/educationals/';
                levelAccess.value = 3;
            } else if (roles.roles.value.educationalheadquarter_commander) {
                educ.value =
                    roles.roles.value.educationalheadquarter_commander.name;
                search =
                    '?educational_headquarter__name=' +
                    roles.roles.value.educationalheadquarter_commander.name;
                resp = '/detachments/';
                levelAccess.value = 4;
            } else if (roles.roles.value.detachment_commander) {
                detachment.value = roles.roles.value.detachment_commander.name;
                search =
                    '?detachment__name=' +
                    roles.roles.value.detachment_commander.name;
                resp = '/rsousers';
                levelAccess.value = 5;
            }
            viewHeadquartersData(resp, search, join);
        } else {
            levelAccess.value = 0;
        }
    },
);

watch(
    () => regionalsStore.regionals,
    () => {
        regionals.value = regionalsStore.regionals;
        let regId = regionalsStore.regionals.find(
            (regional) => regional.name == reg.value,
        )?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter == regId,
        );
        educHead.value = educationalsStore.educationals.filter(
            (edh) => edh.regional_headquarter == regId,
        );
        detachments.value = squadsStore.squads.filter(
            (squad) => squad.regional_headquarter == regId,
        );
    },
);

watch(
    () => localsStore.locals,
    () => {
        locals.value = localsStore.locals;
        let regId = regionalsStore.regionals.find(
            (regional) => regional.name == reg.value,
        )?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter == regId,
        );
    },
);

watch(
    () => educationalsStore.educationals,
    () => {
        educHead.value = educationalsStore.educationals;
        let regId = regionalsStore.regionals.find(
            (regional) => regional.name == reg.value,
        )?.id;
        educHead.value = educationalsStore.educationals.filter(
            (edh) => edh.regional_headquarter == regId,
        );
    },
);
watch(
    () => squadsStore.squads,
    () => {
        detachments.value = squadsStore.squads;
        let regId = regionalsStore.regionals.find(
            (regional) => regional.name == reg.value,
        )?.id;
        // let educId = regionalsStore.educationals.find(
        //     (ed) => ed.name == educ.value,
        // )?.id;
        detachments.value = squadsStore.squads.filter(
            (squad) => squad.regional_headquarter == regId,
        );
    },
);

onMounted(() => {
    viewHeadquartersData(search);
});
</script>
