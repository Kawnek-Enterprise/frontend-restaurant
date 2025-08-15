import { api } from "src/boot/axios";
import { reactive } from "vue";
import html2canvas from 'html2canvas'

import domtoimage from 'dom-to-image-more'
// html2canvas
const orders = reactive({
  list: [],
  data: {},
  detail: {
    id: undefined,
    name: undefined,
    dining_table_id: undefined,
    room_id: undefined,
    menu_item_orders: [],
  },
  total_amount: 0,
  pagination: {
    rowsPerPage: 5,
    rowsNumber: 0,
  },
  getOrders,
  getDetail,
});

async function getOrders(props) {
  if (!props) {
    props = {
      pagination: orders.pagination,
    };
  } else {
    orders.pagination = props.pagination;
  }
  try {
    const res = await api.get(`orders`, {
      params: {
        ...orders.pagination,
      },
    });
    orders.pagination.rowsNumber = res.data?.total ?? 0;
    orders.list = res.data?.data ?? res.data;
    orders.data = res.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function getDetail() {
  try {
    orders.total_amount = 0;
    const res = await api.get(`orders/${$route.params.id}`);
    orders.detail = res.data;
    orders.total_amount = orders.detail.menu_item_orders.reduce(
      (p, c) => p + parseFloat(c.amount),
      0
    );

    setTimeout(() => {
      drawInvoice();
    }, 300);
  } catch (error) {
    console.error(error.message);
  }
}

function drawInvoice() {
  const invoiceA4 = document.getElementById('invoice-a4');
  const invoiceThermal = document.getElementById('invoice-thermal');
  const a4Image = document.getElementById('invoice-a4-img');
  const thermalImage = document.getElementById('invoice-thermal-img');

  html2canvas(invoiceA4).then(canvas => {
    a4Image.src = canvas.toDataURL();
  });

  html2canvas(invoiceThermal).then(canvas => {
    thermalImage.src = canvas.toDataURL();
  });
  // domtoimage.toJpeg(invoiceA4)
  //   .then(
  //     function (dataUrl) {
  //       a4Image.src = dataUrl;
  //     }
  //   )

  // domtoimage.toJpeg(invoiceThermal)
  //   .then(
  //     function (dataUrl) {
  //       thermalImage.src = dataUrl;
  //     }
  //   )
}
export { orders };
