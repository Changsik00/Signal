// https://cli.vuejs.org/config/#lintonsave
// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  }
};
