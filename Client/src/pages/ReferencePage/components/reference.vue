<template>
    <div class="container">
        <div class="references">
            <h2 class="references-title">
                Справка о членстве в РСО (для работодателя)
            </h2>
            <Search v-model="name" placeholder="Поищем пользователей ?"
            @update:modelValue="searchPeoples" />
            <div class="references-container">
                <div class="filters">
                    <filters @update-district="updateDistrict" @update-reg="updateReg" @update-local="updateLocal"
                        @update-educ="updateEduc" @update-detachment="updateDetachment" :district="district"
                        :districts="districts" :reg="reg" :regionals="regionals" :local="local" :locals="locals"
                        :educ="educ" :educ-head="educHead" :detachment="detachment" :detachments="detachments"
                        :roles="roles.roles.value" :sorted-participants="participants" :count-participants="count"
                        :is-membership="false" />
                </div>
                <div class="references-items">
                    <div class="references-sort">
                        <div class="d-flex align-center">
                            <div class="references-sort__all">
                                <input type="checkbox" @click="select" v-model="checkboxAll" />

                            </div>
                            <div class="ml-3">Выбрать всё</div>
                        </div>
                        <div class="sort-filters">
                            <div class="sort-select">
                                <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptionss"
                                    :sorts-boolean="false" class="Sort-alphabet"></sortByEducation>
                            </div>

                            <Button type="button" class="ascend" iconn="iconn" @click="ascending = !ascending"
                                color="white"></Button>
                        </div>
                    </div>
                    <div class="references-wrapper">
                        <referencesList :participants="participants" :selected-peoples="selectedPeoples"
                            @change="changePeoples"></referencesList>
                    </div>
                    <template v-if="users.count && users.count > limit">
                        <Button @click="next" v-if="participants.length < users.count" label="Показать еще"></Button>
                        <Button @click="prev" v-else label="Свернуть все"></Button>
                    </template>
                </div>
            </div>

            <div class="references-form" v-if="selectedPeoples.length > 0">
                <form action="#" @submit.prevent="SendReference()">
                    <div class="data-form refer">
                        <div class="form-field">
                            <label for="education-org">Дата начала действия справки
                                <span class="valid-red">*</span></label>
                            <Input name="date_start" type="date" class="input-big reference-field"
                                v-model:value="refData.cert_start_date" />
                        </div>
                        <p class="error" v-if="isError.cert_start_date">
                            {{ '' + isError.cert_start_date }}
                        </p>

                        <div class="form-field">
                            <label for="facultet">Дата окончания действия справки
                            </label>
                            <Input name="date_end" type="date" class="input-big reference-field"
                                v-model:value="refData.cert_end_date" />
                        </div>
                    </div>
                    <p class="error" v-if="isError.cert_end_date">
                        {{ '' + isError.cert_end_date }}
                    </p>
                    <div class="form-field another">
                        <label for="course">Справка выдана для предоставления
                            <span class="valid-red">*</span></label>
                        <Input name="spravka-field" type="text" v-model:value="refData.recipient" id="course"
                            class="input-full reference-field" placeholder="Ответ" />
                    </div>
                    <p class="error" v-if="isError.recipient">
                        {{ '' + isError.recipient }}
                    </p>
                    <div class="form-field another">
                        <label for="course">ФИО подписывающего лица
                            <span class="valid-red">*</span></label>
                        <Input name="spravka-field" type="text" v-model:value="refData.signatory" id="course"
                            class="input-full reference-field" placeholder="Ответ" />
                    </div>
                    <div class="form-field another">
                        <label for="course">Должность подписывающего лица, доверенность
                            <span class="valid-red">*</span></label>
                        <!-- <Input name="spravka-field" type="text" v-model:value="refData.position_procuration" id="course"
                            class="input-full reference-field" placeholder="Ответ" /> -->
                        <textarea name="spravka-field" class="input-full reference-field position-field" id="course"
                            type="text" v-model="refData.position_procuration" placeholder="Ответ" />
                    </div>
                    <div class="selectedItems">
                        <h3>Итого: {{ selectedPeoples.length }}</h3>

                        <checkedReference @change="changePeoples" :participants="selectedPeoples"></checkedReference>
                    </div>

                    <Button type="submit" label="Получить справки"></Button>
                    <!-- <p v-if="isError">{{ isError.detail }}</p> -->
                </form>
                <p class="error" v-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { Input, Search } from '@shared/components/inputs';
import { filters } from '@features/Contributor/components';
import {
    referencesList,
    checkedReference,
} from '@features/references/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed, watch, inject, onMounted } from 'vue';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';
import { SvgIcon } from '@shared/index';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();
const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();
const name = ref('');
const participants = ref([]);
const users = ref({});
const limit = 12;
const levelAccess = ref(7);
const count = ref(null);
const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const educHead = ref([]);
const detachments = ref([]);
const timerSearch = ref(null);
const reg = ref(null);
const detachment = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
const swal = inject('$swal');
const isError = ref([]);
const checkboxAll = ref(false);
const ascending = ref(true);
const sortBy = ref('last_name');
const selectedPeoples = ref([]);

let search = '';

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
    signatory: '',
    position_procuration: '',
});

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
    checkboxAll.value = false;
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
    checkboxAll.value = false;
};

const viewContributorsData = async (search, pagination, orderLimit) => {
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
        count.value = viewParticipantsResponse.data.count;
        if (pagination) {
            response.results = [...users.value.results, ...response.results];
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
        const viewHeadquartersResponse = await HTTP.get(resp + search);
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
    if (localVal && detachment.value) {
        detachment.value = null;
    }
    if (localVal && educ.value) {
        educ.value = null;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/educationals/', search);
    getFiltersData('/detachments/', search);

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
    if (educVal && detachment.value) {
        detachment.value = null;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/detachments/', search);

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

const SendReference = async () => {
    await HTTP.post('/membership_certificates/external/', refData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
        responseType: 'blob',
    })
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            refData.value = response.data;
            const url = window.URL.createObjectURL(
                new Blob([response.data], response.headers),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'external.zip');
            document.body.appendChild(link);
            link.click();
            refData.value = ({
                cert_start_date: '',
                ids: [],
                cert_end_date: '',
                recipient: '',
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
                timer: 1000,
            });
            refData.value = ({
                cert_start_date: '',
                cert_end_date: '',
                ids: [],
                recipient: '',
            });
            setTimeout(() => {
                isError.value = {};
            }, 5000)
        });
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
        value: 'last_name',
        name: 'Алфавиту от А - Я',
    },
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
            detachments.value = squadsStore.squads.filter(
                (det) => det.regional_headquarter == reg.value,
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

.sort-select {
    height: 32px;
}

.references {
    padding: 0px 0px 60px 0px;

    &-title {
        font-weight: 700;
        font-size: 52px;
        font-family: 'Akrobat';
    }

    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        @media screen and (max-width: 768px) {
            align-items: flex-start;
            flex-direction: column;
        }
    }

    &-container {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: baseline;
        grid-column-gap: 36px;

        @media screen and (max-width: 768px) {
            margin-top: 60px;
        }
    }

    &-search {
        position: relative;
        box-sizing: border-box;
        margin: 60px 0px 0px 0px;

        svg {
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

p {
    color: #898989;
}

.valid-red {
    color: #db0000;
}

.position-field {
    box-sizing: border-box;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px 10px 16px;
    margin-bottom: 20px;
    font-family: 'Bert Sans';
    width: 100%;
    resize: none;
    color: #35383f;
    height: 45px;
}

.position-field:focus {
    outline: none;
}

.position-field::placeholder {
    color: #a3a3a3;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Bert Sans';
}

.refer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 140px;
    margin-top: 60px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 40px;
    }
}

.another {
    margin-top: 50px;
}

.form-field label {
    font-size: 16px;
    font-family: 'Bert Sans';
    font-weight: 600;
}

.input-big {
    width: 465px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
}

.input-full {
    width: 100%;
}

.references-sort__all {
    padding: 11px 11.5px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;

    input {
        width: 24px;
        height: 24px;
    }
}

.references-sort__all:hover {
    border: 1px solid #35383F;
}

.horizontallso__confidant:hover {
    border: 1px solid #35383F;
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

.v-expansion-panel:not(:first-child)::after {
    display: none;
}

.sort-filters {
    align-items: flex-start;
}

.sort-filters {
    @media screen and (max-width: 768px) {
        margin-top: 20px;
    }
}

.v-select__selection {
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.reference-field {
    margin-top: 20px;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}

.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}

.Sort-alphabet {
    margin-right: 8px;
    height: 32px;
    border: 1px solid #35383F;
}

.Sort-alphabet .v-field__input {
    padding-top: 0 !important;
}

input[type="checkbox"] {
    border: 1px solid #35383F;
    appearance: none;
}

input[type=checkbox]:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.10062 11.412C3.03592 11.412 2.97195 11.3984 2.91284 11.3721C2.85374 11.3458 2.80084 11.3073 2.75756 11.2592L0.211298 8.43C0.170517 8.38498 0.139022 8.33237 0.118618 8.27516C0.0982138 8.21795 0.0893029 8.15727 0.0923956 8.09661C0.0954882 8.03595 0.110523 7.9765 0.136639 7.92166C0.162756 7.86683 0.19944 7.81768 0.244587 7.77705C0.289735 7.73642 0.342458 7.7051 0.399735 7.68488C0.457011 7.66467 0.517715 7.65596 0.578365 7.65925C0.639014 7.66255 0.698417 7.67778 0.753168 7.70408C0.807918 7.73038 0.856939 7.76722 0.897421 7.8125L3.08922 10.2478L11.0938 0.75092C11.1328 0.704401 11.1806 0.666035 11.2344 0.638019C11.2883 0.610004 11.3472 0.592889 11.4076 0.587656C11.4681 0.582422 11.5291 0.589173 11.5869 0.607521C11.6448 0.625869 11.6985 0.655455 11.7449 0.694582C11.7913 0.73371 11.8296 0.781611 11.8574 0.835542C11.8853 0.889472 11.9023 0.948374 11.9074 1.00887C11.9124 1.06937 11.9055 1.13027 11.887 1.1881C11.8685 1.24592 11.8388 1.29953 11.7996 1.34584L3.45351 11.248C3.41102 11.2984 3.3582 11.3391 3.29862 11.3674C3.23904 11.3957 3.17409 11.4109 3.10814 11.412L3.10062 11.412Z' fill='%2335383F'/%3e%3c/svg%3e ");
    background-position: center;
}

.mdi-chevron-down::before {
    content: '' !important;
    width: 18px;
    height: 9px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='9' viewBox='0 0 18 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.9181 0.949219L10.3981 7.46922C9.62812 8.23922 8.36813 8.23922 7.59813 7.46922L1.07812 0.949219' stroke='%2335383F' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
}

.mdi-chevron-up::before {
    content: '' !important;
    width: 18px;
    height: 9px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='9' viewBox='0 0 18 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.9181 0.949219L10.3981 7.46922C9.62812 8.23922 8.36813 8.23922 7.59813 7.46922L1.07812 0.949219' stroke='%2335383F' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    transform: rotate(180deg);
}
</style>
