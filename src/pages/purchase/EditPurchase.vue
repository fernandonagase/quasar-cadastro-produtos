<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input type="datetime-local" v-model="date" label="Data" stack-label />
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
        <q-btn type="submit" color="primary" label="Salvar compra" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

import {
  getPurchaseDetails,
  updatePurchase,
} from "src/model/purchase/purchase-service";
import { getProductsData } from "src/services/productService";
import { getSuppliersForSelect } from "src/model/supplier/supplier-service";

const $q = useQuasar();
const route = useRoute();

const date = ref(null);
const product = ref(null);
const productOptions = ref([]);
const supplierOptions = ref([]);
const supplier = ref(null);
const productQuantity = ref(null);
const productCost = ref(null);

onMounted(async () => {
  const purchase = await getPurchaseDetails(route.params.purchaseid);
  date.value = purchase.purchasedate;
  productQuantity.value = purchase.productquantity;
  productCost.value = purchase.productcost;

  const products = (await getProductsData()).map((product) => ({
    label: product.description,
    value: product.id,
  }));
  productOptions.value = products;

  product.value = products.find((p) => p.value === purchase.productid);

  const suppliers = (await getSuppliersForSelect()).map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  }));
  supplierOptions.value = suppliers;

  supplier.value = suppliers.find((s) => s.value === purchase.supplierid);
});

async function onSubmit() {
  try {
    await updatePurchase({
      id: route.params.purchaseid,
      supplierid: supplier.value.value,
      productid: product.value.value,
      productquantity: productQuantity.value,
      productcost: productCost.value,
      purchasedate: date.value,
    });
    $q.notify({
      message: "Compra atualizada com sucesso!",
      color: "positive",
      icon: "done",
    });
  } catch (e) {
    $q.notify({
      message: "Falha ao atualizar dados da compra",
      color: "negative",
      icon: "report_problem",
    });
  }
}
</script>
