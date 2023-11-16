<template>
  <div>Основные фильтры</div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Input } from '@shared/components/inputs';
import {RadioButton } from '@shared/components/buttons';
const panel = ref([]);
</script>
<style lang="scss">

</style>

 <!-- <v-expansion-panels v-model="panel">
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <template v-slot="{ expanded }">
                        <v-row no-gutters>
                            <v-col cols="4" class="d-flex justify-start">
                              Уровень поиска
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">

                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                           Направление отряда
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">

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
                <v-expansion-panel-text class="form__inner-content">
                </v-expansion-panel-text>
            </v-expansion-panel>

        </v-expansion-panels> -->