<template>
    <div class="container">
        <p class="main_title">Индивидуальная заявка</p>
        <p class="subtitle">
            Для участия в мероприятии ответь на несколько вопросов и/или
            прикрепи документы
        </p>

        <div v-for="(issue, index) in eventInfo.additional_issues" :key="issue">
            <div class="form__field">
                <label class="form-label" for="name-hq">
                    {{ issue.issue }}
                </label>
                <InputText id="name-hq" v-model="answers[index]" class="form__input form-input-container"
                    placeholder="Ваш ответ" name="name_hq" :maxlength="100" />
                <div class="form__counter" style="text-align: right">
                    <p v-if="answers[index] != undefined">
                        {{ answers[index].length }}/100
                    </p>
                    <p v-else>0/100</p>
                </div>
            </div>
        </div>

        <p class="file_text">Загрузи сопутствующие документы:</p>

        <div class="uploads">
            <div class="form-col" v-for="(file, index) in files.length + 1" :key="file">
                <div class="form-fileupload" v-if="index < 6">
                    <img class="file-upload-svg" src="@app/assets/icon/file.svg" alt="file" />

                    <FileUpload class="file-upload-text" mode="basic" name="demo[]" accept=".pdf, .jpeg, .png"
                        :maxFileSize="7000000" :customUpload="true"
                        chooseLabel="Файл формата pdf, png, jpeg размером не более 7 мб" @select="onUpload"
                        @clear="onRemove(index)"></FileUpload>

                    <img class="paper-clip" src="@app/assets/icon/addFile.svg" alt="addFile" />

                    <div class="clip-text">
                        <p v-if="index < files.length">Удалить файл</p>
                        <p v-else>Выбрать файл</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="button">
            <button @click="onSubmit" class="submit_button">
                Подать заявку
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import { HTTP } from '@app/http';

const eventInfo = ref({});
const route = useRoute();
const router = useRouter();
const answers = ref([]);
const files = ref([]);
const meInfo = ref({});

const submitAnswers = async () => {
    try {
        let payload = eventInfo.value.additional_issues;
        console.log('zalupa');
        console.log(payload);
        for (let index in answers.value) {
            payload[index].issue = payload[index].id;
            delete payload[index].id;
            payload[index].answer = answers.value[index];
            console.log(answers.value[index]);
        }
        payload = Array.from(payload);
        console.log(payload);
        await HTTP.post(`/events/${route.params.id}/answers/`, payload,);
    } catch (e) {
        console.log('submitAnswers error', e);
    }
};

const getEventInfo = async () => {
    try {
        const { data } = await HTTP.get(`/events/${route.params.id}`,);
        eventInfo.value = data;
    } catch (e) {
        console.log('getEventInfo error', e);
    }
};

const getMeInfo = async () => {
    try {
        const { data } = await HTTP.get(`/users/me/`,);
        meInfo.value = data;
    } catch (e) {
        console.log('getMeInfo error', e);
    }
};

const submitFiles = async () => {
    getMeInfo();
    getEventInfo();
    let payload = {};
    payload.user = meInfo.value;
    payload.event = eventInfo.value?.name;
    for (let file of files.value) {
        console.log(file);
        console.log(payload);
        payload.document = file;
        await HTTP.post(`/events/${route.params.id}/user_documents/`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
    }
};

const onSubmit = async () => {
    try {
        await submitAnswers();
        if (files.value.length > 0) submitFiles();
        await HTTP.post(
            `/events/${route.params.id}/applications/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        //console.log('Заявка отправлена');

        router.push({
            name: 'Action',
            params: {
                id: route.params.id,
            },
        });
    } catch (e) {
        console.log('onSubmit error', e);
    }
};

const onUpload = (file) => {
    files.value.push(file.files[0]);
};

const onRemove = (index) => {
    files.value.splice(index, 1);
};

onMounted(async () => {
    await getEventInfo();
});
</script>

<style lang="scss" scoped>
.file-upload-svg {
    margin-right: 8px;
}

.paper-clip {
    margin-left: 20px;
}

.file-upload-text {
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #b6b6b6;

    &> :deep(.p-) {
        display: none;
    }
}

.file_text {
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}

.form__field {
    margin-bottom: 24px;
}

.form {
    &-input-container {
        border: 1px solid #b6b6b6;
        border-radius: 15px;
        padding-left: 15px;
        //margin-bottom: 24px;
        margin-bottom: 4px;
    }

    &-label {
        font-family: Bert Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 8px;
        letter-spacing: 0em;
        text-align: left;
        color: #35383f;
    }

    &-fileupload {
        display: flex;
        flex-direction: row;

        & :deep(.p-button-label) {
            text-decoration: underline;
        }

        & :deep(svg) {
            display: none;
        }
    }

    &-col {
        padding-right: 15px;
        margin-top: 25px;
    }
}

.uploads {
    &>.form-col:last-child {
        color: #b6b6b6;
    }
}

.main_title {
    font-family: Akrobat;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    margin: 40px 0px;
    line-height: normal;
}

.subtitle {
    margin: 20px 0px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-family: Bert Sans;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
}

.submit_button {
    border-radius: 10px;
    background: #39bfbf;
    padding: 16px 32px;
    margin-left: 20px;
    color: #fff;
}

.button {
    padding-top: 60px;
    //margin-left: 20px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
}

.clip-text {
    margin-left: 4px;
    font-family: Bert Sans;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #1f7cc0;
}
</style>
