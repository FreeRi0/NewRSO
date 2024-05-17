<template>
    <div>
        <div class="member__content">
            <div class="member__image">
                <img v-if="item.user?.avatar?.photo" :src="item.user?.avatar?.photo" alt="Фото бойца" />
                <img v-else src="@app/assets/foto-leader-squad-stub.png" alt="Фото бойца" />
            </div>
            <div class="member__container">
                <p class="member__title">
                    {{
                        item.user?.last_name +
                        ' ' +
                        item.user?.first_name

                    }}
                </p>
                <p class="ml-1">{{ item.user.patronymic_name = null ? item.user.patronymic_name = ' ' :
                    item.user.patronymic_name }}</p>
                <p class="member__date">{{ item.user?.date_of_birth }}</p>
            </div>
        </div>
        <div class="member__wrap">
            <div class="member__select-box">
                <Select class="member__select" variant="outlined" clearable :items="functions" name="select_position"
                    id="select-position" placeholder="Выберите должность" v-model="positionMember"
                    @update:value="changeOption"></Select>
                <!-- {{ positionMember }} -->
            </div>
            <div class="member__block">
                <div class="member__confidant">
                    <FormCheckbox label="Доверенное лицо" :id="item.id" :value="item.user.last_name"
                        v-model:checked="confidant" @update:checked="changeConfidant"></FormCheckbox>

                </div>
                <div v-if="roleStore.roles.detachment_commander?.id" class="member__delete"
                    @click="deleteMember(item.id)">
                    <img src="@app/assets/closeDel.png" alt="del">
                </div>
            </div>


        </div>



    </div>

</template>

<script setup>
import { ref } from 'vue';
import { Select } from '@shared/components/selects';
import { FormCheckbox } from '@shared/components/checkboxes';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store';


const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    submited: {
        type: Boolean,
        default: false,
    },
    functions: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['updateMember', 'deleteMember']);
const confidant = ref(props.item.is_trusted);
const positionMember = ref(props.item.position);

const roleStore = useRoleStore();


const changeOption = (event) => {
    console.log(event);
    emit(
        'updateMember',
        {
            position: event,
        },
        props.item.id,
    );
};
const changeConfidant = (event) => {
    console.log(event);
    emit(
        'updateMember',
        {
            is_trusted: event,
        },
        props.item.id,
    );
};

const deleteMember = (memId) => {
    emit('deleteMember', memId)
    // console.log('id', memId);
}
</script>
