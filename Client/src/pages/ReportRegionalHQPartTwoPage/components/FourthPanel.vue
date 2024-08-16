<template>
    <div v-if="false" class="form__field-group">
        <div v-for="(event, index) in events" :key="index">
            <EventForm
                :event="event"
                :index="index"
                @delete-event="deleteEvent"
                @add-link="addLink"
                @delete-link="deleteLink"
                @focus-out="focusOut"
            />
        </div>

        <div>
            <Button
                style="margin: 0"
                label="+ Добавить мероприятие"
                @click="addEvent"
            />
        </div>
        <div>
            <InputReport
                label="Комментарий"
                :required="true"
                v-model:value="fourthPanelData.comment"
                id="comment"
                name="comment"
                class="form__input"
                type="textarea"
                placeholder="Укажите наименования организованных мероприятий"
                style="width: 100%"
                @focusout="focusOut"
            />
        </div>
        <div>
            <v-checkbox label="Итоговое значение" />
        </div>
        <div class="hr"></div>
        <div>
            <p>0</p>
        </div>
    </div>
    <v-card v-else class="panel-card">
        <v-tabs v-model="tab">
            <v-tab value="one" class="panel-tab-btn">Отчет РО</v-tab>
            <v-tab value="two" class="panel-tab-btn">Корректировка ОШ</v-tab>
            <v-tab value="three" class="panel-tab-btn">Корректировка ЦШ</v-tab>
        </v-tabs>

        <v-card-text class="panel-card-text">
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <div
                        v-for="(event, index) in events"
                        :key="index"
                        class="events-container"
                    >
                        <EventForm
                            :event="event"
                            :index="index"
                            @delete-event="deleteEvent"
                            @add-link="addLink"
                            @delete-link="deleteLink"
                            @focus-out="focusOut"
                        />
                    </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                    <div
                        v-for="(event, index) in events"
                        :key="index"
                        class="events-container"
                    >
                        <AdjustmentForm
                            :event="event"
                            :index="index"
                            @delete-event="deleteEvent"
                            @add-link="addLink"
                            @delete-link="deleteLink"
                            @focus-out="focusOut"
                        />
                    </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="three">
                    <ReportTable />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from '@services/ReportService.ts';
import { AdjustmentForm, EventForm, ReportTable } from '@entities/Report';

const tab = ref('one');
const isFirstSent = ref(true);
const fourthPanelData = ref({
    comment: '',
    events: [],
});
const events = ref([
    {
        participants_number: '',
        start_date: null,
        end_date: null,
        links: [
            {
                link: '',
            },
        ],
        is_interregional: false,
    },
]);
const addLink = (index) => {
    events.value[index].links.push({ link: '' });
};
const deleteLink = async (eventIndex, linkIndex) => {
    events.value[eventIndex].links.splice(linkIndex, 1);
    fourthPanelData.value.events = [...events.value];
    await reportPartTwoService.createReportDraft(fourthPanelData.value, '4');
};
const addEvent = () => {
    events.value.push({
        participants_number: '',
        start_date: null,
        end_date: null,
        links: [
            {
                link: '',
            },
        ],
        is_interregional: false,
    });
};
const focusOut = async () => {
    fourthPanelData.value.events = [...events.value];
    try {
        if (isFirstSent.value) {
            await reportPartTwoService.createReport(fourthPanelData.value, '4');
        } else {
            await reportPartTwoService.createReportDraft(
                fourthPanelData.value,
                '4',
            );
        }
    } catch (e) {
        console.log('focusOut error:', e);
    }
};
const deleteEvent = async (index) => {
    events.value = events.value.filter((el, i) => index !== i);
    fourthPanelData.value.events = [...events.value];
    try {
        await reportPartTwoService.createReportDraft(
            fourthPanelData.value,
            '4',
        );
    } catch (e) {
        console.log('deleteEvent error: ', e);
    }
};
watchEffect(async () => {
    try {
        const { data } = await reportPartTwoService.getReport('4');
        if (data.length) {
            isFirstSent.value = false;
            for (let item of data) {
                if (item.regional_headquarter === 1) {
                    events.value = item.events;
                    fourthPanelData.value.comment = item.comment;
                }
            }
            // events.value = [...data[0].events];
            // fourthPanelData.value.comment = data[0].comment;
        }
    } catch (e) {
        console.log(e);
    }
});
</script>
<style lang="scss" scoped>
.panel-card {
    box-shadow: none;
}

.events-container {
    background-color: rgb(243, 244, 245);
    padding: 20px;
}

.v-tab-item--selected {
    background: #f3f4f5;
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
.hr {
    width: 100%;
    border-top: 1px solid #b6b6b6;
}
.v-table {
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
}
.report-table {
    &__tr {
        background-color: #ffffff;
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
            border-right: 1px solid #b6b6b6;
        }

        &__br-right {
            border-radius: 0 10px 0 0;
            border-left: 1px solid #b6b6b6;
        }
    }
    &__td {
        text-align: center;
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        color: #8e8e93;

        &__center {
            border-left: 1px solid #b6b6b6;
            border-right: 1px solid #b6b6b6;
        }
    }
}
</style>
