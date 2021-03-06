const path = require('path');
const projectCfg = require('./project.cfg');

module.exports = {
  env: 'dev',
  assetsPublicPath: path.resolve(__dirname, '../dist/'),
  port: projectCfg.port,
  globalCfg: {
    URLS: JSON.stringify('development'),
  },
  proxyTable: {},
};
