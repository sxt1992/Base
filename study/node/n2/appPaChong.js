var http=require('http');
var cheerio=require('cheerio');

var url='http://www.imooc.com/learn/348';

function filterChapters(html){
	var $=cheerio.load(html);
	var chapters=$('.chapter');

	var courseData=[];
	chapters.each(function(){
		var chapter=$(this);
		var strong=chapter.find('h3 strong')[0];
		var chapterTitle="";
		for(var i=0;i<strong.childNodes.length;i++){
			var sc=strong.childNodes[i];
			if(sc.nodeType==3){
				chapterTitle+=sc.nodeValue;
			}
		}
		chapterTitle=chapterTitle.replace(/^\s*|\s*$/g,"").replace(/\s+/g," ");

		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		};

		var videos=chapter.find(".video li");
		videos.each(function(){
			var video=$(this);
			var id=video.attr("data-media-id");
			var a=video.find("a");
			var url=a.attr("href");
			var title="";
			for(var i=0;i<a[0].childNodes.length;i++){
				var ac=a[0].childNodes[i];
				if(ac.nodeType==3){
					title+=ac.nodeValue;
				}
			}
			title=title.replace(/^\s*|\s*$/g,"").replace(/\s+/g," ");
			chapterData.videos.push({
				id:id,
				title:title,
				url:url
			});
		});
		courseData.push(chapterData);
	});
	printData(courseData);
}
function printData(courseData){
	courseData.forEach(function(item){
		var chapterTitle=item.chapterTitle;
		console.log(chapterTitle+"\n");
		item.videos.forEach(function(video){
			console.log('\t[ '+video.id+' ] ( '+video.url+' )  '+video.title+'\n');
		});
	});
}

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		filterChapters(html);
	});
}).on("error",function(){
	console.log("获取课程数据出错!");
});
/*http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World a1.js\nfffffffff');
}).listen(3000,'127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');*/
