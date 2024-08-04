<template>
  <div class="form__field-group">
    <div style="display: flex">
      <div>
        <label
            class="form__label"
            for="4"
        >Фактическое количество трудоустроенных студентов в третий трудовой семестр</label>
        <InputReport
            type="number"
            id="4"
            name="4"
            placeholder="Введите число"
        />
      </div>
      <div>
        <label
            class="form__label"
            for="4"
        >Фактическое количество трудоустроенных в штат принимающей организации по итогам третьего трудового семестра</label>
        <InputReport
            type="number"
            id="4"
            name="4"
            placeholder="Введите число"
        />
      </div>
    </div>
    <div>
      <label
          class="form__label"
          for="9"
      >Комментарий</label>
      <InputReport
          id="9"
          name="9"
          class="form__input"
          type="textarea"
          placeholder="Комментарий"
          style="width: 100%;"
      />
    </div>
  </div>
</template>
<script setup>
import { InputReport } from '@shared/components/inputs';

</script>
<style lang="scss" scoped>
.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
}
</style>