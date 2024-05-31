<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="Nome"
        :rules="[required('O nome do fornecedor é obrigatório')]"
      />
      <div>
        <q-btn label="Finalizar compra" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useMeta, useQuasar } from "quasar";
import { ref } from "vue";

import required from "src/util/validators/required";
import { addSupplier } from "src/model/supplier/supplier-service";

useMeta({
  title: "Nova compra",
});

const $q = useQuasar();

const name = ref(null);

async function onSubmit() {
  try {
    await addSupplier({ name: name.value });
    $q.notify({
      message: "Fornecedor cadastrado com sucesso",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao cadastrar fornecedor",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
