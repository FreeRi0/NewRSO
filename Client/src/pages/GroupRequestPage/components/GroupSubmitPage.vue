<template>
    <div class="container">
        <p class="main_title">Групповая заявка</p>
        <div class="form__field">
            <div class="contributor-search">
            <input
                    type="text"
                    id="search"
                    class="contributor-search__input"
                    @keyup="searchHeadquarters"
                    v-model="name"
                    placeholder="Начните вводить"
                />
                <img src="@app/assets/icon/search.svg" alt="search" />
                </div>
        </div>

        <div id="wrapper">
            <div id="left">
                <!-- Место под фильтры -->

                <!-- <div class="uploads">
                    <div
                        class="form-col"
                        v-for="(file, index) in files.length + 1"
                        :key="file"
                    >
                        <div class="form-fileupload" v-if="index < 6">
                            <img
                                class="paper-clip"
                                src="@app/assets/icon/addFile.svg"
                                alt="addFile"
                            />

                            <FileUpload
                                class="file-upload-text"
                                mode="basic"
                                name="demo[]"
                                accept=".pdf, .jpeg, .png"
                                :maxFileSize="7000000"
                                :customUpload="true"
                                chooseLabel="Выбрать файл"
                                @select="onUpload"
                                @clear="onRemove(index)"
                            ></FileUpload>
                        </div>
                    </div>
                </div> -->
            </div>

            <div id="right">
                <div class="additional_line">
                    <div class="horizontallso__confidant">
                        <input
                            type="checkbox"
                            v-model="isChecked"
                            @change="onCheckbox"
                        />
                    </div>

                    <p class="choose_all">Выделить все</p>

                    <a class="download_text" target="_blank">
                        <img class="download_img" src="/assets/download.svg" />
                        Cкачать список
                    </a>

                    <div class="sort_line">
                        <Button
                            type="button"
                            class="ascend"
                            icon="switch"
                            @click="ascending = !ascending"
                            color="white"
                        ></Button>
                    </div>
                </div>

                <!-- <multi-stage-submit-item
                    v-for="user in sortedUsersList"
                    :key="user.id"
                    :user="user"
                    @select="onToggleSelectUser"
                /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Button } from '@shared/components/buttons';
import { useRouter } from 'vue-router';

const route = useRoute();

const usersList = ref({});
const ascending = ref(true);

const getUsersList = async () => {
    try{
        const {data} = HTTP.get(`/events/${route.params.id}/group_applications`,{
            header: {
                'Content-type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            }
        })
        console.log(data);
        usersList.value = data;
    } catch (e) {
        console.log('getUsersList error', e);
    }
}

watch(ascending, () => {
    // if (!ascending.value) {
    //     sortedHeadquartersJunior.value.reverse();
    // }
    console.log(123);
});

onMounted(async () => {
    await getUsersList();
})
</script>

<style scoped lang="scss">
.container {
    margin: 0 auto;
    max-width: 1115px;
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
#wrapper {
    display: flex;
}
#left {
    width: 25%;
}
#right {
    margin-left: 24px;
    width: 75%;
}
.form-input-container {
    border: 1px solid #b6b6b6;
    border-radius: 15px;
    padding-left: 20px;
    margin-bottom: 40px;

    font-family: Akrobat;
    font-size: 24px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: 0px;
    text-align: left;
}
.form__field {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 0px;
}

.text_total {
    width: 1180px;
    height: 26px;
    margin-top: 60px;
    margin-bottom: 40px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}
.competitions__btns {
    display: grid;
    width: 100%;
    justify-content: center;
    margin-top: 68px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    width: 48px;
    height: 48px;
    input {
        width: 100%;
        height: 100%;
    }
}
.choose_all {
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
}
.additional_line {
    display: grid;
    grid-template-columns: 48px 1fr minmax(auto, 150px) minmax(auto, 300px);
    grid-gap: 12px;
    align-items: center;
    margin-bottom: 40px;
}
.download_text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #1f7cc0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.download_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 4px;
}
.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
.sort-select {
    &--width {
        width: 193px;
    }
    & > .form__select {
        margin-bottom: 0px;
    }
}
.sort_line {
    display: flex;
    align-items: center;
}
.contributor-search__input {
    width: 100%;
    padding: 13px 0px 10px 60px;
    border-radius: 10px;
    border: 1px solid black;
}
.contributor-search {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 40px;
}
.contributor-search img {
    position: absolute;
    top: 15px;
    left: 16px;
}
</style>