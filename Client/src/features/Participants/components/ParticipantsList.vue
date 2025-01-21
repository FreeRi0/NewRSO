<template>
    <v-progress-circular v-if="isLoading" class="circleLoader text-center" indeterminate color="blue" />
    <template v-else>
        <template v-if="displayMembers.length && !horizontal">
            <participantItem v-for="member in displayMembers" :key="member.id" :participant="member"
                :horizontal="horizontal" :position="member.position" :isVerified="isVerified" />
        </template>
        <template v-else-if="displayMembers.length && horizontal">
            <participantItem v-for="member in displayMembers" :key="member.id" :participant="member"
                :position="member.position" :horizontal="horizontal" :isVerified="isVerified" />
        </template>
        <h2 v-else class="notFound">{{ notFoundMessage }}</h2>
    </template>
</template>
<script setup>
import { computed } from 'vue';
import { participantItem } from '@entities/Participants';

const props = defineProps({
    participants: {
        type: Array,
        required: true,
        default: () => [],
    },
    verifiedMembers: {
        type: Array,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
    horizontal: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const displayMembers = computed(() => 
  props.isVerified ? props.verifiedMembers : props.participants
);


const notFoundMessage = computed(() => {
    return props.isVerified ? "Заявки на верификацию не найдены..." : "Участники не найдены...";
});
</script>

<style scoped lang="scss">
.notFound {
    text-align: center;
    font-size: 18px;
    font-family: 'Akrobat';

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }

    @media screen and (max-width: 575px) {
        font-size: 14px;
    }
}

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
</style>
