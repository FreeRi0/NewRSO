<template>
    <div v-for="participant in participants" v-if="participants.length > 0">
        <router-link
            class="horizontallso-item__wrapper"
            :to="{ name: 'userpage', params: { id: participant.id } }"
        >
            <div class="horizontallso-img">
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
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ participant.user.last_name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.user.date_of_birth }}</p>
                </div>
            </div>
        </router-link>
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
<style lang="scss">
.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.horizontallso-img {
    img {
        align-items: center;
        width: 36px;
        height: 36px;
        border-radius: 100%;
        justify-content: start;
    }
}

.horizontallso-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontallso-item p {
    margin-left: 10px;
}

.horizontallso-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
}

.horizontallso-img img {
    display: flex;
    position: relative;
    align-items: center;
}

.horizontallso-item__list-img-status {
    position: absolute;
    width: 18px;
    max-height: 18px;
    top: -17px;
    right: -15px;
}

.horizontallso-itemo__list-img {
    margin-right: 13px;
}

.horizontallso-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}
</style>
