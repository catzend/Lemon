// 这只是一个自己写的httpserver
const express = require("express");
const webpack = requirer("webpack");

const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const complier = webapck(config);



const app = express();

app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));

app.listen(3000, function () {
    console.log('server is running')
})