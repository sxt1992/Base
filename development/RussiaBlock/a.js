window.onload=function(){tDraw(416,640,"show");};
function tDraw(w,h,wrapper,theData){
	var canvas=document.createElement("canvas");
	canvas.width=w;
	canvas.height=h;
	canvas.innerHTML="Your browser doesn't support the HTML5 CANVAS tag.";
	canvas.style.display="block";
	canvas.style.margin="auto";
	canvas.style.cursor="default";
	canvas.style.borderRadius="8px";
	document.getElementById(wrapper).appendChild(canvas);
	if(!canvas||!canvas.getContext)return;
	var taoCanvas={
		init:function(myCanvas,data){
			this.canvas=myCanvas;
			this.ctx=this.canvas.getContext('2d');
			this.data=data;
			this.eLeft=(function(e){
				var offset = e.offsetLeft;
				if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
				return offset;
			})(this.canvas);
			this.eTop=(function(e){
				var offset = e.offsetTop;
				if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
				return offset;
			})(this.canvas);
			this.eW=this.canvas.width||300;
			this.eH=this.canvas.height||150;

			this.colors=[[0,228,39],[228,222,0],[228,0,39],[156,19,228],[228,98,0],[0,78,228],[0,228,228]];
			this.typeAll={
						0:[[0,1,0],
						   [1,1,1]],

						1:[[1,0],
						   [1,1],
						   [1,0]],

						2:[[1,1,1],
						   [0,1,0]],

						3:[[0,1],
						   [1,1],
						   [0,1]],

						4:[[1,0,0],
						   [1,1,1]],

						5:[[1,1],
						   [1,0],
						   [1,0]],

						6:[[1,1,1],
						   [0,0,1]],

						7:[[0,1],
						   [0,1],
						   [1,1]],

						8:[[1,1,1],
						   [1,0,0]],

						9:[[1,1],
						   [0,1],
						   [0,1]],

						10:[[0,0,1],
						    [1,1,1]],

						11:[[1,0],
						    [1,0],
						    [1,1]],

						12:[[0,1],
						    [1,1],
						    [1,0]],

						13:[[1,1,0],
						    [0,1,1]],

						14:[[1,0],
						    [1,1],
						    [0,1]],

						15:[[0,1,1],
							[1,1,0]],

						16:[[1],[1],[1],[1]],

						17:[[1,1,1,1]],

						18:[[1,1],
							[1,1]]};
			this.graphTypeWH={w:[],h:[]}; // 图形的宽度
			for(var i=0;i<=18;i++){
				this.graphTypeWH.w[i]=this.typeAll[i][0].length;
				this.graphTypeWH.h[i]=this.typeAll[i].length
			}

			this.xCnt=13;
			this.wh=this.eW/this.xCnt;
			this.yCnt=Math.round(this.eH/this.wh);
			this.speed=1;
			this.gameover=false;

			this.draw();
			this.events(this);
		},
		draw:function(){
			var ctx=this.ctx;
			this.drawGrid(); // 画格子
			this.saveQiPan();
			this.nowChess=this.matrix(this.yCnt,this.xCnt); // y 行,x 列..矩阵和坐标不同
			this.randType();
			/*
			ctx.save();
			ctx.restore();*/

		},
		drawGrid:function(){
			var ctx=this.ctx;
			ctx.strokeStyle="rgba(150,150,150,0.6)";
			ctx.lineWidth=2;
			for(var i=1;i<this.xCnt;i++){
				ctx.beginPath();
				ctx.moveTo(i*this.wh,0);
				ctx.lineTo(i*this.wh,this.eH);
				ctx.stroke();
			}
			for(var i=1;i<this.yCnt;i++){
				ctx.beginPath();
				ctx.moveTo(0,i*this.wh);
				ctx.lineTo(this.eW,i*this.wh);
				ctx.stroke();
			}
			ctx.fillStyle="rgba(0,0,0,0.5)";
			ctx.fillRect(0,0,this.eW,this.eH);
		},
		matrix:function(m,n,num){
			num=num!=null?num:-1;
			var arr=[];
			for(var i=0;i<m;i++){
				for(var j=0;j<n;j++){
					if(!arr[i]){
						arr[i]=[];
					}
					arr[i][j]=num;
				}
			}
			return arr;
		},
		events:function(that){
			window.onkeydown=function(e){
				if(e.keyCode==38){ // 上,变型
					that.changeType();
				}
				if(e.keyCode==37){ // 左,变型
					var x=that.nowCfg.x-1;
					if(x>-1){
						if(that.canMove(x)){
							that.nowCfg.x=x;
						}
					}
				}
				if(e.keyCode==39){ // 右,变型
					var x=that.nowCfg.x+1;
					if(x<=that.xCnt-that.graphTypeWH.w[that.nowCfg.type]){
						if(that.canMove(x)){
							that.nowCfg.x=x;
						}
					}
				}
				if(e.keyCode==40){ // 下,直达底部
					that.speed=7;
				}
				if(e.keyCode==32){ // 空格,暂停
					that.pauseGame=!that.pauseGame;
					if(!that.pauseGame){
						that.pauseFunc();
					}
				}
			};
		},
		canMove:function(x){
			var tw=this.graphTypeWH.w[this.nowCfg.type];
			var th=this.graphTypeWH.h[this.nowCfg.type];
			var ty=this.nowCfg.y;
			var t=this.typeAll[this.nowCfg.type];
			for(var i=0;i<tw;i++){
				for(var j=0;j<th;j++){
					if(ty+j>-1 && x+i>-1 && this.nowChess[ty+j][x+i]>-1 && t[j][i]==1){
						return false;
					}
				}
			}
			return true;
		},
		saveQiPan:function(){
			this._QiImgData=this.ctx.getImageData(0,0,this.eW,this.eH);
		},
		resQiPan:function(){
			this.ctx.putImageData(this._QiImgData,0,0);
		},
		drawChess:function(){
			this.resQiPan();
			for(var i=0;i<this.nowChess.length;i++){
				for(var j=0;j<this.nowChess[i].length;j++){
					if(this.nowChess[i][j]>-1){
						this.drawColorRect(j,i,this.colors[this.nowChess[i][j]]);
					}
				}
			}
		},
		saveGraph:function(){
			this._GraphImgData=this.ctx.getImageData(0,0,this.eW,this.eH);
		},
		resGraph:function(){
			this.ctx.putImageData(this._GraphImgData,0,0);
		},
		clear:function(){
			this.ctx.clearRect(0,0,this.eW,this.eH);
		},
		randType:function(){
			if(this.gameover){
				window.clearTimeout(this.nowIv);
				return;
			}
			this._stopThisTu=false;
			this.speed=1;
			/*if(!this.testn){
				this.testn=1;
			}else{
				this.testn++;
			}
			if(this.testn>20){
				return;
			}*/
			var that=this;
			var type=Math.round(Math.random()*18);
			var x=Math.round(Math.random()*(this.xCnt-this.graphTypeWH.w[type]));
			var y=1-this.graphTypeWH.h[type];
			var c=Math.round(Math.random()*(this.colors.length-1));
			/*var taa=[0,12,9];
			type=taa[this.testn];*/

			that.nowCfg={type:type,x:x,y:y,c:c};
			that.saveGraph();
			that.graphType(that.nowCfg);
			var _func=function(){
				var n=that.nowCfg.type;
				var tw=that.graphTypeWH.w[n];
				var th=that.graphTypeWH.h[n];
				var cy=that.nowCfg.y+th;
				var stopThis=function(){
					for(var i=0;i<tw;i++){
						for(var j=0;j<th;j++){
							if(that.typeAll[n][j][i]==1 && that.nowCfg.y+j>-1){
								that.nowChess[that.nowCfg.y+j][that.nowCfg.x+i]=that.nowCfg.c;
							}
						}
					}
					that._stopThisTu=true;
					var _flushQipan=false;
					for(var i=0;i<th;i++){
						if(that.nowCfg.y+i<-1){
							continue;
						}
						var arr=that.nowChess[that.nowCfg.y+i];
						var delFlag=true;
						for(var j=0;j<arr.length;j++){
							if(arr[j]<0){
								delFlag=false;
								break;
							}
						}
						if(delFlag){
							_flushQipan=true;
							that.nowChess.splice(that.nowCfg.y+i,1);
							that.nowChess.splice(0,0,[-1,-1,-1,-1,-1,  -1,-1,-1,-1,-1, -1,-1,-1]);
						}
					}
					if(_flushQipan){
						that.drawChess();
					}

					for(var i=0;i<that.nowChess[0].length;i++){
						if(that.nowChess[0][i]>-1){
							console.log("Game Over");
							that.gameover=true;
							return;
						}
					}
					that.randType();
				};
				if(cy>=that.yCnt){
					stopThis();
					return;
				}
				for(var i=0;i<tw;i++){
					for(var j=0;j<th;j++){
						if(that.nowCfg.y+j>-2 && that.nowChess[that.nowCfg.y+j+1][that.nowCfg.x+i]>-1 && that.typeAll[n][j][i]==1){
							stopThis();
							return;
						}
					}
				}
				that.nowCfg.y++;
				that.resGraph();
				that.graphType(that.nowCfg);

				that.nowIv=setTimeout(function(){
					if(that.pauseGame || that._stopThisTu || that.gameover){
						window.clearTimeout(that.nowIv);
						return;
					}
					_func();
				},700-that.speed*100);
			};
			that.pauseFunc=function(){_func();};
			_func();
		},
		changeType:function(){
			// [0,1,2,3]
			// [4,5,6,7]
			// [8,9,10,11]
			// [12,13]
			// [14,15]
			// [16,17]
			// [18]
			var nextType=[1,2,3,0,
						  5,6,7,4,
						  9,10,11,8,
						  13,12,
						  15,14,
						  17,16,
						  18];
			var nt=nextType[this.nowCfg.type];
			if(this.graphTypeWH.w[nt]+this.nowCfg.x>this.xCnt){
				this.nowCfg.x=this.xCnt-this.graphTypeWH.w[nt];
			};
			this.nowCfg.type=nt;
		},
		graphType:function(cfg){
			var n=cfg.type;
			var x=cfg.x;
			var y=cfg.y;
			var colorArr=this.colors[cfg.c];
			var fs=null;
			if(this.typeAll[n]){
				var fs=this.typeAll[n];
				for(var j=0;j<fs.length;j++){
					for(var i=0;i<fs[j].length;i++){
						if(fs[j][i]){
							this.drawColorRect(x+i,y+j,colorArr);
						}
					}
				}
				return {type:n,x:x,y:y,c:cfg.c};
			}
			return {};
		},
		drawColorRect:function(x,y,colorArr){
			var wh=this.wh;
			var x=x*wh;
			var y=y*wh;

			var ctx=this.ctx;
			var hIn=Math.round(wh*0.2);
			var whIn=wh-hIn*2;
			var xIn=x+hIn;
			var yIn=y+hIn;
			var newColorArr=[];
			var cD=0;

			//center
			ctx.fillStyle="rgb("+colorArr+")";
			ctx.fillRect(xIn,yIn,whIn,whIn);

			//up
			cD=70;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			var grd=ctx.createLinearGradient(x,0,x+wh+10,0);
			grd.addColorStop(0,"#fff");
			grd.addColorStop(1,"rgb("+newColorArr+")");
			ctx.fillStyle=grd;

			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+wh,y);
			ctx.lineTo(xIn+whIn,yIn);
			ctx.lineTo(xIn,yIn);
			ctx.fill();

			//right
			cD=-50;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";

			ctx.beginPath();
			ctx.lineTo(x+wh,y);
			ctx.lineTo(x+wh,y+wh);
			ctx.lineTo(xIn+whIn,yIn+whIn);
			ctx.lineTo(xIn+whIn,yIn);
			ctx.fill();

			//down
			cD=-60;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";
			
			ctx.beginPath();
			ctx.lineTo(x+wh,y+wh);
			ctx.lineTo(x,y+wh);
			ctx.lineTo(xIn,yIn+whIn);
			ctx.lineTo(xIn+whIn,yIn+whIn);
			ctx.fill();

			//left
			cD=50;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";
			
			ctx.beginPath();
			ctx.lineTo(x,y+wh);
			ctx.lineTo(x,y);
			ctx.lineTo(xIn,yIn);
			ctx.lineTo(xIn,yIn+whIn);
			ctx.fill();
		}
	};
	taoCanvas.init(canvas,theData);
}