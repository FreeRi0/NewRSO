<template>
    <v-menu 
    :location="location" 
    >
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
                <slot>Структура</slot>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
            v-for="(item, index) in items"
            :key="index"
            >
                <a :href=" item.url ">{{ item.title }}</a>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
  
<script>
export default {
    data: () => ({
      items: [
        { title: 'ЛСО', url: '#' },
        { title: 'Штабы СО ОО', url: '#' },
        { title: 'Местные штабы', url: '#' },
        { title: 'Региональные штабы', url: '#' },
        { title: 'Окружные штабы', url: '#' },
        { title: 'Центральный штаб', url: '#' },
      ],
      locations: ['top', 'bottom', 'start', 'end', 'center'],
      location: 'bottom',
    }),
};
</script>

<style scoped>

.v-btn.v-btn--elevated.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated {
    background-color: transparent;
    box-shadow: none;
    text-transform: capitalize;
    height: auto;
    padding: 11px 0;
    color: #35383f;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: normal;
    

    @media(max-width: 1024px) {
        position: relative;
        width: 100%;

        &:before {
            position: absolute;
            content: "";
            width: 24px;
            height: 24px;
            top: calc(50% - 12px);
            right: 0;
            background-image: url('../../../app/assets/icon/arrow-down.svg');
        }
    }
}

</style>