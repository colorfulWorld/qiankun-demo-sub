const path = require('path')
const { name } = require('./package')
const env = require('./config')

const assetsCDN = {
  // webpack build externals
  externals: {}
}
const envType = process.env.NODE_ENV == 'production'
module.exports = {
  assetsDir: 'static',
  publicPath: envType ? `/vmcp/${name}/` : '/', //必须要有，用于线上环境的静态资源转发
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env'] = env
      args[0].title = 'just for fun 的子系统'
      return args
    })
  },
  configureWebpack: {
    externals: assetsCDN.externals,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: path.resolve(__dirname, 'src/views')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: 82,
    // host: 'micro-front.dev.ym',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
    },
    proxy: {
      '/api': {
        target: '',
        ws: false,
        changeOrigin: true
      },
      '/bgs': {
        target: '',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
