import { api } from 'src/boot/axios';
import { reactive } from 'vue';

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
}
async function onClickConfirm() {
  try {
    const res = await api.post(`orders`, {
      ...main.form,
      menu_items: menu.selectedList,
    })
    main.resetOrder();

    alert('go to https://kawnekhotel.bdinfotech.in to view orders');
  } catch (error) {
    console.error(error.message);
  }
}
async function getMenuItems() {
  try {
    const res = await api.get(`menu-items`);
    menu.list = res.data;
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
