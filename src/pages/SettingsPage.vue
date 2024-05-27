<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <fieldset>
        <legend>Estoque</legend>
        <q-checkbox
          v-model="allowNegativeQuantity"
          label="Permitir quantidades negativas em estoque"
        />
      </fieldset>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { onMounted, ref } from "vue";

import { getConfig, updateConfig } from "src/services/settingService";

useMeta({
  title: "Configurações",
});

const allowNegativeQuantity = ref(true);

onMounted(async () => {
  allowNegativeQuantity.value = await getConfig(
    "stock",
    "allowNegativeQuantity"
  );
});

function onSubmit() {
  updateConfig({
    stock: { allowNegativeQuantity: allowNegativeQuantity.value },
  });
}
</script>
