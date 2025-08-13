<template>
  <div>
    <div style="width: 100%; ">
      <div style="max-width: 80mm; margin: auto;">
        <img
          style="width: 100%; "
          id="invoice-thermal-img"
          src=""
          alt=""
        >
      </div>
    </div>
    <div style="height: 0; width: 0; overflow: hidden;;">
      <div
        id="invoice-thermal"
        class="invoice-thermal"
      >
        <div class="invoice-header">
          <h3 class="text-center">Invoice #{{ orders.detail.number }}</h3>
          <p class="text-center">{{ formatDate(orders.detail.created_at) }}</p>
        </div>

        <div class="billed-to">
          <p><strong>Name:</strong> {{ orders.detail.name }}</p>
          <p v-if="orders.detail.phone"><strong>Phone:</strong> {{ orders.detail.phone }}</p>
          <p v-if="orders.detail.dining_table">
            <strong>Table:</strong> {{ orders.detail.dining_table.number }}
          </p>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-center">Qty</th>
              <th class="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in orders.detail.menu_item_orders"
              :key="item.id"
            >
              <td class="text-left">{{ item.item_name }}</td>
              <td class="text-center">{{ parseInt(item.quantity) }}</td>
              <td class="text-right">{{ item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <p class="text-right"><strong>TOTAL: {{ orders.total_amount.toFixed(2) }}</strong></p>
        </div>
        {{ orders.total_amount }}
        <div
          class="qr-section"
          v-if="orders.total_amount > 0"
        >
          <p class="text-center">Scan to pay</p>
          <div class="qr-container">
            <QRCodeVue3
              :width="120"
              :height="120"
              :value="paymentLink"
              :dots-options="{ type: 'dots', color: '#000000' }"
              :background-options="{ color: '#ffffff' }"
            />
          </div>
        </div>

        <div class="footer">
          <p class="text-center">Thank you for your visit!</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import QRCodeVue3 from "qrcode-vue3";
import { orders } from "src/pages/orders/orders";

const paymentLink = computed(() => {
  return `upi://pay?pa=blalmalsawma@sbi&pn=B LALMALSAWMA&am=${orders.total_amount}&cu=INR`;
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
});
</script>
