<template>
    <div class="competition__overlay" @click="closeAll"></div>

    <div class="competition__send-application">
        <form @submit.prevent class="competition__form">
            <button type="button" @click="closeSendApplication" class="competition__button-close">
                x
            </button>
            <p>Выберите номинацию</p>
            <div class="competition__group-button">
                <Button type="button" class="nav-user__button-agree mt-2 mx-auto" label="Тандем" color="primary"
                    size="large" @click="SendInvitation"></Button>
                <Button type="submit" class="nav-user__button-agree mt-2 mx-auto" label="Дебют" color="primary"
                    size="large" @click="SendApplication"></Button>
            </div>
        </form>
    </div>

    <div v-if="isChooseSquad" class="competition__send-invitation">
        <form @submit.prevent class="competition__form">
            <button type="button" @click="closeChooseSquad" class="competition__button-close">
                x
            </button>
            <p>Выберите отряд</p>
            <!-- <pre>{{ juniorDetachment }}</pre> -->
            <v-select variant="outlined" clearable v-model="juniorDetachment" item-value="id" item-title="name"
                name="select_squad" id="select-squad" placeholder="Например, ССО Дружба"
                :items="squadsJunour"></v-select>
            <Button type="submit" class="nav-user__button-agree mx-auto" label="Отправить приглашение" color="primary"
                size="large" @click="sendAppl(juniorDetachment)"></Button>
        </form>
    </div>

    <div v-if="errorIsStatusMentor" class="competition__info">
        <button type="button" @click="errorIsStatusMentor = !errorIsStatusMentor" class="competition__button-close">
            x
        </button>
        <p class="competition__message">
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Тандем&raquo; по&nbsp;причине:<br />- дата
            основания отряда позже 24.01.2024&nbsp;года.
        </p>
    </div>

    <div v-if="errorIsStatusStart" class="competition__info">
        <button type="button" @click="errorIsStatusStart = !errorIsStatusStart" class="competition__button-close">
            x
        </button>
        <p class="competition__message">
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Дебют&raquo; по&nbsp;причине:<br />- дата
            основания отряда ранее 25.01.2024&nbsp;года.
        </p>
    </div>

    <div v-if="isSucsess" class="competition__info">
        <button type="button" @click="closeSucsessMessage" class="competition__button-close">
            x
        </button>
        <p class="competition__message">Заявка успешно отправлена!</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    squad: {
        type: Object,
        default: () => ({}),
    },
});

// const userCommander = ref({});
// const allSquads = ref([]);

// const getUserCommander = async () => {
//     HTTP.get(`rsousers/me_commander/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             userCommander.value = response.data;
//             console.log('я командир', response);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// const getAllSquads = async () => {
//     HTTP.get(`detachments/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             allSquads.value = response.data;
//             console.log('Все отряды', response);
//             allSquads.value.forEach((member) => {
//                 console.log(member.status);
//             });
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// console.log(allSquads.value.)

const emit = defineEmits(['closePopUp', 'sucsess']);

const closeSendApplication = () => {
    emit('closePopUp');
};

let id = 1;

const isChooseSquad = ref(false);
let errorIsStatusStart = ref(false);
let errorIsStatusMentor = ref(false);
let isSucsess = ref(false);
const juniorDetachment = ref(null);

const closeChooseSquad = () => {
    isChooseSquad.value = false;
    closeSendApplication();
};

const closeSucsessMessage = () => {
    isSucsess.value = false;
    isChooseSquad.value = false;
    closeSendApplication();
};

const closeAll = () => {
    isChooseSquad.value = false;
    closeSendApplication();
    errorIsStatusStart.value = false;
    errorIsStatusMentor.value = false;
    isSucsess.value = false;
};

const squadsJunour = ref([]);

const getSquads = async () => {
    HTTP.get(`competitions/${id}/junour_detachments/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            squadsJunour.value = response.data;
            console.log('Юниор-отряды', response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const sliceNulls = (str) => {
    if (str.startsWith('0')) {
        return sliceNulls(str.slice(1));
    }

    return str;
};

//Дебют
const SendApplication = async () => {
    const body = {};

    if (
        new Date(
            ...props.squad.founding_date
                .split('-')
                .map((num, index) =>
                    index % 2 === 1
                        ? parseInt(sliceNulls(num)) - 1
                        : parseInt(sliceNulls(num)),
                ),
        ).getTime() < new Date(2024, 0, 25).getTime()
    ) {
        errorIsStatusStart.value = true;
        return;
    }

    try {
        await HTTP.post(`/competitions/${id}/applications/`, body,);
        isSucsess.value = true;
        emit('sucsess');
    } catch (e) {
        console.log('error application', e);
    }
};

//Тандем
const SendInvitation = async () => {
    if (
        new Date(
            ...props.squad.founding_date
                .split('-')
                .map((num, index) =>
                    index % 2 === 1
                        ? parseInt(sliceNulls(num)) - 1
                        : parseInt(sliceNulls(num)),
                ),
        ).getTime() >= new Date(2024, 0, 25).getTime()
    ) {
        console.log('err');
        errorIsStatusMentor.value = true;
        return;
    }

    isChooseSquad.value = true;
};

const sendAppl = async (juniorDetacmentId) => {
    const body = {};

    if (juniorDetacmentId) {
        body.junior_detachment = juniorDetacmentId;
    }

    try {
        await HTTP.post(`/competitions/${id}/applications/`, body,);
        isSucsess.value = true;
        emit('sucsess');
    } catch (e) {
        console.log('error application', e);
    }
};

onMounted(() => {
    getSquads();
    // getUserCommander();
    // getAllSquads();
});
</script>
<style lang="scss"></style>
