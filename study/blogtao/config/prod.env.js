var merge = require('webpack-merge');
var commonConf = require('./common.env');
var URL_CONFIG = require('./url.config.js');

var prodConf = merge(commonConf, {
    env: 'prod',
    assetsPublicPath: '/',
    // globalConfig 中的 key 需要为 JSON 字符串
    globalConfig: {
        NODE_ENV: JSON.stringify("production"),
        URL_CONFIG: JSON.stringify(URL_CONFIG.prod)
    },
    sourceMap: true
});

module.exports = prodConf;
