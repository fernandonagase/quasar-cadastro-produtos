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

import { getSaleById, updateSale } from "src/services/saleService";
import { getClientsForSales } from "src/services/clientService";
import { getProductsData } from "src/services/productService";

const route = useRoute();

const clientOptions = ref(null);
const client = ref(null);
const productOptions = ref(null);
const products = ref(null);
const date = ref(null);

onMounted(async () => {
  const sale = await getSaleById(route.params.saleid);
  date.value = sale.date;

  const clientsData = await getClientsForSales();
  clientOptions.value = clientsData.map((client) => ({
    label: client.name,
    value: client.id,
  }));

  const currentUser = clientsData.find((cli) => cli.id === sale.clientid);
  client.value = {
    label: currentUser.name,
    value: currentUser.id,
  };

  const productsData = await getProductsData();
  productOptions.value = productsData.map((product) => ({
    label: product.description,
    value: product.id,
    price: product.price,
  }));
  const currentProducts = productsData.filter((product) =>
    sale.items.map((item) => item.id).includes(product.id)
  );
  products.value = currentProducts.map((product) => ({
    label: product.description,
    value: product.id,
    price: product.price,
  }));
});

function onSubmit() {
  updateSale({
    id: route.params.saleid,
    date: date.value,
    clientid: client.value.value,
    items: products.value.map((product) => ({
      id: product.value,
      price: product.price,
      quantity: 1,
    })),
  });
}
</script>
