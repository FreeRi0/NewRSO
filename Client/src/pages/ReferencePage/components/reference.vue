<template>
    <div class="container">
        <div class="references">
            <h2 class="references-title">
                Справка о членстве в РСО (для работодателя)
            </h2>
            <div class="references-search">
                <input
                    type="text"
                    id="search"
                    class="references-search__input"
                    v-model="searchParticipants"
                    placeholder="Поищем пользователей?"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
            <!-- <Search v-model="searchParticipants" /> -->
            <div class="references-container">
                <div class="filters">
                    <h3>Основные фильтры</h3>
                    <div class="checkbox">
                        <p>Уровень поиска</p>
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
                        <p>Выбрано:{{ selectedCat }}</p>
                    </div>

                    <h3>Дополнительные фильтры</h3>

                    <div class="checkbox">
                        <p>Пол</p>
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
                        <p>Выбрано:{{ selectedSex }}</p>
                    </div>

                    <div class="checkbox">
                        <p>Статус аккаунта</p>
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
                    <p>Найдено пользователей: {{ sortedParticipants.length }}</p>
                </div>



                <div class="references-items">
                    <div class="references-sort">
                        <div class="references-sort__all">
                            <!-- <Checkbox
                                :id="checkboxAll"
                                @click="select"
                                v-model:checked="checkboxAll"
                            ></Checkbox> -->
                            <input
                                type="checkbox"
                                @click="select"
                                v-model="checkboxAll"
                            />
                        </div>
                        <div class="sort-filters">
                            <div class="sort-select">
                                <sortByEducation
                                    v-model="sortBy"
                                    :options="sortOptionss"
                                ></sortByEducation>
                            </div>

                            <Button
                                @click="ascending = !ascending"
                                icon="icon"
                                color="white"
                            ></Button>
                        </div>
                    </div>
                    <div class="references-wrapper">
                        <referencesList
                            :participants="sortedParticipants"
                        ></referencesList>
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
            <!-- <div class="references-wrapper">
                <referencesList
                    :participants="selectedHeroes"
                ></referencesList>
            </div> -->

            <div class="references-form">
                <form action="#">
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
                    <div></div>

                    <!-- <div v-for="item in selectedHeroes">{{ item }}</div> -->
                    <Button label="Получить справки"></Button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import participants from '@entities/Participants/participants';
import { Button } from '@shared/components/buttons';
import { RadioButton } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { referencesList, filters } from '@features/references/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';
import { Checkbox, CheckboxGroup } from '@shared/components/checkboxes';

const participantsVisible = ref(12);

// const listOfHeroes = ref([
//     { name: 'Spider Man', id: 'h1' },
//     { name: 'Batman', id: 'h2' },
//     { name: 'Tor', id: 'h3' },
//     { name: 'Loki', id: 'h4' },
// ]);
const checkboxAll = ref(true);
const selectedHeroes = ref([]);

const step = ref(12);
const selectedPeoples = ref([]);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const searchParticipants = ref('');

const selectedAnswer = ref('Все');
const selectedCat = ref('Все');
const selectedSex = ref('Все');
const selectedStatus = ref('Все');
const selectedPay = ref('Все');
const searchHeadquarter = ref('');
const searchHeadquarterLocal = ref('');
const searchHeadquarterRegion = ref('');
const searchLSO = ref('');
const searchEducation = ref('');
const minAge = ref('');
const maxAge = ref('');

const answers = ref([
    { name: 'Все', id: 'f1', checked: true },
    { name: 'Окружные штабы', id: 'f2' },
    { name: 'Региональные отделения', id: 'f3' },
    { name: 'Местные штабы', id: 'f4' },
    { name: 'Штабы СО ОО', id: 'f5' },
    { name: 'ЛСО', id: 'f6' },
    { name: 'Пользователи', id: 'f7' },
]);

const categories = ref([
    { name: 'Все', id: 'c1', checked: true },
    { name: 'Сервисные', id: 'c2' },
    { name: 'Строительные', id: 'c3' },
    { name: 'Проводников', id: 'c4' },
    { name: 'Педагогические', id: 'c5' },
    { name: 'Медицинские', id: 'c6' },
    { name: 'Путинные', id: 'c7' },
    { name: 'Сельскохозяйственные', id: 'c8' },
]);

const sexes = ref([
    { name: 'Все', id: 's1', checked: true },
    { name: 'Мужской', id: 's2' },
    { name: 'Женский', id: 's3' },
]);
const status = ref([
    { name: 'Все', id: 'st1', checked: true },
    { name: 'Верифицированный', id: 'st2' },
    { name: 'Неверифицированный', id: 'st3' },
]);

const pay = ref([
    { name: 'Все', id: 'p1', checked: true },
    { name: 'Оплачен', id: 'p2' },
    { name: 'Не оплачен', id: 'p3' },
]);

const select = () => {
    selectedHeroes.value = [];
    if (!checkboxAll.value) {
        for (let i in participants.value) {
            selectedHeroes.value.push(participants.value[i].id);
        }
    }
};

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'birthdate', name: 'По дате вступления в РСО' },
    { value: 'days', name: 'Популярности' },
]);

const sortedParticipants = computed(() => {
    let tempParticipants = participants;

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);

    tempParticipants = tempParticipants.filter((item) => {
        return item.name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'birthdate') {
            let fc = a.birthdate,
                fn = b.birthdate;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'days') {
            return a.days - b.days;
        }
    });

    // tempParticipants = tempParticipants.filter((item) => item.inSquad === picked.value);

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    const rangeConditions = {
        'Все': () => true,
       'Мужской': (participant) => participant.sex = 'Мужской',
        'Женский': (participant) => participant.sex = 'Женский',
    };

    return tempParticipants.filter(
        (item) => rangeConditions[selectedSex.value](item) || false,
    );

    return tempParticipants;
});
</script>
<style lang="scss">
.references {
    padding: 60px 0px 60px 0px;
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
        margin: 60px 0px 60px 0px;
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
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 12px;
    min-width: 48px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;

    .v-field__overlay,
    .v-field__loader {
        display: none;
    }

    .v-input,
    .v-input__control,
    .v-field {
        width: 24px;
        // height: 50%;
        min-height: 0;
    }

    // .v-field__field {
    // }
    .v-field__input,
    .v-text-field input.v-field__input {
        // max-height: 24px;
        min-height: 0;
        width: 24px;
        height: 24px;
    }
}
.filter {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
