<template>
  <div class="modal-background">
    <div class="report-modal-warning">
      <div class="report-modal-warning__wrapper">
        <p class="report-modal-warning__wrapper_title">Вы точно уверены, что хотите отправить отчетность?</p>
      </div>
      <div class="report-modal-warning__wrapper_buttons">
        <Button type="button" label="Да" @click="reportConfirmation(true)"
          class="report-modal-warning__wrapper_buttons-button" />
        <Button type="button" label="Нет" @click="reportConfirmation(false)"
          class="report-modal-warning__wrapper_buttons-button"
          id="report-modal-warning__wrapper_buttons-transparent-button" />
      </div>
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
.modal-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: #BEC2C6CC;
  z-index: 1;
}

.report-modal-warning {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  position: absolute;
  top: 15%;
  transform: translate(-50%, 50%) !important;
  left: 50%;
  background: #fff;
  z-index: 1;
  transform: none;
  padding: 32px 32px 40px 32px;

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

      @media (max-width: 575px) {
        margin-top: 28px;
        row-gap: 8px;
      }

      &-button {
        width: 100%;
        margin-bottom: 0;
      }
    }
  }
}

#report-modal-warning__wrapper_buttons-transparent-button {
  background-color: transparent;
  color: var(--primary);
}
</style>