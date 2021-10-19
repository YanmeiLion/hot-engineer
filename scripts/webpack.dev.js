const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const portfinder = require('portfinder')
const path = require('path')
const { BASE_PROT } = require('./utils/constant')

portfinder.basePort = BASE_PROT

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    static: {
      directory: path.join(__dirname, '../public'),
    },
    // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    historyApiFallback: true,
    // 默认为true
    hot: true,
    // 自动打开浏览器
    open: true, 
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: BASE_PROT,
  },
}

module.exports = async function () {
  try {
    // 端口被占用时候 portfinder.getPortPromise 返回一个新的端口(往上叠加)
    const port = await portfinder.getPortPromise()
    devConfig.devServer.port = port
    return merge(devConfig, baseConfig)
  } catch (e) {
    throw new Error(e)
  }
}
