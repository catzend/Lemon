const htmlWebpackPlugin = require('html-webpack-plugin');
const {
    cleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "production",
    entry: "bundle.js",
    output: {
        filename: '[name]_[hash].[ext]',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:5].[ext]',
                        outputPath: 'images/',
                        limit: 20480
                    }
                }
            }, {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            // root { String}/解析 URL 的路径， 以 / 开头的 URL 不会被转译
                            // url {  Boolean }true启用 / 禁用 url() 处理
                            // alias { Object} {}创建别名更容易导入一些模块

                            // 在 css - loader 前应用的 loader 的数量
                            impotLoaders: 1,
                            // 启用/禁用 CSS 模块
                            modules: true,
                            // 是否启用压缩
                            minimize: true,
                            // source map就是我们编译后的源文件映射。 当使用webpack 编译前端项目时， 配置项devtool控制是否生成source map。
                            // sourceMap:false启用 / 禁用 Sourcemap
                            // camelCase:true	 在 css - loader 前应用的 loader 的数量
                            // localIdentName:string配置生成的标识符(ident)

                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }

}