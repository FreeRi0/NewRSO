<template>
    <div v-if="participants.length > 0">
        <div v-for="participant in participants">
            <router-link
                class="horizontallso-item__wrapper"
                :to="{ name: 'userpage', params: { id: participant.user?.id } }"
            >
                <div class="horizontallso-img">
                    <img
                        :src="participant.user?.avatar?.photo"
                        alt="photo"
                        v-if="participant.user?.avatar?.photo"
                    />
                    <img
                        src="@app/assets/user-avatar.png"
                        alt="photo"
                        v-else
                    />
                </div>
                <div class="containerHorizontal">
                    <div class="d-flex">
                        <p class="horizontallso-item__list-full">
                            {{ participant.user.last_name }}
                        </p>
                        <p class="horizontallso-item__list-full">
                            {{ participant.user.first_name }}
                        </p>
                        <p class="horizontallso-item__list-full">
                            {{ participant.user.patronymic_name }}
                        </p>
                    </div>

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
    margin-left: 7px;
}

.horizontallso-item__list-date {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
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
    margin-left: 7px;
}

.horizontallso-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}
</style>
