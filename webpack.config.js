const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index: "./src/index.js",
    inTwo: "./src/inTwo.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use:
          ExtractTextPlugin.extract({
            fallback: {
              loader: 'style-loader',
              options: {
                singleton: true // 处理为单个style标签
              }
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true, // 压缩
                }
              }
            ],
            publicPath: '../'
          })
      }
    ]
  },
  output: {
    publicPath: './',
    // 虚拟目录，自动指向path编译目录（/assets/ => /build/js/）。html中引用js文件时，必须引用此虚拟路径（但实际上引用的是内存中的文件，既不是/build/js/也不是/assets/）。
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_bundle.js",
  },
  optimization: {
    splitChunks: {
      minSize: 1,
      minChunks: 2, // 引用的最少次数
      chunks: 'all',
      cacheGroups: {
        common: {
          name: 'common',
          priority: 0 // 打包优先级
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      title: 'HUI',
      filename: 'index.html',
      chunks: ['index', 'common', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'HUI',
      filename: 'inTwo.html',
      chunks: ['inTwo', 'common', 'vendor']
    }),

  ]
};