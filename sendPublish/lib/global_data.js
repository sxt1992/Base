/* eslint-disable max-len */
'use strict';

const path = require('path');

const PROJECT_ROOT = process.cwd();
const PACKAGE_JSON_PATH = path.resolve(PROJECT_ROOT, 'package.json');
const PROJECT_CONFIG_PATH = path.resolve(PROJECT_ROOT, 'config/project.config.js');

const packageJsonContent = require(PACKAGE_JSON_PATH);

let projectConfigContent = {};
try {
    // organization 字段如果没有定义，默认为 souche；也可以显示定义 organization: souche
    projectConfigContent = require(PROJECT_CONFIG_PATH);
} catch (e) {
}

let REPO_BASE_URL = 'https://repo.souche-inc.com/repository/raw-packages/f2e';
if (projectConfigContent.organization) {
    REPO_BASE_URL = REPO_BASE_URL + `/${projectConfigContent.organization}`;
}

const distFolderName = projectConfigContent.publishSourceFolder || 'dist';
const DIST_FOLDER = path.resolve(PROJECT_ROOT, distFolderName);
const SERVER_RELATIVE_PATH = projectConfigContent.serverRelativePath || `${projectConfigContent.department}/${projectConfigContent.name}`;
const GZ_FOLDER_NAME = SERVER_RELATIVE_PATH.replace(/\//g, '-') + '-' + packageJsonContent.version;
const GZ_FILES_FOLDER = path.resolve(PROJECT_ROOT, GZ_FOLDER_NAME);
const META_JSON = path.resolve(GZ_FILES_FOLDER, 'meta.json');
const TAR_COMMAND = path.resolve(__dirname, '../tar');

const GZ_FILENAME = `${GZ_FOLDER_NAME}.zip`;
const GZ_FULL_FILENAME = path.resolve(PROJECT_ROOT, GZ_FILENAME);

// TODO 判断是否是在项目的根目录

module.exports = {
    defaultCallback: function () {
        console.log('default callback function');
    },
    organization: projectConfigContent.organization || '',
    PROJECT_ROOT: PROJECT_ROOT,
    DIST_FOLDER: DIST_FOLDER,
    PACKAGE_JSON_PATH: PACKAGE_JSON_PATH,
    PROJECT_CONFIG_PATH: PROJECT_CONFIG_PATH,
    META_JSON: META_JSON,
    REPO_BASE_URL: REPO_BASE_URL,
    GZ_FILES_FOLDER: GZ_FILES_FOLDER,
    GZ_FOLDER_NAME: GZ_FOLDER_NAME,
    GZ_FILENAME: GZ_FILENAME,
    GZ_FULL_FILENAME: GZ_FULL_FILENAME,
    TAR_COMMAND: TAR_COMMAND,
    SERVER_RELATIVE_PATH: SERVER_RELATIVE_PATH
};
