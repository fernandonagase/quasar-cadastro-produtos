<template>
  <div>
    <q-select v-model="product" :options="options" label="Produto" />
    <q-input v-model.number="quantity" type="number" label="Quantidade" />
    <q-input v-model.number="unitprice" type="number" label="Preço Unit." />
    <q-input
      v-model.number="totalprice"
      type="number"
      label="Preço total"
      readonly
    />
    <q-btn color="primary" icon="add" @click="onAddProduct">
      <VisuallyHidden>Adicionar produto</VisuallyHidden>
    </q-btn>
  </div>
  <q-markup-table>
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Preço unitário</th>
        <th>Preço total</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.description }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.unitprice }}</td>
        <td>{{ product.totalprice }}</td>
        <td>
          <q-btn
            color="negative"
            icon="clear"
            @click="onRemoveProduct(product.id)"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td>{{ saleTotalPrice }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { computed, ref } from "vue";
import VisuallyHidden from "./VisuallyHidden.vue";

const props = defineProps(["products", "options"]);
const emit = defineEmits(["addProduct", "removeProduct"]);

const product = ref(null);
const quantity = ref(0);
const unitprice = ref(0);
const totalprice = computed(() => quantity.value * unitprice.value);

const saleTotalPrice = computed(() =>
  props.products.reduce((acc, product) => acc + product.totalprice, 0)
);

function resetForm() {
  product.value = null;
  quantity.value = 0;
  unitprice.value = 0;
}

function onAddProduct() {
  emit(
    "addProduct",
    product.value.value,
    product.value.label,
    quantity.value,
    unitprice.value
  );
  resetForm();
}

function onRemoveProduct(id) {
  emit("removeProduct", id);
}
</script>
