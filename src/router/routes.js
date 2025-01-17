const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("pages/MenuPage.vue"),
        meta: {
          title: "Menu",
        },
      },
      {
        name: "orders",
        path: "orders",
        component: () => import("src/pages/orders/OrderPage.vue"),
        meta: {
          title: "Orders",
        },
      },
      {
        name: "edit-order",
        path: "orders/:id/edit",
        component: () => import("src/pages/orders/EditOrderPage.vue"),
        meta: {
          title: "Menu",
        },
      },
      {
        name: "order-detail",
        path: "orders/:id",
        component: () => import("src/pages/orders/OrderDetailPage.vue"),
        meta: {
          title: "Order",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: {
      title: "",
    },
  },
];

export default routes;
