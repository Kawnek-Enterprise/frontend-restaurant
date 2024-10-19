<template>
  <q-page class="">
    <div>
      <q-inner-loading :showing="menu.loadingItems">
        <q-spinner-puff
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <div v-if="!menu.loadingItems">
        <order-form />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { diningTable, menu } from "src/pages/main";
import OrderForm from 'src/components/OrderForm.vue'

onMounted(async () => {
  menu.loadingItems = true;
  await menu.getMenuItems();
  await diningTable.getDiningTables();
  menu.loadingItems = false;

})
</script>
