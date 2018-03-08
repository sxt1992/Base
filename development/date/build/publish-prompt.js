require('./check-versions')();
require('shelljs/global');

var inquirer = require('inquirer');
var chalk = require('chalk');

inquirer.prompt([{
    name: 'env',
    message: '请选择发布环境',
    type: 'list',
    default: 'dev',
    choices: [{
        name: '发布到测试环境',
        value: 'dev'
    }, {
        name: '发布到预发环境',
        value: 'prepub'
    }, {
        name: '发布到线上环境',
        value: 'prod'
    }]
}]).then(function (answers) {
    var buildCmd = `BUILD_ENV="${answers.env}" NODE_ENV="production" node build/build.js`;
    var publishCmd = 'make publish-' + answers.env;

    console.log(chalk.yellow('\n   正在编译...\n'));

    if (exec(buildCmd).code !== 0) {
        console.log(chalk.red('\n   编译失败...\n'));
        process.exit(1);
    }

    console.log(chalk.yellow('\n   正在发布...\n'));

    if (exec(publishCmd).code !== 0) {
        console.log(chalk.red('\n   发布失败...\n'));
        process.exit(2);
    }

    console.log(chalk.green('\n   发布完成...\n'));
    process.exit(0);
});
