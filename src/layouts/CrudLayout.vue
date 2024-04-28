<template>
  <header>
    <h1 class="text-h3">Hello</h1>
    <div class="row justify-between items-center">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Início" to="/" />
        <q-breadcrumbs-el label="Produtos" />
      </q-breadcrumbs>
      <div>
        <q-btn
          to="produtos/novo"
          color="primary"
          icon-right="add"
          label="Novo"
        />
      </div>
    </div>
  </header>
  <router-view />
</template>
