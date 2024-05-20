import { nanoid } from "nanoid";

import { api } from "boot/axios";
import { getClientById } from "./clientService";
import dayjs from "dayjs";

const endpoint = "sales";

async function getSales() {
  const sales = (await api.get(endpoint)).data;
  return sales;
}

async function getSaleSummaryList() {
  const sales = await getSales();

  return Promise.all(
    sales.map(async ({ id, clientid, date, items }) => {
      const dateObj = new Date(date);
      return {
        id,
        client: (await getClientById(clientid)).name,
        date: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
        totalPrice: items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
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

function postSale({ date, clientid, items }) {
  api.post(endpoint, {
    id: nanoid(),
    clientid,
    date,
    items,
  });
}

function updateSale({ id, date, clientid, items }) {
  api.put(`${endpoint}/${id}`, {
    id,
    date,
    clientid,
    items,
  });
}

function formatISODatetime(str) {
  const date = new Date(str);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatToDateInput(isoStr) {
  return dayjs(isoStr).format("YYYY-MM-DDTHH:mm");
}

export { getSales, getSaleSummaryList, getSaleById, postSale, updateSale };
