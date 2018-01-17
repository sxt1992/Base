'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const url = require('url');

/**
 * 1. 通过 url 判断发布的 path
 * 2. 取 project.confjg.js 的内容，serverRelativePath，或者 department,name 进行判断
 * 3.
 */
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
    validate (urlStr) {
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

        const pathFromUrl = this.getPathFromUrl(urlStr);
        const pathFromLocal = this.getPathFromLocal(f);

        if (pathFromLocal && pathFromUrl) {
            console.log(`pathFromUrl: ${pathFromUrl}`);
            console.log(`pathFromLocal: ${pathFromLocal}\n`);
        }

        if (!pathFromLocal) {
            return false;
        }

        if (pathFromUrl !== pathFromLocal) {
            console.log('文件内容不符合发布要求: \n');
            console.log(`./config/project.config.js: \n${fContent}\n`);

            return false;
        }

        return true;
    },

    /**
     * 从 url 中获取发布路径
     */
    getPathFromUrl (urlStr) {
        let pathStr = urlStr;
        if (urlStr.indexOf('http') === -1) {
            urlStr = 'http://' + urlStr;
        }

        pathStr = url.parse(urlStr).pathname.replace('/projects/', '');
        if (/\/.+\.html$/.test(pathStr)) {
            pathStr = pathStr.replace(/(\/[^/]+\.html$)/, '');
        }

        return pathStr;
    },

    /**
     * 从 project.config.js 中获取发布路径
     */
    getPathFromLocal (f) {
        const departmentNamePath = (f.department && f.name) ? `${f.department}/${f.name}` : '';     // eslint-disable-line

        if (!f.department && !f.name && !f.serverRelativePath) {
            this.showPossiblePath();
        }

        let pathFromLocal = f.serverRelativePath || departmentNamePath || '';

        if (pathFromLocal[pathFromLocal.length - 1] === '/') {
            pathFromLocal = pathFromLocal.substring(0, pathFromLocal.length - 1);
        }

        return pathFromLocal;
    },

    /**
     * 显示可能的发布路径
     */
    showPossiblePath () {
        const searchResult = this.getSearchResults();
        const re = /\/home\/(souche|scdev)\/(dev|prepub|online)\/souche-f2e\/projects\/(.+)/;

        console.log(`project.config.js 配置中 serverRelativePath 的值可能是：${searchResult.match(re)[3]}\n\n`);
    }
};
