<template>   
    <v-select   
      class="form__select filter-district"   
      :items="items"  
      clearable   
      variant="outlined"  
      name="select_district"   
      id="select-district"  
      v-model="selectedOption"  
      @update:model-value="updateValue" 
      item-title="name"  
      :placeholder="placeholder"  
    >  
      <template #selection="{ item }">  
        <pre>{{ item.title }}</pre>    
      </template>  
    </v-select>  
</template>  

<script setup>  
import { ref, watch, toRefs } from 'vue';  

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

const { items, modelValue} = toRefs(props);   
const selectedOption = ref(modelValue.value);  

const emit = defineEmits(['update']);  

const updateValue = () => {  
  emit('update', selectedOption.value);  
}  
 
watch(() => modelValue.value, (newValue) => {  
  selectedOption.value = newValue;  
});  
</script>  

<style scoped>  
</style>