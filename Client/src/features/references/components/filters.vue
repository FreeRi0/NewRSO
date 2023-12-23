<template>
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
                    :disabled="disabledRadio"
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
            <p>Пол</p>
            <div class="checkbox-item" v-for="sex in sexes" :key="sex.id">
                <RadioButton
                    :value="sex.name"
                    :label="sex.name"
                    :id="sex.id"
                    :checked="sex.checked"
                    name="sex"
                    @change="updateCheck"
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
                    name="pay"
                    v-model:checkedValue="selectedPay"
                />
            </div>
            <p>Выбрано:{{ selectedPay }}</p>
        </div>
        <p>Возраст</p>
        <Input name="miAge" type="number" v-model:value="minAge" />

        <Input name="mAge" type="number" v-model:value="maxAge" />

        <p>Найдено пользователей: {{ sortedParticipants.length }}</p>
    </div>
</template>
<script setup>
import participants from '@entities/Participants/participants';
import { ref, computed } from 'vue';
import { Input } from '@shared/components/inputs';
import { RadioButton } from '@shared/components/buttons';

const emit = defineEmits(['change']);

const updateCheck = (e) => {
    console.log('dddddrrrrd');
    emit('change', participants.value);
};

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

const sortedParticipants = computed(() => {
    let tempParticipants = participants;
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
.filter {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
@shared/components/selects/inputs