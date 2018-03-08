require('./check-versions')();
require('shelljs/global');

var inquirer = require('inquirer');
var chalk = require('chalk');
var moment = require('moment');

exec('git fetch --tag', {silent: true});
var result = exec('git tag --format="%(refname:strip=2) (%(taggerdate))" --sort=taggerdate', {silent: true});

if (result.code !== 0) {
    console.log(chalk.red('\n   获取 tag 信息失败...\n'));
    process.exit(1);
}

/**
 * 从命令行中提取 tags 以及 tag 时间
 */
var tags = result.stdout.split('\n').map(function (item) {
    var match = item.match(/([\w\d.]+) \((.+)\)/);

    if (!match) {
        return;
    }

    var tag = match[1];
    var time = moment(Date.parse(match[2])).format('YYYY-MM-DD HH:mm');

    return {
        name: `${tag}\t(${time})`,
        value: tag
    };
}).filter(item => item).reverse().slice(0, 5);

/**
 * 没有打过 tag 的情况
 */
if (!tags.length) {
    console.log(chalk.yellow('\n   无可用的回滚版本...\n'));
    process.exit(0);
}

inquirer.prompt([{
    name: 'tag',
    message: '请选要回滚到的版本：',
    type: 'list',
    default: '',
    choices: tags
}]).then(function (answers) {
    var tag = answers.tag;

    inquirer.prompt({
        name: 'fire',
        type: 'confirm',
        message: '确认是否要回滚到 ' + answers.tag + ' 版本并发布到线上',
        default: false
    }).then(function(answers) {
        if (!answers.fire) {
            console.log(chalk.green('\n   取消回滚...\n'));
            process.exit(0);
        }

        if (!exec('git status --porcelain', {silent: true}).stdout) {
            console.log(chalk.red('\n   项目中有未提交的内容，请提交修改内容后重新执行命令...\n'));
            process.exit(2);
        }

        if (exec('git checkout ' + tag, {silent: true}).code !== 0) {
            console.log('\n');
            process.exit(3);
        }

        if (exec('BUILD_ENV="prod" NODE_ENV="production" node build/build.js').code !== 0) {
            console.log(chalk.red('\n   编译失败...\n'));
            process.exit(4);
        }

        console.log(chalk.yellow('\n   正在发布...\n'));

        if (exec('make publish-prod', {silent: false}).code !== 0) {
            console.log(chalk.red('\n   发布失败...\n'));
            process.exit(5);
        }

        exec('git checkout master', {silent: true});
        console.log(chalk.green('\n   发布完成...\n'));
        process.exit(0);
    });
});
