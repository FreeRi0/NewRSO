<template>
    <h1 class="act_title">Активные заявки</h1>
    <div class="container_top">
        <div class="checkborder_top">
            <input type="checkbox" v-model="model" :value="value" />
        </div>
        <div class="container_text">Выделить всё</div>
        <div class="active_select">
            <sortByEducation
                class="education"
                v-model="selectedPhone"
                :options="educations"
            ></sortByEducation>
        </div>
    </div>

    <!-- <div class="checkbox_1" v-for="participant in participants">
        <div class="checkborder">
            <input type="checkbox" v-model="model" :value="value" />
        </div>
        <div class="checkbox_container">
            <div class="checkbox_user">
                <img :src="'./assets/' + participant.image" alt="logo" />
                <p class="user_name">{{ participant.name }}</p>
            </div>
            <div class="checkbox_date">{{ participant.birthdate }}</div>
        </div>
        <span>{{ label }}</span>
    </div> -->
    <div class="activeApp_button">
        <Button label="Показать ещё" color="primary"></Button>
    </div>
</template>
<script setup>
// import participants from '@entities/user/index';
import { sortByEducation } from '@shared/components/selects';
import { computed, defineEmits, ref } from 'vue';
import { Button } from '@shared/components/buttons';
const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    label: { type: String },
});
const emit = defineEmits(['update:modelValue']);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const participants = ref([]);
const educations = ref([
    {
        value: 'Мой отряд',
        name: 'Мой отряд',
    },
    { value: 'Только руководители', name: 'Только руководители' },
]);
const selectedPhone = ref(0);
</script>
<style lang="scss">
.checkbox_1 {
    display: flex;
    margin-bottom: 12px;
}

.checkborder {
    border-radius: 10px;
    border: 1px solid #939393;
    min-width: 48px;
    height: 48px;
    text-align: center;
    background: #fff;
    margin-right: 10px;
}

.checkbox_container {
    width: 1122px;
    display: flex;
    border-radius: 10px;
    border: 1px solid var(--input_text_default, #b6b6b6);
    background: #fff;
    height: 48px;
    justify-content: space-around;
}

.checkbox_user {
    display: flex;
    align-items: center;
    width: 36px;
    justify-content: space-between;
    margin-right: 20px;
}

.checkbox_date {
    display: flex;
    margin-left: 890px;
    border-left: 1px solid #939393;
    margin-top: 11px;
    margin-bottom: 13px;
    padding-left: 10px;
}

.container_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.checkborder_top {
    border-radius: 10px;
    border: 1px solid #939393;
    min-width: 48px;
    text-align: center;
    height: 48px;
    background: #fff;
    margin-right: 10px;
}

.education {
    border-radius: 10px;
    border: 1px solid var(--input_text_default, #b6b6b6);
    background: var(--, #fff);
}

.activeApp_button {
    padding-top: 48px;
}

.container_text {
    padding-right: 830px;
}

.user_name {
    margin-left: 13px;
}

input[type='checkbox'] {
    width: 24px;
    height: 44px;
}

.act_title {
    padding-bottom: 40px;
}
</style>
