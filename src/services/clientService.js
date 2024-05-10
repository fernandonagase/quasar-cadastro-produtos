import { api } from "boot/axios";

const endpoint = "products";

async function getClients() {
  return (await api.get(endpoint)).data;
}

export { getClients };
