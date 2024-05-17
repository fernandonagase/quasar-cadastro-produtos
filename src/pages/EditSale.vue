<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <div class="row">
        <fieldset class="col-4">
          <legend>Dados do pedido</legend>
          <q-select v-model="client" :options="clientOptions" label="Cliente" />
          <q-input
            type="datetime-local"
            v-model="date"
            label="Data"
            stack-label
          />
        </fieldset>
        <fieldset class="col">
          <legend>Itens</legend>
          <q-select
            multiple
            v-model="products"
            :options="productOptions"
            label="Produtos"
          />
        </fieldset>
      </div>
      <div class="row justify-end">
        <q-btn type="submit" color="primary">Fechar venda</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { getSaleById } from "src/services/saleService";

const route = useRoute();

const client = ref(null);
const date = ref(null);

onMounted(async () => {
  const sale = await getSaleById(route.params.saleid);
  // client.value = {
  //   label: sale.name,

  // }
  date.value = sale.date;
  console.log(sale);
});
</script>
