<template>
  <q-page padding>
    <CrudTable title="Clientes" :columns="columns" :rows="clients">
      <template #topActions>
        <q-btn to="/clientes/novo" color="primary" icon="add">
          Novo <VisuallyHidden>produto</VisuallyHidden>
        </q-btn>
      </template>
      <template #rowActions="{ row }">
        <q-btn
          :to="{ name: 'client-edit', params: { clientid: row.id } }"
          color="primary"
          icon="edit"
          :aria-labelledby="`edit-label-${row.id}`"
        >
          <span :id="`edit-label-${row.id}`" hidden>
            Ver ou alterar {{ row.name }}
          </span>
        </q-btn>
      </template>
    </CrudTable>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMeta, useQuasar } from "quasar";

import CrudTable from "components/CrudTable.vue";
import { getClients } from "src/services/clientService";
import VisuallyHidden from "src/components/VisuallyHidden.vue";

useMeta({
  title: "Listagem de clientes",
});

const $q = useQuasar();
const clients = ref([]);

async function loadClients() {
  try {
    clients.value = (await getClients()).filter((product) => product.active);
  } catch (e) {
    $q.notify({
      message: "Falha ao carregar lista de clientes",
      color: "negative",
      icon: "report_problem",
    });
  }
}

onMounted(() => {
  loadClients();
});

const columns = [
  { name: "id", field: "id", required: true, label: "Id" },
  {
    name: "name",
    field: "name",
    required: true,
    label: "Nome completo",
  },
  { name: "phone", field: "phone", label: "Telefone" },
  { name: "actions", label: "Ações" },
];
</script>
