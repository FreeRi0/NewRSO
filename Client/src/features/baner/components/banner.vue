<template>
    <v-card>
        <div class="banner__wrapper">
            <!-- <my-upload
                field="v-img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="1180"
                :height="200"
                url="@/app/assets"
                :params="params"
                :headers="headers"
                img-format="jpg"
            ></my-upload> -->
            <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            <v-menu class="edit" min-width="100px" rounded>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar size="40">
                            <v-icon icon="mdi-pencil"></v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-divider class="my-3"></v-divider>
                            <v-btn rounded variant="text" @click="toggleShow"> Upload image </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn rounded variant="text"> Delete image </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
        <div class="banner__info">
          ffff
            <!-- <v-avatar color="surface-variant">
                <v-img
                    aspect-ratio="16/9"
                    cover
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                ></v-img
            ></v-avatar> -->
        </div>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';
import myUpload from 'vue-image-crop-upload/upload-2.vue';

const show = ref(true);
</script>
<style lang="scss" scoped>
.banner {
    &__wrapper {
        height: 200px;
        position: relative;
    }
    &__info {
      height: 300px;
    }
}
// .v-btn {
//     position: absolute;
//     bottom: 10px;
//     right: 20px;
// }
</style>
