<template>
  <div
      v-if="!(props.centralExpert || props.districtExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH) || (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportReject?.first)">
    <div class="form__field-group">
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="9999999999"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="report__add-file">
          <label class="form__label report__add-file-form-label" for="scan_file">Скан
            платежного поручения об уплате ЧВ <sup class="valid-red">*</sup></label>
          <InputReport
              v-if="!firstPanelData.scan_file"
              isFile
              type="file"
              id="scan_file"
              name="scan_file"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
              style="width: 100%;"
              @change="uploadFile"/>
          <FileBoxComponent
              v-else
              :file="firstPanelData.scan_file"
              :fileType="firstPanelData.file_type"
              :fileSize="firstPanelData.file_size"
              @click="deleteFile"
              :is-sent="isSent"
              :is-error-file="isErrorFile"
          ></FileBoxComponent>
        </div>
      </div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.detachment_number"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Количество членов РО&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.participants_with_payment"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
      </div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Численность иностранных граждан</label>
          <InputReport
              v-model:value="firstPanelData.foreign_participants"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Численность ТОП</label>
          <InputReport
              v-model:value="firstPanelData.top_participants"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
      </div>

      <div class="form__field-report">
        <div style="width: 100%">
          <v-checkbox
              v-model="firstPanelData.foreign_must_pay"
              label="Освобождены от оплаты членских взносов в данном РО"
              @change="focusOut"
          />
        </div>
        <div style="width: 100%">
          <v-checkbox
              v-model="firstPanelData.top_must_pay"
              label="ТОП освобождены от оплаты членских взносов в данном РО"
              @change="focusOut"
          />
        </div>
      </div>

      <div class="form__field">
        <label class="form__label" for="comment">Комментарий</label>
        <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="firstPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            @focusout="focusOut"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input"
            :disabled="isSent"
            style="margin-bottom: 4px;"
        />
      </div>
    </div>

    <div class="form__field-group">
      <div class="fields__title">ССО</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sso_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sso_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">СПО</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.spo_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.spo_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">СОП</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sop_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sop_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">СМО</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.smo_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.smo_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">ССервО</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sservo_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.sservo_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">ССхО</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.ssho_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.ssho_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">Профильные отряды</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.specialized_detachment_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.specialized_detachment_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">Производственные отряды</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.production_detachment_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.production_detachment_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

      <div class="fields__title">ТОП</div>
      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.top_detachment_number"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              style="width: 100%"
              v-model:value="firstPanelData.top_detachment_participants"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
              :is-error-panel="isErrorPanel"
          />
        </div>
      </div>

    </div>
    <ReportRegionalForm :reportData="reportData" :blockEditFirstReport="blockEditFirstReport"/>
  </div>

  <report-tabs v-else :isReject="reportStore.isReportReject.first && props.tab === 'Доработка'">
    <!--    first-->
    <template v-slot:firstTab>
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
              @focusout="focusOut"
          />
        </div>
        <div class="report__add-file">
          <label class="form__label" for="scan_file">Скан платежного поручения об уплате ЧВ <sup
              class="valid-red">*</sup></label>
          <div class="form__file-box">
            <FileBoxComponent
                v-if="!reportStore.isReportReject.first"
                :file="firstPanelData.scan_file"
                :fileType="firstPanelData.file_type"
                :fileSize="firstPanelData.file_size"
                :is-sent="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            ></FileBoxComponent>
            <div v-else class="report__add-file">
              <InputReport
                  v-if="!firstPanelData.scan_file"
                  isFile
                  type="file"
                  id="scan_file"
                  name="scan_file"
                  :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                  :is-error-panel="isErrorPanel"
                  style="width: 100%;"
                  @change="uploadFile"/>
              <FileBoxComponent
                  v-else
                  :file="firstPanelData.scan_file"
                  :fileType="firstPanelData.file_type"
                  :fileSize="firstPanelData.file_size"
                  @click="deleteFile"
                  :is-sent="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
                  :is-error-file="isErrorFile"
              ></FileBoxComponent>
            </div>
          </div>
        </div>
      </div>

      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Количество отрядов&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.detachment_number"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
              @focusout="focusOut"
              style="width: 100%"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Количество членов РО&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.participants_with_payment"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
              @focusout="focusOut"
              style="width: 100%"
          />
        </div>
      </div>

      <div class="form__field-report">
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Численность иностранных граждан</label>
          <InputReport
              v-model:value="firstPanelData.foreign_participants"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
              style="width: 100%"
          />
        </div>
        <div class="form__field" style="width: 100%">
          <label class="form__label" for="comment">Численность ТОП</label>
          <InputReport
              v-model:value="firstPanelData.top_participants"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              @focusout="focusOut"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
              style="width: 100%"
          />
        </div>
      </div>

      <div class="form__field-report">
        <div style="width: 100%">
          <v-checkbox
              v-model="firstPanelData.top_must_pay"
              label="ТОП освобождены от оплаты членских взносов в данном РО"
              @change="focusOut"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
          />
        </div>
        <div style="width: 100%">
          <v-checkbox
              v-model="firstPanelData.top_must_pay"
              label="ТОП освобождены от оплаты членских взносов в данном РО"
              @change="focusOut"
              :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
          />
        </div>
      </div>

      <div class="form__field">
        <label class="form__label" for="comment">Комментарий</label>
        <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="firstPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input"
            :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            style="margin-bottom: 4px;"
            @focusout="focusOut"
        />
      </div>

<!--      <ReportRegionalForm v-if="reportData?.id" :reportData="reportData" :blockEditFirstReport="true"/>-->
    </template>

    <template v-slot:firstTab_additionalSlot>
      <div class="form__field-group">
        <div class="fields__title">ССО</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sso_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sso_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">СПО</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.spo_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.spo_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">СОП</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sop_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sop_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">СМО</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.smo_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.smo_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">ССервО</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sservo_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.sservo_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">ССхО</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.ssho_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.ssho_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">Профильные отряды</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.specialized_detachment_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.specialized_detachment_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">Производственные отряды</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.production_detachment_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.production_detachment_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>

        <div class="fields__title">ТОП</div>
        <div class="form__field-report">
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество отрядов&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.top_detachment_number"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
          <div class="form__field" style="width: 100%">
            <label class="form__label" for="amount_of_money">Количество человек&nbsp;<sup
                class="valid-red">*</sup></label>
            <InputReport
                style="width: 100%"
                v-model:value="firstPanelData.top_detachment_participants"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert || reportStore.isAllReportsVerifiedByCH"
            />
          </div>
        </div>
      </div>
    </template>

    <!--    second-->
    <template v-slot:secondTab>
      <div class="form__field-report">
        <div class="form__field" style="width: 50%">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelDataDH.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              :disabled="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
        <div class="form__field" style="width: 50%">
          <label class="form__label" for="comment">Количество членов РО&nbsp;<sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelDataDH.participants_with_payment"
              id="foreign_participants"
              name="foreign_participants"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="32767"
              :step="0.01"
              :disabled="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"
              :is-error-panel="isErrorPanel"
              style="width: 100%"
          />
        </div>
      </div>

<!--      <div class="form__field">-->
<!--        <label class="form__label" for="comment">Численность иностранных граждан</label>-->
<!--        <InputReport-->
<!--            v-model:value="firstPanelDataDH.foreign_participants"-->
<!--            id="foreign_participants"-->
<!--            name="foreign_participants"-->
<!--            class="form__input"-->
<!--            type="number"-->
<!--            placeholder="Введите число"-->
<!--            :maxlength="10"-->
<!--            :min="0"-->
<!--            :max="32767"-->
<!--            :step="0.01"-->
<!--            :disabled="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"-->
<!--            style="width: 100%"-->
<!--        />-->
<!--      </div>-->
<!--      <div>-->
<!--        <v-checkbox-->
<!--            v-model="firstPanelDataDH.top_must_pay"-->
<!--            label="ТОП освобождены от оплаты членских взносов в данном РО"-->
<!--            :disabled="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"-->
<!--        />-->
<!--      </div>-->
      <div class="form__field">
        <CommentFileComponent
            v-model:value="firstPanelDataDH.comment"
            name="firstPanelDataDH.comment"
            :file="fileNameDH"
            :fileType="fileTypeDH"
            :fileSize="fileSizeDH"
            :disabled="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"
            :is-error-file="isErrorFile"
            @change="uploadFileDH"
            @click="deleteFileDH"
            :is-error-panel="isErrorPanel"
            :is-sent="props.centralExpert || reportStore.isReportReject?.first || reportStore.isAllReportsVerifiedByCH"
            :rows="row"
        />
      </div>
    </template>

    <!--    third-->
    <template v-slot:thirdTab>
      <label class="form__label">Общая сумма уплаченных членских взносов РО <sup
          class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th">Данные РО</td>
          <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
          <td class="report-table__th">Корректировка ЦШ</td>
        </tr>
        <tr>
          <td class="report-table__td">{{ firstPanelData.amount_of_money }}</td>
          <td class="report-table__td report-table__td__center">{{ firstPanelDataDH.amount_of_money }}</td>
          <td
              :class="[
              'report-table__td',
              (reportStore.isReportReject?.first && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH ? 'report-table__td--bgcolor' : '']"
          >
            <InputReport
                v-model:value="firstPanelDataCH.amount_of_money"
                :id="'amount_of_moneyCH'"
                :name="'amount_of_moneyCH'"
                style="width: 100%;"
                type="number"
                placeholder="0"
                :maxlength="10"
                :min="0"
                :max="32767"
                :step="0.01"
                :is-error-panel="isErrorPanel"
                :disabled="(reportStore.isReportReject?.first && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
                :is-sent="reportStore.isReportReject?.first"
            />
          </td>
        </tr>
        </tbody>
      </v-table>
      <div>
        <CommentFileComponent
            v-model:value="firstPanelDataCH.comment"
            name="firstPanelDataDH.comment"
            :file="fileNameCH"
            :fileType="fileTypeCH"
            :fileSize="fileSizeCH"
            :is-error-file="isErrorFile"
            @change="uploadFileCH"
            @click="deleteFileCH"
            :is-error-panel="isErrorPanel"
            :disabled="(reportStore.isReportReject?.first && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
            :is-sent="(reportStore.isReportReject?.first && !props.centralExpert) || reportVerifiedByCH || reportStore.isAllReportsVerifiedByCH"
        />
      </div>
      <div v-if="!reportVerifiedByCH && !reportStore.isAllReportsVerifiedByCH">
        <v-checkbox
            v-model="reportStore.returnReport.first"
            @change="onReportReturn"
            label="Вернуть в РО на доработку"
            :disabled="reportStore.isReportReject?.first && !props.centralExpert"
        />
      </div>

    </template>
  </report-tabs>
</template>
<script setup>
import {ref, watch, watchEffect, watchPostEffect} from "vue";
import {InputReport, TextareaReport} from '@shared/components/inputs';
import {FileBoxComponent, CommentFileComponent} from "@entities/RatingRoComponents/components";
import {ReportRegionalForm} from '../../ReportRegionalHQPartOnePage/components/index'
import {getCurrentReport, getReportForSecond, reportPartTwoService} from "@services/ReportService.ts";
import {ReportTabs} from './index';
import {fileValidate} from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";
import {useRoute} from "vue-router";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  blockEditFirstReport: Boolean,
  isErrorPanel: {
    type: Boolean,
  },
  tab: String,
});

const emit = defineEmits(['getData', 'getDataDH', 'getDataCH']);

const defaultReportData = {
  // participants_number: '0',
  // employed_sso: '0',
  // employed_smo: '0',
  // employed_specialized_detachments: '0',
  // employed_spo: '0',
  // employed_sservo: '0',
  // employed_production_detachments: '0',
  // employed_sop: '0',
  // employed_ssho: '0',
  // employed_top: '0',
  comment: '',
  amount_of_money: '0',
  scan_file: '',
  file_type: '',
  file_size: '',
  detachment_number: '0',
  participants_with_payment: '0',
  foreign_participants: '0',
  top_participants: '0',
  sso_number: '0',
  sso_participants: '0',
  spo_number: '0',
  spo_participants: '0',
  sop_number: '0',
  sop_participants: '0',
  smo_number: '0',
  smo_participants: '0',
  sservo_number: '0',
  sservo_participants: '0',
  ssho_number: '0',
  ssho_participants: '0',
  specialized_detachment_number: '0',
  specialized_detachment_participants: '0',
  production_detachment_number: '0',
  production_detachment_participants: '0',
  top_detachment_number: '0',
  top_detachment_participants: '0',
  top_must_pay: false,
  foreign_must_pay: false,
};

let isErrorFile = ref(false);
const reportData = ref(defaultReportData);
const isFirstSent = ref(true);
const firstPanelData = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
  file_type: '',
  file_size: '',
  detachment_number: '',
  participants_with_payment: '',
  foreign_participants: '',
  top_participants: '',
  sso_number: '',
  sso_participants: '',
  spo_number: '',
  spo_participants: '',
  sop_number: '',
  sop_participants: '',
  smo_number: '',
  smo_participants: '',
  sservo_number: '',
  sservo_participants: '',
  ssho_number: '',
  ssho_participants: '',
  specialized_detachment_number: '',
  specialized_detachment_participants: '',
  production_detachment_number: '',
  production_detachment_participants: '',
  top_detachment_number: '',
  top_detachment_participants: '',
  top_must_pay: false,
  foreign_must_pay: false,
});
const firstPanelDataDH = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
  // foreign_participants: '',
  // top_must_pay: false,
  participants_with_payment: '',
});
const firstPanelDataCH = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
  foreign_participants: '',
  top_must_pay: false,
});
const isSent = ref(false);
const fileNameDH = ref(null);
const fileSizeDH = ref(null);
const fileTypeDH = ref(null);
const fileNameCH = ref(null);
const fileSizeCH = ref(null);
const fileTypeCH = ref(null);
const row = ref(1);
const reportVerifiedByCH = ref(false);

const focusOut = async () => {
  let formData = new FormData();
  // formData.append('comment', firstPanelData.value.comment || '');
  // formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');
  // formData.append('foreign_participants', firstPanelData.value.foreign_participants || '');
  // formData.append('top_must_pay', firstPanelData.value.top_must_pay);
  Object.keys(firstPanelData.value).forEach(key => {
    const value = firstPanelData.value[key];
    formData.append(key, value !== undefined && value !== null ? value : '');
  });

  if (firstPanelData.value.scan_file) formData.append('scan_file', firstPanelData.value.scan_file || '');
  try {
    if (isFirstSent.value) {
      const {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1)
    } else {
      const {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
    }
  } catch (e) {
    console.log(e)
  }

};
const uploadFile = async (event) => {
  let formData = new FormData();

  // formData.append('scan_file', event.target.files[0]);
  // formData.append('comment', firstPanelData.value.comment || '');
  // formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');
  // formData.append('foreign_participants', firstPanelData.value.foreign_participants || '');
  // formData.append('top_must_pay', firstPanelData.value.top_must_pay);

  Object.keys(firstPanelData.value).forEach(key => {
    const value = firstPanelData.value[key];
    formData.append(key, value !== undefined && value !== null ? value : '');
  });

  formData.append('scan_file', event.target.files[0]);
  firstPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
  firstPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);

  fileValidate(event.target.files[0], 7, isErrorFile);

  if (isErrorFile.value) {
    firstPanelData.value.scan_file = event.target.files[0].name;
  } else {
    if (isFirstSent.value) {
      let {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1);
      firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
    } else {
      let {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
      firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
    }
  }
};
const uploadFileDH = (event) => {
  if (event.target.files) {
    reportStore.reportDataDHFile.first = event.target.files[0];
    firstPanelDataDH.value.scan_file = event.target.files[0];
  }
};
const uploadFileCH = (event) => {
  if (event.target.files) {
    reportStore.reportDataCHFile.first = event.target.files[0];
    firstPanelDataCH.value.scan_file = event.target.files[0];

    fileNameCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.name : null;
    fileSizeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.size / Math.pow(1024, 2) : null;
    fileTypeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.type.split('/').at(-1) : null;
  }
}
const deleteFile = async () => {
  firstPanelData.value.scan_file = '';
  firstPanelData.value.file_size = '';
  firstPanelData.value.file_type = '';
  let formData = new FormData();

  Object.keys(firstPanelData.value).forEach(key => {
    const value = firstPanelData.value[key];
    formData.append(key, value !== undefined && value !== null ? value : '');
  });
  formData.append('scan_file', '');
  // formData.append('comment', firstPanelData.value.comment || '');
  // formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');
  // formData.append('foreign_participants', firstPanelData.value.foreign_participants || '');
  // formData.append('top_must_pay', firstPanelData.value.top_must_pay);

  if (isErrorFile.value) {
    firstPanelData.value.scan_file = "";
  } else {
    if (isFirstSent.value) {
      const {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1);
    } else {
      const {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
    }
  }
};
const deleteFileDH = () => {
  reportStore.reportDataDHFile.first = null;
  fileNameDH.value = null;
  fileTypeDH.value = null;
  fileSizeDH.value = null;

  let formData = new FormData();
  formData.append('comment', firstPanelDataDH.value.comment);
  formData.append('amount_of_money', firstPanelDataDH.value.amount_of_money);
  emit('getDataDH', formData, 1);
};
const deleteFileCH = () => {
  reportStore.reportDataCHFile.first = null;
  fileNameCH.value = null;
  fileSizeCH.value = null;
  fileTypeCH.value = null;
  reportStore.reportDataCH.first.scan_file = null;
  reportStore.reportDataCH.first.file_size = null;
  reportStore.reportDataCH.first.file_type = null;

  let formData = new FormData();
  formData.append('comment', firstPanelDataCH.value.comment);
  formData.append('amount_of_money', firstPanelDataCH.value.amount_of_money);
  if (reportStore.returnReport.first) formData.append('reasons[comment]', firstPanelDataCH.value.comment || '');

  emit('getDataCH', formData, 1);
};

const onReportReturn = (event) => {
  let formData = new FormData();
  if (event.target.checked) {
    reportStore.returnReport.first = true;
    formData.append('reasons[comment]', firstPanelDataCH.value.comment);
    formData.append('comment', firstPanelDataCH.value.comment);
    formData.append('amount_of_money', firstPanelDataCH.value.amount_of_money);
    formData.append('foreign_participants', firstPanelData.value.foreign_participants);
    formData.append('top_must_pay', firstPanelData.value.top_must_pay);
    if (reportStore.reportDataCHFile.first) {
      formData.append('scan_file', reportStore.reportDataCHFile.first);
    } else if (reportStore.reportDataCH.first.scan_file) {
      formData.append('scan_file', firstPanelDataCH.value.scan_file);
    }

    emit('getDataCH', formData, 1);
  } else {
    reportStore.returnReport.first = false;
    formData.append('comment', firstPanelDataCH.value.comment);
    formData.append('amount_of_money', firstPanelDataCH.value.amount_of_money);
    formData.append('foreign_participants', firstPanelData.value.foreign_participants);
    formData.append('top_must_pay', firstPanelData.value.top_must_pay);
    if (reportStore.reportDataCHFile.first) {
      formData.append('scan_file', reportStore.reportDataCHFile.first);
    } else if (reportStore.reportDataCH.first.scan_file) {
      formData.append('scan_file', firstPanelDataCH.value.scan_file);
    }

    emit('getDataCH', formData, 1);
  }
};

const route = useRoute()

watchEffect(async () => {
  try {
    if (!(props.centralExpert || props.districtExpert)) {
      const res = await getReportForSecond();
      reportData.value = res.data;
    } else {
      const res = await getCurrentReport(String(route.query.reportId));
      reportData.value = res.data;
    }
  } catch (e) {
    console.log(e)
  }

  if (props.data) {
    isFirstSent.value = false;
    // firstPanelData.value.comment = props.data.comment;
    // firstPanelData.value.amount_of_money = props.data.amount_of_money;
    // firstPanelData.value.foreign_participants = props.data.foreign_participants;
    // firstPanelData.value.top_must_pay = props.data.top_must_pay;
    // firstPanelData.value.scan_file = props.data.scan_file;
    // firstPanelData.value.file_type = props.data.file_type;
    // firstPanelData.value.file_size = props.data.file_size;
    Object.keys(firstPanelData.value).forEach(key => {
      if (props.data[key] !== undefined) {
        firstPanelData.value[key] = props.data[key];
      }
    });
    firstPanelData.value.scan_file = props.data.scan_file;
    firstPanelData.value.file_type = props.data.file_type;
    firstPanelData.value.file_size = props.data.file_size;
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.first && !props.data.central_version;
  }

  // Мапинг данных для отчета эксперта ОШ
  if (reportStore.reportDataDH.first && props.districtExpert) {
    // firstPanelDataDH.value.comment = reportStore.reportDataDH.first.comment || '';
    // firstPanelDataDH.value.amount_of_money = reportStore.reportDataDH.first.amount_of_money;
    // firstPanelDataDH.value.participants_with_payment = reportStore.reportDataDH.first.participants_with_payment;

    Object.keys(firstPanelDataDH.value).forEach(key => {
      if (reportStore.reportDataDH.first[key] !== undefined) {
        firstPanelDataDH.value[key] = reportStore.reportDataDH.first[key];
      }
    });

    fileNameDH.value = reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.name : null;
    fileTypeDH.value = reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.type.split('/').at(-1) : null;
    fileSizeDH.value = reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.size / Math.pow(1024, 2) : null;

    // row.value = reportStore.reportDataDH.first.comment ? reportStore.reportDataDH.first.comment.split('\n').length : 1;
  }

  // Мапинг данных для отчета эксперта ЦШ
  if (reportStore.reportForCheckCH.first && props.centralExpert) {
    // Добавление данных панели "отчет РО"
    if (reportStore.reportForCheckCH.first.rejecting_reasons) {
      firstPanelData.value.comment = reportStore.reportForCheckCH.first.comment;
      firstPanelData.value.amount_of_money = reportStore.reportForCheckCH.first.amount_of_money;
      firstPanelData.value.foreign_participants = reportStore.reportForCheckCH.first.foreign_participants;
      firstPanelData.value.top_must_pay = reportStore.reportForCheckCH.first.top_must_pay;
      firstPanelData.value.scan_file = reportStore.reportForCheckCH.first.scan_file || null;
      firstPanelData.value.file_type = reportStore.reportForCheckCH.first.file_type || null;
      firstPanelData.value.file_size = reportStore.reportForCheckCH.first.file_size || null;

      // Рефакторинг - добавлен код ниже, т.к. на вкл РО отображались данные ЦШ
      if (reportStore.reportForCheckCH.first.regional_version) {
        const reportDataRH = JSON.parse(reportStore.reportForCheckCH.first.regional_version);
        firstPanelData.value.comment = reportDataRH?.comment || '';
        firstPanelData.value.amount_of_money = reportDataRH?.amount_of_money;
        firstPanelData.value.foreign_participants = reportDataRH?.foreign_participants;
        firstPanelData.value.top_must_pay = reportDataRH?.top_must_pay;
        firstPanelData.value.scan_file = reportDataRH?.scan_file || null;
        firstPanelData.value.file_type = reportDataRH?.file_type || null;
        firstPanelData.value.file_size = reportDataRH?.file_size || null;
      }

      // Добавление данных панели "корректировка ОШ"
      const reportDataDH = JSON.parse(reportStore.reportForCheckCH.first.district_version);
      firstPanelDataDH.value.comment = reportDataDH.comment;
      firstPanelDataDH.value.amount_of_money = reportDataDH.amount_of_money;
      firstPanelDataDH.value.foreign_participants = reportDataDH.foreign_participants;
      firstPanelDataDH.value.top_must_pay = reportDataDH.top_must_pay;
      fileNameDH.value = reportDataDH.scan_file || '';
      fileTypeDH.value = reportDataDH.file_type || '';
      fileSizeDH.value = reportDataDH.file_size || '';

      // Добавление данных из стора для панели "корректировка ЦШ"
      if (reportStore.reportDataCH.first.central_version) {
        firstPanelDataCH.value.amount_of_money = reportStore.reportDataCH.first.central_version.amount_of_money;
        firstPanelDataCH.value.comment = reportStore.reportDataCH.first.central_version.comment || '';
        firstPanelDataCH.value.foreign_participants = reportStore.reportDataCH.first.central_version.foreign_participants || '';
        firstPanelDataCH.value.top_must_pay = reportStore.reportDataCH.first.central_version.top_must_pay;
        firstPanelDataCH.value.scan_file = reportStore.reportDataCH.first.central_version.scan_file;
        firstPanelDataCH.value.file_size = reportStore.reportDataCH.first.central_version.file_size;
        firstPanelDataCH.value.file_type = reportStore.reportDataCH.first.central_version.file_type;
        fileNameCH.value = reportStore.reportDataCH.first.central_version.scan_file;
        fileSizeCH.value = reportStore.reportDataCH.first.central_version.file_size;
        fileTypeCH.value = reportStore.reportDataCH.first.central_version.file_type;
      } else {
        firstPanelDataCH.value.amount_of_money = reportStore.reportDataCH.first.amount_of_money;
        firstPanelDataCH.value.comment = reportStore.reportDataCH.first.comment || '';
        firstPanelDataCH.value.foreign_participants = reportStore.reportDataCH.first.foreign_participants || '';
        firstPanelDataCH.value.top_must_pay = reportStore.reportDataCH.first.top_must_pay;
        firstPanelDataCH.value.scan_file = reportStore.reportDataCH.first.scan_file;
        firstPanelDataCH.value.file_size = reportStore.reportDataCH.first.file_size;
        firstPanelDataCH.value.file_type = reportStore.reportDataCH.first.file_type;
        fileNameCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.name : reportStore.reportDataCH.first.scan_file ? reportStore.reportDataCH.first.scan_file : null;
        fileSizeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.size / Math.pow(1024, 2) : reportStore.reportDataCH.first.file_size ? reportStore.reportDataCH.first.file_size : null;
        fileTypeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.type.split('/').at(-1) : reportStore.reportDataCH.first.file_type ? reportStore.reportDataCH.first.file_type : null;
      }


    } else {
      const reportDataRH = JSON.parse(reportStore.reportForCheckCH.first.regional_version);
      // firstPanelData.value.comment = reportDataRH?.comment || '';
      // firstPanelData.value.amount_of_money = reportDataRH?.amount_of_money;
      // firstPanelData.value.foreign_participants = reportDataRH?.foreign_participants;
      // firstPanelData.value.top_must_pay = reportDataRH?.top_must_pay;
      if (reportDataRH) {
        Object.keys(firstPanelData.value).forEach(key => {
          if (reportDataRH[key] !== undefined) {
            firstPanelData.value[key] = reportDataRH[key];
          }
        });
        // firstPanelData.value.scan_file = reportDataRH?.scan_file || null;
        // firstPanelData.value.file_type = reportDataRH?.file_type || null;
        // firstPanelData.value.file_size = reportDataRH?.file_size || null;
      }

      // Добавление данных панели "корректировка ОШ"
      firstPanelDataDH.value.comment = reportStore.reportForCheckCH.first.comment;
      firstPanelDataDH.value.amount_of_money = reportStore.reportForCheckCH.first.amount_of_money;
      firstPanelDataDH.value.foreign_participants = reportStore.reportForCheckCH.first.foreign_participants;
      firstPanelDataDH.value.top_must_pay = reportStore.reportForCheckCH.first.top_must_pay;
      fileNameDH.value = reportStore.reportForCheckCH.first.scan_file || '';
      fileTypeDH.value = reportStore.reportForCheckCH.first.file_type || '';
      fileSizeDH.value = reportStore.reportForCheckCH.first.file_size || '';

      // Добавление данных из стора для панели "корректировка ЦШ"
      firstPanelDataCH.value.amount_of_money = reportStore.reportDataCH.first.amount_of_money;
      firstPanelDataCH.value.comment = reportStore.reportDataCH.first.comment || '';
      firstPanelDataCH.value.foreign_participants = reportStore.reportDataCH.first.foreign_participants || '';
      firstPanelDataCH.value.top_must_pay = reportStore.reportDataCH.first.top_must_pay;
      fileNameCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.name : null;
      fileSizeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.size / Math.pow(1024, 2) : null;
      fileTypeCH.value = reportStore.reportDataCHFile.first ? reportStore.reportDataCHFile.first.type.split('/').at(-1) : null;
    }
  }

  // Мапинг данных для отчета командира РШ при возвращении на доработку
  if (reportStore.reportReject.first && (reportStore.isReportReject.first || reportStore.isAllReportsVerifiedByCH)) {
    // console.log('props.data', props.data)

    reportStore.returnReport.first = true;
    // Добавление данных панели "корректировка ОШ"
    const reportDataDH = JSON.parse(reportStore.reportReject.first.district_version);
    firstPanelDataDH.value.comment = reportDataDH.comment || '';
    firstPanelDataDH.value.amount_of_money = reportDataDH.amount_of_money;
    firstPanelDataDH.value.foreign_participants = reportDataDH.foreign_participants;
    firstPanelDataDH.value.top_must_pay = reportDataDH.top_must_pay;

    fileNameDH.value = reportDataDH.scan_file;
    fileTypeDH.value = reportDataDH.file_type;
    fileSizeDH.value = reportDataDH.file_size;

    // Добавление данных для панели "корректировка ЦШ"
    if (props.data.central_version) {
      // Отчет создан:
      firstPanelDataCH.value.amount_of_money = props.data.central_version.amount_of_money;
      firstPanelDataCH.value.comment = props.data.central_version.comment || '';
      firstPanelDataCH.value.foreign_participants = props.data.central_version.foreign_participants || '';
      firstPanelDataCH.value.top_must_pay = props.data.central_version.top_must_pay;

      fileNameCH.value = props.data.central_version.scan_file ? props.data.central_version.scan_file : null;
      fileSizeCH.value = props.data.central_version.file_size ? props.data.central_version.file_size : null;
      fileTypeCH.value = props.data.central_version.file_type ? props.data.central_version.file_type : null;
    } else {
      // Отчет не создан:
      firstPanelDataCH.value.amount_of_money = reportStore.reportReject.first.amount_of_money;
      firstPanelDataCH.value.comment = reportStore.reportReject.first.comment || '';
      firstPanelDataCH.value.foreign_participants = reportStore.reportReject.first.foreign_participants || '';
      firstPanelDataCH.value.top_must_pay = reportStore.reportReject.first.top_must_pay;

      fileNameCH.value = reportStore.reportReject.first.scan_file ? reportStore.reportReject.first.scan_file : null;
      fileSizeCH.value = reportStore.reportReject.first.file_size ? reportStore.reportReject.first.file_size : null;
      fileTypeCH.value = reportStore.reportReject.first.file_type ? reportStore.reportReject.first.file_type : null;
    }
  }
});

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    // firstPanelData.value.comment = props.data.comment;
    // firstPanelData.value.amount_of_money = props.data.amount_of_money;
    // firstPanelData.value.foreign_participants = props.data.foreign_participants;
    // firstPanelData.value.top_must_pay = props.data.top_must_pay;
    // firstPanelData.value.scan_file = props.data.scan_file || '';
    // firstPanelData.value.file_type = props.data.file_type || '';
    // firstPanelData.value.file_size = props.data.file_size || '';
    Object.keys(firstPanelData.value).forEach(key => {
      if (props.data[key] !== undefined) {
        firstPanelData.value[key] = props.data[key];
      }
    });
    firstPanelData.value.scan_file = props.data.scan_file || '';
    firstPanelData.value.file_type = props.data.file_type || '';
    firstPanelData.value.file_size = props.data.file_size || '';
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.first && !props.data.central_version;
  }
  reportVerifiedByCH.value = reportStore.reportForCheckCH.first?.verified_by_chq !== null;
});

watch(firstPanelDataDH.value, () => {
  reportStore.reportDataDH.first = firstPanelDataDH.value;

  let formData = new FormData();
  formData.append('comment', firstPanelDataDH.value.comment || '');
  formData.append('amount_of_money', firstPanelDataDH.value.amount_of_money);
  formData.append('foreign_participants', firstPanelDataDH.value.foreign_participants);
  formData.append('top_must_pay', firstPanelDataDH.value.top_must_pay);
  if (reportStore.reportDataDHFile.first) {
    formData.append('scan_file', reportStore.reportDataDHFile.first);

    fileNameDH.value = reportStore.reportDataDHFile.first.name;
    fileTypeDH.value = reportStore.reportDataDHFile.first.type.split('/').at(-1);
    fileSizeDH.value = reportStore.reportDataDHFile.first.size / Math.pow(1024, 2);
  } else {
    formData.append('scan_file', '');

    fileNameDH.value = null;
    fileTypeDH.value = null;
    fileSizeDH.value = null;
  }

  emit('getDataDH', formData, 1);
});

watch(firstPanelDataCH.value, () => {
  reportStore.reportDataCH.first = firstPanelDataCH.value;

  // console.log('reportStore.reportDataCH.first', reportStore.reportDataCH.first)

  let formData = new FormData();
  formData.append('comment', firstPanelDataCH.value.comment || '');
  formData.append('amount_of_money', firstPanelDataCH.value.amount_of_money);
  formData.append('foreign_participants', firstPanelDataCH.value.foreign_participants);
  formData.append('top_must_pay', firstPanelDataCH.value.top_must_pay);
  if (reportStore.reportDataCHFile.first) {
    formData.append('scan_file', reportStore.reportDataCHFile.first);
  } else if (reportStore.reportDataCH.first.scan_file) {
    formData.append('scan_file', reportStore.reportDataCH.first.scan_file);
  }
  if (reportStore.returnReport.first) formData.append('reasons[comment]', firstPanelDataCH.value.comment || '');

  emit('getDataCH', formData, 1);
});
</script>

<style lang="scss" scoped>
.fields__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: Bert Sans, sans-serif;
}

.form__field {
  margin: 0;
}

.form__field-report {
  display: flex;
  gap: 40px;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
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

.report__add-file {
  width: 100%;
}

.report__add-file-form-label {
  display: block;
  width: 232px;
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

.panel-card {
  box-shadow: none;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  /*padding: 0;*/
  border-radius: 10px;
  margin-bottom: 8px;
}

.valid-red {
  color: #db0000;
}

.v-tab-item--selected {
  background: #F3F4F5;
}

.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px;
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
    }
  }

  &__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8E8E93;

    &:not(:last-child) {
      background-color: #f9fafb;
    }

    &--bgcolor {
      background-color: #f9fafb;
    }

    &__center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
    }
  }
}
</style>
<style>
.v-tab--selected .v-tab__slider {
  width: 216px;
  height: 2px;
  left: initial;
  color: #E9E9E9;
  bottom: 10px;
}

.v-label {
  margin: initial;
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.1px;
  text-align: left;
  opacity: initial;
}

.v-selection-control__input {
  justify-content: initial;
  width: initial;
}

.v-selection-control__wrapper {
  width: initial;
}
</style>