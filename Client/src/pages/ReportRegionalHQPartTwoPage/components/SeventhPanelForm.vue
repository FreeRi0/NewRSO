<template>
    <v-card-text class="panel-card-text">
        <v-tabs-window>
            <!-- <v-tabs-window-item value="one">
        <div class="form__field-group">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p>«II Международный строительный чемпионат»</p>
            </div>
            <div>
              <Button style="margin: 0;" label="Свернуть" />
            </div>
          </div>
          <div class="form__field">
            <p class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></p>
            <div style="display: flex; align-items: center">
              <InputReport id="2" name="2" class="form__input" type="radio" />
              <label for="2">1</label>
            </div>

          </div>
          <div>
            <label class="form__label" for="4">Скан подтверждающего документа <sup class="valid-red">*</sup></label>
            <InputReport type="file" id="4" name="4" />
          </div>
          <div>
            <label class="form__label" for="6">Ссылка на публикацию о победе <sup class="valid-red">*</sup></label>
            <InputReport id="6" name="6" class="form__input" type="text" placeholder="https://vk.com/cco_monolit" />
            <InputReport id="7" name="7" class="form__input" type="text" placeholder="https://vk.com/ccorobot" />
            <InputReport id="8" name="8" class="form__input" type="text" placeholder="https://vk.com/cco_monolit11" />
          </div>
          <div>
            <label class="form__label" for="9">Комментарий <sup class="valid-red">*</sup></label>
            <InputReport id="9" name="9" class="form__input" type="textarea" placeholder="Комментарий"
              style="width: 100%; height: 100px" />
          </div>
          <div>
            <v-checkbox label="Итоговое значение" />
          </div>
          <div class="hr"></div>
          <div>
            <p>(4-1)*2+(4-2)+(4-3)=9</p>
          </div>
        </div>
      </v-tabs-window-item> -->

            <div v-if="props.panel_number == 7" class="form__field-group">
                <div class="d-flex justify-space-between">
                    <div class="title_wrap">
                        <p class="form__title">{{ props.title.name }}</p>
                        <div class="d-flex gc-8">
                            <p class="form__title">{{ props.title.month }}</p>
                            <p class="form__title">{{ props.title.city }}</p>
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
                            <input :id="item.id" :value="item.value" :name="item.name" class="form__input places_input"
                                type="radio" @focusout="focusOut" v-model="seventhPanelData.prize_place" />
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
                    <InputReport v-if="!seventhPanelData.scan_file" isFile type="file" accept=".jpg, .jpeg, .png, .pdf"
                        id="scan_file" name="scan_file" width="100%" height="auto" @change="uploadFile"
                        :disabled="isDisabled" />
                    <div v-else class="report__file-box">
                        <span class="report__file-name">
                            <SvgIcon v-if="seventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
                            <SvgIcon v-if="seventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
                            <SvgIcon v-if="seventhPanelData.file_type === 'png'" icon-name="file-png" />
                            {{ seventhPanelData.scan_file }}
                        </span>

                        <span class="report__file-size">
                            {{ seventhPanelData.file_size }} Мб
                        </span>

                        <button @click="deleteFile" class="report__button-delete-file">
                            Удалить
                        </button>
                    </div>
                </div>

                <div class="form__field">
                    <label class="form__label" for="14">Ссылка на публикацию о победе
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in seventhPanelData.links" :key="index">
                        <InputReport @focusout="focusOut" name="14"
                            placeholder="Введите ссылку, например, https://vk.com/cco_monolit" v-model:value="item.link"
                            class="form__input mb-2" />
                        <div class="add_link" @click="addLink(7)" v-if="seventhPanelData.links.length === index + 1">
                            + Добавить ссылку
                        </div>
                        <div class="add_link" @click="deleteLink(7)" v-else>
                            Удалить поле ввода
                        </div>

                    </div>
                </div>
                <div class="d-flex gc-4">
                    <div class="form__field">
                        <label class="form__label" for="14">Дата <sup class="valid-red">*</sup></label>
                        <InputReport @focusout="focusOut" v-model:value="seventhPanelData.comment" id="14" name="14"
                            class="form__input" type="date" />
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Место проведения<sup class="valid-red">*</sup></label>
                        <InputReport placeholder="Укажите место проведения мероприятия" @focusout="focusOut"
                            v-model:value="seventhPanelData.comment" id="14" name="14" class="form__input"
                            style="width: 100%" />
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
                    <p>0</p>
                </div>
            </div>
            <div v-else-if="props.panel_number == 6" class="form__field-group">
                <div class="d-flex justify-space-between">
                    <div class="title_wrap">
                        <p class="form__title">{{ props.title.name }}</p>
                        <div class="d-flex gc-8">
                            <p class="form__title">{{ props.title.month }}</p>
                            <p class="form__title">{{ props.title.city }}</p>
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
                    <InputReport @focusout="focusOut" v-model:value="sixPanelData.count" placeholder="Введите число"
                        id="15" name="14" class="form__input number_input" type="number" />
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Ссылка на социальные сети/ электронные
                        СМИ, подтверждающая участие в мероприятии
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in sixPanelData.links" :key="index">
                        <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                            @focusout="focusOut" name="14" v-model:value="item.link" class="form__input mb-2" />
                        <div class="add_link" @click="addLink(6)" v-if="sixPanelData.links.length === index + 1">
                            + Добавить ссылку
                        </div>
                        <div class="add_link" @click="deleteLink(6)" v-else>
                            Удалить поле ввода
                        </div>

                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                    <InputReport @focusout="focusOut" v-model:value="sixPanelData.comment"
                        placeholder="Напишите сообщение" id="14" name="14" class="form__input" style="width: 100%" />
                </div>
            </div>

            <!-- <v-tabs-window-item value="three">
        <div class="form__field-group report-table">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p>«II Международный строительный чемпионат»</p>
            </div>
            <div>
              <Button style="margin: 0;" label="Свернуть" />
            </div>
          </div>
          <label class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></label>
          <v-table>
            <tbody>
              <tr class="report-table__tr">
                <td class="report-table__th report-table__th__br-left">Данные РО</td>
                <td class="report-table__th">Корректировка ОШ</td>
                <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
              </tr>
              <tr>
                <td class="report-table__td">1</td>
                <td class="report-table__td report-table__td__center">1</td>
                <td class="report-table__td">1</td>
              </tr>
            </tbody>
          </v-table>
          <div class="form__field">
            <p class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></p>
            <div style="display: flex">
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>1</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>2</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>3</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>Нет</label>
              </div>
            </div>
          </div>
          <div class="form__field">
            <label class="form__label" for="15">Комментарий <sup class="valid-red">*</sup></label>
            <InputReport id="15" name="15" class="form__input" style="width: 100%" />
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
      </v-tabs-window-item> -->
        </v-tabs-window>
    </v-card-text>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import { Button } from '@shared/components/buttons';
import { InputReport } from '@shared/components/inputs';
import { SvgIcon } from '@shared/ui';
import { reportPartTwoService } from '@services/ReportService.ts';
const props = defineProps({
    title: Object,
    panel_number: String,
    isDistrictHeadquarterCommander: Boolean,
    isDisabled: Boolean,
    isCentralHeadquarterCommander: Boolean,
    isSecondTab: Boolean,
});

const emit = defineEmits(['collapse-form']);

const collapseForm = () => {
    emit('collapse-form');
};
const isFirstSent = ref(true);
const scanFile = ref([]);

const seventhPanelData = ref({
    prize_place: null,
    links: [{
        link: '',
    }],
    scan_file: '',
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
    { name: 'Нет', value: false, id: 'pp4' },
]);

const uploadFile = async (event) => {
    scanFile.value = event.target.files[0];
    let formData = new FormData();
    formData.append('prize_place', seventhPanelData.value.prize_place);
    formData.append('scan_file', scanFile.value);
    formData.append('links', seventhPanelData.value.links);
    formData.append('comment', seventhPanelData.value.comment);
    console.log(scanFile.value);
    if (isFirstSent.value) {
        let { scan_file } = await reportPartTwoService.createReport(formData, '7', true);
        seventhPanelData.value.scan_file = scan_file.split('/').at(-1);
    } else {
        let { data: { scan_file } } = await reportPartTwoService.createReportDraft(formData, '7', true);
        seventhPanelData.value.scan_file = scan_file.split('/').at(-1);
    }
};

const deleteFile = async () => {
    seventhPanelData.value.scan_file = '';
    let formData = new FormData();
    formData.append('prize_place', seventhPanelData.value.prize_place);
    formData.append('scan_file', '');
    formData.append('links', seventhPanelData.value.links);
    formData.append('comment', seventhPanelData.value.comment);
    formData.append('file_size', seventhPanelData.value.file_size);
    formData.append('file_type', seventhPanelData.value.file_type);

    console.log(formData);

    if (isFirstSent.value) {
        await reportPartTwoService.createReport(formData, ID_PANEL, true);
    } else {
        await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    }
};
const focusOut = async () => {
    try {
        let formData = new FormData();
        formData.append('prize_place', seventhPanelData.value.prize_place);
        formData.append('links', seventhPanelData.value.links);
        formData.append('comment', seventhPanelData.value.comment);
        if (isFirstSent.value) {
            if (props.panel_number == 6) {
                await reportPartTwoService.createReportDraft(
                    sixPanelData.value,
                    '6',
                );
            } else {
                await reportPartTwoService.createReportDraft(
                    formData,
                    '7',
                    true,
                );
            }

        } else {
            if (props.panel_number == 6) {
                await reportPartTwoService.createReport(
                    sixPanelData.value,
                    '6',
                );
            } else {
                await reportPartTwoService.createReport(
                    formData,
                    '7',
                );
            }

        }
    } catch (e) {
        console.log('focusOut error:', e);
    }
};
const addLink = (number) => {
    if (number == 6) {
        sixPanelData.value.links.push({ link: '' });
    } else {
        seventhPanelData.value.links.push({ link: '' });
    }

};

const deleteLink = async (number) => {
    if (number == 6) {
        sixPanelData.value.links.pop()
        await reportPartTwoService.createReportDraft(sixPanelData.value, '6');
    } else {
        seventhPanelData.value.links.pop()
        await reportPartTwoService.createReportDraft(seventhPanelData.value, '7');
    }

};

watchEffect(async () => {
    try {
        const { data } = await reportPartTwoService.getReport(props.panel_number);
        if (data.length && props.panel_number == 7) {
            isFirstSent.value = false;
            seventhPanelData.value.comment = data[0].comment;
        } else {
            isFirstSent.value = false;
            sixPanelData.value.comment = data[0].comment;
        }
    } catch (e) {
        console.log(e);
    }
});
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
  display: flex;
  width: 100%;
  max-width: 700px;
  justify-content: space-between;
}

.places {
    margin-bottom: 16px;

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
    }

    .statement-item {
        display: flex;
        justify-content: center;
        margin: 0px auto;
    }
}
</style>
