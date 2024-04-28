<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();
const products = ref([]);

function loadProducts() {
  api
    .get("/products")
    .then((response) => {
      products.value = response.data;
    })
    .catch(() => {
      $q.notify({
        message: "Falha ao carregar lista de produtos",
        color: "negative",
        icon: "report_problem",
      });
    });
}

onMounted(() => {
  loadProducts();
});

const columns = [
  { name: "id", field: "id", required: true, label: "Id" },
  {
    name: "description",
    field: "description",
    required: true,
    label: "Descrição",
  },
  { name: "manufacturer", field: "manufacturer", label: "Fabricante" },
  { name: "cost", field: "cost", label: "Preço de custo (R$)" },
  {
    name: "price",
    field: "price",
    required: true,
    label: "Preço de venda (R$)",
  },
  { name: "quantity", field: "quantity", label: "Quantidade em estoque" },
];
</script>

<template>
  <q-table title="Produtos" :columns="columns" :rows="products" row-key="id" />
</template>
