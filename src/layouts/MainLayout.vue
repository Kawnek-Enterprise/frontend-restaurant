<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-py-xs">
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
          </div>
          <div>
            <q-btn
              outline
              round
              :icon="$q.dark.isActive ? 'brightness_2' : 'light_mode'"
              @click="toggleTheme"
              size="sm"
            ></q-btn>
          </div>

        </div>


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
import { diningTable, main, menu } from 'src/pages/main';
import { onMounted, ref } from 'vue'


onMounted(() => {
  menu.getMenuItems();
  diningTable.getDiningTables();
  const lightTheme = localStorage.getItem('light-theme')
  if (!lightTheme) {
    $q.dark.set(true);
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
  if (dark) {
    //set to light
    localStorage.setItem('light-theme', true);
  } else {
    localStorage.removeItem('light-theme')
  }
  $q.dark.toggle();
}


</script>
