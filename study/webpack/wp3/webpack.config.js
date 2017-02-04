// https://segmentfault.com/a/1190000005866410
// http://blog.csdn.net/github_26672553/article/details/52280655
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var validate = require('webpack-validator');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const debug = process.env.NODE_ENV !== 'production';
var pathAll = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    srcPath: path.resolve(__dirname, './src'),
    libsPath: path.resolve(__dirname, './libs'),
    nodeModPath: path.resolve(__dirname, './node_modules')
};

var config = {
    entry: {
        app: path.join(pathAll.srcPath, './app.js')
    },
    output: {
        filename: "js/[name].js",
        chunkFilename: 'js/[name].js',
        path: pathAll.path,
        publicPath: pathAll.publicPath,
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.json$/,   
                loader: "json"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader", {
                    publicPath: '../'
                })
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'url-loader',
                query: {
                    /*
                    *  limit=10000 ： 10kb
                    *  图片大小小于10kb 采用内联的形式，否则输出图片
                    * */
                    limit: 10000,
                    name: '/img/[name]-[hash:8].[ext]'  
                }
            },
            /*
            * font loader
            * */
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: '/font/[name]-[hash:8].[ext]'
                }
            }
        ]

    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    resolve: {
        root: pathAll.nodeModPath,
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.png', '.jpg'],
        alias: {
            // js
            jquery: path.join(pathAll.libsPath, 'js/jquery/jquery.js'),
            underscore: path.join(pathAll.libsPath, 'js/underscore/underscore.js'),
            // css
            bootstrapcss: path.join(pathAll.libsPath, 'css/bootstrap/bootstrap-3.3.5.css'),
            indexcss: path.join(pathAll.srcPath, 'css/index.css')
        }
    },
    devServer:{
        contentBase:"./dist",
        port:3000,
        historyApiFallback:true,
        inline:true,
        hot:true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore"
        }),
        new ExtractTextPlugin("css/[name]-[chunkhash:8].css", {allChunks: true}),
         /*
            * gloabal flag
            * （全局标识）
            * */
        new webpack.DefinePlugin({
            __DEV__: debug
        }),
        new HtmlWebpackPlugin({
            template: path.join(pathAll.srcPath, './index.html'),
            inject: 'true',
            chunks: ['common', 'index', 'webpackAssets'],
            // 根据依赖自动排序
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            filename: 'html/hrm.html',
            template: path.join(pathAll.srcPath, './html/hrm.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/home.html',
            template: path.join(pathAll.srcPath, './html/home.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/menu1.html',
            template: path.join(pathAll.srcPath, './html/menu1.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/menu2.html',
            template: path.join(pathAll.srcPath, './html/menu2.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/menu3.html',
            template: path.join(pathAll.srcPath, './html/menu3.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/menu5.html',
            template: path.join(pathAll.srcPath, './html/menu5.html'),
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'html/menu6.html',
            template: path.join(pathAll.srcPath, './html/menu6.html'),
            inject: false,
        })
    ]
};
module.exports = validate(config);