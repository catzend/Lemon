const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        sum: "./src/sum.js",
        number: "./src/number.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "/dist",
        port: 3000,
        open: true,
        hot: true
    },
    output: {
        publicPath: "/",
        filename: "[name]_[hash:5].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            exclude: /node_module/,
            loader: "babel-loader",
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-core", {
                            useBuiltIns: usage
                        }]
                    ]
                }
            }
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader",
            options: {
                name: "[name]_[hash:5].[ext]",
                outputPath: "./images",
                limit: 10240
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
        new htmlWebpackPlugin({
                title: "简单数据",
                filename: "index.html",
                template: "./src/index.html",
                inject: "body",
                chunks: ["main", "sum"],
                excludeChunks: ["number"],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            },
            new htmlWebpackPlugin({
                title: "this is title",
                filename: "header.html",
                template: "./src/header.html",
                inject: "head",
                chunks: ["number"],
                minify: {
                    removeComments: false,
                    collapseWhitespace: false
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        )
    ]
}