/**
 * 
 * @version 1.0 
 * @date 2014-9-29
 * @author taoxj1992@163.com
 *
*/

/**   
 *
 * Date TaoDate.js
 * @param   obj  The input object want to contain date.
 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM-dd".
 * @param   beginDate Default value is 1990-01-01
 * @param   endDate   Default value is 2020-01-01
 *
*/
(function(window){
window.tDate=function(obj,dateFormatStyle,startDate,endDate){
	if(document.getElementById("calPanel")){
		document.body.removeChild(document.getElementById("calPanel"));
	}
	var panel=document.createElement("div");
	var myiframe=document.createElement("iframe");
	panel.id="calPanel";
	panel.style.width="264px";
	panel.style.height="284px";
	myiframe.scrolling="no";
	myiframe.frameBorder="0";
	myiframe.width="100%";
	myiframe.height="100%";
	panel.appendChild(myiframe);
	document.body.appendChild(panel);
/*----------------------------------------*/
String.prototype.toDate = function(format){
	if(null == format) format="yyyy-MM-dd";
	var pattern = format.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
		.replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
		.replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})").replace(/~1/g, "d");
	
	var returnDate;
	if (new RegExp(pattern).test(this)) {
	    var yPos = format.indexOf("yyyy");
	    var mPos = format.indexOf("MM");
	    var dPos = format.indexOf("dd");
	    if (mPos == -1) mPos = format.indexOf("M");
	    if (yPos == -1) yPos = format.indexOf("yy");
	    if (dPos == -1) dPos = format.indexOf("d");
	    var pos = new Array(yPos + "y", mPos + "m", dPos + "d");
	    var data = { y: 0, m: 0, d: 1};
	    var m = this.match(pattern);
	    for (var i = 1; i < m.length; i++) {
	        if (i == 0) return;
	        var flag = pos[i - 1].split('')[1];
	        data[flag] = m[i];
	    };
		
	    if (data.y.toString().length == 2) {
	        data.y = parseInt("20" + data.y);
	    }
	    data.m = data.m - 1;
	    returnDate = new Date(data.y, data.m, data.d);
	}
	if (returnDate == null || isNaN(returnDate)) returnDate = new Date();
	return returnDate;
};
/*----------------------------------------*/
	dateFormatStyle=dateFormatStyle||'yyyy-MM-dd';
	startDate=(typeof startDate!="undefined"?startDate:'1980-01-01').toDate();
	endDate=(typeof endDate!="undefined"?startDate:'2029-12-31').toDate();

	if(new Date(obj.value).getTime()<startDate.getTime()||obj.value.toDate().getTime()>endDate.getTime()){
		var temp="Must Between "+startDate.getFullYear()+"-";
			temp+=(startDate.getMonth()+1)+"-";
			temp+=startDate.getDate()+" And ";

			temp+=endDate.getFullYear()+"-";
			temp+=(endDate.getMonth()+1)+"-";
			temp+=endDate.getDate();
		alert(temp);
		return;
	}
	new TaoDate(panel,myiframe,obj,dateFormatStyle,startDate,endDate).showDate();
};

var TaoDate=function(panel,myiframe,nowObj,dateFormatStyle,startDate,endDate){
	this.panel=panel;
	this.myiframe=myiframe;
	this.nowObj=nowObj;
	this.dateFormatStyle=dateFormatStyle;
	this.startDate=startDate;
	this.endDate=endDate;

	var that=this;

	var yearStr="";
	for(var i=this.startDate.getFullYear();i<=this.endDate.getFullYear();i++){
		yearStr+="<option value='"+i+"'>"+i+"</option>";
	}
	
	var str1="<!doctype html><html lang='en'><head><meta charset='UTF-8'><style type='text/css'>";

	var css="body{margin:0;padding:0;}";
		css+=".cal-box{width:240px;padding:8px;background:#f5f5f5;border:1px solid #ccc;box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.5);}";
		css+=".cal-box .cal-head{height:35px;}";
		css+=".cal-box .cal-head .cal-month{float:left;width:81px;height:30px;margin-left:20px;background:red;overflow:hidden;}";
		css+=".cal-box .cal-head select{width:100px;height:30px;font:normal bold 14px/20px 'Helvetica Neue',Helvetica,Arial,sans-serif;color:#333;border:none;outline:none;}";
		css+=".cal-box .cal-head option{font:normal normal 12px/12px 'Helvetica Neue',Helvetica,Arial,sans-serif;}";
		css+=".cal-box .cal-head .cal-year{float:left;width:37px;height:30px;margin-left:20px;background:blue;overflow:hidden;}";
		css+=".cal-box .cal-head .cal-year select{width:57px;}";
		css+=".cal-box .cal-head .leftlogo{display:block;float:left;width:20px;height:30px;opacity:0.5;cursor:pointer;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');}";
		css+=".cal-box .cal-head .leftlogo:hover{opacity:1;}";
		css+=".cal-box .cal-head .rightlogo{display:block;float:right;width:20px;height:30px;opacity:0.5;cursor:pointer;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');}";
		css+=".cal-box .cal-head .rightlogo:hover{opacity:1;}";
		css+=".cal-box .cal-table{width:238px;margin:auto;}";
		css+=".cal-box .cal-table table{width:238px;border-collapse:collapse;border-spacing:0;}";
		css+=".cal-box .cal-table tr:first-child{height:25px;}";
		css+=".cal-box .cal-table th{width:34px;height:25px;margin:0;padding:0;text-align:center;color:#999;font:normal bold 12px/25px 'Helvetica Neue',Helvetica,Arial,sans-serif;cursor:default;}";
		css+=".cal-box .cal-table tr{width:238px;height:27px;}";
		css+=".cal-box .cal-table td{width:26px;height:27px;margin:0;padding:0 8px 0 0;font:normal normal 12px/27px 'Helvetica Neue',Helvetica,Arial,sans-serif;color:#666;text-align: right;border:none;cursor: pointer;}";
		css+=".cal-box .cal-table td:hover{color:#fff;background:#ff8000;box-shadow:none;border-radius:3px;}";
		css+=".cal-box .cal-table td.is-select{display:block;color:#fff;font-weight:bold;background:#3af;border-radius:3px;box-shadow:0px 1px 3px #178fe5 inset;}";
		css+=".cal-box .cal-table td.is-empty{background:none;border-radius:0;box-shadow:none;cursor:default;}";
		css+=".cal-foot{font-size:0;margin-top:14px;}";
		css+=".cal-foot span{display:inline-block;width:50px;height:20px;font:normal normal 12px/20px 'microsoft yahei',arial;color:#fff;text-align:center;background:#5349c5;border-radius:3px;cursor:pointer;}";
		css+=".cal-foot span:hover{color:#c6c633;background:#873687;}";
		css+=".cal-foot span:active{color:#ff8000;background:#30b17a;}";
		css+=".cal-foot .today{margin-left:10px;}";
		css+=".cal-foot .okday{margin-left:35px;}";
		css+=".cal-foot .quitday{float:right;margin-right:10px;}";

	var str2="</style></head><body><div class='cal-box' id='cal-box' style='display:none;'><div class='cal-head'><em class='leftlogo' id='leftlogo'></em><div class='cal-month'><select name='cal-month' id='cal-month'><option value='1'>January</option><option value='2'>February</option><option value='3'>March</option><option value='4'>April</option><option value='5'>May</option><option value='6'>June</option><option value='7'>July</option><option value='8'>August</option><option value='9'>September</option><option value='10'>October</option><option value='11'>November</option><option value='12'>December</option></select></div>";
	str2+="<div class='cal-year'><select name='cal-year' id='cal-year'>"+yearStr+"</select></div>";
	str2+="<em class='rightlogo' id='rightlogo'></em></div><div id='cal-table' class='cal-table'></div><div class='cal-foot'><span class='quitday' id='quitday'>Close</span><span class='today' id='today'>Today</span><span class='okday' id='okday'>Confirm</span></div></div></body></html>";

	this.win=myiframe.contentWindow;
	this.doc=myiframe.contentDocument||myiframe.contentWindow.document;

	this.doc.writeln(str1+css+str2);
	this.doc.close();

	this.calBox=this.doc.getElementById('cal-box');
	this.calTable=this.doc.getElementById('cal-table');
	this.calMonth=this.doc.getElementById('cal-month');
	this.calYear=this.doc.getElementById('cal-year');

	this.leftlogo=this.doc.getElementById('leftlogo');
	this.rightlogo=this.doc.getElementById('rightlogo');
	this.today=this.doc.getElementById('today');
	this.okday=this.doc.getElementById('okday');
	this.quitday=this.doc.getElementById('quitday');

	this.calTable.onclick=function(event){
		event=event?event:that.win.event;
		var target=event.target||event.srcElement;
		if(target.tagName.toLowerCase()=='td'&&target.className.indexOf('is-empty')<0){
			var tds=that.calTable.getElementsByTagName('td');
			for(var i=0;i<tds.length;i++){
				if(tds[i].className.indexOf('is-select')>-1){
					tds[i].className=tds[i].className.replace('is-select','');
					break;
				}
			}
			target.className=target.className+' is-select';
		}
	};
	this.calMonth.onchange=function(){
		var monthAlt=this.value;

		if(that.startDate.getFullYear()+""==that.calYear.value){
			if(parseInt(this.value,10)<that.startDate.getMonth()+1){
				monthAlt=that.startDate.getMonth()+1;
				that.calMonth.selectedIndex=that.startDate.getMonth();

				var temp="Must Great than "+that.startDate.getFullYear()+"-";
					temp+=(that.startDate.getMonth()+1)+"-";
					temp+=that.startDate.getDate();
				alert(temp);
			}
		}
		if(that.endDate.getFullYear()+""==that.calYear.value){
			if(parseInt(this.value,10)>that.endDate.getMonth()+1){
				monthAlt=that.endDate.getMonth()+1;
				that.calMonth.selectedIndex=that.endDate.getMonth();

				var temp="Must Less than "+that.endDate.getFullYear()+"-";
					temp+=(that.endDate.getMonth()+1)+"-";
					temp+=that.endDate.getDate();
				alert(temp);
			}
		}
		that.calTable.innerHTML=that.alterDate(that.calYear.value,monthAlt);
	};
	this.calYear.onchange=function(){
		var monthAlt=that.calMonth.value;

		if(that.startDate.getFullYear()+""==this.value){
			if(parseInt(that.calMonth.value,10)<that.startDate.getMonth()+1){
				monthAlt=that.startDate.getMonth()+1;
				that.calMonth.selectedIndex=that.startDate.getMonth();

				var temp="Must Great than "+that.startDate.getFullYear()+"-";
					temp+=(that.startDate.getMonth()+1)+"-";
					temp+=that.startDate.getDate();
				alert(temp);
			}
		}
		if(that.endDate.getFullYear()+""==this.value){
			if(parseInt(that.calMonth.value,10)>that.endDate.getMonth()+1){
				monthAlt=that.endDate.getMonth()+1;
				that.calMonth.selectedIndex=that.endDate.getMonth();

				var temp="Must Less than "+that.endDate.getFullYear()+"-";
					temp+=(that.endDate.getMonth()+1)+"-";
					temp+=that.endDate.getDate();
				alert(temp);
			}
		}
		that.calTable.innerHTML=that.alterDate(this.value,monthAlt);
	};
	this.leftlogo.onclick=function(){
		that.mpMonth(-1);
	};
	this.rightlogo.onclick=function(){
		that.mpMonth(1);
	};
	this.today.onclick=function(){
		that.button(-1);
	};
	this.okday.onclick=function(){
		that.button(0);
	};
	this.quitday.onclick=function(){
		that.button(1);
	};

};
TaoDate.prototype.showDate=function(){
	var t=this.nowObj.value.toDate();
	this.calYear.selectedIndex=t.getFullYear()-parseInt(this.calYear.options[0].value,10);
	this.calMonth.selectedIndex=t.getMonth();
	this.calTable.innerHTML=this.alterDate(this.calYear.value,this.calMonth.value,t.getDate());
	this.calBox.style.display='block';
};
TaoDate.prototype.mpMonth=function(s){
	if(s==-1){
		if(this.calMonth.value=='01'){
			this.calYear.selectedIndex=parseInt(this.calYear.value,10)-parseInt(this.calYear.options[0].value,10)-1;
			this.calMonth.selectedIndex=11;
		}else{
			this.calYear.selectedIndex=parseInt(this.calYear.value,10)-parseInt(this.calYear.options[0].value,10);
			this.calMonth.selectedIndex=parseInt(this.calMonth.value,10)-2;
		}
	}else if(s==1){
		if(this.calMonth.value=='12'){
			this.calYear.selectedIndex=parseInt(this.calYear.value,10)-parseInt(this.calYear.options[0].value,10)+1;
			this.calMonth.selectedIndex=0;
		}else{
			this.calYear.selectedIndex=parseInt(this.calYear.value,10)-parseInt(this.calYear.options[0].value,10);
			this.calMonth.selectedIndex=parseInt(this.calMonth.value,10);
		}
	}
	this.calTable.innerHTML=this.alterDate(this.calYear.value,this.calMonth.value);
};
TaoDate.prototype.button=function(s){
	if(s==-1){
		var t=new Date();
		this.calYear.selectedIndex=t.getFullYear()-parseInt(this.calYear.options[0].value,10);
		this.calMonth.selectedIndex=t.getMonth();
		this.calTable.innerHTML=this.alterDate(this.calYear.value,this.calMonth.value,t.getDate());
	}else if(s==0){
		var tds=this.calTable.getElementsByTagName('td');
		for(var i=0;i<tds.length;i++){
			if(tds[i].className.indexOf('is-select')>-1){
				var mstr=this.calMonth.value;
				var dstr=tds[i].innerHTML;
				if(parseInt(this.calMonth.value,10)<10){
					mstr="0"+parseInt(this.calMonth.value,10);
				}
				if(parseInt(tds[i].innerHTML,10)<10){
					dstr="0"+parseInt(tds[i].innerHTML,10);
				}
				this.nowObj.value=this.calYear.value+"-"+mstr+"-"+dstr;
				break;
			}
		}
		String.prototype.toDate=undefined;
		document.body.removeChild(this.panel);
	}else if(s==1){
		String.prototype.toDate=undefined;
		document.body.removeChild(this.panel);
	}
};
TaoDate.prototype.alterDate=function(year,month,day){
	var t=new Date(year+'/'+month+'/01');
	var sday=null,eday=null;
	if(parseInt(year,10)==this.startDate.getFullYear()&&parseInt(month,10)==this.startDate.getMonth()+1){
		sday=Math.floor((this.startDate.getTime()-t.getTime())/86400000);
	}
	if(parseInt(year,10)==this.endDate.getFullYear()&&parseInt(month,10)==this.endDate.getMonth()+1){
		eday=Math.floor((this.endDate.getTime()-t.getTime())/86400000);
	}

	var nextT=null;
	if(month=='12'){
		nextT=new Date((parseInt(year,10)+1)+'/01/01');
	}else{
		nextT=new Date(year+'/'+(parseInt(month,10)+1)+'/01');
	}
	var days=Math.floor((nextT.getTime()-t.getTime())/86400000);
	var dayStart=t.getDay();
	var str="<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>";
	for(var i=0;i<dayStart+days;i++){
		if(i%7==0){
			str+='</tr><tr>';
		}
		if(i>dayStart-1){
			if((sday&&i<dayStart+sday)||(eday&&i>dayStart+eday)){
				str+="<td class='is-empty'></td>";
				continue;
			};
			if(typeof day!='undefined' && parseInt(day,10)==i-dayStart+1){
				str+="<td class='is-select'>"+(i-dayStart+1)+"</td>";
				continue;
			}
			str+="<td>"+(i-dayStart+1)+"</td>";
		}else{
			str+="<td class='is-empty'></td>";
		}
	}
	if((dayStart+days)%7!=0){
		for(var i=0;i<7-(dayStart+days)%7;i++){
			str+="<td class='is-empty'></td>";
		}
	}
	str+="</tr></table>";
	return str;
};
})(window);