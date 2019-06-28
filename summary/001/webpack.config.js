var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = rquire("path");

modeule.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:5].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html', // Load a custom template
            inject: 'body', // Inject all scripts into the body
            "htmlWebpackPlugin": {
                "files": {
                    "css": ["main.css"],
                    "js": ["assets/head_bundle.js", "assets/main_bundle.js"],
                    "chunks": {
                        "head": {
                            "entry": "assets/head_bundle.js",
                            "css": ["main.css"]
                        },
                        "main": {
                            "entry": "assets/main_bundle.js",
                            "css": []
                        },
                    }
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: '第二个页面',
            template: 'main.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
    ]
}