import { api } from "boot/axios";

const endpoint = "products";

async function getProductsData() {
  return (await api.get(endpoint)).data.map(({ id, description, price }) => ({
    id,
    description,
    price,
  }));
}

export { getProductsData };
