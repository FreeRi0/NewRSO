<template>
    <div
        class="participants-wrapper__item"
        v-for="participant in participants"
        v-if="participants.length > 0"
    >
        <div class="round-img">
            <img :src="participant.user.avatar.photo" alt="logo" />
        </div>
        <div class="container-participants">
            <p class="participants-wrapper__item-name">
                {{ participant.user.last_name }}
            </p>
            <p class="participants-wrapper__item-position">
                {{ participant.position }}
            </p>
        </div>
    </div>

    <h2 v-else>Участники не найдены...</h2>
</template>
<script setup>
const props = defineProps({
    participants: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.round-img {
    width: 120px;
    height: 120px;
    display: block;
    margin: 0px auto;
    @media screen and (max-width: 575px) {
        width: 60px;
        height: 60px;
    }
}
.participants-wrapper__item {
    margin: 0px auto;
    width: 170px;
    @media screen and (max-width: 575px) {
        width: 104px;
    }
    &-name {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        font-size: 28px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 18px;
        }
    }
    &-position {
        text-align: center;
        font-size: 16px;
        font-family: 'Akrobat';
        color: #676767;
        @media screen and (max-width: 575px) {
            font-size: 12px;
        }
    }
}
</style>
