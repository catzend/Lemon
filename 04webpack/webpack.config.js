const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            // use: {
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name]_[hash:5].[ext]',
            //         outputPath: 'images/'
            //     }
            // }
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash:5].[ext]',
                    outputPath: 'images/',
                    limit: '2048',
                    // 当大于2048(2kb)的时候执行下面的loader
                    //  fallback: 'responsive-loader'
                }
            }
        }, ]
    }
}