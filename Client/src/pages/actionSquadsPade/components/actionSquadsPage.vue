<template>
    <div class="container">
        <bannerCreate
            desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
            label="Создать мероприятие"
            name="createAction"
            :eventCreate="true"
            :target="'_blank'"
        ></bannerCreate>

        <h2 class="action-title">Мероприятия</h2>
        <div class="searcher">
            <div class="squads-search">
                <input
                    type="text"
                    id="search"
                    class="squads-search__input events__input"
                    placeholder="Найти мероприятие"
                    v-model="text"
                    @input="SearchByInput"
                />
                <svg
                    class="events_magnifier"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
        <div class="action-slides">
            <div class="settings-container" :class="{hideSettings: toggleBtn}">
                <v-expansion-panels class="expansion-panels" >
                    <v-expansion-panel
                        class="settings-body"
                        title="Тип мероприятия"
                    >
                    <v-expansion-panel-text>
                      <div class="settings-radio">
                        <input
                            id="format_typeAll"
                            v-model="actionFormSearch.format_type"
                            value=""
                            type="radio"
                        />
                        <label for="format_typeAll">Все</label>
                      </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.format_type"
                                    value="Онлайн"
                                    type="radio"
                                    id="online"
                                />
                                <label for="online">Онлайн</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.format_type"
                                    value="Офлайн"
                                    type="radio"
                                    id="offline"
                                />
                                <label for="offline">Офлайн</label>
                            </div>
                    </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Статус мероприятия"
                    >
                        <v-expansion-panel-text>
                          <div class="settings-radio">
                            <input
                                id="statusAll"
                                v-model="actionFormSearch.status"
                                value=""
                                type="radio"
                            />
                            <label for="statusAll">Все</label>
                          </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.status"
                                    value="Активный"
                                    type="radio"
                                    id="open"
                                />
                                <label for="open">Активные</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.status"
                                    value="Завершенные"
                                    type="radio"
                                    id="close"
                                />
                                <label for="close">Завершенные</label>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="settings-body" title="Масштаб">
                        <v-expansion-panel-text>
                            <div class="flex align-items-center">
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value=""
                                        id="scaleAll"
                                    />
                                    <label for="scaleAll" class="ml-2">Все</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Всероссийское"
                                        id="All-Russian"
                                    />
                                    <label for="All-Russian" class="ml-2">Всероссийское</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Окружное"
                                        id="District"
                                    />
                                    <label for="District" class="ml-2">Окружное</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Региональное"
                                        id="Regional"
                                    />
                                    <label for="Regional" class="ml-2">Региональное</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Городское"
                                        id="Urban"
                                    />
                                    <label for="Urban" class="ml-2">Городское</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Мероприятие ОО"
                                        id="OOevent"
                                    />
                                    <label for="OOevent" class="ml-2">Мероприятие ОО</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.scale"
                                        type="radio"
                                        value="Отрядное"
                                        id="Detachment"
                                    />
                                    <label for="Detachment" class="ml-2">Отрядное</label>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Направление"
                    >
                        <v-expansion-panel-text>
                            <div class="settings-radio">
                                <input
                                    id="directionAll"
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value=""
                                />
                                <label for="directionAll" class="ml-2">Все</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Добровольческое"
                                    id="Volunteer"
                                />
                                <label for="Volunteer" class="ml-2">Добровольческое</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Образовательное"
                                    id="Educational"
                                />
                                <label for="Educational" class="ml-2">Образовательное</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Патриотическое"
                                    id="Patriotic"
                                />
                                <label for="Patriotic" class="ml-2">Патриотическое</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Спортивное"
                                    id="Sports"
                                />
                                <label for="Sports" class="ml-2">Спортивное</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Творческое"
                                    id="Creative"
                                />
                                <label for="Creative" class="ml-2">Творческое</label>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
              <p class="totalEvents">Мероприятий найдено: {{ actionsList.length }}</p>
            </div>
            <div class="col" style="width: 100%">
                <div class="sort-container">
                  <div class="sort-layout">
                    <div>
                      <Button
                          v-if="vertical"
                          type="button"
                          class="dashboard events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      >
                      </Button>
                      <Button
                          v-else
                          type="button"
                          class="dashboardD events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      >
                      </Button>
                    </div>
                    <div>
                      <Button
                          v-if="!vertical"
                          type="button"
                          class="menuuA events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      ></Button>
                      <Button
                          v-else
                          type="button"
                          class="menuu events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      ></Button>
                    </div>
                    <div class="toggleSettings">
                      <svg
                          @click="toggleBtn = !toggleBtn"
                          class="toggleSettings-btn"
                          xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="4.5" fill="white"/>
                        <rect x="0.5" y="0.5" width="31" height="31" rx="4.5" stroke="#35383F"/>
                        <path d="M13.6581 23.7806L13.8162 24.255H13.8162L13.6581 23.7806ZM18.6581 22.114L18.8162 22.5883H18.8162L18.6581 22.114ZM23.7071 11.2929L24.0607 11.6464L23.7071 11.2929ZM19.2929 15.7071L18.9393 15.3536L19.2929 15.7071ZM9 8.5H23V7.5H9V8.5ZM8.5 10.5858V9H7.5V10.5858H8.5ZM13.0607 15.3535L8.64645 10.9393L7.93934 11.6464L12.3535 16.0607L13.0607 15.3535ZM12.5 16.4142V23.3063H13.5V16.4142H12.5ZM12.5 23.3063C12.5 23.9888 13.1687 24.4708 13.8162 24.255L13.5 23.3063V23.3063H12.5ZM13.8162 24.255L18.8162 22.5883L18.5 21.6396L13.5 23.3063L13.8162 24.255ZM18.8162 22.5883C19.2246 22.4522 19.5 22.0701 19.5 21.6396H18.5L18.8162 22.5883ZM19.5 21.6396V16.4142H18.5V21.6396H19.5ZM23.3536 10.9393L18.9393 15.3536L19.6464 16.0607L24.0607 11.6464L23.3536 10.9393ZM23.5 9V10.5858H24.5V9H23.5ZM24.0607 11.6464C24.342 11.3651 24.5 10.9836 24.5 10.5858H23.5C23.5 10.7184 23.4473 10.8456 23.3536 10.9393L24.0607 11.6464ZM19.5 16.4142C19.5 16.2816 19.5527 16.1544 19.6464 16.0607L18.9393 15.3536C18.658 15.6349 18.5 16.0164 18.5 16.4142H19.5ZM12.3535 16.0607C12.4473 16.1544 12.5 16.2816 12.5 16.4142H13.5C13.5 16.0164 13.342 15.6349 13.0607 15.3535L12.3535 16.0607ZM7.5 10.5858C7.5 10.9836 7.65804 11.3651 7.93934 11.6464L8.64645 10.9393C8.55268 10.8456 8.5 10.7184 8.5 10.5858H7.5ZM23 8.5C23.2761 8.5 23.5 8.72386 23.5 9H24.5C24.5 8.17157 23.8284 7.5 23 7.5V8.5ZM9 7.5C8.17157 7.5 7.5 8.17157 7.5 9H8.5C8.5 8.72386 8.72386 8.5 9 8.5V7.5Z" fill="#35383F"/>
                      </svg>
                    </div>
                  </div>
                  <div class="sort-alphabet">
                      <v-select
                          style="width: 232px;"
                          class="events__sort-select"
                          item-title="text"
                          item-value="value"
                          :items="sortOptions"
                          variant="outlined"
                          placeholder="Выберите фильтр"
                          @update:modelValue="sortItems"
                      ></v-select>
                      <Button
                          type="button"
                          class="ascend events__sort-buttonDirection"
                          :class="{reverseBtnActive: reverseListActive}"
                          icon="switch"
                          @click="reverseList"
                          color="white"
                      ></Button>
                    </div>
                </div>
                <div
                    v-if="!actionsList.length"
                    style="
                    font-family: Bert Sans;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 23.74px;
                    text-align: center;
                    color: #898989;">
                  По вашему запросу мероприятий не найдено.
                </div>
                <div class="cardsContainer">
                  <v-row v-if="vertical" class="cardsRow">
                    <v-col
                        class="pa-2"
                        v-for="(variant, i) in actionsList"
                        :key="i"
                        cols="auto"
                        @click="goToEvent(variant.id)"
                        style="cursor: pointer"
                    >
                      <v-card
                          class="mx-auto"
                          min-width="280"
                          height="210"
                          :image="variant.banner"
                      >
                        <div class="cardClock">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <ellipse cx="9.99967" cy="11.6667" rx="6.66667" ry="6.66667" stroke="#35383F"/>
                              <path d="M10 11.6641L10 9.16406" stroke="#35383F" stroke-linecap="round"/>
                              <path d="M14.583 6.25L15.833 5" stroke="#35383F" stroke-linecap="round"/>
                              <path d="M8.39045 1.97289C8.48541 1.88429 8.69465 1.806 8.98572 1.75017C9.2768 1.69433 9.63343 1.66406 10.0003 1.66406C10.3672 1.66406 10.7239 1.69433 11.0149 1.75017C11.306 1.806 11.5152 1.88429 11.6102 1.97289" stroke="#35383F" stroke-linecap="round"/>
                            </svg>
                          </div>
                            <div>
                              <p>{{dateHandler(variant.time_data.registration_end_date, variant.time_data.registration_end_time)}}</p>
                            </div>

                        </div>
                      </v-card>
                      <div class="text-caption textCaption" >
                        {{ variant.name }}
                      </div>
                      <div class="cardTimeQuantity">
                        <div class="cardTime">
                          {{new Date(variant.time_data.start_date).toLocaleDateString(undefined,
                            {year: 'numeric', month: 'long', day: 'numeric',})}}</div>
                        <div class="cardQuantity">
                          <div >{{variant.participants_number}}</div>
                          <div style="padding-top: 3px;">
                            <svg
                                class="quantitySvg"
                                xmlns="http://www.w3.org/2000/svg"  fill="none">
                              <circle cx="12" cy="8" r="2.5" stroke="#35383F" stroke-linecap="round"/>
                              <path d="M13.7679 6.5C13.9657 6.15743 14.2607 5.88121 14.6154 5.70625C14.9702 5.5313 15.3689 5.46548 15.7611 5.51711C16.1532 5.56874 16.5213 5.73551 16.8187 5.99632C17.1161 6.25713 17.3295 6.60028 17.4319 6.98236C17.5342 7.36445 17.521 7.76831 17.3939 8.14288C17.2667 8.51745 17.0313 8.8459 16.7175 9.08671C16.4037 9.32751 16.0255 9.46985 15.6308 9.49572C15.2361 9.52159 14.8426 9.42983 14.5 9.23205" stroke="#35383F"/>
                              <path d="M10.2321 6.5C10.0343 6.15743 9.73935 5.88121 9.38458 5.70625C9.02981 5.5313 8.63113 5.46548 8.23895 5.51711C7.84677 5.56874 7.47871 5.73551 7.18131 5.99632C6.88391 6.25713 6.67053 6.60028 6.56815 6.98236C6.46577 7.36445 6.47899 7.76831 6.60614 8.14288C6.73329 8.51745 6.96866 8.8459 7.28248 9.08671C7.5963 9.32751 7.97448 9.46985 8.36919 9.49572C8.76391 9.52159 9.15743 9.42983 9.5 9.23205" stroke="#35383F"/>
                              <path d="M12 12.5C16.0802 12.5 17.1335 15.8022 17.4054 17.507C17.4924 18.0524 17.0523 18.5 16.5 18.5H7.5C6.94771 18.5 6.50763 18.0524 6.59461 17.507C6.86649 15.8022 7.91976 12.5 12 12.5Z" stroke="#35383F" stroke-linecap="round"/>
                              <path d="M19.2964 15.4162L18.8113 15.5377L19.2964 15.4162ZM13.0869 12.5859L12.7177 12.2488L12.0972 12.9283L13.0049 13.0791L13.0869 12.5859ZM17.1811 16.5L16.7008 16.639L16.8053 17H17.1811V16.5ZM15.4998 12C16.5275 12 17.2493 12.5027 17.7781 13.2069C18.3175 13.9253 18.6343 14.8306 18.8113 15.5377L19.7814 15.2948C19.5902 14.5315 19.2327 13.4787 18.5778 12.6065C17.9124 11.7203 16.92 11 15.4998 11V12ZM13.4562 12.923C13.9565 12.375 14.6105 12 15.4998 12V11C14.2826 11 13.3734 11.5306 12.7177 12.2488L13.4562 12.923ZM13.0049 13.0791C15.3055 13.4614 16.2788 15.1801 16.7008 16.639L17.6614 16.361C17.1903 14.7326 16.0188 12.5663 13.1689 12.0927L13.0049 13.0791ZM18.3948 16H17.1811V17H18.3948V16ZM18.8113 15.5377C18.8651 15.7526 18.7073 16 18.3948 16V17C19.2655 17 20.015 16.2277 19.7814 15.2948L18.8113 15.5377Z" fill="#35383F"/>
                              <path d="M10.913 12.5859L10.995 13.0791L11.9027 12.9283L11.2823 12.2488L10.913 12.5859ZM4.70355 15.4162L5.18857 15.5377L4.70355 15.4162ZM6.8188 16.5V17H7.19465L7.29911 16.639L6.8188 16.5ZM8.50011 12C9.38944 12 10.0434 12.375 10.5438 12.923L11.2823 12.2488C10.6266 11.5306 9.71735 11 8.50011 11V12ZM5.18857 15.5377C5.36566 14.8306 5.6824 13.9253 6.22179 13.2069C6.7506 12.5027 7.47238 12 8.50011 12V11C7.07993 11 6.08755 11.7203 5.42211 12.6065C4.76725 13.4787 4.40968 14.5315 4.21853 15.2948L5.18857 15.5377ZM5.6051 16C5.29259 16 5.13477 15.7526 5.18857 15.5377L4.21853 15.2948C3.9849 16.2277 4.73436 17 5.6051 17V16ZM6.8188 16H5.6051V17H6.8188V16ZM7.29911 16.639C7.72116 15.1801 8.69448 13.4614 10.995 13.0791L10.831 12.0927C7.98113 12.5663 6.80962 14.7326 6.3385 16.361L7.29911 16.639Z" fill="#35383F"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="cardType">
                        <div class="eventsScale">
                          <div>
                            {{ variant.scale }}
                          </div>
                        </div>
                        <div class="eventsScale">
                          {{ variant.direction }}
                        </div>
                      </div>

                    </v-col>
                  </v-row>
<!--                  <HorizontalLocalHQs v-else :localHeadquarters="actionsList"></HorizontalLocalHQs>-->
                  <div v-else class="vertical_list">
                    <div
                        class="vertical_list-item"
                        v-for="item in actionsList"
                        :key="item.id"
                        :id="item.id"
                        @click="goToEventList"
                    >
                      <div class="vertical_list-itemLeft">
                        <div :id="item.id" class="vertical_list-img">
                          <img :src="item.banner">
                        </div>
                        <div :id="item.id" class="vertical_list-title">
                          {{ item.name }}
                        </div>
                      </div>

                      <div :id="item.id" class="vertical_list-itemRight">
                        <div class="vertical_list-clockSvg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="none">
                            <ellipse cx="9.99967" cy="11.6667" rx="6.66667" ry="6.66667" stroke="#35383F"/>
                            <path d="M10 11.6641L10 9.16406" stroke="#35383F" stroke-linecap="round"/>
                            <path d="M14.583 6.25L15.833 5" stroke="#35383F" stroke-linecap="round"/>
                            <path d="M8.39045 1.97289C8.48541 1.88429 8.69465 1.806 8.98572 1.75017C9.2768 1.69433 9.63343 1.66406 10.0003 1.66406C10.3672 1.66406 10.7239 1.69433 11.0149 1.75017C11.306 1.806 11.5152 1.88429 11.6102 1.97289" stroke="#35383F" stroke-linecap="round"/>
                          </svg>
                        </div>
                        <div :id="item.id" class="vertical_list-time">
                          {{new Date(item.time_data.start_date).toLocaleDateString(undefined,
                            {year: 'numeric', month: 'long', day: 'numeric',})}}
                        </div>
                        <div :id="item.id" class="vertical_list-quantity">
                          {{ item.participants_number }}
                        </div>
                        <div class="vertical_list-quantitySvg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                            <circle cx="12" cy="8" r="2.5" stroke="#35383F" stroke-linecap="round"/>
                            <path d="M13.7679 6.5C13.9657 6.15743 14.2607 5.88121 14.6154 5.70625C14.9702 5.5313 15.3689 5.46548 15.7611 5.51711C16.1532 5.56874 16.5213 5.73551 16.8187 5.99632C17.1161 6.25713 17.3295 6.60028 17.4319 6.98236C17.5342 7.36445 17.521 7.76831 17.3939 8.14288C17.2667 8.51745 17.0313 8.8459 16.7175 9.08671C16.4037 9.32751 16.0255 9.46985 15.6308 9.49572C15.2361 9.52159 14.8426 9.42983 14.5 9.23205" stroke="#35383F"/>
                            <path d="M10.2321 6.5C10.0343 6.15743 9.73935 5.88121 9.38458 5.70625C9.02981 5.5313 8.63113 5.46548 8.23895 5.51711C7.84677 5.56874 7.47871 5.73551 7.18131 5.99632C6.88391 6.25713 6.67053 6.60028 6.56815 6.98236C6.46577 7.36445 6.47899 7.76831 6.60614 8.14288C6.73329 8.51745 6.96866 8.8459 7.28248 9.08671C7.5963 9.32751 7.97448 9.46985 8.36919 9.49572C8.76391 9.52159 9.15743 9.42983 9.5 9.23205" stroke="#35383F"/>
                            <path d="M12 12.5C16.0802 12.5 17.1335 15.8022 17.4054 17.507C17.4924 18.0524 17.0523 18.5 16.5 18.5H7.5C6.94771 18.5 6.50763 18.0524 6.59461 17.507C6.86649 15.8022 7.91976 12.5 12 12.5Z" stroke="#35383F" stroke-linecap="round"/>
                            <path d="M19.2964 15.4162L18.8113 15.5377L19.2964 15.4162ZM13.0869 12.5859L12.7177 12.2488L12.0972 12.9283L13.0049 13.0791L13.0869 12.5859ZM17.1811 16.5L16.7008 16.639L16.8053 17H17.1811V16.5ZM15.4998 12C16.5275 12 17.2493 12.5027 17.7781 13.2069C18.3175 13.9253 18.6343 14.8306 18.8113 15.5377L19.7814 15.2948C19.5902 14.5315 19.2327 13.4787 18.5778 12.6065C17.9124 11.7203 16.92 11 15.4998 11V12ZM13.4562 12.923C13.9565 12.375 14.6105 12 15.4998 12V11C14.2826 11 13.3734 11.5306 12.7177 12.2488L13.4562 12.923ZM13.0049 13.0791C15.3055 13.4614 16.2788 15.1801 16.7008 16.639L17.6614 16.361C17.1903 14.7326 16.0188 12.5663 13.1689 12.0927L13.0049 13.0791ZM18.3948 16H17.1811V17H18.3948V16ZM18.8113 15.5377C18.8651 15.7526 18.7073 16 18.3948 16V17C19.2655 17 20.015 16.2277 19.7814 15.2948L18.8113 15.5377Z" fill="#35383F"/>
                            <path d="M10.913 12.5859L10.995 13.0791L11.9027 12.9283L11.2823 12.2488L10.913 12.5859ZM4.70355 15.4162L5.18857 15.5377L4.70355 15.4162ZM6.8188 16.5V17H7.19465L7.29911 16.639L6.8188 16.5ZM8.50011 12C9.38944 12 10.0434 12.375 10.5438 12.923L11.2823 12.2488C10.6266 11.5306 9.71735 11 8.50011 11V12ZM5.18857 15.5377C5.36566 14.8306 5.6824 13.9253 6.22179 13.2069C6.7506 12.5027 7.47238 12 8.50011 12V11C7.07993 11 6.08755 11.7203 5.42211 12.6065C4.76725 13.4787 4.40968 14.5315 4.21853 15.2948L5.18857 15.5377ZM5.6051 16C5.29259 16 5.13477 15.7526 5.18857 15.5377L4.21853 15.2948C3.9849 16.2277 4.73436 17 5.6051 17V16ZM6.8188 16H5.6051V17H6.8188V16ZM7.29911 16.639C7.72116 15.1801 8.69448 13.4614 10.995 13.0791L10.831 12.0927C7.98113 12.5663 6.80962 14.7326 6.3385 16.361L7.29911 16.639Z" fill="#35383F"/>
                          </svg>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Button} from '@shared/components/buttons';
import bannerCreate from '@shared/components/imagescomp/bannerCreate.vue';
import {onActivated, ref, watch} from 'vue';
import {getListActionsByFilter, getListActionsBySearch, getRoles} from '@services/ActionService';
import {useRouter} from "vue-router";
import moment from "moment";

const router = useRouter();

let actionsList = ref([]);
let rolesCount = ref(0);
const text = ref('');
const vertical = ref(true);
const reverseListActive = ref(false);
const toggleBtn = ref(true)

onActivated(() => {
    getListActionsBySearch(text.value).then((resp) => {
        actionsList.value = resp.data.results;
    });
    getRoles().then((resp) => {
        Object.entries(resp.data).forEach(([key, value]) => {
            if (value !== null) {
                rolesCount.value = rolesCount.value + 1;
            }
        });
    });
});
const sortItems = (e) => {
  if (e === 'alphabetically') {
    actionsList.value = actionsList.value.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  if (e === 'founding_date') {
    actionsList.value = actionsList.value.sort((a, b) =>{
      if (Date.parse(a.time_data.start_date) < Date.parse(b.time_data.start_date)) {
        return -1;
      }
      if (Date.parse(a.time_data.start_date) > Date.parse(b.time_data.start_date)) {
        return 1;
      }
      return 0;
    })
  }
  if (e === 'members_count') {
    actionsList.value = actionsList.value.sort((a, b) => {
      if (a.participants_number < b.participants_number) {
        return -1;
      }
      if (a.participants_number > b.participants_number) {
        return 1;
      }
      return 0;
    });
  }
}

const reverseList = () => {
  reverseListActive.value = !reverseListActive.value;
  actionsList.value = actionsList.value.reverse();
}
//Поиск нового значения
function SearchByInput() {
  getListActionsBySearch(text.value).then((resp) => {
    actionsList.value = resp.data.results;
  });
}
const goToEvent = (id) => {
router.push({ name: 'Action', params: { id: id } })
}
const goToEventList = (event) => {
  router.push({ name: 'Action', params: { id: event.target.id } })
}
const dateHandler = (date, time) => {
  if (date) {
    if (Date.parse(date + 'T' + time) < Date.parse(new Date())) {
      return 'Регистрация окончена'
    } else {
      let end = moment(date + 'T' + time)
      let now = moment()

      let years = end.diff(now, 'years')
      now.add(years, 'years');
      let months = end.diff(now, 'months');
      now.add(months, 'months');
      let days = end.diff(now, 'days');
      now.add(days, 'days')
      let hours = end.diff(now, 'hours')
      now.add(hours, 'hours')
      let minutes = end.diff(now, 'minutes')

      let y = ['год', 'года', 'лет'];
      let m = ['месяц', 'месяца', 'месяцев']
      let d = ['день', 'дня', 'дней']
      let h = ['час', 'часа', 'часов']
      let minute = ['минуту', 'минуты', 'минут']

      // console.log(years + ' years ' + months + ' months ' + days + ' days ' + hours + ' hours ' + minutes +  ' minutes' );
      return years > 0 ? `Окончание регистрации через ${years} ${plural(years, y)}`
          : months > 0 ? `Окончание регистрации через ${months} ${plural(months, m)}`
              : days > 0 ? `Окончание регистрации через ${days} ${plural(days, d)}`
                  : hours > 0 ? `Окончание регистрации через ${hours} ${plural(hours, h)}`
                  : `Окончание регистрации через ${minutes} ${plural(minutes, minute)}`;
    }
  } else {
    return 'Нет информации об окончании';
  }
}

const plural = (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const actionFormSearch = ref({
    format_type: '',
    direction: '',
    status: '',
    scale: '',
    search: '',
});

watch(actionFormSearch, async () => {
  let params = ''
  for (let value in actionFormSearch.value) {
    if(actionFormSearch.value[value]) {
      params += value + '=' + actionFormSearch.value[value] + '&'
    }
  }
  const res = await getListActionsByFilter(`?${params}`)
  actionsList.value = res.data.results;
}, {
  deep: true
})

//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortOptions = ref([
  { text: 'По алфавиту: А - Я', value: 'alphabetically' },
  { value: 'founding_date', text: 'По дате проведения' },
  { value: 'members_count', text: 'Количеству участников' },
]);
</script>

<style>
.v-input__control {
  /*width: 232px;*/
}
.v-expansion-panels {
  /*width: 284px;*/
}
.v-field__outline {
  border-radius: 10px;
}
.v-field__input {
  min-height: 32px;
  /*max-width: 232px;*/
  padding: 4px 16px 4px 16px;
}
.v-select__selection-text {
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
  color: #35383F;
}
.v-select__selection {
  margin-top: 0 !important;
}
.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
  border: none;
}
.v-expansion-panel-title {
  font-family: Bert Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 0;
}
@media (max-width: 768px) {
  .v-expansion-panel-title {
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 600;
    line-height: 23.74px;
    text-align: left;
  }
}
.v-expansion-panel__shadow {
  border: none;
  box-shadow: none;
}
.settings-checkbox,
.settings-radio {
  font-family: Bert Sans;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
}
.v-expansion-panel-text__wrapper {
  padding-left: 0;
}
.v-expansion-panel-title__overlay {
  background-color: initial;
}
</style>

<style lang="scss" scoped>
.toggleSettings {
  display: flex;
  justify-content: right;
  width:  100%;
  @media (min-width: 768px) {
    display: none;
  }
  &-btn {
    //border: 1px solid #B6B6B6 !important;
    //border-radius: 10px;
    //margin-bottom: 30px;
    //width:  100%;
    text-align: left;
  }
}
.hideSettings {
  @media (max-width: 768px) {
    display: none;
  }
}
.expansion-panels {
  width: 284px;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.settings-container {
  @media (max-width: 768px) {
    //display: none;
    margin-right: 0 !important;
    margin-bottom: 20px !important;
  }
}
.totalEvents {
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.1px;
  text-align: left;
  color: #898989;
  margin-top: 36px;
  @media (max-width: 768px) {
    margin-top: 0;
    padding-bottom: 10px;
  }
}
.v-img__img--cover {
  object-fit: fill;
}
// ---------------------------list--------------------------
.vertical_list-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #B6B6B6;
  border-radius: 10px;
  margin-bottom: 12px;
  height: 48px;
  cursor: pointer;
  max-width: 880px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
}
.vertical_list-itemLeft,
.vertical_list-itemRight {
  display: flex;
  align-items: center;
}
.vertical_list-itemLeft{
  margin: 4px 0 4px 32px;
  font-family: Bert Sans;
  font-size: 20px;
  font-weight: 500;
  line-height: 26.38px;
  text-align: left;
  color: #35383F;

  @media (max-width: 768px) {
    margin: 4px 0 4px 12px;
    font-family: Bert Sans;
    font-size: 12px;
    font-weight: 500;
    line-height: 15.83px;
    text-align: left;
  }

}

.vertical_list-itemRight {
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.46px;
  color: #35383F;
  justify-content: space-between;
  min-width: 199px;
  margin-right: 25px;
  @media (max-width: 1440px) {
    width: 199px;
  }
  @media (max-width: 768px) {
    font-family: Bert Sans;
    font-size: 12px;
    font-weight: 400;
    line-height: 15.83px;
    text-align: left;
    margin-right: 5px;
  }
}
.vertical_list-img {
  width: 52px;
  height: 40px;
  border-radius: 10px;
  border: 1px;
  object-fit: fill;
  display: flex;
  flex: 1 0 auto;
  //max-height: 100%;
  //max-width: 100%;
  overflow: hidden;
  position: relative;
  margin-right: 16px;

  img {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
.vertical_list-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 282px;

  @media (max-width: 1024px) {
    max-width: 143px;
  }
  @media (max-width: 450px) {
    max-width: 97px;
  }
}
.vertical_list-time {
  margin-bottom: 3px;
}
.vertical_list-quantity {
  margin-bottom: 3px;
}
// -------------------tile-------------------
.cardsContainer {
  max-width: 880px;
  margin-bottom: 80px;
}
.cardsRow {
  @media (max-width: 768px) {
    margin-top: 20px;
    justify-content: center;
  }
}
.textCaption {
  max-width: 280px;
  //max-height: 55px;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 600;
  line-height: 18.46px;
  text-align: left;
  margin-top: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
}
.cardTimeQuantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.46px;
  text-align: left;
  margin-top: 18px;
}
.cardQuantity {
  display: flex;
  align-items: center;
}
.quantitySvg {
  width: 24px;
  height: 24px;
}
.cardType {
  display: flex;
  align-items: center;
  //justify-content: space-between;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.46px;
  text-align: center;
  margin-top: 10px;
}
.eventsScale {
  border: 1px solid #35383F;
  border-radius: 18px;
  min-width: 100px;
  min-height: 26px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.eventsScale:first-child {
  margin-right: 3px;
}
.cardClock {
  display: flex;
  position: relative;
  width:24px;
  height: 24px;
  top: 12px;
  left: 12px;
  padding: 2px;
  gap: 10px;
  border-radius: 6px;
  background-color: #FFFFFFCC;
  -webkit-transition: width 500ms ease;
  -moz-transition: width 500ms ease;
  -ms-transition: width 500ms ease;
  -o-transition: width 500ms ease;
  transition: width 500ms ease;
  p {
    position: absolute;
    opacity: 0;
    font-family: Bert Sans;
    font-size: 12px;
    font-weight: 300;
    line-height: 18.46px;
    text-align: left;
    color: #35383F;
    height: 0px;
  }
}

.cardClock:hover {
  width: 100%;
  p {
    //-webkit-transition: all 5s ease;
    //-moz-transition: all 5s ease;
    //-ms-transition: all 5s ease;
    //-o-transition: all 5s ease;
    transition: opacity 500ms ease;
    transition-delay: 500ms;
    opacity: 1;
  }

}

//Общий стиль компонента
.action {
    &-title {
      margin-bottom: 40px;
      font-family: Akrobat;
      font-size: 52px;
      font-weight: 700;
      line-height: 62.4px;
      text-align: left;

      @media screen and (max-width: 575px) {
          font-family: Akrobat;
          font-size: 40px;
          font-weight: 600;
          line-height: 48px;
          text-align: left;
        }
    }
    &-slides {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
      @media (max-width: 768px) {
        display: initial;
      }
    }
}
//Стили аккордеонов
.settings {
    &-container {
        //width: 320px;
        margin-right: 16px;
        margin-bottom: 80px;
    }
    &-text {
        align-items: baseline;
    }
    &-buttoms {
        width: 100%;
        margin-top: 40px;
        height: 40px;
        display: flex;
        justify-content: space-around;
    }
    &-radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 10px;
    }
    &-radio input {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
    &-select {
        padding-right: 5px;
    }
    &-btm {
        width: 114px;
        border-radius: 10px;
        background-color: #39bfbf;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-checkbox {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &-checkbox input {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
    &-label {
        font-family: Bert Sans;
        font-size: 1.2vw;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-top: 5px;
        margin-bottom: 2px;
    }
    &-btminv {
        width: 114px;
        border-radius: 10px;
        border: 2px solid #35383f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
//Стиль сортировки
.events {
  &__sort {
    &__select {
      max-height: 32px;
      margin-right: 4px;
    }
    &-select {
      max-height: 32px;
      margin-right: 4px;
      border: 1px solid #B6B6B6;
      border-radius: 10px;
    }
    &-button {
      width: 32px;
      height: 32px;
    }
    @media (max-width: 768px) {
      &-button {
        margin-left: 0;
      }

    }
    &-buttonDirection {
      border-radius: 10px;
      width: 32px;
      height: 32px;
      margin-left: 0;
      border: 1px solid #B6B6B6 !important;
    }
  }
}
.reverseBtnActive {
  border: 2px solid #35383F !important;
}
.sort {
    &-container {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        @media (max-width: 768px) {
          flex-flow: column-reverse;
          height: initial;
        }
    }
    &-layout {
      @media (max-width: 768px) {
        margin-top: 10px;
        gap: 8px;
        margin-bottom: 20px;
      }
    }
    &-alphabet {
        //width: 320px;
        display: flex;
        justify-content: flex-end;
        @media (max-width: 768px) {
          margin-top: 10px;
         }
    }
    &-select {
        //height: 50px;
        //position: relative;
        //display: flex;
        //flex-direction: column;
    }
    .education {
        width: 305px;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
}
.dashboard {
    background-image: url('@app/assets/icon/darhboard-active.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.dashboardD {
    background-image: url('@app/assets/icon/darhboard-disable.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuuA {
    background-image: url('@app/assets/icon/MenuA.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuu {
    background-image: url('@app/assets/icon/Menu.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
//Стиль поисковика
.searcher {
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
}
.events_magnifier {
    position: relative;
    top: -38px;
    left: 16px;
}
input {
    width: 100%;
    padding: 13px 0px 10px 60px;
    border-radius: 10px;
    border: 1px solid black;
}
//Сброс стилей аккордиона
.v-expansion-panel {
    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 24px;
        font-weight: 600;
        background-color: transparent;
        border-bottom: 1px solid #939393;
        color: #35383f;
        padding: 16px 0px;

        &__overlay {
            display: none;
        }
    }
}
.v-expansion-panel:not(:first-child)::after {
    display: none;
}
</style>
