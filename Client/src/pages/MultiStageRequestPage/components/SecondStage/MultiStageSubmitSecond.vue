<template>
    <div class="form__field">
        <div class="contributor-search">
            <input
                type="text"
                id="search"
                class="contributor-search__input"
                @keyup="searchUsers"
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
                        iconn="iconn"
                        @click="ascending = !ascending"
                        color="white"
                    ></Button>
                </div>
            </div>

            <multi-stage-submit-item
                v-for="user in sortedUsersList"
                :key="user.id"
                :user="user"
                @select="onToggleSelectUser"
            />
        </div>
    </div>

    <template v-if="selectedUsersList.length">
        <p class="text_total">Итого:</p>

        <multi-stage-submit-select
            v-for="user in selectedUsersList"
            :key="user.id"
            :user="user"
            @select="onToggleSelectUser"
        />

        <div class="competitions__btns">
            <Button
                class="save"
                type="button"
                label="Подать заявку"
                @click="onAction"
            ></Button>
        </div>
    </template>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';

import MultiStageSubmitItem from './MultiStageSubmitItem.vue';
import MultiStageSubmitSelect from './MultiStageSubmitSelect.vue';

import { Button } from '@shared/components/buttons';
import { useRouter } from 'vue-router';

const usersList = ref([]);
const selectedUsersList = ref([]);
const sortedUsersList = ref([]);
const router = useRouter();

const isChecked = ref(false);
const ascending = ref(true);
const name = ref('');
const timerSearch = ref(null);

const props = defineProps({
    route: {
        type: Object,
        default: () => ({}),
    },
});

const getCompileList = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${props.route.params.id}/multi_applications/compile_lists/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        console.log(data);
        usersList.value = data;
        for (let obj of data) {
            obj.selected = false;
            sortedUsersList.value.push(obj);
        }
        console.log(sortedUsersList.value);
    } catch (e) {
        console.log('getCompileList error', e);
    }
};

const onToggleSelectUser = (user, isChecked) => {
    if (isChecked) {
        user.selected = isChecked;
        selectedUsersList.value = [...selectedUsersList.value, user];
    } else {
        user.selected = isChecked;
        selectedUsersList.value = selectedUsersList.value.filter(
            (u) => u.id !== user.id,
        );
    }
    console.log(selectedUsersList.value);
};

const onCheckbox = async (event) => {
    if (event.target.checked) {
        for (const obj of sortedUsersList.value) {
            obj.selected = true;
            selectedUsersList.value.push(obj);
        }
    } else {
        for (const obj of sortedUsersList.value) {
            obj.selected = false;
        }
        selectedUsersList.value = [];
    }
};

// Поле поиска
const searchUsers = () => {
    if (!name.value) {
        sortedUsersList.value = usersList.value;
    }
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        sortedByName(name.value);
    }, 400);
};

const sortedByName = async (name) => {
    console.log(name);
    sortedUsersList.value =
        usersList.value.filter((user) => user.first_name.includes(name)) ||
        usersList.value.filter((user) => user.last_name.includes(name));
    console.log(sortedUsersList.value);
};

const onAction = async () => {
    try {
        let payload = [];
        for (const user of selectedUsersList.value) {
            payload.push({ user: user.id });
        }
        HTTP.post(
            `/events/${props.route.params.id}/multi_applications/compile_lists/`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        router.push({
            name: 'Action',
            params: {
                id: props.route.params.id,
            },
        });
    } catch (e) {
        console.log('onACtion error', e);
    }
};

watch(selectedUsersList, (newSelectedUserrsList) => {
    isChecked.value = newSelectedUserrsList.length == usersList.value.length;
});

watch(ascending, () => {
    if (!ascending.value) {
        sortedUsersList.value.reverse();
    }
});

onMounted(async () => {
    await getCompileList();
});
</script>

<style scoped lang="scss">
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
.form {
    &-fileupload {
        display: flex;
        flex-direction: row;
        margin-left: 4px;
        font-family: Bert Sans;
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        gap: 10px;
        text-align: left;
        color: #1f7cc0;
        & > :deep(.p-) {
            display: none;
        }

        & :deep(.p-button-label) {
            text-decoration: underline;
        }
        & :deep(svg) {
            display: none;
        }
    }
    &-col {
        margin-left: 4px;
        margin-top: 36px;
    }
}
</style>
