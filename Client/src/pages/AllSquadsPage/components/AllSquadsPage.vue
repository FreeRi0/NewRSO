<template>
    <div class="container">
        <div class="squads">
            <bannerCreate></bannerCreate>
            <h2 class="squads-title">Студенческие отряды</h2>

            <div class="squads-tabs">
                <!-- <Button label="все"></Button> -->
                <v-btn value="все" @click="picked" >Все</v-btn>
                <div class="squad-tabs__item" v-for="cat in categories">
                    <v-btn :value="category" @click="picked">{{ cat }}</v-btn>
                    <!-- <Button :value="category">{{ cat }}</Button> -->
                </div>
            </div>

            <div class="squads-search">
                <input
                    type="text"
                    id="search"
                    class="squads-search__input"
                    v-model="searchSquads"
                    placeholder="Поищем отряд?"
                />
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="squads-sort">
                <div class="sort-layout">
                    <Button icon="icon" color="white" @click="showVertical">
                    </Button>
                    <Button
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>

                <div class="sort-filters">
                    <div class="sort-select">
                        <sortByEducation
                            v-model="selectedSort"
                            :options="educations"
                        ></sortByEducation>
                    </div>
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

            <div class="squads-wrapper" v-show="vertical">
                <squadsList :squads="sortedSquads"></squadsList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalList :squads="sortedSquads"></horizontalList>
            </div>
            <Button
                @click="squadsVisible += step"
                v-if="squadsVisible < squads.length"
                label="Показать еще"
            ></Button>
            <Button
                @click="squadsVisible -= step"
                v-else
                label="Свернуть все"
            ></Button>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Input, Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { squadsList, horizontalList } from '@features/Squads/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';

const squads = ref([
    {
        title: 'Инвар',
        category: 'Строительные',
        desc: 'ССО',
        full: 'Студенческий строительный отряд',
        image: 'squad-logo.png',
        peoples: 12,
        createdAt: '2022-12-10',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Звездочки',
        category: 'Проводников',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 19,
        createdAt: '2023-02-10',
        education: 'Амурский государственный университет',
    },
    {
        title: 'Помощь рядом',
        category: 'Медицинские',
        desc: 'ССО',
        full: 'Студенческий строительный отряд',
        image: 'squad-logo.png',
        peoples: 5,
        createdAt: '2021-12-01',
        education: 'МГУ',
    },
    {
        title: 'Мафия',
        category: 'Педагогические',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 8,
        createdAt: '2020-11-10',
        education: 'Университет имени Баумана',
    },
    {
        title: 'Юмористы',
        category: 'Строительные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 7,
        createdAt: '2021-02-12',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Сокол',
        category: 'Сервисные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 14,
        createdAt: '2012-12-01',
        education: 'Амурский государственный университет',
    },
    {
        title: 'Гиена',
        category: 'Сельскохозяйственные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 12,
        createdAt: '2020-12-18',
        education: 'МГУ',
    },
    {
        title: 'Санитары',
        category: 'Медицинские',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 22,
        createdAt: '2021-04-13',
        education: 'Университет имени Баумана',
    },
    {
        title: 'Ежики',
        category: 'Педагогические',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 12,
        createdAt: '2022-12-10',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Бригада',
        category: 'Путинные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 2,
        createdAt: '2022-12-10',
        education: 'Амурский государственный университет',
    },
    {
        title: 'Юниоры',
        category: 'Сервисные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 5,
        createdAt: '2022-12-10',
        education: 'МГУ',
    },
    {
        title: 'Студенты МГИМО',
        category: 'Строительные',
        desc: 'ССО',
        full: 'Студенческий строительный отряд',
        image: 'squad-logo.png',
        peoples: 14,
        createdAt: '2022-12-10',
        education: 'Университет имени Баумана',
    },
    {
        title: 'Барбарики',
        category: 'Проводников',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 22,
        createdAt: '2022-12-10',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Спортсмены МГУ',
        category: 'Медицинские',
        desc: 'ССО',
        full: 'Студенческий строительный отряд',
        image: 'squad-logo.png',
        peoples: 10,
        createdAt: '2022-12-10',
        education: 'Амурский государственный университет',
    },
    {
        title: 'Ковбои',
        category: 'Педагогические',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 4,
        createdAt: '2022-12-10',
        education: 'МГУ',
    },
    {
        title: 'Пришельцы',
        category: 'Сельскохозяйственные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 6,
        createdAt: '2022-12-10',
        education: 'Университет имени Баумана',
    },
    {
        title: 'Луч света',
        category: 'Сельскохозяйственные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 25,
        createdAt: '2022-12-10',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Мираж',
        category: 'Сельскохозяйственные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 11,
        createdAt: '2022-12-10',
        education: 'Амурский государственный университет',
    },
    {
        title: 'Градусники',
        category: 'Медицинские',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 17,
        createdAt: '2022-12-10',
        education: 'МГУ',
    },
    {
        title: 'Студенты РГСУ',
        category: 'Педагогические',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 15,
        createdAt: '2022-12-10',
        education: 'РГГУ',
    },
    {
        title: 'Топ',
        category: 'Путинные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 10,
        createdAt: '2022-12-10',
        education: 'Амурская государственная медицинская академия',
    },
    {
        title: 'Белки',
        category: 'Сервисные',
        desc: 'СОП-1',
        full: 'Студенческий отряд проводников',
        image: 'squad-logo.png',
        peoples: 12,
        createdAt: '2022-12-10',
        education: 'Амурский государственный университет',
    },
]);

const squadsVisible = ref(12);

const step = ref(10);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const picked = ref('все');

const categories = ref([
    'Проводников',
    'Строительные',
    'Педагогические',
    'Сельскохозяйственные',
    'Сервисные',
    'Медицинские',
    'Путинные',
]);

const vertical = ref(true);

const searchSquads = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};

const educations = ref([
    {
        value: 'Амурская государственная медицинская академия',
        name: 'Амурская государственная медицинская академия',
    },
    { value: 'Университет имени Баумана', name: 'Университет имени Баумана' },
    { value: 'РГГУ', name: 'РГГУ' },
    { value: 'МГУ', name: 'МГУ' },
]);

const selectedSort = ref(0);

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'createdAt', name: 'Дате создания отряда' },
    { value: 'peoples', name: 'Количеству участников' },
]);

const sortedSquads = computed(() => {
    let tempSquads = squads.value;

    // if (picked.value == 'all')
    //     return tempSquads
    //   else
    //     return _.filter(tempSquads, x => x.category == picked.value)

    tempSquads = tempSquads.slice(0, squadsVisible.value);

    tempSquads = tempSquads.filter((item) => {
        return picked.value == 'все' || item.category == picked.value;
    })

    tempSquads = tempSquads.filter((item) => {
        return selectedSort.value == 0 || item.education == selectedSort.value;
    });

    tempSquads = tempSquads.filter((item) => {
        return item.title
            .toUpperCase()
            .includes(searchSquads.value.toUpperCase());
    });

    tempSquads = tempSquads.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'createdAt') {
            let fc = a.createdAt,
                fn = b.createdAt;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'peoples') {
            return a.peoples - b.peoples;
        }
    });

    if (!ascending.value) {
        tempSquads.reverse();
    }

    return tempSquads;
});
</script>
<style lang="scss">
.squads {
    padding: 60px 0px 60px 0px;
    &-title {
        font-size: 52px;
    }
    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    &-tabs {
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        &__item {
            padding: 10px 24px;
            border: 2px solid black;
            border-radius: 30px;
            text-align: center;
            font-size: 20px;
            background-color: white;
            font-family: 'Bert Sans';
            margin: 20px 20px 0px 0px;
            cursor: pointer;
        }
    }
}

.horizontal {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
}

.sort {
    &-filters {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        margin-top: 60px;
    }
    &-select {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    &-layout {
        display: flex;
    }
}

.btn {
    &_icon {
        border: 1px solid #35383f;
        border-radius: 10px;
        height: 32px;
        width: 32px;
        margin: 0px;
        margin-right: 8px;
    }
}

.squads-search {
    position: relative;
    box-sizing: border-box;
    svg {
        position: absolute;
        top: 10px;
        left: 16px;
    }
    &__input {
        width: 100%;
        padding: 13px 0px 10px 60px;
        border-radius: 10px;
        border: 1px solid black;
    }
}
</style>
