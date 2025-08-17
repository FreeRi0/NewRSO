<template>
  <div
      v-if="!(props.centralExpert || props.districtExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH) || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportReject?.fourth)"
      class="form__field-group">
    <div v-for="(event, index) in events" :key="index" class="form__field-fourth-panel">
      <div class="form__field-members-event">
        <div class="form__field-date" id="form__field-date-first">
          <div class="form__field-members">
            <label class="form__label" for="participants_number">Количество человек, принявших участие в мероприятии
              <sup class="valid-red">*</sup></label>
            <div style="display: flex; justify-content: space-between;">
              <InputReport v-model:value="event.participants_number" :id="event.participants_number"
                           name="participants_number" class="form__input" type="number" placeholder="Введите число"
                           :maxlength="10"
                           :min="0" :max="2147483647" @focusout="focusOut" :disabled="isSent"/>
            </div>
          </div>
          <div class="form__field-members" id="form__field-members-name">
            <label style="margin-bottom: 8px;" class="form__label" for="eventName">Название мероприятия<sup
                class="valid-red">*</sup></label>
            <div style="display: flex; justify-content: space-between;">
              <InputReport v-model:value="event.name" :id="event.name" name="eventName" class="form__input"
                           placeholder="Введите название мероприятия" @focusout="focusOut"
                           :disabled="isSent || !event.participants_number"/>
            </div>
          </div>
        </div>
        <Button class="form__field-delete-button" v-if="index > 0 && !isSent" label="Удалить мероприятие"
                @click="deleteEvent(index)"/>
      </div>
      <div class="form__field-date">
        <div class="form__field">
          <label style="max-width: 280px;" class="form__label" for="start_date">Дата начала проведения мероприятия <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.start_date" :id="event.start_date" name="start_date" class="form__input"
                       type="date" @focusout="focusOut" :disabled="isSent || !event.participants_number"/>
        </div>
        <div class="form__field">
          <label style="max-width: 300px;" class="form__label" for="end_date">Дата окончания проведения мероприятия <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.end_date" :id="event.end_date" name="end_date" class="form__input"
                       type="date" @focusout="focusOut" :disabled="isSent || !event.participants_number"
                       :min-date="event.start_date"
                       :is-error-date="Object.values(isErrorDate).some(item => item.error === true && item.id === index)"/>
        </div>
      </div>
      <div class="form__field-event">
        <div class="form__field-event-file">
          <label class="form__label" for="4">Положение о мероприятии</label>
          <InputReport class="form-input__file-input" v-if="!event.regulations" isFile type="file" id="scan_file"
                       name="scan_file" width="100%" @change="uploadFile($event, index)"
                       :disabled="isSent || !event.participants_number"/>
          <FileBoxComponent v-else :file="event.regulations" :fileType="event.file_type" :fileSize="event.file_size"
                            :is-sent="isSent" :is-error-file="isErrorFile && !event.file_size"
                            @click="deleteFile(index)">
          </FileBoxComponent>
        </div>
        <div class="form__field-event-interregion">
          <p class="form__label">Межрегиональное <sup class="valid-red">*</sup></p>
          <div class="form__label-radio">
            <div style="display: flex;">
              <input v-model="event.is_interregional" type="radio" :id="`is_interregional-true_${index}`" :value="true"
                     class="custom-radio" @change="focusOut" :disabled="isSent || !event.participants_number"/>
              <label :for="`is_interregional-true_${index}`">
                Да
              </label>
            </div>
            <div style="display: flex">
              <input v-model="event.is_interregional" type="radio" :id="`is_interregional-false_${index}`"
                     :value="false" class="custom-radio" @change="focusOut" :disabled="isSent"/>
              <label :for="`is_interregional-false_${index}`">
                Нет
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form__field-link">
        <p class="form__label">Ссылка на группу мероприятия в социальных сетях</p>
        <div class="form__add-link" v-for="(link, i) in events[index].links" :key="i">
          <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input form__input-add-link" type="text"
                       placeholder="Введите ссылку" @focusout="focusOut"
                       :disabled="isSent || !event.participants_number"
                       :is-link="true" @error="setError"/>
          <div v-if="!isSent && event.participants_number">
            <Button v-if="events[index].links.length === i + 1" label="+ Добавить ссылку" @click="addLink(index)"
                    class="form__add-link-button"/>
            <Button class="form__add-link-button" v-else label="Удалить" @click="deleteLink(index, i)"/>
          </div>
        </div>
      </div>
      <div class="hr"></div>
    </div>

    <div v-if="!isSent">
      <Button class="form__add-event" label="Добавить мероприятие" @click="addEvent"/>
    </div>
    <div class="form__field-comment">
      <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
      <TextareaReport v-model:value="fourthPanelData.comment" id="comment" name="comment" class="form__input"
                      placeholder="Укажите наименования организованных мероприятий" :rows="row" autoResize
                      :maxlength="3000"
                      :max-length-text="3000" counter-visible @focusout="focusOut" :disabled="isSent"/>
    </div>
<!--    <div class="form__field-result" style="display: flex; align-items: center;">-->
<!--      <v-checkbox class="result-checkbox" id="v-checkbox" @change="calculateResult($event)"/>-->
<!--      <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>-->
<!--    </div>-->
<!--    <div class="hr"></div>-->
<!--    <div class="form__field-result result-count">-->
<!--      <p>{{ finalResult.toFixed(1) }}</p>-->
<!--    </div>-->
  </div>

  <report-tabs v-else :isReject="reportStore.isReportReject.fourth && props.tab === 'Доработка'">

    <template v-slot:firstTab>
      <div v-for="(event, index) in events" :key="index" class="form__field-fourth-panel">
        <div class="form__field-members-event">
          <div class="form__field-date">
            <div class="form__field">
              <label style="max-width: 300px;" class="form__label" for="participants_number">Количество человек,
                принявших участие в мероприятии
                <sup class="valid-red">*</sup></label>
              <div style="display: flex; justify-content: space-between;">
                <InputReport v-model:value="event.participants_number" :id="event.participants_number"
                             name="participants_number" class="form__input" type="number" placeholder="Введите число"
                             :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                             @focusout="focusOut"/>
              </div>
            </div>
            <div class="form__field">
              <label class="form__label" for="eventName">Название мероприятия<sup class="valid-red">*</sup></label>
              <div class="form__field-name">
                <InputReport v-model:value="event.name" :id="event.name" name="eventName" class="form__input"
                             placeholder="Введите название мероприятия"
                             :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                             @focusout="focusOut"/>
              </div>
            </div>
          </div>
        </div>

        <div class="form__field-date">
          <div class="form__field">
            <label style="max-width: 280px;" class="form__label" for="start_date">Дата начала проведения мероприятия
              <sup class="valid-red">*</sup></label>
            <InputReport v-model:value="event.start_date" :id="event.start_date" name="start_date" class="form__input"
                         type="date"
                         :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                         @focusout="focusOut"/>
          </div>
          <div class="form__field">
            <label style="max-width: 300px;" class="form__label" for="end_date">Дата окончания проведения мероприятия
              <sup class="valid-red">*</sup></label>
            <InputReport v-model:value="event.end_date" :id="event.end_date" name="end_date" class="form__input"
                         type="date"
                         :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                         @focusout="focusOut"/>
          </div>
        </div>
        <div class="form__field-event">
          <div class="form__field-event-file">
            <label class="form__label" for="4">Положение о мероприятии <sup class="valid-red">*</sup></label>
            <InputReport class="form-input__file-input" v-if="!event.regulations" isFile type="file" id="scan_file"
                         name="scan_file" width="100%" @change="uploadFile($event, index)"
                         :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"/>
            <FileBoxComponent v-else-if="event.regulations" :file="event.regulations" :fileType="event.file_type"
                              :fileSize="event.file_size"
                              :is-sent="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                              :is-error-file="isErrorFile && !event.file_size" @click="deleteFile(index)"/>
          </div>
          <div class="form__field-event-interregion">
            <p class="form__label">Межрегиональное <sup class="valid-red">*</sup></p>
            <div class="form__label-radio">
              <div style="display: flex;">
                <input v-model="event.is_interregional" type="radio" :id="`is_interregional-true_${index}`"
                       :value="true" class="custom-radio" @change="focusOut"
                       :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"/>
                <label :for="`is_interregional-true_${index}`">
                  Да
                </label>
              </div>
              <div style="display: flex">
                <input v-model="event.is_interregional" type="radio" :id="`is_interregional-false_${index}`"
                       :value="false" class="custom-radio" @change="focusOut"
                       :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"/>
                <label :for="`is_interregional-false_${index}`">
                  Нет
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form__field-link">
          <p class="form__label">Ссылка на группу мероприятия в социальных сетях</p>
          <div class="form__add-link" v-for="(link, i) in events[index].links" :key="i">
            <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input form__input-add-link"
                         type="text" placeholder="Введите ссылку" @focusout="focusOut"
                         :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"/>
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <div class="form__field-comment">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport v-model:value="fourthPanelData.comment" id="comment" name="comment" class="form__input"
                        type="textarea" placeholder="Укажите наименования организованных мероприятий"
                        style="width: 100%;" :rows="1"
                        autoResize :maxlength="3000" :max-length-text="3000" counter-visible @focusout="focusOut"
                        :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"/>
      </div>
<!--      <div class="form__field-result" style="display: flex; align-items: center;">-->
<!--        <v-checkbox class="result-checkbox" id="v-checkbox" @change="calculateResult($event)"/>-->
<!--        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>-->
<!--      </div>-->
      <div class="hr"></div>
      <div class="form__field-result result-count">
        <p>{{ finalResult.toFixed(1) }}</p>
      </div>
    </template>

    <!---------------------------------------------------------------------------------------------------->
    <template v-slot:secondTab>
      <div v-for="(eventDH, index) in fourthPanelDataDH.events" :key="index" class="form__field-fourth-panel">
        <div class="form__field-members-event">
          <div class="form__field-date">
            <div class="form__field">
              <label style="max-width: 300px;" class="form__label" for="participants_number">Количество человек,
                принявших участие в мероприятии
                <sup class="valid-red">*</sup></label>
              <div style="display: flex; justify-content: space-between;">
                <InputReport v-model:value="eventDH.participants_number" :id="eventDH.participants_number"
                             name="participants_number" class="form__input" type="number" placeholder="Введите число"
                             :maxlength="10" :min="0" :max="2147483647"
                             :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
              </div>
            </div>
            <div class="form__field">
              <label class="form__label" for="eventName">Название мероприятия<sup class="valid-red">*</sup></label>
              <div class="form__field-name">
                <InputReport v-model:value="eventDH.name" :id="eventDH.name" name="eventName" class="form__input"
                             placeholder="Введите название мероприятия"
                             :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
              </div>
            </div>
          </div>
          <!--          <Button class="form__field-delete-button" v-if="index > 0 && !props.centralExpert"-->
          <!--                  label="Удалить мероприятие"/>-->
          <!--@click="deleteEventDH(index)"-->
        </div>
        <div class="form__field-date">
          <div class="form__field">
            <label style="max-width: 280px;" class="form__label" for="start_date">Дата начала проведения мероприятия
              <sup class="valid-red">*</sup></label>
            <InputReport v-model:value="eventDH.start_date" :id="eventDH.start_date" name="start_date"
                         class="form__input" type="date"
                         :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
          </div>
          <div class="form__field">
            <label style="max-width: 300px;" class="form__label" for="end_date">Дата окончания проведения мероприятия
              <sup class="valid-red">*</sup></label>
            <InputReport v-model:value="eventDH.end_date" :id="eventDH.end_date" name="end_date" class="form__input"
                         type="date" :min-date="eventDH.start_date"
                         :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
          </div>
        </div>
        <div class="form__field-event">
          <div class="form__field-event-interregion">
            <p class="form__label">Межрегиональное <sup class="valid-red">*</sup></p>
            <div class="form__label-radio">
              <div style="display: flex;">
                <input v-model="eventDH.is_interregional" type="radio" :id="`is_interregional-true_${index}DH`"
                       :value="true" class="custom-radio"
                       :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
                <label :for="`is_interregional-true_${index}DH`">
                  Да
                </label>
              </div>
              <div style="display: flex">
                <input v-model="eventDH.is_interregional" type="radio" :id="`is_interregional-false_${index}DH`"
                       :value="false" class="custom-radio"
                       :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
                <label :for="`is_interregional-false_${index}DH`">
                  Нет
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <!--      <div v-if="!props.centralExpert">-->
      <!--        <Button class="form__add-event" label="Добавить мероприятие" @click="addEventDH"/>-->
      <!--      </div>-->
      <div class="form__field-comment" style="margin-top: 10px;">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport v-model:value="fourthPanelDataDH.comment" id="comment" name="comment" class="form__input"
                        type="textarea" placeholder="Примечания, ссылки" :rows="1" autoResize :maxlength="3000"
                        :max-length-text="3000" counter-visible style="width: 100%;"
                        :disabled="props.centralExpert || reportStore.isReportReject?.fourth || reportStore.isAllReportsVerifiedByCH"/>
      </div>
<!--      <div class="form__field-result" style="display: flex; align-items: center;">-->
<!--        <v-checkbox class="result-checkbox" id="v-checkboxDH" @change="calculateResultDH($event)"/>-->
<!--        <label class="result-checkbox-text" for="v-checkboxDH">Итоговое значение</label>-->
<!--      </div>-->
      <div class="hr"></div>
      <div class="form__field-result result-count">
        <p>{{ finalResultDH.toFixed(1) }}</p>
      </div>
    </template>

    <!---------------------------------------------------------------------------------------------------->
    <template v-slot:thirdTab>
      <div v-for="(eventCH, index) in commonData" :key="index" class="form__field-fourth-panel">
        <div class="form__field-members">
          <label class="form__label" for="eventName">Название мероприятия<sup class="valid-red">*</sup></label>
          <InputReport v-model:value="eventCH.dataRH.name" :id="eventCH.dataRH.name" name="eventName"
                       class="form__input" placeholder="Введите название мероприятия" disabled/>
        </div>
        <label class="form__label">Количество человек, принявших участие в мероприятии <sup
            class="valid-red">*</sup></label>
        <v-table class="report_table-wide">
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ eventCH.dataRH.participants_number }}</td>
            <td class="report-table__td report-table__td__center">{{ eventCH.dataDH.participants_number }}</td>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.participants_number" :id="'participants_numberCH'"
                           :name="'participants_numberCH'" style="width: 100%;" type="number" placeholder="0"
                           :maxlength="10"
                           :min="0" :max="9999999999" :step="0.01"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-table class="report_table-narrow">
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td">{{ eventCH.dataRH.participants_number }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td report-table__td__center">{{ eventCH.dataDH.participants_number }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.participants_number" :id="'participants_numberCH'"
                           :name="'participants_numberCH'" style="width: 100%;" type="number" placeholder="0"
                           :maxlength="10"
                           :min="0" :max="9999999999" :step="0.01"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <label class="form__label">Межрегиональное <sup class="valid-red">*</sup></label>
        <v-table class="report_table-wide">
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ eventCH.dataRH.is_interregional ? 'Да' : 'Нет' }}</td>
            <td class="report-table__td report-table__td__center">
              {{ eventCH.dataDH.is_interregional ? 'Да' : 'Нет' }}
            </td>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >{{ eventCH.dataCH.is_interregional ? 'Да' : 'Нет' }}</td>
          </tr>
          </tbody>
        </v-table>
        <v-table class="report_table-narrow">
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td">{{ eventCH.dataRH.is_interregional ? 'Да' : 'Нет' }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td report-table__td__center">
              {{ eventCH.dataDH.is_interregional ? 'Да' : 'Нет' }}
            </td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >{{ eventCH.dataCH.is_interregional ? 'Да' : 'Нет' }}</td>
          </tr>
          </tbody>
        </v-table>
        <div>
          <label class="form__label" for="11">Межрегиональное <sup class="valid-red">*</sup></label>
          <div class="form__label-radio" style="margin-top: 10px;">
            <div style="display: flex;">
              <input v-model="eventCH.dataCH.is_interregional" type="radio" :id="`is_interregional-true_${index}CH`"
                     :value="true" class="custom-radio"
                     :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"/>
              <label :for="`is_interregional-true_${index}CH`">
                Да
              </label>
            </div>
            <div style="display: flex">
              <input v-model="eventCH.dataCH.is_interregional" type="radio" :id="`is_interregional-false_${index}CH`"
                     :value="false" class="custom-radio"
                     :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"/>
              <label :for="`is_interregional-false_${index}CH`">
                Нет
              </label>
            </div>
          </div>
        </div>
        <label class="form__label">Дата начала проведения мероприятия <sup class="valid-red">*</sup></label>
        <v-table class="report_table-wide">
          <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.start_date) }}</td>
            <td class="report-table__td report-table__td__center"> {{ formattedDate(eventCH.dataDH.start_date) }}</td>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.start_date" :id="'eventCH.dataCH.end_date'"
                           name="eventCH.dataCH.end_date" class="form__input" type="date"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
                           style="width: 100%;"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-table class="report_table-narrow">
          <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.start_date) }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td report-table__td__center"> {{ formattedDate(eventCH.dataDH.start_date) }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.start_date" :id="'eventCH.dataCH.end_date'"
                           name="eventCH.dataCH.end_date" class="form__input" type="date"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
                           style="width: 100%;"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <label class="form__label">Дата окончания проведения мероприятия <sup class="valid-red">*</sup></label>
        <v-table class="report_table-wide">
          <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.end_date) }}</td>
            <td class="report-table__td report-table__td__center"> {{ formattedDate(eventCH.dataDH.end_date) }}</td>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.end_date" :id="'eventCH.dataCH.end_date'"
                           name="eventCH.dataCH.end_date" class="form__input" type="date"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
                           style="width: 100%;"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-table class="report_table-narrow">
          <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.end_date) }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td class="report-table__td report-table__td__center"> {{ formattedDate(eventCH.dataDH.end_date) }}</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td 
              :class="[
                'report-table__td',
                (reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
            >
              <InputReport v-model:value="eventCH.dataCH.end_date" :id="'eventCH.dataCH.end_date'"
                           name="eventCH.dataCH.end_date" class="form__input" type="date"
                           :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
                           style="width: 100%;"/>
            </td>
          </tr>
          </tbody>
        </v-table>
        <div class="hr" style="margin-bottom: 40px;"></div>
      </div>

      <div class="form__field">
        <label class="form__label" for="15">Комментарий <sup class="valid-red">*</sup></label>
        <!--        <InputReport-->
        <!--            v-model:value="commentCH"-->
        <!--            id="15"-->
        <!--            name="15"-->
        <!--            class="form__input"-->
        <!--            style="width: 100%"-->
        <!--            :disabled="reportStore.isReportReject?.fourth && !props.centralExpert"-->
        <!--        />-->
        <TextareaReport
            v-model:value="commentCH"
            id="commentCH"
            name="commentCH"
            class="form__input"
            placeholder="Примечания, ссылки"
            autoResize
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            :disabled="(reportStore.isReportReject?.fourth && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
        />
      </div>
      <!--      <div>-->
      <!--        <v-checkbox label="Итоговое значение"/>-->
      <!--      </div>-->
      <!--      <div class="hr"></div>-->
      <!--      <div>-->
      <!--        <p>(4-1)*2+(4-2)+(4-3)=9</p>-->
      <!--      </div>-->
      <div v-if="!reportStore.isAllReportsVerifiedByCH && !reportVerifiedByCH">
        <v-checkbox v-model="reportStore.returnReport.fourth" label="Вернуть в РО на доработку" @change="onReportReturn"
                    :disabled="reportStore.isReportReject?.fourth && !props.centralExpert"/>
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {onMounted, ref, watch, watchEffect, watchPostEffect} from "vue";
import {InputReport, TextareaReport} from '@shared/components/inputs';
import {Button} from '@shared/components/buttons';
import {ReportTabs} from './index';
import {reportPartTwoService} from "@services/ReportService.ts";
import {FileBoxComponent} from "@entities/RatingRoComponents/components";
import {fileValidate} from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";
import {formattedDate} from "@pages/ReportRegionalHQPartTwoPage/Helpers.js";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  tab: String,
});

const isFirstSent = ref(true);
const fourthPanelData = ref({
  comment: '',
  events: [],
});
const fourthPanelDataDH = ref({
  comment: '',
  events: [{
    participants_number: '',
    name: null,
    start_date: null,
    end_date: null,
    is_interregional: false,
  }],
});
const events = ref([
  {
    name: null,
    participants_number: '',
    start_date: null,
    end_date: null,
    regulations: '',
    file_size: null,
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
    is_interregional: false,
  }
]);
const isSent = ref(false);

const emit = defineEmits(['getData', 'getDataDH', 'getDataCH']);

const isErrorDate = ref({});
let isErrorFile = ref(false);
const isLinkError = ref(false);
const finalResult = ref(0);
const finalResultDH = ref(0);
const commonData = ref([]);
const commentCH = ref();
const row = ref(1);
const reportVerifiedByCH = ref(false);

const focusOut = async () => {
  fourthPanelData.value.events = [...events.value];
  if (!isLinkError.value) {
    try {
      if (isFirstSent.value) {
        const {data} = await reportPartTwoService.createReport(setFormData(), '4', true);
        emit('getData', data, 4);
      } else {
        const {data} = await reportPartTwoService.createReportDraft(setFormData(), '4', true);
        emit('getData', data, 4);
      }
    } catch (e) {
      console.log(e)
    }
  }
};

const addLink = (index) => {
  events.value[index].links.push({link: ''})
};
const deleteLink = async (eventIndex, linkIndex) => {
  let {data} = await reportPartTwoService.createReportDraft(setFormData(null, eventIndex, false, false, true, linkIndex), '4', true);
  emit('getData', data, 4);
};

const addEvent = () => {
  events.value.push({
    name: '',
    participants_number: '',
    start_date: null,
    end_date: null,
    regulations: '',
    links: [
      {
        link: '',
      },
    ],
    is_interregional: false,
  })
};

const deleteEvent = async (index) => {
  let formData = new FormData();
  events.value = events.value.filter((el, i) => index !== i);

  formData.append('comment', fourthPanelData.value.comment);
  events.value.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    if (event.regulations) formData.append(`events[${i}][regulations]`, event.regulations);
    formData.append(`events[${i}][is_interregional]`, event.is_interregional);
    if (event.links.length) {
      for (let j = 0; j < event.links.length; j++) {
        if (event.links[j].link) formData.append(`events[${i}][links][${j}][link]`, event.links[j].link);
      }
    }
  })
  try {
    let {data} = await reportPartTwoService.createReportDraft(formData, '4', true);
    emit('getData', data, 4);
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};

const uploadFile = async (event, index) => {
  fileValidate(event.target.files[0], 7, isErrorFile);
  if (isErrorFile.value) {
    events.value[index].regulations = event.target.files[0].name
  } else {
    const {data} = await reportPartTwoService.createReportDraft(setFormData(event.target.files[0], index), '4', true);
    emit('getData', data, 4);
  }
};
const deleteFile = async (index) => {
  if (isFirstSent.value) {
    const {data} = await reportPartTwoService.createReport(setFormData(null, index, false, true), '4', true);
    emit('getData', data, 4);
  } else {
    const {data} = await reportPartTwoService.createReportDraft(setFormData(null, index, false, true), '4', true);
    emit('getData', data, 4);
  }

};

const setFormData = (file = null, index = null, isDeleteEvent = false, isDeleteFile = false, isLinkDelete = false, linkIndex = null) => {
  let formData = new FormData();

  formData.append('comment', fourthPanelData.value.comment || '');
  events.value.forEach((event, i) => {
    // Логика обнуления мероприятия при нулевом количестве участников
    if (!(+event.participants_number)) {
      event.name = null;
      event.is_interregional = false;
      event.end_date = null;
      event.start_date = null;
      event.links = [];
      formData.append(`events[${i}][regulations]`, '');
    }
    if (isDeleteEvent && index === i) {
      return;
    } else {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.name) formData.append(`events[${i}][name]`, event.name);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
      formData.append(`events[${i}][is_interregional]`, event.is_interregional);
      if (isLinkDelete && index === i) {
        event.links.splice(linkIndex, 1);
      }
      if (file && index === i) {
        formData.append(`events[${i}][regulations]`, file);
      }
      if (isDeleteFile && index === i) {
        formData.append(`events[${i}][regulations]`, '');
      }
      if (event.links.length) {
        for (let j = 0; j < event.links.length; j++) {
          if (event.links[j].link) formData.append(`events[${i}][links][${j}][link]`, event.links[j].link);
        }
      }
      if (reportStore.isReportReject.fourth && !isDeleteFile) {
        console.log('here')
        if (event.regulations) formData.append(`events[${i}][regulations]`, event.regulations);
        // if (event.file_size) formData.append(`events[${i}][file_size]`, event.file_size);
        // if (event.file_type) formData.append(`events[${i}][file_type]`, event.file_type);
      }
    }
  })
  return formData;
};

const setError = (err) => {
  isLinkError.value = err;
};

const calculateResult = (event) => {
  if (event.target.checked) {
    events.value.forEach(e => {
      const startDate = new Date(e.start_date);
      const endDate = new Date(e.end_date);
      const days = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      if (e.is_interregional) {
        finalResult.value += e.participants_number * days * 0.8;
      } else {
        finalResult.value += e.participants_number * days;
      }
    })
  } else {
    finalResult.value = 0;
  }
};

const calculateResultDH = (event) => {
  if (event.target.checked) {
    fourthPanelDataDH.value.events.forEach(e => {
      const startDate = new Date(e.start_date);
      const endDate = new Date(e.end_date);
      const days = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      if (e.is_interregional) {
        finalResultDH.value += e.participants_number * days * 0.8;
      } else {
        finalResultDH.value += e.participants_number * days;
      }
    })
  } else {
    finalResultDH.value = 0;
  }
};

const onReportReturn = (event) => {
  let formData = new FormData();
  if (event.target.checked) {
    reportStore.returnReport.fourth = true;
    reportStore.reportDataCH.fourth.events = [];
    commonData.value.forEach(e => {
      reportStore.reportDataCH.fourth.events.push(e.dataCH)
    });

    reportStore.reportDataCH.fourth.comment = commentCH.value || '';
    formData.append('comment', commentCH.value || '');
    formData.append('reasons[comment]', commentCH.value);

    reportStore.reportDataCH.fourth.events.forEach((event, i) => {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
      formData.append(`events[${i}][is_interregional]`, event.is_interregional);
    });

    emit('getDataCH', formData, 4);
  } else {
    reportStore.returnReport.fourth = false;
    reportStore.reportDataCH.fourth.events = [];
    commonData.value.forEach(e => {
      reportStore.reportDataCH.fourth.events.push(e.dataCH)
    });

    reportStore.reportDataCH.fourth.comment = commentCH.value || '';
    formData.append('comment', commentCH.value || '');

    reportStore.reportDataCH.fourth.events.forEach((event, i) => {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
      formData.append(`events[${i}][is_interregional]`, event.is_interregional);
    });

    emit('getDataCH', formData, 4);
  }
}

onMounted(() => {
  reportVerifiedByCH.value = reportStore.reportForCheckCH.fourth?.verified_by_chq !== null;

  /*
  * Мапинг данных для отчета эксперта ОШ
  */
  if (reportStore.reportDataDH.fourth && props.districtExpert) {
    fourthPanelDataDH.value.events = [...reportStore.reportDataDH.fourth.events];
    fourthPanelDataDH.value.comment = reportStore.reportDataDH.fourth.comment;
  }

  /*
  * Мапинг данных для отчета эксперта ЦШ
  */
  if (reportStore.reportForCheckCH.fourth && props.centralExpert) {
    const eventQuantity = reportStore.reportForCheckCH.fourth.events.length;

    if (reportStore.reportForCheckCH.fourth.rejecting_reasons) {
      // Повторная доработка
      // Добавление данных панели "отчет РО"
      events.value = reportStore.reportForCheckCH.fourth.events;
      fourthPanelData.value.comment = reportStore.reportForCheckCH.fourth.comment || '';

      // Рефакторинг - добавлен код ниже, т.к. на вкл РО отображались данные ЦШ
      if(reportStore.reportForCheckCH.fourth.regional_version) {
        const reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
        events.value = reportDataRH.events;
        fourthPanelData.value.comment = reportDataRH.comment || '';
      }

      // Добавление данных панели "корректировка ОШ"
      const reportDataDH = JSON.parse(reportStore.reportForCheckCH.fourth.district_version);
      fourthPanelDataDH.value.events = reportDataDH.events;
      fourthPanelDataDH.value.comment = reportDataDH.comment;

      // Добавление данных из стора для панели "корректировка ЦШ"
      let reportDataCH;
      // Проверка на верификацию отчета ЦШ. При верифицированом отчете данные берутся из общего объекта
      if (reportVerifiedByCH.value) {
        console.log('reportStore.reportForCheckCH.fourth', reportStore.reportForCheckCH.fourth)
        reportDataCH = reportStore.reportForCheckCH.fourth
      } else {
        console.log('reportStore.reportForCheckCH.fourth2', reportStore.reportForCheckCH.fourth)
        reportDataCH = reportStore.reportForCheckCH.fourth.central_version;
      }
      commentCH.value = reportDataCH.comment || '';
      // Проверяем наличие версии РО
      let reportDataRH;
      if (reportStore.reportForCheckCH.fourth.regional_version) {
        reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
      } else {
        reportDataRH = reportStore.reportForCheckCH.fourth;
      }

      for (let i = 0; i < eventQuantity; i++) {
        commonData.value[i] = {
          dataRH: reportDataRH.events[i],
          dataDH: reportDataDH.events[i],
          dataCH: reportDataCH.events[i],
        }
      }

    } else {
      // Добавление данных панели "отчет РО"
      const reportDataRH = JSON.parse(reportStore.reportForCheckCH.fourth.regional_version);
      events.value = reportDataRH.events;
      fourthPanelData.value.comment = reportDataRH.comment || '';

      // Добавление данных панели "корректировка ОШ"
      fourthPanelDataDH.value.events = reportStore.reportForCheckCH.fourth.events;
      fourthPanelDataDH.value.comment = reportStore.reportForCheckCH.fourth.comment;

      console.log('reportStore.reportData', reportStore.reportDataCH)
      // Добавление данных из стора для панели "корректировка ЦШ"
      commentCH.value = reportStore.reportDataCH.fourth.comment || '';
      for (let i = 0; i < eventQuantity; i++) {
        commonData.value[i] = {
          dataRH: reportDataRH.events[i],
          dataDH: reportStore.reportForCheckCH.fourth.events[i],
          dataCH: reportStore.reportDataCH.fourth.events[i],
          //     ? reportStore.reportDataCH.fourth.events[i] : {
          //   participants_number: '',
          //   start_date: null,
          //   end_date: null,
          // }
        }
      }
    }
  }
})

watchEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    events.value = [...props.data.events];
    fourthPanelData.value.comment = props.data.comment || '';
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.fourth && !props.data.central_version;
  }

  // Мапинг данных для отчета командира РШ при возвращении на доработку
  if (reportStore.reportReject.fourth && (reportStore.isReportReject.fourth || reportStore.isAllReportsVerifiedByCH)) {
    console.log('reportStore.reportReject.fourth', reportStore.reportReject.fourth)
    console.log('props.data', props.data)

    reportStore.returnReport.fourth = true;
    // Добавление данных панели "корректировка ОШ"
    const reportDataDH = JSON.parse(reportStore.reportReject.fourth.district_version);

    fourthPanelDataDH.value.events = reportDataDH.events;
    fourthPanelDataDH.value.comment = reportDataDH.comment;

    // Добавление данных для панели "корректировка ЦШ"
    if (props.data.central_version) {
      // Отчет создан:
      commentCH.value = props.data.central_version.comment || '';
      for (let i = 0; i < props.data.events.length; i++) {
        // TODO: не приходит name с сервера
        commonData.value[i] = {
          dataRH: props.data.events[i],
          dataDH: reportDataDH.events[i],
          dataCH: props.data.central_version.events[i],
        }
      }
    } else {
      // Отчет не создан:
      const reportDataRH = JSON.parse(reportStore.reportReject.fourth.regional_version);
      commentCH.value = reportStore.reportReject.fourth.comment || '';

      console.log('reportDataRH', reportDataRH)
      for (let i = 0; i < props.data.events.length; i++) {
        commonData.value[i] = {
          dataRH: reportDataRH.events[i],
          dataDH: reportDataDH.events[i],
          dataCH: reportStore.reportReject.fourth.events[i],
        }
      }
    }
  }
});

watchPostEffect(() => {
  events.value.forEach((event) => {
    if (!event.links.length) event.links.push({link: ''})
  });
  if (!events.value.length) {
    addEvent();
  }
});

watch(fourthPanelDataDH.value, () => {
  let formData = new FormData();
  reportStore.reportDataDH.fourth = fourthPanelDataDH.value;

  formData.append('comment', fourthPanelDataDH.value.comment || '');
  fourthPanelDataDH.value.events.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.name) formData.append(`events[${i}][name]`, event.name);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    formData.append(`events[${i}][is_interregional]`, event.is_interregional);
  });

  emit('getDataDH', formData, 4);
}, {
  deep: true
});

watch(() => [commonData.value, commentCH], () => {
  let formData = new FormData();

  reportStore.reportDataCH.fourth.events = [];
  commonData.value.forEach(e => {
    reportStore.reportDataCH.fourth.events.push(e.dataCH)
  });

  reportStore.reportDataCH.fourth.comment = commentCH.value || '';
  formData.append('comment', commentCH.value || '');
  if (reportStore.returnReport.fourth) formData.append('reasons[comment]', commentCH.value || '');

  reportStore.reportDataCH.fourth.events.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    formData.append(`events[${i}][is_interregional]`, event.is_interregional);
  });

  emit('getDataCH', formData, 4);
}, {
  deep: true
});
</script>
<style lang="scss" scoped>
.form-input__file-input {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 86px;

  @media (max-width: 568px) {
    min-height: 101px;
  }
}

.custom-radio {
  display: none;
  /* -стандартное отображение*/
}

.custom-radio + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 20px;
}

.custom-radio + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: '';
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1F7CC0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.custom-radio:disabled + label {
  pointer-events: none;
}

.form__field-fourth-panel {
  display: flex;
  flex-direction: column;
  // gap: 16px;

  @media (max-width: 568px) {
    // align-items: center;
  }
}

.panel-card {
  box-shadow: none;
}

.form__field {
  margin-bottom: 0;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
  padding-top: 0;

  @media (max-width: 568px) {
    padding: 0;
  }
}

// .form__field-members-event {
//   display: flex;
//   height: 111px;
//   margin-top: 40px;
//   justify-content: space-between;

//   @media (max-width: 568px) {
//     flex-direction: column-reverse;
//     gap: 8px;
//     align-items: flex-end;
//     margin-top: 32px;
//   }
// }

.form__field-members-event {
  position: relative;
}

.form__field-name {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;

  @media (max-width: 680px) {
    margin-top: 0px;
  }
}

.form__field-members {
  max-width: 340px;
  max-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    max-width: 300px;
  }
}

.form__field-date {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  max-width: 720px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  @media (max-width: 568px) {
    align-items: center;
    justify-content: center;
  }
}

#form__field-date-first {
  margin-top: 40px;

  @media (max-width: 568px) {
    padding-right: 40px;
  }

  @media (max-width: 400px) {
    padding-right: 0px;
  }
}

.form__add-event {
  margin: 16px 0px 30px;
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  padding: 8px 32px 8px 52px;
  position: relative;
  max-height: 40px;
  width: 340px;

  @media(max-width: 568px) {
    margin: 30px auto;
  }

  @media(max-width: 400px) {
    width: 300px;
    margin: 30px auto;
  }
}


.form__add-event::before {
  content: url('@app/assets/icon_items/event-plus.svg');
  position: absolute;
  left: 50px;

  @media(max-width: 568px) {
    left: 54px;
  }

  @media(max-width: 400px) {
    left: 36px;
  }
}

.form__field-event {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 910px;
}

.form__field-event-file {
  display: flex;
  flex-direction: column;
  width: 720px;

  @media (max-width: 568px) {
    margin: 0 auto;
    width: 340px;
  }

  @media (max-width: 400px) {
    width: 300px;
  }
}

.form__field-event-interregion {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 568px) {
    margin: 0 auto;
    width: 340px;
  }

  @media (max-width: 400px) {
    width: 300px;
  }
}

.form__field-link,
.form__field-comment,
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

.result-count {
  color: #6D6D6D;
}

.form__field-comment {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;

  @media (max-width: 568px) {
    margin-bottom: 6px;
  }
}

.form__field-delete-button {
  position: absolute;
  top: 40px;
  right: 0;
  margin: 0;
  width: 177px;
  height: 33px;
  font-weight: 400;
  color: #1F7CC0;
  padding: 0;
  background-color: #D2E4F2;
  border: none;
  border-radius: 4px;

  @media (max-width: 1124px) {
    top: 0px;
  }

  @media (max-width: 568px) {
    right: 16px;
  }
}

.form__file-box {
  margin-top: 16px;
  max-width: 720px;
  width: 100%;
  padding: 1px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Bert Sans";
  font-weight: 400;
  line-height: 21px;
}

.form__file-name {
  display: flex;
  align-items: center;
}

.form__file-size {
  width: 48px;
  color: #6d6d6d;
  opacity: 0.8;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 15px;
    background-color: #6d6d6d;
    opacity: 0.8;
    top: 3px;
    left: -10px;
  }
}

.form__button-delete-file {
  color: #1f7cc0;
}

.form__label-radio {
  display: flex;
  gap: 40px;
  margin-bottom: 16px;
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

.hr {
  margin-top: 12px;
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

.add_link {
  color: #1f7cc0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.1px;
  margin-left: 40px;
}

.add_eventBtn {
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  margin: 35px 0 40px;
}

.deleteEventBtn {
  background-color: #d2e4f2;
  width: 177px;
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
  margin: 0;
}

.v-table {
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #B6B6B6;
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

.add_link {
  color: #1f7cc0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.1px;
  margin-left: 40px;
}

.add_eventBtn {
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  margin: 35px 0 40px;
}

.deleteEventBtn {
  background-color: #d2e4f2;
  width: 177px;
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
  margin: 0;
}

.form__add-link {
  display: flex;
  gap: 40px;
  margin-bottom: 8px;

  @media (max-width: 1112px) {
    flex-direction: column;
    gap: 8px;
  }
}

.form__input-add-link {
  width: 720px;
}

.form__add-link-button {
  width: 141px;
  margin: 8px 0;
  border: none;
  background-color: transparent;
  color: #1F7CC0;
  padding: 0;
  text-align: left;
}

.result-checkbox {
  color: #39BF39;
  margin-right: 12px;
}

.result-checkbox-text {
  font-family: 'Bert sans';
  font-weight: 700;
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
</style>