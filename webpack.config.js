/* 
* @Author: leeZ
* @Date:   2018-03-28 17:12:37
* @Last Modified by:   leeZ
* @Last Modified time: 2018-03-30 12:03:10
*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 将非js文件打包成单独的静态文件方便缓存
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 用以区分开发环境和生产环境，开发环境会有错误提示信息等，生产环境不会有这些信息，以减少代码冗余和体积及加载速度
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if(isDev) {
  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )
  // 此工具是方便编译后的代码调试，可以直接看到源代码而不是编译后的代码
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // 热重载
    hot: true,
    // 将未知路由映射到指定路由
    // historyFallback: {

    // },
    // 启用时自动打开浏览器
    open: false,
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else {
  // 生产环境将框架模块单独打包
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendor: ['vue'],
  }
  // 生产环境打包时采用chunk方式进行模块化代码分割
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
  {
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack将生成在APP里面的webpack相关代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config