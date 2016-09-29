(function(window,undefined){
"use strict";
// Array
if(![].filter){
	Array.prototype.filter=function(callback){
		var arr=[];
		for(var i=0;i<this.length;i++){
			if(callback.call(this,this[i],i,this)){
				arr.push(this[i]);
			}
		}
		return arr;
	};
}
if(![].every){
	Array.prototype.every=function(callback){
		for(var i=0;i<this.length;i++){
			if(!callback.call(this,this[i],i,this)){
				return false;
			}
		}
		return true;
	};
}
if(![].some){
	Array.prototype.some=function(callback){
		for(var i=0;i<this.length;i++){
			if(callback.call(this,this[i],i,this)){
				return true;
			}
		}
		return false;
	};
}
if(![].forEach){
	Array.prototype.forEach=function(callback){
		for(var i=0;i<this.length;i++){
			callback.call(this,this[i],i,this);
		}
	};
}
if(![].map){
	Array.prototype.map=function(callback){
		var arr=[];
		for(var i=0;i<this.length;i++){
			arr.push(callback.call(this,this[i],i,this));
		}
		return arr;
	};
}

// String
if(!"".trim){
	String.prototype.trim=function(){
		return this.replace(/^\s+|\s+$/g,"");
	};
}

})(window);