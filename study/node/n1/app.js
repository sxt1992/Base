var reqData=require("./reqData.js");
var http = require('http'),
	fs=require('fs'),
    httpProxy = require('http-proxy');

httpProxy.createServer({
  target: {
    host: 'kyfw.12306.cn',
    port: 80
  },
  ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  }
}).listen(8000);