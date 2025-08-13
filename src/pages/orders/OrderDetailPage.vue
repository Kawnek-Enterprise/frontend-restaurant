<template>
  <div>
    <div class="action-buttons q-mb-md">
      <div>
        <button
          class="print-button hide-on-print"
          @click="onClickPrint('invoice-a4')"
        >
          Print (A4)
        </button>
      </div>
      <div>
        <button
          class="print-button hide-on-print"
          @click="onClickPrint('invoice-thermal')"
        >
          Print (Thermal)
        </button>
      </div>
      <router-link
        class="edit-button hide-on-print"
        :to="{
          name: 'edit-order',
          params: {
            id: $route.params.id
          }
        }"
      >
        Edit
      </router-link>
    </div>
    <OrderDetailA4 />
    <OrderDetailThermal />
  </div>
</template>
<script setup>
import OrderDetailA4 from 'src/components/orders/OrderDetailA4.vue';
import OrderDetailThermal from 'src/components/orders/OrderDetailThermal.vue';
import { useVueToPrint } from "vue-to-print";

function onClickPrint(target) {
  const content = document.getElementById(target ?? 'invoice-thermal')

  const { handlePrint } = useVueToPrint({
    content,
    documentTitle: "Kawnek Restaurant | Invoice"
  });
  handlePrint();
}
//
</script>
