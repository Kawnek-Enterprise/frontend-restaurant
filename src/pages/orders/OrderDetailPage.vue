<!-- <template>
  <q-page padding>
    <q-card class="flat outlined">

      {{  }}
    </q-card>
  </q-page>
</template> -->

<template>
  <q-page>
    <q-card flat>
      <q-card-section class="row justify-between text-h5">
        Invoice #{{ orders.detail.number }}
        <div>
          <q-btn
            :to="{
              name: 'edit-order',
              params: {
                id: $route.params.id
              }
            }"
            rounded
            size="sm"
            color="primary"
            icon="edit"
          >

          </q-btn>
        </div>


      </q-card-section>

      <q-card-section class="q-gutter-x-md">
        <div class="col-xs-12 col-md-6">
          <q-item label="Billed To">
            <q-item-section>
              Name: {{ orders.detail.name }}
            </q-item-section>
            <q-item-section v-if="orders.detail.phone">
              Phone: {{ orders.detail.phone }}
            </q-item-section>
            <q-item-section v-if="orders.detail.dining_table">
              Table: {{ orders.detail.dining_table.number }}
            </q-item-section>
          </q-item>
        </div>
        <div class="col-xs-12 col-md-6 text-right">
          <q-item label="Date">
            <q-item-section class="text-right">
              {{ date.formatDate(orders.detail.created_at, 'Do MMM, YYYY') }}
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-section>
        <q-markup-table
          flat
          bordered
          square
        >
          <thead class="text-left">
            <tr>
              <th class="">Item</th>
              <th class="">Quantity</th>
              <th class="">Price</th>
              <th class="">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in orders.detail.menu_items"
              :key="item.id"
            >
              <q-td>
                <!-- {{ getItemName(item.pivot.menu_item_id) }}  -->
                item name
              </q-td>
              <q-td class="">
                {{ parseInt(item.quantity) }}
              </q-td>
              <q-td>
                {{ item.price }}
              </q-td>
              <q-td>
                {{ item.amount }}
              </q-td>
              <!-- <q-td class=""> - </td>
                <q-td class=""> - </td> -->
            </tr>
            <tr>
              <q-td
                colspan="3"
                class="text-right text-bold"
              >
                TOTAL AMOUNT

              </q-td>
              <q-td class="text-right text-bold">
                {{ orders.total_amount.toFixed(2) }}
              </q-td>

            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-section class="text-right">
        <q-item label="Subtotal">
          <q-item-section class="text-right">
            -
          </q-item-section>
        </q-item>
        <q-item
          v-if="orders.detail.tax"
          label="Tax"
        >
          <q-item-section class="text-right">
            {{ orders.detail.tax }}% (-)
          </q-item-section>
        </q-item>
        <q-item label="Total">
          <q-item-section class="text-right">
            -
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { date } from "quasar";
import { onMounted } from "vue";
import { orders } from "./orders";

onMounted(() => {
  orders.getDetail();
})
</script>
