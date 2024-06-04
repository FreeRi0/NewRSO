<template>
    <div class="form__field">
        <div class="contributor-search">
            <input type="text" id="search" class="contributor-search__input" @keyup="searchUsers" v-model="name"
                placeholder="Начните вводить" />
            <img src="@app/assets/icon/search.svg" alt="search" />
        </div>
    </div>

    <div id="wrapper">
        <div id="left">
            <filters @update-district="updateDistrict" @update-reg="updateReg" @update-local="updateLocal"
                @update-educ="updateEduc" @update-detachment="updateDetachment" :district="district"
                :districts="districts" :reg="reg" :regionals="regionals" :local="local" :locals="locals" :educ="educ"
                :educ-head="educHead" :detachment="detachment" :detachments="detachments" :roles="roles.roles.value"
                :sorted-participants="sortedParticipants" />

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
                    <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
                </div>

                <p class="choose_all">Выделить все</p>

                <a class="download_text" target="_blank">
                    <img class="download_img" src="/assets/download.svg" />
                    Cкачать список
                </a>

                <div class="sort_line">
                    <Button type="button" class="ascend" iconn="iconn" @click="ascending = !ascending"
                        color="white"></Button>
                </div>
            </div>

            <multi-stage-submit-item v-for="user in sortedParticipants" :key="user.id" :user="user"
                @select="onToggleSelectUser" />
            <p class="subtitle" v-if="!sortedParticipants.length">
                Ничего не найдено
            </p>
        </div>
    </div>

    <template v-if="selectedUsersList.length">
        <p class="text_total">Итого:</p>

        <multi-stage-submit-select v-for="user in selectedUsersList" :key="user.id" :user="user"
            @select="onToggleSelectUser" />

        <div class="competitions__btns">
            <Button class="save" type="button" label="Подать заявку" @click="onAction"></Button>
        </div>
    </template>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, watch, computed } from 'vue';

import MultiStageSubmitItem from './MultiStageSubmitItem.vue';
import MultiStageSubmitSelect from './MultiStageSubmitSelect.vue';

import { Button } from '@shared/components/buttons';
import { useRouter } from 'vue-router';
import { filters } from '@features/Contributor/components';

import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { storeToRefs } from 'pinia';

const usersList = ref([]);
const selectedUsersList = ref([]);
const sortedUsersList = ref([]);
const router = useRouter();

const isChecked = ref(false);
const ascending = ref(true);
const name = ref('');
const timerSearch = ref(null);

const width = ref(0);

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
        for (const obj of sortedParticipants.value) {
            obj.selected = true;
            selectedUsersList.value.push(obj);
        }
    } else {
        for (const obj of sortedParticipants.value) {
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

// Фильтры

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();

const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const participants = ref([]);
const participantsVisible = ref(10);

const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const educHead = ref([]);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const educ = ref(null);
const levelAccess = ref(7);
const selectedPeoples = ref([]);
const sortBy = ref('alphabetically');

const viewContributorsData = async (search) => {
    try {
        isLoading.value = true;
        const viewParticipantsResponse = await HTTP.get('/rsousers' + search,);
        participants.value = viewParticipantsResponse.data.results;
        isLoading.value = false;
        selectedPeoples.value = [];

        if (search.indexOf('districts') >= 0) {
            districts.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('regionals') >= 0) {
            regionals.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('locals') >= 0) {
            locals.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('educationals') >= 0) {
            educHead.value = viewParticipantsResponse.data.results;
        } else if (search.indexOf('detachments') >= 0) {
            detachments.value = viewParticipantsResponse.data.results;
        }
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const getFiltersData = async (resp, search) => {
    try {
        isLoading.value = true;
        const viewHeadquartersResponse = await HTTP.get(resp + search,);
        isLoading.value = false;

        if (resp.indexOf('districts') >= 0) {
            districts.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('regionals') >= 0) {
            regionals.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('locals') >= 0) {
            locals.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('educationals') >= 0) {
            educHead.value = viewHeadquartersResponse.data.results;
        } else if (resp.indexOf('detachments') >= 0) {
            detachments.value = viewHeadquartersResponse.data.results;
        }
    } catch (error) {
        console.log('an error occured ' + error);
    }
};
const updateDistrict = (districtVal) => {
    let search = '';
    if (districtVal) {
        search = '?district_headquarter__name=' + districtVal;
    } else {
        search = '';
    }

    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/regionals/', search);

    // let districtId = districtsStore.districts.find(
    //     (dis) => dis.name == districtVal,
    // )?.id;
    district.value = districtVal;
};

const updateReg = (regVal) => {
    let search = '';
    if (regVal) {
        search = '?regional_headquarter__name=' + regVal;
    } else if (levelAccess.value < 2) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/locals/', search);
    getFiltersData('/educationals/', search);

    reg.value = regVal;
};
const updateLocal = (localVal) => {
    let search = '';
    if (localVal) {
        search = '?local_headquarter__name=' + localVal;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search, !localVal);
    getFiltersData('/educationals/', search);

    local.value = localVal;
};

const updateEduc = (educVal) => {
    let search = '';
    if (educVal) {
        search = '?educational_headquarter__name=' + educVal;
    } else if (local.value) {
        search = '?local_headquarter__name=' + local.value;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    } else if (levelAccess.value < 4) {
        search = '?local_headquarter__name=' + local.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    getFiltersData('/detachments/', search);

    educ.value = educVal;
};

const updateDetachment = (detachmentVal) => {
    let search = '';
    if (detachmentVal) {
        search = '?detachment__name=' + detachmentVal;
    } else if (levelAccess.value < 5) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewContributorsData(search);
    detachment.value = detachmentVal;
};

const getUsersByRoles = () => {
    if (!Object.keys(roleStore.roles).length) return false;
    if (!roles.roles.value.centralheadquarter_commander) {
        let search = '';
        if (roles.roles.value.districtheadquarter_commander) {
            district.value =
                roles.roles.value.districtheadquarter_commander.name;
            search =
                '?district_headquarter__name=' +
                roles.roles.value.districtheadquarter_commander.name;
            levelAccess.value = 1;
            getFiltersData('/regionals/', search);
        } else if (roles.roles.value.regionalheadquarter_commander) {
            reg.value = roles.roles.value.regionalheadquarter_commander.name;
            search =
                '?regional_headquarter__name=' +
                roles.roles.value.regionalheadquarter_commander.name;
            locals.value = localsStore.locals.filter(
                (loc) => loc.regional_headquarter == reg.value,
            );
            levelAccess.value = 2;
            getFiltersData('/educationals/', search);
            getFiltersData('/locals/', search);
        } else if (roles.roles.value.localheadquarter_commander) {
            local.value = roles.roles.value.localheadquarter_commander.name;
            search =
                '?local_headquarter__name=' +
                roles.roles.value.localheadquarter_commander.name;
            levelAccess.value = 3;
            getFiltersData('/educationals/', search);
        } else if (roles.roles.value.educationalheadquarter_commander) {
            educ.value =
                roles.roles.value.educationalheadquarter_commander.name;
            search =
                '?educational_headquarter__name=' +
                roles.roles.value.educationalheadquarter_commander.name;
            levelAccess.value = 4;
            getFiltersData('/detachments/', search);
        } else if (roles.roles.value.detachment_commander) {
            detachment.value = roles.roles.value.detachment_commander.name;
            search =
                '?detachment__name=' +
                roles.roles.value.detachment_commander.name;
            levelAccess.value = 5;
        }
        viewContributorsData(search);
    } else {
        levelAccess.value = 0;
        getFiltersData('/districts/', search);
    }
};

const sortedParticipants = computed(() => {
    //let tempParticipants = participants.value;

    let tempParticipants = [];

    for (const participant of participants.value) {
        const exists = sortedUsersList.value.some(
            (obj) => obj.id === participant.id,
        );
        if (exists) tempParticipants.push(participant);
    }

    tempParticipants = tempParticipants.sort((a, b) => {
        if (sortBy.value == 'alphabetically') {
            let fa = a.first_name.toLowerCase(),
                fb = b.first_name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        } else if (sortBy.value == 'date_of_birth') {
            let fc = a.date_of_birth,
                fn = b.date_of_birth;

            if (fc < fn) {
                return -1;
            }
            if (fc > fn) {
                return 1;
            }
            return 0;
        }
    });

    if (!ascending.value) {
        tempParticipants.reverse();
    }

    tempParticipants = tempParticipants.slice(0, participantsVisible.value);
    return tempParticipants;
});

watch(
    () => roles.roles.value,

    () => {
        getUsersByRoles();
    },
);

watch(
    () => districtsStore.districts,
    () => {
        districts.value = districtsStore.districts;
    },
);

watch(
    () => regionalsStore.regionals,
    () => {
        let districtID = districtsStore.districts.length
            ? districtsStore.districts.find(
                (dis) => (dis.name = district.value),
            )?.id
            : roleStore.roles.districtheadquarter_commander?.id;
        regionals.value = regionalsStore.regionals.filter(
            (reg) => reg.district_headquarter == district.value,
        );
    },
);

watch(
    () => localsStore.locals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name == reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        locals.value = localsStore.locals.filter(
            (loc) => loc.regional_headquarter == regID,
        );
    },
);

watch(
    () => educationalsStore.educationals,
    () => {
        let regID = regionalsStore.regionals.length
            ? regionalsStore.regionals.find((reg) => reg.name == reg.value)?.id
            : roleStore.roles.regionalheadquarter_commander?.id;
        let locID = localsStore.locals.length
            ? localsStore.locals.find((loc) => loc.name == local.value)?.id
            : roleStore.roles.localheadquarter_commander?.id;
        educHead.value = educationalsStore.educationals.filter(
            (edh) => edh.regional_headquarter == regID,
        );
        if (local.value) {
            educHead.value = educationalsStore.educationals.filter(
                (edh) => edh.local_headquarter == locID,
            );
        }
    },
);

//

watch(selectedUsersList, (newSelectedUserrsList) => {
    isChecked.value = newSelectedUserrsList.length == usersList.value.length;
});

const onResize = () => {
    width.value = window.innerWidth;
    console.log(width.value);
};

onMounted(async () => {
    onResize();
    window.addEventListener('resize', onResize);
    getUsersByRoles();
    await getCompileList();
});
</script>

<style scoped lang="scss">
#wrapper {
    display: grid;
    grid-template-columns: 276px auto;
    gap: 24px;
}

@media screen and (max-width: 769px) {
    #wrapper {
        display: grid;
        grid-template-columns: auto;
    }
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

    &>.form__select {
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

        &> :deep(.p-) {
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
