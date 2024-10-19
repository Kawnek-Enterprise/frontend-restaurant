<template>
  <q-table
    :loading="menu.loadingItems"
    flat
    bordered
    hide-header
    hide-bottom
    title="Menu"
    class="q-pb-md q-mb-xl"
    :filter="menu.filter"
    :rows-per-page-options="[0]"
    :rows="menu.list"
    :columns="columns"
    row-key="id"
  >
    <template v-slot:body="props">
      <q-tr>
        <q-td auto-width>
          <q-img
            no-spinner
            height="64px"
            width="64px"
            fit="cover"
            position="center"
            :src="`${srvUrl}${props.row.image_path}`"
          ></q-img>
        </q-td>
        <q-td>

          <div class="col">
            {{ props.row.name }}
          </div>
          <div
            class="text-caption"
            style="max-width: 18vw; overflow: hidden; text-wrap: wrap; word-wrap: normal; line-height: 90%; "
          >
            {{ props.row.description }}
          </div>
          <div>
            ₹{{ props.row.price }}/-
          </div>


        </q-td>

        <q-td class="">
          <div class="row q-col-gutter-xs items-center no-wrap">
            <div>
              <q-btn
                class="text-non-selectable"
                dense
                round
                outline
                size="sm"
                color="primary"
                icon="remove"
                @click="props.row.quantity > 1 ? props.row.quantity-- : props.row.quantity = undefined"
              ></q-btn>
            </div>
            <div class="flex flex-center">
              <q-input
                outlined
                style="min-width: 50px; max-width: 50px; display: inline;"
                dense
                v-model="props.row.quantity"
              ></q-input>

            </div>
            <div>
              <q-btn
                class="text-non-selectable"
                dense
                round
                outline
                size="sm"
                color="primary"
                icon="add"
                @click="props.row.quantity ? props.row.quantity++ : props.row.quantity = 1"
              ></q-btn>
            </div>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <order-summary />
  <order-info />


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
      ></q-btn>
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
