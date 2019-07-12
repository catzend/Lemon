const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    "main": "./src/index.js",
    "header": "./src/header.js"
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "/dist",
    open: true,
    port: 3000,
    hot: true
  },
  output: {
    publicPath: "/",
    filename: "[name]_[hash:5].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
          limit: 10240
        }
      }
    }, {
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: "file-loader"
      }
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1
          }
        },
        "postcss-loader"
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new htmlWebpackPlugin({
      "title": "这是哪一次整合",
      "filename": "index.js",
      "template": "./src/index.html",
      "inject": "body",
      "chunks": ["main", "header"],
      "minify": {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new htmlWebpackPlugin({
      "title": "这是哪一次整合",
      "filename": "header.js",
      "template": "./src/header.html",
      "inject": "body",
      "chunks": ["header"],
      "minify": {
        removeComments: false,
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}