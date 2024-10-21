<template>
    <v-card-text class="panel-card-text">
        <v-tabs-window v-if="!(props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander)">
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
                        autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
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
                        :file="ninthPanelData.document" :fileType="ninthPanelData.file_type"
                        :isSent="isSentNinth"
                        :is-error-file="isErrorFile" :fileSize="ninthPanelData.file_size" @click="deleteFile(9)">
                    </FileBoxComponent>
                </div>

                <div class="form__field">
                    <label class="form__label mt-4" for="14">Ссылка на социальные сети/ электронные
                        СМИ, подтверждающая проведение акции
                        <sup class="valid-red">*</sup></label>

                    <div class="form__wrapper" v-for="(item, index) in ninthPanelData.links" :key="index">
                        <InputReport @focusout="focusOut" @error="setError"
                            :disabled="isSentNinth || ninthPanelData.event_happened === false" name="14" :maxlength="200"
                            :is-error-panel="isErrorPanel" :is-link="true"
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
                        autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
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
        <report-tabs v-else>
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
                            name="14" class="form__input number_input" type="number" :maxlength="10" :max="32767"
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander" />
                    </div>
                    <div class="form__field" v-if="sixPanelData?.links?.length > 0">
                        <label class="form__label" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая участие в мероприятии
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in sixPanelData?.links" :key="index">
                            <InputReport placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                :is-link="true"
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                                name="14" v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            v-model:value="sixPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                            placeholder="Комментарий" @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
                            counter-visible />
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

                        <div class="places_wrap one_place">
                            <input :id="12" :value="ninthPanelData.event_happened" :name="12" :disabled="props.isCentralHeadquarterCommander ||
                                props.isDistrictHeadquarterCommander
                                " :checked="ninthPanelData.event_happened === true ||
                                    ninthPanelData.event_happened === false
                                    " class="form__input places_input" type="radio"
                                v-model="ninthPanelData.event_happened" />
                            <label v-if="ninthPanelData.event_happened === true" class="places_item_label"
                                :for="id">Да</label>
                            <label v-else class="places_item_label" :for="id">Нет</label>
                        </div>
                    </div>
                    <div class="report__fieldset report__fieldset--right-block" v-if="ninthPanelData.document !== null">
                        <label class="form__label report__label mb-2" for="scan_file">
                            Скан документа, подтверждающего проведение акции
                        </label>
                        <InputReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            v-if="!ninthPanelData.document" isFile type="file" accept=".jpg, .jpeg, .png, .pdf"
                            id="scan_file" name="scan_file" width="100%" height="auto" />
                        <FileBoxComponent v-else :file="ninthPanelData.document" :fileType="ninthPanelData.file_type"
                            :isSent="isSent" :fileSize="ninthPanelData.file_size">
                        </FileBoxComponent>
                    </div>

                    <div class="form__field" v-if="ninthPanelData?.links?.length > 0">
                        <label class="form__label mt-4" for="14">Ссылка на социальные сети/ электронные
                            СМИ, подтверждающая проведение акции
                            <sup class="valid-red">*</sup></label>

                        <div class="form__wrapper" v-for="(item, index) in ninthPanelData?.links" :key="index">
                            <InputReport
                                :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                                name="14" :is-link="true"
                                placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                                v-model:value="item.link" class="mb-2" />
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport
                            :disabled="props.isCentralHeadquarterCommander || props.isDistrictHeadquarterCommander"
                            v-model:value="ninthPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                            placeholder="Комментарий" :maxlength="3000" :max-length-text="3000" counter-visible />
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
                            type="number" :maxlength="10" :max="32767" />
                    </div>

                    <CommentFileComponent v-model:value="sixPanelDataDH.comment" :is-error-panel="isErrorPanel"
                        :is-six="true" name="sixPanelDataDH.comment" :disabled="props.isCentralHeadquarterCommander">
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
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    :checked="ninthPanelDataDH.event_happened == item.value"
                                    class="form__input places_input" type="radio"
                                    v-model="ninthPanelDataDH.event_happened" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <CommentFileComponent v-model:value="ninthPanelDataDH.comment" name="ninthPanelDataDH.comment"
                        @change="uploadFile($event, 9)" @click="deleteFile(9)"
                        :file="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.name : null"
                        :fileType="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.type.split('/').at(-1) : null"
                        :fileSize="reportStore.reportDataDHFile.ninth[props.ninthId] ? reportStore.reportDataDHFile.ninth[props.ninthId]?.size / Math.pow(1024, 2) : null"
                        :disabled="props.isCentralHeadquarterCommander" :is-error-file="isErrorFile"
                        :is-error-panel="isErrorPanel">
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
                        <TextareaReport v-model:value="sixPanelData.comment" id="comment" name="comment" :rows="1"
                            autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                            :max-length-text="3000" counter-visible />
                    </div>
                    <div>
                        <v-checkbox label="Вернуть в РО на доработку" />
                    </div>
                </div>
                <div v-else-if="props.panel_number == 9" class="form__field-group group-seventh">
                    <div class="d-flex justify-space-between">
                        <div class="title_wrap">
                            <p class="form__title">{{ props.title.name }}</p>
                        </div>
                        <div>
                            <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть" />
                        </div>
                    </div>
                    <label class="form__label">Проведение мероприятия <sup class="valid-red">*</sup></label>
                    <v-table>
                        <tbody>
                            <tr class="report-table__tr">
                                <td class="report-table__th">Данные РО</td>
                                <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
                                <td class="report-table__th">Корректировка ЦШ</td>
                            </tr>
                            <tr>
                                <td class="report-table__td">Да</td>
                                <td class="report-table__td report-table__td__center">Да</td>
                                <td class="report-table__td">Да</td>
                            </tr>
                        </tbody>
                    </v-table>
                    <div class="form__field places mt-4">
                        <p class="form__label">
                            Проведение мероприятия <sup class="valid-red">*</sup>
                        </p>

                        <div class="places_wrap">
                            <div class="places_item" v-for="item in events" :key="item.id">
                                <input :id="item.id" :value="item.value" :name="item.name"
                                    :checked="ninthPanelData.event_happened == item.value"
                                    class="form__input places_input" type="radio" @focusout="focusOut"
                                    v-model="ninthPanelData.event_happened" />
                                <label class="places_item_label" :for="id">{{
                                    item.name
                                }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="form__field">
                        <label class="form__label" for="14">Комментарий</label>
                        <TextareaReport v-model:value="ninthPanelData.comment" id="comment" name="comment" :rows="1"
                            autoResize placeholder="Комментарий" @focusout="focusOut" :maxlength="3000"
                            :max-length-text="3000" counter-visible />
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
    panel_number: String,
    isDisabled: Boolean,
    isSecondTab: Boolean,
    isThirdTab: Boolean,
    isCentralHeadquarterCommander: Boolean,
    isDistrictHeadquarterCommander: Boolean,
    id: String,
    sixId: String,
    ninthId: String,
    isSentSix: Boolean,
    // isSent: Boolean,
    isSentNinth: Boolean,
    isErrorPanel: Boolean,
    data: Object,
    dataDH: Object,
    dataCH: Object,
});

const emit = defineEmits(['collapse-form', 'formData', 'formDataDH', 'uploadFile', 'uploadFileDH', 'getId', 'getPanelNumber', 'deleteFile', 'deleteFileDH', 'error']);

const collapseForm = () => {
    emit('collapse-form');
};

const reportStore = useReportPartTwoStore();
let isErrorFile = ref(false);
const isFirstSentSix = ref(true);
// const isFirstSentSeventh = ref(true);
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
    comment: '',
});

const sixPanelDataCH = ref({
    number_of_members: 0,
    comment: '',
});

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
        fileValidate(event.target.files[0], 9, isErrorFile);
        if (isErrorFile.value) {
            console.log('error');
            scanFile.value = event.target.files[0];
            ninthPanelData.value.document = scanFile.value.name;
        } else {
            if (props.isDistrictHeadquarterCommander) {

                ninthPanelDataDH.value.document = event.target.files[0];
                reportStore.reportDataDHFile.ninth[props.ninthId] = event.target.files[0];
                console.log('file', reportStore.reportDataDHFile.ninth[props.ninthId])
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
            reportStore.reportDataDHFile.ninth[props.ninthId] = null;
            ninthPanelDataDH.value.document = '';

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

const focusOut = () => {
    if (props.panel_number == 6) {
        try {
            // if (props.isDistrictHeadquarterCommander) {
            //     emit('formDataDH', sixPanelDataDH.value);
            //     console.log('dataDH', sixPanelDataDH);
            // } else {
            //     emit('formData', sixPanelData.value);
            // }
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
            // if (props.isDistrictHeadquarterCommander) {
            //     emit('formDataDH', ninthPanelDataDH.value);
            //     console.log('dataDH9', ninthPanelDataDH);
            // } else {
            if (isFirstSentNinth.value === true) {
                console.log('9', '1')
                emit('formData', ninthPanelData.value)
            } else {
                if (ninthPanelData.value.event_happened === false) {
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

        if (props.isDistrictHeadquarterCommander) {
            sixPanelData.value = { ...props.data };
            if (reportStore.reportDataDH.six[props.sixId]) {
                sixPanelDataDH.value.comment = reportStore.reportDataDH.six[props.sixId].comment;
                sixPanelDataDH.value.number_of_members = reportStore.reportDataDH.six[props.sixId].number_of_members;
            }
            // sixPanelDataCH.value = { ...props.dataCH };
        } else {
            if (Object.keys(props.data).length > 0) {
                isFirstSentSix.value = false;
                sixPanelData.value = { ...props.data };
                if (isLinkError.value) {
                    emit('error', isLinkError.value);
                } else {
                    emit('error', false);
                }
                if (!sixPanelData.value.links.length)
                    sixPanelData.value.links.push({ link: '' });
            } else {
                console.log('data not received');
            }
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
        if (props.isDistrictHeadquarterCommander) {
            ninthPanelData.value = { ...props.data };
            if (reportStore.reportDataDH.ninth[props.ninthId]) {
                ninthPanelDataDH.value.comment = reportStore.reportDataDH.ninth[props.ninthId].comment;
                ninthPanelDataDH.value.event_happened = reportStore.reportDataDH.ninth[props.ninthId].event_happened;
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
                if (!ninthPanelData.value.links.length) {
                    ninthPanelData.value.links.push({ link: '' })
                }

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
        emit('getId', props.id)
        emit('getPanelNumber', props.panel_number)

    }
}, {
    flush: 'post'
})

watch(sixPanelDataDH.value, () => {
    reportStore.reportDataDH.six[props.sixId] = sixPanelDataDH.value;
    console.log('yeah')
    emit('formDataDH', sixPanelDataDH.value);
    console.log(sixPanelDataDH.value)
});
watch(ninthPanelDataDH.value, () => {
    reportStore.reportDataDH.ninth[props.ninthId] = ninthPanelDataDH.value;

    let formData = new FormData();

    ninthPanelDataDH.value.event_happened
        ? formData.append('event_happened', ninthPanelDataDH.value.event_happened)
        : formData.append('event_happened', false);

    formData.append('comment', ninthPanelDataDH.value.comment || '');

    reportStore.reportDataDHFile.ninth[props.ninthId]
        ? formData.append('document', reportStore.reportDataDHFile.ninth[props.ninthId])
        : formData.append('document', '');

    emit('formDataDH', formData);
    // reportStore.reportDataDH.ninth = ninthPanelDataDH.value;
    // emit('formDataDH', ninthPanelDataDH.value);
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
    border-radius: 10px;
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
