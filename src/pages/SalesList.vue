<template>
  <q-page padding>
    <CrudTable title="Vendas" :columns="columns" :rows="sales">
      <template #bottomRow>
        <q-tr>
          <q-td colspan="3"></q-td>
          <q-td class="text-right">R$ {{ totalSales }}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { computed, onMounted, ref } from "vue";

import { getSaleSummaryList } from "src/services/saleService";
import CrudTable from "src/components/CrudTable.vue";

useMeta({
  title: "Listagem de vendas",
});

const columns = [
  { name: "id", field: "id", label: "Id", required: true },
  { name: "client", field: "client", label: "Cliente", required: true },
  { name: "date", field: "date", label: "Data", required: true },
  {
    name: "totalPrice",
    field: "totalPrice",
    label: "Preço (R$)",
    required: true,
  },
];

const sales = ref([]);
const totalSales = computed(() =>
  sales.value.reduce((acc, sale) => acc + sale.totalPrice, 0)
);

async function loadSales() {
  sales.value = await getSaleSummaryList();
}

onMounted(() => {
  loadSales();
});
</script>
