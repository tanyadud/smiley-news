module.exports = {
  publicPath: '/',
  devServer: {
    // https: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/vars.scss";
          @import "@/scss/media-queries.scss";
          @import "@/scss/fonts.scss";
          @import "@/scss/animation.scss";
          @import "@/scss/main.scss";
          @import "@/scss/ui-kit.scss";
        `
      }
    }
  }
};