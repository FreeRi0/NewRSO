<template>
  <div class="report-modal-success">
    <div class="report-modal-success__logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
        <circle cx="54" cy="54" r="54" fill="#F0FDF4"/>
        <circle cx="54" cy="54" r="43" fill="#DCFCE7"/>
        <circle cx="54" cy="54" r="32" fill="#39BF39"/>
        <path d="M50 54L52.5347 56.2812C52.9662 56.6696 53.6366 56.6101 53.993 56.1519L58 51M54 64C59.5228 64 64 59.5228 64 54C64 48.4772 59.5228 44 54 44C48.4772 44 44 48.4772 44 54C44 59.5228 48.4772 64 54 64Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="report-modal-success__wrapper">
      <p class="report-modal-success__wrapper_title">Отчет успешно отправлен!</p>
      <p class="report-modal-success__wrapper_title">
        Если какие-либо показатели потребуют доработки,
        то появится возможность их редактирования.
        Уведомление об этом будет отправлено
        на электронную почту РО.
      </p>
    </div>
    <div class="report-modal-success__wrapper_buttons">
      <Button type="button"
              label="Понятно"
              @click="closeModal"
      />
    </div>
  </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';

const emit = defineEmits(['closeModal'])
const closeModal = () => {
  emit('closeModal', false)
}
</script>
<style lang="scss" scoped>
.report-modal-success {
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