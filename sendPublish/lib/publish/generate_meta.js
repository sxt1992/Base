'use strict';

/**
 * 生成 meta.json 文件
 */

const execSync = require('child_process').execSync;
const fs = require('fs');

const git = require('git-rev-sync');

const globalData = require('../global_data.js');
const envUtil = require('../env_util.js');
const pkg = require(globalData.PACKAGE_JSON_PATH);

const VERSION_ERROR_MESSAGE = `
    版本格式不正确，请确保：

    * 测试环境版本号格式：x.x.x-beta.x
    * 预发环境版本号格式：x.x.x-rc.x
    * 线上环境版本号格式：x.x.x`;

module.exports = {
    meta: {},
    run: function (done) {
        done = done || globalData.defaultCallback;

        try {
            if (!this._checkVersion()) {
                return done(new Error(VERSION_ERROR_MESSAGE));
            }
            this._generateMetaJson();
            return done();
        } catch (e) {
            return done(new Error('生成 Meta 文件出错'));
        }
    },

    _checkVersion () {
        const env = envUtil.getBuildEnv();

        if (env === 'dev' && /^\d+\.\d+\.\d+-beta\.\d+$/.test(pkg.version) === false) {
            return false;
        }

        if (env === 'prepub' && /^\d+\.\d+\.\d+-rc\.\d+$/.test(pkg.version) === false) {
            return false;
        }

        if (env === 'prod' && /^\d+\.\d+\.\d+$/.test(pkg.version) === false) {
            return false;
        }

        return true;
    },

    _getNpmVersion () {
        let npmVersion = execSync('npm --version', { encoding: 'utf8' }) || '';
        npmVersion = npmVersion.replace(/[\n\t]/g, '');

        return npmVersion;
    },

    _getNodeVersion () {
        return process.version;
    },

    /**
     * 在 dist 下生成 meta.json 文件
     */
    _generateMetaJson () {
        // meta.json 所在的文件夹可能不存在，需要创建一下
        try {
            execSync(`mkdir -p ${globalData.GZ_FILES_FOLDER}`);
        } catch (e) {

        }

        /**
         * 1. node npm 版本
         * 2. dependencies 安装后具体的版本
         */
        // 这里估计要修改 make publish-${env} 命令内容
        this.meta.env = envUtil.getBuildEnv();
        this.meta.name = globalData.SERVER_RELATIVE_PATH.replace(/\//g, '-');
        this.meta.version = pkg.version;
        this.meta.commitId = git.long(globalData.PROJECT_ROOT);
        this.meta.nodeVersion = this._getNodeVersion();
        this.meta.npmVersion = this._getNpmVersion();
        this.meta.organization = globalData.organization;

        // basePath: /home/souche/${env}/souche-f2e/projects/
        this.meta.relativePath = globalData.SERVER_RELATIVE_PATH;

        const metaContent = JSON.stringify(this.meta, null, 4);
        fs.writeFileSync(globalData.META_JSON, metaContent);
    }
};
