var EventEmitter=require('events').EventEmitter;
var life=new EventEmitter();

life.on("qav",function(who){
	console.log('给 '+who+' 倒水');
});
life.on("qav",function(who){
	console.log('给 '+who+' 洗衣服');
});


function zf(who){
	console.log('给 '+who+' 做饭!!!');
}

life.on("qav",zf);
// life.removeListener("qav",zf);

console.log(life.emit('qav','汉子'));

console.log(life.listeners('qav'));
console.log(EventEmitter.listenerCount(life,'qav'));
life.removeAllListeners(); // 移除所有事件
life.removeAllListeners('qav'); //移动某个事件
