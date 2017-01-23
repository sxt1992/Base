var webpack = require('webpack'),
    path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./app/main.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test:/\.json$/,
                loader:"json"
            },
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel'
            },
            {
                test: /\.css$/,
                loader:'style!css?modules!postcss'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    resolve: {
        extensions:['','.js','.jsx','.json','.scss']
    },
    devServer:{
        contentBase:"./",
        port:3000,
        color:true,
        historyApiFallback:true,
        inline:true,
        hot:true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
};