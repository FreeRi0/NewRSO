<template>
    <v-expansion-panels v-model="panel" accordion class="field">
        <v-expansion-panel :value="0">
            <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                    <div v-if="!expanded">
                        <div class="d-flex justify-space-between">
                            <div class="title_wrap">
                                <p class="form__title color-b">{{ props.event.name }}</p>
                                <div class="title_wrap__items">
                                    <p class="form__title color-b month">{{ props.event.month }}</p>
                                    <p class="form__title color-b city">{{ props.event.city }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="d-flex justify-space-between">
                            <div class="title_wrap">
                                <p class="form__title">{{ props.event.name }}</p>
                                <div class="title_wrap__items">
                                    <p class="form__title month">{{ props.event.month }}</p>
                                    <p class="form__title city">{{ props.event.city }}</p>
                                </div>
                            </div>
                            <div>
                                <Button @click="panel = null" class="form__btn" style="margin: 0" label="Свернуть" />
                            </div>
                        </div>
                    </div>
                </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="bg_form">
                    <div class="top_line">
                        <div class="form__field places">
                            <p class="form__label" v-if="isFirstPart">
                                Количество человек, принимавших участие в мероприятии <sup class="valid-red">*</sup>
                            </p>
                            <p class="form__label" v-else-if="!isFirstPart">
                                Количество человек, принимавших участие в трудовом проекте в составе ЛСО <sup
                                    class="valid-red">*</sup>
                            </p>
                            <InputReport @focusout="focusOut" v-model:value="eventData.number_of_members"
                                :disabled="isSentSix" :is-error-panel="isErrorPanel" :is-link="false"
                                placeholder="Введите число" id="15" name="14" class="form__input number_input"
                                type="number" :max="32767" />
                        </div>
                        <p class="delete-event" @click="deleteEvent">
                            — Удалить мероприятие
                        </p>
                    </div>

                    <div class="checkbox_field" v-if="!isFirstPart">
                        <!-- <div class="checkbox_title">
                            <input class="checkbox" type="checkbox" v-model="eventData.is_hq_member" />
                            <p class="form__label checkbox_label">
                                Члены РО являлись членами Штаба всероссийского трудового проекта
                            </p>
                        </div> -->
                        <div>
                            <p class="form__label">
                                Количество человек, являвшихся членами Штаба трудового проекта
                            </p>
                            <InputReport @focusout="focusOut" v-model:value="eventData.hq_members_count"
                                :disabled="isSentSix || !eventData.is_hq_member" :is-error-panel="isErrorPanel"
                                :is-link="false" placeholder="Введите число" id="hq_members_count"
                                name="hq_members_count" class="form__input" type="number" :max="2147483647"
                                width="100%" />
                        </div>
                    </div>

                    <div class="form__field">
                        <label class="form__label" for="14">Ссылка на социальные сети/ электронные<br>
                            СМИ, подтверждающая участие в мероприятии
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in eventData.links" :key="index">
                            <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                @focusout="focusOut" :is-error-panel="isErrorPanel" @error="setError"
                                :disabled="isSentSix || (eventData.number_of_members == 0 || eventData.number_of_members === null)"
                                :maxlength="200" name="link" v-model:value="item.link" :is-link="true" />

                            <div v-if="!isSentSix && eventData.number_of_members > 0">
                                <div class="add_link" @click="addLink(6)" v-if="eventData.links.length === index + 1">
                                    + Добавить ссылку
                                </div>
                                <div class="add_link" @click="deleteLink(6)" v-else>
                                    Удалить поле ввода
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий </label>
                        <TextareaReport v-model:value="eventData.comment" id="comment" name="comment" :rows="1"
                            autoResize placeholder="Напишите сообщение" @focusout="focusOut" :maxlength="3000"
                            :disabled="isSentSix || (eventData.number_of_members == 0 || eventData.number_of_members === null)"
                            :max-length-text="3000" counter-visible />

                    </div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>
import { ref, defineProps, watchEffect, computed, watch } from 'vue';

import { InputReport, TextareaReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from '@services/ReportService.ts';

const props = defineProps({
    event: {
        type: Object,
        required: true
    },
    isSentSix: {
        type: Boolean,
        default: false,
    },
    isErrorPanel: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    tab: {
        type: String,
        default: '',
    },
})

console.log(props.data)
console.log(props.event)

const eventData = ref({
    number_of_members: 0,
    links: [{ link: '' }],
    comment: '',
    is_hq_member: false,
    hq_members_count: null,
})

const isFirstPart = computed(() => {
    return props.event.id <=56;
})

const emit = defineEmits(['collapse-form', 'delete-event', 'formData', 'formDataDH', 'formDataCH', 'uploadFile', 'getId', 'getPanelNumber', 'deleteFile', 'deleteFileDH', 'error']);

const panel = ref(0);

const togglePanel = () => {
    panel.value = panel.value === 0 ? null : 0;
};

const deleteEvent = () => {
    emit('delete-event', props.event.id);
}

const setError = (err) => {
    emit('error', err);
}

const focusOut = async () => {
    emit('formData', {
        number_of_members: eventData.value.number_of_members,
        links: eventData.value.links,
        comment: eventData.value.comment,
        is_hq_member: eventData.value.is_hq_member,
        hq_members_count: eventData.value.is_hq_member ? eventData.value.hq_members_count : null,
    });
}

const addLink = () => {
    eventData.value.links.push({ link: '' });
}

const deleteLink = async () => {
    eventData.value.links.pop();
    try {
        await reportPartTwoService.createMultipleReportDraft({
            number_of_members: eventData.value.number_of_members,
            links: eventData.value.links,
            comment: eventData.value.comment,
            is_hq_member: eventData.value.is_hq_member,
            hq_members_count: eventData.value.is_hq_member ? eventData.value.hq_members_count : null,
        }, '6', props.event.id);
    } catch (e) {
        console.log('six draft deleteLink error', e);
    }
}

watchEffect(() => {
    if (props.data && Object.keys(props.data).length) {
        eventData.value.number_of_members = props.data.number_of_members ?? 0;
        eventData.value.links = Array.isArray(props.data.links) && props.data.links.length ? props.data.links : [{ link: '' }];
        eventData.value.comment = props.data.comment ?? '';
        eventData.value.is_hq_member = props.data.is_hq_member ?? false;
        eventData.value.hq_members_count = props.data.hq_members_count ?? null;
    }
});

// expose convenience bindings for template to match existing usage
const isSentSix = computed(() => props.isSentSix);
const isErrorPanel = computed(() => props.isErrorPanel);

// Save and emit immediately on checkbox toggle
watch(() => eventData.value.is_hq_member, async (newVal) => {
    if (!newVal) {
        eventData.value.hq_members_count = null;
    }
    const payload = {
        number_of_members: eventData.value.number_of_members,
        links: eventData.value.links,
        comment: eventData.value.comment,
        is_hq_member: eventData.value.is_hq_member,
        hq_members_count: eventData.value.is_hq_member ? eventData.value.hq_members_count : null,
    };
    emit('formData', payload);
});

</script>

<style lang="scss" scoped>
.bg_form {
    background: #F3F4F5;
}

.v-expansion-panel {
    --v-hover-opacity: 0 !important;
}

.v-expansion-panel:hover {
    box-shadow: none !important;
}

.color-b {
    color: #000000 !important;
}

.v-expansion-panel-title {
    border-left: 0px !important;
    border-right: 0px !important;
    margin-bottom: 0px !important;
    border-radius: 0px !important;
    padding: 0px !important
}

.delete-event {
    margin-top: 16px;
    color: #FF8A00;
    cursor: pointer;
}

.top_line {
    display: flex;
    justify-content: space-between;
}

.form-input {
    width: 100%;
}

.field {
    padding: 40px;
    background: #F3F4F5;
    border: none;
    border-radius: 6px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.checkbox_field {
    margin-bottom: 32px;
}

.checkbox {
    width: 20px;
    height: 20px;
}

.checkbox_title {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
}

.checkbox_label {
    margin-left: 16px;
    margin-bottom: 0px;
}

.number_input {
    width: 340px !important;
}

.add_link {
    color: #1f7cc0;
    cursor: pointer;
    font-family: Bert Sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 21.1px;
}

.result-checkbox {
    color: #39BF39;
    margin-right: 12px;
}

.result-checkbox-text {
    font-family: 'Bert sans';
    font-weight: 700;
}

.result-count {
    color: #6D6D6D;
}

.hr {
    margin-bottom: 16px;
    width: 100%;
    border-top: 1px solid #B6B6B6;

    @media (max-width: 568px) {
        width: 340px;
        margin: 0 auto 16px;
    }

    @media (max-width: 400px) {
        width: 296px;
    }
}

input[type='radio']:disabled {
    background-color: #1f7cc0;
    border: 2px solid #000000; // Add border to the input element
    border-radius: 50%; // Make the border round
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

.valid-red {
    color: #DB0000;
}

.month {
    width: 100%;
    max-width: 70px;

}

.one_place {
    column-gap: 8px !important;
}


.city {
    width: 100%;
    max-width: 200px;
}


.places {
    margin-bottom: 32px;
    margin-top: 16px;

    &_wrap {
        display: flex;
        align-items: center;
        column-gap: 40px;
        margin-top: 2px;
    }

    &_input {
        width: 20px;
        height: 20px;
    }

    &_item {
        display: flex;
        align-items: center;
        column-gap: 8px;
        height: 24px;

        &_label {
            font-size: 16px;
            font-weight: 600;
            font-family: Bert Sans;
            line-height: 24px;
            color: #000000;
        }
    }
}

.group-seventh {
    margin-top: 8px;
}

.form_field {
    margin-bottom: 0px;
}

.form__field-result {
    width: 100%;

    @media (max-width: 568px) {
        margin: 0 auto;
        width: 340px;
    }

    @media (max-width: 400px) {
        width: 300px;
    }
}

.form {
    &__title {
        font-family: Akrobat;
        font-size: 18px;
        font-weight: 600;
        line-height: 21.6px;
        color: #1f7cc0;
    }

    &__btn {
        background-color: #d2e4f2;
        width: 85px;
        height: 33px;
        border: none;
        font-size: 16px;
        font-weight: 400;
        font-family: Akrobat;
        line-height: 21.1px;
        text-align: center;
        padding: 4px 11px;
        color: #1f7cc0;
        border-radius: 6px;
    }

    &__wrapper {
        display: flex;
        column-gap: 40px;
        align-items: center;
        max-width: 901px;

        @media screen and (max-width: 1024px) {
            flex-wrap: wrap;
            max-width: 100%;
            width: 100%;
            margin-bottom: 8px;
        }
    }

    .statement-item {
        display: flex;
        justify-content: center;
        margin: 0px auto;
    }
}
</style>