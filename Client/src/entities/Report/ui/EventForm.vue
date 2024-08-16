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
    <div class="form__field-group">
        <div>
            <InputReport
                label="Положение о мероприятии"
                :required="true"
                type="file"
                id="4"
                name="4"
            />
        </div>
        <div>
            <p class="form__label">
                Межрегиональное <sup class="valid-red">*</sup>
            </p>
            <div class="form__field-group">
                <div class="form__field-group">
                    <input
                        v-model="localEvent.is_interregional"
                        type="radio"
                        :id="`is_interregional-true_${index}`"
                        :value="true"
                    />
                    <label :for="`is_interregional-true_${index}`"> Да </label>
                </div>
                <div class="form__field-group">
                    <input
                        v-model="localEvent.is_interregional"
                        type="radio"
                        :id="`is_interregional-false_${index}`"
                        :value="false"
                    />
                    <label :for="`is_interregional-false_${index}`">
                        Нет
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div>
        <p class="form__label">
            Ссылка на группу мероприятия в социальных сетях
            <sup class="valid-red">*</sup>
        </p>
        <div
            class="form__field-group"
            v-for="(link, i) in event.links"
            :key="i"
        >
            <InputReport
                v-model:value="link.link"
                :id="i"
                :name="i"
                class="form__input"
                type="text"
                placeholder="https://vk.com/cco_monolit"
                @focusout="focusOut"
            />
            <Button
                v-if="event.links.length === i + 1"
                label="+ Добавить ссылку"
                @click="$emit('add-link', index)"
            />
            <Button
                v-else
                label="Удалить"
                @click="$emit('delete-link', index, i)"
            />
        </div>
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
