var reqData=function(param){
	if(!param)return;
	var qs=require('querystring');
	var content=qs.stringify(param.data||{});
	var parse_u=require('url').parse(param.url,true);
	var isHttp=parse_u.protocol=='http:';
	var isPost=/^\s*post\s*$/i.test(param.method);
	var options={
	   host:parse_u.hostname,
	   port:parse_u.port||(isHttp?80:443),
	   path:parse_u.path
	};
	if(isPost){
		options.method='POST';
		options.headers={
		  'Content-Type':'application/x-www-form-urlencoded',
		  'Content-Length':content.length
		};
	}else{
		options.method='GET';
		var dObj=param.data||{};
		var qArr=[];
		for(var prop in dObj){
			var val=typeof dObj[prop]=="object"?qs.stringify(dObj[prop]):dObj[prop];
			qArr.push(prop+"="+val);
		}
		for(var prop in parse_u.query){
			var val=typeof parse_u.query[prop]=="object"?qs.stringify(parse_u.query[prop]):parse_u.query[prop];
			qArr.push(prop+"="+val);
		}
		options.path=parse_u.pathname+"?"+qArr.join("&");
	}
	var req = require(isHttp?'http':'https').request(options,function(res){
	  var _data='';
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	  res.on('end', function(){
	        param.success!=undefined && param.success(_data);
	   });
	});
	if(isPost){
		req.write(content);
	}
	req.end();
};
module.exports=reqData;
/*reqData({
	url:"http://pop.10jqka.com.cn/phoneinfo.php",
	method:"post",
	data:{
		codes:"002456",
		tp:"sc",
		start:"0",
		num:"3"
	},
	success:function(data){
		console.log(data);
	}
});
reqData({
	url:"http://61.144.241.195:8084/hexinifs/rs/dklc/portfolio/taportfilio",
	method:"get",
	data:{
		id:141
	},
	success:function(data){
		console.log(data);
	}
});*/