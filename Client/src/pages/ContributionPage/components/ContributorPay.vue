<template>
    <div class="container">
        <div class="contributor">
            <h2 class="contributor-title">Членский взнос</h2>
            <div class="d-flex mt-7">
                <Button
                    type="button"
                    label="Мой членский взнос"
                    class="contributorBtn"
                    :class="{ active: picked === true }"
                    @click="picked = true"
                ></Button>

                <Button
                    type="button"
                    label="Данные об оплате членского взноса пользователями системы"
                    class="contributorBtn"
                    :class="{ active: picked === false }"
                    @click="picked = false"
                ></Button>
            </div>

            <!-- <Search v-model="searchParticipants" /> -->

            <div v-if="picked === true">
                Уважаемый пользователь, ваш членский взнос не оплачен.
            </div>
            <div v-else="picked === false">
                <div class="contributor-search">
                    <input
                        type="text"
                        id="search"
                        class="contributor-search__input"
                        v-model="searchParticipants"
                        placeholder="Поищем пользователей?"
                    />
                    <img src="@app/assets/icon/search.svg" alt="search" />
                </div>

                <div class="contributor-container">
                    <div class="filters">
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
                                    <div class="contributor-search filter">
                                        <input
                                            type="text"
                                            id="search"
                                            class="contributor-search__input"
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
                                    <div class="contributor-search filter">
                                        <input
                                            type="text"
                                            id="search"
                                            class="contributor-search__input"
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
                                    <div class="contributor-search filter">
                                        <input
                                            type="text"
                                            id="search"
                                            class="contributor-search__input"
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
                                    <div class="contributor-search filter">
                                        <input
                                            type="text"
                                            id="search"
                                            class="contributor-search__input"
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
                                                v-model:checkedValue="
                                                    selectedCat
                                                "
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
                                    <div class="contributor-search filter">
                                        <input
                                            type="text"
                                            id="search"
                                            class="contributor-search__input"
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
                                                v-model:checkedValue="
                                                    selectedSex
                                                "
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
                                                v-model:checkedValue="
                                                    selectedPay
                                                "
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
                            Найдено пользователей:
                            {{ sortedParticipants.length }}
                        </p>
                    </div>
                    <!-- <filters></filters> -->

                    <div class="contributor-items">
                        <div class="contributor-sort">
                            <div class="contributor-sort__all">
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
                        <div class="contributor-wrapper">
                            <contributorsList
                                @change="changePeoples"
                                :participants="sortedParticipants"
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
            </div>
        </div>
    </div>
</template>
//
<script setup>
import participants from '@entities/Participants/participants';
import { Button } from '@shared/components/buttons';
import { RadioButton } from '@shared/components/buttons';
import { Dropdown } from '@shared/components/dropdown';
import { Input } from '@shared/components/inputs';
import { contributorsList } from '@features/Contributor/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';

const participantsVisible = ref(12);

const selectedAnswer = ref('Пользователи');
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
const picked = ref(false);

const checkboxAll = ref(false);

const step = ref(12);
const selectedPeoples = ref([]);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const select = () => {
    selectedPeoples.value = [];

    if (!checkboxAll.value) {
        for (item in participants) {
            selectedPeoples.push(participants[item]);
        }
    }
};
const searchParticipants = ref('');
const changePeoples = (selectedHumans) => {
    selectedPeoples.value = selectedHumans;
};

const answers = ref([{ name: 'Пользователи', id: 'f7', checked: true }]);

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

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    const rangeSexes = {
        Все: () => true,
        Мужской: (participant) => participant.sex == 'Мужской',
        Женский: (participant) => participant.sex == 'Женский',
    };

    const rangeStatus = {
        Все: () => true,
        Верифицированный: (participant) => participant.verify == true,
        Неверифицированный: (participant) => participant.verify == false,
    };

    const rangePayed = {
        Все: () => true,
        Оплачен: (participant) => participant.payed == true,
        'Не оплачен': (participant) => participant.payed == false,
    };

    tempParticipants = tempParticipants.filter((item) => {
        return rangeSexes[selectedSex.value](item) || false;
    });

    tempParticipants = tempParticipants.filter((item) => {
        return rangeStatus[selectedStatus.value](item) || false;
    });

    tempParticipants = tempParticipants.filter((item) => {
        return rangePayed[selectedPay.value](item) || false;
    });

    if (!minAge.value && !maxAge.value) {
        return tempParticipants;
    }
    tempParticipants = tempParticipants.filter((item) => {
        return item.days >= minAge.value && item.days <= maxAge.value;
    });

    return tempParticipants;
});
</script>
<style lang="scss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.contributor {
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

.contributor-sort__all {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 11px 15px;
    height: 46px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
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

.v-expansion-panel:not(:first-child)::after {
    display: none;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1C5C94;
    border: 1px solid #1C5C94;
    margin: 0px;
    padding: 10px 24px;
    margin: 7px;
}

.active {
    background-color: #1C5C94;
    color: white;
}
</style>
@shared/components/selects/inputs