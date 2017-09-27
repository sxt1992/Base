module.exports = {
  projectTemplate: 'souche:souche-vue/project-template#2.0',
  noEscape: true,
  department: 'dafengche',
  name: 'sales-contract-printing',
  description: '销售合同打印',
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
  port: 8080,
  vuex: false,
  router: true,
  hash: false,
  destDirName: 'dafengche-sales-contract-printing',
  autoOpenBrowser: true,
};
