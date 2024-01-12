<template>
    <div class="horizontalSquad">
        <div class="horizontalSquad-item__wrapper mr-3">
            <div class="horizontalSquad-img">
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ detachment.applications }}
                </p>
            </div>
        </div>
        <div class="horizontalSquad-item__wrapper">
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
        <div class="d-flex">
            <div class="sort-select mr-3">
                <Select
                    variant="outlined"
                    v-model="squadItem.is_verified"
                    :names="filteredPayed"
                ></Select>
            </div>

            <div class="horizontalSquad__confidant mr-3">
                <input
                    type="checkbox"
                    v-model="selectedSquads"
                    :value="detachment"
                    @change="updateSquads"
                />
            </div>
        </div>

            <!-- <Button
                class="save"
                type="button"
                label="Сохранить"
                @click="ChangeStatus(detachment.id)"
            ></Button> -->

    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { Select } from '@shared/components/selects';
import { useRoute } from 'vue-router';
import { ref, watch, inject } from 'vue';
import { HTTP } from '@app/http';

const updateSquads = (detachment, event) => {
    console.log('dddddddft', detachment, event);
    emit('change', detachment, event);
};

const props = defineProps({
    detachment: {
        type: Object,
        require: true,
    },
});

const squadItem = ref({
    applications: null,
});

const filteredPayed = ref([
    {
        value: 'applications',
        name: 'Одобрить',
    },
    { value: 'applications', name: 'Отклонить' },
]);
</script>
<style lang="scss" scoped>
.horizontalSquad {
    display: grid;
    grid-template-columns: 1fr 0.4fr;
    // flex-wrap: wrap;
    // align-items: flex-start;
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
.horizontalSquad-item__wrapper {
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

.horizontalSquad-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.horizontalSquad-item p {
    margin-left: 10px;
}

.horizontalSquad-item__list-date {
    // width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.horizontalSquad-item__list-img-status {
    position: absolute;
    width: 18px;
    max-height: 18px;
    top: -17px;
    right: -15px;
}

.horizontalSquad-item__list-img {
    margin-right: 13px;
}

.horizontalSquad-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.horizontalSquad-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.horizontalSquad__confidant {
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
.checked {
    display: flex;
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
        }
    }
}
.checked-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;

    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.checked-item img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: cover;
}

.checked-item p {
    margin-left: 10px;
}

.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 10px;
    text-align: center;
}
.checked-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.checked-itemo__list-img {
    margin-right: 13px;
}

.checked-item__list-full {
    color: #35383f;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.checked-item__list-date p {
    color: #1c5c94;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    font-weight: 400;
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

.save {
    // background-color: white;
    // color: #35383f;
    // border: 1px solid black;
    width: 168px;
    height: 48px;
    padding: 12px 32px;
    margin: 0px;
    span {
        font-size: 16px;
    }
}

.v-field {
    border-radius: 10px;
}
.sort-select {
    height: 46px;
    width: 185px;
}

.form__select {
    margin-bottom: 0px;
    border: none;
}
</style>
