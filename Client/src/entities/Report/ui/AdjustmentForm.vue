<template>
    <div>
        <label class="form__label" for="participants_number">
            Количество человек, принявших участие в мероприятии
            <sup class="valid-red">*</sup>
        </label>
        <div class="form__field-group">
            <InputReport
                v-model:value="localEvent.participants_number"
                :id="event.participants_number"
                name="participants_number"
                class="form__input"
                type="number"
                placeholder="Введите число"
                @focusout="focusOut"
            />
            <Button
                v-if="index > 0"
                label="Удалить мероприятие"
                class="delete-button"
                @click="$emit('delete-event', index)"
            />
        </div>
    </div>
    <div class="form__field-group">
        <div class="form__field">
            <InputReport
                v-model:value="localEvent.start_date"
                :id="event.start_date"
                name="start_date"
                class="form__input"
                type="date"
                label="Дата начала проведения мероприятия"
                :required="true"
                @focusout="focusOut"
            />
        </div>
        <div class="form__field">
            <InputReport
                label="Дата окончания проведения мероприятия"
                :required="true"
                v-model:value="localEvent.end_date"
                :id="event.end_date"
                name="end_date"
                class="form__input"
                type="date"
                @focusout="focusOut"
            />
        </div>
    </div>
    <div class="form__field">
        <label class="form__label" for="14"
            >Комментарий <sup class="valid-red">*</sup></label
        >
        <InputReport
            id="14"
            name="14"
            class="form__input"
            style="width: 100%"
        />
    </div>
    <div>
        <v-checkbox label="Итоговое значение" />
    </div>
    <div class="hr"></div>
    <div>
        <p>(4-1)*2+(4-2)+(4-3)=9</p>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';

const props = defineProps({
    event: Object,
    index: Number,
});

const emits = defineEmits([
    'delete-event',
    'add-link',
    'delete-link',
    'update:event',
    'focus-out',
]);

const localEvent = reactive({ ...props.event });

watch(
    localEvent,
    (newVal) => {
        emits('update:event', newVal);
    },
    { deep: true },
);

const focusOut = () => {
    emits('focus-out');
};
</script>

<style scoped>
.form__field-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0;
}

.delete-button {
    margin: 0;
}
</style>
