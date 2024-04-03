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
                <template
                    v-for="(competition, index) in competitionsList"
                    :key="competition.id"
                >
                    <active-competition-item
                        v-if="
                            competition.is_confirmed_by_junior ||
                            (competition.junior_detachment?.id ==
                                commanderIds.detachment_commander?.id &&
                                !competition.is_confirmed_by_junior) ||
                            !competition.detachment
                        "
                        :competition="competition"
                        :commander-ids="commanderIds"
                        :position="index"
                        @select="onToggleSelectCompetition"
                    />
                </template>
                <template
                    v-for="(report, index) in allReporting[2]"
                    :key="report.id"
                >
                    <active-competition-item-report
                        :report="report"
                        :position="index"
                        @select="onToggleSelectReport"
                    />
                </template>
                <template
                    v-if="
                        selectedCompetitionsList.length ||
                        selectedReportingList.length
                    "
                >
                    <p class="text_total">
                        Итого:
                        {{
                            selectedCompetitionsList.length +
                            selectedReportingList.length
                        }}
                    </p>

                    <active-competition-item-select
                        v-for="competition in selectedCompetitionsList"
                        :key="competition.id"
                        :competition="competition"
                        :action="action"
                        :commander-ids="commanderIds"
                        @select="onToggleSelectCompetition"
                    />
                    <active-competition-item-select-report
                        v-for="report in selectedReportingList"
                        :key="report.id"
                        :action="action"
                        :report="report"
                        @select="onToggleSelectReport"
                    />
                </template>
            </div>

            <div
                class="competitions__btns"
                v-if="
                    selectedCompetitionsList.length ||
                    selectedReportingList.length
                "
            >
                <Button
                    class="save"
                    type="button"
                    label="Сохранить"
                    @click="onAction"
                ></Button>
            </div>
            <div class="clear_select" v-else></div>
        </template>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, onActivated } from 'vue';
import ActiveCompetitionItem from './ActiveCompetitionItem.vue';
import ActiveCompetitionItemSelect from './ActiveCompetitionItemSelect.vue';
import ActiveCompetitionItemReport from './ActiveCompetitionsItemReport.vue';
import ActiveCompetitionItemSelectReport from './ActiveCompetitionsItemSelectReport.vue';

const competitionsList = ref([]);
const commanderIds = ref();
const selectedCompetitionsList = ref([]);
const allCompetition = ref([]);

const allReporting = ref({
    2: [],
});
const selectedReportingList = ref([]);

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
        commanderIds.value = data;
        console.log(commanderIds.value);
    } catch (e) {
        console.log('error getMeCommander', e);
    }
};

const getAllCompetition = async () => {
    try {
        const { data } = await HTTP.get(`/competitions/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        allCompetition.value = data.results;
    } catch (e) {
        console.log('error getAllCompetition', e);
    }
};

const getCompetitionsJunior = async () => {
    console.log(allCompetition);
    for (const competitionId of allCompetition.value) {
        try {
            loading.value = true;
            const { data } = await HTTP.get(
                `/competitions/${competitionId.id}/applications/me`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            if (!data.is_confirmed_by_junior)
                competitionsList.value = [...competitionsList.value, data];
        } catch (e) {
            console.log('error getCompetitionsJunior', e);
        } finally {
            loading.value = false;
        }
    }
};

const getCompetitions = async () => {
    for (const competitionId of allCompetition.value) {
        try {
            loading.value = true;
            const { data } = await HTTP.get(
                `/competitions/${competitionId.id}/applications/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            competitionsList.value = data.results.filter(
                (c) => c.is_confirmed_by_junior || !c.detachment,
            );
        } catch (e) {
            console.log('error getCompetitions', e);
        } finally {
            loading.value = false;
        }
    }
};

const onToggleSelectReport = (report, isChecked) => {
    if (isChecked) {
        report.selected = isChecked;
        selectedReportingList.value.push(report);
        console.log(selectedReportingList.value);
    } else {
        report.selected = isChecked;
        selectedReportingList.value = selectedReportingList.value.filter(
            (r) => r.id !== report.id,
        );
    }
};

const onToggleSelectCompetition = (competition, isChecked) => {
    console.log(competition);
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

const confirmApplication = async (id, competitionId) => {
    if (commanderIds.value.regionalheadquarter_commander?.id == null) {
        await HTTP.put(
            `/competitions/${competitionId}/applications/${id}/`,
            {
                is_confirmed_by_junior: true,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
    } else {
        await HTTP.post(
            `/competitions/${competitionId}/applications/${id}/confirm/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
    }
};

const cancelApplication = async (id, competitionId) => {
    await HTTP.delete(
        `/competitions/${competitionId}/applications/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
        {},
    );
};

const confirmIndicator = async (id, applicationId) => {
    await HTTP.post(
        `/competitions/1/reports/q${id}/${applicationId}/verify/`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );
};

const cancelIndicator = async (id, applicationId) => {
    await HTTP.delete(
        `/competitions/1/reports/q${id}/${applicationId}/verify/`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
        {},
    );
};

const onAction = async () => {
    console.log(selectedReportingList.value);
    if (selectedReportingList.value.lenght) {
        try {
            for (const application of selectedReportingList.value) {
                console.log(application);
                if (action.value === 'Одобрить') {
                    await confirmIndicator(
                        application.indicator,
                        application.id,
                    );
                } else {
                    await cancelIndicator(
                        application.indicator,
                        application.id,
                    );
                }
                competitionsList.value = competitionsList.value.filter(
                    (competition) => competition.id != application.id,
                );
                selectedReportingList.value =
                    selectedReportingList.value.filter(
                        (competition) => competition.id != application.id,
                    );
            }
        } catch (e) {
            console.log('error action 1', e);
        }
    }

    if (selectedCompetitionsList.value.lenght) {
        try {
            for (const application of selectedCompetitionsList.value) {
                if (action.value === 'Одобрить') {
                    console.log(application.id);
                    await confirmApplication(
                        application.id,
                        application.competition.id,
                    );
                } else {
                    await cancelApplication(
                        application.id,
                        application.competition.id,
                    );
                }
                allReporting.value = allReporting.value.filter(
                    (competition) => competition.id != application.id,
                );
                selectedCompetitionsList.value =
                    selectedCompetitionsList.value.filter(
                        (competition) => competition.id != application.id,
                    );
            }

            if (commanderIds.value.regionalheadquarter_commander?.id == null)
                if (
                    commanderIds.value.regionalheadquarter_commander?.id == null
                )
                    await getCompetitionsJunior();
                else await getCompetitions();
        } catch (e) {
            console.log('error action 2', e);
        }
    }
};

const getAllReporting = async () => {
    loading.value = true;
    for (let index = 1; index <= 20; ++index)
        try {
            const { data } = await HTTP.get(
                `/competitions/1/reports/q${index}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            for (let report of data.results) {
                if (!report.is_verified) {
                    report.indicator = index;
                    allReporting.value[index].push(report);
                }
            }
            console.log(allReporting.value);
        } catch (e) {
            console.log('getAllReporting error', e);
        }
    loading.value = false;
};

onMounted(async () => {
    await getAllReporting();
    await getAllCompetition();
    await getMeCommander();
    console.log();
    if (commanderIds.value.regionalheadquarter_commander?.id == null)
        await getCompetitionsJunior();
    else await getCompetitions();
});

onActivated(async () => {
    await getAllCompetition();
    await getMeCommander();
    if (commanderIds.value.regionalheadquarter_commander?.id == null)
        if (commanderIds.value.regionalheadquarter_commander?.id == null)
            await getCompetitionsJunior();
        else await getCompetitions();
});
</script>

<style scoped lang="scss">
.clear_select {
    margin-bottom: 100px;
}
.competitions__actions {
    display: grid;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 40px;
    //width: 224px;
    height: 48px;
    padding: 4px, 16px, 4px, 16px;
    gap: 10px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competitions__actions-select {
    background-color: inherit;
    min-width: 224px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
:deep(.v-field) {
    border-radius: 10px;
}
.competitions__btns {
    display: grid;
    width: 100%;
    justify-content: center;
    margin-top: 60px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.text_total {
    width: 1180px;
    height: 26px;
    margin: 40px 0;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}
:deep(.v-select__selection-text) {
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
</style>
