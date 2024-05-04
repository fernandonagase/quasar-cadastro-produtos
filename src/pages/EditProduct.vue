<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input v-model="description" label="Descrição" />
      <q-input v-model="sku" label="SKU/Cód. Ref." />
      <q-input v-model="manufacturer" label="Fabricante" />
      <q-input
        v-model.number="costPrice"
        label="Preço custo"
        type="number"
        prefix="R$"
        :rules="[
          (val) =>
            val >= 0 || 'O preço de custo deve ser igual ou superior a zero',
        ]"
      />
      <q-input
        v-model.number="salesPrice"
        label="Preço venda"
        type="number"
        prefix="R$"
        :rules="[
          (val) =>
            val >= 0 || 'O preço de venda deve ser igual ou superior a zero',
        ]"
      />
      <q-input
        v-model.number="quantityInStock"
        label="Qtd. Estoque"
        type="number"
      />
      <div class="q-pa-md"><q-checkbox v-model="active" label="Ativo" /></div>
      <q-btn type="submit" color="primary" label="Salvar produto" />
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();

const description = ref(null);
const sku = ref(null);
const manufacturer = ref(null);
const costPrice = ref(0);
const salesPrice = ref(0);
const quantityInStock = ref(0);
const active = ref(false);

function loadProduct() {
  api
    .get(`products/${route.params.userid}`)
    .then((response) => {
      description.value = response.data.description;
      sku.value = response.data.sku;
      manufacturer.value = response.data.manufacturer;
      costPrice.value = response.data.cost;
      salesPrice.value = response.data.price;
      quantityInStock.value = response.data.quantity;
      active.value = response.data.active;
    })
    .catch((error) => {
      $q.notify({
        message: "Erro ao carregar produto",
        color: "negative",
        icon: "report_problem",
      });
      console.error(error);
    });
}

onMounted(() => {
  loadProduct();
});

function updateProduct({
  id,
  description,
  sku,
  manufacturer,
  costPrice,
  salesPrice,
  quantityInStock,
  active,
}) {
  api
    .put(`products/${id}`, {
      id,
      description,
      sku,
      manufacturer,
      cost: costPrice,
      price: salesPrice,
      quantity: quantityInStock,
      active,
    })
    .then((response) => {
      if (response.status === 200) {
        $q.notify({
          message: "Produto salvo com sucesso!",
          color: "positive",
          icon: "done",
        });
      }
    })
    .catch(() => {
      $q.notify({
        message: "Falha ao salvar produto",
        color: "negative",
        icon: "report_problem",
      });
    });
}

function onSubmit() {
  updateProduct({
    id: route.params.userid,
    description: description.value,
    sku: sku.value,
    manufacturer: manufacturer.value,
    costPrice: costPrice.value,
    salesPrice: salesPrice.value,
    quantityInStock: quantityInStock.value,
    active: active.value,
  });
}
</script>
