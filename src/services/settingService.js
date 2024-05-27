import { api } from "boot/axios";

const endpoint = "settings";

async function getConfig(context, key) {
  return (await api.get(endpoint)).data[context][key];
}

async function updateConfig(config) {
  api.put(endpoint, config);
}

export { getConfig, updateConfig };
