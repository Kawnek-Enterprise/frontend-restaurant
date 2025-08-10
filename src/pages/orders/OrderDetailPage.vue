<template>
  <q-page>
    <q-card
      flat
      id="invoice"
    >
      <q-card-section class="row justify-between text-h5">
        Invoice #{{ orders.detail.number }}
        <div class="row q-col-gutter-sm">
          <div class="col-auto">
            <q-btn
              class="hide-on-print"
              @click="print"
              rounded
              color="primary"
              icon="print"
            >

            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn
              class="hide-on-print"
              :to="{
                name: 'edit-order',
                params: {
                  id: $route.params.id
                }
              }"
              rounded
              color="primary"
              icon="edit"
            >
            </q-btn>
          </div>
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
          class="q-pa-xs"
        >
          <thead class="">
            <tr>
              <th
                class="text-left"
                style="padding-left: 1rem;"
              >Item</th>
              <th
                class="text-left"
                style="padding-left: 1rem;"
              >Qty</th>
              <th
                class="text-left"
                style="padding-left: 1rem;"
              >Price</th>
              <th
                class="text-left"
                style="padding-left: 1rem;"
              >Amount</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr
              v-for="item in orders.detail.menu_item_orders"
              :key="item.id"
            >
              <q-td>
                {{ item.item_name }}
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

            </tr>
            <tr>
              <q-td
                colspan="3"
                class="text-right text-bold"
              >
                TOTAL AMOUNT

              </q-td>
              <q-td class=" text-bold">
                {{ orders.total_amount.toFixed(2) }}
              </q-td>

            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <!-- <q-card-section class="text-right">
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
      </q-card-section> -->
      <div class="column flex flex-center">
        <h4 class="q-my-none">
          Scan to pay
        </h4>
        <div
          class="q-pa-md"
          style="width: min-content;"
        >

          <div
            class="q-pa-sm bg-white"
            style="border-radius: 1rem; overflow: hidden; "
          >

            <QRCodeVue3
              :corners-dot-options="qrOptions.cornersDotOptions"
              :corners-square-options="qrOptions.cornersSquareOptions"
              :dots-options="qrOptions.dotsOptions"
              v-if="orders.total_amount > 0"
              :value="paymentLink"
            />
          </div>

        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { date } from "quasar";
import { computed, nextTick, onMounted, ref } from "vue";
import { orders } from "./orders";
import QRCodeVue3 from "qrcode-vue3";
import UPILogo from "src/components/elements/UPILogo.vue";
const showCode = ref(false);
const paymentLink = computed(() => `upi://pay?pa=blalmalsawma@sbi&pn=B LALMALSAWMA&am=${orders.total_amount}&cu=INR`)
const qrOptions = ref({
  "type": "canvas",
  "shape": "square",
  "width": 300,
  "height": 300,
  "data": `upi://pay?pa=blalmalsawma@sbi&pn=Kawnek Enterprise&am=${orders.total_amount}&cu=INR`,
  "margin": 0,
  "qrOptions": {
    "typeNumber": "0",
    "mode": "Byte",
    "errorCorrectionLevel": "Q"
  },
  "imageOptions": {
    "saveAsBlob": true,
    "hideBackgroundDots": true,
    "imageSize": 0.4,
    "margin": 0
  },
  "dotsOptions": {
    "type": "extra-rounded",
    "color": "#f43f5e",
    "roundSize": true
  },
  "backgroundOptions": {
    "round": 0,
    "color": "#00FFFFFF"
  },
  // "image": "10cc19bd484118dbcd0a7886a38ceddc.png",
  "dotsOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#6a1a4c",
      "color2": "#6a1a4c",
      "rotation": "0"
    }
  },
  "cornersSquareOptions": {
    "type": "extra-rounded",
    "color": "#f43f5e"
  },
  "cornersSquareOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "cornersDotOptions": {
    "type": "",
    "color": "#f43f5e"
  },
  "cornersDotOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "backgroundOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#ffffff",
      "color2": "#ffffff",
      "rotation": "0"
    }
  }
})

onMounted(() => {
  orders.getDetail();
  window.onafterprint = (event) => {
    $q.dark.set(!localStorage.getItem('light-theme'))
  };
})

function print() {
  $q.dark.set(false)
  nextTick(
    () => {
      window.print();
    }
  )
}
</script>
<style>
@media print {
  body {
    visibility: hidden;
  }

  .hide-on-print {
    display: none;
  }

  #invoice {
    visibility: visible;
    position: fixed;
    width: 210mm;
    left: 0;
    top: 0;
  }

  /* * {
    color: black !important;
    background-color: white !important;
  } */
}
</style>
