<template>
    <div class="competitions__container">
        <p v-if="loading">Загрузка...</p>
        <p v-else-if="!competitionsList.length && !lengthAllReporting">
            Список заявок на конкурсы пуст
        </p>

        <template v-else>
            <div class="competitions__actions">
                <div class="horizontal__confidant">
                    <input type="checkbox" v-model="isCheckedAll" @change="onChooseAll" />
                </div>
                <v-select variant="outlined" class="form__field competitions__actions-select" :items="actionsList"
                    v-model="action" placeholder="Выберите действие" />
            </div>

            <div class="competitions__list">
                <template v-for="(competition, index) in competitionsList" :key="competition.id">
                    <active-competition-item v-if="
                        competition.is_confirmed_by_junior ||
                        (competition.junior_detachment?.id ==
                            commanderIds.detachment_commander?.id &&
                            !competition.is_confirmed_by_junior) ||
                        !competition.detachment
                    " :competition="competition" :commander-ids="commanderIds" :position="index"
                        @select="onToggleSelectCompetition" />
                </template>
                <template v-for="index in 20" :key="index">
                    <div class="competition__item">
                        <div class="competition__content">
                            <template v-if="index == 1">
                                <span></span>
                                <span>Показатель</span>
                                <span>Отряд</span>
                                <span>Конкурс</span>
                                <span>Номинация</span>
                            </template>
                        </div>
                    </div>
                    <template v-for="report in allReporting[index]" :key="report.id">
                        <active-competition-item-report :report="report" :position="index"
                            @select="onToggleSelectReport" />
                    </template>
                </template>

                <template v-if="
                    selectedCompetitionsList.length ||
                    selectedReportingList.length
                ">
                    <p class="text_total">
                        Итого:
                        {{
                            selectedCompetitionsList.length +
                            selectedReportingList.length
                        }}
                    </p>

                    <active-competition-item-select v-for="competition in selectedCompetitionsList"
                        :key="competition.id" :competition="competition" :action="action" :commander-ids="commanderIds"
                        @select="onToggleSelectCompetition" />
                    <active-competition-item-select-report v-for="report in selectedReportingList" :key="report.id"
                        :action="action" :report="report" @select="onToggleSelectReport" />
                </template>
            </div>

            <div class="competitions__btns" v-if="
                selectedCompetitionsList.length ||
                selectedReportingList.length
            ">
                <Button class="save" type="button" label="Сохранить" @click="onAction"></Button>
            </div>
            <div class="clear_select" v-else></div>
        </template>
    </div>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, inject, watch, computed } from 'vue';
import ActiveCompetitionItem from './ActiveCompetitionItem.vue';
import ActiveCompetitionItemSelect from './ActiveCompetitionItemSelect.vue';
import ActiveCompetitionItemReport from './ActiveCompetitionsItemReport.vue';
import ActiveCompetitionItemSelectReport from './ActiveCompetitionsItemSelectReport.vue';

const competitionsList = ref([]);
const commanderIds = ref();
const selectedCompetitionsList = ref([]);
const allCompetition = ref([]);

const swal = inject('$swal');

const isCheckedAll = ref(false);

const allReporting = ref({});
const selectedReportingList = ref([]);

const loading = ref(false);
const action = ref('Одобрить');
const actionsList = ref(['Одобрить', 'Отклонить']);

const hasReports = ref(false);

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get('/rsousers/me_commander/');
        commanderIds.value = data;
    } catch (e) {
        console.log('error getMeCommander', e);
    }
};

const getAllCompetition = async () => {
    try {
        const { data } = await HTTP.get(`/competitions/`);
        allCompetition.value = data.results;
    } catch (e) {
        console.log('error getAllCompetition', e);
    }
};

const getCompetitionsJunior = async () => {
    for (const competitionId of allCompetition.value) {
        try {

            const { data } = await HTTP.get(
                `/competitions/${competitionId.id}/applications/me`
            );
            if (!data.is_confirmed_by_junior)
                competitionsList.value = [...competitionsList.value, data];
        } catch (e) {
            console.log('error getCompetitionsJunior', e);
        }
    }
};

const getCompetitions = async () => {
    for (const competitionId of allCompetition.value) {
        try {

            const { data } = await HTTP.get(
                `/competitions/${competitionId.id}/applications/`
            );
            competitionsList.value = data.results.filter(
                (c) => c.is_confirmed_by_junior || !c.detachment,
            );
        } catch (e) {
            console.log('error getCompetitions', e);
        }
    }
};

const onChooseAll = () => {
    if (isCheckedAll.value) {
        selectedReportingList.value = [];
        for (let index = 2; index <= 20; index++) {
            if (allReporting.value[index]) {
                allReporting.value[index] = allReporting.value[index].map(
                    (r) => {
                        r.selected = isCheckedAll.value;
                        return r;
                    },
                );
                for (const r of allReporting.value[index]) {
                    selectedReportingList.value.push(r);
                }
            }
        }
    } else {
        for (let index = 2; index <= 20; index++) {
            if (allReporting.value[index]) {
                allReporting.value[index] = allReporting.value[index].map(
                    (r) => {
                        r.selected = isCheckedAll.value;
                        return r;
                    },
                );
            }
        }
        selectedReportingList.value = [];
    }
};

const onToggleSelectReport = (report, isChecked) => {
    if (isChecked) {
        report.selected = isChecked;
        selectedReportingList.value = [...selectedReportingList.value, report];
        // selectedReportingList.value.push(report);
    } else {
        report.selected = isChecked;
        selectedReportingList.value = selectedReportingList.value.filter(
            (r) => r.id !== report.id,
        );
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

const confirmApplication = async (id, competitionId) => {
    if (commanderIds.value.regionalheadquarter_commander?.id == null) {
        await HTTP.put(
            `/competitions/${competitionId}/applications/${id}/`,
            {
                is_confirmed_by_junior: true,
            },
        );
    } else {
        await HTTP.post(
            `/competitions/${competitionId}/applications/${id}/confirm/`,
            {},
        );
    }
};

const cancelApplication = async (id, competitionId) => {
    await HTTP.delete(
        `/competitions/${competitionId}/applications/${id}`,
        {},
    );
};

const firstTypeIndicator = [5, 13, 14, 15, 17];

const confirmIndicator = async (id, applicationId, pointId) => {
    if (firstTypeIndicator.includes(id)) {
        await HTTP.post(
            `/competitions/1/reports/q${id}/${applicationId}/accept/${pointId}/`,
            {},
        );
    } else if (id == 6) {
        for (let key in allReporting.value[6][0]) {
            if (key.indexOf('block') != -1 && allReporting.value[6][0][key] && !allReporting.value[6][0][key].is_verified) {
                key = key.replaceAll('_', '-');
                await HTTP.post(
                    `/competitions/1/reports/q${id}/${applicationId}/verify-${key}/`,
                    {},
                );
            }
        }
    } else {
        await HTTP.post(
            `/competitions/1/reports/q${id}/${applicationId}/accept/`,
            {},
        );
    }
};

const cancelIndicator = async (id, applicationId, pointId) => {
    if (firstTypeIndicator.includes(id)) {
        await HTTP.delete(
            `/competitions/1/reports/q${id}/${applicationId}/accept/${pointId}`,
            {},
        );
    } else if (id == 6) {
        for (let key in allReporting.value[6][0]) {
            if (key.indexOf('block') != -1 && allReporting.value[6][0][key] && !allReporting.value[6][0][key].is_verified) {
                key = key.replaceAll('_', '-');
                await HTTP.delete(
                    `/competitions/1/reports/q${id}/${applicationId}/verify-${key}/`,
                    {},
                );
            }
        }
    } else {
        await HTTP.delete(
            `/competitions/1/reports/q${id}/${applicationId}/accept/`,
            {},
        );
    }
};

const onAction = async () => {
    if (selectedReportingList.value.length) {
        try {
            for (const application of selectedReportingList.value) {
                if (action.value === 'Одобрить') {
                    if (application.information) {
                        for (const temp of application.information) {
                            await confirmIndicator(
                                application.indicator,
                                application.id,
                                temp.id,
                            );
                        }
                    } else {
                        await confirmIndicator(
                            application.indicator,
                            application.id,
                            null,
                        );
                    }
                } else {
                    if (application.information) {
                        for (const temp of application.information) {
                            await cancelIndicator(
                                application.indicator,
                                application.id,
                                temp.id,
                            );
                        }
                    } else {
                        await cancelIndicator(
                            application.indicator,
                            application.id,
                            null,
                        );
                    }
                }
                allReporting.value[application.indicator] = allReporting.value[
                    application.indicator
                ].filter((competition) => competition.id != application.id);
                selectedReportingList.value =
                    selectedReportingList.value.filter(
                        (competition) => competition.id != application.id,
                    );
            }
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ошибка верификации`,
                showConfirmButton: false,
                timer: 2500,
            });
            console.log('error action 1', e);
        }
    }

    if (selectedCompetitionsList.value.length) {
        try {
            for (const application of selectedCompetitionsList.value) {
                if (action.value === 'Одобрить') {
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
                allCompetition.value = allCompetition.value.filter(
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
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ошибка верификации`,
                showConfirmButton: false,
                timer: 2500,
            });
            console.log('error action 2', e);
        }
    }
};

const reportsCommissionerIds = ref([5,6,7,8,9,10,11,12,13,16,20]);

const getAllReporting = async () => {
    loading.value = true;
    for (let index = 2; index <= 20; ++index) {
        if (index == 3 || index == 4) continue;
        if(
            (commanderIds.value.regionalheadquarter_commander || 
            commanderIds.value.localheadquarter_commander || 
            commanderIds.value.educationalheadquarter_commander || 
            commanderIds.value.districtheadquarter_commander) && 
            reportsCommissionerIds.value.includes(index)
        ) {
            continue;
        } else if (
            !(commanderIds.value.regionalheadquarter_commander || 
            commanderIds.value.localheadquarter_commander || 
            commanderIds.value.educationalheadquarter_commander || 
            commanderIds.value.districtheadquarter_commander) && 
            !reportsCommissionerIds.value.includes(index)
        ) {
            continue;
        }
        try {
            const { data } = await HTTP.get(
                `/competitions/1/reports/q${index}/`,
            );
            for (let report of data.results) {
                if (report.is_verified) continue;
                report = renameObject(report, index);
                report.indicator = index;
                if (!allReporting.value[index]) {
                    allReporting.value[index] = [];
                }
                if (index == 6) {
                    let del = true;
                    for (const key in report) {
                        if (key.indexOf('block') != -1 && !(report[key] && !report[key].is_verified)) {
                            delete report[key]
                        } else if (key.indexOf('block') != -1 && !(report[key] && report[key].is_verified)) {
                            del = false;
                        }
                    }
                    if (!del) allReporting.value[index].push(report);
                } else if (report.information) {
                    let tempArr = [];
                    for (const tempData of report.information) {
                        if (!tempData.is_verified) tempArr.push(tempData);
                    }
                    report.information = tempArr;
                    if (tempArr.length) allReporting.value[index].push(report);
                } else {
                    allReporting.value[index].push(report);
                }
                if (!allReporting.value[index].length)
                    delete allReporting.value[index];
                hasReports.value = true;
            }
        } catch (e) {
            console.log('getAllReporting error', e);
        }
    }
    loading.value = false;
};

const renameObject = function (obj, index) {
    let tempProperty;
    switch (index) {
        case 5:
            tempProperty = obj.participants_data;
            delete obj.participants_data;
            obj.information = tempProperty;
            break;
        case 13:
            tempProperty = obj.organization_data;
            delete obj.organization_data;
            obj.information = tempProperty;
            break;
        case 14:
            tempProperty = obj.q14_labor_projects;
            delete obj.q14_labor_projects;
            obj.information = tempProperty;
            break;
        case 15:
            tempProperty = obj.grants_data;
            delete obj.grants_data;
            obj.information = tempProperty;
            break;
        case 17:
            tempProperty = obj.source_data;
            delete obj.source_data;
            obj.information = tempProperty;
            break;
        default:
            break;
    }

    return obj;
}

const lengthAllReporting = computed(() => {
    let sum = 0;
    for (let index = 2; index <= 20; index++) {
        if (allReporting.value[index]) {
            sum += allReporting.value[index].length;
        }
    }
    return sum;
});

watch(selectedReportingList, (selectedReportingList) => {
    isCheckedAll.value =
        selectedReportingList.length == lengthAllReporting.value;
});

onMounted(async () => {
    await getAllCompetition();
    await getMeCommander();
    await getAllReporting();
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
    margin-bottom: 40px;
    grid-template-columns: 48px 224px;
    justify-content: space-between;
    // width: 224px;
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

.competition__item {
    display: grid;
    width: 100%;
    gap: 12px;
}

.competition__content {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(200px, 300px) minmax(200px, 300px) 1fr 100px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;

    input {
        width: 100%;
        height: 100%;
    }
}
</style>
