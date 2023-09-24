const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
});

module.exports = {
  devServer: {
      proxy: {
          '/api/': {
            // target: 'http://localhost:34587'
             target: 'https://localhost:44372/'
            //target: 'https://dapr-backend.thankfulgrass-b5e492bd.japaneast.azurecontainerapps.io'
          }
      }
  }
}

// module.exports = {
//   configureWebpack: {
//     devtool: 'source-map'
//   }
// }
