<template>
  <q-page padding>
    <CrudTable
      title="Vendas"
      :columns="columns"
      :rows="rows"
      :sortMethod="customSort"
    >
      <template #topActions>
        <q-btn :to="{ name: 'new-sale' }" color="primary" icon="add">
          Nova venda
        </q-btn>
      </template>
      <template #rowActions="{ row }">
        <q-btn
          :to="{ name: 'edit-sale', params: { saleid: row.id } }"
          color="primary"
          icon="edit"
          :aria-labelledby="`edit-label-${row.id}`"
        >
          <span :id="`edit-label-${row.id}`" hidden>
            Ver ou alterar compra de {{ row.client }} em {{ row.date }}
          </span>
        </q-btn>
        <q-btn color="secondary" icon="more_vert">
          <q-menu>
            <q-list bordered>
              <q-item clickable v-ripple @click="showDeactivationDialog">
                <q-item-section avatar>
                  <q-icon name="delete_forever" color="negative" />
                </q-item-section>
                <q-item-section>Cancelar venda</q-item-section>
                <q-dialog v-model="confirmDeactivation" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <q-avatar
                        icon="delete_forever"
                        color="negative"
                        text-color="white"
                      />
                      <span class="q-ml-sm">
                        Você tem certeza de que quer cancelar a venda?
                      </span>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Voltar"
                        color="secondary"
                        v-close-popup
                      />
                      <q-btn
                        flat
                        label="Cancelar venda"
                        color="negative"
                        @click="onCancelSale(row.id)"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-item>
            </q-list>
          </q-menu>
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
import { useMeta, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { cancelSale, getSaleSummaryList } from "src/services/saleService";
import CrudTable from "src/components/CrudTable.vue";

dayjs.extend(customParseFormat);

useMeta({
  title: "Listagem de vendas",
});

const $q = useQuasar();
const confirmDeactivation = ref(false);

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
  {
    name: "actions",
    label: "Ações",
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
const rows = computed(() => {
  return sales.value.filter((sale) => sale.status === "Ativo");
});
const totalSales = computed(() =>
  rows.value.reduce((acc, sale) => acc + sale.totalPrice, 0)
);

async function loadSales() {
  sales.value = await getSaleSummaryList();
}

onMounted(() => {
  loadSales();
});

function showDeactivationDialog(id) {
  confirmDeactivation.value = true;
}

async function onCancelSale(id) {
  try {
    await cancelSale(id);
    sales.value = sales.value.map((sale) =>
      sale.id === id ? { ...sale, status: "Cancelado" } : sale
    );
  } catch (e) {
    $q.notify({
      message: "Falha ao cancelar venda",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
