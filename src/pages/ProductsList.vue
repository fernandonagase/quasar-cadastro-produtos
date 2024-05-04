<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

import VisuallyHidden from "src/components/VisuallyHidden.vue";

const $q = useQuasar();
const products = ref([]);

function loadProducts() {
  api
    .get("/products")
    .then((response) => {
      products.value = response.data.filter((product) => product.active);
    })
    .catch(() => {
      $q.notify({
        message: "Falha ao carregar lista de produtos",
        color: "negative",
        icon: "report_problem",
      });
    });
}

onMounted(() => {
  loadProducts();
});

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
  { name: "actions", label: "Ações" },
];
</script>

<template>
  <q-table title="Produtos" :columns="columns" :rows="products" row-key="id">
    <template v-slot:top>
      <div class="q-ml-auto">
        <q-btn to="/produtos/novo" color="primary" icon="add">
          Novo <VisuallyHidden>produto</VisuallyHidden>
        </q-btn>
      </div>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          :to="{ name: 'product-edit', params: { userid: props.row.id } }"
          color="primary"
          icon="edit"
          :aria-labelledby="`edit-label-${props.row.id}`"
        >
          <span :id="`edit-label-${props.row.id}`" hidden>
            Ver ou alterar {{ props.row.description }}
          </span>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>
