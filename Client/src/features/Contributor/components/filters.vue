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
import { storeToRefs } from 'pinia';
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
const districtRef = ref(props.district);
const localRef = ref(props.local);
const regRef = ref(props.reg);
const educRef = ref(props.educ);
const detachmentRef = ref(props.detachment);

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
