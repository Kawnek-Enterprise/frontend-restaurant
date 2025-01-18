<template>
  <q-layout view="lHh Lpr fFf">
    <q-header
      elevated
      style="height: 74px"
    >
      <q-toolbar class="q-pt-md ">
        <div class="row full-width items-center q-col-gutter-sm">
          <div class="col-auto">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </div>
          <div class="col">

          </div>
          <div>
            <q-btn
              outline
              round
              color="white"
              :icon="main.grid ? 'grid_view' : 'view_list'"
              @click="main.toggleViewLayout"
            ></q-btn>
          </div>

        </div>
      </q-toolbar>
      <!-- <q-toolbar class="text-h4">
        <q-icon name="restaurant_menu" /> {{ $route.meta?.title }}
      </q-toolbar> -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      style="padding-bottom: 60px; position: relative;"
    >
      <q-list class="q-px-xs">
        <div
          @click="$router.push({
            name: 'home'
          })"
          style="height: 74px; font-size: x-large; cursor: default !important;"
          class="flex flex-center"
        >
          Kawnek Restaurant
        </div>
        <q-separator></q-separator>
        <!-- <q-item
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
        </q-item> -->
        <q-item
          to="/"
          :active="$route.name == 'home'"
          style="border-radius: 1rem;"
        >
          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item
          style="border-radius: 1rem;"
          :to="{
            name: 'orders'
          }"
        >
          <q-item-section>
            Orders
          </q-item-section>
        </q-item>
        <q-separator class="q-mt-md"></q-separator>
        <q-item
          style="border-radius: 1rem;"
          target="_blank"
          :href="`${serverUrl}admin`"
        >
          <q-item-section>
            Admin
          </q-item-section>
        </q-item>
      </q-list>

      <q-item
        tag="label"
        class="absolute-bottom  q-pa-none"
        style="height: 60px; border-top: 1px solid #5c5c5c; "
      >


        <q-item-section class="q-pl-md">
          Theme: {{ $q.dark.isActive ? 'Dark' : 'Light' }}
        </q-item-section>
        <q-item-section
          side
          class="q-pa-none"
        >
          <q-toggle
            keep-color
            size="xl"
            class="text-red"
            :model-value="main.darkMode"
            @update:model-value="toggleTheme"
            checked-icon="brightness_3"
            :color="$q.dark.isActive ? 'yellow' : 'white'"
            unchecked-icon="light_mode"
          />
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      v-if="false && ($route.name == 'edit-order' || $route.name == 'home')"
      reveal
      class="bg-white text-white q-pb-md"
    >
      <q-toolbar>
        <div class="row justify-between full-width">
          <div>
            <q-btn
              outline
              round
              color="red"
              :icon="main.grid ? 'grid_view' : 'view_list'"
              @click="main.toggleViewLayout"
              size="sm"
            ></q-btn>
          </div>
          <div>
            <q-btn
              @click="() => {
                menu.setSelectedList();
                if (menu.selectedList?.length > 0)
                  main.openOrderDialog = true;
              }"
              title="Summary"
              label="Summary"
              outline
              rounded
              color="primary"
              icon="receipt_long"
            ></q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { serverUrl } from 'src/boot/main';
import { diningTable, main, menu } from 'src/pages/main';
import { onMounted, ref } from 'vue'


onMounted(() => {
  menu.getMenuItems();
  diningTable.getDiningTables();
  const lightTheme = localStorage.getItem('light-theme')
  if (!lightTheme) {
    $q.dark.set(true);
  } else {
    main.darkMode = false;
  }
  const listView = localStorage.getItem('item-layout')
  if (listView) {
    main.grid = false;
  }
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleTheme() {
  const dark = $q.dark.isActive
  main.darkMode = !dark;
  if (dark) {
    //set to light
    localStorage.setItem('light-theme', true);
  } else {
    localStorage.removeItem('light-theme')
  }
  $q.dark.toggle();
}



</script>
