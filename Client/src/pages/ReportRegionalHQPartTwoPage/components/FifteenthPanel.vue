<template>
    <div class="panel-form">
        <div class="card-form">
            <p class="card-form__text">
                Количество членов РО, прошедших профессиональное обучение от Центрального штаба и трудоустроенных в
                текущем периоде
            </p>
        </div>

        <div class="card-form">
            <div v-for="(area, index) in areas" :key="index">
                <fifteenth-panel-form :area="area" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import FifteenthPanelForm from './FifteenthPanelForm.vue';

const areas = ref([
    {
        id: 1,
        name: "ССО",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "СПО",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "СОП",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "СМО",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "ССервО",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "ССхО",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "Профильные отряды",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "Производственные отряды",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
    {
        name: "ТОП",
        number_trained: '',
        number_employed: '',
        self_employment: '',
        number_unemployed: '',
        
        file: '',

        isFillingTableAutumn2024: false,
        isFillingTableSpring2025: false,
    },
])
</script>

<style scoped lang="scss">
.panel-form {
    margin-top: 8px;
}

.card-form {
    margin-bottom: 8px;
    padding: 40px;
    border-radius: 10px;
    background-color: #F3F4F5;

    &__text {
        // font-weight: 600;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0%;

    }
}
</style>