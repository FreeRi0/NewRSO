<template>
    <h1>Полезная информация</h1>
    <h2 class="helpInfo_title">Новичку о РСО</h2>
    <form class="form" action="#" method="post">
        <v-expansion-panels>  
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
                    <v-icon v-if="!expanded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <circle
                                cx="16"
                                cy="16"
                                r="15.5"
                                fill="#1F7CC0"
                                stroke="#1F7CC0"
                            />
                            <path
                                d="M23.9181 12.9492L17.3981 19.4692C16.6281 20.2392 15.3681 20.2392 14.5981 19.4692L8.07812 12.9492"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </v-icon>
                    <v-icon v-else>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <circle
                                cx="16"
                                cy="16"
                                r="15.5"
                                transform="rotate(-180 16 16)"
                                fill="#1F7CC0"
                                stroke="#1F7CC0"
                            />
                            <path
                                d="M8.08187 19.0508L14.6019 12.5308C15.3719 11.7608 16.6319 11.7608 17.4019 12.5308L23.9219 19.0508"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </v-icon>
                </template> 
                </v-expansion-panel-title>    
        
                
            <v-expansion-panel-text>
Hf,jnftn
            </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        
    </form>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
</script>

<style lang="scss">
.v-expansion-panel {
    &__shadow {
        box-shadow: none;
    }

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
