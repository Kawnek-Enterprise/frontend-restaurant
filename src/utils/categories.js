import { api } from "src/boot/axios";
import { menu } from "src/pages/main";
import { reactive } from "vue";

const categories = reactive({
  data: {},
  selectedCategories: {},
  getCategories,
  onClickScrollCategory,
  onClickCategory,
});
export { categories };

async function getCategories(props) {
  try {
    const pagination = props?.pagination ?? {};
    const res = await api.get("categories", {
      params: {
        ...pagination,
      },
    });
    categories.data = res.data;
  } catch (error) {
    $q.notify(error.response?.data?.message ?? error.message);
    console.error(error.message);
  }
}

function onClickScrollCategory($refs, right) {
  const data = $refs.categoryScroll.getScrollPosition();
  let offset;
  if (right) offset = data.left + 100;
  if (!right) offset = data.left - 100;
  $refs.categoryScroll.setScrollPosition("horizontal", offset, 300);
}

function onMouseWheelCategory() {
  //
}

function onClickCategory(id, selected) {
  categories.selectedCategories[id] = selected;
  const categoryIds = [];
  for (let key in categories.selectedCategories) {
    if (categories.selectedCategories[key]) {
      categoryIds.push(parseInt(key));
    }
  }
  menu.filteredMenuItemList = menu.filterMenuItems(
    menu.list,
    menu.filter,
    categoryIds
  );
}
