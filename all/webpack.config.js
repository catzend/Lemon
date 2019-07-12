const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
    header: "./src/header.js"
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "dist",
    port: 3000,
    open: true,
    hot: true
  },
  output: {
    publicPath: "/",
    filename: "[name]_[hash:3].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_module/
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          name: "[name]_[hash].[ext]",
          limit: 10240
        }

      }
    }, {
      test: /\.(eot|tff|svg)$/,
      use: {
        loader: "file-loader",
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
      title: "new",
      filename: "index.html",
      template: "./src/index.html",
      inject: 'body',
      chunks: ["main", "header"],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new htmlWebpackPlugin({
      title: "header",
      filename: "header.html",
      template: "./src/header.html",
      inject: 'body',
      chunks: ["header"],
      minify: {
        removeComments: false,
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}