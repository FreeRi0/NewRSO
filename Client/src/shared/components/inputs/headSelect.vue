<template>   
    <v-select   
      class="form__select filter-district"   
      :items="props.items"  
      clearable   
      variant="outlined"  
      name="select_district"   
      id="select-district"  
      v-model="selectedOption"  
      @update:model-value="updateValue" 
      item-title="name"  
      :placeholder="props.placeholder"  
    >  
      <template #selection="{ item }">  
        <pre>{{ item.title }}</pre>    
      </template>  
    </v-select>  
</template>  

<script setup>  
import { ref } from 'vue';  

const props = defineProps({  
  modelValue: {  
    type: String,  
    default: ''  
  },  
  items: {  
    type: Array,  
    default: () => []
  },  
  placeholder: {  
    type: String,  
    default: 'Окружные штабы'  
  },  
});     
const selectedOption = ref(null);  

const emit = defineEmits(['update']);  

const updateValue = () => {  
  emit('update', selectedOption.value);  
}  
</script>  

<style scoped>  
</style>