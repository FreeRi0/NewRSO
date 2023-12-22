<template>
  <div class="container">
    <Breadcrumbs :items="pages"></Breadcrumbs>

    <h1 class="title title--lso">Редактирование ЛСО</h1>

    <FormUnit
      :participants="true"
      :detachment="detachment"
      v-if="detachment"
      @submit.prevent="changeDetachment"
    ></FormUnit>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { Breadcrumbs } from "@shared/components/breadcrumbs";
import { FormUnit } from "@features/FormUnit";
import axios from "axios";

const pages = ref([
  { pageTitle: "Структура" },
  { pageTitle: "ЛСО", href: "/AllSquads" },
  { pageTitle: "ССО «Инвар»", href: "#" },
  { pageTitle: "Редактирование", href: "#" },
]);

const submited = ref(false);

const detachment = ref(null);

const getDetachment = async () => {
  await axios
    .get("api/v1/detachments/1", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("Token"),
      },
    })
    .then((response) => {
      detachment.value = response.data;
      console.log(response);
    })
    .catch(function (error) {
      console.log("an error occured " + error);
    });
};

onMounted(() => {
  getDetachment();
});

const swal = inject("$swal");

const changeDetachment = async () => {
  axios
    .put("api/v1/detachments/1/", detachment.value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("Token"),
      },
    })
    .then((response) => {
      submited.value = true;
      detachment.value = response.data;
      console.log(response.data);
      swal.fire({
        position: "top-center",
        icon: "success",
        title: "успешно",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      console.error("There was an error!", error);
      swal.fire({
        position: "top-center",
        icon: "error",
        title: "ошибка",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
</script>

<style lang="scss">
// :to="{ name: 'edit-post', params: { id: post._id } }"
// /edit-post/:id
// import { useRoute } from 'vue-router';
// const route = useRoute();
// const id = route.params.id;
</style>
