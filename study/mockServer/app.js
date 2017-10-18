let express = require('express');
let mockData = require('./mockData.js');
/*
{
  flag: true,
  errCode: 0,
  msg: '',
  data: item.d()
}
*/
let app = express();

// 允许跨域
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json;charset=utf-8');
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
let server = app.listen(9290, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
