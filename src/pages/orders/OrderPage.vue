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

const q = useQuasar()
const router = useRouter()
const route = useRoute()

onMounted(() => {
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
