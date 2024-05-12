import { api } from "boot/axios";

const endpoint = "sales";

async function getSales() {
  const sales = (await api.get(endpoint)).data;
  return sales;
}

export { getSales };
