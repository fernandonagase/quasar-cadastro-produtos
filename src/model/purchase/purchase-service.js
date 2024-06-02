import { nanoid } from "nanoid";

import { api } from "boot/axios";
import { getProductById } from "src/services/productService";
import { getSupplierById } from "src/model/supplier/supplier-service";

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

async function getPurchaseSummaries() {
  const purchases = (await api.get(endpoint)).data;
  return Promise.all(
    purchases.map(async (purchase) => ({
      id: purchase.id,
      productname: (await getProductById(purchase.productid)).description,
      productquantity: purchase.productquantity,
      productcost: purchase.productcost,
      suppliername: (await getSupplierById(purchase.supplierid)).name,
    }))
  );
}

export { newPurchase, getPurchaseSummaries };
