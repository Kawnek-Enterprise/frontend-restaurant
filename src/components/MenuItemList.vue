<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 ">
      <CategoryHorizontalScroll />
    </div>
    <template
      v-for="menuItem in menu.filteredMenuItemList"
      :key="menuItem.id"
    >
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <q-card
          flat
          bordered
          class="full-height overflow-hidden"
          :style="menuItem.is_available ? '' : ';'"
          style="position: relative;"
        >
          <div
            v-if="!menuItem.is_available"
            class="absolute fit  flex flex-center"
            style="z-index: 2; background-color: rgba(0, 0, 0, 0.7); width: 100%; height: 100%; top: 0; left: 0; "
            :style="main.grid ? 'font-size:  xx-large' : ''"
          >
            <div
              class="text-red"
              style="transform: rotate(-40deg);  font-family: 'Courier New', Courier, monospace;cursor: default"
            >
              NOT AVAILABLE</div>
          </div>
          <q-card-section
            class="q-pa-sm"
            v-show="main.grid"
          >
            <q-img
              no-spinner
              style="border-radius: 1rem;"
              ratio="2"
              fit="contain"
              :src="`${menuItem.image_path}`"
            >
              <template v-slot:loading>
                Loading image..
              </template>
              <template #error>
                <q-img
                  style="border-radius: 1rem;"
                  ratio="2"
                  fit="contain"
                  :src="`${srvUrl}${menuItem.image_path}`"
                >
                </q-img>
              </template>
            </q-img>
          </q-card-section>
          <q-card-section>
            <div class="row justify-between items-center">
              <div style="font-size: 17px;">
                {{ menuItem.name }}
              </div>
              <div v-if="main.grid">
                ₹{{ menuItem.price }}
              </div>
            </div>

            <div class="row items-center">
              <div
                v-if="!main.grid"
                class="col q-pt-sm"
              >
                <div>
                  ₹{{ menuItem.price }}
                </div>
              </div>
              <div class="col q-pt-sm row q-col-gutter-xs items-center no-wrap">
                <div>
                  <q-btn
                    class="text-non-selectable"
                    dense
                    outline
                    color="primary"
                    icon="remove"
                    @click="() => {
                      menuItem.quantity > 1 ? menuItem.quantity-- : menuItem.quantity = undefined
                      nextTick(() => menu.setSelectedList())
                    }"
                  ></q-btn>
                </div>

                <div class="col">
                  <q-input
                    @update:model-value="nextTick(() => menu.setSelectedList())"
                    class=" quantity"
                    :disable="!menuItem.is_available"
                    dense
                    v-model="menuItem.quantity"
                  ></q-input>
                </div>

                <div>
                  <q-btn
                    :disable="!menuItem.is_available"
                    class="text-non-selectable"
                    dense
                    outline
                    color="primary"
                    icon="add"
                    @click="() => {
                      const summaryButton = $refs.animatedSummaryButton?.$el
                      summaryButton.classList.add('bounce-in')
                      menuItem.quantity ? menuItem.quantity++ : menuItem.quantity = 1
                      nextTick(() => menu.setSelectedList())
                    }"
                  ></q-btn>

                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </template>

    <!-- <div
      class="row q-col-gutter-xs q-pa-sm bg-white justify-between"
      style="position: fixed; width: 100vw;left: 0; bottom: 0; border-top: 1px solid #dfdfdf;"
    >

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
    </div> -->
    <div class="fixed-bottom-right q-pr-lg q-pb-xl column q-col-gutter-sm">
      <!--  -->
      <div>
        <q-btn
          v-show="menu.selectedList?.length > 0"
          @click="() => {
            menu.setSelectedList();
            if (menu.selectedList?.length > 0)
              main.openOrderDialog = true;
          }"
          id="summary-button"
          ref="animatedSummaryButton"
          title="Summary"
          round
          color="primary"
          icon="receipt_long"
        ></q-btn>
      </div>
      <div>
        <q-btn
          color="primary"
          round
          icon="search"
          style="z-index: 700;"
        >
          <q-popup-proxy
            breakpoint="0"
            transition-duration="300"
            :offset="[10, 0]"
            transition-show="jump-left"
            transition-hide="jump-right"
            anchor="center left"
            self="center right"
          >
            <q-card class=" text-white q-pa-sm">
              <q-input
                @update:model-value="(val) => menu.filteredMenuItemList = menu.filterMenuItems(menu.list, val, categories.categoryIds)"
                debounce="500"
                autofocus
                style="min-width: 200px"
                dense
                v-model="menu.filter"
                type="text"
                placeholder="Search"
              />
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
  </div>
  <order-summary />
  <OrderInfo />
</template>

<script setup>
import { main, menu, diningTable } from "src/pages/main";
import { nextTick, onMounted } from "vue";
import OrderSummary from 'src/components/OrderSummary.vue'
import OrderInfo from 'src/components/OrderInfo.vue'
import CategoryHorizontalScroll from "./CategoryHorizontalScroll.vue";
import { categories } from "src/utils/categories";

const srvUrl = process.env.srvUrl;


const columns = [
  {
    label: '',
    name: 'name',
    field: 'name',
  },

  {
    label: '',
    name: 'description',
    field: 'description',
  },

  {
    label: '',
    name: 'price',
    field: 'price',
  },
  {
    label: '',
  },
]
</script>


<style lang="scss">
.quantity {
  input {
    text-align: center;
  }
}


@keyframes bounceIn {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-in {
  animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}
</style>
