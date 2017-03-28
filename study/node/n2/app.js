var http=require('http');
var querystring=require('querystring');

var postData=querystring.stringify({
	content:'测试一下,哈032901哈',
	cid:348
});

var options={
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=015cb288-35bd-437c-b4c7-b368d8cea6b9; imooc_isnew_ct=1478416642; loginstate=1; apsid=liZTcyM2NlZDgyYTVjMTA2NzcwNjk1NjM4NzI1MDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjI3NTQwNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5Mzk0NzQyNjhAcXEuY29tAAAAAAAAAAAAAAAAAAAAADgxMzcyNTMwNTU2ZDRlODQzOGEzYjU5MWU4YzQxODEwN9DTWDfQ01g%3DNj; last_login_username=939474268%40qq.com; PHPSESSID=7ltdodgq5fnk6bghomepdrmeo2; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1490276370,1490368007,1490628266,1490709098; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1490715842; IMCDNS=0; imooc_isnew=2; cvde=58da6a67ce6d5-68',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
};

var req=http.request(options,function(res){
	console.log("Status: "+res.statusCode);
	console.log("headers: "+JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end',function(){
		console.log("评论完毕!");
	});

}).on('error',function(e){
	console.log("ErrorTao: "+e.message);
});
req.write(postData);
req.end();