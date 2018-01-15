var merge = require('webpack-merge');
var commonConf = require('./common.env');

var testConf = merge(commonConf, {
    env: 'test',
    // globalConfig 中的 key 需要为 JSON 字符串
    globalConfig: {
        NODE_ENV: JSON.stringify("testing")
    },
    index: 'index.html'
});

module.exports = testConf;
