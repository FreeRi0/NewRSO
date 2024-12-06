<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                :button="false"></bannerCreate>
            <h2 class="headquarters-title">Окружные штабы</h2>
            <div class="headquarters-sort">
                <div class="sort-layout">
                    <div>
                        <Button v-if="vertical" type="button" class="dashboard" icon="icon" color="white"
                            @click="showVertical">
                        </Button>
                        <Button v-else type="button" class="dashboardD" icon="icon" color="white" @click="showVertical">
                        </Button>
                    </div>
                    <div>
                        <Button v-if="!vertical" type="button" class="menuuA" icon="icon" color="white"
                            @click="showVertical"></Button>
                        <Button v-else type="button" class="menuu" icon="icon" color="white"
                            @click="showVertical"></Button>
                    </div>
                </div>
            </div>

            <div v-show="vertical" class="mt-10">
                <DistrictHQList :is-loading="districtStore.isLoading" :districtHeadquarters="districtStore.districts">
                </DistrictHQList>
            </div>

            <div class="horizontal" v-show="!vertical">
                <HorizontalDistrictHQs :is-loading="districtStore.isLoading"
                    :districtHeadquarters="districtStore.districts"></HorizontalDistrictHQs>
            </div>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Button } from '@shared/components/buttons';
import {
    DistrictHQList,
    HorizontalDistrictHQs,
} from '@features/Headquarters/components';
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useDistrictsStore } from '@features/store/districts';

const districtStore = useDistrictsStore();

const vertical = ref(true);

const showVertical = () => {
    vertical.value = !vertical.value;
};

onMounted(() => {
    districtStore.getDistricts();
});
</script>
<style lang="scss">
.headquarters {
    padding-bottom: 60px;

    &-title {
        margin-bottom: 40px;
        font-size: 52px;

        @media screen and (max-width: 575px) {
            font-size: 40px;
        }
    }

    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;

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
</style>
