<template>
  <q-table
    :title="title"
    :columns="columns"
    :rows="rows"
    :row-key="rowKey"
    :sort-method="sortMethod"
  >
    <template #top>
      <div class="q-ml-auto">
        <slot name="topActions"></slot>
      </div>
    </template>
    <template #body-cell-actions="props">
      <q-td :props="props">
        <slot name="rowActions" :row="props.row"></slot>
      </q-td>
    </template>
    <template #bottom-row>
      <slot name="bottomRow"></slot>
    </template>
    <slot></slot>
  </q-table>
</template>

<script setup>
defineProps(["title", "columns", "rows", "rowKey", "sortMethod"]);
</script>
