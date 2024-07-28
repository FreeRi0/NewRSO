<template>
    <div class="competitions__container">
        <p v-if="loading">Загрузка...</p>
        <p v-else-if="!applicationsData.length">Список заявок на вступление пуст</p>

        <template v-else>
            <div class="competitions__actions">
                <div class="horizontal__confidant">
                    <input type="checkbox" v-model="isCheckedAll" @change="onChooseAll" />
                </div>
                <v-select variant="outlined" class="form__field competitions__actions-select" :items="actionsList"
                    v-model="action" placeholder="Выберите действие" />
            </div>

            <div class="competitions__list">
                <template v-for="(application, index) in applicationsData" :key="application.id">
                    <active-headquarters-item :application="application" :position="index" @select="onToggleSelect" />
                </template>

                <template v-if="selectedApplications.length">
                    <p class="text_total">
                        Итого: {{ selectedApplications.length }}
                    </p>
                    <template v-for="application in selectedApplications" :key="application.id">
                        <active-headquarters-selected :application="application" :action="action" @select="onToggleSelect" />
                    </template>

                    <Button class="save" type="button" label="Сохранить" @click="onAction"></Button>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';

import ActiveHeadquartersItem from './ActiveHeadquartersItem.vue';
import ActiveHeadquartersSelected from './ActiveHeadquartersSelected.vue';
import { useRoleStore } from '@layouts/store/role';

const roleStore = useRoleStore();

const swal = inject('$swal');
const isCheckedAll =ref(false);
const loading = ref(false);
const action = ref('Одобрить');
const actionsList = ref(['Одобрить', 'Отклонить']);

const selectedApplications = ref([]);

const applicationsData = ref([]);

const onChooseAll = () => {
    if (isCheckedAll.value){
        for(let application of applicationsData.value){
            application.selected = true;
        }
        selectedApplications.value = applicationsData.value;
    } else {
        selectedApplications.value = [];
        for(let application of applicationsData.value){
            application.selected = false;
        }
    }
}

const onToggleSelect = (application, isChecked) => {
    if (isChecked) {
        application.selected = isChecked;
        selectedApplications.value = [...selectedApplications.value, application];
    } else {
        application.selected = isChecked;
        selectedApplications.value = selectedApplications.value.filter(
            (a) => a.id !== application.id,
        );
    }
};

const onAction = async () => {
    if(action.value === 'Одобрить'){
        try{
            for(let application of selectedApplications.value){
                applicationsData.value = applicationsData.value.filter(item => item != application);
                await HTTP.post(`/${application.headquarters.level}/${application.headquarters.id}/applications/${application.id}/accept/`)
                selectedApplications.value = [];
            }
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch(e){
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ошибка верификации`,
                showConfirmButton: false,
                timer: 2500,
            });
            console.log(e);
        }
        
    } else {
        try{
            for(let application of selectedApplications.value){
                applicationsData.value = applicationsData.value.filter(item => item != application);
                await HTTP.delete(`/${application.headquarters.level}/${application.headquarters.id}/applications/${application.id}/accept/`)
                selectedApplications.value = [];
            }
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch(e){
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ошибка верификации`,
                showConfirmButton: false,
                timer: 2500,
            });
            console.log(e);
        }
        
    }
}

watch(selectedApplications, (selectedApplications) => {
    isCheckedAll.value =
        applicationsData.value.length == selectedApplications.length;
});

const getApplications = async () => {
    loading.value = true;

    try{
        if(roleStore.roles.centralheadquarter_commander){
            const { data } = await HTTP.get(`/centrals/${roleStore.roles.centralheadquarter_commander}/applications`);
            const centralHQ = await HTTP.get(`/centrals/${roleStore.roles.centralheadquarter_commander}/`);
            console.log(centralHQ.data);
            if(data.length){
                for(let temp of data){
                    temp.headquarters = centralHQ.data;
                    temp.headquarters.level = 'centrals';
                    applicationsData.value.push(temp);
                }
            }
        }
    } catch(e){
        console.log(e);
    }

    try{
        if(roleStore.roles.districtheadquarter_commander){
            const { data } = await HTTP.get(`/districts/${roleStore.roles.districtheadquarter_commander.id}/applications`);
            if(data.length){
                for(let temp of data){
                    temp.headquarters = roleStore.roles.districtheadquarter_commander;
                    temp.headquarters.level = 'districts';
                    applicationsData.value.push(temp);
                }
            }
        }
    } catch(e){
        console.log(e);
    }

    try{
        if(roleStore.roles.educationalheadquarter_commander){
            const { data } = await HTTP.get(`/educationals/${roleStore.roles.educationalheadquarter_commander.id}/applications`);
            if(data.length){
                for(let temp of data){
                    temp.headquarters = roleStore.roles.educationalheadquarter_commander;
                    temp.headquarters.level = 'educationals';
                    applicationsData.value.push(temp);
                }
            }
        }
    } catch(e){
        console.log(e);
    }

    try{
        if(roleStore.roles.localheadquarter_commander){
            const { data } = await HTTP.get(`/locals/${roleStore.roles.localheadquarter_commander.id}/applications`);
            if(data.length){
                for(let temp of data){
                    temp.headquarters = roleStore.roles.localheadquarter_commander;
                    temp.headquarters.level = 'locals';
                    applicationsData.value.push(temp);
                }
            }
        }
    } catch(e){
        console.log(e);
    }

    try{
        if(roleStore.roles.regionalheadquarter_commander){
            const { data } = await HTTP.get(`/regionals/${roleStore.roles.regionalheadquarter_commander.id}/applications`);
            if(data.length){
                for(let temp of data){
                    temp.headquarters = roleStore.roles.regionalheadquarter_commander;
                    temp.headquarters.level = 'regionals';
                    applicationsData.value.push(temp);
                }
            }
        }
    } catch(e){
        console.log(e);
    }
    loading.value = false;
}

onMounted(async () => {
    await getApplications(); 
});
</script>

<style scoped lang="scss">
.competitions__actions {
    display: grid;
    width: 100%;
    margin-bottom: 40px;
    grid-template-columns: 48px 224px;
    justify-content: space-between;
    // width: 224px;
    height: 48px;
    gap: 10px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competitions__actions-select {
    background-color: inherit;
    min-width: 224px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

:deep(.v-field) {
    border-radius: 10px;
}

.competitions__btns {
    display: grid;
    width: 100%;
    justify-content: center;
    margin-top: 60px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.text_total {
    width: 1180px;
    height: 26px;
    margin: 40px 0;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}

:deep(.v-select__selection-text) {
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competition__item {
    display: grid;
    width: 100%;
    gap: 12px;
}

.competition__content {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(200px, 300px) minmax(200px, 300px) 1fr 100px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;

    input {
        width: 100%;
        height: 100%;
    }
}
.competitions__container{
    margin-bottom: 80px;
}
</style>