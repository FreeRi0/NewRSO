<template>
    <form
        @submit.prevent="ChangeStatus(participant.id)"
        class="checked"
        v-for="participant in participants"
        :key="participant.id"
    >
        <div class="checked-item__wrapper">
            <div class="checked-img">
                <img
                    :src="participant.media.photo"
                    alt="logo"
                    v-if="participants.media"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="checked-item__list-full">
                    {{ participant.first_name }}
                </p>
                <div class="checked-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.date_of_birth }}</p>
                </div>
            </div>
        </div>
        <div class="sort-select mx-3">
            <Select
                variant="outlined"
                v-model="usersData.membership_fee"
                :names="filteredPayed"
            ></Select>
        </div>
        <div class="checked__confidant">
            <input
                type="checkbox"
                v-model="selectedPeoples"
                :value="participant"
                @change="(event) => updateMembership(participant, event)"
            />
        </div>
        <Button class="preview" type="submit" label="Сохранить"></Button>
    </form>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { sortByEducation, Select } from '@shared/components/selects';
import { ref, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const emit = defineEmits(['change']);

const route = useRoute();
const id = route.params.id;

const usersData = ref({
    membership_fee: null,
});

const filteredPayed = ref([
    {
        value: 'membership_fee',
        name: 'Оплачен',
    },
    { value: 'membership_fee', name: 'Не оплачен' },
]);

const updateMembership = (participant, event) => {
    console.log('dddddddft', participant, event);
    // emit('change', participant, event);
};

const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
const selectedPeoples = ref(props.participants);

watch(selectedPeoples, (newChecked) => {
    if (!newChecked) return;
    emit('change', selectedPeoples);
    console.log(newChecked);
});

const ChangeStatus = async (id) => {
    HTTP.post(`rsousers/${id}/membership_fee_status/`, usersData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            usersData.value = response.data;
            console.log(response.data);
        })

        .catch((error) => {
            console.error('There was an error!', error);
        });
};
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

.sort-select {
    height: 46px;
}

.form__select {
    margin-bottom: 0px;
    margin-right: 8px;
    border: none;
}
</style>
