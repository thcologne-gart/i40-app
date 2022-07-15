module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  },

  devServer: {
    // Dieser Prxy hat funktioniert um das Docker Image auszuführen.
    proxy: 'http://localhost'
    // Dieser funktioniert für die Forge API. siehe https://cli.vuejs.org/config/#devserver-proxy für weitere Infos wie Docker und Forge zusammen klappen können
    // proxy: 'http://localhost:3000'
  },

  transpileDependencies: [
    'vuetify'
  ]
}
