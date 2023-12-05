<template>
    <!-- <v-select
        class="mb-2 reg"
        variant="outlined"
        placeholder="Выберете регион обучения"
        :items="regions"
        :value="modelValue"
        item-title="name"
    >
        <template v-slot:item="{ props }">
            <v-list-item v-bind="props"></v-list-item>
        </template>
    </v-select> -->
    <select
        class="reg"
        :value="modelValue"
        @change="changeOption"
    >
        <option value="0">Выберите из списка</option>
        <option
            v-for="option in regions"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
    <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
const regions = ref([]);

const props = defineProps({
    modelValue: {
        type: String,
    },
    options: {
        type: Array,
        default: () => [],
    },
    error: {
        type: Array,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
};

const onChangeRegion = async () => {
    await HTTP
        .get('/regions/')

        .then((res) => {
            regions.value = res.data;
            console.log(res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    onChangeRegion();
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
    background: url(../images/icons/angel-down.svg) no-repeat right;
    appearance: none;
    background-position-x: calc(100% - 16px);
    width: 100%;
}
</style>
2017370 geonameId: 709716
