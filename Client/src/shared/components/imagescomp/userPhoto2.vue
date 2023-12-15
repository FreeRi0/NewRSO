<template>
  <div class="avatar-upload my_photo__edit">
      <!-- Заглушка по умолчанию  -->
      <div class="avatar-preview my_photo__plug">
          <img
              :src="userPhotoUrl.media.photo2"
              alt="Фото пользователя"
              v-if="userPhotoUrl.media.photo2"
              v-show="true"
          />

          <img
              src="@/app/assets/user-banner.jpg"
              alt="Фото пользователя(пусто)"
              v-else
          />
      </div>
      <!-- Добавить фото -->
      <div class="avatar-edit my_photo__add">
          <v-menu min-width="200px" rounded v-if="!file">
              <template v-slot:activator="{ props }">
                  <v-btn class="user-metric__baner-add" icon v-bind="props">
                      <v-avatar size="large">
                          <v-icon icon="mdi-plus"></v-icon>
                      </v-avatar>
                  </v-btn>
              </template>
              <v-card>
                  <v-card-text>
                      <v-row justify="center">
                          <v-dialog v-model="dialog" width="1024">
                              <template v-slot:activator="{ props }">
                                  <v-btn
                                      rounded
                                      variant="text"
                                      v-bind="props"
                                  >
                                      Добавить фото
                                  </v-btn>
                              </template>
                              <v-card>
                                  <v-card-title>
                                      <span class="text-h5"
                                          >Загрузите ваше фото</span
                                      >
                                  </v-card-title>
                                  <v-card-text>
                                      <v-container>
                                          <v-row>
                                              <v-file-input
                                                  @change="selectFile"
                                                  show-size
                                                  prepend-icon="mdi-camera"
                                                  counter
                                              ></v-file-input>
                                          </v-row>
                                          <v-row>
                                              <v-card class="mt-5 mx-auto">
                                                  <img
                                                      v-if="preview"
                                                      :src="preview"
                                                  />
                                              </v-card>
                                          </v-row>
                                      </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                          color="blue-darken-1"
                                          variant="text"
                                          @click="dialog = false"
                                      >
                                          Закрыть
                                      </v-btn>
                                      <v-btn
                                          :disabled="!file"
                                          color="blue-darken-1"
                                          variant="text"
                                          type="submit"
                                          @click="uploadPhoto()"
                                      >
                                          Загрузить
                                      </v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-dialog>
                      </v-row>
                  </v-card-text>
              </v-card>
          </v-menu>
          <v-menu min-width="200px" rounded v-else>
              <template v-slot:activator="{ props }">
                  <v-btn class="user-metric__avatar-add" icon v-bind="props">
                      <v-avatar size="large">
                          <v-icon icon="mdi-pencil"></v-icon>
                      </v-avatar>
                  </v-btn>
              </template>
              <v-card>
                  <v-card-text>
                      <div class="mx-auto text-center">
                          <v-row justify="center">
                              <v-dialog v-model="dialog" width="1024">
                                  <template v-slot:activator="{ props }">
                                      <v-btn
                                          rounded
                                          variant="text"
                                          v-bind="props"
                                      >
                                          Редактировать фото
                                      </v-btn>
                                  </template>
                                  <v-card>
                                      <v-card-title>
                                          <span class="text-h5"
                                              >Загрузите ваше фото</span
                                          >
                                      </v-card-title>
                                      <v-card-text>
                                          <v-container>
                                              <v-row>
                                                  <v-file-input
                                                      @change="selectFile"
                                                      show-size
                                                      prepend-icon="mdi-camera"
                                                      counter
                                                  ></v-file-input>
                                              </v-row>
                                              <v-row>
                                                  <v-card
                                                      class="mt-5 mx-auto"
                                                  >
                                                      <img
                                                          v-if="preview"
                                                          :src="preview"
                                                      />
                                                  </v-card>
                                              </v-row>
                                          </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                              color="blue-darken-1"
                                              variant="text"
                                              @click="dialog = false"
                                          >
                                              Закрыть
                                          </v-btn>
                                          <v-btn
                                              :disabled="!file"
                                              color="blue-darken-1"
                                              variant="text"
                                              type="submit"
                                              @click="updatePhoto()"
                                          >
                                              Загрузить
                                          </v-btn>
                                      </v-card-actions>
                                  </v-card>
                              </v-dialog>
                          </v-row>
                          <v-divider class="my-3"></v-divider>
                          <v-btn
                              rounded
                              variant="text"
                              @click="deletePhoto()"
                          >
                              Удалить фото
                          </v-btn>
                      </div>
                  </v-card-text>
              </v-card>
          </v-menu>
      </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
const userPhotoUrl = ref('');
const route = useRoute();
const dialog = ref(false);
const preview = ref(null);
const file = ref(null);
const id = route.params.id;
const showPhoto = ref(false);

const viewUsersPhoto = async () => {
  await HTTP.get(`/rsousers/${id}/`, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + localStorage.getItem('Token'),
      },
  })
      .then((response) => {
          userPhotoUrl.value = response.data;
          console.log(response);
      })
      .catch(function (error) {
          console.log('an error occured ' + error);
      });
};

viewUsersPhoto();

const selectFile = (event) => {
  file.value = event.target.files[0];
  preview.value = URL.createObjectURL(file.value);
};

const uploadPhoto = async () => {
  dialog.value = true;
  const formData = new FormData();
  formData.append('photo2', file.value);
  await HTTP.post('/rsousers/me/media/', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem('Token'),
      },
  })
      .then((response) => {
          dialog.value = false;
          viewUsersPhoto();
          console.log(response, 'photo uploaded');
      })
      .catch(function (error) {
          console.log('an error occured ' + error);
      });
};
const updatePhoto = async () => {
  let fd = new FormData();
  fd.append('photo2', file.value);
  dialog.value = true;
  await HTTP.put('/rsousers/me/media/', fd, {
      headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem('Token'),
      },
  })
      .then((response) => {
          dialog.value = false;
         viewUsersPhoto();
          console.log(response, 'updated');
      })
      .catch(function (error) {
          console.log('an error occured ' + error);
      });
};

const deletePhoto = async () => {
  await HTTP.delete('/rsousers/me/media/', {
      headers: {
          Authorization: 'Token ' + localStorage.getItem('Token'),
      },
  })
      .then((response) => {
          viewUsersPhoto();
          console.log(response, 'deleted');
      })
      .catch(function (error) {
          console.log('an error occured ' + error);
      });
};
</script>
<style lang="scss">
.my_photo__edit {
  display: grid;
  grid-template-columns: 1fr 68px;
  grid-template-rows: 1fr 68px;
  border-radius: 10px;
}
.avatar-preview,
.my_photo__plug {
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  border-radius: 10px;
}

.my_photo__add,
.avatar-edit {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-content: center;
  align-content: center;
  z-index: 9;
}

.avatar-preview img,
.my_photo__plug img {
  width: 100%;
  height: 371px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
