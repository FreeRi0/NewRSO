<template>
    <div class="competition__overlay" @click="show = !show" v-if="show"></div>

    <div class="competition__send-application">
        <form class="competition__form">
            <button
                type="button"
                @click="show = !show"
                class="competition__button-close"
            >
                x
            </button>
            <p>Выберите номинацию</p>
            <div class="competition__group-button">
                <Button
                    type="button"
                    class="nav-user__button-agree mt-2 mx-auto"
                    label="Тандем"
                    color="primary"
                    size="large"
                    @click="isChooseSquad = true"
                ></Button>
                <Button
                    type="submit"
                    class="nav-user__button-agree mt-2 mx-auto"
                    label="Дебют"
                    color="primary"
                    size="large"
                    @click="SendApplication"
                ></Button>
            </div>
        </form>
    </div>

    <div v-if="isChooseSquad" class="competition__send-invitation">
        <form class="competition__form">
            <button
                type="button"
                @click="show = !show"
                class="competition__button-close"
            >
                x
            </button>
            <p>Выберите отряд</p>
            <pre>{{ juniorDetachment }}</pre>
            <v-select
                variant="outlined"
                clearable
                v-model="juniorDetachment"
                name="select_squad"
                id="select-squad"
                placeholder="Например, ССО Дружба"
                :items="squadsJunour"
            ></v-select>
            <Button
                type="submit"
                class="nav-user__button-agree mt-2 mx-auto"
                label="Отправить приглашение"
                color="primary"
                size="large"
                @click="sendApplication"
            ></Button>
        </form>
    </div>

    <div v-if="isError" class="competition__info">
        <button
            type="button"
            @click="show = !show"
            class="competition__button-close"
        >
            x
        </button>
        <p>
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Дебют&raquo; по&nbsp;причине: -дата
            основания отряда ранее 25.01.2024&nbsp;года.
        </p>
    </div>

    <div v-if="isError" class="competition__info">
        <button
            type="button"
            @click="show = !show"
            class="competition__button-close"
        >
            x
        </button>
        <p>
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Тандем&raquo; по&nbsp;причине: -дата
            основания отряда позже 25.01.2024&nbsp;года.
        </p>
    </div>

    <div v-if="isError" class="competition__info">
        <button
            type="button"
            @click="show = !show"
            class="competition__button-close"
        >
            x
        </button>
        <p>
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Тандем&raquo; по&nbsp;причине: -подать
            заявку на&nbsp;участие может только Командир отряда.
        </p>
    </div>

    <div v-if="isError" class="competition__info">
        <button
            type="button"
            @click="show = !show"
            class="competition__button-close"
        >
            x
        </button>
        <p>
            Извините, вы&nbsp;не&nbsp;можете подать заявку на&nbsp;участие
            в&nbsp;номинации &laquo;Дебют&raquo; по&nbsp;причине: -подать заявку
            на&nbsp;участие может только Командир отряда.
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Select } from '@shared/components/selects';
import { HTTP } from '@app/http';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});

const isError = ref(false);
const isChooseSquad = ref(false);
const juniorDetachment = ref(null);

let id = 1;

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
            // в консоли выводит пустой массив
            console.log('Юниор-отряды', response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const SendApplication = async (juniorDetacmentId) => {
    const body = {};

    if (juniorDetacmentId) {
        body.junior_detachment = juniorDetacmentId;
    }

    try {
        await HTTP.post(`/competitions/${id}/applications/`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
    } catch (e) {
        console.log('error application', e);
    }
};

onMounted(() => {
    getSquads();
});
</script>
<style lang="scss"></style>
