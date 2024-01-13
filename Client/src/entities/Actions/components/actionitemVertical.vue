
<template>
    <div class='postcard' @click="RouteToAction">
        <section class='postcard-counts'>
            <img :src="action.banner" class='postcard-image' alt='Изображение'/>

            <p class='postcard-title'>{{action.name}}</p>
            <p class='postcard-title'>{{action.description}}</p>
        </section>
        <section class='postcard-counts'>
            <div class='postcard-date'>{{action.date}}</div>
            <div class='postcard-group'>{{action.groupReq}}<img src="@app/assets/actions/Group_light.svg" alt=''/></div>
        </section>
    </div>
</template>

<script setup>


import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    action:{
        id: Number,
        author: String,
        format: String,
        direction: String,
        status: String,
        scale: String,
        created_at: String,
        name: String,
        banner: String,
        conference_link: String,
        address: String,
        description: String,
        application_type: String,
        available_structural_units: String,
        participants_number: String,
        time_data: {
            start_date: String,
            start_time: String
        }
    }
})

function RouteToAction(){
    router.push(`/actionSquads/` + props.action.id);
}

</script>

<style lang='scss' scoped>
.postcard{
  height: 48px;
    margin-bottom: 1px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  &-container{
    display: flex;
    flex-direction: column;
  }
  &-image{
    width: 52px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
  }
  &-title{
    height: 52px;
    width: 175px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5px;
  }
  &-counts{
    display: flex;
    justify-content: space-between;

    align-items: center;

  }
  &-date, &-group{
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
  }
  &-date img{
    width: 24px;
    height: 24px;
  }
  &-group img{
    width: 24px;
    height: 24px;
  }
  &-tag{
    width: 100%;
    margin-top: 15px;
    border: 1px solid black;
    font-family: Bert Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 20px;
    text-align: center;
  }
}


.postcard:hover{
  cursor: pointer;
  border: 1px solid black;
}

</style>