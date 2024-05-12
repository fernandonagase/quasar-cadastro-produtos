<template>
  <q-page padding>
    <CrudTable title="Vendas" :columns="columns" :rows="saleRows"></CrudTable>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { computed, onMounted, ref } from "vue";

import { getSales } from "src/services/saleService";
import CrudTable from "src/components/CrudTable.vue";

useMeta({
  title: "Listagem de vendas",
});

const columns = [
  { name: "id", field: "id", label: "Id", required: true },
  { name: "date", field: "date", label: "Data", required: true },
  {
    name: "totalPrice",
    field: "totalPrice",
    label: "Preço (R$)",
    required: true,
  },
];

const sales = ref([]);
const saleRows = computed(() => {
  return sales.value.map((sale) => ({
    id: sale.id,
    date: new Date(sale.date).toLocaleDateString(),
    totalPrice: sale.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    ),
  }));
});

async function loadSales() {
  sales.value = await getSales();
}

onMounted(() => {
  loadSales();
});
</script>
