var webpack = require("webpack");
var path = require("path");
var ReactStaticPlugin = require('react-static-webpack-plugin');


module.exports = {
    devtool: "source-map",

    entry: {app: ['./app/index.jsx']},

    output:{
        path: path.join(__dirname, 'dist'),
        filename:'[name].js',
    },

    plugins: [
        //new webpack.optimize.UglifyJsPlugin({ screw_ie8: true }),
        new ReactStaticPlugin({
            routes: "./app/routes.jsx",
            template: "./app/pageTemplate.jsx"
        })
    ],

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: { presets: ['es2015', 'react'] }
            }
        ]
    }
}