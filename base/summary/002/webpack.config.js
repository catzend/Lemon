var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");


module.exports = {
    mode: "development",
    // 如果是单个那就是打包进这个文件
    // 如果后面跟着数组形式的就是打包进一个文件并且合并进此文件
    // 如果后面跟着对象那就是形成两个js
    entry: {
        main: "./src/index.js",
        sub: "./src/sub.js",
    },
    output: {
        // publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
        // publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
        //     publicPath: "/assets/", // 相对于服务(server-relative)
        //     publicPath: "assets/", // 相对于 HTML 页面
        //     publicPath: "../assets/", // 相对于 HTML 页面
        //     publicPath: "", // 相对于 HTML 页面（目录相同）
        filename: '[name]_[hash:5].js',
        path: path.resolve(__dirname, "dist/js")
    },
    module: {
        rules: [{
                test: /\.(png|jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: '[name]_[hash:5].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 在 css - loader 前应用的 loader 的数量
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "this is title",
            filename: 'index_[hash:3].html',
            template: "./src/page/index.html",
            inject: "body",
            minify: true,
            chunks: ['main', 'sub'],
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                // Will generate: <meta name="theme-color" content="#4285f4">
            }
        }),
        new HtmlWebpackPlugin({
            title: "这是sub页面",
            filename: 'sub[hash:3].html',
            template: "./src/page/sub.html",
            inject: 'head',
            chunks: ['sub'],
            excludeChunks: ['main']
        }),
        // new
        // title: 用来生成页面的 title 元素
        // filename: 输出的 HTML 文件名， 默认是 index.html, 也可以直接配置带有子目录。
        // template: 模板文件路径， 支持加载器， 比如 html!. / index.html
        // inject: true | 'head' | 'body' | false, 注入所有的资源到特定的 template 或者 templateContent 中， 如果设置为 true 或者 body，
        // 所有的 javascript 资源将被放置到 body 元素的底部， 'head'
        // 将放置到 head 元素中。
        // favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: true //删除空白符与换行符
        // }
        // hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件， 对于解除 cache 很有用。
        // cache: true | false， 如果为 true, 这是默认值， 仅仅在文件修改之后才会发布文件。
        // showErrors: true | false, 如果为 true, 这是默认值， 错误信息会写入到 HTML 页面中
        // chunks: 允许只添加某些块(比如， 仅仅 unit test 块)
        // chunksSortMode: 允许控制块在添加到页面之前的排序方式， 支持的值： 'none' | 'default' | {
        //         function
        //     } -
        //     default: 'auto'
        // excludeChunks: 允许跳过某些块，(比如， 跳过单元测试的块)
        new HtmlWebpackPlugin({
            title: 'hello webpack',
            filename: 'main.html',
            template: './src/page/sub.html', //为新生成的index.html指定模版
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        })
    ]
}