const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_API_URL =
  process.env.USE_PROXY == "true"
    ? process.env.VUE_APP_API_URL_FOR_PROXY
    : process.env.VUE_APP_API_URL;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:
    process.env.USE_PROXY == "true"
      ? {
          proxy: {
            "^/rest": {
              target: process.env.VUE_APP_PROXY_BACKEND_URL,
              changeOrigin: true,

              onProxyReq: function (request) {
                request.setHeader(
                  "origin",
                  process.env.VUE_APP_PROXY_BACKEND_URL
                );
              },
            },
          },
        }
      : {},
  pwa: {
    themeColor: "#000000",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].description = process.env.META_DESC;
      return args;
    });
  },
});
