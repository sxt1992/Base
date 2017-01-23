var webpack = require('webpack');
["ProvidePlugin", "HotModuleReplacementPlugin", "NoErrorsPlugin"]
["UglifyJsPlugin", "CommonsChunkPlugin"]
// var arr=[, "HtmlWebpackPlugin", "ExtractTextPlugin", ,  "Clean", ];
// var arr=["HotModuleReplacementPlugin", "HtmlWebpackPlugin", "ExtractTextPlugin", "NoErrorsPlugin", "UglifyJsPlugin", "CommonsChunkPlugin", "Clean", "ProvidePlugin"];
for (var prop in webpack) {
    if (typeof webpack[prop] == "object") {
        for (var pp in webpack[prop]) {
            for (var i = 0; i < arr.length;i++){
                if (pp.toLowerCase() == arr[i].toLowerCase()) {
                    console.log(prop+"="+pp+"="+arr[i]);
                    break;
                }
            }
        }
    }
}