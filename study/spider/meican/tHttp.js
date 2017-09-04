let cookieOpr = require('./cookieOpr');

let http = require('http');
let https = require('https');
let url = require('url');

let rqUrl = (method, urlStr, param, succ) => new Promise(resolve => {

    let urlObj = url.parse(urlStr);
    let queryStr = urlObj.query == null ? '' : urlObj.query;

    let protocol = http;
    if(urlObj.protocol === 'https:') {
        protocol = https;
    }

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookieOpr.cookie()
    };

    if (method.toLowerCase() == 'get' && typeof param == 'object') {
        let arr = [];
        for (let prop in param) {
            arr.push( (prop+'').trim() + '=' + (param[prop]+'').trim() );
        }
        if (arr.length > 0) {
            queryStr += (queryStr.length < 1 ? '' : '&') + arr.join('&');
        }
    }

    let postData = '';

    if (method.toLowerCase() == 'post' && typeof param == 'object') {
        postData = JSON.stringify(param);
        headers['Content-Length'] = postData.length;
    }

    let req = protocol.request({
            method: method,
            host: urlObj.host,
            path: urlObj.pathname + (queryStr.length < 1 ? '' : '?') + queryStr,
            rejectUnauthorized: false,
            headers: headers
        }, function(res) {
            if (res.headers['set-cookie']) {
                cookieOpr.setCookie(res.headers['set-cookie']);
            }

            let resStr = '';
            res.on('data', function(data){
                resStr += data;
            });
            res.on('end', function() {
                let resObj = resStr;
                try{ resObj = JSON.parse(resStr);}catch(e){}
                resolve(succ ? succ(resObj) : resObj);
            });
    }).on('error', function(data) {
        console.log('获取源码数据出错: ');
        console.log(data);
    });

    if (method.toLowerCase() == 'post' && typeof param == 'object') {
        req.write(postData);
    }

    req.end();
});

module.exports = {
    get: (urlStr, param, succ) => rqUrl('get', urlStr, param, succ),
    post: (urlStr, param, succ) => rqUrl('post', urlStr, param, succ)
};