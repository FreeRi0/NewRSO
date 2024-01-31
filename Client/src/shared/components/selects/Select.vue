<template>
    <v-select
        class="form__select"
        :model-value="object"
        :items="names"
        @update:model-value="changeOption"
        :placeholder="placeholder"
        v-bind="$attrs"
        item-title="name"
        item-value="id"
    >
        <template #selection="{ item }">
            <span>{{ item.raw.name }}</span>
        </template>

        <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :title="item?.raw?.name"
                class="form__select-item"
            ></v-list-item>
        </template>
    </v-select>
    <!-- <TransitionGroup>
        <div class="error-wrapper" v-for="element of error" :key="element.$uid">
            <div class="form-error__message">{{ element.$message }}</div>
        </div>
    </TransitionGroup> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { onBeforeRouteUpdate } from 'vue-router';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    object: {
        type: Array,
        default: () => [],
    },
    names: {
        type: Array,
        default: () => [],
    },
    // error: {
    //     type: Array,
    //     required: false,
    // },
    placeholder: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    itemRawName: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:value']);

const changeOption = (event) => {
    console.log(event);
    emit('update:value', event);
};

const names = ref(props.names);

const onChangeItem = async () => {
    HTTP.get(props.address)

        .then((res) => {
            // console.log(props.address);
            names.value = res.data;
            // console.log(res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    onChangeItem();
});
</script>

<style lang="scss" scoped>
.error-wrapper {
    position: relative;
}
.form-error__message {
    position: absolute;
    right: 0;
    color: var(--danger);
    font-size: 12px;
}
</style>
