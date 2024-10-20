<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 ">
      <h3 class="q-ma-none">Menu</h3>
    </div>
    <template
      v-for="menuItem in menu.list"
      :key="menuItem.id"
    >
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="">
          <q-card-section>
            <q-img
              style="border-radius: 1rem;"
              ratio="1.5"
              :src="`${srvUrl}${menuItem.image_path}`"
            ></q-img>
          </q-card-section>
          <q-card-section>
            <h5 class="q-ma-none">
              {{ menuItem.name }}
            </h5>

            <div class="q-mt-md full-width row q-col-gutter-xs items-center no-wrap">
              <div>
                <q-btn
                  class="text-non-selectable"
                  dense
                  outline
                  color="primary"
                  icon="remove"
                  @click="menuItem.quantity > 1 ? menuItem.quantity-- : menuItem.quantity = undefined"
                ></q-btn>
              </div>

              <div class="col">
                <q-input
                  class=" quantity"
                  borderless
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
                  @click="menuItem.quantity ? menuItem.quantity++ : menuItem.quantity = 1"
                ></q-btn>
              </div>
            </div>
            <div style="height: 21px">
              <p
                v-show="!menuItem.is_available"
                class="text-red text-right"
              >
                Not available
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>

    <div
      class="row q-col-gutter-xs q-pa-sm bg-white justify-end "
      style="position: fixed; width: 100vw;left: 0; bottom: 0; border-top: 1px solid #dfdfdf;"
    >
      <div>
        <q-btn
          @click="() => {
            main.openInfoDialog = true;
          }"
          title="Table Info"
          label="Table Info"
          outline
          rounded
          color="primary"
          icon="workspaces"
        >
        </q-btn>
      </div>
      <div>
        <q-btn
          :disable="!main.form.dining_table_id || !main.form.name"
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
  </div>
</template>

<script setup>
import { main, menu, diningTable } from "src/pages/main";
import { onMounted } from "vue";
import OrderSummary from 'src/components/OrderSummary.vue'
import OrderInfo from 'src/components/OrderInfo.vue'

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
</style>
