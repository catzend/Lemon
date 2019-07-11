const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        sum: "./src/sum.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        port: 3000,
        comtentBase: "./dist",
        open: true,
        hot: true
    },
    output: {
        publicPath: "/",
        filename: "[name]_[hash:3].js",
        path: path.resolve(__dirname, "dist"),
    },
    //loader

    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]_[hash].[ext]",
                    outputPath: "./images",
                    limit: 10240
                }
            }
        }, {
            test: /\.(eot|tff|svg)$/,
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
        new HtmlWebpackPlugin({
            title: "this is COMMON",
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
            chunks: ["main", "sum"],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            title: "this is COMMON",
            filename: "header.html",
            template: "./src/header.html",
            inject: "body",
            chunks: ["sum"],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]










}