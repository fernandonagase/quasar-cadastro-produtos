<template>
  <header>
    <h1 class="text-h3">Hello</h1>
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="step in breadcrumb"
        :label="step.name"
        :to="step.link"
        :key="step.order"
      />
    </q-breadcrumbs>
  </header>
  <router-view />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumb = computed(() =>
  route.matched
    .filter((matchedRoute) => matchedRoute.meta.breadcrumb)
    .reduce(
      (acc, matchedRoute) => [...acc, ...matchedRoute.meta.breadcrumb],
      []
    )
);
</script>
