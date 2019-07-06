const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        "main": "./src/index.js"
    },
    output: {
        filename: "[name_[hash:5].js",
        path: path.resolve(__dirname, "/dist")
    },
    //映射 
    devtool: "cheap-module-eval-source-map",
    //服务开启
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 3000,
        // hot: true,
        // onlyHot: true
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]_[hash:5].[ext]",
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
            title: "This is index.js",
            filename: "index.html",
            template: "./src/index.html",
            inject: "head",
            chunks: ["main"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        // new HtmlWebpackPlugin({
        //     title: "This is index.js",
        //     filename: "sum.html",
        //     template: "./src/sum.html",
        //     inject: "head",
        //     chunks: ["sum", "main"],
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //     }
        // })
    ],

    output: {
        filename: "[name]_[hash:5].js",
        path: path.resolve(__dirname, "dist/")
    }
}