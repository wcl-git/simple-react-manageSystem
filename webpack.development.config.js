/*
 * @Author: wuchunlei
 * @Date: 2017-08-07 20:10:37
 * @Last Modified by: wuchunlei
 * @Last Modified time: 2017-08-08 19:24:50
 */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const casProxy = require('./proxy');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PORT = 5000

// const WebpackDevServer = require('webpack-dev-server')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')

// module.exports
let config = {
  entry: {
    js: './app/client.js',
    vendor: [
      'react', 'classnames', 'react-router', 'react-dom'
    ]
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: './vendor.js',
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      components: path.join(__dirname, '/app/components'),
      actions: path.join(__dirname, '/app/actions'),
      api: path.join(__dirname, '/app/api'),
      reducers: path.join(__dirname, '/app/reducers'),
      utils: path.join(__dirname, '/app/utils'),
      constants: path.join(__dirname, '/app/constants'),
      controllers: path.join(__dirname, '/app/controllers'),
      style: path.join(__dirname, '/app/style')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.css/,
        // loader: 'style!css',
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=<true></true>')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'file-loader?name=iconfont/[path][name].[ext]'
      }
    ]
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true
    }),
    // 提取css
    new ExtractTextPlugin('vendor.[hash].css'),
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 入口文件名
      filename: 'vendor.bundle.js' // 打包后的文件名
    }),
    /* 压缩优化代码开始  可以关掉 */
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
     // 压缩优化代码结束
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`
    }),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 8188 })

  ],
  devtool: 'source-map'
  // devServer: {
  //   contentBase: './app/',
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   // proxy: casProxy(),
  //   host: '0.0.0.0',
  //   port: PORT
  // }
}

// webpack默认server
// let server = new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   progress: true,
//   historyApiFallback: true,
//   hot: true,
//   inline: true,
//   stats: {
//     colors: true
//   }
//   // quiet: true
//   // proxy
// })

// server.listen(5000, function () {
//   console.log('正常打开5000端口')
// })

// 中间件
const app = express()
const configObj = webpack(config)

app.use(webpackDevMiddleware(configObj, {
  publicPath: config.output.publicPath,
  progress: true,
  historyApiFallback: true,
  hot: true,
  inline: true,
  stats: {
    colors: true
  }
}))

app.use(require('webpack-hot-middleware')(configObj))
app.listen(5000, function () {
  console.log('Listening on port 5000!')
})
