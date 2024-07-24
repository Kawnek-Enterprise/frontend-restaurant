import { api } from "src/boot/axios";
import { reactive } from "vue";

const orders = reactive({
  list: [],
  data: {},
  detail: {
    menu_items: [],
  },
  pagination: {
    rowsPerPage: 5,
    rowsNumber: 0
  },
  getOrders,
  getDetail,
})

async function getOrders(props) {
  if (!props) {
    props = {
      pagination: orders.pagination,
    }
  } else {
    orders.pagination = props.pagination;
  }
  try {
    const res = await api.get(`orders`, {
      params: {
        ...orders.pagination,
      }
    })
    orders.pagination.rowsNumber = res.data?.total ?? 0;
    orders.list = res.data?.data ?? res.data;
    orders.data = res.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function getDetail() {
  try {
    const res = await api.get(`orders/${$route.params.id}`)
    orders.detail = res.data;
  } catch (error) {
    console.error(error.message);
  }
}

export {
  orders
}
