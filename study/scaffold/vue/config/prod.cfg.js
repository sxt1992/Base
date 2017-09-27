const path = require('path');
const projectCfg = require('./project.cfg');

module.exports = {
  env: 'prod',
  assetsPublicPath: path.resolve(__dirname, './dist/'),
  port: projectCfg.port,
  globalCfg: {
    URLS: JSON.stringify('production'),
  },
  proxyTable: {},
};
