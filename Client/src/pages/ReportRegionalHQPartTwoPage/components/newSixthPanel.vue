<template>
    <v-card class="panel-card">
        <v-expansion-panels v-model="panel" class="mb-2">
            <v-progress-circular v-show="!items.length" class="circleLoader" indeterminate></v-progress-circular>
            <v-expansion-panel :disabled="disabled">
                <div
                    v-if="!(props.centralExpert || props.districtExpert || JSON.stringify(reportStore.isReportReject?.six) !== '{}' && reportStore.isReportReject?.six || reportStore.isAllReportsVerifiedByCH) || (props.tab === 'Просмотр отправленного отчета' && JSON.stringify(reportStore.isReportReject?.six) !== '{}' && reportStore.isReportReject?.six)">
                    <div class="form__field-group-six">
                        <select-search-indicator :events="items" v-model="filteredEvents" class="select" />
                    </div>
                    <div v-if="selectedEvents.length">
                        <div v-for="event in selectedEvents" :key="event.id" class="form__field-event">
                            <event-form :event="event"
                                :is-sent-six="!!(props.data && props.data[event.id] && props.data[event.id].is_sent)"
                                :is-error-panel="!!(props.isErrorPanel && props.isErrorPanel[event.id] && props.isErrorPanel[event.id].error)"
                                :data="(props.data && props.data[event.id]) ? props.data[event.id] : {}"
                                :tab="props.tab" @collapse-form="collapsed()" @delete-event="eventDelete"
                                @formData="formData($event, event.id)" @formDataDH="formDataDH($event, event.id)"
                                @formDataCH="formDataCH($event, event.id)" @error="setError($event, event.id)" />
                        </div>
                    </div>
                </div>

                <report-tabs v-else :isReject="reportStore.isReportReject.six && props.tab === 'Доработка'">
                    <!-- <report-tabs v-if="true" :isReject="true"> -->
                    <template v-slot:firstTab>
                        <div class="form__field-group-six">
                            <select-search-indicator :events="items" v-model="selectedEvent" class="select" />
                        </div>
                        <div v-if="selectedEvents.length">
                            <div v-for="event in selectedEvents" :key="event.id" class="form__field-event">
                                <event-form :event="event"
                                    :is-sent-six="!!(props.data && props.data[event.id] && props.data[event.id].is_sent)"
                                    :is-d-h="districtExpert" :is-c-h="centralExpert"
                                    :is-error-panel="!!(props.isErrorPanel && props.isErrorPanel[event.id] && props.isErrorPanel[event.id].error)"
                                    :data="(props.data && props.data[event.id]) ? props.data[event.id] : {}"
                                    :correction-tab="1" :tab="props.tab" @collapse-form="collapsed()"
                                    @delete-event="eventDelete" @formData="formData($event, event.id)"
                                    @formDataDH="formDataDH($event, event.id)"
                                    @formDataCH="formDataCH($event, event.id)" @error="setError($event, event.id)" />
                            </div>
                        </div>
                    </template>

                    <template v-slot:secondTab>
                        <div class="form__field-group-six">
                            <select-search-indicator :events="items" v-model="filteredEvents" class="select" />
                        </div>
                        <div v-if="selectedEvents.length">
                            <div v-for="event in selectedEvents" :key="event.id" class="form__field-event">
                                <event-form :event="event" :is-d-h="districtExpert" :is-c-h="centralExpert"
                                    :is-sent-six="!!(props.data && props.data[event.id] && props.data[event.id].is_sent)"
                                    :is-error-panel="!!(props.isErrorPanel && props.isErrorPanel[event.id] && props.isErrorPanel[event.id].error)"
                                    :data="(props.data && reportStore.reportDataDH.six[event.id]) ? reportStore.reportDataDH.six[event.id] : {}"
                                    :correction-tab="2" :tab="props.tab" @collapse-form="collapsed()"
                                    @delete-event="eventDelete" @formData="formData($event, event.id)"
                                    @formDataDH="formDataDH($event, event.id)"
                                    @formDataCH="formDataCH($event, event.id)" @error="setError($event, event.id)" />
                            </div>
                        </div>
                    </template>

                    <template v-slot:thirdTab>
                        <div v-if="selectedEvents.length">
                            <div v-for="event in selectedEvents" :key="event.id" class="form__field-event">
                                <event-form :event="event"
                                    :is-sent-six="!!(props.data && props.data[event.id] && props.data[event.id].is_sent)"
                                    :is-error-panel="!!(props.isErrorPanel && props.isErrorPanel[event.id] && props.isErrorPanel[event.id].error)"
                                    :data="(props.data && props.data[event.id]) ? props.data[event.id] : {}"
                                    :correction-tab="3" :tab="props.tab" @collapse-form="collapsed()"
                                    :is-c-h="centralExpert" :is-d-h="districtExpert" @delete-event="eventDelete"
                                    @formData="formData($event, event.id)" @formDataDH="formDataDH($event, event.id)"
                                    @formDataCH="formDataCH($event, event.id)" @error="setError($event, event.id)" />
                            </div>
                        </div>
                    </template>
                </report-tabs>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script setup>
import { ref, watch, watchEffect, computed } from "vue";

import SelectSearchIndicator from '@shared/components/selects/SelectSearchIndicator.vue'
import EventForm from "./EventForm.vue";
import { ReportTabs } from './index';
// import SeventhPanelForm from "./SeventhPanelForm.vue";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";
import { reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
    districtHeadquarterCommander: {
        type: Boolean
    },
    centralHeadquarterCommander: {
        type: Boolean
    },
    districtExpert: {
        type: Boolean
    },
    centralExpert: {
        type: Boolean
    },
    isErrorPanel: Object,
    items: Array,
    data: Object,
    tab: String,
    revisionPanels: Array,
    dataDH: Object,
});

console.log(props)

const filteredEvents = computed(() => {
    const deletedNames = [
        "Всероссийские трудовые проекты СПО РСО",
        "Всероссийские трудовые проекты ВСОП",
        "Всероссийские трудовые проекты ССхО РСО",
        "Всероссийские студенческие стройки РСО",
        "Всероссийские трудовые проекты СМО РСО",
        "Всероссийские трудовые проекты ССервО РСО",
        "Всероссийские трудовые проекты отрядов подростков",
        "Всероссийские трудовые проекты жд транспорта",
        "Всероссийский форум студенческих педагогических отрядов"
    ]

    return props.items.filter((item) => !deletedNames.includes(item.name))
})

const disabled = ref(false);
const selectedEvent = ref({});
const selectedEvents = ref([]);

const panel = ref(false);

const emit = defineEmits(['getData', 'getDataDH', 'getDataCH', 'getId', 'getPanelNumber']);

const reportStore = useReportPartTwoStore();
const linkErrById = ref({});
const isFirstSentById = ref({});
const commonData = ref([]);
const commentCH = ref();
const reportVerifiedByCH = ref(false);
const sixPanelDataDH = ref({});
const events = ref([]);
const sixPanelData = ref({});

const collapsed = () => {
    panel.value = false;
}

const eventDelete = async (id) => {
    const index = selectedEvents.value.findIndex(item => item.id === id);

    if (index !== -1) {
        selectedEvents.value.splice(index, 1);
    }

    try {
        // Overwrite data on server with zeroed draft to emulate deletion
        const payload = {
            number_of_members: 0,
            links: [],
            comment: '',
            is_hq_member: false,
            hq_members_count: null,
        };
        const { data } = await reportPartTwoService.createMultipleReportDraft(payload, '6', String(id));
        emit('getData', data, 6, id);
        // Clear local flags so the event isn't re-added or blocked by stale state
        delete isFirstSentById.value[id];
        delete linkErrById.value[id];
    } catch (e) {
        console.log('delete event (reset) error: ', e);
    }
}

watch(() => selectedEvent.value, () => {
    const arledyHasEvent = (array, id) => array.some(obj => obj.id === id);

    if (!selectedEvent.value || !selectedEvent.value.id) return;
    if (!arledyHasEvent(selectedEvents.value, selectedEvent.value.id)) {
        selectedEvents.value.unshift(selectedEvent.value);
    }
    // reset current selection to avoid accidental re-adds
    selectedEvent.value = {};
})

// Sync first-send flags per event id from incoming data/store
watchEffect(() => {
    selectedEvents.value.forEach((ev) => {
        const id = ev.id;
        const hasData = props.data && props.data[id] && Object.keys(props.data[id]).length > 0;
        if (hasData) {
            // If rejected and no central version, allow re-send as first
            const isRejected = reportStore.isReportReject?.six?.[id];
            const hasCentralVersion = !!props.data[id].central_version;
            isFirstSentById.value[id] = isRejected && !hasCentralVersion;
        } else {
            isFirstSentById.value[id] = true;
        }
    });
});

// Auto-select only once on initial load to avoid re-adding after user deletion
const didAutoselect = ref(false);
watchEffect(() => {
    if (didAutoselect.value) return;
    if (Array.isArray(props.items) && props.data) {
        const existingIds = new Set(selectedEvents.value.map(e => e.id));
        props.items.forEach(ev => {
            const id = ev.id;
            const d = props.data[id];
            const hasData = d && Object.keys(d).length > 0 && (d.number_of_members > 0);
            if (hasData && !existingIds.has(id)) {
                selectedEvents.value.push(ev);
                existingIds.add(id);
            }
        });
        didAutoselect.value = true;
    }
});

// Forward id and panel number to parent for each selected event (once)
watch(selectedEvents, (list) => {
    list.forEach((ev) => {
        emit('getId', ev.id);
        emit('getPanelNumber', 6);
    });
}, { deep: true });

const setError = (err, id) => {
    linkErrById.value[id] = err;
}

const formData = async (reportData, reportNumber) => {
    console.log('reportData', reportData);
    try {
        if (!(props.districtHeadquarterCommander || props.centralHeadquarterCommander)) {
            if (!linkErrById.value[reportNumber]) {
                if (isFirstSentById.value[reportNumber]) {
                    if (reportData.number_of_members > 0 || props.tab == 'Доработка') {
                        const { data } = await reportPartTwoService.createMultipleReport(reportData, '6', reportNumber);
                        emit('getData', data, 6, reportNumber);
                        isFirstSentById.value[reportNumber] = false;
                    }
                } else {
                    const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '6', reportNumber);
                    emit('getData', data, 6, reportNumber);
                }
            }
        }
    } catch (e) {
        console.log('six panel error: ', e);
    }
};

const formDataDH = async (reportData, reportNumber) => {
    if (props.districtExpert) {
        let formData = new FormData();
        
        formData.append('comment', reportData.comment || '');
        formData.append('number_of_members', reportData.number_of_members || '');
        if(reportData.hq_members_count) formData.append('hq_members_count', reportData.hq_members_count || '');

        emit('getDataDH', formData, 6, reportNumber);
    }
};

const formDataCH = (reportData, reportNumber) => {
    if (props.centralExpert) {
        let formData = new FormData();

        formData.append('comment', reportData.comment || '');
        formData.append('number_of_members', reportData.number_of_members || '');
        if(reportData.hq_members_count) formData.append('hq_members_count', reportData.hq_members_count || '');
        // if (reportStore.returnReport.six[reportNumber]) formData.append('reasons[comment]', reportData.comment);

        emit('getDataCH', reportData, 6, reportNumber);
    }
};

// const onReportReturn = (event) => {
//     let formData = new FormData();
//     if (event.target.checked) {
//         reportStore.returnReport.fourth = true;
//         reportStore.reportDataCH.fourth.events = [];
//         commonData.value.forEach(e => {
//             reportStore.reportDataCH.fourth.events.push(e.dataCH)
//         });

//         reportStore.reportDataCH.fourth.comment = commentCH.value || '';
//         formData.append('comment', commentCH.value || '');
//         formData.append('reasons[comment]', commentCH.value);

//         reportStore.reportDataCH.fourth.events.forEach((event, i) => {
//             if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
//             if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
//             if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
//             formData.append(`events[${i}][is_interregional]`, event.is_interregional);
//         });

//         emit('getDataCH', formData, 4);
//     } else {
//         reportStore.returnReport.fourth = false;
//         reportStore.reportDataCH.fourth.events = [];
//         commonData.value.forEach(e => {
//             reportStore.reportDataCH.fourth.events.push(e.dataCH)
//         });

//         reportStore.reportDataCH.fourth.comment = commentCH.value || '';
//         formData.append('comment', commentCH.value || '');

//         reportStore.reportDataCH.fourth.events.forEach((event, i) => {
//             if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
//             if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
//             if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
//             formData.append(`events[${i}][is_interregional]`, event.is_interregional);
//         });

//         emit('getDataCH', formData, 4);
//     }
// }

// onMounted(() => {
//     reportVerifiedByCH.value = reportStore.reportForCheckCH.six?.verified_by_chq !== null;

//     /*
//     * Мапинг данных для отчета эксперта ОШ
//     */
//     if (reportStore.reportDataDH.fourth && props.districtExpert) {
//         sixPanelDataDH.value.events = [...reportStore.reportDataDH.fourth.events];
//         sixPanelDataDH.value.comment = reportStore.reportDataDH.fourth.comment;
//     }

//     /*
//     * Мапинг данных для отчета эксперта ЦШ
//     */
//     if (reportStore.reportForCheckCH.fourth && props.centralExpert) {
//         const eventQuantity = reportStore.reportForCheckCH.fourth.events.length;

//         if (reportStore.reportForCheckCH.fourth.rejecting_reasons) {
//             // Повторная доработка
//             // Добавление данных панели "отчет РО"
//             events.value = reportStore.reportForCheckCH.fourth.events;
//             sixPanelData.value.comment = reportStore.reportForCheckCH.fourth.comment || '';

//             // Рефакторинг - добавлен код ниже, т.к. на вкл РО отображались данные ЦШ
//             if (reportStore.reportForCheckCH.fourth.regional_version) {
//                 const reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
//                 events.value = reportDataRH.events;
//                 sixPanelData.value.comment = reportDataRH.comment || '';
//             }

//             // Добавление данных панели "корректировка ОШ"
//             const reportDataDH = JSON.parse(reportStore.reportForCheckCH.fourth.district_version);
//             sixPanelDataDH.value.events = reportDataDH.events;
//             sixPanelDataDH.value.comment = reportDataDH.comment;

//             // Добавление данных из стора для панели "корректировка ЦШ"
//             let reportDataCH;
//             // Проверка на верификацию отчета ЦШ. При верифицированом отчете данные берутся из общего объекта
//             if (reportVerifiedByCH.value) {
//                 console.log('reportStore.reportForCheckCH.fourth', reportStore.reportForCheckCH.fourth)
//                 reportDataCH = reportStore.reportForCheckCH.fourth
//             } else {
//                 console.log('reportStore.reportForCheckCH.fourth2', reportStore.reportForCheckCH.fourth)
//                 reportDataCH = reportStore.reportForCheckCH.fourth.central_version;
//             }
//             commentCH.value = reportDataCH.comment || '';
//             // Проверяем наличие версии РО
//             let reportDataRH;
//             if (reportStore.reportForCheckCH.fourth.regional_version) {
//                 reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
//             } else {
//                 reportDataRH = reportStore.reportForCheckCH.fourth;
//             }

//             for (let i = 0; i < eventQuantity; i++) {
//                 commonData.value[i] = {
//                     dataRH: reportDataRH.events[i],
//                     dataDH: reportDataDH.events[i],
//                     dataCH: reportDataCH.events[i],
//                 }
//             }

//         } else {
//             // Добавление данных панели "отчет РО"
//             const reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
//             events.value = reportDataRH.events;
//             sixPanelData.value.comment = reportDataRH.comment || '';

//             // Добавление данных панели "корректировка ОШ"
//             sixPanelDataDH.value.events = reportStore.reportForCheckCH.fourth.events;
//             sixPanelDataDH.value.comment = reportStore.reportForCheckCH.fourth.comment;

//             console.log('reportStore.reportData', reportStore.reportDataCH)
//             // Добавление данных из стора для панели "корректировка ЦШ"
//             commentCH.value = reportStore.reportDataCH.fourth.comment || '';
//             for (let i = 0; i < eventQuantity; i++) {
//                 commonData.value[i] = {
//                     dataRH: reportDataRH.events[i],
//                     dataDH: reportStore.reportForCheckCH.fourth.events[i],
//                     dataCH: reportStore.reportDataCH.fourth.events[i],
//                     //     ? reportStore.reportDataCH.fourth.events[i] : {
//                     //   participants_number: '',
//                     //   start_date: null,
//                     //   end_date: null,
//                     // }
//                 }
//             }
//         }
//     }
// })

// watch(() => [commonData.value, commentCH], () => {
//     let formData = new FormData();

//     reportStore.reportDataCH.six.events = [];
//     commonData.value.forEach(e => {
//         reportStore.reportDataCH.six.events.push(e.dataCH)
//     });

//     reportStore.reportDataCH.six.comment = commentCH.value || '';
//     formData.append('comment', commentCH.value || '');
//     if (reportStore.returnReport.six) formData.append('reasons[comment]', commentCH.value || '');

//     reportStore.reportDataCH.six.events.forEach((event, i) => {
//         if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
//         if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
//         if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
//         formData.append(`events[${i}][is_interregional]`, event.is_interregional);
//     });

//     emit('getDataCH', formData, 4);
// }, {
//     deep: true
// });
</script>

<style lang="scss" scoped>
:deep(.form__field-group) {
    background-color: #ffffff;
    padding: 0px;
}

.select {
    width: 340px;
    margin-left: 40px;
}

.panel-card {
    box-shadow: none;
}

.v-expansion-panel-title[aria-expanded="true"] {
    display: none;
}

.panel-tab-btn {
    text-align: right;
    padding-right: 40px;
}

.form__field-group-six {
    background: #F3F4F5;
    border: none;
    border-radius: 6px;
    margin-bottom: 0px;
    margin-top: 0px;
    height: 120px;
    display: flex;
    align-items: center
}

.form__field-event {
    background: #F3F4F5;
    border: none;
    border-radius: 6px;
    margin-bottom: 0px;
    margin-top: 8px;
}

.valid-red {
    color: #db0000;
}

.v-tab-item--selected {
    background: #F3F4F5;
}

.v-tab.v-tab.v-btn {
    min-width: 280px;
    border-radius: 10px 10px 0 0;
    letter-spacing: initial;
    border: none;
}

.panel-card-text {
    padding: 0;
}

.panel-tab-btn {
    text-transform: initial;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.1px;
    text-align: left;
    margin-right: 8px;
}

.month {
    width: 100%;
    max-width: 70px;

}

.city {
    width: 100%;
    max-width: 200px;
}

.title_wrap {
    display: grid;
    grid-template-columns: 600px 300px;
    column-gap: 40px;
    width: 100%;
    max-width: 900px;

    &__items {
        display: flex;
        width: 100%;
        column-gap: 20px;
        max-width: 290px;

        @media screen and (max-width: 578px) {
            flex-direction: column;
        }
    }

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-wrap: wrap;
        row-gap: 6px;
        max-width: 828px;
        width: auto;
    }

    @media screen and (max-width: 768px) {
        max-width: 636px;
    }

    @media screen and (max-width: 578px) {
        max-width: 360px;
    }

}

.hr {
    width: 100%;
    border-top: 1px solid #B6B6B6;
}

.v-table {
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid #B6B6B6;
}

.report-table {
    &__tr {
        background-color: #FFFFFF;
        text-align: center;
    }

    &__th {
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        text-align: center;

        &__br-left {
            border-radius: 10px 0 0 0;
            border-right: 1px solid #B6B6B6;
        }

        &__br-right {
            border-radius: 0 10px 0 0;
            border-left: 1px solid #B6B6B6;
        }
    }

    &__td {
        text-align: center;
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        color: #8E8E93;

        &__center {
            border-left: 1px solid #B6B6B6;
            border-right: 1px solid #B6B6B6;
        }
    }
}

.v-expansion-panel-title {
    background: #F3F4F5;
    margin: 0px;
    border-radius: 0px;
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    text-align: left;
    border-left: 6px solid #F3F4F5;
    padding-left: 40px;
}

.report_table-wide {
    @media (max-width: 568px) {
        display: none;
    }
}

.report_table-narrow {
    display: none;

    @media (max-width: 568px) {
        display: table;
    }
}

.report-table {
    table-layout: fixed;

    &__tr {
        background-color: #FFFFFF;
        text-align: center;
        table-layout: fixed;
    }

    &__th {
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        text-align: center;

        //&__br-left {
        //  border-radius: 10px 0 0 0;
        //  border-right: 1px solid #B6B6B6;
        //}
        //
        //&__br-right {
        //  border-radius: 0 10px 0 0;
        //  border-left: 1px solid #B6B6B6;
        //}

        &__br-center {
            border-left: 1px solid #B6B6B6;
            border-right: 1px solid #B6B6B6;

            @media (max-width: 568px) {
                border-left: 0px solid #B6B6B6;
                border-right: 0px solid #B6B6B6;
            }
        }
    }

    &__td {
        text-align: center;
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        color: #8E8E93;
        padding: 0 10px !important;
        table-layout: fixed;

        &:not(:last-child) {
            background-color: #f9fafb;
        }

        &--bgcolor {
            background-color: #f9fafb;
        }

        &__center {
            border-left: 1px solid #B6B6B6;
            border-right: 1px solid #B6B6B6;

            @media (max-width: 568px) {
                border-left: 0px solid #B6B6B6;
                border-right: 0px solid #B6B6B6;
            }
        }
    }
}

.v-table {
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid #B6B6B6;
}
</style>