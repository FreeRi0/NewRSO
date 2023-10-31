<template>
    <div class="container">
        <!-- @update:modelValue=""  -->
        <div class="squads">
            <bannerCreate></bannerCreate>
            <h2 class="squads-title">Студенческие отряды</h2>
            <Search type="text" v-model:value="searchSquads"></Search>
            <div class="squads-sort"></div>
            <div class="sort-filters">
                <div class="sort-select">
                    <sortByEducation
                        v-model="selectedSort"
                        :options="sortOptions"
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
            <div class="squads-wrapper">
                <squadsList :squads="sortedSquads"></squadsList>
            </div>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { squadsList } from '@features/Squads/components';
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

const ascending = ref(true);
const sortBy = ref('alphabetically');

const searchSquads = ref('');

const sortOptions = ref([
    {
        value: 'all',
        name: 'Все',
    },
    {
        value: 'education',
        name: 'Амурская государственная медицинская академия',
    },
    { value: 'education', name: 'Университет имени Баумана' },
    { value: 'education', name: 'Университет имени Баумана' },
    { value: 'education', name: 'РГГУ' },
    { value: 'education', name: 'МГУ' },
]);

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


    tempSquads = tempSquads.filter((item) => {
            return item.title
                .toUpperCase()
                .includes(searchSquads.value.toUpperCase());
        });

        console.log(tempSquads);

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
<style lang="scss" scoped>
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
}
.sort-filters {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    margin-top: 60px;
}

.sort-select {
    position: relative;
    display: flex;
    flex-direction: column;
}

.btn {
    &_icon {
        border: 1px solid #35383f;
        border-radius: 10px;
        height: 32px;
        width: 32px;
    }
}
</style>
