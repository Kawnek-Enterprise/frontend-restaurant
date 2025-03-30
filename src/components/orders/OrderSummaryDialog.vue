<template>
  <q-dialog
    position="bottom"
    v-model="main.openOrderDialog"
  >
    <OrderSummary />

  </q-dialog>
</template>

<script setup>
import { main, menu } from "src/pages/main";
import OrderSummary from 'src/components/orders/OrderSummary.vue'
</script>
