<template>
  <q-page padding>
    <CrudTable title="Clientes" :columns="columns" :rows="products"></CrudTable>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMeta, useQuasar } from "quasar";

import CrudTable from "components/CrudTable.vue";
import { getClients } from "src/services/clientService";

useMeta({
  title: "Listagem de clientes",
});

const $q = useQuasar();
const products = ref([]);

async function loadProducts() {
  try {
    const clients = await getClients();
    products.value = clients.filter((product) => product.active);
  } catch (e) {
    $q.notify({
      message: "Falha ao carregar lista de produtos",
      color: "negative",
      icon: "report_problem",
    });
  }
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
  { name: "actions", label: "Ações" },
];
</script>
