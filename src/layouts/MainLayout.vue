<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-py-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />


        <q-input
          @update:model-value="(val) => menu.filteredMenuItemList = menu.filterMenuItems(menu.list, val)"
          debounce="500"
          v-if="$route.name == 'home' || $route.name == 'edit-order'"
          dense
          borderless
          class="q-px-xs q-ml-sm "
          style="border: 1px solid white; border-radius: 4px; min-width: 200px;"
          color="white"
          :class="{
            'full-width': $q.screen.lt.sm,
          }"
          v-model="menu.filter"
          type="text"
          label="Search"
        />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item
          class="bg-primary text-white"
          style="height: 50px;"
        >
          <q-item-section side>
            <q-img
              width="32px"
              height="32px"
              src="/icons/kawnekrestaurant-icon.png"
            ></q-img>
          </q-item-section>
          <q-item-section>
            Kawnek Restaurant
          </q-item-section>
        </q-item>
        <q-item
          to="/"
          :active="$route.name == 'home'"
        >
          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item :to="{
          name: 'orders'
        }">
          <q-item-section>
            Orders
          </q-item-section>
        </q-item>
        <q-separator class="q-mt-md"></q-separator>
        <q-item
          target="_blank"
          :href="`${serverUrl}admin`"
        >
          <q-item-section>
            Admin
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { serverUrl } from 'src/boot/main';
import { diningTable, menu } from 'src/pages/main';
import { onMounted, ref } from 'vue'


onMounted(() => {
  menu.getMenuItems();
  diningTable.getDiningTables();
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
