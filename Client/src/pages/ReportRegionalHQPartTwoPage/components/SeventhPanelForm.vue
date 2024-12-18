<template>
    <v-card-text class="panel-card-text">
        <v-tabs-window
            v-if="!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander || (reportStore.isReportReject?.six[props.sixId] || reportStore.isReportReject?.ninth[props.ninthId]) || reportStore.isAllReportsVerifiedByCH) || (props.tab === 'Просмотр отправленного отчета' && (reportStore.isReportReject?.six[props.sixId] || reportStore.isReportReject?.ninth[props.ninthId]))">
            <!-- <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
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
                            <input :id="item.id" :value="item.value" :disabled="isSent" :name="item.name"
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
                        id="scan_file" :is-error-panel="isErrorPanel" name="scan_file" width="100%" height="auto"
                        v-model:value="seventhPanelData.document" @change="uploadFile($event, 7)"
                        :disabled="isSent || seventhPanelData.prize_place === 'Нет'" />

                    <FileBoxComponent v-else :file="seventhPanelData.document" :fileType="seventhPanelData.file_type"
                        :isSent="isSent" :fileSize="seventhPanelData.file_size" @click="deleteFile(7)"
                        :is-error-file="isErrorFile">
                    </FileBoxComponent>
                </div>

                <div class="form__field">
                    <label class="form__label mt-4" for="14">Ссылка на публикацию о победе
                        <sup class="valid-red">*</sup></label>
                    <div class="form__wrapper" v-for="(item, index) in seventhPanelData.links" :key="index">
                        <InputReport @focusout="focusOut" @error="setError" name="14" :is-link="true"
                            :disabled="isSent || seventhPanelData.prize_place === 'Нет'"
                            placeholder="Введите ссылку, например,  https://vk.com/cco_monolit" :maxlength="200"
                            v-model:value="item.link" :is-error-panel="isErrorPanel" class="mb-2" />
                        <div v-if="!isSent && seventhPanelData.prize_place !== 'Нет'">
                            <div class="add_link" @click="addLink(7)"
                                v-if="seventhPanelData.links.length === index + 1">
                                + Добавить ссылку
                            </div>
                            <div class="add_link" @click="deleteLink(7)" v-else>
                                Удалить поле ввода
                            </div>
                        </div>


                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                    <TextareaReport v-model:value="seventhPanelData.comment" id="comment" name="comment" :rows="1"
                        autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                        :disabled="isSent || seventhPanelData.prize_place === 'Нет'" max-length-text="3000"
                        counter-visible />
                </div>
                <div class="form__field-result" style="display: flex; align-items: center;">
                    <v-checkbox class="result-checkbox" id="v-checkbox" />

                    <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
                </div>
                <div class="hr"></div>
                <div class="form__field-result result-count">
                    <p>0</p>
                </div>
            </div> -->
            <div v-if="props.panel_number == 6" class="form__field-group group-seventh">
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
                        :disabled="isSentSix" :is-error-panel="isErrorPanel" :is-link="false"
                        placeholder="Введите число" id="15" name="14" class="form__input number_input" type="number"
                        :max="32767" />
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Ссылка на социальные сети/ электронные<br>
                        СМИ, подтверждающая участие в мероприятии
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in sixPanelData.links" :key="index">
                        <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                            @focusout="focusOut" :is-error-panel="isErrorPanel" @error="setError"
                            :disabled="isSentSix || (sixPanelData.number_of_members == 0 || sixPanelData.number_of_members === null)"
                            :maxlength="200" name="link" v-model:value="item.link" :is-link="true" class="mb-2" />

                        <div v-if="!isSentSix && sixPanelData.number_of_members > 0">
                            <div class="add_link" @click="addLink(6)" v-if="sixPanelData.links.length === index + 1">
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
                    <TextareaReport v-model:value="sixPanelData.comment" id="comment" name="comment" :rows="1"
                        autoResize placeholder="Напишите сообщение" @focusout="focusOut" :maxlength="3000"
                        :disabled="isSentSix || (sixPanelData.number_of_members == 0 || sixPanelData.number_of_members === null)"
                        :max-length-text="3000" counter-visible />

                </div>
            </div>
            <div v-else-if="props.panel_number == 9" class="form__field-group group-seventh">
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
                        Проведение мероприятия <sup class="valid-red">*</sup>
                    </p>

                    <div class="places_wrap">
                        <div class="places_item" v-for="item in events" :key="item.id">
                            <input :id="item.id" :value="item.value" :name="item.name" :disabled="isSentNinth"
                                :checked="ninthPanelData.event_happened == item.value" class="form__input places_input"
                                type="radio" @focusout="focusOut" v-model="ninthPanelData.event_happened" />
                            <label class="places_item_label" :for="id">{{
                                item.name
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="report__fieldset report__fieldset--right-block">
                    <label class="form__label report__label mb-2" for="scan_file">
                        Скан документа, подтверждающего проведение акции
                    </label>
                    <InputReport v-if="!ninthPanelData.document" isFile type="file" accept=".jpg, .jpeg, .png, .pdf"
                        id="scan_file" :is-error-panel="isErrorPanel" v-model:value="ninthPanelData.document"
                        name="scan_file" width="100%" :disabled="isSentNinth || ninthPanelData.event_happened === false"
                        height="auto" @change="uploadFile($event, 9)" />
                    <div v-else-if="ninthPanelData.document && (typeof ninthPanelData.document !== 'string')"
                        class="text-center">
                        <v-progress-circular color="primary" indeterminate></v-progress-circular>
                    </div>
                    <FileBoxComponent v-else-if="ninthPanelData.document && typeof ninthPanelData.document === 'string'"
                        :file="ninthPanelData.document" :fileType="ninthPanelData.file_type" :isSent="isSentNinth"
                        :is-error-file="isErrorFile" :fileSize="ninthPanelData.file_size" @click="deleteFile(9)">
                    </FileBoxComponent>
                </div>

                <div class="form__field">
                    <label class="form__label mt-4" for="14">Ссылка на социальные сети/ электронные
                        СМИ, подтверждающая проведение акции
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in ninthPanelData.links" :key="index">
                        <InputReport @focusout="focusOut" @error="setError"
                            :disabled="isSentNinth || ninthPanelData.event_happened === false" name="14"
                            :maxlength="200" :is-error-panel="isErrorPanel" :is-link="true"
                            placeholder="Введите ссылку, например, https://vk.com/cco_monolit" v-model:value="item.link"
                            class="mb-2" />
                        <div v-if="!isSentNinth && ninthPanelData.event_happened === true">
                            <div class="add_link" @click="addLink(9)" v-if="ninthPanelData.links.length === index + 1">
                                + Добавить ссылку
                            </div>
                            <div class="add_link" @click="deleteLink(9)" v-else>
                                Удалить поле ввода
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="14">Комментарий</label>
                    <TextareaReport v-model:value="ninthPanelData.comment" id="comment" name="comment" :rows="1"
                        autoResize placeholder="Напишите сообщение" @focusout="focusOut" :maxlength="3000"
                        :max-length-text="3000" counter-visible
                        :disabled="isSentNinth || ninthPanelData.event_happened === false" />
                </div>
                <div class="form__field-result" style="display: flex; align-items: center;">
                    <v-checkbox class="result-checkbox" id="v-checkbox" />
                    <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
                </div>
                <div class="hr"></div>
                <div class="form__field-result result-count">
                    <p>0</p>
                </div>
            </div>
        </v-tabs-window>
        <report-tabs
            v-else-if="(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) ||
                (props.tab === 'Доработка' && (reportStore.isReportReject.six[props.sixId] || reportStore.isReportReject.ninth[props.ninthId])) || reportStore.isAllReportsVerifiedByCH"
            :isReject="(reportStore.isReportReject.six[props.sixId] || reportStore.isReportReject.ninth[props.ninthId])">
            <template v-slot:firstTab>
                <!-- <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
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
                                    :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
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
                            @change="uploadFile"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                        <FileBoxComponent v-else :file="seventhPanelData.document" :isSent="isSent"
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
                            <div v-if="!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)">
                                <div class="add_link" @click="addLink(7)"
                                    v-if="seventhPanelData.links.length === index + 1">
                                    + Добавить ссылку
                                </div>
                                <div class="add_link" @click="deleteLink(7)" v-else>
                                    Удалить поле ввода
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                        <TextareaReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            v-model:value="seventhPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                            placeholder="Комментарий" @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
                            counter-visible />
                    </div>
                    <div class="form__field-result" style="display: flex; align-items: center;">
                        <v-checkbox class="result-checkbox" id="v-checkbox" />
                        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
                    </div>
                    <div class="hr"></div>
                    <div class="form__field-result result-count">
                        <p>0</p>
                    </div>
                </div> -->
                <div v-if="props.panel_number == 6" class="group-seventh">
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
                        <InputReport v-model:value="sixPanelData.number_of_members" placeholder="Введите число" id="15"
                            name="14" @focusout="focusOut" class="form__input number_input" type="number"
                            :maxlength="10" :max="32767" :disabled="isDataRHDisabled" />
                    </div>
                    <div class="form__field" v-if="sixPanelData?.links?.length > 0">
                        <label class="form__label" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая участие в мероприятии
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in sixPanelData?.links" :key="index">
                            <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                :is-link="true" @focusout="focusOut" :disabled="isDataRHDisabled" name="14"
                                v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport :disabled="isDataRHDisabled" v-model:value="sixPanelData.comment" id="comment"
                            name="comment" :rows="1" autoResize placeholder="Напишите сообщение" @focusout="focusOut"
                            :maxlength="3000" :max-length-text="3000" counter-visible />
                    </div>
                </div>
                <div v-else-if="props.panel_number == 9" class="group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places mt-4">
                        <p class="form__label">
                            Проведение мероприятия
                            <sup class="valid-red">*</sup>
                        </p>


                        <!-- <div class="places_wrap" v-if="isRejected">
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name" :disabled="isDataRHDisabled"
                                    :checked="ninthPanelData.event_happened == item.value"
                                    class="form__input places_input" type="radio" @focusout="focusOut"
                                    v-model="ninthPanelData.event_happened" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                    }}</label>
                            </div>
                        </div>

                        <div v-else class="places_wrap one_place">
                            <input :id="12" :value="ninthPanelData.event_happened" @focusout="focusOut" :name="12"
                                :disabled="isDataRHDisabled" :checked="ninthPanelData.event_happened === true ||
                                    ninthPanelData.event_happened === false
                                    " class="form__input places_input" type="radio"
                                v-model="ninthPanelData.event_happened" />
                            <label v-if="ninthPanelData.event_happened === true" class="places_item_label"
                                :for="id">Да</label>
                            <label v-else-if="ninthPanelData.event_happened === false" class="places_item_label"
                                :for="id">Нет</label>
                        </div> -->

                        <div class="places_wrap" :class="{ 'one_place': !isRejected }">
                            <template v-if="isRejected">
                                <div v-for="item in events" :key="item.id" class="places_item">
                                    <input :id="item.id" :value="item.value" :name="item.name"
                                        :disabled="isDataRHDisabled"
                                        :checked="ninthPanelData.event_happened === item.value"
                                        class="form__input places_input" type="radio" @focusout="focusOut"
                                        v-model="ninthPanelData.event_happened" />
                                    <label :for="item.id" class="places_item_label">{{ item.name }}</label>
                                </div>
                            </template>
                            <template v-else>
                                <input id="event_happened" :value="ninthPanelData.event_happened" :name="event_happened"
                                    :disabled="isDataRHDisabled"
                                    :checked="ninthPanelData.event_happened === true || ninthPanelData.event_happened === false"
                                    class="form__input places_input" type="radio" @focusout="focusOut"
                                    v-model="ninthPanelData.event_happened" />
                                <label :for="event_happened" class="places_item_label">
                                    {{ ninthPanelData.event_happened ? 'Да' : 'Нет' }}
                                </label>
                            </template>
                        </div>


                    </div>
                    <div class="report__fieldset report__fieldset--right-block"
                        v-if="ninthPanelData.document !== null || ninthPanelData.document !== ''">
                        <label class="form__label report__label mb-2" for="scan_file">
                            Скан документа, подтверждающего проведение акции
                        </label>
                        <InputReport :disabled="isDataRHDisabled" @change="uploadFile($event, 9)"
                            v-if="!ninthPanelData.document && (props.tab !== 'Просмотр отправленного отчета')" isFile
                            type="file" accept=".jpg, .jpeg, .png, .pdf" id="scan_file" name="scan_file" width="100%"
                            height="auto" />
                        <FileBoxComponent v-if="ninthPanelData.document" :file="ninthPanelData.document"
                            :fileType="ninthPanelData.file_type" :isSent="isDataRHDisabled"
                            :fileSize="ninthPanelData.file_size" @click="deleteFile(9)">
                        </FileBoxComponent>
                    </div>

                    <div class="form__field" v-if="ninthPanelData?.links?.length > 0">
                        <label class="form__label mt-4" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая проведение акции
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in ninthPanelData?.links" :key="index">
                            <InputReport @focusout="focusOut" :disabled="isDataRHDisabled" name="14" :is-link="true"
                                placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field" v-if="ninthPanelData.comment !== null || ninthPanelData.comment !== ''">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport @focusout="focusOut" :disabled="isDataRHDisabled"
                            v-model:value="ninthPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                            placeholder="Напишите сообщение" :maxlength="3000" :max-length-text="3000"
                            counter-visible />
                    </div>
                </div>
            </template>
            <template v-slot:secondTab>
                <!-- <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
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
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
                        <TextareaReport v-model:value="seventhPanelData.comment" id="comment" name="comment" :rows="1"
                            autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                            :max-length-text="3000" counter-visible />
                    </div>
                    <div class="form__field-result" style="display: flex; align-items: center;">
                        <v-checkbox class="result-checkbox" id="v-checkbox" />
                        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
                    </div>
                    <div class="hr"></div>
                    <div class="form__field-result result-count">
                        <p>0</p>
                    </div>
                </div> -->
                <div v-if="props.panel_number == 6" class="group-seventh">
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
                        <InputReport v-model:value="sixPanelDataDH.number_of_members" placeholder="Введите число"
                            id="15" name="14" class="form__input number_input" :is-error-panel="isErrorPanel"
                            :disabled="isDataDHDDisabled" type="number" :maxlength="10" :max="32767" />
                    </div>

                    <CommentFileComponent v-model:value="sixPanelDataDH.comment" :is-error-panel="isErrorPanel"
                        :disabled="isDataDHDDisabled" :is-six="true" name="sixPanelDataDH.comment">
                    </CommentFileComponent>
                </div>
                <div v-else-if="props.panel_number == 9" class="group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <div class="form__field places mt-4">
                        <p class="form__label">
                            Проведение мероприятия <sup class="valid-red">*</sup>
                        </p>

                        <div class="places_wrap">
                            <div v-for="option in ['true', 'false']" :key="option" class="places_item">
                                <input v-model="ninthPanelDataDH.event_happened" :id="`event_happenedDH-${option}`"
                                    class="form__input places_input" type="radio" :value="option === 'true'"
                                    :disabled="isDataDHDDisabled" />
                                <label :for="`event_happenedDH-${option}`">
                                    {{ option === 'true' ? 'Да' : 'Нет' }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <CommentFileComponent v-model:value="ninthPanelDataDH.comment" name="ninthPanelDataDH.comment"
                        @change="uploadFile($event, 9)" @click="deleteFile(9)" :file="fileDH.name"
                        :fileType="fileDH.type" :fileSize="fileDH.size" :disabled="isDataDHDDisabled"
                        :is-error-file="isErrorFile" :is-error-panel="isErrorPanel" :is-sent="isDataDHDDisabled">
                    </CommentFileComponent>
                </div>
            </template>
            <template v-slot:thirdTab>
                <!-- <div v-if="props.panel_number == 7" class="form__field-group group-seventh">
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
                        <TextareaReport v-model:value="seventhPanelData.comment" id="comment" name="comment" :rows="1"
                            autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                            :max-length-text="3000" counter-visible />
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
                </div> -->
                <div v-if="props.panel_number == 6" class=" group-seventh">
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
                    <ReportTable label="Количество человек, принявших участие в мероприятии" class="mb-4"
                        name="sixPanelData.number_of_members" :dataRH="sixPanelData.number_of_members"
                        :dataDH="sixPanelDataDH.number_of_members" v-model:value="sixPanelDataCH.number_of_members"
                        :maxlength="10" :min="0" :max="2147483647" :is-error-panel="isErrorPanel"
                        :disabled="isSixPanelCHDisabled">
                    </ReportTable>

                    <CommentFileComponent v-model:value="sixPanelDataCH.comment" name="sixPanelDataCH.comment"
                        :is-six="true" :CH="true" :is-error-panel="isErrorPanel" :disabled="isSixPanelCHDisabled">
                    </CommentFileComponent>
                    <div>
                        <v-checkbox v-if="!reportStore.isAllReportsVerifiedByCH"
                            v-model="reportStore.returnReport.six[props.sixId]" @change="returnForReviewSix"
                            :disabled="isSixPanelCHDisabled" label="Вернуть в РО на доработку" />
                    </div>
                </div>
                <div v-else-if="props.panel_number == 9" class="group-seventh form__field-group-panel-ninth">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <ReportTable label="Проведение мероприятия " name="ninthPanelData.event_happened"
                        :dataRH="ninthPanelData.event_happened" :is-ninth-panel="true"
                        :dataDH="ninthPanelDataDH.event_happened" v-model:value="ninthPanelDataCH.event_happened"
                        :is-error-panel="isErrorPanel" :disabled="isNinthPanelCHDisabled">
                    </ReportTable>

                    <div class="form__field places mt-4 mb-4">
                        <p class="form__label">
                            Проведение мероприятия <sup class="valid-red">*</sup>
                        </p>

                        <div class="places_wrap">
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    :checked="ninthPanelDataCH.event_happened == item.value"
                                    :disabled="isNinthPanelCHDisabled" class="form__input places_input" type="radio"
                                    v-model="ninthPanelDataCH.event_happened" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <CommentFileComponent v-model:value="ninthPanelDataCH.comment" name="ninthPanelDataCH.comment"
                        @change="uploadFile($event, 9)" @click="deleteFile(9)" :CH="true" :file="fileCH.name"
                        :fileType="fileCH.type" :fileSize="fileCH.size" :is-error-file="isErrorFile"
                        :is-error-panel="isErrorPanel" :disabled="isNinthPanelCHDisabled"
                        :is-sent="isNinthPanelCHDisabled">
                    </CommentFileComponent>
                    <div>
                        <v-checkbox v-if="!reportStore.isAllReportsVerifiedByCH"
                            v-model="reportStore.returnReport.ninth[props.ninthId]" @change="returnForReviewNinth"
                            :disabled="isNinthPanelCHDisabled" label="Вернуть в РО на доработку" />
                    </div>
                </div>
            </template>
        </report-tabs>
    </v-card-text>
</template>
<script setup>
import { ref, watchEffect, watch, watchPostEffect, handleError, onMounted, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import {
    FileBoxComponent,
    CommentFileComponent,
    ReportTable,
} from '@entities/RatingRoComponents/components';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { SvgIcon } from '@shared/ui';
import { ReportTabs } from './index';
import { reportPartTwoService } from '@services/ReportService.ts';
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";
const props = defineProps({
    title: Object,
    panel_number: [String, Number],
    isDisabled: Boolean,
    isSecondTab: Boolean,
    isThirdTab: Boolean,
    isCentralHeadquarterCommander: Boolean,
    isDistrictHeadquarterCommander: Boolean,
    id: [String, Number],
    sixId: [String, Number],
    ninthId: String,
    tab: String,
    isSentSix: Boolean,
    isSentNinth: Boolean,
    isErrorPanel: Boolean,
    data: Object,
    dataDH: Object,
    dataCH: Object,
});

const emit = defineEmits(['collapse-form', 'formData', 'formDataDH', 'formDataCH', 'uploadFile', 'getId', 'getPanelNumber', 'deleteFile', 'deleteFileDH', 'error']);

const collapseForm = () => {
    emit('collapse-form');
};

const reportStore = useReportPartTwoStore();
let isErrorFile = ref(false);
const isFirstSentSix = ref(true);
// const isFirstSentSeventh = ref(true);
const isRevision = ref(false);
const isFirstSentNinth = ref(true);
const isLinkError = ref(false);

const scanFile = ref([]);

const setError = (err) => {
    isLinkError.value = err;
    console.log('errorr', err);
}

const isNinthPanelCHDisabled = computed(() => {
    return !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) ||
        reportStore.reportForCheckCH.ninth[props.ninthId]?.verified_by_chq;
});

const isSixPanelCHDisabled = computed(() => {
    return !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.six[props.sixId]?.verified_by_chq
})

const isDataDHDDisabled = computed(() => {
    return props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)
})
const isDataRHDisabled = computed(() => {
    return props.tab === 'Просмотр отправленного отчета' && (props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)
})

// const seventhPanelData = ref({
//     prize_place: 'Нет',
//     links: [{
//         link: '',
//     }],
//     document: '',
//     file_size: null,
//     file_type: '',
//     comment: '',
// });

const ninthPanelData = ref({
    event_happened: false,
    links: [{
        link: '',
    }],
    document: '',
    file_size: null,
    file_type: '',
    comment: '',
})
const ninthPanelDataDH = ref({
    event_happened: false,
    links: [{
        link: '',
    }],
    document: '',
    file_size: null,
    file_type: '',
    comment: '',
})

const sixPanelData = ref({
    number_of_members: 0,
    links: [{
        link: '',
    }],
    comment: '',
});
const sixPanelDataDH = ref({
    number_of_members: 0,
    links: [{
        link: '',
    }],
    comment: '',

});

const sixPanelDataCH = ref({
    number_of_members: 0,
    links: [{
        link: '',
    }],
    comment: '',
});

const ninthPanelDataCH = ref({
    event_happened: false,
    links: [{
        link: '',
    }],
    document: '',
    file_size: null,
    file_type: '',
    comment: '',
});

const fileDH = ref({
    name: '',
    type: '',
    size: null,
})

const fileCH = ref({
    name: '',
    type: '',
    size: null,
})


// const prize_places = ref([
//     { name: '1', value: 1, id: 'pp1' },
//     { name: '2', value: 2, id: 'pp2' },
//     { name: '3', value: 3, id: 'pp3' },
//     { name: 'Нет', value: 'Нет', id: 'pp4' },
// ]);

const events = ref([
    { name: 'Да', value: true, id: 'pp1' },
    { name: 'Нет', value: false, id: 'pp2' },
])

const isReturn = ref(false);

const appendLinksToFormData = (formData, links, isDH = false) => {
    if (links.length) {
        for (let i = 0; i < links.length; i++) {
            if (isDH) {
                formData.append(`[links][${i}][link]`, links[i].link);
            } else {
                !links[i].link
                    ? formData.append(`[links][${i}][link]`, '')
                    : formData.append(`[links][${i}][link]`, links[i].link);
            }
        }
    }
};
const returnForReview = (event, panelData, panelType, panelId) => {
    let formData = new FormData();
    if (panelType === 'six') {
        formData.append('number_of_members', panelData.value.number_of_members);
        formData.append('comment', panelData.value.comment || '');
    } else if (panelType === 'ninth') {
        formData.append('event_happened', panelData.value.event_happened);
        formData.append('comment', panelData.value.comment || '');
        formData.append('document', reportStore.reportDataCHFile.ninth[panelId] || '');
    }
    if (event.target.checked) {
        reportStore.returnReport[panelType][panelId] = true;
        formData.append('reasons[comment]', panelData.value.comment);
    } else {
        reportStore.returnReport[panelType][panelId] = false;
    }

    emit('formDataCH', formData);
}

const returnForReviewSix = (event) => {
    returnForReview(event, sixPanelDataCH, 'six', props.sixId);
}

const returnForReviewNinth = (event) => {
    returnForReview(event, ninthPanelDataCH, 'ninth', props.ninthId);
}

// const returnForReviewSix = (event) => {
//     let formData = new FormData();
//     formData.append('number_of_members', sixPanelDataCH.value.number_of_members);
//     formData.append('comment', sixPanelDataCH.value.comment || '');
//     if (event.target.checked) {
//         reportStore.returnReport.six[props.sixId] = true;
//         formData.append('reasons[comment]', sixPanelDataCH.value.comment);
//     } else {
//         reportStore.returnReport.six[props.sixId] = false;
//     }
//     emit('formDataCH', formData);
// }

// const returnForReviewNinth = (event) => {
//     let formData = new FormData();
//     formData.append('event_happened', ninthPanelDataCH.value.event_happened);
//     formData.append('comment', ninthPanelDataCH.value.comment || '');
//     formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
//     if (event.target.checked) {
//         reportStore.returnReport.ninth[props.ninthId] = true;
//         formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
//     } else {
//         reportStore.returnReport.ninth[props.ninthId] = false;
//     }
//     emit('formDataCH', formData);
// }

const handleFile = (file, panelType, panelId) => {
    // Назначаем файл в соответствующее хранилище данных  
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDHFile[panelType][panelId] = file;
        fileDH.value.name = file.name;
        fileDH.value.type = file.type.split('/').at(-1);
        fileDH.value.size = file.size / Math.pow(1024, 2);
    } else if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCHFile[panelType][panelId] = file;
        fileCH.value.name = file.name;
        fileCH.value.type = file.type.split('/').at(-1);
        fileCH.value.size = file.size / Math.pow(1024, 2);
    }
};

const uploadFile = (event, number) => {
    if (number === 9 && event.target.files) {
        const file = event.target.files[0];
        fileValidate(file, 9, isErrorFile); // Проверка файла на ошибки  

        if (isErrorFile.value) {
            console.log('error');
            scanFile.value = file;
            ninthPanelData.value.document = scanFile.value.name;
            handleFile(null, 'ninth', props.ninthId); // Обнуляем файл в случае ошибки  
        } else {
            handleFile(file, 'ninth', props.ninthId); // Обработать файл без ошибок  
            let formData = new FormData();
            formData.append('event_happened', ninthPanelData.value.event_happened);
            formData.append('document', file);
            appendLinksToFormData(formData, ninthPanelData.value.links);
            if (ninthPanelData.value.comment !== null) {
                formData.append('comment', ninthPanelData.value.comment);
            }
            emit('uploadFile', formData); // Отправка данных на сервер  
        }
    }
}
// const uploadFile = (event, number) => {
//     if (number === 9) {
//         if (event.target.files) {
//             fileValidate(event.target.files[0], 9, isErrorFile);
//             if (isErrorFile.value) {
//                 console.log('error');
//                 scanFile.value = event.target.files[0];
//                 ninthPanelData.value.document = scanFile.value.name;
//                 if (props.isDistrictHeadquarterCommander) {
//                     reportStore.reportDataDHFile.ninth[props.ninthId] = null;
//                     fileDH.value.name = event.target.files[0].name;
//                     fileDH.value.type = event.target.files[0].type.split('/').at(-1);
//                     fileDH.value.size = event.target.files[0].size / Math.pow(1024, 2);
//                 }
//                 else if (props.isCentralHeadquarterCommander) {
//                     reportStore.reportDataCHFile.ninth[props.ninthId] = null;
//                     fileCH.value.name = event.target.files[0].name;
//                     fileCH.value.type = event.target.files[0].type.split('/').at(-1);
//                     fileCH.value.size = event.target.files[0].size / Math.pow(1024, 2);
//                 }
//             } else {
//                 if (props.isDistrictHeadquarterCommander) {
//                     reportStore.reportDataDHFile.ninth[props.ninthId] = event.target.files[0];
//                 } else if (props.isCentralHeadquarterCommander) {
//                     reportStore.reportDataCHFile.ninth[props.ninthId] = event.target.files[0];
//                 } else {
//                     let formData = new FormData();
//                     formData.append('event_happened', ninthPanelData.value.event_happened);
//                     formData.append('document', event.target.files[0]);
//                     appendLinksToFormData(formData, ninthPanelData.value.links);
//                     if (ninthPanelData.value.comment !== null) {
//                         formData.append('comment', ninthPanelData.value.comment);
//                     }
//                     emit('uploadFile', formData);
//                 }

//             }
//         }
//     }
// }

const clearFileData = (panelType, panelId) => {
    if (panelType === 'DH') {
        fileDH.value.name = null;
        reportStore.reportDataDHFile.ninth[panelId] = null;
    } else if (panelType === 'CH') {
        fileCH.value.name = null;
        reportStore.reportDataCHFile.ninth[panelId] = null;
    }
};

const prepareFormDataForDeletion = () => {
    const formData = new FormData();
    formData.append('event_happened', ninthPanelData.value.event_happened);
    formData.append('document', '');
    appendLinksToFormData(formData, ninthPanelData.value.links);
    if (ninthPanelData.value.comment !== null) {
        formData.append('comment', ninthPanelData.value.comment);
    }
    formData.append('file_size', ninthPanelData.value.file_size);
    formData.append('file_type', ninthPanelData.value.file_type);
    return formData;
};

const deleteFile = (number) => {
    if (number === 9) {
        if (props.isDistrictHeadquarterCommander) {
            clearFileData('DH', props.ninthId);
        } else if (props.isCentralHeadquarterCommander) {
            clearFileData('CH', props.ninthId);
        } else {
            ninthPanelData.value.document = '';
            const formData = prepareFormDataForDeletion();
            emit('deleteFile', formData);
        }
    }
};

// const deleteFile = (number) => {
//     let formData = new FormData();
//     if (number === 9) {
//         if (props.isDistrictHeadquarterCommander) {
//             fileDH.value.name = null;
//             reportStore.reportDataDHFile.ninth[props.ninthId] = null;
//         } else if (props.isCentralHeadquarterCommander) {
//             fileCH.value.name = null;
//             reportStore.reportDataCHFile.ninth[props.ninthId] = null;
//         } else {
//             ninthPanelData.value.document = '';
//             formData.append('event_happened', ninthPanelData.value.event_happened);
//             formData.append('document', '');
//             appendLinksToFormData(formData, ninthPanelData.value.links);
//             if (ninthPanelData.value.comment !== null) {
//                 formData.append('comment', ninthPanelData.value.comment);
//             }
//             formData.append('file_size', ninthPanelData.value.file_size);
//             formData.append('file_type', ninthPanelData.value.file_type);
//             emit('deleteFile', formData);
//         }
//     }
// }
const isRejected = ref(false);


const createFormDataForNinthPanel = () => {
    const formData = new FormData();
    formData.append('event_happened', ninthPanelData.value.event_happened);
    formData.append('document', ninthPanelData.value.document || '');
    appendLinksToFormData(formData, ninthPanelData.value.links);
    formData.append('comment', ninthPanelData.value.comment || '');
    formData.append('file_size', ninthPanelData.value.file_size || null);
    formData.append('file_type', ninthPanelData.value.file_type || '');
    return formData;
};

const focusOut = () => {
    try {
        if (props.panel_number === 6) {
            emit('formData', sixPanelData.value);

        } else if (props.panel_number === 9) {
            if (isFirstSentNinth.value === true) {
                emit('formData', ninthPanelData.value);
            } else {
                if (ninthPanelData.value.event_happened === false && props.tab !== 'Доработка') {
                    // Сбрасываем данные для случая, когда событие не произошло  
                    ninthPanelData.value.document = '';
                    ninthPanelData.value.links = [];
                    ninthPanelData.value.file_size = null;
                    ninthPanelData.value.file_type = '';
                    ninthPanelData.value.comment = '';
                }

                // Создаем FormData для 9 панели и эмитируем  
                const formData = createFormDataForNinthPanel();
                emit('formData', formData);
            }
        }
    } catch (e) {
        console.log('data', e.response.data);
    }
};

// const focusOut = () => {
//     if (props.panel_number == 6) {
//         try {
//             emit('formData', sixPanelData.value);

//         } catch (e) {
//             console.log('data', e.response.data);
//         }
//     }
//     else if (props.panel_number == 9) {
//         try {
//             if (isFirstSentNinth.value === true) {
//                 emit('formData', ninthPanelData.value)
//             } else {
//                 if (ninthPanelData.value.event_happened === false) {
//                     if (props.tab !== 'Доработка') {
//                         let formData = new FormData();
//                         ninthPanelData.value.document = '';
//                         ninthPanelData.value.links = [];
//                         ninthPanelData.value.file_size = null;
//                         ninthPanelData.value.file_type = '';
//                         ninthPanelData.value.comment = '';
//                         formData.append('event_happened', ninthPanelData.value.event_happened);
//                         formData.append('document', '');
//                         appendLinksToFormData(formData, ninthPanelData.value.links);
//                         formData.append('comment', ninthPanelData.value.comment);
//                         formData.append('file_size', ninthPanelData.value.file_size);
//                         formData.append('file_type', ninthPanelData.value.file_type);
//                         emit('formData', formData);
//                     }
//                 }
//                 let formData = new FormData();
//                 if (ninthPanelData.value.comment !== null) {
//                     formData.append('comment', ninthPanelData.value.comment);
//                 }
//                 formData.append('event_happened', ninthPanelData.value.event_happened);
//                 appendLinksToFormData(formData, ninthPanelData.value.links);

//                 emit('formData', formData)
//             }
//         } catch (e) {
//             console.log('data', e.response.data);
//         }
//     }
// }

const panelDataMap = {
    6: sixPanelData,
    9: ninthPanelData
};

const addLink = (number) => {
    const panelData = panelDataMap[number];
    if (panelData) {
        panelData.value.links.push({ link: '' });
    }
};

const deleteLink = async (number) => {
    const panelData = panelDataMap[number];
    if (panelData) {
        panelData.value.links.pop();
        await reportPartTwoService.createMultipleReportDraft(panelData.value, number.toString(), props.id, number === 9);
    }
};

// Функция для обработки ошибок ссылки  
const handleLinkError = () => {
    emit('error', isLinkError.value ? isLinkError.value : false);
};

watchEffect(() => {
    const isPanelSix = props.panel_number == 6;
    const isPanelNine = props.panel_number == 9;
    const isCommander = props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander;

    if (isPanelSix) {
        handlePanelSix();
    } else if (isPanelNine) {
        handlePanelNine();
    }

    function handlePanelSix() {
        if (isCommander) {
            updateSixPanelData();
        } else {
            initializeSixPanelData();
        }

        if (reportStore.reportReject.six[props.sixId] && reportStore.isReportReject.six[props.sixId]) {
            reportStore.returnReport.six[props.sixId] = true;
        }

        emitPanelInfo();
    }

    function handlePanelNine() {
        if (isCommander) {
            updateNinthPanelData();
        } else {
            initializeNinthPanelData();
        }

        handleFileProcessing();

        if (reportStore.reportReject.ninth[props.ninthId] && reportStore.isReportReject.ninth[props.ninthId]) {
            reportStore.returnReport.ninth[props.ninthId] = true;
        }

        emitPanelInfo();
    }

    function updateSixPanelData() {
        sixPanelData.value = { ...props.data };
        updatePanelData(sixPanelDataDH, reportStore.reportDataDH.six, props.sixId);
        updatePanelData(sixPanelDataCH, reportStore.reportDataCH.six, props.sixId);
    }

    function initializeSixPanelData() {
        if (Object.keys(props.data).length > 0) {
            isFirstSentSix.value = false;
            sixPanelData.value = { ...props.data };

            if (props.data?.rejecting_reasons !== null) {
                updatePanelData(sixPanelDataDH, reportStore.reportDataDH.six, props.sixId);
                updatePanelData(sixPanelDataCH, reportStore.reportDataCH.six, props.sixId);
            }

            emit('error', isLinkError.value || false);

            if (!sixPanelData.value.links.length) {
                sixPanelData.value.links.push({ link: '' });
            }
        } else {
            console.log('data not received');
        }
    }

    function updateNinthPanelData() {
        ninthPanelData.value = { ...props.data };
        updatePanelData(ninthPanelDataDH, reportStore.reportDataDH.ninth, props.ninthId);
        updatePanelData(ninthPanelDataCH, reportStore.reportDataCH.ninth, props.ninthId);
    }

    function initializeNinthPanelData() {
        if (Object.keys(props.data).length > 0) {
            isFirstSentNinth.value = false;
            ninthPanelData.value = { ...props.data };
            emit('error', isLinkError.value || false);

            if (props.tab == 'Доработка') {
                isRejected.value = true;
                updatePanelData(ninthPanelDataDH, reportStore.reportDataDH.ninth, props.ninthId);
                updatePanelData(ninthPanelDataCH, reportStore.reportDataCH.ninth, props.ninthId);
            }

            if (!ninthPanelData.value.links.length) {
                ninthPanelData.value.links.push({ link: '' });
            }
        } else {
            console.log('data not received');
            isFirstSentNinth.value = true;
            ninthPanelData.value = {
                event_happened: false,
                links: [{ link: '' }],
                comment: '',
                file_size: '',
                file_type: '',
            };
        }
    }

    function handleFileProcessing() {
        if (props.isDistrictHeadquarterCommander) {
            processFile(fileDH, reportStore.reportDataDHFile.ninth, props.ninthId);
        } else if (props.isCentralHeadquarterCommander) {
            processFile(fileDH, reportStore.reportDataDH.ninth, props.ninthId, true);
            processCentralFile();
        }
    }

    function processCentralFile() {
        const chData = reportStore.reportForCheckCH.ninth[props.ninthId];
        if (chData.verified_by_chq === true) {
            processFile(fileCH, reportStore.reportForCheckCH.ninth, props.ninthId, true);
        } else if (chData.rejecting_reasons && !reportStore.reportDataCHFile.ninth[props.ninthId]) {
            processFile(fileCH, chData.central_version, props.ninthId, true, true);
        } else {
            processFile(fileCH, reportStore.reportDataCHFile.ninth, props.ninthId);
        }
    }

    function processFile(file, data, id, isDirect = false, isOptional = false) {
        if (isDirect || data[id]) {
            file.value.name = data[id]?.name || data[id]?.document || '';
            file.value.type = (data[id]?.type || data[id]?.file_type || '').split('/').at(-1);
            file.value.size = (data[id]?.size || data[id]?.file_size || 0) / Math.pow(1024, 2);
        } else if (!isOptional) {
            file.value.name = '';
            file.value.type = '';
            file.value.size = 0;
        }
    }

    function updatePanelData(panelData, reportData, id) {
        if (reportData[id]) {
            panelData.value.comment = reportData[id].comment;
            panelData.value.number_of_members = reportData[id].number_of_members;
            panelData.value.event_happened = reportData[id].event_happened;
            panelData.value.links = reportData[id].links;
        }
    }

    function emitPanelInfo() {
        emit('getId', props.id);
        emit('getPanelNumber', props.panel_number);
    }
}, {
    flush: 'post'
});

watchPostEffect(() => {
    if (!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)) {
        const panelMap = {
            6: {
                data: reportStore.reportDataDH.six[props.sixId],
                dataCH: reportStore.reportDataCH.six[props.sixId],
                isReportReject: reportStore.isReportReject.six[props.sixId],
                returnReport: reportStore.returnReport.six,
                panelDataDH: sixPanelDataDH,
                panelDataCH: sixPanelDataCH
            },
            9: {
                data: reportStore.reportDataDH.ninth[props.ninthId],
                dataCH: reportStore.reportDataCH.ninth[props.ninthId],
                isReportReject: reportStore.isReportReject.ninth[props.ninthId],
                returnReport: reportStore.returnReport.ninth,
                panelDataDH: ninthPanelDataDH,
                panelDataCH: ninthPanelDataCH,
                fileDH: fileDH,
                fileCH: fileCH,
                documentKey: 'document',
                typeKey: 'file_type',
                sizeKey: 'file_size'
            }
        };

        const panel = panelMap[props.panel_number];

        if (panel) {
            panel.panelDataDH.value = panel.data;
            panel.panelDataCH.value = panel.dataCH;

            if (panel.documentKey) {
                // For panel number 9, update the file data  
                panel.fileDH.value.name = panel.data.document;
                panel.fileDH.value.type = panel.data.file_type;
                panel.fileDH.value.size = panel.data.file_size;

                panel.fileCH.value.name = panel.dataCH.document;
                panel.fileCH.value.type = panel.dataCH.file_type;
                panel.fileCH.value.size = panel.dataCH.file_size;
            }

            // Set return report status  
            panel.returnReport[props.ninthId || props.sixId] = panel.isReportReject || false;
        }
    }
});


// Function to create FormData from specified panel data  
const createFormData = (panelData, reportData, fileData, returnReportCondition) => {
    let formData = new FormData();
    formData.append('event_happened', panelData.event_happened);
    formData.append('comment', panelData.comment || '');
    appendLinksToFormData(formData, panelData.links, true);
    formData.append('document', fileData || '');

    if (returnReportCondition) {
        formData.append('reasons[comment]', panelData.comment);
    }
    return formData;
};

// Watchers for DH and CH panels  
watch(sixPanelDataDH.value, (newValue) => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.six[props.sixId] = newValue;
        emit('formDataDH', newValue);
    }
});

watch(sixPanelDataCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.six[props.sixId] = sixPanelDataCH.value;
        let formData = createFormData(sixPanelDataCH.value, reportStore.reportDataCH.six, reportStore.returnReport.six[props.sixId]);
        emit('formDataCH', formData);
    }
});

watch(ninthPanelDataCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;

        let formData = createFormData(ninthPanelDataCH.value, reportStore.reportDataCH.ninth, reportStore.reportDataCHFile.ninth[props.ninthId], reportStore.returnReport.ninth[props.ninthId]);
        emit('formDataCH', formData);
    }
});


// Watchers for ninth panel data  
watch(ninthPanelDataDH.value, (newValue) => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.ninth[props.ninthId] = newValue;

        let formData = createFormData(newValue, reportStore.reportDataDH.ninth, reportStore.reportDataDHFile.ninth[props.ninthId], reportStore.returnReport.ninth[props.ninthId]);
        emit('formDataDH', formData);
    }
});

watch(fileDH.value, () => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.ninth[props.ninthId] = ninthPanelDataDH.value;

        let formData = createFormData(ninthPanelDataDH.value, reportStore.reportDataDH.ninth, reportStore.reportDataDHFile.ninth[props.ninthId], reportStore.returnReport.ninth[props.ninthId]);
        emit('formDataDH', formData);
    }
});

watch(fileCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;

        let formData = createFormData(ninthPanelDataCH.value, reportStore.reportDataCH.ninth, reportStore.reportDataCHFile.ninth[props.ninthId], reportStore.returnReport.ninth[props.ninthId]);
        emit('formDataCH', formData);
    }
});



// watch(sixPanelDataDH.value, (newValue) => {
//     if (props.isDistrictHeadquarterCommander) {
//         reportStore.reportDataDH.six[props.sixId] = newValue;
//         emit('formDataDH', newValue);
//     }
// });

// watch(sixPanelDataCH.value, () => {
//     if (props.isCentralHeadquarterCommander) {
//         reportStore.reportDataCH.six[props.sixId] = sixPanelDataCH.value;
//         let formData = new FormData();
//         formData.append('number_of_members', sixPanelDataCH.value.number_of_members);
//         formData.append('comment', sixPanelDataCH.value.comment || '');
//         appendLinksToFormData(formData, sixPanelDataCH.value.links, true);
//         if (reportStore.returnReport.six[props.sixId]) formData.append('reasons[comment]', sixPanelDataCH.value.comment);
//         emit('formDataCH', formData);
//     }
// });


// watch(ninthPanelDataDH.value, (newValue) => {
//     if (props.isDistrictHeadquarterCommander) {
//         reportStore.reportDataDH.ninth[props.ninthId] = newValue;

//         let formData = new FormData();
//         formData.append('event_happened', newValue.event_happened);
//         formData.append('comment', newValue.comment || '');
//         appendLinksToFormData(formData, ninthPanelDataDH.value.links, true);
//         formData.append('document', reportStore.reportDataDHFile.ninth[props.ninthId] || '');
//         if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
//         emit('formDataDH', formData);
//     }

// });

// watch(fileDH.value, () => {
//     if (props.isDistrictHeadquarterCommander) {
//         reportStore.reportDataDH.ninth[props.ninthId] = ninthPanelDataDH.value;

//         let formData = new FormData();
//         formData.append('event_happened', ninthPanelDataDH.value.event_happened);
//         formData.append('comment', ninthPanelDataDH.value.comment || '');
//         appendLinksToFormData(formData, ninthPanelDataDH.value.links, true);
//         formData.append('document', reportStore.reportDataDHFile.ninth[props.ninthId] || '');
//         emit('formDataDH', formData);
//     }
// });

// watch(fileCH.value, () => {
//     if (props.isCentralHeadquarterCommander) {
//         reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;

//         let formData = new FormData();
//         formData.append('event_happened', ninthPanelDataCH.value.event_happened);
//         formData.append('comment', ninthPanelDataCH.value.comment || '');
//         appendLinksToFormData(formData, ninthPanelDataCH.value.links, true);
//         formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
//         if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
//         emit('formDataCH', formData);
//     }
// });

// watch(ninthPanelDataCH.value, () => {
//     if (props.isCentralHeadquarterCommander) {
//         reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;
//         let formData = new FormData();
//         formData.append('event_happened', ninthPanelDataCH.value.event_happened);
//         formData.append('comment', ninthPanelDataCH.value.comment || '');
//         appendLinksToFormData(formData, ninthPanelDataCH.value.links, true);
//         formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
//         if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
//         emit('formDataCH', formData);
//     }
// });
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