import { getAppConfig } from "./config/appConfig";
import { getRuntimeConfig } from "./config/runtimeConfig";

const appConfig = getAppConfig();
const runtimeConfig = getRuntimeConfig();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  appConfig,
  runtimeConfig,
});
