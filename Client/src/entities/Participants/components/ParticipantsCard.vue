<template>
    <div class="postcard" @click="RouteToAction">
        <img :src="action.banner" class="postcard-image" alt="Изображение" />
        <p class="postcard-title">{{ action.name }}</p>
        <p class="postcard-title">{{ action.description }}</p>
        <section class="postcard-counts">
            <div class="postcard-date">
                {{
                    action.time_data.start_date +
                    ' - ' +
                    action.time_data.start_time
                }}
            </div>
            <div class="postcard-group">
                {{ action.participants_number
                }}<SvgIcon icon-name="group-light" />
            </div>
        </section>
        <section class="postcard-counts">
            <div class="postcard-tag">{{ action.direction }}</div>
            <div class="postcard-tag">{{ action.format }}</div>
        </section>
    </div>
</template>

<script setup>
import { SvgIcon } from '@shared/index';

//Параметры модели
const props = defineProps({
    action: {
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
            start_time: String,
        },
    },
});
</script>

<style></style>
