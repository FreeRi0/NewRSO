<template>
  <div class="modal">
    <div class="modal__wrapper">
      <p class="modal__wrapper_title">Вы действительно хотите удалить участника из отряда?</p>

      <div class="modal__wrapper_buttons">
        <Button type="button" label="Да, все верно" class="modal__wrapper_buttons_confirm" @click="del"></Button>
        <Button type="button" label="Отменить" class="modal__wrapper_buttons_cancel" @click="close"></Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';

const emit = defineEmits(['close', 'delete']);

// const props = defineProps({
//   open: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
// });

function close() {
  emit('close');
}

function del() {
  emit('delete');
}
</script>
<style lang="scss" scoped>
.modal {
  border: 2px solid #35383F;
  width: 400px;
  height: 270px;
  position: absolute;
  right: 35%;
  background: #fff;

  z-index: 999;
  transform: none;

  &__wrapper {
    padding: 40px 32px;

    &_title {
      font-size: 16px;
      font-weight: 600;
      font-family: Bert Sans;
      text-align: center;
    }

    &_buttons {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      row-gap: 12px;

      &_confirm {
        margin: 0px;
        font-size: 16px;
        font-weight: 600;
        font-family: Bert Sans;
        height: 52px;
      }

      &_cancel {
        margin: 0px;
        border: 2px solid #35383F;
        background-color: #fff;
        color: #35383F;
        font-size: 16px;
        font-weight: 600;
        font-family: Bert Sans;
        height: 52px;
      }
    }
  }
}
</style>