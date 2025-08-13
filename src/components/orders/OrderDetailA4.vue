<template>
  <div>
    <div style="width: 100%; ">
      <div style="max-width: 210mm; margin: auto;">
        <img
          style="width: 100%; "
          id="invoice-a4-img"
          src=""
          alt=""
        >
      </div>

    </div>
    <div style="height: 0; width: 0; overflow: hidden;">
      <div
        id="invoice-a4"
        class="invoice invoice-a4"
      >

        <div class="invoice-header">
          <h2>Invoice #{{ orders.detail.number }}</h2>

        </div>

        <div class="invoice-info">
          <div class="billed-to">
            <h4 class="q-my-none">Billed To</h4>
            <p>Name: {{ orders.detail.name }}</p>
            <p v-if="orders.detail.phone">Phone: {{ orders.detail.phone }}</p>
            <p v-if="orders.detail.dining_table">
              Table: {{ orders.detail.dining_table.number }}
            </p>
          </div>
          <div class="invoice-date">
            <h4 class="q-my-none">Date</h4>
            <p>{{ formatDate(orders.detail.created_at) }}</p>
          </div>
        </div>


        <table class="invoice-table">
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in orders.detail.menu_item_orders"
              :key="item.id"
            >
              <td>{{ item.item_name }}</td>
              <td>{{ parseInt(item.quantity) }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
            </tr>

            <tr class="total-row">
              <td colspan="2">
                <div class="row no-wrap items-center">
                  <div class="">
                    <QRCodeVue3
                      width="100"
                      height="100"
                      :corners-dot-options="qrOptions.cornersDotOptions"
                      :corners-square-options="qrOptions.cornersSquareOptions"
                      :dots-options="qrOptions.dotsOptions"
                      v-if="orders.total_amount > 0"
                      :value="paymentLink"
                    />
                  </div>
                  <div
                    class="items-center"
                    style="font-family: 'Courier New', Courier, monospace;"
                  >
                    <h5 style="font-weight: 400; margin: 0;">
                      Please scan to pay.
                    </h5>

                    <div style="font-family: 'Brush Script MT', cursive; font-size: 17px;">
                      Thank you for dining with us! We hope you enjoy your meal.
                    </div>
                  </div>
                </div>
              </td>
              <td
                colspan=""
                class="text-right"
              >TOTAL AMOUNT</td>
              <td class="text-bold">{{ orders.total_amount.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>


      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import QRCodeVue3 from "qrcode-vue3";
import { orders } from "src/pages/orders/orders";

const qrOptions = {
  type: "canvas",
  shape: "square",
  width: 200,
  height: 200,
  margin: 0,
  qrOptions: {
    typeNumber: "0",
    mode: "Byte",
    errorCorrectionLevel: "Q",
  },
  dotsOptions: {
    type: "extra-rounded",
    color: "#f43f5e",
    roundSize: true,
  },
  backgroundOptions: {
    round: 0,
    color: "#00FFFFFF",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#f43f5e",
  },
  cornersDotOptions: {
    type: "",
    color: "#f43f5e",
  },
};

const paymentLink = computed(() => {
  return `upi://pay?pa=blalmalsawma@sbi&pn=B LALMALSAWMA&am=${orders.total_amount}&cu=INR`;
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const print = () => {
  document.body.classList.remove("dark-mode");
  nextTick(() => {
    window.print();
  });
};

onMounted(() => {
  window.onafterprint = () => {
    document.body.classList.toggle("dark-mode", !localStorage.getItem("light-theme"));
  };
});
</script>
