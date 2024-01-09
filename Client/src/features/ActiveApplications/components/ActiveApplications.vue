<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h1 class="act_title">Активные заявки</h1>
        <!--Табы-->
        <div class="d-flex mt-9 mb-9">
            <button
                class="contributorBtn"
                :class="{ active: picked === tab.name }"
                v-for="tab in tabs"
                :key="tab.id"
                @click="picked = tab.name"
                >{{ tab.name }}</button
            >
        </div>
        <verification v-if="picked == 'Верификация аккаунтов'"></verification>
        <application v-else-if="picked == 'Заявка на вступление в отряд'"></application>
        <changePassword v-else-if="picked == 'Заявка на участие в мероприятии'"></changePassword>
    </div>
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
const user = ref({});
const education = ref({});

const tabs = ref([
    {
        id: '1',
        name: 'Верификация аккаунтов',
    },
    {
        id: '2',
        name: 'Заявка на вступление в отряд',
    },
    {
        id: '3',
        name: 'Заявка на участие в мероприятии',
    },
]);
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Активные заявки', href: '#' },
]);
</script>
<style lang="scss">

.profile-title {
    font-size: 40px;
    margin-bottom: 40px;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    margin: 7px;
}

.active {
    background-color: #1c5c94;
    color: white;
}

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
