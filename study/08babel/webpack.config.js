var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
var webpack = require("webpack");


module.exports = {
    mode: "development",
    entry: {
        "main": "./src/index.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: './dist',
        open: true,
        // 发送ajax请求
        //解决跨域的模拟的接口代理(vue和react)
        // proxy:{
        //     '/api':"http:localhost:3000"
        // }
        // 端口号
        port: 3000,
        hot: true,
        // hotOnly: true
    },
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     compress: true,
    //     port: 9000,
    //     open: true,
    //     hot: true,
    //     hotOnly: true
    // },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    // "presets": [
                    //     ["@babel/preset-env", {
                    //         useBuiltIns: "usage"
                    //     }]
                    // ]
                    "plugins": [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "absoluteRuntime": false,
                                "corejs": false,
                                "helpers": true,
                                "regenerator": true,
                                "useESModules": false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash:5].[ext]",
                        outputpath: "images/",
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

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "This is last Test",
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
            chunks: ["main"],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.HotModuleReplacementPlugin()
    ]
}