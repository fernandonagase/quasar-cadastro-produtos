import { nanoid } from "nanoid";

import { api } from "boot/axios";
import { getClientById } from "./clientService";

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

function postSale({ date, clientid, items }) {
  api.post(endpoint, {
    id: nanoid(),
    clientid,
    date,
    items,
  });
}

export { getSales, getSaleSummaryList, postSale };
