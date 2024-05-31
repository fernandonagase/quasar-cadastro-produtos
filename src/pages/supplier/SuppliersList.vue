<template>
  <q-page padding>
    <CrudTable :columns="columns" :rows="suppliers">
      <template #topActions>
        <q-btn
          :to="{ name: 'new-supplier' }"
          color="primary"
          icon="add"
          label="Novo fornecedor"
        />
      </template>
    </CrudTable>
  </q-page>
</template>

<script setup>
import { useMeta, useQuasar } from "quasar";
import { onMounted, ref } from "vue";

import CrudTable from "src/components/CrudTable.vue";
import { getSuppliers } from "src/model/supplier/supplier-service";

useMeta({
  title: "Listagem de fornecedores",
});

const $q = useQuasar();

const columns = [
  {
    name: "id",
    field: "id",
    label: "Id",
    required: true,
  },
  {
    name: "name",
    field: "name",
    label: "Nome",
    required: true,
  },
];

const suppliers = ref([]);
onMounted(async () => {
  try {
    suppliers.value = await getSuppliers();
  } catch (e) {
    $q.notify({
      message: "Falha ao buscar fornecedores",
      color: "negative",
      icon: "report_problem",
    });
  }
});
</script>
