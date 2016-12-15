var webpack = require("webpack");
var path = require("path");
var StaticSitePlugin = require('static-site-generator-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var routeList = require("./app/routeList");

module.exports = {
    devtool: "source-map",

    devServer: {
        hot: true
    },

    entry: {
        app: path.resolve("./app/index.jsx"),
        // style: path.resolve("./app/pages/main.scss")
    },

    output:{
        path: path.resolve('./dist'),
        filename:'[name].js',
        libraryTarget: "umd"
    },

    plugins: [
        new StaticSitePlugin("app", routeList),
        new ExtractTextPlugin("style.css")
    ],

    resolve: {
        root: path.resolve("./app"),
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!sass?sourceMap=true')
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["es2015", "react"]
                }
            },
            {
                test: /\.svg$/,
                loader: "file-loader"
            },
        ]
    },
    
    sassLoader: {
        includePaths: [path.resolve("./app/scss")]
    }
}