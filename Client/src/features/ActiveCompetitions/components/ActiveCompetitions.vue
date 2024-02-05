<template>
    <div class="competitions__container">
        <p v-if="loading">Загрузка...</p>
        <p v-else-if="!loading && !competitionsList.length">
            Список заявок на конкурсы пуст
        </p>

        <template v-else>
            <div class="competitions__actions">
                <v-select
                    variant="outlined"
                    class="form__field competitions__actions-select"
                    :items="actionsList"
                    v-model="action"
                    placeholder="Выберите действие"
                />
            </div>
            <div class="competitions__list">
                <active-competition-item
                    v-for="competition in competitionsList"
                    :key="competition.id"
                    :competition="competition"
                    @select="onToggleSelectCompetition"
                />

                <p>Итого: {{ selectedCompetitionsList.length }}</p>

                <active-competition-item-select
                    v-for="competition in selectedCompetitionsList"
                    :key="competition.id"
                    :competition="competition"
                    :action="action"
                    @select="onToggleSelectCompetition"
                />
            </div>

            <div class="competitions__btns">
                <Button
                    class="save"
                    type="button"
                    :label="action"
                    @click="onAction"
                ></Button>
            </div>
        </template>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, onActivated } from 'vue';
import ActiveCompetitionItem from './ActiveCompetitionItem.vue';
import ActiveCompetitionItemSelect from './ActiveCompetitionItemSelect.vue';

const competitionsList = ref([]);
const headquarterId = ref();
const selectedCompetitionsList = ref([]);

const loading = ref(false);
const action = ref('Одобрить');
const actionsList = ref(['Одобрить', 'Отклонить']);

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get('/rsousers/me_commander/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        headquarterId.value = data;
        console.log(headquarterId.value.regionalheadquarter_commander);
    } catch (e) {
        console.log('error getMeCommander', e);
    }
};

const getCompetitions = async () => {
    try {
        loading.value = true;
        console.log(headquarterId.value.regionalheadquarter_commander);
        const { data } = await HTTP.get(
            `/competitions/${headquarterId?.value?.regionalheadquarter_commander}/applications/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        competitionsList.value = data;
    } catch (e) {
        console.log(headquarterId);
        console.log(headquarterId.value.regionalheadquarter_commander);
        console.log('error getCompetitions', e);
    } finally {
        loading.value = false;
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

const confirmApplication = async (id) => {
    await HTTP.post(
        `/competitions/${headquarterId?.value?.regionalheadquarter_commander}/applications/${id}/confirm/`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );
};

const cancelApplication = async (id) => {
    await HTTP.delete(
        `/competitions/${headquarterId?.value?.regionalheadquarter_commander}/applications/${id}`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );
};

const onAction = async () => {
    try {
        for (const application of selectedCompetitionsList.value) {
            if (action.value === 'Одобрить') {
                await confirmApplication(application.id);
            } else {
                await cancelApplication(application.id);
            }
        }

        getCompetitions();
    } catch (e) {
        console.log('error action', e);
    }
};

onMounted(async () => {
    await getMeCommander();
    await getCompetitions();
});

onActivated(async () => {
    await getMeCommander();
    await getCompetitions();
});
</script>

<style scoped lang="scss">
.competitions__actions {
    display: grid;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 40px;
}

.competitions__actions-select {
    background-color: inherit;
    min-width: 224px;
}

.competitions__btns {
    display: flex;
    width: 100%;
    justify-content: center;
}
</style>
