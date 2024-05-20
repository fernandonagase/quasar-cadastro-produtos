<template>
  <div>
    <q-select v-model="model" :options="options" label="Produto" />
    <q-input v-model.number="quantity" type="number" label="Quantidade" />
    <q-input v-model.number="unitprice" type="number" label="Preço Unit." />
    <q-input
      v-model.number="totalprice"
      type="number"
      label="Preço total"
      readonly
    />
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
          <q-btn color="negative" icon="clear" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { computed, ref } from "vue";

const products = ref(null);
products.value = [
  {
    id: 1,
    description: "Jujuba louca",
    quantity: 15,
    unitprice: 2,
    totalprice: 30,
  },
];

const quantity = ref(10);
const unitprice = ref(10);
const totalprice = computed(() => quantity.value * unitprice.value);
</script>
