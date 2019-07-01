const htmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
//引入清除文件插件
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/index.js",
        sub: "./src/js/sub.js"
    },
    // 映射
    devtool: 'cheap-module-eval-source-map',
    // 服务
    devServer: {
        contentBase: './dist', //将dist目录下的文件(index.html)作为可访问文件, 如果不写这个参数则默认与webpack.cofig.js的同级目录
        port: 3000 //端口号设为8080, 默认也是8080
    },
    output: {
        // publicPath
        filename: "[name]_[hash:5].js",
        path: path.resolve(__dirname, './dist/js')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|.gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]_[hash:5].[ext]",
                    outpustPath: 'images/',
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
        new CleanWebpackPlugin(), //实例化，参数为目录
        new htmlWebpackPlugin({
            title: "这是第一个index",
            filename: "index.html",
            template: "./src/page/index.html",
            inject: 'body',
            chunks: ['main', 'sub'],
            excludeChunks: ['sub'],
            minify: {
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new htmlWebpackPlugin({
            title: "这是 sub",
            filename: "sub.html",
            inject: "html",
            chunks: ["sub"],
            excludeChunks: ["main"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            }
        }),

    ]

}