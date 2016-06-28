String.prototype.trim= function(){
	return this.replace(/^\s*|\s*$/g,"");
};
String.prototype.queryToObj=function(){
	var qObj={},
		start=this.indexOf("?")==-1?this.length:this.indexOf("?"),
		queryStr=this.substring(start+1),
		queryArr=queryStr.split("&");

	for(var i=0;i<queryArr.length;i++){
		var k=queryArr[i].indexOf("=");
		if(k==-1)continue;
		var key=queryArr[i].substring(0,k);
		var value=queryArr[i].substring(k+1);
		qObj[key]=value;
	}
	return qObj;
};
///^[^?]*\?(.*)#[^#]*$/g.exec("http://www.jb51.net/article/58356.htm?tao=123&xue=jiao#hxt=789")
//nodejs中 确认queryString转字符串
function qsPars(qs,sep,eq){
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};
    if (!(typeof qs=="string") || qs.length === 0) {
        return obj;
    }
    var regexp = /\+/g;
    qs = qs.split(sep);
    var len = qs.length;
    for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp,'%20'),
            idx = x.indexOf(eq),
            kstr,
            vstr,
            k,
            v;
        if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
        } else {
            kstr = x;
            vstr = '';
        }
        try {
            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);
        } catch (e) {
            k = QueryString.unescape(kstr, true);
            v = QueryString.unescape(vstr, true);
        }
        if (!obj.hasOwnProperty(k)) {
            obj[k] = v;
        } else if (Object.prototype.toString.call(obj[k])=="[object Array]") {
            obj[k].push(v);
        } else {
            obj[k] = [obj[k], v];
        }
    }
    return obj;
};

//按拼音搜索
sosuo={
    pushData:function(rest){
        var Fw = $.getFirstPinyin; //将每个字符变为首字母
        this.fans=rest.data.content;

        for(var i=0;i<this.fans.length;i++){
            var pyname=Fw(this.fans[i]["nickname"]);
            var w=pyname.charAt(0);
            //格式为 fobjs=[{w:'A',ind:0,pyname:"Aao"},{w:'T',ind:0,pyname:"tao"}];
            this.fobjs.push({'w':w,'ind':i,'pyname':pyname});
        }
        
    },
    searchFans:function(str){
        if(!this.fobjs)return;
        if(!str) str=".";
        str=str.replace(/\s*/g,"");

        if(!str) str=".";
        
        var temp=str.match(/./g);
        var reg=new RegExp(temp.join(".*"),'i');

        var dFans={};
        for(var i=0;i<this.fobjs.length;i++){
            if(reg.test(this.fobjs[i].pyname)){
                if(!dFans[this.fobjs[i].w]){
                    dFans[this.fobjs[i].w]=[];
                }
                //格式为 fans={"A":[1,2,3],"B":[1,2,3]};
                dFans[this.fobjs[i].w].push(this.fobjs[i].ind);
            }
        }
        this.drawFansHtml(dFans);
    }
};