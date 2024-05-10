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
import { useMeta, useQuasar } from "quasar";
import { nanoid } from "nanoid";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

useMeta({
  title: "Cadastro de produto",
});

const $q = useQuasar();
const router = useRouter();

const description = ref(null);
const sku = ref(null);
const manufacturer = ref(null);
const costPrice = ref(0);
const salesPrice = ref(0);
const quantityInStock = ref(0);

function postProduct({
  description,
  sku,
  manufacturer,
  costPrice,
  salesPrice,
  quantityInStock,
}) {
  const id = nanoid();
  api
    .post("/products", {
      id,
      description,
      sku,
      manufacturer,
      cost: costPrice,
      price: salesPrice,
      quantity: quantityInStock,
      active: true,
    })
    .then((response) => {
      if (response.status === 201) {
        $q.notify({
          message: "Produto cadastrado com sucesso! Redirecionando...",
          color: "positive",
          icon: "done",
        });
        setTimeout(() => {
          router.push({
            path: "/produtos",
            replace: true,
          });
        }, 5000);
      }
    })
    .catch(() => {
      $q.notify({
        message: "Falha ao cadastrar produto",
        color: "negative",
        icon: "report_problem",
      });
    });
}

function onSubmit() {
  postProduct({
    description: description.value,
    sku: sku.value,
    manufacturer: manufacturer.value,
    costPrice: costPrice.value,
    salesPrice: salesPrice.value,
    quantityInStock: quantityInStock.value,
  });
}
</script>
