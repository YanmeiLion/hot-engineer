const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const portfinder = require('portfinder')
const path = require('path')
const { BASE_PROT } = require('./utils/constant')
const ESLintPlugin = require('eslint-webpack-plugin')

portfinder.basePort = BASE_PROT

const devConfig = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, '../public'),
		},
		// 默认为true
		hot: true,
		// 是否开启代码压缩
		compress: true,
		// 启动的端口
		port: BASE_PROT,
	},
	plugins: [
		new ESLintPlugin({ extensions: ['js', 'ts', 'react'] })
	]
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
