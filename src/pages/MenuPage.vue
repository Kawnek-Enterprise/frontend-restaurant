<template>
  <q-page
    class=""
    padding
  >
    <MenuItemList />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { diningTable, main, menu } from "./main";
import OrderForm from 'src/components/OrderForm.vue'
import MenuItemList from "src/components/MenuItemList.vue";

onMounted(() => {
  main.resetOrder();
})
</script>
