<template>
    <div class="container">
        <p class="main_title">Индивидуальная заявка</p>
        <p class="subtitle">
            Для участия в мероприятии ответь на несколько вопросов и/или прикрепи документы
        </p>
        
        <div v-for="issue in eventInfo.additional_issues" :key="issue">
            <div class="form__field">
            <label class="form-label" for="name-hq">
                {{ issue.issue }}
            </label>
            <InputText
                id="name-hq"
                v-model="answers"
                class="form__input form-input-container"
                placeholder="Ваш ответ"
                 name="name_hq"
                :maxlength="100"
            />
            </div>
            
        </div>
        <div>
            <p class="file_text">
                Загрузи сопутствующие документы:
            </p>
        </div>
        <div>
            <div class='form-col' v-for="(file, index) in files.length + 1" :key="file">
                <div class="form-fileupload">
                    <img 
                        src="@app/assets/icon/file.svg"
                        alt="file"
                    />
                    <FileUpload
                        class="file-upload-text"
                        mode="basic"
                        name="demo[]"
                        accept=".pdf, .jpeg, .png"
                        :maxFileSize="7000000"
                        :customUpload="true"
                        chooseLabel="Файл формата pdf, png, jpeg размером не более 7 мб"
                        @select="onUpload"
                        @clear="onRemove(index)"
                    ></FileUpload>
                    <img
                        src="@app/assets/icon/addFile.svg"
                        alt="addFile"
                    />
                </div>
            </div>
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

const getEventInfo = async () => {
    try {
        console.log(route.params.id)
        const { data } = await HTTP.get(
            `/events/${route.params.id}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        eventInfo.value = data;
        console.log(eventInfo.value.additional_issues);
    } catch (e) {
        console.log('get application error', e);
    }
}

const onUpload = (file) => {
    files.value.push(file.files[0]);
};

const onRemove = (index) => {
    console.log(files.value);
    files.value.splice(index, 1);
    console.log(files.value);
};

onMounted(async () => {
    await getEventInfo();
});
</script>

<style lang="scss" scoped>
.file-upload-text{
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #35383F;
}
.file_text{
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
}
.form{
  &-input-container{
    border: 1px solid black;
    border-radius: 15px;
    padding-left: 15px;
    margin-bottom: 24px;
  }
  &-label{
    font-family: Bert Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-top: 5px;
    margin-bottom: 2px;
    //styleName: название_инпуты;
    letter-spacing: 0em;
    text-align: left;
  }
  &-fileupload{
    display:flex;
    flex-direction: row;
  }
  &-col{
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 25px;
  }
}
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
}
.main_title {
    margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
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
</style>
