const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/MenuPage.vue')
      },
      {
        path: 'orders',
        component: () => import('src/pages/orders/OrderPage.vue')
      },
      {
        name: 'edit-order',
        path: 'update-order/:id',
        component: () => import('src/pages/orders/EditOrderPage.vue')
      },
      {
        name: 'order-detail',
        path: 'orders/:id',
        component: () => import('src/pages/orders/OrderDetailPage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
