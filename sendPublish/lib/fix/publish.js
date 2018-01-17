'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const globalData = require('../global_data.js');
const validateProjectConfig = require('../validate/project_config.js');

module.exports = {
    fix: function () {
        const oldConfigStat = validateProjectConfig.checkOldProjectConfig();

        if (!oldConfigStat) {
            this.generateProjectConfig();
        }
    },

    /**
     * 生成新的 project.config.js 文件
     */
    generateProjectConfig () {
        const folderPath = path.resolve(process.cwd(), './config');
        const projectConfigPath = path.resolve(process.cwd(), './config/project.config.js');

        try {
            execSync(`mkdir -p ${folderPath}`, { encoding: 'utf8' });
        } catch (e) {

        }

        const projectConfiContent = 'module.exports = {\n' +
            `    serverRelativePath: '${globalData.SERVER_RELATIVE_PATH}'\n` +
            '};';
        try {
            fs.writeFileSync(projectConfigPath, projectConfiContent);
            console.log('生成 project.config.js 成功');
        } catch (e) {
            console.log('生成 project.config.js 失败，文件内容: \n');
            console.log(projectConfiContent);
        }
    }
};
