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
          <ProductSelector
            :products="products"
            :options="productOptions"
            @add-product="onAddProduct"
            @remove-product="onRemoveProduct"
          />
        </fieldset>
      </div>
      <div class="row justify-end">
        <q-btn type="submit" color="primary">Salvar venda</q-btn>
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
import ProductSelector from "src/components/ProductSelector.vue";

const route = useRoute();

const clientOptions = ref(null);
const client = ref(null);
const productOptions = ref(null);
const products = ref([]);
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
  const currentProducts = productsData
    .filter((product) => sale.items.map((item) => item.id).includes(product.id))
    .map((product) => {
      const currentItem = sale.items.find((item) => item.id === product.id);
      return {
        id: product.id,
        description: product.description,
        quantity: currentItem.quantity,
        unitprice: currentItem.price,
        totalprice: currentItem.quantity * currentItem.price,
      };
    });
  products.value = currentProducts;
});

function onAddProduct(id, description, quantity, unitprice) {
  products.value = [
    ...products.value,
    {
      id,
      description,
      quantity,
      unitprice,
      totalprice: quantity * unitprice,
    },
  ];
}

function onRemoveProduct(id) {
  products.value = products.value.filter((product) => product.id !== id);
}

function onSubmit() {
  updateSale({
    id: route.params.saleid,
    date: date.value,
    clientid: client.value.value,
    items: products.value.map((product) => ({
      id: product.id,
      price: product.unitprice,
      quantity: product.quantity,
    })),
  });
}
</script>
