<template>
  <q-table
    flat
    bordered
    hide-header
    hide-bottom
    title="Menu"
    :filter="menu.filter"
    :rows-per-page-options="[0]"
    :rows="menu.list"
    :columns="columns"
    row-key="id"
  >
    <template v-slot:top>
      <div class="row justify-between fit items-center">
        <div>
          <!-- <q-select
              dense
              outlined
              :option-label="(val) => `Table ${val.number}`"
              option-value="id"
              emit-value
              map-options
              v-model="main.form.dining_table_id"
              :options="diningTable.list"
            ></q-select> -->
          <q-input
            class="q-mt-sm"
            dense
            outlined
            style="width: 200px;"
            v-model="menu.filter"
            type="text"
            label="Search"
          />
        </div>
        <div class="row q-col-gutter-xs">
          <div>
            <q-btn
              @click="() => {
                main.openInfoDialog = true;
              }"
              title="Summary"
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
                menu.setSelectedList()
                  ;
                if (menu.selectedList?.length > 0)
                  main.openOrderDialog = true;
              }"
              title="Summary"
              outline
              rounded
              color="primary"
              icon="receipt_long"
            ></q-btn>
          </div>
        </div>

      </div>
    </template>
    <template v-slot:body="props">
      <q-tr>
        <q-td auto-width>
          <q-img
            height="64px"
            width="64px"
            fit="cover"
            position="center"
            :src="`storage/${props.row.image_path}`"
          ></q-img>
        </q-td>
        <q-td>
          {{ props.row.name }}
          <div class="text-caption">
            {{ props.row.description }}
          </div>
        </q-td>
        <q-td>
          {{ props.row.price }}
        </q-td>
        <q-td class="">
          <div class="row q-col-gutter-sm items-center">
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
              <!-- :model-value="parseInt(Math.random() * 10)" -->
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


</template>


<script setup>
import { main, menu, diningTable } from "src/pages/main";
import { onMounted } from "vue";
import OrderSummary from 'src/components/OrderSummary.vue'
import OrderInfo from 'src/components/OrderInfo.vue'




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
