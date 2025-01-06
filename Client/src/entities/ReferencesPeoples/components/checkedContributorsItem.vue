<template>
    <div class="checked checkedReference">
        <div class="checked-item__wrapper">
            <div class="checked-img">
                <img :src="participantPhoto" :alt="participant.last_name" />
            </div>
            <div class="containerHorizontal">
                <div class="d-flex">
                    <p v-for="name in fullName" :key="name" class="horizontallso-item__list-full">
                        {{ name }}
                    </p>
                </div>
                <div class="checked-item__list-date">
                    <span class="date-separator"></span>
                    <p>{{ participant.date_of_birth }}</p>
                </div>
            </div>
        </div>
        <div class="checked__confidant ml-3">
            <input type="checkbox" :checked="isChecked" @change="updateMembership" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    participant: {
        type: Object,
        required: true,
    },
    selectedParticipants: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['change']);

const isChecked = computed(() =>
    props.selectedParticipants.some(item => item.id === props.participant.id)
);

const updateMembership = () => {
    emit('change', !isChecked.value, props.participant.id);
};

const participantPhoto = computed(() =>
    props.participant.media?.photo || '@app/assets/user-avatar.png'
);

const fullName = computed(() => [
    props.participant.last_name,
    props.participant.first_name,
    props.participant.patronymic_name
]);
</script>

<style lang="scss" scoped>
.checked {
    display: flex;
    margin-top: 12px;
    align-items: center;

    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;

        img {
            display: flex;
            position: relative;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 100%;
        }
    }

    &-item__wrapper {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        padding: 4px 20px;
        border-radius: 10px;
        border: 1px solid #b6b6b6;
        background: #fff;
        width: 100%;
    }

    &__confidant {
        padding: 10px;
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        height: 48px;
        margin: 0 12px;
        width: 48px;

        input {
            width: 24px;
            height: 24px;
        }
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
}

.horizontallso-item__list-full,
.checked-item__list-date p {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
}

.checked-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;

    p {
        color: #1c5c94;
    }
}

.date-separator {
    border-left: 2px solid #b6b6b6;
    padding-right: 8px;
}
</style>