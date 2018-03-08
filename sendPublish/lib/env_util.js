'use strict';

/**
 * 环境说明
 *      stable -- 小机房
 *      dev    -- 阿里云测试环境
 */

module.exports = {
    publishEnv: '',
    envs: [ 'stable', 'dev', 'dev1', 'dev2', 'dev3', 'dev4',
        'devqa', 'devqb', 'devqc', 'devqd', 'devqe', 'prepub', 'prod' ],
    rollingEnvs: [ 'stable', 'dev', 'dev1', 'dev2', 'dev3', 'dev4' ],
    semverEnvs: [ 'devqa', 'devqb', 'devqc', 'devqd', 'devqe', 'prepub', 'prod' ],
    validate: function (env) {
        if (this.envs.indexOf(env) === -1) {
            return false;
        }

        return true;
    },
    setPublishEnv: function (env) {
        this.publishEnv = env;
    },
    getPublishEnv: function () {
        return this.publishEnv;
    },
    getBuildEnv: function () {
        if (this.publishEnv.indexOf('dev') !== -1) {
            return 'dev';
        } else {
            return this.publishEnv;
        }
    }
};
