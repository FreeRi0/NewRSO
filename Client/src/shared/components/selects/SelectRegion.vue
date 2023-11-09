<template>
    <v-select
        class="mb-2"
        variant="outlined"
        placeholder="Выберете регион обучения"
        :items="regions"
        item-title="name"
    >
        <template v-slot:item="{ props }">
            <v-list-item v-bind="props"></v-list-item>
        </template>
    </v-select>
    <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const regions = ref([]);

const props = defineProps({
    error: {
        type: Array,
        required: false,
    },
});

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

// http://api.geonames.org/get?geonameId=1&username=demo.

onMounted(() => {
    onChangeRegion();
});
</script>
<style lang="scss"></style>
2017370 geonameId: 709716
