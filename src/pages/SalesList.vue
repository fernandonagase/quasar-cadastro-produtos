<template>
  <q-page padding>
    <CrudTable
      title="Vendas"
      :columns="columns"
      :rows="sales"
      :sortMethod="customSort"
    >
      <template #topActions>
        <q-btn :to="{ name: 'new-sale' }" color="primary" icon="add">
          Nova venda
        </q-btn>
      </template>
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { getSaleSummaryList } from "src/services/saleService";
import CrudTable from "src/components/CrudTable.vue";

dayjs.extend(customParseFormat);

useMeta({
  title: "Listagem de vendas",
});

const columns = [
  { name: "id", field: "id", label: "Id", required: true },
  { name: "client", field: "client", label: "Cliente", required: true },
  {
    name: "date",
    field: "date",
    label: "Data",
    required: true,
    sortable: true,
  },
  {
    name: "totalPrice",
    field: "totalPrice",
    label: "Preço (R$)",
    required: true,
    sortable: true,
  },
];

function customSort(rows, sortBy, descending) {
  const data = [...rows];

  if (sortBy) {
    data.sort((a, b) => {
      const x = descending ? b : a;
      const y = descending ? a : b;

      if (sortBy === "totalPrice") {
        return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
      } else if (sortBy === "date") {
        return (
          dayjs(x[sortBy], "DD/MM/YYYY HH:mm:ss").valueOf() -
          dayjs(y[sortBy], "DD/MM/YYYY HH:mm:ss").valueOf()
        );
      } else {
        return x[sortBy].localeCompare(y[sortBy]);
      }
    });
  }

  return data;
}

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
