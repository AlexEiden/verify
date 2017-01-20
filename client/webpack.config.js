var webpack = require("webpack");
var path = require("path");
var StaticSitePlugin = require('static-site-generator-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var routeList = require("./app/routeList");

var DEV = process.env.NODE_ENV != "production";
console.log(" --- DEV: " + DEV);

module.exports = {
    devtool: "source-map",

    devServer: {
        hot: true,
		port:8080,
		stats:{ chunks: false },
		proxy:{
			"/api":{target: "http://localhost:8081"}
		},
		historyApiFallback: {index: "app/dev-index.html"},
		
    },

	entry: {app: path.resolve("./app/index.jsx")},

    output:{
        path: path.resolve('./dist'),
		publicPath: "http://localhost:8080/",
        filename:'[name].js',
        libraryTarget: "umd"
    },

    plugins: [
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
		new webpack.ProvidePlugin({"fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"}), // fetch polyfill

		...(DEV?[
			new webpack.HotModuleReplacementPlugin()	
		]:[
			new StaticSitePlugin("app", routeList),
			new ExtractTextPlugin("style.css"),
			new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}})
		])
    ],

    resolve: {
		root: path.resolve("./app"),
	},

	module: {
		loaders: [
            {
                test: /\.scss$/,
                loader: DEV?
					"style-loader!css-loader!sass-loader?sourceMap=true"
					: ExtractTextPlugin.extract('style-loader', 'css!sass?sourceMap=true')
            },
            {
                test: /\.jsx?$/,
                loader: 'react-hot-loader!babel-loader?{presets:["es2015", "react"]}',
                exclude: /node_modules/,
                //query: {
                //    "presets": ["es2015", "react"]
                //}
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
