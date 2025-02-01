<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="shimmer">
      <q-toolbar class="q-pt-md ">
        <div class="row full-width items-center">
          <div class="">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </div>
          <div
            class="col q-px-md"
            style="height:40px"
          >
            <q-input
              clearable
              v-show="main.showSearchField"
              @blur="main.showSearchField = false"
              ref="searchInputRef"
              @update:model-value="(val) => menu.filteredMenuItemList = menu.filterMenuItems(menu.list, val, categories.categoryIds)"
              debounce="500"
              autofocus
              style="min-width: 200px"
              dense
              v-model="menu.filter"
              type="text"
              placeholder="Search"
            />
          </div>
          <div class="col-auto">
            <q-btn
              v-if="$route.name == 'home' || $route.name == 'edit-order'"
              @click="() => {
                main.showSearchField = true;
                $nextTick(
                  () => {
                    $refs.searchInputRef.focus()
                  }
                )
              }"
              outline
              dense
              round
              icon="search"
            ></q-btn>
          </div>
        </div>
      </q-toolbar>
      <q-toolbar class="">
        <div class="q-pl-sm">
          <BreadcrumbPanel />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      style="position: relative; background-color: rgba(255, 200, 200, 0.1);"
      :class="$q.dark.isActive ? '' : ''"
    >
      <div class="fit column justify-between">
        <div class="col-auto">
          <div
            @click="$router.push({
              name: 'home'
            })"
            style="height: 108px; font-size: x-large; cursor: default !important;"
            class="flex items-center q-pl-lg drawer-shimmer"
          >
            Kawnek Restaurant
          </div>
          <q-list class="q-px-xs">
            <q-separator></q-separator>
            <NavItemList />
            <q-separator class="q-my-sm"></q-separator>
            <q-item
              style="border-radius: 1rem;"
              target="_blank"
              :href="`${serverUrl}admin`"
            >
              <q-item-section side>
                <q-icon
                  name="admin_panel_settings"
                  size="sm"
                />
              </q-item-section>
              <q-item-section>
                Admin
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="launch"
                  size="sm"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-auto">
          <div class="">
            <q-separator></q-separator>
            <q-item
              v-if="$route.name == 'home' || $route.name == 'edit-order'"
              tag="label"
              class="q-pa-none"
              style="height: 60px; "
            >
              <q-item-section class="q-pl-md">
                Menu view: {{ main.grid ? 'Grid' : 'List' }}
              </q-item-section>
              <q-item-section
                side
                class="q-pr-md"
              >
                <q-btn
                  class="q-mr-md"
                  outline
                  round
                  size="xs"
                  :icon="main.grid ? 'grid_view' : 'view_list'"
                  @click="main.toggleViewLayout"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item
              tag="label"
              class="q-pa-none"
              style="height: 60px; "
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
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { serverUrl } from 'src/boot/main';
import BreadcrumbPanel from 'src/components/layout/BreadcrumbPanel.vue';
import NavItemList from 'src/components/layout/NavItemList.vue';
import { diningTable, main, menu } from 'src/pages/main';
import { categories } from 'src/utils/categories';
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

<style>
.shimmer {
  background: linear-gradient(-45deg, #dd6172, #d36574, #ee7752, #e0598d);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

}

@keyframes gradient {
  0% {
    background-position: 100% 50%;
  }

  50% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}
</style>
