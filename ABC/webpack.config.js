var HtmlWebpackPlugin = require("html-webpack-plugin");
var {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
var path = require("path");
const webpack = require('webpack');

module.exports = {
    // mode: "production",
    entry: {
        main: "./src/index.js"
        // sum: "./src/sum.js"
    },
    //映射
    // devtool: "cheap-module-eval-source-map",
    devtool: 'inline-source-map',
    // webpack-dev-server
    // devServer: {
    //     contentBase: './dist', //将dist目录下的文件(index.html)作为可访问文件, 如果不写这个参数则默认与webpack.cofig.js的同级目录
    //     port: 3000, //端口号设为8080, 默认也是8080
    //     // 热模块处理
    //     hot: true,
    //     hotOnly: true,
    // },
    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    },

    output: {
        filename: "[name]_[hash:5].js",
        path: path.resolve(__dirname, "./dist")
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
            test: /\.(eto|tff|gif)$/,
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
            title: "This is new title",
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
            chunks: ["main"],
            excludeChunks: ["sum"],
            minify: {
                removeComments: false,
                collapseWhitespace: false,
            }
        }),
        new HtmlWebpackPlugin({
            title: "sum",
            filename: "sum.html",
            template: "./src/sum.html",
            inject: "head",
            chunks: ["main", "sum"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        // 在plugins选项中添加这两个内置插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()

    ]
}