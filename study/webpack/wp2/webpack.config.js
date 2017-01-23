var webpack = require('webpack'),
    path=require('path');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./app/main.js",
    output: {
        path: path.join(__dirname, 'public'),
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
            }
        ]
    },
    devServer:{
        contentBase:"./public",
        port:3000,
        color:true,
        historyApiFallback:true,
        inline:true,
        hot:true
    },
    plugins: []
};