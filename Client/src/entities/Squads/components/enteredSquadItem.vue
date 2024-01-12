<template>
    <div class="horizontallso">
        <div class="horizontallso__confidant mr-3">
            <input
                type="checkbox"
                v-model="checked"
                :value="detachment"
                @change="updateCheckSquad"
            />
        </div>

        <div class="horizontallso-item__wrapper mr-3">
            <div class="horizontallso-img">
                <img
                    :src="detachment?.user?.media?.photo"
                    alt="logo"
                    v-if="detachment?.user?.media?.photo"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"

                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{detachment.user.first_name }}
                </p>
                <!-- <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ participant.date_of_birth }}</p>
                </div> -->
            </div>
        </div>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    :src="detachment.emblem"
                    alt="logo"
                    v-if="detachment.emblem"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ detachment.name }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    detachment: {
        type: Object,
    },
    selectedSquads: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['change']);
const checked = ref(false);
const updateCheckSquad = (e) => {
    console.log('ddddddSquad', checked.value);
    emit('change', checked.value, props.detachment.id);
};

const selectedDetch = ref(props.selectedSquads);

watch(
    () => props.selectedSquads,
    (newChecked) => {
        if (!newChecked) return;
        selectedDetch.value = newChecked;
    },
);
</script>
<style lang="scss" scoped>
.horizontallso {
    display: flex;
    align-items: flex-start;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            position: relative;
            align-items: center;
        }
    }
    &-info {
        border: 1px solid #b6b6b6;
        border-radius: 10px;
        padding: 11px 20px;
        height: 46px;
        text-align: center;

        width: 185px;
        p {
            display: block;
            font-size: 16px;
            font-weight: 400;
            color: #35383f;
        }
    }
}
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
    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    // width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
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

.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}

.sort-select {
    height: 46px;
}

.checked__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    margin: 0px 12px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}
</style>
