var webpack = require("webpack");
var path = require("path");
var ReactStaticPlugin = require('react-static-webpack-plugin');


module.exports = {
    devtool: "source-map",

    devServer: {
        hot: true
    },

    entry: {
        app: path.resolve("./app/index.jsx"),
        style: path.resolve("./app/pages/main.scss")
    },

    output:{
        path: path.resolve('./dist'),
        filename:'[name].js',
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ screw_ie8: true }),
        new ReactStaticPlugin({
            routes: path.resolve("./app/routes.jsx"),
            template: path.resolve("./app/pageTemplate.jsx")
        })
    ],

    resolve: {
        root: path.resolve("./app"),
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: { presets: ['es2015', 'react'] }
            },
        ]
    },
    
    sassLoader: {
        includePaths: [path.resolve("./app/scss")]
    }
}