<template>
    <div class="container">
        <div class="references">
            <h2 class="references-title">
                Справка о членстве в РСО (для работодателя)
            </h2>
            <div class="references-search">
                <input
                    type="text"
                    id="search"
                    class="references-search__input"
                    v-model="searchParticipants"
                    placeholder="Поищем пользователей?"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
            </div>
            <!-- <Search v-model="searchParticipants" /> -->
            <div class="references-container">
                <filters></filters>
                <div class="references-items">
                    <div class="references-sort">
                        <div class="references-sort__all">
                            <Checkbox
                                :id="checkboxAll"
                                :value="checkboxAll"
                                v-model:checked="checkboxAll"
                            ></Checkbox>
                        </div>
                        <div class="sort-filters">
                            <div class="sort-select">
                                <sortByEducation
                                    v-model="sortBy"
                                    :options="sortOptionss"
                                ></sortByEducation>
                            </div>

                            <Button
                                @click="ascending = !ascending"
                                icon="icon"
                                color="white"
                            ></Button>
                        </div>
                    </div>
                    <div class="references-wrapper">
                        <referencesList
                            :participants="sortedParticipants"
                        ></referencesList>
                    </div>
                    <Button
                        @click="participantsVisible += step"
                        v-if="participantsVisible < participants.length"
                        label="Показать еще"
                    ></Button>
                    <Button
                        @click="participantsVisible -= step"
                        v-else
                        label="Свернуть все"
                    ></Button>
                </div>
            </div>

            <div class="references-form">
                <form action="#">
                    <div class="data-form refer">
                        <div class="form-field">
                            <label for="education-org"
                                >Дата начала действия справки<span
                                    class="valid-red"
                                    >*</span
                                ></label
                            >
                            <Input
                                name="date_start"
                                type="date"
                                class="input-big"
                            />
                        </div>
                        <div class="form-field">
                            <label for="facultet"
                                >Дата окончания действия справки
                            </label>
                            <Input
                                name="date_end"
                                type="date"
                                class="input-big"
                            />
                        </div>
                    </div>
                    <div class="form-field another">
                        <label for="course"
                            >Справка выдана для предоставления
                            <span class="valid-red">*</span></label
                        >
                        <Input
                            name="spravka-field"
                            type="text"
                            id="course"
                            class="input-full"
                            placeholder="Ответ"
                        />
                    </div>
                    <div></div>
                    <!-- <p :selectedPeoples="selectedPeoples">Selected Heroes: {{selectedPeoples}}</p> -->

                    <Button label="Получить справки"></Button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import participants from '@entities/Participants/participants';
import { Button } from '@shared/components/buttons';
import { RadioButton } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { referencesList, filters } from '@features/references/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';
import { Checkbox } from '@shared/components/checkboxes';

const participantsVisible = ref(12);
const checkboxAll = ref(true);

const step = ref(12);
const selectedPeoples = ref([]);

const ascending = ref(true);
const sortBy = ref('alphabetically');

const searchParticipants = ref('');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'birthdate', name: 'По дате вступления в РСО' },
    { value: 'days', name: 'Популярности' },
]);

const sortedParticipants = computed(() => {
    let tempParticipants = participants;

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);

    tempParticipants = tempParticipants.filter((item) => {
        return item.name
            .toUpperCase()
            .includes(searchParticipants.value.toUpperCase());
    });

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'birthdate') {
            let fc = a.birthdate,
                fn = b.birthdate;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'days') {
            return a.days - b.days;
        }
    });

    // tempParticipants = tempParticipants.filter((item) => item.inSquad === picked.value);

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    return tempParticipants;
});
</script>
<style lang="scss">
.references {
    padding: 60px 0px 60px 0px;
    &-title {
        font-size: 52px;
    }
    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    &-container {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        align-items: baseline;
    }
    &-search {
        position: relative;
        box-sizing: border-box;
        margin: 60px 0px 60px 0px;
        img {
            position: absolute;
            top: 15px;
            left: 16px;
        }
        &__input {
            width: 100%;
            padding: 13px 0px 10px 60px;
            border-radius: 10px;
            border: 1px solid black;
        }
    }
    &-wrapper {
        padding-top: 40px;
    }
}

.refer {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 140px;
    margin-top: 60px;
}

.another {
    margin-top: 50px;
}
.form-field label {
    font-size: 16px;
    font-family: BERTSANS;
    font-weight: 600;
    margin-bottom: 8px;
}

.input-big {
    width: 465px;
}

.input-full {
    width: 100%;
}

.references-sort__all {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 12px;
    min-width: 48px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;

    .v-field__overlay,
    .v-field__loader {
        display: none;
    }

    .v-input,
    .v-input__control,
    .v-field {
        width: 24px;
        // height: 50%;
        min-height: 0;
    }

    // .v-field__field {
    // }
    .v-field__input,
    .v-text-field input.v-field__input {
        // max-height: 24px;
        min-height: 0;
        width: 24px;
        height: 24px;
    }
}
</style>
