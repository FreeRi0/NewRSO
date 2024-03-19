<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col class="d-flex justify-start"> Пол </v-col>
                    </v-row>
                </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="gender1"
                        name="gender"
                        value="allGender"
                        v-model="filter.gender"
                        @update:model-value="sendEmits"
                    />
                    <label for="gender1">Все</label>
                </div>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="gender2"
                        name="gender"
                        value="man"
                        v-model="filter.gender"
                        @update:model-value="sendEmits"
                    />
                    <label for="gender2">Мужской</label>
                </div>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="gender3"
                        name="gender"
                        value="woman"
                        v-model="filter.gender"
                        @update:model-value="sendEmits"
                    />
                    <label for="gender3">Женский</label>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col class="d-flex justify-start"> Возраст </v-col>
                    </v-row>
                </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="search-field">
                    <p class="filter-text">От</p>
                    <input
                        type="number"
                        id="age"
                        class="search__input"
                        v-model="filter.fromAge"
                        placeholder="Начните вводить"
                        @update:model-value="sendEmits"
                    />
                </div>
                <div class="search-field">
                    <p class="filter-text">До</p>
                    <input
                        type="number"
                        id="age"
                        class="search__input"
                        v-model="filter.toAge"
                        placeholder="Начните вводить"
                        @update:model-value="sendEmits"
                    />
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                        <v-col class="d-flex justify-start">
                            Членский взнос
                        </v-col>
                    </v-row>
                </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="fee1"
                        name="fee"
                        value="all"
                        v-model="filter.fee"
                        @update:model-value="sendEmits"
                    />
                    <label for="fee1">Все</label>
                </div>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="fee2"
                        name="fee"
                        value="paid"
                        v-model="filter.fee"
                        @update:model-value="sendEmits"
                    />
                    <label for="fee2">Оплачен</label>
                </div>
                <div class="radio-buttons-field filter-text">
                    <input
                        type="radio"
                        id="fee3"
                        name="fee"
                        value="notPaid"
                        v-model="filter.fee"
                        @update:model-value="sendEmits"
                    />
                    <label for="fee3">Не оплачен</label>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits({ updateFilter: null });

const filter = ref({
    gender: 'allGender',
    fee: 'all',
    toAge: '',
    fromAge: '',
});

const sendEmits = () => {
    emit('updateFilter', filter.value);
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
<style scoped lang="scss">
:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px;
}
.filter-text {
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
}
.search-field {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    margin-bottom: 16px;
    align-items: center;
}
.radio-buttons-field {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    margin-bottom: 16px;
}
.search__input {
    width: 100%;
    padding: 13px 0px 10px 12px;
    border-radius: 10px;
    border: 1px solid grey;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
