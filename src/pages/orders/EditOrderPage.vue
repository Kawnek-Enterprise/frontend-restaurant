<template>
  <q-page padding>
    <div>
      <q-inner-loading :showing="menu.loadingItems">
        <q-spinner-puff
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <div v-if="!menu.loadingItems">
        <MenuItemList />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { diningTable, main, menu } from "src/pages/main";
import MenuItemList from "src/components/MenuItemList.vue";

onMounted(async () => {
  menu.loadingItems = true;
  await menu.getMenuItems();
  await diningTable.getDiningTables();
  menu.setSelectedList();
  menu.loadingItems = false;
  if ($q.screen.lt.md) {
    main.openOrderDialog = true;
  }
})
</script>
