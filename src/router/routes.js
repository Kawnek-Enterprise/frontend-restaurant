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
          icon: 'widgets',
        },
      },
      {
        name: "orders",
        path: "orders",
        component: () => import("src/pages/orders/OrderPage.vue"),
        meta: {
          title: "Orders",
          icon: 'receipt_long',
        },
      },
      {
        name: "edit-order",
        path: "orders/:id/edit",
        component: () => import("src/pages/orders/EditOrderPage.vue"),
        meta: {
          parents: [{
            name: 'orders',
            title: 'Orders',
            icon: 'receipt_long'
          }],
          title: "Menu",
        },
      },
      {
        name: "order-detail",
        path: "orders/:id",
        component: () => import("src/pages/orders/OrderDetailPage.vue"),
        meta: {
          parents: [{
            name: 'orders',
            title: 'Orders',
            icon: 'receipt_long'
          }],
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
