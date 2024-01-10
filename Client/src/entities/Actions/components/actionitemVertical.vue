<template lang>
    <div class='postcard'>
        <section class='postcard-counts'>
            <img src="@app/assets/actions/action_1.png" class='postcard-image' alt='Изображение'/>
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
const props = defineProps({
    action:{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        groupReq: {
            type: Number,
            required: true
        },
        tag: {
            type: Number,
            required: true
        },
        range: {
            type: Number,
            required: true
        }
    }
})
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
</style>