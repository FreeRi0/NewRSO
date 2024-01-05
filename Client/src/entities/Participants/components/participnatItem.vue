<template>
    <div class="participants-wrapper__item">
        <router-link :to="{ name: 'userpage', params: { id: participant.id } }">
            <div class="round-img">
                <img
                    :src="participant.user.avatar.photo"
                    alt="photo"
                    v-if="participant.user.avatar"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="container-participants">
                <p class="participants-wrapper__item-name">
                    {{ participant.user.last_name }}
                </p>
                <p class="participants-wrapper__item-position">
                    {{ position.name }}
                </p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
const props = defineProps({
    participant: {
        type: Object,
        required: true,
    },
    position: {
        type: Object,
    },
});
</script>
<style lang="scss"></style>
