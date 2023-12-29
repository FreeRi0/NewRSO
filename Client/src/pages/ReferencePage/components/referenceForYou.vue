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
                    v-model="searchParticipants"
                    placeholder="Поищем пользователей?"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
            <!-- <Search v-model="searchParticipants" /> -->
            <div class="references-container">
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
                        Найдено пользователей: {{ sortedParticipants.length }}
                    </p>
                </div>
                <!-- <filters></filters> -->

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
                        <referencesList
                            @change="changePeoples"
                            :participants="participants"
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

            <div class="references-form" v-if="selectedPeoples.length > 0">
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
                    <div class="selectedItems">
                        <h3>Итого: {{ selectedPeoples.length }}</h3>

                        <checkedReference
                            @change="changePeoples"
                            :participants="selectedPeoples"
                        ></checkedReference>
                    </div>

                    <Button label="Получить справки"></Button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { RadioButton } from '@shared/components/buttons';
import { Dropdown } from '@shared/components/dropdown';
import { Input } from '@shared/components/inputs';
import {
    referencesList,
    filters,
    checkedReference,
} from '@features/references/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed , onMounted} from 'vue';
import { Checkbox, CheckboxGroup } from '@shared/components/checkboxes';
import { HTTP } from '@app/http';

const participants = ref([])
const participantsVisible = ref(12);

const viewParticipants = async () => {
    await HTTP.get('/rsousers/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            participants.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    viewParticipants();
});

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

const checkboxAll = ref(false);

const step = ref(12);
const selectedPeoples = ref([]);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const select = (event) => {
    selectedPeoples.value = [];

    if (event.target.checked) {
        for (item in participants.value) {
            selectedPeoples.value.push(participants.value[item]);
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
    { value: 'date_of_birth', name: 'По дате вступления в РСО' },
]);

const sortedParticipants = computed(() => {
    let tempParticipants = participants.value;

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);

    tempParticipants = tempParticipants.filter((item) => {
        return item.first_name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

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
<style lang="scss" >
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

.v-expansion-panel:not(:first-child)::after {
    display: none;
}
</style>
@shared/components/selects/inputs
