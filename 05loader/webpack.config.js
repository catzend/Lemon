const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            // use: {
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name]_[hash:5].[ext]',
            //         outputPath: 'images/',
            //     }
            // }
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash:5].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader',
            }
        }, {
            test: /\.css$/,
            // use:['style-loader','css-loader','sass-loader']
            // use: [
            //     'style-loader',
            //     'css-loader',
            //     'postcss-loader'
            // ]
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
    }
}