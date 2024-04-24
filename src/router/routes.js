import MainLayout from "layouts/MainLayout.vue";
import ProductNew from "pages/ProductNew.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "produtos",
        component: ProductNew,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
