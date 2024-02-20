<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <div class="form__field">
            <!-- <img src="@app/assets/icon/search.svg" alt="search" /> -->
            <InputText
                id="name-hq"
                v-model="answers"
                class="form__input form-input-container"
                placeholder="Начните вводить"
                name="name_hq"
                :maxlength="100"
            />
        </div>

        <div id="wrapper">
            <div id="left">
                <p class="subtitle">Основные фильтры</p>
            </div>

            <div id="right">
                <div class="horizontallso__confidant">
                    <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
                </div>
                <p class="choose_all"> Выбрать всех </p>

                <multi-stage-submit-item
                    v-for="headquarter in headquartersJunior"
                    :key="headquarter"
                    :headquarter="headquarter"
                    @select="onToggleSelectCompetition"
                />
            </div>
        </div>

        <template v-if="selectedCompetitionsList.length">
            <p class="text_total">
                Итого: {{ selectedCompetitionsList.length }}
            </p>

            <multi-stage-submit-select
                v-for="headquarter in headquartersJunior"
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
import { Button } from '@shared/components/buttons';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
//import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import { HTTP } from '@app/http';
import MultiStageSubmitItem from './MultiStageSubmitItem.vue';
import MultiStageSubmitSelect from './MultiStageSubmitSelect.vue';

const isChecked = ref(false);
const route = useRoute();
//const router = useRouter();
const answers = ref();
const headquartersJunior = ref([]);
const selectedCompetitionsList = ref([]);

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

        headquartersJunior.value = data;
        console.log(headquartersJunior.value);
    } catch (e) {
        console.log('getApplications error', e);
    }
};

const onToggleSelectCompetition = (competition, isChecked) => {
    if (isChecked) {
        competition.selected = isChecked;
        selectedCompetitionsList.value.push(competition);
    } else {
        competition.selected = isChecked;
        selectedCompetitionsList.value = selectedCompetitionsList.value.filter(
            (c) => c.id !== competition.id,
        );
    }
};

const onAction = () => {
    try {
        console.log(selectedCompetitionsList.value);
    } catch (e) {
        console.log('onAction error', e);
    }
};

const onCheckbox = async (isChecked) => {
    console.log(isChecked);
    if (selectedCompetitionsList.value.length == 0){
        for (const obj of headquartersJunior.value) {
            obj.selected = true;
            selectedCompetitionsList.value.push(obj);
        }
    } else {
        for (const obj of headquartersJunior.value) {
            obj.selected = false;
        }
        selectedCompetitionsList.value = [];
    }
}

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
    width: 1180px;
    height: 26px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
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
    margin-bottom: 12px;
    width: 48px;
    height: 48px;
    input {
        width: 100%;
        height: 100%;
    }
}
.choose_all{
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383F;
}
</style>
