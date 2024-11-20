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
                    <!-- <p>{{ !isSentSix && sixPanelData.number_of_members > 0 }}</p> -->

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
                            :maxlength="10" :max="32767"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                    </div>
                    <div class="form__field" v-if="sixPanelData?.links?.length > 0">
                        <label class="form__label" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая участие в мероприятии
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in sixPanelData?.links" :key="index">
                            <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                :is-link="true" @focusout="focusOut"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                                name="14" v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            v-model:value="sixPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                            placeholder="Напишите сообщение" @focusout="focusOut" :maxlength="3000"
                            :max-length-text="3000" counter-visible />
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


                        <div class="places_wrap" v-if="isRejected">
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name" :disabled="props.isCentralHeadquarterCommander ||
                                    props.isDistrictHeadquarterCommander"
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
                                :disabled="props.isCentralHeadquarterCommander ||
                                    props.isDistrictHeadquarterCommander

                                    " :checked="ninthPanelData.event_happened === true ||
                                        ninthPanelData.event_happened === false
                                        " class="form__input places_input" type="radio"
                                v-model="ninthPanelData.event_happened" />
                            <label v-if="ninthPanelData.event_happened === true" class="places_item_label"
                                :for="id">Да</label>
                            <label v-else-if="ninthPanelData.event_happened === false" class="places_item_label"
                                :for="id">Нет</label>
                        </div>


                    </div>
                    <div class="report__fieldset report__fieldset--right-block"
                        v-if="ninthPanelData.document !== null || ninthPanelData.document !== ''">
                        <label class="form__label report__label mb-2" for="scan_file">
                            Скан документа, подтверждающего проведение акции
                        </label>
                        <InputReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            @change="uploadFile($event, 9)" v-if="!ninthPanelData.document" isFile type="file"
                            accept=".jpg, .jpeg, .png, .pdf" id="scan_file" name="scan_file" width="100%"
                            height="auto" />
                        <FileBoxComponent v-else :file="ninthPanelData.document" :fileType="ninthPanelData.file_type"
                            :isSent="props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander"
                            :fileSize="ninthPanelData.file_size" @click="deleteFile(9)">
                        </FileBoxComponent>
                    </div>

                    <div class="form__field" v-if="ninthPanelData?.links?.length > 0">
                        <label class="form__label mt-4" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая проведение акции
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in ninthPanelData?.links" :key="index">
                            <InputReport @focusout="focusOut"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                                name="14" :is-link="true"
                                placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field" v-if="ninthPanelData.comment !== null || ninthPanelData.comment !== ''">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport @focusout="focusOut"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
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
                            :disabled="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)"
                            type="number" :maxlength="10" :max="32767" />
                    </div>

                    <CommentFileComponent v-model:value="sixPanelDataDH.comment" :is-error-panel="isErrorPanel"
                        :disabled="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)"
                        :is-six="true" name="sixPanelDataDH.comment">
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
                            <div class="places_item">
                                <input v-model="ninthPanelDataDH.event_happened" id="event_happenedDH-true"
                                    class="form__input places_input" type="radio" :value="true"
                                    :disabled="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)" />
                                <label for="event_happenedDH-true">Да</label>
                            </div>
                            <div class="places_item">
                                <input v-model="ninthPanelDataDH.event_happened" id="event_happenedDH-true"
                                    class="form__input places_input" type="radio" :value="false"
                                    :disabled="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)" />
                                <label for="event_happenedDH-true">Нет</label>
                            </div>
                        </div>
                    </div>
                    <!-- <CommentFileComponent v-model:value="ninthPanelDataDH.comment" name="ninthPanelDataDH.comment"
                        @change="uploadFile($event, 9)" @click="deleteFile(9)"
                        :file="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.name : null"
                        :fileType="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.type.split('/').at(-1) : null"
                        :fileSize="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.size / Math.pow(1024, 2) : null"
                        :disabled="props.isCentralHeadquarterCommander" :is-error-file="isErrorFile"
                        :is-error-panel="isErrorPanel">
                    </CommentFileComponent> -->
                    <CommentFileComponent v-model:value="ninthPanelDataDH.comment" name="ninthPanelDataDH.comment"
                        @change="uploadFile($event, 9)" @click="deleteFile(9)" :file="fileDH.name"
                        :fileType="fileDH.type" :fileSize="fileDH.size"
                      :disabled="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)"
                        :is-error-file="isErrorFile" :is-error-panel="isErrorPanel"
                        :is-sent="props.isCentralHeadquarterCommander || !(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander)">
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
                        :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.six[props.sixId]?.verified_by_chq">
                    </ReportTable>

                    <CommentFileComponent v-model:value="sixPanelDataCH.comment" name="sixPanelDataCH.comment"
                        :is-six="true" :CH="true" :is-error-panel="isErrorPanel"
                        :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.six[props.sixId]?.verified_by_chq">
                    </CommentFileComponent>
                    <div>
                        <v-checkbox v-if="!reportStore.isAllReportsVerifiedByCH"
                            v-model="reportStore.returnReport.six[props.sixId]" @change="returnForReviewSix"
                            :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.six[props.sixId]?.verified_by_chq"
                            label="Вернуть в РО на доработку" />
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
                        :is-error-panel="isErrorPanel"
                        :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq">
                    </ReportTable>

                    <div class="form__field places mt-4 mb-4">
                        <p class="form__label">
                            Проведение мероприятия <sup class="valid-red">*</sup>
                        </p>

                        <div class="places_wrap">
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    :checked="ninthPanelDataCH.event_happened == item.value"
                                    :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq"
                                    class="form__input places_input" type="radio"
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
                        :is-error-panel="isErrorPanel"
                        :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq"
                        :is-sent="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq">
                    </CommentFileComponent>
                    <div>
                        <v-checkbox v-if="!reportStore.isAllReportsVerifiedByCH"
                            v-model="reportStore.returnReport.ninth[props.ninthId]" @change="returnForReviewNinth"
                            :disabled="!(props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) || reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq"
                            label="Вернуть в РО на доработку" />
                    </div>
                </div>
            </template>
        </report-tabs>
    </v-card-text>
</template>
<script setup>
import { ref, watchEffect, watch, watchPostEffect, handleError, onMounted } from 'vue';
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
    // isSent: Boolean,
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

const returnForReviewSix = (event) => {
    let formData = new FormData();
    formData.append('number_of_members', sixPanelDataCH.value.number_of_members);
    formData.append('comment', sixPanelDataCH.value.comment || '');
    if (event.target.checked) {
        reportStore.returnReport.six[props.sixId] = true;
        formData.append('reasons[comment]', sixPanelDataCH.value.comment);
    } else {
        reportStore.returnReport.six[props.sixId] = false;
    }
    emit('formDataCH', formData);
}

const returnForReviewNinth = (event) => {
    let formData = new FormData();
    formData.append('event_happened', ninthPanelDataCH.value.event_happened);
    formData.append('comment', ninthPanelDataCH.value.comment || '');
    formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
    if (event.target.checked) {
        reportStore.returnReport.ninth[props.ninthId] = true;
        formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
    } else {
        reportStore.returnReport.ninth[props.ninthId] = false;
    }
    emit('formDataCH', formData);
}
const uploadFile = (event, number) => {
    // if (number === 7) {
    //     fileValidate(event.target.files[0], 7, isErrorFile);
    //     if (isErrorFile.value) {
    //         console.log('error');
    //         scanFile.value = event.target.files[0];
    //         seventhPanelData.value.document = scanFile.value.name;
    //     }
    //     else {
    //         let formData = new FormData();
    //         formData.append('prize_place', seventhPanelData.value.prize_place);
    //         formData.append('document', event.target.files[0]);
    //         if (seventhPanelData.value.links.length) {
    //             for (let i = 0; i < seventhPanelData.value.links.length; i++) {
    //                 !seventhPanelData.value.links[i].link
    //                     ? formData.append(`[links][${i}][link]`, '')
    //                     : formData.append(`[links][${i}][link]`, seventhPanelData.value.links[i].link);
    //             }
    //         }
    //         formData.append('comment', seventhPanelData.value.comment);
    //         console.log('comment', formData);
    //         emit('uploadFile', formData);
    //     }
    if (number === 9) {
        if (event.target.files) {
            fileValidate(event.target.files[0], 9, isErrorFile);
            if (isErrorFile.value) {
                console.log('error');
                scanFile.value = event.target.files[0];
                ninthPanelData.value.document = scanFile.value.name;
                if (props.isDistrictHeadquarterCommander) {
                    reportStore.reportDataDHFile.ninth[props.ninthId] = null;
                    fileDH.value.name = event.target.files[0].name;
                    fileDH.value.type = event.target.files[0].type.split('/').at(-1);
                    fileDH.value.size = event.target.files[0].size / Math.pow(1024, 2);
                }
                else if (props.isCentralHeadquarterCommander) {
                    reportStore.reportDataCHFile.ninth[props.ninthId] = null;
                    fileCH.value.name = event.target.files[0].name;
                    fileCH.value.type = event.target.files[0].type.split('/').at(-1);
                    fileCH.value.size = event.target.files[0].size / Math.pow(1024, 2);
                }
            } else {
                if (props.isDistrictHeadquarterCommander) {
                    reportStore.reportDataDHFile.ninth[props.ninthId] = event.target.files[0];
                    console.log('fileDH', reportStore.reportDataDHFile.ninth[props.ninthId])
                } else if (props.isCentralHeadquarterCommander) {
                    reportStore.reportDataCHFile.ninth[props.ninthId] = event.target.files[0];
                    console.log('fileCH', reportStore.reportDataCHFile.ninth[props.ninthId])
                } else {
                    let formData = new FormData();
                    formData.append('event_happened', ninthPanelData.value.event_happened);
                    formData.append('document', event.target.files[0]);
                    if (ninthPanelData.value.links.length) {
                        for (let i = 0; i < ninthPanelData.value.links.length; i++) {
                            !ninthPanelData.value.links[i].link
                                ? formData.append(`[links][${i}][link]`, '')
                                : formData.append(`[links][${i}][link]`, ninthPanelData.value.links[i].link);
                        }
                    }
                    if (ninthPanelData.value.comment !== null) {
                        formData.append('comment', ninthPanelData.value.comment);
                    }
                    emit('uploadFile', formData);
                }

            }
        }
    }


}

const deleteFile = (number) => {
    let formData = new FormData();
    // if (number === 7) {
    //     seventhPanelData.value.document = '';
    //     formData.append('prize_place', seventhPanelData.value.prize_place);
    //     formData.append('document', '');
    //     if (seventhPanelData.value.links.length) {
    //         for (let i = 0; i < seventhPanelData.value.links.length; i++) {
    //             !seventhPanelData.value.links[i].link
    //                 ? formData.append(`[links][${i}][link]`, '')
    //                 : formData.append(`[links][${i}][link]`, seventhPanelData.value.links[i].link);
    //         }
    //     }
    //     formData.append('comment', seventhPanelData.value.comment);
    //     formData.append('file_size', seventhPanelData.value.file_size);
    //     formData.append('file_type', seventhPanelData.value.file_type);

    //     emit('deleteFile', formData);
    //     // emit('formData', formData)
    // } 
    if (number === 9) {
        if (props.isDistrictHeadquarterCommander) {
            fileDH.value.name = null;
            reportStore.reportDataDHFile.ninth[props.ninthId] = null;
        } else if (props.isCentralHeadquarterCommander) {
            fileCH.value.name = null;
            reportStore.reportDataCHFile.ninth[props.ninthId] = null;
        } else {
            ninthPanelData.value.document = '';
            formData.append('event_happened', ninthPanelData.value.event_happened);
            formData.append('document', '');
            if (ninthPanelData.value.links.length) {
                for (let i = 0; i < ninthPanelData.value.links.length; i++) {
                    !ninthPanelData.value.links[i].link
                        ? formData.append(`[links][${i}][link]`, '')
                        : formData.append(`[links][${i}][link]`, ninthPanelData.value.links[i].link);
                }
            }
            if (ninthPanelData.value.comment !== null) {
                formData.append('comment', ninthPanelData.value.comment);
            }
            formData.append('file_size', ninthPanelData.value.file_size);
            formData.append('file_type', ninthPanelData.value.file_type);
            emit('deleteFile', formData);
        }
    }

}
const isRejected = ref(false);

const focusOut = () => {
    if (props.panel_number == 6) {
        try {
            emit('formData', sixPanelData.value);

        } catch (e) {
            console.log('data', e.response.data);
        }
    }
    // else if (props.panel_number == 7) {
    //     try {
    //         if (isFirstSentSeventh.value) {
    //             console.log('7', '1')
    //             emit('formData', seventhPanelData.value)
    //         } else {
    //             if (seventhPanelData.value.prize_place == 'Нет') {
    //                 let formData = new FormData();
    //                 seventhPanelData.value.document = '';
    //                 seventhPanelData.value.links = [];
    //                 seventhPanelData.value.file_size = null;
    //                 seventhPanelData.value.file_type = '';
    //                 seventhPanelData.value.comment = '';
    //                 formData.append('prize_place', seventhPanelData.value.prize_place);
    //                 formData.append('document', '');
    //                 if (seventhPanelData.value.links.length) {
    //                     for (let i = 0; i < seventhPanelData.value.links.length; i++) {
    //                         !seventhPanelData.value.links[i].link
    //                             ? formData.append(`[links][${i}][link]`, '')
    //                             : formData.append(`[links][${i}][link]`, seventhPanelData.value.links[i].link);
    //                     }
    //                 }
    //                 formData.append('comment', seventhPanelData.value.comment);
    //                 formData.append('file_size', seventhPanelData.value.file_size);
    //                 formData.append('file_type', seventhPanelData.value.file_type);
    //                 emit('formData', formData);
    //             }

    //             let formData = new FormData();
    //             formData.append('comment', seventhPanelData.value.comment);
    //             formData.append('prize_place', seventhPanelData.value.prize_place);

    //             for (let i = 0; i < seventhPanelData.value.links.length; i++) {
    //                 !seventhPanelData.value.links[i].link
    //                     ? formData.append(`[links][${i}][link]`, '')
    //                     : formData.append(`[links][${i}][link]`, seventhPanelData.value.links[i].link);
    //             }

    //             // emit('isSent', isFirstSent.value)
    //             emit('formData', formData)
    //             console.log('7', '2')

    //         }
    //     } catch (e) {
    //         console.log('data', e.response.data);

    //     }

    // }
    else if (props.panel_number == 9) {
        try {
            if (isFirstSentNinth.value === true) {
                console.log('9', '1')
                // if (isRevision.value) {
                //     let formData = new FormData();
                //     formData.append("scan_file", тштерPanelData.value.scan_file || '');
                //     formData.append("file_size", eleventhPanelData.value.file_size || '');
                //     formData.append("file_type", eleventhPanelData.value.file_type || '');
                // }
                emit('formData', ninthPanelData.value)
            } else {
                if (ninthPanelData.value.event_happened === false) {
                    if (props.tab !== 'Доработка') {
                        let formData = new FormData();
                        ninthPanelData.value.document = '';
                        ninthPanelData.value.links = [];
                        ninthPanelData.value.file_size = null;
                        ninthPanelData.value.file_type = '';
                        ninthPanelData.value.comment = '';
                        formData.append('event_happened', ninthPanelData.value.event_happened);
                        formData.append('document', '');
                        if (ninthPanelData.value.links.length) {
                            for (let i = 0; i < ninthPanelData.value.links.length; i++) {
                                !ninthPanelData.value.links[i].link
                                    ? formData.append(`[links][${i}][link]`, '')
                                    : formData.append(`[links][${i}][link]`, ninthPanelData.value.links[i].link);
                            }
                        }
                        formData.append('comment', ninthPanelData.value.comment);
                        formData.append('file_size', ninthPanelData.value.file_size);
                        formData.append('file_type', ninthPanelData.value.file_type);
                        emit('formData', formData);
                    }

                }
                let formData = new FormData();
                if (ninthPanelData.value.comment !== null) {
                    formData.append('comment', ninthPanelData.value.comment);
                }
                formData.append('event_happened', ninthPanelData.value.event_happened);
                if (ninthPanelData.value.links.length) {
                    for (let i = 0; i < ninthPanelData.value.links.length; i++) {
                        !ninthPanelData.value.links[i].link
                            ? formData.append(`[links][${i}][link]`, '')
                            : formData.append(`[links][${i}][link]`, ninthPanelData.value.links[i].link);
                    }
                }

                emit('formData', formData)
                console.log('9', '2')
            }

        } catch (e) {
            console.log('data', e.response.data);
        }

    }

}
const addLink = (number) => {
    if (number == 6) {
        sixPanelData.value.links.push({ link: '' });
        // } else if (number == 7) {
        //     seventhPanelData.value.links.push({ link: '' });
        // }
    }
    else if (number == 9) {
        ninthPanelData.value.links.push({ link: '' });
    }
};

const deleteLink = async (number) => {
    if (number == 6) {
        sixPanelData.value.links.pop()
        await reportPartTwoService.createMultipleReportDraft(sixPanelData.value, '6', props.id);
        // } else if (number == 7) {
        //     seventhPanelData.value.links.pop()
        //     await reportPartTwoService.createMultipleReportDraft(seventhPanelData.value, '7', props.id, true);
    } else if (number == 9) {
        ninthPanelData.value.links.pop()
        await reportPartTwoService.createMultipleReportDraft(ninthPanelData.value, '9', props.id, true);
    }

};

watchEffect(() => {
    if (props.panel_number == 6) {

        if (props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) {
            sixPanelData.value = { ...props.data };
            if (reportStore.reportDataDH.six[props.sixId]) {
                sixPanelDataDH.value.comment = reportStore.reportDataDH.six[props.sixId].comment;
                sixPanelDataDH.value.number_of_members = reportStore.reportDataDH.six[props.sixId].number_of_members;
                sixPanelDataDH.value.links = reportStore.reportDataDH.six[props.sixId].links;

            }
            if (reportStore.reportDataCH.six[props.sixId]) {
                sixPanelDataCH.value.comment = reportStore.reportDataCH.six[props.sixId].comment;
                sixPanelDataCH.value.number_of_members = reportStore.reportDataCH.six[props.sixId].number_of_members;
                sixPanelDataCH.value.links = reportStore.reportDataCH.six[props.sixId].links;
            }

            // if (props.isCentralHeadquarterCommander) {
            //     if (reportStore.reportForCheckCH.six[props.sixId]?.rejecting_reasons.length > 0) {
            //         reportStore.returnReport.six[props.sixId] = true;
            //     }
            // }
            // sixPanelDataCH.value = { ...props.dataCH };
        } else {
            if (Object.keys(props.data).length > 0) {
                isFirstSentSix.value = false;
                // isRevision.value = reportStore.isReportReject.six[props.sixId];
                sixPanelData.value = { ...props.data };
                console.log('data', sixPanelData.value)


                if (props.data?.rejecting_reasons !== null) {

                    console.log('data6dh', reportStore.reportDataDH.six[props.sixId])
                    sixPanelDataDH.value.comment = reportStore.reportDataDH.six[props.sixId]?.comment;
                    sixPanelDataDH.value.number_of_members = reportStore.reportDataDH.six[props.sixId]?.number_of_members;
                    sixPanelDataDH.value.links = reportStore.reportDataDH.six[props.sixId]?.links;

                    sixPanelDataCH.value.comment = reportStore.reportDataCH.six[props.sixId]?.comment;
                    sixPanelDataCH.value.number_of_members = reportStore.reportDataCH.six[props.sixId]?.number_of_members;
                    sixPanelDataCH.value.links = reportStore.reportDataCH.six[props.sixId]?.links;
                }


                if (isLinkError.value) {
                    emit('error', isLinkError.value);
                } else {
                    emit('error', false);
                }
                if (!sixPanelData.value.links.length)
                    sixPanelData.value.links.push({ link: '' });

                // isFirstSentSix.value = reportStore.isReportReject.six[props.sixId] && !props.data.central_version;
                // console.log('isFirstSent при доработке 6', isFirstSentSix.value);
                // if (reportStore.isReportReject.six[props.sixId]) {
                //     reportStore.returnReport.six[props.sixId] = true;
                // }
            } else {
                console.log('data not received');
            }
        }

        if (reportStore.reportReject.six[props.sixId] && reportStore.isReportReject.six[props.sixId]) {
            reportStore.returnReport.six[props.sixId] = true;
        }


        emit('getId', props.id);
        emit('getPanelNumber', props.panel_number);
        // } else if (props.panel_number == 7) {
        //     if (Object.keys(props.data).length > 0) {
        //         console.log('7')
        //         isFirstSentSeventh.value = false;
        //         seventhPanelData.value = { ...props.data }
        //         if (isLinkError.value) {
        //             emit('error', isLinkError.value)
        //         } else {
        //             emit('error', false)
        //         }

        //         if (!seventhPanelData.value.links.length) seventhPanelData.value.links.push({ link: '' })

        //     }
        //     else {
        //         console.log('data not received');
        //         isFirstSentSeventh.value = true;
        //         seventhPanelData.value = {
        //             prize_place: 'Нет',
        //             document: '',
        //             links: [{
        //                 link: '',
        //             }],
        //             comment: '',
        //         };
        //     }
        //     emit('getId', props.id)
        //     emit('getPanelNumber', props.panel_number)

    } else if (props.panel_number == 9) {
        if (props.isDistrictHeadquarterCommander || props.isCentralHeadquarterCommander) {
            ninthPanelData.value = { ...props.data };
            if (reportStore.reportDataDH.ninth[props.ninthId]) {
                ninthPanelDataDH.value.comment = reportStore.reportDataDH.ninth[props.ninthId].comment;
                ninthPanelDataDH.value.event_happened = reportStore.reportDataDH.ninth[props.ninthId].event_happened;
                ninthPanelDataDH.value.links = reportStore.reportDataDH.ninth[props.ninthId].links;
            }
            if (reportStore.reportDataCH.ninth[props.ninthId]) {
                ninthPanelDataCH.value.comment = reportStore.reportDataCH.ninth[props.ninthId].comment;
                ninthPanelDataCH.value.event_happened = reportStore.reportDataCH.ninth[props.ninthId].event_happened;
                ninthPanelDataCH.value.links = reportStore.reportDataCH.ninth[props.ninthId].links;
            }
        } else {
            if (Object.keys(props.data).length > 0) {
                isFirstSentNinth.value = false;
                ninthPanelData.value = { ...props.data }
                if (isLinkError.value) {
                    console.log('gg');
                    emit('error', isLinkError.value)
                } else {
                    console.log('hh')
                    emit('error', false)
                }
                console.log('what', props.data)

                if (props.tab == 'Доработка') {
                    console.log('ddd')
                    isRejected.value = true;
                    ninthPanelDataDH.value.comment = reportStore.reportDataDH.ninth[props.ninthId]?.comment;
                    ninthPanelDataDH.value.event_happened = reportStore.reportDataDH.ninth[props.ninthId].event_happened;
                    ninthPanelDataDH.value.links = reportStore.reportDataDH.ninth[props.ninthId].links;
                    ninthPanelDataDH.value.document = reportStore.reportDataDH.ninth[props.ninthId].document;
                    ninthPanelDataCH.value.comment = reportStore.reportDataCH.ninth[props.ninthId]?.comment;
                    ninthPanelDataCH.value.event_happened = reportStore.reportDataCH.ninth[props.ninthId].event_happened;
                    ninthPanelDataCH.value.document = reportStore.reportDataCH.ninth[props.ninthId].document;
                    ninthPanelDataCH.value.links = reportStore.reportDataCH.ninth[props.ninthId].links;
                }
                if (!ninthPanelData.value.links.length) {
                    ninthPanelData.value.links.push({ link: '' })
                }
                // isFirstSentNinth.value = reportStore.isReportReject.ninth[props.ninthId] && !props.data.central_version;
                console.log('isFirstSent при доработке 9', isFirstSentNinth.value);
                // if (reportStore.isReportReject.ninth[props.ninthId]) {
                //     reportStore.returnReport.ninth[props.ninthId] = true;
                // }

            }

            else {
                console.log('data not received');
                isFirstSentNinth.value = true;
                ninthPanelData.value = {
                    event_happened: false,
                    links: [{
                        link: '',
                    }],
                    comment: '',
                    file_size: '',
                    file_type: '',
                };
            }

        }

        if (props.isDistrictHeadquarterCommander) {
            if (reportStore.reportDataDHFile.ninth[props.ninthId]) {
                fileDH.value.name = reportStore.reportDataDHFile.ninth[props.ninthId].name;

                fileDH.value.type = reportStore.reportDataDHFile.ninth[props.ninthId].type.split('/').at(-1);
                fileDH.value.size = reportStore.reportDataDHFile.ninth[props.ninthId].size / Math.pow(1024, 2);
            }
        } else if (props.isCentralHeadquarterCommander) {
            // if (reportStore.reportDataDH.ninth[props.ninthId]) {
            //     fileDH.value.name = reportStore.reportDataDH.ninth[props.ninthId].document;
            //     fileDH.value.type = reportStore.reportDataDH.ninth[props.ninthId].file_type;
            //     fileDH.value.size = reportStore.reportDataDH.ninth[props.ninthId].file_size;
            //     console.log('yahoo', fileDH.value.name,)
            // }
            // if (reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq === true) {
            //     fileCH.value.name = reportStore.reportForCheckCH.ninth[props.ninthId].document;
            //     fileCH.value.type = reportStore.reportForCheckCH.ninth[props.ninthId].file_type;
            //     fileCH.value.size = reportStore.reportForCheckCH.ninth[props.ninthId].file_size;
            // } else {
            //     if (reportStore.reportDataCHFile.ninth[props.ninthId]) {
            //         fileCH.value.name = reportStore.reportDataCHFile.ninth[props.ninthId].name;
            //         fileCH.value.type = reportStore.reportDataCHFile.ninth[props.ninthId].type.split('/').at(-1);
            //         fileCH.value.size = reportStore.reportDataCHFile.ninth[props.ninthId].size / Math.pow(1024, 2);
            //     }
            // }
            if (reportStore.reportDataDH.ninth[props.ninthId]) {
                fileDH.value.name = reportStore.reportDataDH.ninth[props.ninthId].document;
                fileDH.value.type = reportStore.reportDataDH.ninth[props.ninthId].file_type;
                fileDH.value.size = reportStore.reportDataDH.ninth[props.ninthId].file_size;
            }
            if (reportStore.reportForCheckCH.ninth[props.ninthId].verified_by_chq === true) {
                fileCH.value.name = reportStore.reportForCheckCH.ninth[props.ninthId].document;
                fileCH.value.type = reportStore.reportForCheckCH.ninth[props.ninthId].file_type;
                fileCH.value.size = reportStore.reportForCheckCH.ninth[props.ninthId].file_size;
            } else
                if (reportStore.reportForCheckCH.ninth[props.ninthId].rejecting_reasons && !reportStore.reportDataCHFile.ninth[props.ninthId]) {
                    fileCH.value.name = reportStore.reportForCheckCH.ninth[props.ninthId].central_version.document || '';
                    fileCH.value.type = reportStore.reportForCheckCH.ninth[props.ninthId].central_version.file_type || '';
                    fileCH.value.size = reportStore.reportForCheckCH.ninth[props.ninthId].central_version.file_size || '';
                } else
                    if (reportStore.reportDataCHFile.ninth[props.ninthId]) {
                        fileCH.value.name = reportStore.reportDataCHFile.ninth[props.ninthId].name;
                        fileCH.value.type = reportStore.reportDataCHFile.ninth[props.ninthId].type.split('/').at(-1);
                        fileCH.value.size = reportStore.reportDataCHFile.ninth[props.ninthId].size / Math.pow(1024, 2);
                    }

        }
        if (reportStore.reportReject.ninth[props.ninthId] && reportStore.isReportReject.ninth[props.ninthId]) {
            reportStore.returnReport.ninth[props.ninthId] = true;
        }

        emit('getId', props.id)
        emit('getPanelNumber', props.panel_number)
    }
}, {
    flush: 'post'
})

watchPostEffect(() => {
    //   if (props.data) {
    //     if(props.panel_number === 6) {
    //         isFirstSentSix.value = false;
    //     sixPanelData.value.number_of_members = props.data.number_of_members;
    //     sixPanelData.value.comment = props.data.comment;
    //     isSe.value = props.data.is_sent;
    //     }

    //   }
    if (!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)) {
        if (props.panel_number == 6) {
            sixPanelDataDH.value = reportStore.reportDataDH.six[props.sixId];
            sixPanelDataCH.value = reportStore.reportDataCH.six[props.sixId];

            if (reportStore.isReportReject.six[props.sixId]) {
                reportStore.returnReport.six[props.sixId] = true;
            } else {
                reportStore.returnReport.six[props.sixId] = false;
            }
        } else if (props.panel_number == 9) {
            ninthPanelDataDH.value = reportStore.reportDataDH.ninth[props.ninthId];

            fileDH.value.name = reportStore.reportDataDH.ninth[props.ninthId].document;
            fileDH.value.type = reportStore.reportDataDH.ninth[props.ninthId].file_type;
            fileDH.value.size = reportStore.reportDataDH.ninth[props.ninthId].file_size;


            ninthPanelDataCH.value = reportStore.reportDataCH.ninth[props.ninthId];
            fileCH.value.name = reportStore.reportDataCH.ninth[props.ninthId].document;
            fileCH.value.type = reportStore.reportDataCH.ninth[props.ninthId].file_type;
            fileCH.value.size = reportStore.reportDataCH.ninth[props.ninthId].file_size;

            if (reportStore.isReportReject.ninth[props.ninthId]) {
                reportStore.returnReport.ninth[props.ninthId] = true;
            } else {
                reportStore.returnReport.ninth[props.ninthId] = false;
            }
        }

    }
});


watch(sixPanelDataDH.value, (newValue) => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.six[props.sixId] = newValue;
        emit('formDataDH', newValue);
        console.log('6 new', newValue)
    }
});

// reportStore.reportDataDH.six[props.sixId] = sixPanelDataDH.value;
// emit('formDataDH', sixPanelDataDH.value);


watch(sixPanelDataCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.six[props.sixId] = sixPanelDataCH.value;
        let formData = new FormData();
        formData.append('number_of_members', sixPanelDataCH.value.number_of_members);
        formData.append('comment', sixPanelDataCH.value.comment || '');
        if (sixPanelDataCH.value.links.length) {
            for (let i = 0; i < sixPanelDataCH.value.links.length; i++) {
                formData.append(`[links][${i}][link]`, sixPanelDataCH.value.links[i].link);
            }
        }
        if (reportStore.returnReport.six[props.sixId]) formData.append('reasons[comment]', sixPanelDataCH.value.comment);
        console.log('6', formData)
        emit('formDataCH', formData);
    }
});


watch(ninthPanelDataDH.value, (newValue) => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.ninth[props.ninthId] = newValue;

        let formData = new FormData();
        formData.append('event_happened', newValue.event_happened);
        formData.append('comment', newValue.comment || '');
        if (ninthPanelDataDH.value.links.length) {
            for (let i = 0; i < ninthPanelDataDH.value.links.length; i++) {
                formData.append(`[links][${i}][link]`, ninthPanelDataDH.value.links[i].link);
            }
        }
        formData.append('document', reportStore.reportDataDHFile.ninth[props.ninthId] || '');
        if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
        emit('formDataDH', formData);
    }

});

watch(fileDH.value, () => {
    if (props.isDistrictHeadquarterCommander) {
        reportStore.reportDataDH.ninth[props.ninthId] = ninthPanelDataDH.value;

        let formData = new FormData();
        formData.append('event_happened', ninthPanelDataDH.value.event_happened);
        formData.append('comment', ninthPanelDataDH.value.comment || '');
        if (ninthPanelDataDH.value.links.length) {
            for (let i = 0; i < ninthPanelDataDH.value.links.length; i++) {
                formData.append(`[links][${i}][link]`, ninthPanelDataDH.value.links[i].link);
            }
        }
        formData.append('document', reportStore.reportDataDHFile.ninth[props.ninthId] || '');
        emit('formDataDH', formData);
    }
});

watch(fileCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;

        let formData = new FormData();
        formData.append('event_happened', ninthPanelDataCH.value.event_happened);
        formData.append('comment', ninthPanelDataCH.value.comment || '');
        if (ninthPanelDataCH.value.links.length) {
            for (let i = 0; i < ninthPanelDataCH.value.links.length; i++) {
                formData.append(`[links][${i}][link]`, ninthPanelDataCH.value.links[i].link);
            }
        }
        formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
        if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
        emit('formDataCH', formData);
        console.log('file9', formData)
    }
});

watch(ninthPanelDataCH.value, () => {
    if (props.isCentralHeadquarterCommander) {
        reportStore.reportDataCH.ninth[props.ninthId] = ninthPanelDataCH.value;
        let formData = new FormData();
        formData.append('event_happened', ninthPanelDataCH.value.event_happened);
        formData.append('comment', ninthPanelDataCH.value.comment || '');
        if (ninthPanelDataCH.value.links.length) {
            for (let i = 0; i < ninthPanelDataCH.value.links.length; i++) {
                formData.append(`[links][${i}][link]`, ninthPanelDataCH.value.links[i].link);
            }
        }
        formData.append('document', reportStore.reportDataCHFile.ninth[props.ninthId] || '');
        if (reportStore.returnReport.ninth[props.ninthId]) formData.append('reasons[comment]', ninthPanelDataCH.value.comment);
        emit('formDataCH', formData);
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
