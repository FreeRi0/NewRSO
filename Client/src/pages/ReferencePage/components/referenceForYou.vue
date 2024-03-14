<template>
    <div class="container">
        <div class="references">
            <h2 class="references-title">
                Справка о членстве в РСО (для внутреннего пользования)
            </h2>
            <div class="references-search">
                <input
                    type="text"
                    id="search"
                    class="references-search__input"
                    @keyup="searchContributors"
                    v-model="name"
                    placeholder="Поищем пользователей?"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
            <div class="references-container">
                <div class="filters">
                    <filters
                        @update-district="updateDistrict"
                        @update-reg="updateReg"
                        @update-local="updateLocal"
                        @update-educ="updateEduc"
                        @update-detachment="updateDetachment"
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
                <div class="references-items">
                    <div class="references-sort">
                        <div class="d-flex align-center">
                            <div class="references-sort__all">
                                <input
                                    type="checkbox"
                                    @click="select"
                                    v-model="checkboxAll"
                                />
                            </div>
                            <div class="ml-3">Выбрать всё</div>
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
                                ></sortByEducation>
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
                    <div class="references-wrapper">
                        <referencesList
                            v-if="!isLoading"
                            :participants="sortedParticipants"
                            :selected-peoples="selectedPeoples"
                            @change="changePeoples"
                        ></referencesList>
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

            <div class="references-form" v-if="selectedPeoples.length > 0">
                <form action="#" @submit.prevent="SendReference()">
                    <div class="data-form refer">
                        <div class="form-field">
                            <label for="education-org"
                                >Дата начала действия справки<span
                                    class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                name="date_start"
                                type="date"
                                class="input-big"
                                v-model:value="refData.cert_start_date"
                            />
                        </div>
                        <p class="error" v-if="isError.cert_start_date">
                            {{ '' + isError.cert_start_date }}
                        </p>
                        <div class="form-field">
                            <label for="facultet"
                                >Дата окончания действия справки
                            </label>
                            <Input
                                name="date_end"
                                type="date"
                                class="input-big"
                                v-model:value="refData.cert_end_date"
                            />
                        </div>
                    </div>
                    <p class="error" v-if="isError.cert_end_date">
                        {{ '' + isError.cert_end_date }}
                    </p>
                    <div class="form-field another">
                        <label for="course"
                            >Справка выдана для предоставления
                            <span class="valid-red">*</span></label
                        >
                        <Input
                            name="spravka-field"
                            type="text"
                            v-model:value="refData.recipient"
                            id="course"
                            class="input-full"
                            placeholder="Ответ"
                        />
                    </div>
                    <p class="error" v-if="isError.recipient">
                        {{ '' + isError.recipient }}
                    </p>
                    <div class="selectedItems">
                        <h3>Итого: {{ selectedPeoples.length }}</h3>

                        <checkedReference
                            @change="changePeoples"
                            :participants="selectedPeoples"
                        ></checkedReference>
                    </div>

                    <Button type="submit" label="Получить справки"></Button>
                </form>

                <p class="error" v-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
            </div>
        </div>

        <!-- <p class="error" v-if="isError">
            {{ isError.cert_end_date.recipient }}
        </p>
        <p class="error" v-if="isError">
            {{ isError.recipient }}
        </p> -->
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { filters } from '@features/Contributor/components';
import {
    referencesList,
    checkedReference,
} from '@features/references/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed, inject, watch, onMounted } from 'vue';
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
const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();
const participants = ref([]);
const selectedPeoples = ref([]);
const swal = inject('$swal');
const participantsVisible = ref(12);
const isError = ref([]);
const levelAccess = ref(7);
const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const timerSearch = ref(null);
const educHead = ref([]);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
let search = '';

const checkboxAll = ref(false);
const name = ref('');
const step = ref(12);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const arr = computed(() => {
    let tempPeoples = selectedPeoples.value;
    tempPeoples = tempPeoples.map((item) => item.id);
    return tempPeoples;
});

const refData = ref({
    cert_start_date: '',
    cert_end_date: '',
    ids: arr,
    recipient: '',
});

const viewContributorsData = async (search) => {
    try {
        isLoading.value = true;

        const viewParticipantsResponse = await HTTP.get('/rsousers' + search, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        participants.value = viewParticipantsResponse.data.results;
        isLoading.value = false;
        selectedPeoples.value = [];
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const getFiltersData = async (resp, search) => {
    try {
        isLoading.value = true;
        const viewHeadquartersResponse = await HTTP.get(resp + search, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
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
    viewContributorsData(search, educVal && !local.value);
    getFiltersData('/detachments/', search);

    educ.value = educVal;

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

const SendReference = async () => {
    await HTTP.post('/membership_certificates/internal/', refData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            refData.value = response.data;
            const url = new Blob([response.data], { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'external.zip');
            document.body.appendChild(link);
            link.click();
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};

const select = (event) => {
    selectedPeoples.value = [];
    if (event.target.checked) {
        for (let index in sortedParticipants.value) {
            selectedPeoples.value.push(sortedParticipants.value[index]);
        }
    }
};

const changePeoples = (CheckedUser, UserId) => {
    let participant = {};
    if (CheckedUser) {
        participant = participants.value.find((item) => item.id == UserId);
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

    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        viewContributorsData(search);
    }, 400);
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
            levelAccess.value = 2;
            getFiltersData('/educationals/', search);
            getFiltersData('/locals/', search);
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

const sortedParticipants = computed(() => {
    let tempParticipants = participants.value;

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
    () => squadsStore.squads,
    () => {
        let educId = educationalsStore.educationals.length
            ? educationalsStore.educationals.find((ed) => ed.name == educ.value)
                  ?.id
            : roleStore.roles.educationalheadquarter_commander?.id;
        detachments.value = squadsStore.squads.filter(
            (det) => det.educational_headquarter == educId,
        );
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

.ascend {
    margin-left: 5px;
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}

.references {
    padding: 0px 0px 60px 0px;
    &-title {
        font-size: 52px;
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
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

.input-full {
    width: 100%;
}

.references-sort__all {
    padding: 10px 10px;
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
        // padding: 16px 0;
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

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.v-expansion-panel:not(:first-child)::after {
    display: none;
}
.Sort-alphabet {
    margin-right: 8px;
}
</style>
