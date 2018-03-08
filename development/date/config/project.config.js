module.exports = {
    projectTemplate: 'souche:souche-vue/project-template#2.0',
    noEscape: true,
    department: 'dafengche',
    name: 'moBanYanJiu',
    description: 'jiao shou jia',
    author: 'taoxuejiao <taoxuejiao@souche.com>',
    singlePage: true,
    /*
     * 多页面的应用，要在 multiPageNames 里配置每个页面的名称, eg:
     *
     *    multiPageNames: [ 'list', 'detail' ]
     *
     * 然后需要在 src/pages 目录下创建同名文件
     */
    multiPageNames: [],
    build: 'standalone',
    unit: false,
    e2e: false,
    port: 9290,
    vuex: true,
    router: true,
    hash: false,
    destDirName: 'dafengche-moBanYanJiu',
    autoOpenBrowser: true
};
