import { nanoid } from "nanoid";

import { api } from "boot/axios";
import { getClientById } from "./clientService";
import dayjs from "dayjs";
import { sellProduct } from "./productService";

const endpoint = "sales";

async function getSales() {
  const sales = (await api.get(endpoint)).data;
  return sales;
}

async function getSaleSummaryList() {
  const sales = await getSales();

  return Promise.all(
    sales.map(async ({ id, clientid, date, items, status }) => {
      const dateObj = new Date(date);
      return {
        id,
        client: (await getClientById(clientid)).name,
        date: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
        totalPrice: items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
        status,
      };
    })
  );
}

async function getSaleById(id) {
  const sale = (await api.get(`${endpoint}/${id}`)).data;
  return {
    ...sale,
    date: formatToDateInput(sale.date),
  };
}

async function postSale({ date, clientid, items }) {
  const resp = await api.post(endpoint, {
    id: nanoid(),
    clientid,
    date,
    items,
    status: "Ativo",
  });
  if (resp.status === 201) {
    items.forEach((item) => {
      sellProduct(item.id, item.quantity);
    });
  }
}

function updateSale({ id, date, clientid, items }) {
  api.patch(`${endpoint}/${id}`, {
    id,
    date,
    clientid,
    items,
  });
}

async function cancelSale(id) {
  const resp = await api.patch(`${endpoint}/${id}`, {
    status: "Cancelado",
  });
  if (resp.status !== 200) {
    throw new Error("Falha ao cancelar venda");
  }
}

function formatISODatetime(str) {
  const date = new Date(str);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatToDateInput(isoStr) {
  return dayjs(isoStr).format("YYYY-MM-DDTHH:mm");
}

export {
  getSales,
  getSaleSummaryList,
  getSaleById,
  postSale,
  updateSale,
  cancelSale,
};
