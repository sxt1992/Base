'use strict';

const execSync = require('child_process').execSync;

const async = require('async');

const globalData = require('../global_data.js');
const checkVersion = require('../check_version.js');
const distUtil = require('../dist_util.js');
const generateMeta = require('./generate_meta.js');
const compressDist = require('./compress_dist.js');
const uploadTarball = require('./upload_tarball.js');

module.exports = {
    publish: function () {
        async.waterfall([
            function (next) {
                checkVersion.run(next);
            },
            function (next) {
                distUtil.checkAsync(next);
            },
            function (next) {
                generateMeta.run(next);
            },
            function (next) {
                compressDist.run(next);
            },
            function (next) {
                uploadTarball.run(next);
            }
        ], function (err) {
            if (err) {
                console.log(err.stack, '\n');

                execSync(`rm -rf ${globalData.GZ_FILES_FOLDER}`);

                process.exit(1);
            }

            const filename = uploadTarball.getRepoPathName();
            console.log('🚀  上传成功\n');
            console.log(`🗂  存档名：${filename}\n`);
        });
    }
};
