<template>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <template v-slot="{ expanded }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Основная информация
                        </v-col>
                        <!-- <div v-if="">обязательно для заполнения</div> -->
                    </v-row>
                </template>
                <template v-slot:actions="{ expanded }">
                    <v-icon>
                        <SvgIcon icon-name="wrap" :class="{ expanded }" />
                    </v-icon>
                </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="row">
                    <div class="col">ФИО организатора</div>
                    <div class="col">Email</div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';
</script>

<style scoped>
.expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.formgroup {
    &-container {
        display: flex;
        flex-direction: row;
    }
}
</style>
