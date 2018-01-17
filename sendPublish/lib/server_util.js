'use strict';

// TODO

const globalData = require('./global_data.js');
const distUtil = require('./dist_util.js');

const ENV_HOST_MAP = {
    stable: 'http://f2e.dasouche.net',
    dev: 'http://f2e.souche.com',
    dev1: 'http://f2e-dev1.souche.com',
    dev2: 'http://f2e-dev2.souche.com',
    dev3: 'http://f2e-dev3.souche.com',
    dev4: 'http://f2e-dev4.souche.com',
    devqa: 'http://f2e-qa.souche.com',
    devqb: 'http://f2e-qb.souche.com',
    devqc: 'http://f2e-qc.souche.com',
    devqd: 'http://f2e-qd.souche.com',
    devqe: 'http://f2e-qe.souche.com',
    prepub: 'http://f2e.prepub.souche.com',
    prod: 'https://f2e-assets.souche.com'
};

/**
 * 默认是环境作为【目录】，有些可能目录名称可能和环境名称不一致
 */
const ENV_FOLDER_MAP = {
    stable: 'dev-stable'
};

// 内网ip: 10.165.13.29
module.exports = {
    remoteSever: 'scdev@115.29.202.141',
    serverBasePath: 'souche-f2e/projects',

    /**
     * 根据环境获取路径名称
     */
    getPath (env) {
        return ENV_FOLDER_MAP[env] || env;
    },
    getUrlFromEnv (env) {
        const htmls = distUtil.getHtmlNames();
        return htmls.map(html => `${ENV_HOST_MAP[env]}/projects/${globalData.SERVER_RELATIVE_PATH}/${html}`);
    },
    getAssetsPath: function (env) {
        /**
         * 三方公司或子公司的项目，每个公司对应 vip 下的一个文件夹，公司文件夹下存放各种前端项目
         * 
         * 这种项目部署在外部服务器，与 souche 的前端项目在不同的服务器上
         */
        if (globalData.organization && globalData.organization !== 'souche') {
            return `/home/scdev/vip/${globalData.organization}/${globalData.SERVER_RELATIVE_PATH}`;
        }

        const envPath = this.getPath(env);

        return `/home/scdev/${envPath}/${this.serverBasePath}/${globalData.SERVER_RELATIVE_PATH}`;
    }
};
