const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../server/static/"),
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3000'
        },
        '^/public': {
          target: 'http://localhost:3000'
        },
        '^/private': {
          target: 'http://localhost:3000'
        }
      },
      disableHostCheck: true
    }
}
  