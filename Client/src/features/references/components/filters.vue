<template>
    <h3>Основные фильтры</h3>
    <div class="checkbox">
        <p>Уровень поиска</p>
        <div class="checkbox-item" v-for="answer in answers" :key="answer.id">
            <RadioButton
                :value="answer.name"
                :label="answer.name"
                :id="answer.id"
                :checked="answer.checked"
                name="answer"
                v-model:checkedValue="selectedAnswer"
            />
        </div>
        <p>Выбрано:{{ selectedAnswer }}</p>
    </div>

    <div class="references-search filter">
        <input
            type="text"
            id="search"
            class="references-search__input"
            v-model="searchHeadquarter"
            placeholder="ввод?"
        />
        <img src="@app/assets/icon/search.svg" alt="search" />
    </div>
    <div class="references-search filter">
        <input
            type="text"
            id="search"
            class="references-search__input"
            v-model="searchHeadquarterRegion"
            placeholder="ввод?"
        />
        <img src="@app/assets/icon/search.svg" alt="search" />
    </div>
    <div class="references-search filter">
        <input
            type="text"
            id="search"
            class="references-search__input"
            v-model="searchHeadquarterLocal"
            placeholder="ввод?"
        />
        <img src="@app/assets/icon/search.svg" alt="search" />
    </div>
    <div class="references-search filter">
        <input
            type="text"
            id="search"
            class="references-search__input"
            v-model="searchEducation"
            placeholder="ввод?"
        />
        <img src="@app/assets/icon/search.svg" alt="search" />
    </div>
    <div class="references-search filter">
        <input
            type="text"
            id="search"
            class="references-search__input"
            v-model="searchLSO"
            placeholder="ввод?"
        />
        <img src="@app/assets/icon/search.svg" alt="search" />
    </div>

    <div class="checkbox">
        <p>Направление отряда</p>
        <div class="checkbox-item" v-for="cat in categories" :key="cat.id">
            <RadioButton
                :value="cat.name"
                :label="cat.name"
                :id="cat.id"
                :checked="cat.checked"
                name="category"
                v-model:checkedValue="selectedCat"
            />
        </div>
        <p>Выбрано:{{ selectedCat }}</p>
    </div>

    <h3>Дополнительные фильтры</h3>

    <div class="checkbox">
        <p>Направление отряда</p>
        <div class="checkbox-item" v-for="sex in sexes" :key="sex.id">
            <RadioButton
                :value="sex.name"
                :label="sex.name"
                :id="sex.id"
                :checked="sex.checked"
                name="sex"
                v-model:checkedValue="selectedSex"
            />
        </div>
        <p>Выбрано:{{ selectedSex }}</p>
    </div>

    <div class="checkbox">
        <p>Статус аккаунта</p>
        <div class="checkbox-item" v-for="stat in status" :key="stat.id">
            <RadioButton
                :value="stat.name"
                :label="stat.name"
                :id="stat.id"
                :checked="stat.checked"
                name="status"
                v-model:checkedValue="selectedStatus"
            />
        </div>
        <p>Выбрано:{{ selectedStatus }}</p>
    </div>

    <div class="checkbox">
        <p>Членский взнос</p>
        <div class="checkbox-item" v-for="p in pay" :key="p.id">
            <RadioButton
                :value="p.name"
                :label="p.name"
                :id="p.id"
                :checked="p.checked"
                name="sex"
                v-model:checkedValue="selectedPay"
            />
        </div>
        <p>Выбрано:{{ selectedPay }}</p>
    </div>
    <p>Возраст</p>
    <Input v-model:value="minAge" />
    <Input v-model:value="maxAge" />
</template>
<script setup>
import { ref, computed } from 'vue';
import { Input } from '@shared/components/inputs';
import { RadioButton } from '@shared/components/buttons';

// const selectedAnswer = ref('Все');
// const selectedCat = ref('Все');
// const selectedSex = ref('Все');
// const selectedStatus = ref('Все');
// const selectedPay = ref('Все');
// const searchHeadquarter = ref('');
// const searchHeadquarterLocal = ref('');
// const searchHeadquarterRegion = ref('');
// const searchLSO = ref('');
// const searchEducation = ref('');
// const minAge= ref('');
// const maxAge = ref('');

// const answers = ref([
//     { name: 'Все', id: 'f1', checked: true },
//     { name: 'Окружные штабы', id: 'f2' },
//     { name: 'Региональные отделения', id: 'f3' },
//     { name: 'Местные штабы', id: 'f4' },
//     { name: 'Штабы СО ОО', id: 'f5' },
//     { name: 'ЛСО', id: 'f6' },
//     { name: 'Пользователи', id: 'f7' },
// ]);

// const categories = ref([
//     { name: 'Все', id: 'c1', checked: true },
//     { name: 'Сервисные', id: 'c2' },
//     { name: 'Строительные', id: 'c3' },
//     { name: 'Проводников', id: 'c4' },
//     { name: 'Педагогические', id: 'c5' },
//     { name: 'Медицинские', id: 'c6' },
//     { name: 'Путинные', id: 'c7' },
//     { name: 'Сельскохозяйственные', id: 'c8' },
// ]);

// const sexes = ref([
//     { name: 'Все', id: 's1', checked: true },
//     { name: 'Мужской', id: 's2' },
//     { name: 'Женский', id: 's3' },
// ]);const status = ref([
//     { name: 'Все', id: 'st1', checked: true },
//     { name: 'Верифицированный', id: 'st2' },
//     { name: 'Неверифицированный', id: 'st3' },
// ]);

// const pay = ref([
//     { name: 'Все', id: 'p1', checked: true },
//     { name: 'Оплачен', id: 'p2' },
//     { name: 'Не оплачен', id: 'p3' },
// ]);


</script>
<style lang="scss" scoped>
.filter {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>

<!-- <v-expansion-panels v-model="panel">
            <v-expansion-panel>-
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                              Уровень поиска
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">

                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                           Направление отряда
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">

                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                </v-expansion-panel-text>
            </v-expansion-panel>

        </v-expansion-panels> -->
