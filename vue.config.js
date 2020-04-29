// https://cli.vuejs.org/config/#lintonsave
// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint
module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "static/assets" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "./dist/assets",
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    config.devServer
      .public("http://0.0.0.0:8080")
      .host("0.0.0.0")
      .port(8080)
      .hotOnly(true)
      .watchOptions({
        poll: 1000,
      })
      .https(false)
      .headers({
        "Access-Control-Allow-Origin": ["*"],
      });
  },
  // https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/common.scss";`,
      },
    },
  },
};
