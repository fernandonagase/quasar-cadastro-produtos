<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-select v-model="product" :options="productOptions" label="Produto" />
      <q-select
        v-model="supplier"
        :options="supplierOptions"
        label="Fornecedor"
      />
      <q-input
        v-model.number="productQuantity"
        type="number"
        label="Quantidade"
      />
      <q-input
        v-model.number="productCost"
        type="number"
        label="Preço de custo"
      />
      <div>
        <q-btn type="submit" color="primary" label="Finalizar compra" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMeta, useQuasar } from "quasar";

import { getProductsData } from "src/services/productService";
import { getSuppliersData } from "src/model/supplier/supplier-service";
import { newPurchase } from "src/model/purchase/purchase-service";

useMeta({
  title: "Nova compra",
});

const productOptions = ref([]);
const supplierOptions = ref([]);

onMounted(async () => {
  const products = await getProductsData();
  productOptions.value = products.map((product) => ({
    label: product.description,
    value: product.id,
  }));

  const suppliers = await getSuppliersData();
  supplierOptions.value = suppliers.map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  }));
});

const product = ref(null);
const productQuantity = ref(null);
const productCost = ref(null);
const supplier = ref(null);

const $q = useQuasar();

async function onSubmit() {
  try {
    await newPurchase({
      productid: product.value.value,
      productquantity: productQuantity.value,
      productcost: productCost.value,
      supplierid: supplier.value.value,
    });
    $q.notify({
      message: "Compra concluída com sucesso!",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao concluir compra",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
