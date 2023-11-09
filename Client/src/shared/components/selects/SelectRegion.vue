<template>
    <v-select
        class="mb-2 reg"
        variant="outlined"
        placeholder="Выберете регион обучения"
        :items="regions"
        item-title="name"
    >
        <template v-slot:item="{ props }">
            <v-list-item v-bind="props"></v-list-item>
        </template>
    </v-select>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const regions = ref([]);

const onChangeRegion = async () => {
    await axios
        .get('http://www.geonames.org/childrenJSON?geonameId=2017370&lang=ru')
        .then((res) => {
            regions.value = res.data.geonames;
            console.log(res);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const onChangeNewRegion = async () => {
    await axios
        .get(
            'http://api.geonames.org/get?geonameId=709716&lang=ru&username=demo',
        )
        .then((res) => {
            regions.value = res.data.geonames;
            console.log(res);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

// http://api.geonames.org/get?geonameId=1&username=demo.

onMounted(() => {
    onChangeRegion();
    onChangeNewRegion();
});
</script>
<style lang="scss">
.reg {
    border: 2px solid #a3a3a3;
    border-radius: 10px;
    padding: 8px, 20px, 8px, 20px;
    min-height: 41px;
    font-family: 'BertSans';
    font-weight: 500;
    font-size: 16px;
    color: #898989;
    margin-bottom: 20px;
    background: url(../images/icons/angel-down.svg) no-repeat right;
    appearance: none;
    background-position-x: calc(100% - 16px);
}
</style>
2017370 geonameId: 709716
