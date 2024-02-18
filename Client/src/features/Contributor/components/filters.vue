<template>
    <h3 class="filters-title">Основные фильтры</h3>
    <v-expansion-panels>
        <v-expansion-panel v-if="levelSearch">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
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
                            v-model:checkedValue="selectedAnswer"
                        />
                    </div>
                </div>
                <p>Выбрано:{{ selectedAnswer }}</p>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-if="roles.centralheadquarter_commander">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
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
                    v-model="districtRef"
                    @update:value="updateDistrict"
                    class="mb-2 region-input"
                    :items="districts"
                    :SortDropdown="true"
                ></districtSearchFilter>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            <!-- <pre>ss{{ props.reg}}</pre> -->
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
                    v-model="regRef"
                    @update:value="updateReg"
                    class="mb-2 region-input"
                    :items="regionals"
                    :SortDropdown="true"
                ></regionalsDropdown>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-if="regRef !== null">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            <!-- <pre>ss{{ props.local }}</pre> -->
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
                    v-model="localRef"
                    @update:value="updateLocal"
                    class="mb-2 region-input"
                    :items="locals"
                    :SortDropdown="true"
                ></localSearchFilter>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-if="localRef !== null">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
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
                    v-model="educRef"
                    @update:value="updateEduc"
                    class="mb-2 region-input"
                    :items="educHead"
                    :SortDropdown="true"
                ></educationalsDropdown>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-if="area">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
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
        <v-expansion-panel v-if="educRef !== null">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
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
                    v-model="detachmentRef"
                    @update:value="updateDetachment"
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
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Button } from '@shared/components/buttons';
import { RadioButton } from '@shared/components/buttons';
// import { useRoleStore } from '@layouts/store/role';
// import { useRegionalsStore } from '@features/store/regionals';
// import { useDistrictsStore } from '@features/store/districts';
// import { useLocalsStore } from '@features/store/local';
// import { useEducationalsStore } from '@features/store/educationals';
// import { useSquadsStore } from '@features/store/squads';
// import { useUserStore } from '@features/store/index';
// import { storeToRefs } from 'pinia';
// import { HTTP } from '@app/http';
import {
    districtSearchFilter,
    regionalsDropdown,
    lsoSerachFilter,
    localSearchFilter,
    educationalsDropdown,
} from '@shared/components/selects';


const props = defineProps({
    levelSearch: {
        type: Boolean,
        required: false,
        default: false,
    },
    otherFilters: {
        type: Boolean,
        required: false,
        default: false,
    },
    area: {
        type: Boolean,
        required: false,
        default: false,
    },
    district: {
        type: String,
    },
    reg: { type: String },
    local: { type: Object, default: () => {} },
    educ: { type: String },
    detachment: { type: String },
    districts: {
        type: Array,
        required: false,
        default: () => [],
    },
    regionals: { type: Array, required: false, default: () => [] },
    locals: { type: Array, required: false, default: () => [] },
    educHead: { type: Array, required: false, default: () => [] },
    detachments: { type: Array, required: false, default: () => [] },
    roles: {
        type: Object,
    },
    sortedParticipants: { type: Array, required: false },
});

// const roleStore = useRoleStore();
// const userStore = useUserStore();
// const roles = storeToRefs(roleStore);
// const regionalsStore = useRegionalsStore();
// const districtsStore = useDistrictsStore();
// const localsStore = useLocalsStore();
// const educationalsStore = useEducationalsStore();
// const squadsStore = useSquadsStore();

// const isLoading = ref(false);
// // const participants = storeToRefs(userStore);
// const regionals = ref([]);
// const districts = ref([]);
// const locals = ref([]);
// const educHead = ref([]);
// const detachments = ref([]);
const districtRef = ref(props.district);
const localRef = ref(props.local);
const regRef = ref(props.reg);
const educRef = ref(props.educ);
const detachmentRef = ref(props.detachment);
const levelAccess = ref(7);

const emit = defineEmits([
    'updateDistrict',
    'updateReg',
    'updateLocal',
    'updateEduc',
    'updateDetachment',
]);

const updateDistrict = () => {
    emit('updateDistrict', districtRef.value);
    console.log(districtRef.value);
};
const updateReg = () => {
    emit('updateReg', regRef.value);
    console.log(regRef.value);
};
const updateLocal = () => {
    emit('updateLocal', localRef.value);
    console.log(localRef.value);
};

const updateEduc = () => {
    emit('updateEduc', educRef.value);
    console.log(educRef.value);
};

const updateDetachment = () => {
    emit('updateDetachment', detachmentRef.value);
    console.log(detachmentRef.value);
};

// const viewContributorsData = async (search) => {
//     try {
//         isLoading.value = true;

//         const viewParticipantsResponse = await HTTP.get('/rsousers' + search, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         });
//         participants.users.value = viewParticipantsResponse.data;
//         isLoading.value = false;
//     } catch (error) {
//         console.log('an error occured ' + error);
//     }
// };

// watch(
//     () => roles.roles.value,

//     (newRole, oldRole) => {
//         if (!roles.roles.value.centralheadquarter_commander) {
//             let search = '';

//             if (roles.roles.value.districtheadquarter_commander) {
//                 districtRef.value =
//                     roles.roles.value.districtheadquarter_commander.name;
//                 search =
//                     '?district_headquarter__name=' +
//                     roles.roles.value.districtheadquarter_commander.name;
//                 levelAccess.value = 1;
//             } else if (roles.roles.value.regionalheadquarter_commander) {
//                 regRef.value =
//                     roles.roles.value.regionalheadquarter_commander.name;
//                 search =
//                     '?regional_headquarter__name=' +
//                     roles.roles.value.regionalheadquarter_commander.name;
//                 levelAccess.value = 2;
//             } else if (roles.roles.value.localheadquarter_commander) {
//                 localRef.value = roles.roles.value.localheadquarter_commander.name;
//                 search =
//                     '?local_headquarter__name=' +
//                     roles.roles.value.localheadquarter_commander.name;
//                 levelAccess.value = 3;
//             } else if (roles.roles.value.educationalheadquarter_commander) {
//                 educRef.value =
//                     roles.roles.value.educationalheadquarter_commander.name;
//                 search =
//                     '?educational_headquarter__name=' +
//                     roles.roles.value.educationalheadquarter_commander.name;
//                 levelAccess.value = 4;
//             } else if (roles.roles.value.detachment_commander) {
//                 detachmentRef.value = roles.roles.value.detachment_commander.name;
//                 search =
//                     '?detachment__name=' +
//                     roles.roles.value.detachment_commander.name;
//                 levelAccess.value = 5;
//             }
//             viewContributorsData(search);
//         } else {
//             levelAccess.value = 0;
//         }
//     },
// );

// watch(
//     () => regionalsStore.regionals,
//     () => {
//         regionals.value = regionalsStore.regionals;
//     },
// );

// watch(
//     () => localsStore.locals,
//     () => {
//         locals.value = localsStore.locals;
//     },
// );

// watch(
//     () => educationalsStore.educationals,
//     () => {
//         educHead.value = educationalsStore.educationals;
//     },
// );
// watch(
//     () => squadsStore.squads,
//     () => {
//         detachments.value = squadsStore.squads;
//     },
// );
</script>
<style lang="scss">
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
</style>
