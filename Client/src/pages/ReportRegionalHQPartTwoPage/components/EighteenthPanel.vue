<template>
  <div class="form__field-group">
    <div>
      <label
          class="form__label"
          for="4"
      >Прикрепить документ</label>
      <InputReport
          type="file"
          id="4"
          name="4"
      />
    </div>
    <div style="display: flex; justify-content: space-between">
      <div style="width: 70%">
        <label
            class="form__label"
            for="9"
        >Ссылка на публикацию</label>
        <InputReport
            id="9"
            name="9"
            class="form__input"
            type="text"
            placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
            style="width: 70%"
        />
      </div>
      <div>
        <Button
            style="margin: 0;"
            label="+ Добавить ссылку"
        />
      </div>
    </div>
    <div>
      <Button
          style="margin: 0;"
          label="Добавить публикацию"
      />
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
import { Button } from '@shared/components/buttons';
</script>
<style lang="scss" scoped>
.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
}
</style>