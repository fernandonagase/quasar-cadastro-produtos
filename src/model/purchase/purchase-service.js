import { nanoid } from "nanoid";
import { date } from "quasar";

import { api } from "boot/axios";
import { getProductById, purchaseProduct } from "src/services/productService";
import { getSupplierById } from "src/model/supplier/supplier-service";

const endpoint = "purchases";

async function newPurchase({
  supplierid,
  productid,
  productquantity,
  productcost,
  purchasedate,
}) {
  const resp = await api.post(endpoint, {
    id: nanoid(),
    supplierid,
    productid,
    productquantity,
    productcost,
    purchasedate,
  });
  if (resp.status !== 201) {
    throw new Error("Falha ao concluir compra");
  }
  purchaseProduct(productid, productquantity);
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
      purchasedate: purchase.purchasedate,
    }))
  );
}

const { formatDate } = date;

async function getPurchaseDetails(id) {
  const purchase = (await api.get(`${endpoint}/${id}`)).data;
  return {
    ...purchase,
    purchasedate: formatDate(purchase.purchasedate, "YYYY-MM-DDTHH:mm"),
  };
}

async function updatePurchase({
  id,
  supplierid,
  productid,
  productquantity,
  productcost,
  purchasedate,
}) {
  const resp = await api.patch(`${endpoint}/${id}`, {
    supplierid,
    productid,
    productquantity,
    productcost,
    purchasedate,
  });
  if (resp.status !== 200) {
    throw new Error("Falha ao atualizar dados da compra");
  }
}

export {
  newPurchase,
  getPurchaseSummaries,
  getPurchaseDetails,
  updatePurchase,
};
