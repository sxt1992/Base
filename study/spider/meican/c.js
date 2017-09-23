let api = require('./tHttp');

api.post('https://kyfw.12306.cn/passport/captcha/captcha-check', {
    answer:'60,60,100,100',
    login_site: 'E',
    rand:'sjrand'
}).then((d) => {
    console.log(d);
});