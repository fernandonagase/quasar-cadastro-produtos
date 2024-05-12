<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="Nome completo"
        :rules="[(value) => !!value || 'O nome completo é obrigatório']"
      />
      <q-input v-model="phone" label="Telefone" />
      <q-btn type="submit" color="primary" label="Cadastrar cliente" />
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { postClient } from "src/services/clientService";
import { ref } from "vue";

const $q = useQuasar();

const name = ref(null);
const phone = ref(null);

async function onSubmit() {
  try {
    await postClient({
      name: name.value,
      phone: phone.value,
    });
    $q.notify({
      message: "Cliente cadastrado com sucesso",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao cadastrar cliente",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
