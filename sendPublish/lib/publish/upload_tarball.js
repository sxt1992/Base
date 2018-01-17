/* eslint-disable max-len */
'use strict';

const execSync = require('child_process').execSync;

const debug = require('debug')('lib/upload_tarball');
const semver = require('semver');

const globalData = require('../global_data.js');
const compressDist = require('./compress_dist.js');

const projectConfig = require(globalData.PROJECT_CONFIG_PATH);

module.exports = {
    run: function (done) {
        done = done || globalData.defaultCallback;

        try {
            // 如果远端已经存在同名文件，那禁止上传
            if (this._checkFileExist()) {
                compressDist.removeGzipFile();
                const filename = globalData.GZ_FILENAME;
                return done(new Error(`${filename} 已经存在或请求发生错误，请升级版本后重新发布`));
            }

            this._uploadGzFile();
            compressDist.removeGzipFile();
            return done();
        } catch (e) {
            return done(new Error('上传压缩包到 repo.souche-inc.com 失败'));
        }
    },

    _generateUploadUrl () {
        const filename = globalData.GZ_FILENAME;
        const uploadUrl = `${globalData.REPO_BASE_URL}/${filename}`;

        return uploadUrl;
    },

    /**
     * 获取在 repo.souche-inc.com 的 path 对应的值
     * @return {[type]} [description]
     */
    getRepoPathName () {
        const filename = globalData.GZ_FILENAME;
        return `f2e/${filename}`;
    },

    /**
     * 从 repo.souche-inc.com 上删除一个包，不过一般用不上
     */
    deleteUploadedFile (content) {
        if (semver.valid(content)) {
            this.deleteUploadedFileByVersion(content);
        } else {
            this.deleteUploadedFileByName(content);
        }
    },

    /**
     * 通过 repo.souche-inc.com/repository/raw-packages/${filename} 的 filename 删除
     *
     * 可以通过 [full url] 或 [f2e/xxx/xxx.tar.gz] 进行删除
     */
    deleteUploadedFileByName (filename) {
        filename = filename.replace(/^https?:\/\/repo.souche-inc.com\/repository\/raw-packages\//, '');

        // 防止输入的文件名开始处带有 '/'
        if (filename.indexOf('/f2e/') === 0) {
            filename = filename.substr(5);
        }

        // 如果 filename 带有 f2e/ 层级，去掉层级
        if (filename.indexOf('f2e/') === 0) {
            filename = filename.substr(4);
        }

        try {
            // 确保只会影响 raw-packages/f2e 下面的 gz 文件
            execSync(`curl -X DELETE --user sdev:7J48qUFA6m2E8uJx "${globalData.REPO_BASE_URL}/${filename}"`, { stdio: 'inherit' });
        } catch (e) {

        }
    },

    /**
     * 通过版本号删除 remote gz 文件，需要在项目根目录执行
     */
    deleteUploadedFileByVersion (version) {
        const name = globalData.SERVER_RELATIVE_PATH.replace(/\//g, '-');
        const filename = `${name}-${version}.tar.gz`;

        try {
            execSync(`curl -X DELETE --user sdev:7J48qUFA6m2E8uJx "${globalData.REPO_BASE_URL}/${filename}"`, { stdio: 'inherit' });
        } catch (e) {

        }
    },

    /**
     * 校验 repo.souche-inc.com 上是否存在同名文件
     */
    _checkFileExist () {
        const url = this._generateUploadUrl();
        const curlCmd = `curl -X HEAD -s --head --connect-timeout 5 ${url}`;
        let resp = '';

        try {
            debug(`校验 gz 包是否存在的请求 request：${curlCmd}`);
            resp = execSync(curlCmd, { encoding: 'utf8' });
            debug(`校验 gz 包是否存在的请求 response: \n${resp}`);
        } catch (e) {
            console.log('检查 gz 包是否存在请求失败或超时', e.stack);
            return true;
        }

        if (resp.indexOf('HTTP/1.1 200') !== -1) {
            return true;
        }

        return false;
    },

    /**
     * 上传 gz 文件
     */
    _uploadGzFile () {
        const filename = globalData.GZ_FILENAME;
        const uploadUrl = this._generateUploadUrl();
        const uploadCmd = `curl --user sdev:7J48qUFA6m2E8uJx --upload-file ${filename} ${uploadUrl}`;

        debug(`上传文件命令: ${uploadCmd}`);

        /**
         * repo.souche-inc.com 上传的请求格式
         *
         * curl --user sdev:xxx --upload-file xxx  https://repo.souche-inc.com/repository/raw-packages/xxx.tar.gz
         */
        execSync(`cd ${globalData.PROJECT_ROOT} && ${uploadCmd}`, { stdio: 'inherit' });
    }
};
