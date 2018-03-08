'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

module.exports = {
    searchResult: '',

    /**
     * 遍历文件夹，获取发布相关的信息
     */
    getSearchResults () {
        if (!this.searchResult) {
            this.searchResult = execSync('grep -rin "/home/souche" ./*', { encoding: 'utf8' });

            return this.searchResult;
        }

        return this.searchResult;
    },

    /**
     * 检查是否已经存在了 project.config.js 文件
     */
    checkOldProjectConfig () {
        console.log(`searchContent: \n${this.getSearchResults()}\n`);

        const filePath = path.resolve(process.cwd(), './config/project.config.js');
        let fContent = '';
        let f = {};

        try {
            fContent = fs.readFileSync(filePath, { encoding: 'utf8' });
            f = require(filePath);
        } catch (e) {
            console.log('project.config.js file not exist: \n');
            return false;
        }

        const pathFromLocal = this.getPathFromLocal(f);
        const pathFromSearchResults = this.getPathFromSearchResults();

        try {
            if (pathFromLocal !== pathFromSearchResults) {
                console.log('文件内容不符合发布要求: ');
                console.log(`pathFromLocal: ${pathFromLocal}`);
                console.log(`pathFromSearchResults: ${pathFromSearchResults}`);
                console.log(`./config/project.config.js: \n\n${fContent}\n\n`);

                return false;
            }

            return true;
        } catch (e) {
            console.log('project.config.js file not exist: \n');
            return false;
        }
    },

    getPathFromLocal (f) {
        const departmentNamePath = (f.department && f.name) ? `${f.department}/${f.name}` : '';     // eslint-disable-line

        let pathFromLocal = f.serverRelativePath || departmentNamePath || '';

        if (pathFromLocal[pathFromLocal.length - 1] === '/') {
            pathFromLocal = pathFromLocal.substring(0, pathFromLocal.length - 1);
        }

        return pathFromLocal;
    },

    getPathFromSearchResults () {
        const searchResult = this.getSearchResults();
        const re = /\/home\/(souche|scdev)\/(dev|prepub|online)\/souche-f2e\/projects\/(.+)/;

        return searchResult.match(re)[3];
    }
};
