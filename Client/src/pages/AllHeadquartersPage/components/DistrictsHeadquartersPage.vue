<template>
    <div class="container">
        <div class="headquarters">
            <bannerCreate desc="Находим крутых работодателей. Стань частью большой команды, для которой «Труд Крут»!"
                :button="false"></bannerCreate>
            <h2 class="headquarters-title">Окружные штабы</h2>
            <div class="headquarters-sort">
                <changeButton :vertical="vertical" @switch="showVertical()" />
            </div>

            <div v-show="vertical">
                <HeadquartersList :is-loading="districtStore.isLoading" :headquarters="districtStore.districts"
                    :name="'DistrictHQ'" />
            </div>

            <div v-show="!vertical">
                <HeadquartersList :is-loading="districtStore.isLoading" :headquarters="districtStore.districts"
                    :name="'DistrictHQ'" :horizontal="true" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Button, changeButton } from '@shared/components/buttons';
import {
    HeadquartersList
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
        padding: 40px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        box-shadow: 0px 4px 30px 0px #0000000D;
        border-radius: 10px;
        margin-top: 40px;

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
</style>
