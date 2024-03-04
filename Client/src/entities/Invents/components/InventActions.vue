<template>
    <div class="container">
        <Breadcrumbs></Breadcrumbs>
        <div class="title">Активные заявки</div>
        <div class="menu">
            <router-link to="/activeInvents/accountVerification"
                ><segment class="menu-block"
                    >Верификация аккаунтов</segment
                ></router-link
            >
            <router-link to="/activeInvents/inventSquads"
                ><segment class="menu-block"
                    >Заявка на вступление в отряд</segment
                ></router-link
            >
            <router-link to="/activeInvents/inventActions"
                ><segment class="menu-block menu-block-active"
                    >Заявка на участие в мероприятии</segment
                ></router-link
            >
        </div>
        <router-view></router-view>
        <div class="invents-header">
            <div class="invents-block">
                <input type="checkbox" class="invents-checkbox" />
            </div>
            <Dropdown
                v-model="SelectedFunction"
                :options="SelectModes"
                optionlabel="title"
                placeholder="Выберите действие"
                class="invents-block invents-select"
            >
            </Dropdown>
        </div>
        <div v-for="invent in inventList" class="invents-main">
            <InventForm :action="invent"></InventForm>
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '@shared/components/breadcrumbs/Breadcrumbs.vue';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
import InventForm from '@entities/Invents/components/InventForm.vue';

const SelectedFunction = ref({});

const inventList = [
    {
        id: 1,
        title: 2,
    },
    {
        id: 1,
        title: 2,
    },
    {
        id: 1,
        title: 2,
    },
    {
        id: 1,
        title: 2,
    },
    {
        id: 1,
        title: 2,
    },
    {
        id: 1,
        title: 2,
    },
];

const SelectModes = [
    {
        title: 'Удалить',
        action: DeleteAction,
    },
    {
        title: 'Изменить',
        action: UpdateAction,
    },
];

function DeleteAction() {}
function UpdateAction() {}
</script>

<style lang="scss" scoped>
.menu {
    display: flex;
    width: 100%;
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 40px;

    &-block {
        height: 40px;
        display: flex;
        padding: 10px 24px;
        margin-right: 20px;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        color: #1c5c94;
        border: 2px solid #1c5c94;
        background: #fff;
    }
    &-block-active {
        color: #fff;
        background: #1c5c94;
        border: 2px solid #fff;
    }
}
.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
    border: none;
}
</style>
