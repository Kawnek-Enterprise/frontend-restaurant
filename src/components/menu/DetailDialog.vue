<template>
  <q-dialog
    v-model="menu.showDetailDialog"
    @hide="currentSlide = 0"
  >
    <q-card class="full-width">
      <q-carousel
        class="menu-detail-carousel"
        v-model="currentSlide"
        thumbnails
        swipeable
        animated
        infinite
      >
        <!-- check if string starts with http -->
        <q-carousel-slide
          v-if="menu.selectedItem.image_path.startsWith('http')"
          :name="0"
          :img-src="menu.selectedItem.image_path"
        >
        </q-carousel-slide>
        <q-carousel-slide
          v-if="!menu.selectedItem.image_path.startsWith('http')"
          :name="0"
          :img-src="`${srvUrl}${menu.selectedItem.image_path}`"
        >
        </q-carousel-slide>
        <template
          v-for="(image, index) in menu.selectedItem.photos"
          :key="index"
        >
          <q-carousel-slide
            :name="(index + 1)"
            :img-src="image"
          />
        </template>
      </q-carousel>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { menu } from 'src/pages/main';
import { ref } from 'vue';

const srvUrl = process.env.srvUrl;

const currentSlide = ref(0)

</script>
