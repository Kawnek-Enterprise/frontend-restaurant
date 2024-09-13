import { api } from 'src/boot/axios';
import { reactive } from 'vue';
import { orders } from './orders/orders';
import { serverUrl } from 'src/boot/main';

const main = reactive({
  openOrderDialog: false,
  openInfoDialog: false,
  form: {
    dining_table_id: null,
    name: undefined,
  },
  onClickConfirm,
  resetOrder,
})

const menu = reactive({
  filter: '',
  list: [],
  selectedList: [],
  getMenuItems,
  setSelectedList,
})
const diningTable = reactive({
  list: [],
  getDiningTables,
})
function resetOrder() {
  menu.list.forEach(val => val.quantity = undefined)
  menu.selectedList = [];
  main.form.dining_table_id = null
  main.form.name = undefined;
  main.openInfoDialog = false;
  main.openOrderDialog = false;
  orders.detail = {
    id: undefined,
    name: undefined,
    dining_table_id: undefined,
    room_id: undefined,
    menu_items: [],
  };
}
async function onClickConfirm() {
  try {
    const res = await api.post(`orders${$route.params.id ? `/${$route.params.id}` : ''}`, {
      ...main.form,
      _method: $route.params?.id ? 'patch' : 'post',
      menu_items: menu.selectedList,
    })
    main.resetOrder();
    $q.notify(`go to ${serverUrl} to view orders`)
    $router.push('/orders')
  } catch (error) {
    console.error(error.message);
  }
}
async function getMenuItems() {
  try {
    let endpoint = `menu-items`
    if ($route.params?.id) {
      const res = await api.get(`orders/${$route.params.id}`);
      orders.detail = res.data;

      main.form.dining_table_id = res.data.dining_table_id
      main.form.name = res.data.name
    }
    const res = await api.get(`menu-items`);
    menu.list = res.data;
    menu.list.forEach((menuItem, menuItemIndex) => {
      if (orders.detail?.menu_items?.constructor === Array) {
        const orderItemIndex = orders.detail.menu_items.findIndex(
          orderItem =>
            orderItem.id == menuItem.id
        )
        if (orderItemIndex > -1) {
          menu.list[menuItemIndex]['quantity'] = parseInt(orders.detail.menu_items[orderItemIndex].quantity)
        }
      }
    });
  } catch (error) {
    console.error(error.message);

  }
}

async function getDiningTables() {
  try {
    const res = await api.get(`dining-tables`);
    diningTable.list = res.data;
  } catch (error) {
    console.error(error.message);

  }
}

function setSelectedList() {
  menu.selectedList = [];
  menu.selectedList =
    menu.list.filter(
      val => val.quantity > 0
    )
  if (menu.selectedList?.length == 0) {
    alert('Select atleast one menu item')
  }
}
export {
  menu,
  main,
  diningTable,
}
