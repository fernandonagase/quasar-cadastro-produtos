<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink>
          <q-btn to="/" flat="">Header</q-btn>
        </q-toolbar-title>

        <q-btn :to="{ name: 'sales' }" flat>Vendas</q-btn>
        <q-btn :to="{ name: 'purchases' }" flat>Compras</q-btn>
      </q-toolbar>
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <q-item clickable to="/">
            <q-item-section>Início</q-item-section>
          </q-item>
          <q-item clickable to="/configuracoes">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>Configurações</q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Cadastros</q-item-label>
          <q-item clickable to="/produtos">
            <q-item-section>Produtos</q-item-section>
          </q-item>
          <q-item clickable to="/clientes">
            <q-item-section>Clientes</q-item-section>
          </q-item>
          <q-item clickable :to="{ name: 'suppliers' }">
            <q-item-section>Fornecedores</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  // name: 'LayoutName',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
