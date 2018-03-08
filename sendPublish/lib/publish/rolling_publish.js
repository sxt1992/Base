/* eslint-disable max-len */
'use strict';

const execSync = require('child_process').execSync;

const globalData = require('../global_data.js');
const severUtil = require('../server_util.js');
const envUtil = require('../env_util.js');

module.exports = {
    publish: function () {
        const serverAssetsPath = severUtil.getAssetsPath(envUtil.publishEnv);
        const sourceFiles = globalData.DIST_FOLDER + '/*';

        try {
            execSync(`ssh ${severUtil.remoteSever} 'mkdir -p ${serverAssetsPath}'`);
        } catch (e) {
            console.log('创建项目文件夹失败\n');
            process.exit(1);
        }

        try {
            execSync(`rsync -rvI --delete-after --progress ${sourceFiles} ${severUtil.remoteSever}:${serverAssetsPath}`);
        } catch (e) {
            console.log('上传文件到测试服务器失败\n');
            process.exit(1);
        }

        console.log('\n');
        console.log('🚀  发布成功\n');
        console.log(`🔗  访问 ${severUtil.getUrlFromEnv(envUtil.publishEnv)}\n`);
    }
};
