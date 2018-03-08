'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

module.exports = {
    fix: function () {
        const newFolder = path.resolve(process.cwd(), 'config');
        const newConfigFile = path.resolve(newFolder, 'project.config.js');
        const oldConfigFile = path.resolve(process.cwd(), 'project.config.js');

        const oldConfig = require(oldConfigFile);

        execSync(`mkdir -p ${newFolder}`);

        const newConfig = 'module.exports = {\n' +
            `    department: '${oldConfig.department}',\n` +
            `    name: '${oldConfig.project}',\n` +
            '    publishSourceFolder: \'.dist\'\n' +
            '};';

        fs.writeFileSync(newConfigFile, newConfig);
    }
};
