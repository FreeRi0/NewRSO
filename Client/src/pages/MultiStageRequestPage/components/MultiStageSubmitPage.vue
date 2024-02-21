<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <div class="form__field">
            <div class="contributor-search">
                <input
                    type="text"
                    id="search"
                    class="contributor-search__input"
                    @keyup="searchHeadquarters"
                    v-model="name"
                    placeholder="Начните вводить"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
        </div>

        <div id="wrapper">
            <div id="left">
                <div class="filters">
                    <p class="subtitle">Основные фильтры</p>
                    <p class="filter_name">Уровни поиска</p>
                    <div class="radio_text">
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="all"
                                checked
                            />
                            Все
                        </p>
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="district"
                            />
                            Окружные штабы
                        </p>
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="regional"
                            />
                            Региональное отделение
                        </p>
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="local"
                            />
                            Местные штабы
                        </p>
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="educational"
                            />
                            Штабы СО ОО
                        </p>
                        <p class="radio_button">
                            <input
                                name="search_level"
                                type="radio"
                                value="detachments"
                            />
                            ЛСО
                        </p>
                    </div>
                </div>
            </div>

            <div id="right" v-if="sortedHeadquartersJunior.length">
                <div class="additional_line">
                    <div class="horizontallso__confidant">
                        <input
                            type="checkbox"
                            v-model="isChecked"
                            @change="onCheckbox"
                        />
                    </div>

                    <p class="choose_all">Выделить все</p>

                    <a class="download_text" target="_blank">
                        <img class="download_img" src="/assets/download.svg" />
                        Cкачать список
                    </a>

                    <div class="sort_line">
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

                <multi-stage-submit-item
                    v-for="headquarter in sortedHeadquartersJunior"
                    :key="headquarter"
                    :headquarter="headquarter"
                    @select="onToggleSelectCompetition"
                />
            </div>
            <p class="subtitle" v-else>Ничего не найдено.</p>
        </div>

        <template v-if="selectedCompetitionsList.length">
            <p class="text_total">
                Итого: {{ selectedCompetitionsList.length }}
            </p>

            <multi-stage-submit-select
                v-for="headquarter in selectedCompetitionsList"
                :key="headquarter.id"
                :headquarter="headquarter"
                @select="onToggleSelectCompetition"
            />
        </template>
        <div class="competitions__btns" v-if="selectedCompetitionsList.length">
            <Button
                class="save"
                type="button"
                label="Подать заявку"
                @click="onAction"
            ></Button>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import MultiStageSubmitItem from './MultiStageSubmitItem.vue';
import MultiStageSubmitSelect from './MultiStageSubmitSelect.vue';

import { sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';

const isChecked = ref(false);
const route = useRoute();
const router = useRouter();

const headquartersJunior = ref([]);
const sortedHeadquartersJunior = ref([]);
const selectedCompetitionsList = ref([]);

const name = ref('');
const timerSearch = ref(null);
const ascending = ref(true);
const sortBy = ref('alphabetically');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'date_of_birth', name: 'По дате вступления в РСО' },
]);

const getHeadquartersJunior = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/multi_applications`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        let i = 0;
        if (data[0].district_headquarters) {
            headquartersJunior.value.push(
                ...data[0].district_headquarters.map((item) => {
                    item.district_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].regional_headquarters) {
            headquartersJunior.value.push(
                ...data[0].regional_headquarters.map((item) => {
                    item.regional_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].local_headquarters) {
            headquartersJunior.value.push(
                ...data[0].local_headquarters.map((item) => {
                    item.local_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].educational_headquarters) {
            headquartersJunior.value.push(
                ...data[0].educational_headquarters.map((item) => {
                    item.educational_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].detachments) {
            headquartersJunior.value.push(
                ...data[0].detachments.map((item) => {
                    item.detachment = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        sortedHeadquartersJunior.value = headquartersJunior.value;
    } catch (e) {
        console.log('getApplications error', e);
    }
};

const onToggleSelectCompetition = (competition, isChecked) => {
    if (isChecked) {
        competition.selected = isChecked;
        selectedCompetitionsList.value = [
            ...selectedCompetitionsList.value,
            competition,
        ];
    } else {
        competition.selected = isChecked;
        selectedCompetitionsList.value = selectedCompetitionsList.value.filter(
            (c) => c.id !== competition.id,
        );
    }
};

const searchHeadquarters = () => {
    if (!name.value) {
        sortedHeadquartersJunior.value = headquartersJunior.value;
    }
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        sortedByName(name.value);
    }, 400);
};

const sortedByName = async (name) => {
    console.log(name);
    sortedHeadquartersJunior.value = headquartersJunior.value.filter((obj) =>
        obj.name.includes(name),
    );
    console.log(sortedHeadquartersJunior.value);
};

const onAction = async () => {
    try {
        console.log(selectedCompetitionsList.value);
        selectedCompetitionsList.value = selectedCompetitionsList.value.map(
            (item) => {
                item.participants_count = 1;
                return item;
            },
        );
        console.log(selectedCompetitionsList.value);

        await HTTP.post(
            `/events/${route.params.id}/multi_applications/`,
            selectedCompetitionsList.value,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        router.push({
            name: 'Action',
            params: {
                id: route.params.id,
            },
        });
    } catch (e) {
        console.log('onAction error', e);
    }
};

const onCheckbox = async (event) => {
    if (event.target.checked) {
        for (const obj of sortedHeadquartersJunior.value) {
            obj.selected = true;
            selectedCompetitionsList.value.push(obj);
        }
    } else {
        for (const obj of sortedHeadquartersJunior.value) {
            obj.selected = false;
        }
        selectedCompetitionsList.value = [];
    }
};

watch(selectedCompetitionsList, (newSelectedCompetitionsList) => {
    isChecked.value =
        newSelectedCompetitionsList.length == headquartersJunior.value.length;
});

watch(ascending, () => {
    if (!ascending.value) {
        sortedHeadquartersJunior.value.reverse();
    }
});

onMounted(async () => {
    await getHeadquartersJunior();
});
</script>

<style scoped lang="scss">
#wrapper {
    display: flex;
}
#left {
    width: 25%;
}
#right {
    margin-left: 24px;
    width: 75%;
}
.form-input-container {
    border: 1px solid #b6b6b6;
    border-radius: 15px;
    padding-left: 20px;
    margin-bottom: 40px;

    font-family: Akrobat;
    font-size: 24px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: 0px;
    text-align: left;
}
.form__field {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 0px;
}
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
}
.main_title {
    margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.subtitle {
    font-style: normal;
    height: 26px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    margin-bottom: 24px;
}
.text_total {
    width: 1180px;
    height: 26px;
    margin-top: 60px;
    margin-bottom: 40px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}
.competitions__btns {
    display: grid;
    width: 100%;
    justify-content: center;
    margin-top: 68px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    width: 48px;
    height: 48px;
    input {
        width: 100%;
        height: 100%;
    }
}
.choose_all {
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
}
.additional_line {
    display: grid;
    grid-template-columns: 48px 1fr minmax(auto, 150px) minmax(auto, 300px);
    grid-gap: 12px;
    align-items: center;
    margin-bottom: 40px;
}
.download_text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #1f7cc0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.download_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 4px;
}
.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
.sort-select {
    &--width {
        width: 193px;
    }
    & > .form__select {
        margin-bottom: 0px;
    }
}
.sort_line {
    display: flex;
    align-items: center;
}
.contributor-search__input {
    width: 100%;
    padding: 13px 0px 10px 60px;
    border-radius: 10px;
    border: 1px solid black;
}
.contributor-search {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 40px;
}
.contributor-search img {
    position: absolute;
    top: 15px;
    left: 16px;
}
.radio_text {
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: black;
}
.filter_name {
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    margin-bottom: 20px;
}
.radio_button {
    margin-bottom: 16px;
}
</style>
