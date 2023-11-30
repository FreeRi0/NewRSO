<template>
    <div
        class="checked"
        v-for="participant in participants"
        :key="participant.id"
    >
        <div class="checked-item__wrapper">
            <div class="checked-img">
                <img :src="'./assets/' + participant.image" alt="logo" />
                <img
                    v-if="participant.useIcon"
                    class="checked-item__list-img-status"
                    :src="'./assets/icon/' + participant.icon"
                    alt="icon"
                />
            </div>
            <div class="containerHorizontal">
                <p class="checked-item__list-full">
                    {{ participant.name }}
                </p>
                <div class="checked-item__list-date">
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
        <div class="checked__confidant">
            <input
                type="checkbox"
                v-model="selectedPeoples"
                :value="participant"
                @change="(event) => updateCheck(participant, event)"

            />
        </div>
        <Button class="preview" type="button" label="Предпросмотр"></Button>

    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { ref, watch } from 'vue';
const emit = defineEmits(['change']);


const updateCheck = (participant, event) => {
    console.log('dddddddf', participant, event);
    // emit('change', participant, event);
};

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },

});
const selectedPeoples = ref(props.participants);

 watch(selectedPeoples,
 (newChecked) =>{
    if(!newChecked) return;
    emit('change', selectedPeoples)
    console.log(newChecked);
 })
</script>
<style lang="scss" scoped>
.checked {
    display: flex;
    align-items: center;
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
.checked-item__wrapper {
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
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.checked-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.checked-item p {
    margin-left: 10px;
}

.checked-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
}

.checked-item__list-img-status {
    position: absolute;
    width: 18px;
    max-height: 18px;
    top: -17px;
    right: -15px;
}

.checked-itemo__list-img {
    margin-right: 13px;
}

.checked-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.checked-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.checked__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    margin: 0px 12px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}

.preview {
    background-color: white;
    color: #35383f;
    border: 1px solid black;
    width: 168px;
    height: 48px;
    span {
        font-size: 16px;
    }
}
</style>
