module.exports = {
    root: true,
    plugins: [    // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        'html'
    ],
    extends: 'airbnb-base',
    rules: {
        // allow extraneous-dependencies
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/no-dynamic-require': 0
    },
    env: { // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        browser: true, // browser global variables.
        node: true, // Node.js global variables and Node.js scoping.
        worker: true, // web workers global variables.
        mocha: true, // adds all of the Mocha testing global variables.
        phantomjs: true, // PhantomJS global variables.
        serviceworker: true // Service Worker global variables.
    }
};
