<template>
    <div v-if="!permissonDeny">
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
            <div id="left" v-if="width > 768">
                <filters
                    @update-district="updateDistrict"
                    @update-reg="updateReg"
                    @update-local="updateLocal"
                    @update-educ="updateEduc"
                    @update-detachment="updateDetachment"
                    :district="district"
                    :districts="districts"
                    :reg="reg"
                    :regionals="regionals"
                    :local="local"
                    :locals="locals"
                    :educ="educ"
                    :educ-head="educHead"
                    :detachment="detachment"
                    :detachments="detachments"
                    :roles="roles.roles.value"
                    :sorted-participants="sortedHeadquarters"
                />

                <div class="uploads">
                    <div
                        class="form-col"
                        v-for="(file, index) in files.length + 1"
                        :key="file"
                    >
                        <div class="form-fileupload" v-if="index < 6">
                            <SvgIcon class="paper-clip" iconName="add-file" />

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

            <div id="right" v-if="sortedHeadquartersJunior.length">
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
                        <SvgIcon class="download_img" iconName="download" />
                        Cкачать список
                    </a>

                    <div class="sort_line">
                        <div class="sort-select">
                            <sortByEducation
                                variant="outlined"
                                clearable
                                v-model="sortBy"
                                :options="sortOptionss"
                                class="Sort-alphabet"
                            ></sortByEducation>
                        </div>
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
                    v-for="headquarter in sortedHeadquarters"
                    :key="headquarter"
                    :headquarter="headquarter"
                    @select="onToggleSelectCompetition"
                />
                <p class="subtitle" v-if="!sortedParticipants.length">
                    Ничего не найдено
                </p>
            </div>
            <p class="subtitle" v-else>Ничего не найдено.</p>
        </div>

        <template v-if="selectedCompetitionsList.length">
            <p class="text_total">
                Итого: {{ selectedCompetitionsList.length }} ({{ memberCount }}
                участников)
            </p>
            <multi-stage-submit-select
                v-for="headquarter in selectedCompetitionsList"
                :key="headquarter.id"
                :headquarter="headquarter"
                @select="onToggleSelectCompetition"
            />
        </template>
        <div class="competitions__btns" v-if="selectedCompetitionsList.length">
            <Button
                class="save"
                type="button"
                label="Подать заявку"
                @click="onAction"
            ></Button>
        </div>
    </div>
    <p class="subtitle" v-else>Вы не можете подавать заявку</p>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, watch, onMounted, computed } from 'vue';

import MultiStageSubmitItem from './MultiStageSubmitItem.vue';
import MultiStageSubmitSelect from './MultiStageSubmitSelect.vue';
import FileUpload from 'primevue/fileupload';

import { useRouter } from 'vue-router';

import { sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';

import { filters } from '@features/Contributor/components';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useDistrictsStore } from '@features/store/districts';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { storeToRefs } from 'pinia';
import SvgIcon from '@shared/components/SvgIcon/SvgIcon.vue';

const props = defineProps({
    me: {
        type: Object,
        default: () => ({}),
    },
    event: {
        type: Object,
        default: () => ({}),
    },
    route: {
        type: Object,
        default: () => ({}),
    },
});

const width = ref(0);

const router = useRouter();
const sortBy = ref('alphabetically');
const permissonDeny = ref(false);

const headquartersJunior = ref([]);
const sortedHeadquartersJunior = ref([]);
const selectedCompetitionsList = ref([]);
const isChecked = ref(false);

const memberCount = ref(0);
const name = ref('');
const timerSearch = ref(null);
const ascending = ref(true);
const files = ref([]);

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'date_of_birth', name: 'По дате вступления в РСО' },
]);

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const regionalsStore = useRegionalsStore();

const districtsStore = useDistrictsStore();
const localsStore = useLocalsStore();
const educationalsStore = useEducationalsStore();
const squadsStore = useSquadsStore();
const regionals = ref([]);
const districts = ref([]);
const locals = ref([]);
const educHead = ref([]);
const educ = ref(null);
const detachments = ref([]);
const reg = ref(null);
const detachment = ref(null);
const district = ref(null);
const local = ref(null);
const isLoading = ref(false);
const sortedVal = ref([]);
const levelAccess = ref(7);

// Фильтры

const viewHeadquartersData = async (resp, search, join) => {
    try {
        isLoading.value = true;
        let routeName = 'DistrictHQ';
        if (resp.indexOf('districts') >= 0) {
            routeName = 'DistrictHQ';
        } else if (resp.indexOf('regionals') >= 0) {
            routeName = 'RegionalHQ';
        } else if (resp.indexOf('locals') >= 0) {
            routeName = 'LocalHQ';
        } else if (resp.indexOf('educationals') >= 0) {
            routeName = 'HQ';
        } else if (resp.indexOf('detachments') >= 0) {
            routeName = 'lso';
        } else if (resp.indexOf('rsousers') >= 0) {
            routeName = 'userpage';
        }
        const viewHeadquartersResponse = await HTTP.get(resp + search);

        let response = viewHeadquartersResponse.data.results;
        for (let i in response) {
            response[i]['route'] = routeName;
        }
        if (join) {
            const viewHeadquartersResponsetTwo = await HTTP.get(
                '/educationals/' + search,
            );
            educHead.value = viewHeadquartersResponsetTwo.data.results;
            let response2 = viewHeadquartersResponsetTwo.data.results;
            for (let i in response2) {
                response2[i]['route'] = 'HQ';
            }
            response = response.concat(response2);
        }
        sortedVal.value = response;
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
    let resp = '/regionals/';

    if (districtVal) {
        search = '?district_headquarter__name=' + districtVal;
    } else {
        search = '';
        resp = '/districts/';
    }

    if (districtVal) {
        search = '?district_headquarter__name=' + districtVal;
    } else {
        search = '';
        resp = '/districts/';
    }

    if (name.value) search += '&search=' + name.value;
    viewHeadquartersData(resp, search);

    district.value = districtVal;
};

const updateReg = (regVal) => {
    let search = '';
    let resp = '/locals/';
    if (regVal) {
        search = '?regional_headquarter__name=' + regVal;
    } else if (levelAccess.value < 2) {
        search = '?district_headquarter__name=' + district.value;
    }
    if (name.value) search += '&search=' + name.value;
    viewHeadquartersData(resp, search);

    reg.value = regVal;
};
const updateLocal = (localVal) => {
    let search = '';
    let resp = localVal ? '/educationals/' : '/locals/';

    if (localVal) {
        search = '?local_headquarter__name=' + localVal;
    } else if (levelAccess.value < 3) {
        search = '?regional_headquarter__name=' + reg.value;
    }
    if (name.value) search += '&search=' + name.value;

    viewHeadquartersData(resp, search, !localVal);

    local.value = localVal;
};

const updateEduc = (educVal) => {
    let search = '';
    let resp = educVal
        ? '/detachments/'
        : local.value
        ? '/educationals/'
        : '/locals/';
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

    viewHeadquartersData(resp, search);

    viewHeadquartersData(resp, search);

    educ.value = educVal;
};

const updateDetachment = (detachmentVal) => {
    let search = '';
    let resp = detachmentVal ? '/rsousers' : educ.value ? '/detachments/' : '';
    if (detachmentVal) {
        search = '?detachment__name=' + detachmentVal;
    } else if (levelAccess.value < 5) {
        search = '?educational_headquarter__name=' + educ.value;
    }
    if (name.value) search += '&search=' + name.value;

    viewHeadquartersData(resp, search);
    detachment.value = detachmentVal;
};

const getItemsByRoles = () => {
    if (!Object.keys(roleStore.roles).length) return false;
    if (!roles.roles.value.centralheadquarter_commander) {
        let search = '';
        let resp = '';
        let join = false;

        if (roles.roles.value.districtheadquarter_commander) {
            district.value =
                roles.roles.value.districtheadquarter_commander.name;
            search =
                '?district_headquarter__name=' +
                roles.roles.value.districtheadquarter_commander.name;
            resp = '/regionals/';
            levelAccess.value = 1;
        } else if (roles.roles.value.regionalheadquarter_commander) {
            reg.value = roles.roles.value.regionalheadquarter_commander.name;
            search =
                '?regional_headquarter__name=' +
                roles.roles.value.regionalheadquarter_commander.name;
            resp = '/locals/';
            join = true;
            locals.value = localsStore.locals.filter(
                (loc) => loc.regional_headquarter == reg.value,
            );
            levelAccess.value = 2;
        } else if (roles.roles.value.localheadquarter_commander) {
            local.value = roles.roles.value.localheadquarter_commander.name;
            search =
                '?local_headquarter__name=' +
                roles.roles.value.localheadquarter_commander.name;
            resp = '/educationals/';
            levelAccess.value = 3;
        } else if (roles.roles.value.educationalheadquarter_commander) {
            educ.value =
                roles.roles.value.educationalheadquarter_commander.name;
            search =
                '?educational_headquarter__name=' +
                roles.roles.value.educationalheadquarter_commander.name;
            resp = '/detachments/';
            levelAccess.value = 4;
        } else if (roles.roles.value.detachment_commander) {
            detachment.value = roles.roles.value.detachment_commander.name;
            search =
                '?detachment__name=' +
                roles.roles.value.detachment_commander.name;
            resp = '/rsousers';
            levelAccess.value = 5;
        }
        viewHeadquartersData(resp, search, join);
    } else {
        levelAccess.value = 0;
        let resp = '/districts/';
        viewHeadquartersData(resp, '');
    }
};

const sortedHeadquarters = computed(() => {
    let tempHeadquarters = sortedVal.value;

    // tempHeadquarters = tempHeadquarters.sort((a, b) => {
    //     if (sortBy.value == 'alphabetically') {
    //         let fa = a?.name.toLowerCase(),
    //             fb = b?.name.toLowerCase()

    //         if (fa < fb) {
    //             return -1;
    //         }
    //         if (fa > fb) {
    //             return 1;
    //         }
    //         return 0;
    //     }
    // });

    // if (!ascending.value) {
    //     tempHeadquarters.reverse();
    // }
    return tempHeadquarters;
});

watch(
    () => roles.roles.value,

    () => {
        getItemsByRoles();
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

watch(
    () => squadsStore.squads,
    () => {
        detachments.value = squadsStore.squads;
    },
);

//
const onUpload = (file) => {
    files.value.push(file.files[0]);
};

const onRemove = (index) => {
    files.value.splice(index, 1);
};

const onAction = async () => {
    try {
        selectedCompetitionsList.value = selectedCompetitionsList.value.map(
            (item) => {
                delete item.id;
                delete item.name;
                delete item.members_count;
                delete item.selected;
                item.participants_count = 1; // item.members_count;
                return item;
            },
        );

        if (files.value.length > 0) {
            let payload = {};
            payload.user = props.me;
            payload.event = props.event.value?.name;
            for (let file of files.value) {
                // console.log(file);
                // console.log(payload);
                payload.document = file;
                await HTTP.post(
                    `/events/${props.route.params.id}/user_documents/`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
            }
        }

        await HTTP.post(
            `/events/${props.route.params.id}/multi_applications/`,
            selectedCompetitionsList.value,
        );

        router.push({
            name: 'Action',
            params: {
                id: props.route.params.id,
            },
        });
    } catch (e) {
        console.log('onAction error', e);
    }
};

const onCheckbox = async (event) => {
    if (event.target.checked) {
        for (const obj of sortedHeadquartersJunior.value) {
            obj.selected = true;
            selectedCompetitionsList.value.push(obj);
        }
    } else {
        for (const obj of sortedHeadquartersJunior.value) {
            obj.selected = false;
        }
        selectedCompetitionsList.value = [];
    }
};

const onToggleSelectCompetition = (competition, isChecked) => {
    if (isChecked) {
        competition.selected = isChecked;
        selectedCompetitionsList.value = [
            ...selectedCompetitionsList.value,
            competition,
        ];
    } else {
        competition.selected = isChecked;
        selectedCompetitionsList.value = selectedCompetitionsList.value.filter(
            (c) => c.id !== competition.id,
        );
    }
};

const searchHeadquarters = () => {
    if (!name.value) {
        sortedHeadquartersJunior.value = headquartersJunior.value;
    }
    clearTimeout(timerSearch.value);
    timerSearch.value = setTimeout(() => {
        sortedByName(name.value);
    }, 400);
};

const sortedByName = async (name) => {
    // console.log(name);
    sortedHeadquartersJunior.value = headquartersJunior.value.filter((obj) =>
        obj.name.includes(name),
    );
    // console.log(sortedHeadquartersJunior.value);
};

const getHeadquartersJunior = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${props.route.params.id}/multi_applications`,
        );
        let i = 0;
        // console.log(data);
        if (data[0].district_headquarters) {
            headquartersJunior.value.push(
                ...data[0].district_headquarters.map((item) => {
                    delete item?.detachments;
                    delete item?.educational_headquarters;
                    item.district_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].regional_headquarters) {
            headquartersJunior.value.push(
                ...data[0].regional_headquarters.map((item) => {
                    delete item?.detachments;
                    delete item?.educational_headquarters;
                    item.regional_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].local_headquarters) {
            headquartersJunior.value.push(
                ...data[0].local_headquarters.map((item) => {
                    delete item?.detachments;
                    delete item?.educational_headquarters;
                    item.local_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].educational_headquarters) {
            headquartersJunior.value.push(
                ...data[0].educational_headquarters.map((item) => {
                    delete item?.detachments;
                    delete item?.educational_headquarters;
                    item.educational_headquarter = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        if (data[0].detachments) {
            delete data[0].detachments?.detachments;
            headquartersJunior.value.push(
                ...data[0].detachments.map((item) => {
                    delete item?.detachments;
                    delete item?.educational_headquarters;
                    item.detachment = item.id;
                    item.id = i;
                    i += 1;
                    return item;
                }),
            );
        }
        sortedHeadquartersJunior.value = headquartersJunior.value;
        // console.log(headquartersJunior.value);
        // console.log(headquartersJunior.value);
    } catch (e) {
        permissonDeny.value = true;
        // console.log('getApplications error', e);
    }
};

watch(selectedCompetitionsList, (newSelectedCompetitionsList) => {
    isChecked.value =
        newSelectedCompetitionsList.length == headquartersJunior.value.length;
});

watch(ascending, () => {
    if (!ascending.value) {
        sortedHeadquartersJunior.value.reverse();
    }
});

watch(selectedCompetitionsList, () => {
    memberCount.value = 0;
    for (const obj of headquartersJunior.value) {
        if (obj.selected) memberCount.value += obj.members_count;
        // console.log(selectedCompetitionsList.value);
    }
});

const onResize = () => {
    width.value = window.innerWidth;
    // console.log(width.value);
};

onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
    getItemsByRoles();
    getHeadquartersJunior();
});
</script>

<style scoped lang="scss">
.container {
    margin: 0px auto;
    padding-bottom: 60px;
}

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

.subtitle {
    font-style: normal;
    height: 26px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    margin-bottom: 24px;
}

.Sort-alphabet {
    margin-right: 8px;
}
</style>
