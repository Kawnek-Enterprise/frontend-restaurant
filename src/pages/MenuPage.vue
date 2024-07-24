<template>
  <q-page class="">
    <order-form />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { diningTable, menu } from "./main";
import OrderForm from 'src/components/OrderForm.vue'

onMounted(() => {
  menu.getMenuItems();
  diningTable.getDiningTables();
})
</script>
