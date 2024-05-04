import MainLayout from "layouts/MainLayout.vue";
import CrudLayout from "src/layouts/CrudLayout.vue";
import ProductsList from "pages/ProductsList.vue";
import NewProduct from "src/pages/NewProduct.vue";
import EditProduct from "src/pages/EditProduct.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "produtos",
        component: CrudLayout,
        children: [
          {
            path: "",
            component: ProductsList,
          },
          {
            path: "novo",
            component: NewProduct,
          },
          {
            path: ":userid",
            name: "product-edit",
            component: EditProduct,
          },
        ],
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
