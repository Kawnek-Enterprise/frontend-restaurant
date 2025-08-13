<template>
  <q-page padding>
    <div style="max-width: 210mm; margin: auto;">
      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col">
          <q-item
            clickable
            style="border: 1px solid #dfdfdf; border-radius: 0.5rem;"
          >
            <q-item-section>
              <q-radio
                v-model="selectedSize"
                val="a4"
                label="A4 size"
              ></q-radio>
            </q-item-section>
          </q-item>
        </div>
        <div class="col">
          <q-item
            clickable
            style="border: 1px solid #dfdfdf; border-radius: 0.5rem;"
          >
            <q-item-section>
              <q-radio
                v-model="selectedSize"
                val="thermal"
                label="Thermal"
              ></q-radio>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div :class="{
        'virtual-hide': selectedSize !== 'a4'
      }">
        <div class="row q-mb-md justify-between">
          <div class="col-auto">
            <q-btn
              icon="print"
              @click="onClickPrint('invoice-a4')"
              label="Print (A4)"
            ></q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              :to="{
                name: 'edit-order',
                params: {
                  id: $route.params.id
                }
              }"
              label="Edit"
            >

            </q-btn>
          </div>
        </div>
        <OrderDetailA4 />
      </div>
      <div :class="{
        'virtual-hide': selectedSize !== 'thermal'
      }">
        <div class="row q-mb-md justify-between">
          <div class="col-auto">
            <q-btn
              icon="print"
              @click="onClickPrint('invoice-thermal')"
              label="Print (thermal)"
            ></q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              :to="{
                name: 'edit-order',
                params: {
                  id: $route.params.id
                }
              }"
              label="Edit"
            >

            </q-btn>
          </div>
        </div>
        <OrderDetailThermal />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import OrderDetailA4 from 'src/components/orders/OrderDetailA4.vue';
import OrderDetailThermal from 'src/components/orders/OrderDetailThermal.vue';

import { useVueToPrint } from "vue-to-print";
import { nextTick, onBeforeMount, ref, watch } from 'vue';
import { orders } from 'src/pages/orders/orders';
const selectedSize = ref('a4');
function onClickPrint(target) {
  const content = document.getElementById(target ?? 'invoice-thermal')

  const { handlePrint } = useVueToPrint({
    content,
    documentTitle: "Kawnek Restaurant | Invoice"
  });
  handlePrint();
}

console.log('watch: ', watch)
onBeforeMount(
  () => {
    orders.getDetail();
  }
)


</script>
<style>
.virtual-hide {
  height: 0;
  width: 0;
  overflow: hidden;
}
</style>
