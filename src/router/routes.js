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
      {
        path: "clientes",
        component: CrudLayout,
        children: [
          {
            path: "",
            component: () => import("pages/ClientsList.vue"),
          },
          {
            path: "novo",
            component: () => import("pages/NewClient.vue"),
            meta: {
              breadcrumb: [{ order: 3, name: "Cadastro de cliente" }],
            },
          },
          {
            path: ":clientid",
            name: "client-edit",
            component: () => import("pages/EditClient.vue"),
            meta: {
              breadcrumb: [{ order: 3, name: "Alteração de cliente" }],
            },
          },
        ],
        meta: {
          breadcrumb: [
            { order: 1, name: "Início", link: "/" },
            { order: 2, name: "Clientes", link: "/clientes" },
          ],
        },
      },
      {
        path: "vendas",
        children: [
          {
            path: "",
            name: "sales",
            component: () => import("pages/SalesList.vue"),
          },
          {
            path: "nova",
            name: "new-sale",
            component: () => import("pages/NewSale.vue"),
          },
          {
            path: ":saleid",
            name: "edit-sale",
            component: () => import("pages/EditSale.vue"),
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
