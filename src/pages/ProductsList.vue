<script setup>
const columns = [
  { name: "id", field: "id", required: true, label: "Id" },
  {
    name: "description",
    field: "description",
    required: true,
    label: "Descrição",
  },
  { name: "manufacturer", field: "manufacturer", label: "Fabricante" },
  { name: "cost", field: "cost", label: "Preço de custo (R$)" },
  {
    name: "price",
    field: "price",
    required: true,
    label: "Preço de venda (R$)",
  },
  { name: "quantity", field: "quantity", label: "Quantidade em estoque" },
];
const rows = [
  {
    id: 1,
    description: "Camiseta",
    manufacturer: "Mike",
    cost: 20,
    price: 99.99,
    quantity: 100,
  },
  {
    id: 2,
    description: "Bermuda",
    manufacturer: "Guma",
    cost: 50,
    price: 120,
    quantity: 100,
  },
  {
    id: 3,
    description: "Boné",
    manufacturer: "Bering",
    cost: 10,
    price: 50,
    quantity: 200,
  },
];
</script>

<template>
  <q-table title="Produtos" :columns="columns" :rows="rows" row-key="id" />
</template>
