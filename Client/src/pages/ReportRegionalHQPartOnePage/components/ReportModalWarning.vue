<template>
  <div class="report-modal-warning">
    <div class="report-modal-warning__wrapper">
      <p class="report-modal-warning__wrapper_title">Вы точно уверены, что хотите отправить отчетность?</p>
    </div>
    <div class="report-modal-warning__wrapper_buttons">
      <Button type="button"
              label="Да"
              @click="reportConfirmation(true)"
      />
      <Button type="button"
              label="Нет"
              @click="reportConfirmation(false)"
      />
    </div>
  </div>
</template>
<script setup>
  import { Button } from '@shared/components/buttons';

  const emit = defineEmits(['reportConfirmation']);
  const reportConfirmation = (value) => {
    emit('reportConfirmation', value)
  };
</script>
<style lang="scss" scoped>
.report-modal-warning {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, 50%);
  left: 35%;
  background: #fff;
  z-index: 999;
  transform: none;

  @media (max-width: 575px) {
    max-width: 320px;
    height: auto;
    right: auto;
  }

  &__logo {
    text-align: center;
  }

  &__wrapper {
    padding: 40px 32px;

    @media (max-width: 575px) {
      padding: 25px 20px;
    }

    &_title {
      font-size: 16px;
      font-weight: 600;
      font-family: 'Bert Sans';
      text-align: center;
      max-width: 336px;
      color: #35383F;
      line-height: 21.1px;

      @media (max-width: 575px) {
        font-size: 14px;
      }
    }

    &_buttons {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      row-gap: 12px;

      @media (max-width: 575px) {
        margin-top: 28px;
        row-gap: 8px;
      }
    }
  }
}
</style>