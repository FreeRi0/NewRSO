<template>
    <div
        class="horizontallso"
        v-for="participant in participants"
        :key="participant.id"
    >
        <!-- <referenceItem v-for="participant in participants" :participant="participant" :key="participant.id"></referenceItem> -->
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
    <!-- <pre>{{  }}</pre> -->
</template>

<script setup>
// import referenceItem from '@entities/ReferencesPeoples/components';

import { ref, watch } from 'vue';

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
    selectedParticipants: {
        type: Array,
        default: () => []
    },
});

const selectedPeoples = ref(props.selectedParticipants);

// watch(selectedPeoples,
//  (newChecked) =>{
//     if(!newChecked) return;
//     emit('change', selectedPeoples)
//     console.log(newChecked);
//  });

watch(
    () => props.selectedParticipants,
    (newChecked) => {
        if (!newChecked) return;
        selectedPeoples.value = newChecked;
    },
);

// const checkboxAll = ref(false);

// const select = () => {
//     selectedPeoples.value = [];

//     if (checkboxAll.value) {
//         for (participant in participants) {
//             selectedPeoples.value.push(participants[participant].id.toString());
//         }
//     }
// };
</script>

<style lang="scss" scoped>
.horizontallso {
    display: flex;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            position: relative;
            align-items: center;
        }
    }
}
.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-left: 12px;
    width: 100%;
    margin-bottom: 12px;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.horizontallso-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontallso-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
}

.horizontallso-item__list-img-status {
    position: absolute;
    width: 18px;
    max-height: 18px;
    top: -17px;
    right: -15px;
}

.horizontallso-itemo__list-img {
    margin-right: 13px;
}

.horizontallso-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}
</style>
