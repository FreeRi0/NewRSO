<template>
    <keep-alive>
        <div class="container">
            <div class="participants">
                <h2 class="participants-title">Участники ЛСО</h2>
                <div class="participants-tabs">
                    <div class="d-flex">
                        <Button v-for="tab in tabs" :key="tab.value" type="button" :label="tab.label"
                            class="contributorBtn" :class="{ active: picked === tab.value }"
                            @click="() => handleTabClick(tab.value)" />
                    </div>
                </div>
                <Search v-model="name" @update:modelValue="searchMembers" placeholder="Иванов Иван" />
                <div class="participants-sort">
                    <changeButton :vertical="vertical" @switch="showVertical()" />
                    <div class="sort-filters">
                        <div class="sort-select sort-select--width-sort">
                            <sortByEducation variant="outlined" clearable v-model="sortBy" :options="sortOptions"
                                class="sort-alphabet" :sorts-boolean="false" placeholder="Выберите фильтр">
                            </sortByEducation>
                        </div>

                        <Button type="button" label="" class="ascend" @click="ascending = !ascending"
                            color="white"></Button>
                    </div>
                </div>

                <div :class="containerClass">
                    <ParticipantsList v-bind="listProps">
                    </ParticipantsList>
                </div>
                <paginationButton :next="next" :prev="prev" :limit="limit" :element="peoples"
                    :sorted-elements="sortedParticipants" />
            </div>
        </div>
    </keep-alive>
</template>
<script setup>
import { Button, changeButton, paginationButton } from '@shared/components/buttons';
import {
    ParticipantsList,
} from '@features/Participants/components';
import { Search } from '@shared/components/inputs';
import { scrollToLastElement, ListPropsMembers } from '@services/ListItemsServices.ts';
import { sortByEducation } from '@shared/components/selects';
import { useSquadsStore } from '@features/store/squads';
import { ref, computed, onMounted, watch, onActivated, nextTick } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import useSquadParticipants from '@shared/composables/useSquadParticipants';

const route = useRoute();
const squadsStore = useSquadsStore();
const squadId = computed(() => route.params.id);
const { squad, members, verifiedMembers, fetchVerifiedMembers } = useSquadParticipants(squadId);
const picked = ref(true);

const verified = ref([]);
const isLoading = ref(false);
const name = ref('');
const limit = 10;
const isVerified = ref(false);

const ascending = ref(true);
const sortBy = ref('user__date_of_birth');
const vertical = ref(true);
const peoples = ref({});
const sortedParticipants = ref([]);

const showVertical = () => {
    vertical.value = !vertical.value;
    nextTick(() => {
        scrollToLastElement(vertical.value, '.participants-wrapper__item');
    });
};

const next = () => {
    getMembers('next');
};

const prev = () => {
    getMembers();
};

const listProps = ListPropsMembers(sortedParticipants, isLoading, vertical, isVerified, verifiedMembers);

const tabs = [
    { label: 'Уже в отряде', value: true },
    { label: 'Ожидают одобрение', value: false }
];

const sortOptions = ref([
    {
        value: 'user__last_name',
        name: 'Алфавиту от А - Я',
    },
    { value: 'user__date_of_birth', name: 'По дате рождения' },
]);

const containerClass = computed(() => {
    const hasParticipants = sortedParticipants.value.length > 0 || verifiedMembers.value.length > 0;
    return {
        'participants-wrapper': vertical.value && hasParticipants,
        'horizontallso': !vertical.value && hasParticipants,
    };
});

const handleTabClick = (value) => {
    picked.value = value;
    isVerified.value = !value;
};
const getMembers = async (pagination, orderLimit) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        const url = buildMembersUrl(pagination, orderLimit);
        const response = await HTTP.get(url);

        if (response && response.data) {
            updateMembers(response.data, pagination);
            nextTick(() => {
                scrollToLastElement(vertical.value, '.participants-wrapper__item');
            });
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        isLoading.value = false;
    }
};

const buildMembersUrl = (pagination, orderLimit) => {
    const params = [];
    let url = `/detachments/${squadId.value}/members/?`;

    // Устанавливаем limit  
    if (orderLimit) {
        params.push(`limit=${orderLimit}`);
    } else {
        params.push(`limit=${limit}`);  // Используем фиксированный limit, если orderLimit не задан  
    }

    // Обработка пагинации  
    if (pagination === 'next') {
        peoples.value.next.includes('213.139.208.147:30000') ? url = peoples.value.next : url = peoples.value.next.replace('http', 'https');
    } else {
        // Добавление параметров поиска и фильтров, если не используем пагинацию "next"  
        if (name.value) params.push(`search=${encodeURIComponent(name.value)}`);
        if (sortBy.value) {
            params.push(`ordering=${ascending.value ? '' : '-'}${sortBy.value}`);
        }
    }
    return pagination ? url : url + (params.length ? params.join('&') : '');
};

const updateMembers = (response, pagination) => {
    if (pagination === 'next') {
        response.results = [...peoples.value.results, ...response.results]
    }
    peoples.value = response;
    sortedParticipants.value = response.results;
};
const updateSearch = (newValue) => {
    name.value = newValue;
};
const searchMembers = () => getMembers();
watch([sortBy, ascending], () => getMembers('', sortedParticipants.value.length));

onActivated(async () => {
    await getMembers();
    await fetchVerifiedMembers(squadId.value);
})
</script>
<style lang="scss">
.participants {
    padding: 0px 0px 60px 0px;

    &-title {
        font-size: 52px;

        @media screen and (max-width: 575px) {
            font-size: 40px;
        }
    }

    &-wrapper {
        padding: 60px 0px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;

        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    &-sort {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    &-search {
        position: relative;
        box-sizing: border-box;

        svg {
            position: absolute;
            top: 10px;
            left: 16px;
        }

        &__input {
            width: 100%;
            padding: 13px 0px 10px 60px;
            border-radius: 10px;
            border: 1px solid black;
        }
    }

    &-tabs {
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;

        &__item {
            color: #1c5c94;
            padding: 6px 24px;
            border: 1px solid #1c5c94;
            border-radius: 30px;
            text-align: center;
            font-size: 20px;
            background-color: white;
            font-family: 'Bert Sans';
            margin: 20px 20px 0px 0px;
            cursor: pointer;
            text-transform: none;
            box-shadow: none;

            @media screen and (max-width: 768px) {
                font-size: 14px;
                padding: 8px 8px;
                margin: 20px 8px 0px 0px;
            }
        }
    }

    .contributorBtn {
        border-radius: 30px;
        background-color: white;
        color: #1c5c94;
        border: 1px solid #1c5c94;
        margin: 0px;
        padding: 10px 24px;
        margin: 7px;
    }

    .active {
        background-color: #1c5c94;
        color: white;
        border: 1px solid #1c5c94;
    }

    .v-select__selection {
        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .form__select {
        margin-bottom: 0px;
        margin-right: 8px;
    }

    .dashboard {
        background-image: url('@app/assets/icon/darhboard-active.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .dashboardD {
        background-image: url('@app/assets/icon/darhboard-disable.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .menuuA {
        background-image: url('@app/assets/icon/MenuA.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .menuu {
        background-image: url('@app/assets/icon/Menu.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .horizontallso {
        padding-top: 40px;
    }
}
</style>
