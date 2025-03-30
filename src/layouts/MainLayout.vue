<template>
  <q-layout view="hHr Lpr fFr">
    <q-header
      behavior="mobile"
      style="background-color: #121212;"
    >
      <q-toolbar>
        <div class="col-12">
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

            <div class="col q-mt-sm">
              <CategoryHorizontalScroll />
            </div>
            <div class="col-auto">

              <!-- v-show="menu.selectedList?.length > 0" -->
              <SearchItems />
            </div>
          </div>
        </div>
      </q-toolbar>
      <q-toolbar class="">
        <div class="q-pl-sm row items-center">
          <BreadcrumbPanel />
          <div class="col q-pl-md">
            <q-chip
              color="primary"
              @remove="() => {
                menu.filter = '';
                menu.filteredMenuItemList = menu.filterMenuItems(menu.list, val, categories.categoryIds)
              }"
              v-if="menu.filter"
              removable
              class=""
            >
              {{ menu.filter }} <span style="width: 20px;"></span>
            </q-chip>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
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
      <q-btn
        v-if="$q.screen.lt.md"
        style="position: fixed; bottom: 50px; right: 20px;"
        @click="() => {
          menu.setSelectedList();
          if (menu.selectedList?.length > 0)
            main.openOrderDialog = true;
        }"
        id="summary-button"
        ref="animatedSummaryButton"
        title="Summary"
        rounded
        :label="menu.selectedList?.length > 0 ? menu.selectedList?.length : ''"
        color="primary"
        icon="receipt_long"
      ></q-btn>
      <div
        v-if="$q.screen.gt.sm"
        style="position: fixed; top: 0; right: 0; width: 400px; z-index: 3000;"
      >
        <OrderSummary />
      </div>
    </q-page-container>

    <q-drawer
      v-if="$q.screen.gt.sm"
      show-if-above
      :model-value="true"
      side="right"
      bordered
      behavior="desktop"
      width="400"
    >

    </q-drawer>

  </q-layout>
</template>

<script setup>
import { serverUrl } from 'src/boot/main';
import CategoryHorizontalScroll from 'src/components/CategoryHorizontalScroll.vue';
import BreadcrumbPanel from 'src/components/layout/BreadcrumbPanel.vue';
import NavItemList from 'src/components/layout/NavItemList.vue';
import SearchItems from 'src/components/menu/SearchItems.vue';
import OrderSummary from 'src/components/orders/OrderSummary.vue';
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
