<template>
  <div class="modal">
    <div class="modal__wrapper">

      <p  v-if="isCommander" class="modal__wrapper_title">При одобрении вашей заявки на вступление в штаб, вы останетесь командиром
        ЛСО/штаба, которым вы сейчас являетесь, также станете участником этого штаба.</p>
        <p v-else-if="isNew">Вы действительно хотите вступить в штаб?</p>
        <p v-else class="modal__wrapper_title">При одобрении вашей заявки на вступление в штаб, вы будете
        автоматически удалены
        из тех ЛСО/штабов, в которых вы сейчас состоите.</p>

      <div class="modal__wrapper_buttons">
        <Button type="button" label="Продолжить" class="modal__wrapper_buttons_confirm" @click="add"></Button>
        <Button type="button" label="Отменить" class="modal__wrapper_buttons_cancel" @click="close"></Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';

const props = defineProps({
  isCommander: { type: Boolean, required: true },
  isNew: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'add']);

function close() {
  emit('close');
}

function add() {
  emit('add');
}
</script>
<style lang="scss" scoped>
.modal {
  border: 2px solid #35383F;
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
  @media screen and (min-width: 320px) and (max-width: 480px) {
    transform: translateY(120%) translate(-30%) translateX(9px);
    
    }

  @media (max-width: 575px) {
    max-width: 320px;
    height: auto;
    right: auto;
  }

  &__wrapper {
    padding: 40px 32px;

    @media (max-width: 575px) {
      padding: 25px 20px;
    }
    @media screen and (min-width: 320px) and (max-width: 480px) {
      padding: 45px 20px 30px;
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
      @media screen and (min-width: 320px) and (max-width: 480px) {
        font-size: 16px;
        line-height: 22.1px;
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

      &_confirm {
        margin: 0px;
        font-size: 16px;
        font-weight: 600;
        font-family: 'Bert Sans';
        height: 52px;

        @media (max-width: 575px) {
          height: 40px;
          font-size: 14px;
          padding: 5px 32px;
        }
      }

      &_cancel {
        margin: 0px;
        border: 2px solid #35383F;
        background-color: #fff;
        color: #35383F;
        font-size: 16px;
        font-weight: 600;
        font-family: 'Bert Sans';
        height: 52px;

        @media (max-width: 575px) {
          height: 40px;
          font-size: 14px;

          padding: 5px 32px;
        }
      }
    }
  }
}
</style>