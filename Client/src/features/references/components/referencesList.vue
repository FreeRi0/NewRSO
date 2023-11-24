<template>
    <!-- <div class="references-sort__all">
        <input type="checkbox" @click="select" v-model="checkboxAll" />
    </div> -->
    <div
        class="horizontallso"
        v-for="participant in participants"
        :key="participant.id"
    >
        <div class="horizontallso__confidant">
            <input
                type="checkbox"
                v-model="selectedPeoples"
                :value="participant"
                @change="updateCheck"
            />
        </div>

        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img :src="'./assets/' + participant.image" alt="logo" />
                <img
                    v-if="participant.useIcon"
                    class="horizontallso-item__list-img-status"
                    :src="'./assets/icon/' + participant.icon"
                    alt="icon"
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ participant.name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.birthdate }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import referenceItem from '@entities/ReferencesPeoples/components';

import { ref } from 'vue';

const emit = defineEmits(['change']);

const updateCheck = (e) => {
    console.log('dddddd');
    emit('change', selectedPeoples.value);
};
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});

// const checkboxAll = ref(false);

const selectedPeoples = ref([]);

// const select = () => {
//     selectedPeoples.value = [];

//     if (checkboxAll.value) {
//         for (participant in participants) {
//             selectedPeoples.value.push(participants[participant].id.toString());
//         }
//     }
// };


</script>

<style lang="scss" scoped></style>
