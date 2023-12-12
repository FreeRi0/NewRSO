<template>
    <h1>Как пользоваться системой</h1>
    <form class="form" action="#" method="post">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="1" class="d-flex justify-start">
                            Пункт 1
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="paragraph__inner-content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsum incidunt reiciendis exercitationem accusamus sunt!
                        Ipsam blanditiis velit aperiam! Quae, odit eaque neque
                        consequatur incidunt voluptatum aliquam facilis
                        voluptate recusandae nisi mollitia beatae.
                    </p>
                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="2" class="d-flex justify-start">
                            Пункт 2
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="3" class="d-flex justify-start">
                            Пункт 3
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                            Пункт 4
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title v-slot="{ open }">
                    <v-row no-gutters>
                        <v-col cols="5" class="d-flex justify-start">
                            Пункт 5
                        </v-col>
                    </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="form__inner-content">
                    <v-card-actions class="form__button-group">
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Назад"
                            size="large"
                        ></Button>
                        <Button
                            class="form__button form__button--prev"
                            variant="text"
                            label="Далее"
                            size="large"
                        ></Button>
                    </v-card-actions>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </form>
</template>

<script setup>
import { Button } from '@shared/components/buttons';
</script>

<style lang="scss" scoped>
.form {
    font-family: 'BertSans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #35383f;
    background-color: transparent;

    &__inner-content {
        border-bottom: 1px solid #d9d9d9;
        background-color: #ffffff;
    }

    &__field-group {
        padding: 32px 16px 24px;
        background-color: #ffffff;
        position: relative;

        &::before {
            position: absolute;
            content: '';
            top: -8px;
            right: -24px;
            left: -24px;
            bottom: -16px;
            border: 1px solid #b6b6b6;
            border-radius: 10px;
        }
    }

    &__field {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    &__button-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 56px 0 44px;
    }

    &__button {
        width: 132px;
        min-height: 52px;
        margin: 0;
        padding: 16px 32px;
        font-family: 'Bert Sans';
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-transform: none;

        &--next,
        &--prev {
            width: 131px;
            color: #35383f;
            border: 2px solid #35383f;
            background-color: #ffffff;
        }
    }
}

//test
</style>
