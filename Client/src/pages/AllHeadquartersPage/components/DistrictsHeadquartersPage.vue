<template>
    <div class="container">
        <div class="headquarters">
            <Breadcrumbs :items="pages"></Breadcrumbs>
            <bannerCreate
                desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                label="Создать штаб"
            ></bannerCreate>
            <h2 class="headquarters-title">Окружные штабы</h2>
            <div class="headquarters-sort">
                <div class="sort-layout">
                    <Button
                        v-if="vertical"
                        type="button"
                        class="dashboard"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    >
                    </Button>
                    <Button
                        v-else="!vertical"
                        type="button"
                        class="dashboardD"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    >
                    </Button>
                    <Button
                        v-if="!vertical"
                        type="button"
                        class="menuuA"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                    <Button
                        v-else="vertical"
                        type="button"
                        class="menuu"
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>

                <div class="sort-filters">
                </div>
            </div>

            <div class="headquarters-wrapper" v-show="vertical">
                <HeadquartersList
                    :headquarters="districtHeadquarters"
                ></HeadquartersList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <horizontalHeadquarters
                    :headquarters="districtHeadquarters"
                ></horizontalHeadquarters>
            </div>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Input, Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import {
    HeadquartersList,
    horizontalHeadquarters,
} from '@features/Headquarters/components';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, computed, onMounted } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { HTTP } from '@app/http';
// import headquarters from '@entities/HeadquartersData/headquarters';

const districtHeadquarters = ref([]);

const pages = ref([
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Окружные штабы', href: '/AllHeadquarters' },
]);

const vertical = ref(true);


const showVertical = () => {
    vertical.value = !vertical.value;
};

const getDistrictHeadquarters = async () => {
    await HTTP.get('/districts/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            districtHeadquarters.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    getDistrictHeadquarters();
});

</script>
<style lang="scss">
.headquarters {
    padding: 40px 0px 60px 0px;
    &-title {
        margin-bottom: 40px;
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 40px;
        }
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        @media screen and (max-width: 768px) {
            flex-direction: column-reverse;
            align-items: flex-start;
        }
    }
    &-search {
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
    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        /* box-shadow: 1em 2em 2.5em rgba(1, 2, 68, 0.08); */
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr;
        }
    }
}
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;
    &-category {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        &-full {
            text-align: center;
            font-size: 20px;
            font-family: 'Akrobat';
            margin-left: 20px;
            margin-right: 5px;
            color: #1e1e1e;
        }
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}

.horizontal {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
}
.form__select {
    margin-bottom: 0px;
    margin-right: 8px;
    border: 1px solid #35383F;
}
.dashboard {
    background-image: url('@app/assets/icon/darhboard-active.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.dashboardD {
    background-image: url('@app/assets/icon/darhboard-disable.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuuA {
    background-image: url('@app/assets/icon/MenuA.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuu {
    background-image: url('@app/assets/icon/Menu.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
.sort-filters {
    @media screen and (max-width: 768px) {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 60px;
    }
}

.filter {
    &-local {
        width: 186px;
    }
    &-region {
        width: 227px;
    }

    &-district {
        width: 193px;
    }
}

@media (max-width: 575px) {
    .squads-sort {
        flex-direction: column-reverse;
    }
    .sort-filters {
        flex-wrap: wrap;
        margin-bottom: 40px;
        align-items: end;
    }

    .sort-select {
        margin-top: 12px;
    }
}
</style>
@shared/components/selects/inputs