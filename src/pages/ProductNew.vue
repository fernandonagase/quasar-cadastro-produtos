<script setup>
const columns = [
  { name: "id", field: "id", required: true, label: "Id" },
  {
    name: "description",
    field: "description",
    required: true,
    label: "Descrição",
  },
  { name: "price", field: "price", required: true, label: "Preço" },
];
const rows = [
  { id: 1, description: "Camiseta", price: 99.99 },
  { id: 2, description: "Bermuda", price: 120 },
  { id: 3, description: "Boné", price: 50 },
];
</script>

<template>
  <header>
    <h1 class="text-h3">Hello</h1>
    <div class="row justify-between items-center">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Início" to="/" />
        <q-breadcrumbs-el label="Produtos" />
      </q-breadcrumbs>
      <div><q-btn color="primary" icon-right="add" label="Novo" /></div>
    </div>
  </header>
  <q-table title="Produtos" :columns="columns" :rows="rows" row-key="id" />
</template>
