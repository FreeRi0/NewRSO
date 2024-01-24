<template>
    <div class="checked">
        <div class="checked-item__wrapper">
            <div class="checked-img">
                <img
                    :src="participant.user.avatar?.photo"
                    alt="logo"
                    v-if="participant.user.avatar?.photo"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p class="horizontallso-item__list-full">
                        {{participant.user.last_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.user.first_name }}
                    </p>
                    <p class="horizontallso-item__list-full">
                        {{ participant.user.patronymic_name }}
                    </p>
                </div>
                <div class="checked-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{participant.user.date_of_birth }}</p>
                </div>
            </div>
        </div>
        <div class="sort-select ml-3">
            <sortByEducation
                placeholder="Выберете действие"
                variant="outlined"
                clearable
                v-model="user.is_verified"
                :options="filteredPayed"
            ></sortByEducation>
        </div>
        <div class="checked__confidant ml-3">
            <input
                type="checkbox"
                v-model="checked"
                :value="participant"
                @change="updateMembership"
            />
        </div>
        <Button
            class="save"
            type="button"
            label="Сохранить"
            @click="ChangeStatus(participant.id)"
        ></Button>
    </div>
    <p v-if="isError" class="error">{{ isError.detail }}</p>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { sortByEducation } from '@shared/components/selects';
import { useRoute } from 'vue-router';
import { ref, watch, inject } from 'vue';
import { HTTP } from '@app/http';



const props = defineProps({
   participant: {
        type: Object,
        require: true,
    },
    participants: {
        type: Array,
        require: true,
    },
    selectedParticipants: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['change']);
const updateMembership = (e) => {
    console.log('checkeed', checked.value);
    emit('change', checked.value, props.participant.user.id );
};

const checked = ref(true);
const isError = ref([]);

const selectedPeoples = ref(props.selectedParticipants);
const swal = inject('$swal');

const user = ref({
    is_verified: null,
});

const filteredPayed = ref([
    {
        value: 'Одобрен',
        name: 'Одобрен',
    },
    { value: 'Неодобрен', name: 'Неодобрен' },
]);

watch(
    () => props.selectedParticipants,
    (newChecked) => {
        if (!newChecked) return;
        selectedPeoples.value = newChecked;
    },
);

const ChangeStatus = async () => {
    let { id, ...rest } = props.participant.user;
    if (user.value.is_verified === 'Одобрен') {
        HTTP.post(`rsousers/${id}/verify/`, user.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
            .then((response) => {
                swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'успешно',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // participant.value = response.data; //emit
                console.log(response.data);
            })

            .catch(({ response }) => {
                isError.value = response.data;
                console.error('There was an error!', response.data);
                swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'ошибка',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    } else {
        HTTP.delete(
            `rsousers/${id}/verify/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        )
            .then((response) => {
                swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'успешно',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // participant.value = response.data; //emit
                console.log(response.data);
            })

            .catch(({ response }) => {
                isError.value = response.data;
                console.error('There was an error!', response.data);
                swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'ошибка',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }
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

    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
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

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}
.checked-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
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
.horizontallso-item__list-full {
    margin-right: 10px;
}
.save {
    // background-color: white;
    // color: #35383f;
    // border: 1px solid black;
    width: 168px;
    height: 48px;
    padding: 12px 32px;
    margin: 0px;
    span {
        font-size: 16px;
    }
}

.v-field {
    border-radius: 10px;
}
.sort-select {
    height: 46px;
    width: 185px;
}

.form__select {
    margin-bottom: 0px;
    border: none;
}
</style>
