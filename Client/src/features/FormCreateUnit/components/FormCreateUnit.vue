<template>
    <form>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                                Основная информация
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-text-field
                        v-model="trip.start2"
                        label="Название отряда"
                        placeholder="Например, Монолит"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name4"
                        hide-details
                        label="Выберите направление"
                        placeholder="Например, ССО"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.start"
                        label="Дата основания"
                        type="date"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name2"
                        hide-details
                        label="Выберите регион"
                        placeholder="Например, Алтайский край"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name7"
                        hide-details
                        label="Город"
                        placeholder="Например, Барнаул"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name5"
                        hide-details
                        label="Выберите учебное заведение"
                        placeholder="Например, Алтайский государственный медицинский университет"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name6"
                        hide-details
                        label="Командир отряда:"
                        placeholder="Поиск по ФИО"
                    ></v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="text"> Далее </v-btn>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Контакты
                        </v-col>
                        <!-- <v-col cols="8" class="text--secondary">
                            <v-fade-transition leave-absolute>
                                <span v-if="open" key="0">
                                    Select trip destination
                                </span>
                                <span v-else key="1">
                                    {{ trip.location }}
                                </span>
                            </v-fade-transition>
                        </v-col> -->
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-text-field
                        v-model="trip.name3"
                        hide-details
                        label="Группа отряда ВКонтакте"
                        placeholder="Например, https://vk.com/cco_monolit"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name4"
                        hide-details
                        label="Группа отряда в Телеграмме"
                        placeholder="Например, https://t.me/cco_monolit"
                    ></v-text-field>
                    <!-- <v-spacer></v-spacer> -->
                    <!-- <v-col cols="5">
                            <v-select
                                v-model="trip.location"
                                :items="locations"
                                chips
                                flat
                                variant="solo"
                            ></v-select>
                        </v-col> -->

                    <!-- <v-divider vertical class="mx-4"></v-divider> -->

                    <!-- <v-col cols="3">
                            Select your destination of choice
                            <br />
                            <a href="#">Learn more</a>
                        </v-col> -->

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="text"> Назад </v-btn>
                        <v-btn variant="text"> Далее </v-btn>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Оформление
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-text-field
                        v-model="trip.name8"
                        hide-details
                        label="Девиз отряда"
                        placeholder="Например, через тернии к звездам"
                    ></v-text-field>
                    <v-text-field
                        v-model="trip.name9"
                        hide-details
                        label="Об отряде"
                        placeholder="Расскажите об отряде"
                    ></v-text-field>
                    <!-- <v-col cols="3">
                            <v-text-field
                                v-model="trip.start"
                                label="Start date"
                                type="date"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field
                                v-model="trip.end"
                                label="End date"
                                type="date"
                            ></v-text-field>
                        </v-col> -->

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="text"> Назад </v-btn>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text"> Сохранить </v-btn>
            </v-card-actions>
        </v-expansion-panels>
    </form>
</template>

<script>
// import { ref } from 'vue';

// const items = ref([
//     { title: 'Основная информация' },
//     { title: 'Контакты' },
//     { title: 'Оформление' },
// ]);

export default {
    data: () => ({
        trip: {
            name: '',
            location: null,
            start: null,
            end: null,
        },
        locations: [
            'Australia',
            'Barbados',
            'Chile',
            'Denmark',
            'Ecuador',
            'France',
        ],
    }),
};
</script>
