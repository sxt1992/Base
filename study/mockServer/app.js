const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

let mockData = require('./mockData.js');

const ajax = (url, method, qs = {}, form = {}) => new Promise(function(resolve, reject) {
    request({
        url: `http://test.guanghui.dasouche.net${url}`,
        method,
        qs,
        form
    }, function(error, res, body) {
        if (!error && (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode == 304)) {
            resolve(body);
        } else {
            reject(body);
        }
    });
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multiparty());

/*
{
  flag: true,
  errCode: 0,
  msg: '',
  data: item.d()
}
*/

// 允许跨域
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json;charset=utf-8');

    // ajax(req.url, req.method, req.query , req.body).then(d => {
    //     res.end(d);
    //     next();
    // }).catch(err => next());

    next();
});

mockData.forEach(item => {
  let {m: method = 'all'} = item;
  app[method](item.u, (req, res) => {
      res.send(JSON.stringify({
        success: true,
        data: item.d(),
        errMsg: '',
        msg: '',
        status: '200'
      }));
  });
});

app.all('*', function(req, res){
    res.send(JSON.stringify({success: false, status: '-1', errMsg: '接口不存在', msg: '接口不存在', data: {}}));
});
const server = app.listen(9290, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
