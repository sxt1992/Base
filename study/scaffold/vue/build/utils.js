const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.cssLoaders = (options = {}) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap }),
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      });
    }
    return ['vue-style-loader'].concat(loaders);
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
  const output = [];
  const loaders = exports.cssLoaders(options);
  Object.keys(loaders).forEach((key) => {
    const loader = loaders[key];
    // 解决非 .vue 文件的 css 没有 autoprefixer 的情况
    // "postcss-loader": "^2.0.5",
    // loader.slice(2, 0, {
    //     loader: 'postcss-loader',
    //     options : {
    //         sourceMap: options.sourceMap
    //     }
    // });
    output.push({
      test: new RegExp(`\\.${key}$`),
      use: loader,
    });
  });
  return output;
};
