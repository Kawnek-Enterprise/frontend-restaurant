<template>
  <q-page padding>
    <q-table
      title="Orders"
      :rows="orders.list"
      :columns="columns"
      row-key="id"
      v-model:pagination="orders.pagination"
      @request="orders.getOrders"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row q-col-gutter-sm">
            <div>
              <q-btn
                :to="{
                  name: 'order-detail',
                  params: {
                    id: props.row.id
                  }
                }"
                rounded
                size="sm"
                color="primary"
                icon="workspaces"
              >

              </q-btn>
            </div>
            <div>
              <q-btn
                :to="{
                  name: 'edit-order',
                  params: {
                    id: props.row.id
                  }
                }"
                rounded
                size="sm"
                color="primary"
                icon="edit"
              >

              </q-btn>
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { orders } from 'src/pages/orders/orders';
import { main } from '../main';

const q = useQuasar()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  main.resetOrder();
  orders.getOrders();
});

const columns = [
  {
    label: 'Number',
    name: 'number',
    field: val => val.number,
    align: 'left',
  },

  // {
  //   label: 'Name',
  //   name: 'name',
  //   field: val => val.name ? val.name : val.user?.name ? val.user?.name : 'N/A',
  //   align: 'left',
  // },

  // {
  //   label: 'Phone',
  //   name: 'phone',
  //   field: val => val.phone ?? 'N/A',
  //   align: 'left',
  // },

  {
    label: 'source',
    name: 'source',
    field: val => val.dining_table?.number ? `Table ${val.dining_table?.number}` : val.room?.name ?? 'N/A',
    align: 'left',
  },
  {
    label: '',
    name: 'actions',
  },
]
</script>
