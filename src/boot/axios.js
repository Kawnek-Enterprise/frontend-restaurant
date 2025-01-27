import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
console.log(window.location)
let hostname;
let subdomains;
let firstSubdomain;
(function () {
  hostname = window.location.hostname;
  subdomains = hostname.split('.').reverse();

  if (subdomains.length > 2) {
    firstSubdomain = subdomains[2];
    console.log("First subdomain:", firstSubdomain);
  } else {
    console.log("No subdomain found.");
  }
})();
const api = axios.create({
  baseURL: `${process.env.srvUrl}v1`,
  params: {
    handle: firstSubdomain,
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
