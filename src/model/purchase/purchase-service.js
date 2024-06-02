import { nanoid } from "nanoid";

import { api } from "boot/axios";

const endpoint = "purchases";

async function newPurchase({
  supplierid,
  productid,
  productquantity,
  productcost,
}) {
  const resp = await api.post(endpoint, {
    id: nanoid(),
    supplierid,
    productid,
    productquantity,
    productcost,
  });
  console.log(resp.status);
  if (resp.status !== 201) {
    throw new Error("Falha ao concluir compra");
  }
}

export { newPurchase };
