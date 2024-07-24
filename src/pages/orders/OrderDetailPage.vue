<template>
  <q-page>
    <pre>
  {{ orders }}
</pre>
  </q-page>
</template>
<script setup>
import { onMounted } from "vue";
import { orders } from "./orders";
onMounted(() => {
  orders.getDetail();
})
</script>
