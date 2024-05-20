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
          <ProductSelector />
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

import { getProductsData } from "src/services/productService";
import { getClientsForSales } from "src/services/clientService";
import dayjs from "dayjs";
import { postSale } from "src/services/saleService";
import ProductSelector from "src/components/ProductSelector.vue";

const client = ref(null);
const clientOptions = ref(null);
const date = ref(dayjs().format("YYYY-MM-DDTHH:mm"));
const products = ref(null);
const productOptions = ref(null);

onMounted(async () => {
  const clientsData = await getClientsForSales();
  clientOptions.value = clientsData.map((client) => ({
    label: client.name,
    value: client.id,
  }));
  const productsData = await getProductsData();
  productOptions.value = productsData.map((product) => ({
    label: product.description,
    value: product.id,
    price: product.price,
  }));
});

function onSubmit() {
  postSale({
    clientid: client.value.value,
    date: dayjs(date.value).toISOString(),
    items: products.value.map((product) => ({
      id: product.value,
      price: product.price,
      quantity: 1,
    })),
  });
}
</script>
