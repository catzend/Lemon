var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
    mode: 'production',
    // entry: './src/index.js',
    entry: {
        main: './src/index.js'
    },
    output: {
        // filename: "bundle.js",
        //如果上传到cdn中
        // publicPath: 'http://cdn.com.cn',
        filename: '[name]_[hash:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash:5].[ext]',
                    outputPath: 'images/',
                    limit: 2048 //2kb
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true
                    }
                },
                'postcss-loader'
            ]
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }), new CleanWebpackPlugin()]

}