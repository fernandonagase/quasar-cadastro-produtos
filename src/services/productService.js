import { api } from "boot/axios";

const endpoint = "products";

async function getProductsData() {
  return (await api.get(endpoint)).data.map(({ id, description, price }) => ({
    id,
    description,
    price,
  }));
}

async function getProductById(id) {
  return (await api.get(`${endpoint}/${id}`)).data;
}

async function hasEnoughInStock(productid, quantity) {
  const product = await getProductById(productid);
  return product.quantity >= quantity;
}

async function sellProduct(productid, quantity) {
  const product = await getProductById(productid);
  const remaining = product.quantity - quantity;
  api.patch(`${endpoint}/${productid}`, { quantity: remaining });
}

async function purchaseProduct(productid, quantity) {
  const product = await getProductById(productid);
  const newQuantity = product.quantity + quantity;
  api.patch(`${endpoint}/${productid}`, { quantity: newQuantity });
}

export {
  getProductsData,
  getProductById,
  hasEnoughInStock,
  sellProduct,
  purchaseProduct,
};
