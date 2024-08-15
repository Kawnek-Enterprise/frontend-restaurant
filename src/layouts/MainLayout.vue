<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Kawnek Hotel & Restaurant
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label>

        </q-item-label>


        <q-item
          to="/"
          :active="$route.name == 'home'"
        >
          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item to="orders">
          <q-item-section>
            Orders
          </q-item-section>
        </q-item>
        <q-separator class="q-mt-md"></q-separator>
        <q-item
          href="https://kawnekhotel.bdinfotech.in"
          target="_blank"
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
