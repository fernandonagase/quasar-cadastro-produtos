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
            meta: {
              breadcrumb: [{ order: 3, name: "Cadastro de produto" }],
            },
          },
          {
            path: ":userid",
            name: "product-edit",
            component: EditProduct,
            meta: {
              breadcrumb: [{ order: 3, name: "Alteração de produto" }],
            },
          },
        ],
        meta: {
          breadcrumb: [
            { order: 1, name: "Início", link: "/" },
            { order: 2, name: "Produtos", link: "/produtos" },
          ],
        },
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
