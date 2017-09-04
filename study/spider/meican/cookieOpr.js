let fs = require('fs');
let cookieFile = './cookieFile.json';

let cookie = {};
if (global._cookie) {
    cookie = global._cookie;
}else {
    if (fs.existsSync(cookieFile) && !fs.statSync(cookieFile).isDirectory()) {
        try{
            cookie = JSON.parse(fs.readFileSync(cookieFile, 'utf-8'));
        }catch(e){}
    }
}
global._cookie = cookie;

let cookieParse = str => {
    let obj = {};
    (str + '').trim().split(';').forEach(function(value) {
        value = (value + '').trim();
        let index = value.indexOf('=');

        let k = value.substr(0, index).trim();
        let v = value.substr(index + 1).trim();

        obj[k] = v;
    });
    return obj;
};
let cookieStringify = () => {
    let arr = [];
    for (let prop in cookie) {
        arr.push(prop.trim() + '=' + String(cookie[prop]).trim());
    }
    return arr.join('; ');
};

module.exports = {
    cookie: () => cookieStringify(),
    setCookie: (k, v) => {
        if (k == null) return;
        if (v != null){
            cookie[k.trim()] = v.trim();
        } else {
            if (Array.isArray(k)) {
                k.forEach(function(value) {
                    value = (value + '').trim().split(';')[0].trim();
                    let index = value.indexOf('=');
                    
                    let k = value.substr(0, index).trim();
                    let v = value.substr(index + 1).trim();
                    cookie[k] = v;
                });
            }else if (typeof k === 'object') {
                Object.assign(cookie, k);
            }else if (typeof k === 'string') {
                Object.assign(cookie, cookieParse(k));
            }
        }
        fs.writeFileSync(cookieFile, JSON.stringify(cookie, null, 4));
    },
    getCookie: k => cookie[k.trim()],
    delCookie: k => delete(cookie[k.trim()]),
    clearCookie: () => { cookie = {} }
};