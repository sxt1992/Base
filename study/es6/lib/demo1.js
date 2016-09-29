"use strict";

(function () {
  var wRate = window.innerWidth / 640;
  var css = "\nbody{margin:0;pading:0;}\n.tao{width:" + 300 * wRate + "px;background:red;}\n.xue{width:" + 640 * wRate + "px;background:blue;}\n";
  var css = "\nbody{margin:0;pading:0;}\n.tao{width:" + 300 * wRate + "px;background:red;}\n";
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();