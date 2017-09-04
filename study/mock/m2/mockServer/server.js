/**
 * Created by Administrator on 2016/6/27 0027.
 */



var http = require('http');

var content = '▍if you see that,I陶雪焦陶雪焦陶雪焦陶雪焦陶雪焦t means you have get the correct data by backend server(mock data by nodejs server)!';

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/text'});
    res.end(content);
});

srv.listen(8888, function() {
    console.log('listening on localhost:8888');
});