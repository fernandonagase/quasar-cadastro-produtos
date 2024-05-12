<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="Nome completo"
        :rules="[(value) => !!value || 'O nome completo é obrigatório']"
      />
      <q-input v-model="phone" label="Telefone" />
      <div class="q-pa-md"><q-checkbox v-model="isActive" label="Ativo" /></div>
      <q-btn type="submit" color="primary" label="Salvar cliente" />
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

import { getClientById, updateClient } from "src/services/clientService";

const $q = useQuasar();
const route = useRoute();

const name = ref(null);
const phone = ref(null);
const isActive = ref(false);

async function loadClient(id) {
  try {
    const client = await getClientById(id);
    name.value = client.name;
    phone.value = client.phone;
    isActive.value = client.active;
  } catch (e) {
    $q.notify({
      message: "Erro ao carregar cliente",
      color: "negative",
      icon: "report_problem",
    });
  }
}

onMounted(() => {
  loadClient(route.params.clientid);
});

async function onSubmit() {
  try {
    await updateClient({
      id: route.params.clientid,
      name: name.value,
      phone: phone.value,
      active: isActive.value,
    });
    $q.notify({
      message: "Cliente salvo com sucesso!",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao salvar cliente",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
