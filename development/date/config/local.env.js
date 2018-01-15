var merge = require('webpack-merge');
var commonConf = require('./common.env');
var projectConfig = require('./project.config')

var localConf = merge(commonConf, {
    env: 'dev',
    assetsPublicPath: '/projects/dafengche/moBanYanJiu/',
    // globalConfig 中的 key 需要为 JSON 字符串
    globalConfig: {
        NODE_ENV: JSON.stringify("development")
        //testAPI: '/api/get'
    },
    port: projectConfig.port,
    proxyTable: {
        // '/api/get': {
        //     target: 'http://test.sqaproxy.souche.com',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '/api/get': ''
        //     }
        // }
    }
});

module.exports = localConf;
