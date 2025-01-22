<template>
  <date-picker
    v-model:value="dateValue"
    :placeholder="placeholder"
    :name="name"
    type="date"
    :disabled-date="disableOutOfRangeDates"
    class="dateInput"
    value-type="date"
    :lang="langObject"
    format="DD-MM-YYYY"
    :clearable="false"
  ></date-picker>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Date,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Выберите дату'
  },
  name: {
    type: String,
    default: 'date'
  }
});

const emit = defineEmits(['update:modelValue']);

const dateValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const today = new Date();

const maxDate = computed(() => {
  const date = new Date(today);
  date.setFullYear(date.getFullYear() - 13);
  return date;
});

const minDate = computed(() => {
  const date = new Date(today);
  date.setFullYear(date.getFullYear() - 100);
  return date;
});

const disableOutOfRangeDates = (date) => {
  return date > maxDate.value || date < minDate.value;
};

const langObject = {
  formatLocale: {
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    firstDayOfWeek: 1,
    firstWeekContainsDate: 1,
  }
};
</script>

<style lang="scss">
.dateInput {
  width: 100%;
  input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 10px 16px;
    border: 1px solid #a3a3a3;
    border-radius: 10px;
    font-family: 'Bert Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #35383f;

    &::placeholder {
      color: #a3a3a3;
    }

    &:hover,
    &:focus {
      border-color: #a3a3a3;
    }
  }

  &.mx-datepicker {
    width: 100%;

    svg {
      margin-right: 6px;
    }
  }

  .mx-input {
    height: 40px;
  }
}
</style>