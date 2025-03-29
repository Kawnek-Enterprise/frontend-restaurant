<template>
  <q-btn
    round
    icon="search"
    style="z-index: 700;"
  >
    <q-popup-proxy
      breakpoint="0"
      transition-duration="300"
      :offset="[10, 0]"
      transition-show="jump-left"
      transition-hide="jump-right"
      anchor="center left"
      self="center right"
    >
      <q-card class=" text-white q-pa-sm">
        <q-input
          @update:model-value="(val) => menu.filteredMenuItemList = menu.filterMenuItems(menu.list, val, categories.categoryIds)"
          debounce="500"
          autofocus
          style="min-width: 200px"
          dense
          v-model="menu.filter"
          type="text"
          placeholder="Search"
        />
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>
<script setup>
import { menu } from 'src/pages/main';
import { categories } from 'src/utils/categories';

//
</script>
