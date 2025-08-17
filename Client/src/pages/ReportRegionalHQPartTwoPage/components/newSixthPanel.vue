<template>
    <v-card class="panel-card">
        <v-expansion-panels v-model="panel" class="mb-2">
            <v-progress-circular v-show="!items.length" class="circleLoader" indeterminate></v-progress-circular>
            <v-expansion-panel :disabled="disabled">
                <div class="form__field-group">
                    <select-search-indicator :events="items" v-model="selectedEvent" class="select" />
                </div>
                <div v-if="selectedEvents.length">
                    <div v-for="event in selectedEvents" :key="event.id" class="form__field-event">
                        <event-form :event="event" @collapse-form="collapsed()" @delete-event="eventDelete" />
                    </div>
                </div>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script setup>
import { ref, watch } from "vue";

import SelectSearchIndicator from '@shared/components/selects/SelectSearchIndicator.vue'
import EventForm from "./EventForm.vue";
// import SeventhPanelForm from "./SeventhPanelForm.vue";

const props = defineProps({
    districtHeadquarterCommander: {
        type: Boolean
    },
    centralHeadquarterCommander: {
        type: Boolean
    },
    isErrorPanel: Object,
    items: Array,
    data: Object,
    tab: String,
    revisionPanels: Array,
    dataDH: Object,
});

const disabled = ref(false);
const selectedEvent = ref({});
const selectedEvents = ref([]);

const panel = ref(false);

const collapsed = () => {
    panel.value = false;
}

const eventDelete = (id) => {
    const index = selectedEvents.value.findIndex(item => item.id === id);

    if (index !== -1) {
        selectedEvents.value.splice(index, 1);
    }
}

watch(() => selectedEvent.value, () => {
    const arledyHasEvent = (array, id) => array.some(obj => obj.id === id);

    if (!arledyHasEvent(selectedEvents.value, selectedEvent.value.id)) {
        selectedEvents.value.unshift(selectedEvent.value);
    }
})
</script>

<style lang="scss" scoped>
.select {
    width: 340px;
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

.form__field-group {
    background: #F3F4F5;
    border: none;
    border-radius: 6px;
    margin-bottom: 0px;
    margin-top: 0px;
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
</style>