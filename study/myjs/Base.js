(function(window,undefined){
	var $={
		AUTHOR:"TaoXuejiao",
		DATE:"2016/03/26",
		NAME:"$tx",
		VERSION:"1.1"
	};
	var typeObj=(function(){
		var obj={};
		var typeStrs=["Boolean","Number","String","Function","Array","Date","RegExp","Object"];
		for(var i=0 ; i<typeStrs.length ; i++) obj["[object " + typeStrs[i] + "]"] = typeStrs[i].toLowerCase();
		return obj;
	})();
	$.type=function(obj){
		return obj == null ? String(obj) : typeObj[Object.prototype.toString.call(obj)] || "object";
	};
	$.trim=function(str){
		return str.replace(/(^\s+)|(\s+$)/g,"");
	};
	/*
		Y	4位数字年，y为2位数字，如99即1999年
		m	数字月份，前面有前导0，如01。n 为无前导0数字月份
		F	月份，完整的文本格式，例如 January 或者 March
		M	三个字母缩写表示的月份，例如 Jan 或者 Mar
		d	月份中的第几天，前面有前导0，如03。j 为无前导0的天数
		w	星期中的第几天，以数字表示，0表示星期天
		H	24小时格式，有前导0，h为12小时格式
		G	24小时格式，无前导0，g为对应12小时格式
		i	分钟格式，有前导0
		s	秒格式，有前导0
		A	大写上下午，如AM，a为小写
	*/
	$.dateFormat=function (dateOrDatestr,fmt) {
		var lh,t=new Date(dateOrDatestr),
		Farrs=["January","February","March","April","May","June","July","August","September","October","November","December"],
		FarrsShort=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		if($.type(t)!='date'||isNaN(t.getTime())) t = new Date();
		if($.type(fmt)!="string") fmt="Y-m-d H:i:s";
	    var obj = {
	        "Y" : t.getFullYear(),
			"m" : t.getMonth()<9?"0"+(t.getMonth()+1):(t.getMonth()+1),
			"n" : t.getMonth()+1,
			"F" : Farrs[t.getMonth()],
			"M" : FarrsShort[t.getMonth()],
			"d" : t.getDate()<10?"0"+t.getDate():t.getDate(),
			"j" : t.getDate(),
			"w" : t.getDay(),
			"H" : t.getHours()<10?"0"+t.getHours():t.getHours(),
			"h" : (lh=(t.getHours()>11?t.getHours()-12:t.getHours()))<10?"0"+lh:lh,
			"G" : t.getHours(),
			"g" : t.getHours()>11?t.getHours()-12:t.getHours(),
			"i" : t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),
			"s" : t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds(),
			"A" : t.getHours()<12?"AM":"PM",
			"a" : t.getHours()<12?"am":"pm"
	    };
	    $.each(obj,function(k,v){
	    	fmt=fmt.replace(k,v);
	    });
	    return fmt;
	};
	$.each=function(object, callback, args) {
	    var name, i = 0,
	    length = object.length,
	    isObj = length === undefined || $.type(object)=="function";
	    if (args) {
	        if (isObj) {
	            for (name in object) {
	                if (callback.apply(object[name], args) === false) {
	                    break;
	                }
	            }
	        } else {
	            for (; i < length;) {
	                if (callback.apply(object[i++], args) === false) {
	                    break;
	                }
	            }
	        }
	    } else {
	        if (isObj) {
	            for (name in object) {
	                if (callback.call(object[name], name, object[name]) === false) {
	                    break;
	                }
	            }
	        } else {
	            for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
	        }
	    }
	    return object;
	};
	$.browser = {
		browser: navigator.userAgent.toLowerCase(),
		version: (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
		safari: /webkit/i.test(navigator.userAgent.toLowerCase()) && !(/chrome/i.test(navigator.userAgent.toLowerCase()) && /webkit/i.test(navigator.userAgent.toLowerCase()) && /mozilla/i.test(navigator.userAgent.toLowerCase())),
		opera: /opera/i.test(navigator.userAgent.toLowerCase()),
		firefox: /firefox/i.test(navigator.userAgent.toLowerCase()),
		ie: /msie/i.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase()),
		mozilla: /mozilla/i.test(navigator.userAgent.toLowerCase()) && !/(compatible|webkit)/.test(navigator.userAgent.toLowerCase()) && !(/chrome/i.test(navigator.userAgent.toLowerCase()) && /webkit/i.test(navigator.userAgent.toLowerCase()) && /mozilla/i.test(navigator.userAgent.toLowerCase())),
		chrome: /chrome/i.test(navigator.userAgent.toLowerCase()) && /webkit/i.test(navigator.userAgent.toLowerCase()) && /mozilla/i.test(navigator.userAgent.toLowerCase())
	};
	window.$tx=$;
})(window);

var $taot=$tx.dateFormat("fdsafds","Y-m-d H:i:s");
console.log($taot);
