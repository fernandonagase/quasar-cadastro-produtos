import { nanoid } from "nanoid";

import { api } from "boot/axios";

const endpoint = "clients";

async function getClients() {
  return (await api.get(endpoint)).data;
}

async function getClientById(id) {
  return (await api.get(`${endpoint}/${id}`)).data;
}

async function postClient({ name, phone }) {
  const id = nanoid();
  const response = await api.post("clients", {
    id,
    name,
    phone,
    active: true,
  });
  if (response.status !== 201) {
    throw new Error("Failed to fetch clients");
  }
}

async function updateClient({ id, name, phone, active }) {
  const response = await api.put(`${endpoint}/${id}`, {
    id,
    name,
    phone,
    active,
  });
  if (response.status !== 200) {
    throw new Error("Failed to update client");
  }
}

export { getClients, getClientById, postClient, updateClient };
