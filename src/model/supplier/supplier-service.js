import { nanoid } from "nanoid";

import { api } from "boot/axios";

const endpoint = "suppliers";

async function addSupplier({ name }) {
  const resp = await api.post(endpoint, {
    id: nanoid(),
    name,
    active: true,
  });
  if (resp.status !== 201) {
    throw new Error("Falha ao criar fornecedor");
  }
}

async function getSuppliers() {
  const resp = await api.get(endpoint);
  if (resp.status !== 200) {
    throw new Error("Falha ao buscar fornecedores");
  }
  return resp.data;
}

async function getSuppliersData() {
  const suppliers = await getSuppliers();
  return suppliers.map(({ id, name }) => ({ id, name }));
}

async function getSupplierById(id) {
  return (await api.get(`${endpoint}/${id}`)).data;
}

async function getSuppliersForSelect() {
  const suppliers = (await api.get(endpoint)).data;
  return suppliers
    .filter((supplier) => supplier.active)
    .map(({ id, name }) => ({ id, name }));
}

async function updateSupplier({ id, name, active }) {
  const resp = await api.patch(`${endpoint}/${id}`, {
    name,
    active,
  });
  if (resp.status !== 200) {
    throw new Error("Falha ao atualizar dados do fornecedor");
  }
}

export {
  addSupplier,
  getSuppliers,
  getSuppliersData,
  getSupplierById,
  getSuppliersForSelect,
  updateSupplier,
};
