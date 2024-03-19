<template>
    <div class="container">
        <p class="main_title">Групповая заявка</p>
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
                <group-filters @update-filter="onUpdateFilter" />

                <p class="count">
                    Объектов выбрано: {{ sortedUsersList.length }}
                </p>

                <div class="uploads">
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
                </div>
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
                        <div class="sort-select">
                            <sortByEducation
                                variant="outlined"
                                v-model="sortBy"
                                :options="sortOptions"
                                selected="sortBy"
                            ></sortByEducation>
                        </div>
                        <Button
                            type="button"
                            class="ascend"
                            icon="switch"
                            @click="ascending = !ascending"
                            color="white"
                        ></Button>
                    </div>
                </div>
                <group-submit-item
                    v-for="user in sortedUsersList"
                    :key="user.id"
                    :user="user"
                    @select="onToggleSelectUser"
                />
            </div>
        </div>
        <template v-if="selectedUsersList.length">
            <p class="text_total">Итого: {{ selectedUsersList.length }}</p>

            <group-submit-select
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
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import { sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { useRouter } from 'vue-router';

import GroupFilters from './GroupFilters.vue';
import GroupSubmitItem from './GroupSubmitItem.vue';
import GroupSubmitSelect from './GroupSubmitSelect.vue';

const sortBy = ref('alphabetically');

const route = useRoute();
const router = useRouter();

const files = ref([]);
const isChecked = ref(false);

const sortedUsersList = ref([]);
const selectedUsersList = ref([]);
const usersList = ref([]);

const ascending = ref(true);
const name = ref('');

const sortOptions = ref([
    {
        value: 'alphabetically',
        name: 'По алфавиту: от А - Я',
    },
    { value: 'date_of_birth', name: 'По дате рождения' },
]);

const timerSearch = ref(null);

const onUpdateFilter = (filterData) => {
    console.log(filterData);
    console.log(filterData.toAge == null);
    console.log(filterData.toAge == '');

    let search = '?';

    if (filterData.gender == 'man') {
        search += 'gender=male&';
    } else if (filterData.gender == 'woman') {
        search += 'gender=female&';
    }

    if (filterData.fee == 'paid') {
        search += 'membership_fee=True&';
    } else if (filterData.fee == 'notPaid') {
        search += 'membership_fee=False&';
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    if (filterData.toAge != null && filterData.toAge != '') {
        const formattedDate = `${year - filterData.toAge}-${month}-${day}`;
        search += `birth_date_to=${formattedDate}`;
    }
    if (filterData.fromAge != null && filterData.fromAge != '') {
        const formattedDate = `${year - filterData.fromAge}-${month}-${day}`;
        search += `birth_date_from=${formattedDate}`;
    }

    console.log(search);

    getUsersList(search);
};

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
    sortedUsersList.value = usersList.value.filter((obj) =>
        obj.name.includes(name),
    );
};

const getUsersList = async (search) => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/group_applications/${search}`,
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        console.log(data);
        usersList.value = [];
        for (const obj of data) {
            obj.name = obj.first_name + ' ' + obj.last_name;
            console.log(obj);
            usersList.value.push(obj);
        }
        // usersList.value = data;
        sortedUsersList.value = usersList.value;
    } catch (e) {
        console.log('getUsersList error', e);
    }
};

const onAction = async () => {
    try {
        let user_ids = [];
        for (const user of selectedUsersList.value) {
            user_ids.push(user.id);
        }
        await HTTP.post(
            `/events/${route.params.id}/group_applications/`,
            { user_ids },
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        router.push({
            name: 'Action',
            params: {
                id: route.params.id,
            },
        });
    } catch (e) {
        console.log('onAction error', e);
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
        for (const obj of usersList.value) {
            obj.selected = true;
            selectedUsersList.value.push(obj);
        }
    } else {
        for (const obj of usersList.value) {
            obj.selected = false;
        }
        selectedUsersList.value = [];
    }
};

const onUpload = (file) => {
    files.value.push(file.files[0]);
};

const onRemove = (index) => {
    files.value.splice(index, 1);
};

watch(selectedUsersList, (newSelectedUsersList) => {
    isChecked.value = newSelectedUsersList.length == usersList.value.length;
});

watch(sortBy, () => {
    console.log(sortedUsersList.value);
    if (sortBy.value == 'По алфавиту: от А - Я')
        sortedUsersList.value.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy.value == 'По дате рождения') {
        sortedUsersList.value.sort((a, b) => {
            if (a.date_of_birth > b.date_of_birth) return 1;
            if (a.date_of_birth == b.date_of_birth) return 0;
            if (a.date_of_birth < b.date_of_birth) return -1;
        });
    }
});

watch(ascending, () => {
    if (!ascending.value) {
        sortedUsersList.value.reverse();
    }
});

onMounted(async () => {
    await getUsersList('');
});
</script>

<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
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
.sort-select {
    &--width {
        width: 193px;
    }
    & > .form__select {
        margin-bottom: 0px;
    }
}
.count {
    margin-top: 36px;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21.1px;
    color: #898989;
}
</style>
