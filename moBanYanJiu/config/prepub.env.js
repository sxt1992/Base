var merge = require('webpack-merge');
var commonConf = require('./common.env');
var URL_CONFIG = require('./url.config.js');

var prepubConfig = merge(commonConf, {
    env: 'prepub',
    assetsPublicPath: '/projects/dafengche/moBanYanJiu/',
    globalConfig: {
        NODE_ENV: JSON.stringify("prepub"),
        URL_CONFIG: JSON.stringify(URL_CONFIG.prepub)
    }
});

module.exports = prepubConfig;
