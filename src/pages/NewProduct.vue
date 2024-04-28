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
      <q-btn type="submit" color="primary" label="Cadastrar produto" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const description = ref(null);
const sku = ref(null);
const manufacturer = ref(null);
const costPrice = ref(0);
const salesPrice = ref(0);
const quantityInStock = ref(0);

function onSubmit() {
  console.log(description.value);
  console.log(sku.value);
  console.log(manufacturer.value);
  console.log(costPrice.value);
  console.log(salesPrice.value);
  console.log(quantityInStock.value);
}
</script>
