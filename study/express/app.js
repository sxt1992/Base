var express = require('express');
var birds = require('./birds');
var app = express();
// 静态文件
app.use('/static', express.static('./src/static'));
// 使用中间件
app.use('/birds', birds);

// http://localhost:3000/9s/fdf/65
app.get('/:haha/:id/:55/', function (req, res) {
	res.send('Hello World333!');
	let str = '';
	let i = 0;
	for(let prop in req) {
		if (prop.charAt(0) === '_') {
			continue;
		}
		i++ ;
		if (i%7 === 0) {
			str += '\n';
		}
		str += '\t' + prop;
	}
	console.log(str);
	console.log(req.params);
	// console.log(res);
});
// 中间件,可以处理子路径.. '/' 可以 处理 '/',   '/pfd',   '/d/d/y'
app.get('/example/b', function (req, res, next) {
	console.log('response will be sent by the next function ...: '+new Date().getTime());
	next();
  }, function (req, res) {
	res.send('Hello from B!: '+new Date().getTime());
  });

  
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});