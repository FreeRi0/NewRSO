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
                    v-model="name"
                    placeholder="Поищем пользователей?"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
            <!-- <Search v-model="searchParticipants" /> -->
            <div class="references-container">
                <!-- <div class="filters">
                    <h3 class="filters-title">Основные фильтры</h3>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Уровень поиска
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text class="inner-content">
                                <div class="checkbox">
                                    <div
                                        class="checkbox-item"
                                        v-for="answer in answers"
                                        :key="answer.id"
                                    >
                                        <RadioButton
                                            :value="answer.name"
                                            :label="answer.name"
                                            :id="answer.id"
                                            :checked="answer.checked"
                                            :disabled="disabledRadio"
                                            name="answer"
                                            v-model:checkedValue="
                                                selectedAnswer
                                            "
                                        />
                                    </div>
                                </div>
                                <p>Выбрано:{{ selectedAnswer }}</p>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
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
                                <div class="references-search filter">
                                    <input
                                        type="text"
                                        id="search"
                                        class="references-search__input"
                                        v-model="searchHeadquarter"
                                        placeholder="ввод?"
                                    />
                                    <img
                                        src="@app/assets/icon/search.svg"
                                        alt="search"
                                    />
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
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
                                <div class="references-search filter">
                                    <input
                                        type="text"
                                        id="search"
                                        class="references-search__input"
                                        v-model="searchHeadquarterRegion"
                                        placeholder="ввод?"
                                    />
                                    <img
                                        src="@app/assets/icon/search.svg"
                                        alt="search"
                                    />
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
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
                                <div class="references-search filter">
                                    <input
                                        type="text"
                                        id="search"
                                        class="references-search__input"
                                        v-model="searchHeadquarterLocal"
                                        placeholder="ввод?"
                                    />
                                    <img
                                        src="@app/assets/icon/search.svg"
                                        alt="search"
                                    />
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Обазовательная организация
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="references-search filter">
                                    <input
                                        type="text"
                                        id="search"
                                        class="references-search__input"
                                        v-model="searchEducation"
                                        placeholder="ввод?"
                                    />
                                    <img
                                        src="@app/assets/icon/search.svg"
                                        alt="search"
                                    />
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Направление отряда
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="checkbox">
                                    <div
                                        class="checkbox-item"
                                        v-for="cat in categories"
                                        :key="cat.id"
                                    >
                                        <RadioButton
                                            :value="cat.name"
                                            :label="cat.name"
                                            :id="cat.id"
                                            :checked="cat.checked"
                                            name="category"
                                            v-model:checkedValue="selectedCat"
                                        />
                                    </div>
                                </div>
                                <p>Выбрано:{{ selectedCat }}</p>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
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
                                <div class="references-search filter">
                                    <input
                                        type="text"
                                        id="search"
                                        class="references-search__input"
                                        v-model="searchLSO"
                                        placeholder="ввод?"
                                    />
                                    <img
                                        src="@app/assets/icon/search.svg"
                                        alt="search"
                                    />
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <h3 class="filters-title">Дополнительные фильтры</h3>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Пол
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="checkbox">
                                    <div
                                        class="checkbox-item"
                                        v-for="sex in sexes"
                                        :key="sex.id"
                                    >
                                        <RadioButton
                                            :value="sex.name"
                                            :label="sex.name"
                                            :id="sex.id"
                                            :checked="sex.checked"
                                            name="sex"
                                            v-model:checkedValue="selectedSex"
                                        />
                                    </div>
                                </div>
                                <p>Выбрано:{{ selectedSex }}</p>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Статус аккаунта
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="checkbox">
                                    <div
                                        class="checkbox-item"
                                        v-for="stat in status"
                                        :key="stat.id"
                                    >
                                        <RadioButton
                                            :value="stat.name"
                                            :label="stat.name"
                                            :id="stat.id"
                                            :checked="stat.checked"
                                            name="status"
                                            v-model:checkedValue="
                                                selectedStatus
                                            "
                                        />
                                    </div>
                                </div>
                                <p>Выбрано:{{ selectedStatus }}</p>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Членский взнос
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="checkbox">
                                    <div
                                        class="checkbox-item"
                                        v-for="p in pay"
                                        :key="p.id"
                                    >
                                        <RadioButton
                                            :value="p.name"
                                            :label="p.name"
                                            :id="p.id"
                                            :checked="p.checked"
                                            name="pay"
                                            v-model:checkedValue="selectedPay"
                                        />
                                    </div>
                                </div>
                                <p>Выбрано:{{ selectedPay }}</p>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col
                                            cols="4"
                                            class="d-flex justify-start"
                                        >
                                            Возраст
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <Input
                                    name="miAge"
                                    type="number"
                                    v-model:value="minAge"
                                />

                                <Input
                                    name="mAge"
                                    type="number"
                                    v-model:value="maxAge"
                                />
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>

                    <p>
                        Найдено пользователей: {{ sortedParticipantsRef.length }}
                    </p>
                </div> -->
                <!-- <filters></filters> -->
                <div class="filters">
                    <filters
                        @update-local="updateLocal"
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
                <div class="references-items">
                    <div class="references-sort">
                        <div class="references-sort__all">
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
                    <div class="references-wrapper">
                        <contributorsList
                            :participants="sortedParticipantsRef"
                            :selected-peoples="selectedPeoples"
                            @change="changePeoples"
                        ></contributorsList>
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
                            />
                        </div>
                        <div class="form-field">
                            <label for="facultet"
                                >Дата окончания действия справки
                            </label>
                            <Input
                                name="date_end"
                                type="date"
                                class="input-big"
                            />
                        </div>
                    </div>
                    <div class="form-field another">
                        <label for="course"
                            >Справка выдана для предоставления
                            <span class="valid-red">*</span></label
                        >
                        <Input
                            name="spravka-field"
                            type="text"
                            id="course"
                            class="input-full"
                            placeholder="Ответ"
                        />
                    </div>
                    <div class="selectedItems">
                        <h3>Итого: {{ selectedPeoples.length }}</h3>

                        <checkedContributors
                            @change="changePeoples"
                            :participants="selectedPeoples"
                        ></checkedContributors>
                    </div>

                    <Button type="submit" label="Получить справки"></Button>
                </form>
                <p class="error">
                    {{ isError }}
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
import { RadioButton } from '@shared/components/buttons';
import { Dropdown } from '@shared/components/dropdown';
import { Input } from '@shared/components/inputs';
import {
    contributorsList,
    checkedContributors,
    filters,
} from '@features/Contributor/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed, onMounted, inject, watch } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { HTTP } from '@app/http';
import { Checkbox, CheckboxGroup } from '@shared/components/checkboxes';

const roleStore = useRoleStore();
const userStore = useUserStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();
const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();
const participants = storeToRefs(userStore);
const selectedPeoples = ref([]);
const swal = inject('$swal');
const participantsVisible = ref(12);
const isError = ref([]);

const arr = computed(() => {
    let tempPeoples = selectedPeoples.value;
    tempPeoples = tempPeoples.map((item) => item.id);
    return tempPeoples;
});

console.log('idssSss', arr);

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
        participants.users.value = viewParticipantsResponse.data;
        isLoading.value = false;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const SendReference = async () => {
    await HTTP.post('/membership_certificates/internal/', refData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
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
            const url = new Blob([response.data], { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'external.zip');
            document.body.appendChild(link);
            link.click();
            console.log(response, 'success');
            console.log(response);
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

const checkboxAll = ref(false);
const name = ref('');
const step = ref(12);

const ascending = ref(true);
const sortBy = ref('alphabetically');

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
const searchParticipants = ref('');
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

const sortedParticipantsRef = computed(() => {
    let tempParticipants = participants.users.value;

    if (name.value.length > 3) {
        userStore.searchUsers(name.value);
    } else if (name.value.length == 0) {
        return [];
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

watch(
    () => district.value,
    () => {
        viewContributorsData('?district_headquarter__name=' + district.value);
        let districtId = districtsStore.districts.find(
            (dis) => dis.name == district.value,
        )?.id;
        regionals.value = regionalsStore.regionals.filter(
            (regional) => regional.district_headquarter == districtId,
        );
    },
);

watch(
    () => reg.value,
    () => {
        if (reg.value) {
            viewContributorsData('?regional_headquarter__name=' + reg.value);
        } else if (levelAccess.value < 2) {
            viewContributorsData(
                '?district_headquarter__name=' + district.value,
            );
        }

        let regId = regionalsStore.regionals.find(
            (regional) => regional.name == reg.value,
        )?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter == regId,
        );
    },
);

// watch(
//     () => local.value,
//     () => {
//         if (local.value) {
//             viewContributorsData('?local_headquarter__name=' + local.value);
//         } else if (levelAccess.value < 3) {
//             viewContributorsData('?regional_headquarter__name=' + reg.value);
//         }

//         let locId = localsStore.locals.find(
//             (loc) => loc.name == local.value,
//         )?.id;
//         console.log('locid', locId);
//         educHead.value = educationalsStore.educationals.filter(
//             (edh) => edh.local_headquarter == locId,
//         );
//         console.log('educHead', educHead.value);
//     },
// );

watch(
    () => educ.value,
    () => {
        if (educ.value) {
            viewContributorsData(
                '?educational_headquarter__name=' + educ.value,
            );
        } else if (levelAccess.value < 4) {
            viewContributorsData('?local_headquarter__name=' + local.value);
        }
        let educId = educationalsStore.educationals.find(
            (edh) => edh.name == educ.value,
        )?.id;
        detachments.value = squadsStore.squads.filter(
            (squad) => squad.educational_headquarter == educId,
        );
    },
);

watch(
    () => detachment.value,
    () => {
        if (detachment.value) {
            viewContributorsData('?detachment__name=' + detachment.value);
        } else if (levelAccess.value < 5) {
            viewContributorsData(
                '?educational_headquarter__name=' + educ.value,
            );
        }
    },
);
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
</style>
@shared/components/selects/inputs
