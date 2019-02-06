// https://cli.vuejs.org/config/#lintonsave
// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint

module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
