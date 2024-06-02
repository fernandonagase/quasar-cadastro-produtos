<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="Nome"
        :rules="[required('O nome do fornecedor é obrigatório')]"
      />
      <q-checkbox v-model="isActive" label="Ativo" />
      <div>
        <q-btn label="Salvar fornecedor" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar, useMeta } from "quasar";

import {
  getSupplierById,
  updateSupplier,
} from "src/model/supplier/supplier-service";
import required from "src/util/validators/required";

useMeta({
  title: "Alterar fornecedor",
});

const $q = useQuasar();
const route = useRoute();

const name = ref(null);
const isActive = ref(null);
onMounted(async () => {
  const supplier = await getSupplierById(route.params.supplierid);
  name.value = supplier.name;
  isActive.value = supplier.active;
});

async function onSubmit() {
  try {
    await updateSupplier({
      id: route.params.supplierid,
      name: name.value,
      active: isActive.value,
    });
    $q.notify({
      message: "Fornecedor alterado com sucesso!",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao alterar fornecedor",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
