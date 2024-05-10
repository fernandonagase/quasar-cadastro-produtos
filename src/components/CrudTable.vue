<template>
  <q-table :title="title" :columns="columns" :rows="rows" :row-key="rowKey">
    <template v-slot:top>
      <div class="q-ml-auto">
        <slot name="topActions"></slot>
      </div>
    </template>
    <slot></slot>
  </q-table>
</template>

<script setup>
defineProps(["title", "columns", "rows", "rowKey"]);
</script>
