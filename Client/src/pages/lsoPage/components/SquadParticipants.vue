<template>
    <section class="squad-participants">
        <section class="squad-tabs">
            <nav class="squad__navigation">
                <h3 class="squad-participants__title">Участники</h3>
                <div class="d-flex">
                    <Button v-for="tab in tabs" :key="tab.value" type="button" :label="tab.label" class="memberBtn"
                        :class="{ active: activeTab === tab.value, 'mr-2': tab.value === 'members' }"
                        @click="setActiveTab(tab.value)" />
                </div>
            </nav>
            <div class="squad__wrapper">
                <div :class="{ 'squad__wrapper-container': hasParticipants }">
                    <component :is="activeTabComponent" :participants="activeTabData" :verifiedMembers="activeTabData"
                        :isVerified="isVerified" />
                </div>
                <div v-if="showAllLink">
                    <router-link :to="allParticipantsRoute">
                        <div class="squad__wrapper-route">
                            Показать всех
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Button } from '@shared/components/buttons';
import { ParticipantsList } from '@features/Participants/components';
import useSquadParticipants from '@shared/composables/useSquadParticipants';

const route = useRoute();
const squadId = computed(() => route.params.id as string);
const { squad, members, verifiedMembers, fetchVerifiedMembers } = useSquadParticipants(squadId);

const MAX_DISPLAYED_MEMBERS = 6;

type TabValue = 'members' | 'verified';

const tabs = [
    { label: 'Уже в отряде', value: 'members' as TabValue },
    { label: 'Ожидают одобрение', value: 'verified' as TabValue },
];

const activeTab = ref<TabValue>('members');

const setActiveTab = (value: TabValue) => {
    activeTab.value = value;
};

const hasParticipants = computed(() => {
    return activeTab.value === 'members' 
        ? members.value.length > 0 
        : verifiedMembers.value.length > 0;
});
const isVerified = computed(() => activeTab.value !== 'members');

const activeTabComponent = computed(() => ParticipantsList);

const activeTabData = computed(() =>
    (activeTab.value === 'members' ? members.value : verifiedMembers.value).slice(0, MAX_DISPLAYED_MEMBERS)
);
 
const showAllLink = computed(() => {
    if (activeTab.value === 'members') {
        return members.value.length > MAX_DISPLAYED_MEMBERS;
    } else {
        return verifiedMembers.value.length > MAX_DISPLAYED_MEMBERS;
    }
});

const allParticipantsRoute = computed(() => ({
    name: 'allparticipants',
    params: { id: squad.value?.id },
}));

watch(squadId, async (newId) => {
    if (newId && route.name === 'lso') {
        await fetchVerifiedMembers(newId);
    }
}, { immediate: true });
</script>

<style scoped lang="scss">
/* Табы */
.squad__navigation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 60px;
}

.squad__wrapper {
    padding: 34px 46px 24px 46px;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
    margin-bottom: 80px;

    @media screen and (max-width: 1024px) {
        padding: 24px 34px 24px 34px;
    }

    @media screen and (max-width: 768px) {
        padding: 24px 24px 24px 24px;
    }

    @media screen and (max-width: 575px) {
        padding: 24px 7px 24px 7px;
    }

    &-route {
        margin-top: 40px;
        text-align: center;
        color: #5e5c5c;
        text-decoration: underline;
    }

    &-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;

        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr;
        }
    }
}

.squad-participants__list {
    border-radius: 10px;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.squad-participants__title {
    color: #212121;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 40px;
}

.memberBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 7px 12px;
    margin: 7px;
    height: 38px;

    @media (max-width: 575px) {
        font-size: 14px;
        font-family: 'Akrobat';
    }

    @media screen and (min-width: 320px) and (max-width:480px) {
        text-wrap: nowrap;
    }
}

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
}

/* ****************************************************************************************** */

.tab-position {
    position: absolute;
    top: 1px;
    right: 255px;
    margin-right: -18px;
}

.position-tab {
    position: absolute;
    top: 1px;
    right: 1px;
}

.squad-participant {
    list-style: none;
}

.squad-participants__list {
    margin-bottom: 40px;
}

.squad-participant_box {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.squad-participant_box img {
    margin-bottom: 32px;
    width: 120px;
    height: 120px;
    border-radius: 100%;
}

.squad-participant_box h5 {
    color: #35383f;
    text-align: center;
    font-family: 'BertSans';
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* видимость текста */
    width: 161px;
    overflow: hidden;
    text-overflow: ellipsis;
    //
    margin-bottom: 5px;
}

.squad-participant_box p {
    color: #676767;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.48px;
}

.squad-participants__link {
    display: flex;
    justify-content: center;
    color: #5e5c5c;
    font-family: 'Montserrat';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.4px;
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    /* расстояние */
    padding-bottom: 24px;
}

@media (max-width: 660px) {

    .position-tab,
    .tab-position {
        position: static;
        margin-right: 8px;
    }
}

@media (max-width: 646px) {

    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        height: 253px;
    }
}

@media (max-width: 612px) {

    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        height: 212px;
    }

    .squad-participant_box img {
        padding: 8px 16px 0px 16px;
        max-width: 130px;
    }

    .squad-participant_box h5 {
        font-size: 20px;
        width: 130px;
    }
}

@media (max-width: 493px) {

    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
        height: 169px;
        padding: 16px;
    }

    .squad-participant_box h5 {
        font-size: 20px;
        width: 95.5px;
    }

    .squad-participant_box p {
        font-size: 13px;
    }

    .squad-participant_box img {
        padding: 8px 16px 0px 16px;
        max-width: 95.5px;
    }
}

@media (max-width: 450px) {
    .squad__navigation>label {
        font-size: 16px;
        padding: 8px 15px;
    }
}

@media (max-width: 393px) {

    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(95.5px, 1fr));
        padding: 16px 7.5px;
    }
}

// /////////////////////////////////////////////////////////////////////////////////////</style>
