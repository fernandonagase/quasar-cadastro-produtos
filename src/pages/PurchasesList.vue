<template>
  <q-page padding>
    <CrudTable :columns="columns" :rows="purchases">
      <template #topActions>
        <q-btn
          :to="{ name: 'new-purchase' }"
          label="Nova compra"
          icon="add"
          color="primary"
        />
      </template>
    </CrudTable>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMeta } from "quasar";

import CrudTable from "components/CrudTable.vue";
import { getPurchaseSummaries } from "src/model/purchase/purchase-service";

useMeta({
  title: "Listagem de compras",
});

const columns = [
  { name: "id", field: "id", label: "Id" },
  { name: "productname", field: "productname", label: "Produto" },
  { name: "productquantity", field: "productquantity", label: "Quantidade" },
  { name: "productcost", field: "productcost", label: "Custo (R$)" },
  { name: "totalcost", field: "totalcost", label: "Custo total (R$)" },
  { name: "suppliername", field: "suppliername", label: "Fornecedor" },
];

const purchases = ref([]);
onMounted(async () => {
  const purchaseData = await getPurchaseSummaries();
  purchases.value = purchaseData.map((purchase) => ({
    ...purchase,
    productcost: purchase.productcost.toFixed(2),
    totalcost: (purchase.productquantity * purchase.productcost).toFixed(2),
  }));
});
</script>
