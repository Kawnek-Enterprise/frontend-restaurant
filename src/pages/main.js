import { api } from "src/boot/axios";
import { reactive } from "vue";
import { orders } from "./orders/orders";
import { serverUrl } from "src/boot/main";
import { categories } from "src/utils/categories";

const main = reactive({
  openOrderDialog: false,
  openInfoDialog: false,
  loadingSubmitOrder: false,
  grid: true,
  form: {
    dining_table_id: null,
    name: undefined,
  },
  onClickConfirm,
  resetOrder,
  toggleViewLayout,
});

const menu = reactive({
  loadingItems: false,
  filter: "",
  list: [],
  filteredMenuItemList: [],
  selectedList: [],
  getMenuItems,
  setSelectedList,
  filterMenuItems,
});
const diningTable = reactive({
  list: [],
  getDiningTables,
});
function resetOrder() {
  menu.list.forEach((val) => (val.quantity = undefined));
  menu.selectedList = [];
  main.form.dining_table_id = null;
  main.form.name = undefined;
  main.openInfoDialog = false;
  main.openOrderDialog = false;
  orders.detail = {
    id: undefined,
    name: undefined,
    dining_table_id: undefined,
    room_id: undefined,
    menu_item_orders: [],
  };
}
async function onClickConfirm() {
  try {
    main.loadingSubmitOrder = true;
    const res = await api.post(
      `orders${$route.params.id ? `/${$route.params.id}` : ""}`,
      {
        ...main.form,
        _method: $route.params?.id ? "patch" : "post",
        menu_item_orders: menu.selectedList,
      }
    );
    main.resetOrder();
    $router.push("/orders");
    main.loadingSubmitOrder = false;
  } catch (error) {
    main.loadingSubmitOrder = false;
    $q.notify({
      message: error.response?.data?.message ?? error.message,
      position: "top",
    });
    console.error(error.message);
  }
}
async function getMenuItems() {
  try {
    menu.loadingItems = true;
    let endpoint = `menu-items`;
    if ($route.params?.id && $route.name == "edit-order") {
      // orders.getDetail();
      const res = await api.get(`orders/${$route.params.id}`);
      orders.detail = res.data;
      main.form.dining_table_id = res.data.dining_table_id;
      main.form.name = res.data.name;
    }
    const res = await api.get(`menu-items`);
    menu.list = res.data;
    menu.list.forEach((menuItem, menuItemIndex) => {
      if (orders.detail?.menu_item_orders?.constructor === Array) {
        const orderItemIndex = orders.detail.menu_item_orders.findIndex(
          (orderItem) => orderItem.menu_item_id == menuItem.id
        );
        if (orderItemIndex > -1) {
          menu.list[menuItemIndex]["quantity"] = parseInt(
            orders.detail.menu_item_orders[orderItemIndex].quantity
          );
        }
      }
    });
    menu.filteredMenuItemList = filterMenuItems(menu.list);
    menu.loadingItems = false;
  } catch (error) {
    menu.loadingItems = false;
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
  menu.selectedList = menu.list.filter((val) => val.quantity > 0);
  if (menu.selectedList?.length == 0) {
    $q.notify({
      message: "Please add menu items",
      position: "top-right",
    });
  }
}

function filterMenuItems(items, searchValue, categoryIds) {
  let itemsAfterCategoryFilter = items;
  if (categoryIds?.length > 0) {
    itemsAfterCategoryFilter = items.filter((item) => {
      return categoryIds.includes(item.category_id);
    });
  }

  if (!searchValue || searchValue.trim() === "") {
    return itemsAfterCategoryFilter;
  }
  const searchTerm = searchValue.toLowerCase().trim();

  return itemsAfterCategoryFilter.filter((item) => {
    // Search in multiple fields
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.full_name.toLowerCase().includes(searchTerm) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm)) ||
      item.price.toString().includes(searchTerm)
    );
  });
}

function toggleViewLayout() {
  if (main.grid) {
    localStorage.setItem("item-layout", "list");
  } else {
    localStorage.removeItem("item-layout");
  }
  main.grid = !main.grid;
}
export { menu, main, diningTable };
