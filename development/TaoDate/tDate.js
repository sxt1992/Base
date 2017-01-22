/**
 * 
 * @version 2.0 
 * @date 2014-9-29
 * @update 2017-1-22
 * @author taoxj1992@163.com
 *
*/

/**   
 *
 * Date tDate.js
 * @param   obj  The input object want to contain date.
 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM-dd".
 * @param   beginDate Default value is 1990-01-01
 * @param   toDate   Default value is 2020-01-01
 *
*/
(function(window){
	window.tDate=function(input,opt){
		if(typeof input=="string"){
			input=document.getElementById(input);
		}
		tao=input;
		input.readOnly=true;
		var iLeft=(function(e){
			var offset = e.offsetLeft;
			if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
			return offset;
		})(input);
		var iTop=(function(e){
			var offset = e.offsetTop;
			if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
			return offset;
		})(input);
		var iWith=input.offsetWidth;
		var iHeight=input.offsetHeight;

		var mh=/(\d{4})-(\d{1,2})-(\d{1,2})/g.exec(input.value);
		var showT=new Date();
		if(mh){
			showT=new Date(mh[1],mh[2]-1,mh[3]);
		}
		
		opt=opt||{};
		opt.fromDate=opt.fromDate||showT.getFullYear()-10;
		opt.toDate=opt.toDate||showT.getFullYear()+10;

		var ifr=document.getElementById("t-date-iframe");
		if(ifr){
			ifr.parentNode.removeChild(ifr);
		}
		var ifr=document.createElement("iframe");
		ifr.id="t-date-iframe";
		ifr.scrolling="no";
		ifr.frameBorder="0";
		ifr.width="280px";
		ifr.height="290px";
		ifr.style.position="absolute";
		ifr.style.top=(iTop+iHeight)+"px";
		ifr.style.left=iLeft+"px";

		document.body.appendChild(ifr);

		_date.init(input,ifr,opt.fromDate,opt.toDate,showT);
	};
	var _date={
		init:function(input,ifr,fromDate,toDate,initTime){
			this.input=input;
			this.ifr=ifr;
			this.win=null;
			this.doc=null;
			this.fillIframe(ifr,fromDate,toDate);
			var doc=this.doc;
			var f=function(n){return doc.getElementById(n);};

			this.yElem=f('cal-year');
			this.mElem=f('cal-month');
			this.dElem=f('cal-table');
			this.upMonth=f('leftlogo');
			this.downMonth=f('rightlogo');
			this.todayBtn=f('today');
			this.confirmBtn=f('okday');
			this.closeBtn=f('quitday');
			this.save={e:null,t:null};

			this.update(initTime);
			this.setSave(initTime);
			this.initEvent(this);
		},
		initEvent:function(that){
			var aH=that.addHandler;
			// 选择日期
			aH(that.dElem,"click",function(event){
				var elem=event.target;
				if(!elem.tagName.toLowerCase()=="td" || elem.className.indexOf("is-empty")>-1){
				  return;
				}
				if(that.save.e){
				  that.save.e.className="";
				}
				elem.className='is-select';
				var y=that.yElem,m=that.mElem;
				that.save={e:elem,t:new Date(y.options[y.selectedIndex].value,m.options[m.selectedIndex].value,+elem.innerHTML)};
			});
			// 确认
			aH(that.confirmBtn,"click",function(event){
				var t=that.save.t;
				var str=t.getFullYear()+"-";
				if(t.getMonth()<9){
				  str+="0";
				}
				str+=(t.getMonth()+1)+"-";
				if(t.getDate()<10){
				  str+="0";
				}
				str+=t.getDate();
				that.ifr.parentNode.removeChild(that.ifr);
				that.input.value=str;
			});
			// 今天
			aH(that.todayBtn,"click",function(event){
				var t=new Date();
				that.update(t);
				that.setSave(t);
			});
			// 关闭
			aH(that.closeBtn,"click",function(e){
				console.log("关闭");
			});
			// 上月
			aH(that.upMonth,"click",function(event){
				var y=that.yElem,m=that.mElem;
				var t=new Date(y.options[y.selectedIndex].value,m.options[m.selectedIndex].value-1);
				that.update(t);
			});
			// 下月
			aH(that.downMonth,"click",function(event){
				var y=that.yElem,m=that.mElem;
				var t=new Date(y.options[y.selectedIndex].value,+m.options[m.selectedIndex].value+1);
				that.update(t);
			});
			// 年份变化
			aH(that.yElem,"change",function(event){
				var y=that.yElem,m=that.mElem;
				var t=new Date(y.options[y.selectedIndex].value,m.options[m.selectedIndex].value);
				that.update(t);
			});
			// 月份变化
			aH(that.mElem,"change",function(event){
				var y=that.yElem,m=that.mElem;
				var t=new Date(y.options[y.selectedIndex].value,m.options[m.selectedIndex].value);
				that.update(t);
			});
		},
		fillIframe:function(ifr,fromDate,toDate){
			var yearStr="";
			for(var i=fromDate;i<=toDate;i++){
				yearStr+='<option value="'+i+'">'+i+'</option>';
			}
			var html1='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style type="text/css">';
			var css='body{margin:0;padding:0;}'+
					'.cal-box{width:240px;padding:8px;background:#f5f5f5;border:1px solid #ccc;box-shadow:0px 5px 15px -5px rgba(0, 0, 0, 0.5);}'+
					'.cal-head{height:35px;}'+
					'.cal-head .cal-month{float:left;width:81px;height:30px;margin-left:20px;overflow:hidden;}'+
					'.cal-head select{width:100px;height:30px;font:normal bold 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#333;border:none;outline:none;}'+
					'.cal-head option{font:normal normal 12px/12px "Helvetica Neue",Helvetica,Arial,sans-serif;}'+
					'.cal-head .cal-year{float:left;width:37px;height:30px;margin-left:20px;overflow:hidden;}'+
					'.cal-head .cal-year select{width:57px;}'+
					'.cal-head .leftlogo{display:block;float:left;width:20px;height:30px;opacity:0.5;cursor:pointer;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==");}'+
					'.cal-head .leftlogo:hover{opacity:1;}'+
					'.cal-head .rightlogo{display:block;float:right;width:20px;height:30px;opacity:0.5;cursor:pointer;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=");}'+
					'.cal-head .rightlogo:hover{opacity:1;}'+
					'#cal-table{width:238px;margin:auto;}'+
					'#cal-table table{width:238px;border-collapse:collapse;border-spacing:0;}'+
					'#cal-table tr:first-child{height:25px;}'+
					'#cal-table th{width:34px;height:25px;margin:0;padding:0;text-align:center;color:#999;font:normal bold 12px/25px "Helvetica Neue",Helvetica,Arial,sans-serif;cursor:default;}'+
					'#cal-table tr{width:238px;height:27px;}'+
					'#cal-table td{width:34px;height:27px;margin:0;padding:0;font:normal normal 12px/27px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#666;text-align:center;vertical-align:middle;border:none;cursor:pointer;}'+
					'#cal-table td:hover{color:#fff;background:#ff8000;box-shadow:none;border-radius:3px;}'+
					'#cal-table td.is-select{display:block;color:#fff;font-weight:bold;background:#3af;border-radius:3px;box-shadow:0px 1px 3px #178fe5 inset;}'+
					'#cal-table td.is-empty{background:none;border-radius:0;box-shadow:none;cursor:default;}'+
					'.cal-foot{font-size:0;margin-top:6px;}'+
					'.cal-foot span{display:inline-block;width:50px;height:20px;font:normal normal 12px/20px "microsoft yahei",arial;color:#fff;text-align:center;background:#5349c5;border-radius:3px;cursor:pointer;}'+
					'.cal-foot span:hover{color:#c6c633;background:#873687;}'+
					'.cal-foot span:active{color:#ff8000;background:#30b17a;}'+
					'.cal-foot .today{margin-left:10px;}'+
					'.cal-foot .okday{margin-left:35px;}'+
					'.cal-foot .quitday{float:right;margin-right:10px;}';
			var html2='</style></head><body><div class="cal-box" id="cal-box"><div class="cal-head"><em class="leftlogo" id="leftlogo"></em>'+
					'<div class="cal-month"><select name="cal-month" id="cal-month"><option value="0">January</option><option value="1">February</option><option value="2">March</option><option value="3">April</option><option value="4">May</option><option value="5">June</option><option value="6">July</option><option value="7">August</option><option value="8">September</option><option value="9">October</option><option value="10">November</option><option value="11">December</option></select></div> '+
    				'<div class="cal-year"><select name="cal-year" id="cal-year">'+yearStr+'</select></div>'+
    				'<em class="rightlogo" id="rightlogo"></em></div><div id="cal-table"></div>'+
    				'<div class="cal-foot"><span class="quitday" id="quitday">Close</span><span class="today" id="today">Today</span><span class="okday" id="okday">Confirm</span></div></div></body></html>';
    		this.win=ifr.contentWindow;
			this.doc=ifr.contentDocument||ifr.contentWindow.document;

			this.doc.writeln(html1+css+html2);
			this.doc.close();
		},
		update:function(t){ // 设置
			if(typeof t!="object"){
		      t=new Date();
		    }
		    // 年
		    for(var i=0;i<this.yElem.options.length;i++){
		      if(this.yElem.options[i].value==t.getFullYear()){
		        this.yElem.options[i].selected=true;
		        break;
		      }
		    }
		    // 月
		    for(var i=0;i<this.mElem.options.length;i++){  
		      if(this.mElem.options[i].value == t.getMonth()){  
		        this.mElem.options[i].selected=true;  
		        break;  
		      }  
		    }
		    // 日
		    var dayStr="<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>";
		    var thisMonth=new Date(t.getFullYear(),t.getMonth());
		    var nextMonth=new Date(t.getFullYear(),t.getMonth()+1);
		    var monthDays=Math.round((nextMonth-thisMonth)/(24*60*60*1000));
		    var startDay=thisMonth.getDay();
		    for(var i=0;i<startDay;i++){
		      dayStr+='<td class="is-empty"></td>';
		    }
		    for(var i=1;i<=monthDays;i++){
		      if(i!=1 || startDay!=0){
		        if((i-1+startDay)%7==0){
		          dayStr+='</tr><tr>';
		        }
		      }
		      dayStr+='<td>'+i+'</td>';
		    }
		    var lastLen=(7-(startDay+monthDays)%7)%7;
		    for(var i=0;i<lastLen;i++){
		      dayStr+='<td class="is-empty"></td>';
		    }
		    dayStr+='</tr></table>';
		    this.dElem.innerHTML=dayStr;
		},
		setSave:function(t){
			var tds=this.dElem.getElementsByTagName("td");
			for(var i=0;i<tds.length;i++){
				if(tds[i].className.indexOf("is-empty")>-1){
				  continue;
				}
				var d=+tds[i].innerHTML;
				if(d==t.getDate()){
				  tds[i].className="is-select";
				  this.save={e:tds[i],t:t};
				  break;
				}
			}
		},
		addHandler:function(elem,type,handler){
			var hFunc=function(event){
				event=event?event:window.event;
				event.target=event.target||event.srcElement;
				handler.call(this,event);
			};
			if(elem.addEventListener){
				elem.addEventListener(type,hFunc,false);
			}else if(elem.attachEvent){
				elem.attachEvent("on"+type,hFunc);
			}else{
				elem["on"+type]=hFunc;
			}
		}
	};
})(window);