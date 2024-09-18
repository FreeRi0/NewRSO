<template>
  <div class="user-metric__avatar-sp-wrapper">
      <div class="user-metric__avatar-sp">
          <!-- Аватар отряда  -->

          <img :src="emblem" alt="Эмблема" v-if="emblem" />
          <img
              id="profile-pic"
              src="@app/assets/hq-emblem.png"
              alt="Аватарка(пусто)"
              v-else
          />
      </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const imageSquadUrl = ref('');
const route = useRoute();
const id = route.params.id;

const props = defineProps({
  emblem: String
})

// const viewEmblem = async () => {
//   await HTTP.get(`/detachments/${id}/`, {
//       headers: {
//            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
//       },
//   })
//       .then((response) => {
//         imageSquadUrl.value = response.data;
//           console.log(response.data);
//       })
//       .catch(function (error) {
//           console.log('an error occured ' + error);
//       });
// };

// viewEmblem();

</script>

<style lang="scss">
.user-metric__avatar-sp {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    width: 80%;
    height: 100%;
    border-radius: 50%;
    
    &-wrapper {
            display: grid;
            grid-template-columns: 160px 90px;
            grid-template-rows: 130px 80px;
            align-content: center;
            justify-content: center;
            grid-column-start: 2;
            grid-column-end: 4;
            grid-row-start: 2;
            grid-row-end: 4;
            @media screen and (max-width: 320px) and (max-height:462px) {
              transform: translateX(35px);
              margin-top: -100px;
          }
        }
        &-add {
            display: grid;
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
            
        }
}

.user-metric__avatar-sp img {
  width: 90%;
  height: 90%;
  clip-path: circle(48.5%);
  object-fit: cover;
  border-radius: 50%;
  align-items: center;
}

.vue-image-crop-upload .vicp-wrap .vicp-operate a {
  padding: 4px 12px;
  border-radius: 10px;
  height: 42px;
  color: white;
  background: var(--primary);
  border: 1px solid var(--primary);
  &:hover {
      color: white;
      background: var(--primary);
  }
}
</style>