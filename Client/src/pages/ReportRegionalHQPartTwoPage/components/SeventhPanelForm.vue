<template>
    <v-card-text class="panel-card-text">
        <v-tabs-window v-if="!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)">
            <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
                <div class="d-flex justify-space-between">
                    <div class="title_wrap">
                        <p class="form__title">{{ props.title.name }}</p>
                        <div class="title_wrap__items">
                            <p class="form__title month" v-if="props.title.month">{{ props.title.month }}</p>
                            <p class="form__title city" v-if="props.title.city">{{ props.title.city }}</p>
                        </div>
                    </div>
                    <div>
                        <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                    </div>
                </div>
                <div class="form__field places mt-4">
                    <p class="form__label">
                        Призовое место в конкурсе <sup class="valid-red">*</sup>
                    </p>

                    <div class="places_wrap">
                        <div class="places_item" v-for="item in prize_places" :key="item.id">
                            <input :id="item.id" :value="item.value" :name="item.name"
                                :checked="seventhPanelData.prize_place == item.value" class="form__input places_input"
                                type="radio" @focusout="focusOut" v-model="seventhPanelData.prize_place" />
                            <label class="places_item_label" :for="id">{{
                                item.name
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="report__fieldset report__fieldset--right-block">
                    <label class="form__label report__label mb-2" for="scan_file">
                        Скан подтверждающего документа<sup class="valid-red">*</sup>
                    </label>
                    <InputReport v-if="!seventhPanelData.document" isFile type="file" accept=".jpg, .jpeg, .png, .pdf"
                        id="scan_file" name="scan_file" width="100%" height="auto" @change="uploadFile"
                        :disabled="isDisabled" />
                    <FileBoxComponent v-else :file="seventhPanelData.document" :fileType="seventhPanelData.file_type"
                        :fileSize="seventhPanelData.file_size" @click="deleteFile"></FileBoxComponent>
                </div>

                <div class="form__field">
                    <label class="form__label mt-4" for="14">Ссылка на публикацию о победе
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in seventhPanelData.links" :key="index">
                        <InputReport @focusout="focusOut" name="14" :is-link="true"
                            placeholder="Введите ссылку, например, https://vk.com/cco_monolit" v-model:value="item.link"
                            class="mb-2" />
                        <div class="add_link" @click="addLink(7)" v-if="seventhPanelData.links.length === index + 1">
                            + Добавить ссылку
                        </div>
                        <div class="add_link" @click="deleteLink(7)" v-else>
                            Удалить поле ввода
                        </div>

                    </div>
                </div>
                <!-- <div class="d-flex gc-4">
                    <div class="form__field">
                        <label class="form__label" for="14">Дата <sup class="valid-red">*</sup></label>
                        <InputReport @focusout="focusOut" v-model:value="seventhPanelData.comment" id="14" name="14"
                            class="form__input" type="date" />
                    </div>
                    <div class="form__field" style="width: 100%">
                        <label class="form__label" for="14">Место проведения<sup class="valid-red">*</sup></label>
                        <InputReport placeholder="Укажите место проведения мероприятия" @focusout="focusOut"
                            v-model:value="seventhPanelData.comment" id="14" name="14" class=""
                            style="max-width: 744px; width: 100%" />
                    </div>
                </div> -->
                <div class="form__field">
                    <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                    <TextareaReport v-model:value="seventhPanelData.comment" id="comment" name="comment" :rows="1"
                        autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                        :max-length-text="3000" counter-visible />
                </div>
                <div>
                    <v-checkbox label="Итоговое значение" />
                </div>
                <div class="hr"></div>
                <div>
                    <p>0</p>
                </div>
            </div>
            <div v-else-if="props.panel_number == 6" class="form__field-group group-seventh">
                <div class="d-flex justify-space-between">
                    <div class="title_wrap">
                        <p class="form__title">{{ props.title.name }}</p>
                        <div class="title_wrap__items">
                            <p class="form__title month">{{ props.title.month }}</p>
                            <p class="form__title city">{{ props.title.city }}</p>
                        </div>
                    </div>
                    <div>
                        <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                    </div>
                </div>
                <div class="form__field places">
                    <p class="form__label">
                        Количество человек, принимавших участие в мероприятии <sup class="valid-red">*</sup>
                    </p>
                    <InputReport @focusout="focusOut" v-model:value="sixPanelData.number_of_members"
                        placeholder="Введите число" id="15" name="14" class="form__input number_input" type="number"
                        :maxlength="10" :max="32767" />
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Ссылка на социальные сети/ электронные<br>
                        СМИ, подтверждающая участие в мероприятии
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in sixPanelData.links" :key="index">
                        <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                            @focusout="focusOut" name="14" v-model:value="item.link" :is-link="true" class="mb-2" />
                        <div class="add_link" @click="addLink(6)" v-if="sixPanelData.links.length === index + 1">
                            + Добавить ссылку
                        </div>
                        <div class="add_link" @click="deleteLink(6)" v-else>
                            Удалить поле ввода
                        </div>

                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Комментарий </label>
                    <TextareaReport v-model:value="sixPanelData.comment" id="comment" name="comment" :rows="1"
                        autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                        :max-length-text="3000" counter-visible />

                </div>
            </div>
        </v-tabs-window>
        <report-tabs v-else>
            <template v-slot:firstTab>
                <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places">
                        <p class="form__label">
                            Призовое место в конкурсе <sup class="valid-red">*</sup>
                        </p>
                        <div class="places_wrap">
                            <div class="places_item" v-for="item in prize_places" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    class="form__input places_input" type="radio"
                                    :checked="seventhPanelData.prize_place == item.value" @focusout="focusOut"
                                    v-model="seventhPanelData.prize_place" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="report__fieldset report__fieldset--right-block">
                        <label class="form__label report__label" for="scan_file">
                            Скан подтверждающего документа<sup class="valid-red">*</sup>
                        </label>
                        <InputReport v-if="!seventhPanelData.document" isFile type="file"
                            accept=".jpg, .jpeg, .png, .pdf" id="scan_file" name="scan_file" width="100%" height="auto"
                            @change="uploadFile" :disabled="isDisabled" />
                        <FileBoxComponent v-else :file="seventhPanelData.document"
                            :fileType="seventhPanelData.file_type" :fileSize="seventhPanelData.file_size"
                            @click="deleteFile"></FileBoxComponent>

                    </div>

                    <div class="form__field">
                        <label class="form__label" for="14">Ссылка на публикацию о победе
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in seventhPanelData.links" :key="index">
                            <InputReport @focusout="focusOut" name="14" :is-link="true"
                                placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                v-model:value="item.link" class="mb-2"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                            <div class="add_link" @click="addLink(7)"
                                v-if="seventhPanelData.links.length === index + 1">
                                + Добавить ссылку
                            </div>
                            <div class="add_link" @click="deleteLink(7)" v-else>
                                Удалить поле ввода
                            </div>

                        </div>
                    </div>
                    <!-- <div class="d-flex gc-4">
                        <div class="form__field">
                            <label class="form__label" for="14">Дата <sup class="valid-red">*</sup></label>
                            <InputReport @focusout="focusOut" v-model:value="seventhPanelData.comment" id="14" name="14"
                                class="form__input" type="date"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                        </div>
                        <div class="form__field" style="width: 100%;">
                            <label class="form__label" for="14">Место проведения<sup class="valid-red">*</sup></label>
                            <InputReport placeholder="Укажите место проведения мероприятия" @focusout="focusOut"
                                v-model:value="seventhPanelData.comment" id="14" name="14" class=""
                                style="max-width: 744px; width: 100%"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                        </div>
                    </div> -->
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                        <InputReport @focusout="focusOut" placeholder="Напишите сообщение"
                            v-model:value="seventhPanelData.comment" id="14" name="14" class="form__input"
                            style="width: 100%"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                    </div>
                    <div>
                        <v-checkbox label="Итоговое значение" />
                    </div>
                    <div class="hr"></div>
                    <div>
                        <p>0</p>
                    </div>
                </div>
                <div v-else-if="props.panel_number == 6" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places">
                        <p class="form__label">
                            Количество человек, принимавших участие в мероприятии <sup class="valid-red">*</sup>
                        </p>
                        <InputReport @focusout="focusOut" v-model:value="sixPanelData.number_of_members"
                            placeholder="Введите число" id="15" name="14" class="form__input number_input" type="number"
                            :maxlength="10" :max="32767"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая участие в мероприятии
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in sixPanelData.links" :key="index">
                            <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                @focusout="focusOut" :is-link="true"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                                name="14" v-model:value="item.link" class="mb-2" />
                            <div class="add_link" @click="addLink(6)" v-if="sixPanelData.links.length === index + 1">
                                + Добавить ссылку
                            </div>
                            <div class="add_link" @click="deleteLink(6)" v-else>
                                Удалить поле ввода
                            </div>

                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <InputReport @focusout="focusOut" v-model:value="sixPanelData.comment"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            placeholder="Напишите сообщение" id="14" name="14" class="form__input"
                            style="width: 100%" />
                    </div>
                </div>
            </template>
            <template v-slot:secondTab>
                <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places">
                        <p class="form__label">
                            Призовое место в конкурсе <sup class="valid-red">*</sup>
                        </p>
                        <div class="places_wrap">
                            <div class="places_item" v-for="item in prize_places" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    class="form__input places_input" type="radio"
                                    :checked="seventhPanelData.prize_place == item.value" @focusout="focusOut"
                                    v-model="seventhPanelData.prize_place" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="report__fieldset report__fieldset--right-block">
                        <label class="form__label report__label" for="scan_file">
                            Скан подтверждающего документа<sup class="valid-red">*</sup>
                        </label>
                        <InputReport v-if="!seventhPanelData.document" isFile type="file"
                            accept=".jpg, .jpeg, .png, .pdf" id="scan_file" name="scan_file" width="100%" height="auto"
                            @change="uploadFile" :disabled="isDisabled" />
                        <FileBoxComponent v-else :file="seventhPanelData.document"
                            :fileType="seventhPanelData.file_type" :fileSize="seventhPanelData.file_size"
                            @click="deleteFile"></FileBoxComponent>
                    </div>
                    <!-- <div class="d-flex gc-4">
                        <div class="form__field">
                            <label class="form__label" for="14">Дата <sup class="valid-red">*</sup></label>
                            <InputReport @focusout="focusOut" v-model:value="seventhPanelData.comment" id="14" name="14"
                                class="form__input" type="date" />
                        </div>
                        <div class="form__field" style="width: 100%">
                            <label class="form__label" for="14">Место проведения<sup class="valid-red">*</sup></label>
                            <InputReport placeholder="Укажите место проведения мероприятия" @focusout="focusOut"
                                v-model:value="seventhPanelData.comment" id="14" name="14" class=""
                                style="max-width: 744px; width: 100%" />
                        </div>
                    </div> -->
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                        <InputReport @focusout="focusOut" placeholder="Напишите сообщение"
                            v-model:value="seventhPanelData.comment" id="14" name="14" class="form__input"
                            style="width: 100%" />
                    </div>
                    <div>
                        <v-checkbox label="Итоговое значение" />
                    </div>
                    <div class="hr"></div>
                    <div>
                        <p>0</p>
                    </div>
                </div>
                <div v-else-if="props.panel_number == 6" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places">
                        <p class="form__label">
                            Количество человек, принимавших участие в мероприятии <sup class="valid-red">*</sup>
                        </p>
                        <InputReport @focusout="focusOut" v-model:value="sixPanelData.number_of_members"
                            placeholder="Введите число" id="15" name="14" class="form__input number_input" type="number"
                            :maxlength="10" :max="32767" />
                    </div>

                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <InputReport @focusout="focusOut" v-model:value="sixPanelData.comment"
                            placeholder="Напишите сообщение" id="14" name="14" class="form__input"
                            style="width: 100%" />
                    </div>
                </div>
            </template>
            <template v-slot:thirdTab>
                <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places">
                        <p class="form__label">
                            Призовое место в конкурсе <sup class="valid-red">*</sup>
                        </p>
                        <v-table>
                            <tbody>
                                <tr class="report-table__tr">
                                    <td class="report-table__th">Данные РО</td>
                                    <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
                                    <td class="report-table__th">Корректировка ЦШ</td>
                                </tr>
                                <tr>
                                    <td class="report-table__td">200</td>
                                    <td class="report-table__td report-table__td__center">200</td>
                                    <td class="report-table__td">200</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <div class="places_wrap">
                            <div class="places_item" v-for="item in prize_places" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    class="form__input places_input" type="radio" @focusout="focusOut"
                                    v-model="seventhPanelData.prize_place" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                        <InputReport @focusout="focusOut" placeholder="Напишите сообщение"
                            v-model:value="seventhPanelData.comment" id="14" name="14" class="form__input"
                            style="width: 100%" />
                    </div>
                    <div>
                        <v-checkbox label="Итоговое значение" />
                    </div>
                    <div class="hr"></div>
                    <div>
                        <p>(4-1)*2+(4-2)+(4-3)=9</p>
                    </div>
                    <div>
                        <v-checkbox label="Вернуть в РО на доработку" />
                    </div>
                </div>
                <div v-else-if="props.panel_number == 6" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                            <div class="title_wrap__items">
                                <p class="form__title month">{{ props.title.month }}</p>
                                <p class="form__title city">{{ props.title.city }}</p>
                            </div>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <label class="form__label">Количество человек, принявших участие в мероприятии <sup
                            class="valid-red">*</sup></label>
                    <v-table>
                        <tbody>
                            <tr class="report-table__tr">
                                <td class="report-table__th">Данные РО</td>
                                <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
                                <td class="report-table__th">Корректировка ЦШ</td>
                            </tr>
                            <tr>
                                <td class="report-table__td">200</td>
                                <td class="report-table__td report-table__td__center">200</td>
                                <td class="report-table__td">200</td>
                            </tr>
                        </tbody>
                    </v-table>

                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <InputReport @focusout="focusOut" v-model:value="sixPanelData.comment"
                            placeholder="Напишите сообщение" id="14" name="14" class="form__input"
                            style="width: 100%" />
                    </div>
                    <div>
                        <v-checkbox label="Вернуть в РО на доработку" />
                    </div>
                </div>
            </template>
        </report-tabs>
    </v-card-text>
</template>
<script setup>
import { ref, watchEffect, watch } from 'vue';
import { Button } from '@shared/components/buttons';
import { FileBoxComponent } from '@entities/RatingRoComponents/components';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { SvgIcon } from '@shared/ui';
import { ReportTabs } from './index';
import { reportPartTwoService } from '@services/ReportService.ts';
const props = defineProps({
    title: Object,
    panel_number: String,
    isDisabled: Boolean,
    isSecondTab: Boolean,
    isThirdTab: Boolean,
    isCentralHeadquarterCommander: Boolean,
    isDistrictHeadquarterCommander: Boolean,
    id: String,
    data: Object,
});

const emit = defineEmits(['collapse-form', 'formData', 'getId']);

const collapseForm = () => {
    emit('collapse-form');
};
// const isFirstSent = ref(true);
const scanFile = ref([]);

const seventhPanelData = ref({
    prize_place: 'Нет',
    links: [{
        link: '',
    }],
    document: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const sixPanelData = ref({
    number_of_members: 0,
    links: [{
        link: '',
    }],
    comment: '',
});

const prize_places = ref([
    { name: '1', value: 1, id: 'pp1' },
    { name: '2', value: 2, id: 'pp2' },
    { name: '3', value: 3, id: 'pp3' },
    { name: 'Нет', value: 'Нет', id: 'pp4' },
]);

const uploadFile = async (event) => {
    scanFile.value = event.target.files[0];
    let formData = new FormData();
    console.log(scanFile.value);
    formData.append('prize_place', seventhPanelData.value.prize_place);
    formData.append('document', scanFile.value);
    formData.append('links', JSON.stringify(seventhPanelData.value.links));
    formData.append('comment', seventhPanelData.value.comment);

    if (isFirstSent.value) {
        let { document } = await reportPartTwoService.createReportId(formData, '7', props.id, true);

        seventhPanelData.value.document = document.split('/').at(-1);
    } else {
        let { data: { document } } = await reportPartTwoService.createReportDraftId(formData, '7', props.id, true);

        seventhPanelData.value.document = document.split('/').at(-1);
    }
};

const deleteFile = async () => {
    seventhPanelData.value.document = '';
    let formData = new FormData();
    formData.append('prize_place', seventhPanelData.value.prize_place);
    formData.append('document', '');
    formData.append('links', JSON.stringify(seventhPanelData.value.links));
    formData.append('comment', seventhPanelData.value.comment);
    formData.append('file_size', seventhPanelData.value.file_size);
    formData.append('file_type', seventhPanelData.value.file_type);

    console.log(formData);

    if (isFirstSent.value) {
        await reportPartTwoService.createReportId(formData, '7', props.id, true);
    } else {
        await reportPartTwoService.createReportDraftId(formData, '7', props.id, true);
    }
};
// const focusOut = async () => {
//     try {
//         // let formData = new FormData();
//         // formData.append('prize_place', seventhPanelData.value.prize_place);
//         // formData.append('links', JSON.stringify(seventhPanelData.value.links));
//         // formData.append('comment', seventhPanelData.value.comment);
//         if (isFirstSent.value) {
//             // console.log('createReportId'), props.panel_number;
//             if (props.panel_number == 6) {
//                 await reportPartTwoService.createMultipleReport(sixPanelData.value, '6', props.id);
//             } else {
//                 await reportPartTwoService.createMultipleReport(seventhPanelData.value, '7', props.id)
//             }
//             isFirstSent.value = false;

//         } else {
//             // console.log('createId', props.panel_number);
//             if (props.panel_number == 6) {
//                 const { data } = await reportPartTwoService.createMultipleReportDraft(
//                     sixPanelData.value,
//                     '6',
//                     props.id
//                 );
//                 emit('getData', data, 6);
//             } else {
//                 const { data } = await reportPartTwoService.createMultipleReportDraft(
//                     seventhPanelData.value,
//                     '7',
//                     props.id,

//                 );
//                 emit('getData', data, 7);
//             }

//         }
//     } catch (e) {
//         // console.log('focusOut error:', e);
//     }
// };

const focusOut = () => {
    if (props.panel_number == 6) {
        emit('formData', sixPanelData.value)
    }
    else if (props.panel_number == 7) {
        emit('formData', seventhPanelData.value)
    }

}
const addLink = (number) => {
    if (number == 6) {
        sixPanelData.value.links.push({ link: '' });
    } else if (number == 7) {
        seventhPanelData.value.links.push({ link: '' });
        console.log('seventhPanelData.value.links', seventhPanelData.value.links);
    }
};

const deleteLink = async (number) => {
    if (number == 6) {
        sixPanelData.value.links.pop()
        await reportPartTwoService.createReportDraftId(sixPanelData.value, '6', props.id);
    } else {
        seventhPanelData.value.links.pop()
        await reportPartTwoService.createReportDraftId(seventhPanelData.value, '7', props.id, true);
    }
};

// watchEffect(async () => {
//     // try {
//     //     const { data } = await reportPartTwoService.getReportId(props.panel_number, props.id);

//     //     if (data && props.panel_number == 7) {

//     //         isFirstSent.value = false;


//     //         seventhPanelData.value.prize_place = data.prize_place;
//     //         seventhPanelData.value.document = data?.document?.split('/').at(-1);
//     //         seventhPanelData.value.file_size = data.file_size;
//     //         seventhPanelData.value.file_type = data.file_type;
//     //         // console.log('links', seventhPanelData.value.links, 'linksData', data.links)
//     //         // seventhPanelData.value.links = JSON.parse(seventhPanelData.value.links)
//     //         //JSON.parse(data.links)
//     //         seventhPanelData.value.links = data.links;
//     //         seventhPanelData.value.comment = data.comment;
//     //     } else if (data && props.panel_number == 6) {
//     //         isFirstSent.value = false;
//     //         sixPanelData.value.number_of_members = data.number_of_members;
//     //         sixPanelData.value.links = data.links;
//     //         sixPanelData.value.comment = data.comment;
//     //     }
//     // } catch (e) {
//     //     // console.log(e);
//     // }
// });

watchEffect(() => {
    if (props.panel_number == 6) {
        console.log('data 6', props.id)
        emit('getId', props.id)
        sixPanelData.value = { ...props.data }
    } else if (props.panel_number == 7) {
        console.log('data 7', props.id)
        emit('getId', props.id)
        seventhPanelData.value = { ...props.data }
    }
})
</script>
<style lang="scss" scoped>
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

.city {
    width: 100%;
    max-width: 200px;
}


.places {
    margin-bottom: 16px;
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
    border-radius: 10px;
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
