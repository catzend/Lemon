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
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        hotOnly: true
    },
    module: {
        rules: [{
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
            test: "/\.css$/",
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
            title: "This is last Test",
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
            chunks: ["main"],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
        // new webpack.HotModuleReplacementPlugin()
    ]
}