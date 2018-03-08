var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
    return path.posix.join(config.assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
        loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
        })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
        })
    } else {
        return ['vue-style-loader'].concat(loaders)
    }
  }

   // https://vue-loader.vuejs.org/en/configurations/extract-css.html
   return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
   }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension];
        // 解决非 .vue 文件的 css 没有 autoprefixer 的情况
        // "postcss-loader": "^2.0.5",
        // loader.slice(2, 0, {
        //     loader: 'postcss-loader',
        //     options : {
        //         sourceMap: options.sourceMap
        //     }
        // });
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

// 生成 webpack entry
exports.generateMultiEntry = function (nameList) {
    var entry = {};
    nameList.forEach(function (name) {
        entry[name] = [ 'babel-polyfill', './src/pages/' + name + '.js' ];
    });

    return entry;
}

// 为 dev 配置 HtmlWebpackPlugin 生成多页面 html
exports.generateDevHtmls = function (isSingle, nameList) {
    if (isSingle) {
        return [{
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }];
    }

    return nameList.map(function (name) {
        return {
            filename: name + '.html',
            template: 'index.html',
            chunks: [ name ],
            inject: true
        }
    });
}

// 为 build 配置 HtmlWebpackPlugin 生成多页面 html
exports.generateBuildHtmls = function (isSingle, nameList) {
    if (isSingle) {
        return [{
            filename: config.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }];
    }

    return nameList.map(function (name) {
        return {
            filename: path.resolve(__dirname, '../dist/' + name + '.html'),
            template: 'index.html',
            inject: true,
            chunks: [ name, 'vendor', 'manifest' ],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        };
    });
}
