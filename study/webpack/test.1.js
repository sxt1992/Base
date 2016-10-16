//公共引用
var fs = require('fs'),
    path = require('path');

var str = "taoxuejiao";
var filePath = path.normalize(__dirname + '/fsDir/');
console.log(filePath);
var st=fs.statSync(filePath);
console.log(st.isDirectory());
process.on("exit", function () {
    console.log(str);
});