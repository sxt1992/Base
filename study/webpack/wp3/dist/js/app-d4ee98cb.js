webpackJsonp([8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(3);
	__webpack_require__(2);

	var pageDatas = {
	    params: {},
	    defaultRoute: 'home'
	};
	function initMenu() {
	    var modName = window.location.href.split('#')[1];
	    modName = modName || pageDatas.defaultRoute;
	    $("ul.sub-menu li a").each(function () {
	        if ("#" + modName == $(this).attr('href')) {
	            $(this).addClass("active").parent().parent().show(300);
	            return false;
	        }
	    });
	}

	function bindMenu() {
	    $(document).on('click', '.sidebar .nav .has-sub', function (e) {
	        e.stopPropagation();
	        $(this).children(".sub-menu").toggle(300);
	    });
	    $("ul.sub-menu li a").on('click', function (e) {
	        e.stopPropagation();

	        if ($(this).hasClass("active")) {
	            return false;
	        }

	        $("ul.sub-menu li a").removeClass("active");
	        $(this).addClass("active");

	        var modName = $(this).attr('href');
	        modName = modName.split('#')[1];

	        loadHtml(modName);
	    });
	}

	function loadHtml(modName) {
	    pageDatas.params = null;

	    var htmlPath = './html/' + modName + '.html';

	    $.get(htmlPath, function (res) {
	        $("#container").html(res);
	        loadJs(modName);
	    });
	}

	function loadJs(modName) {
	    pageDatas.params = {};
	    var curMod;
	    var routerArr = ["home", "menu1", "menu2", "menu3", "menu5", "menu6", "hrm"];
	    switch (modName) {
	        case 'menu1':
	            __webpack_require__.e/* nsure */(5, function (require) {
	                curMod = __webpack_require__(8);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        case 'menu2':
	            __webpack_require__.e/* nsure */(4, function (require) {
	                curMod = __webpack_require__(9);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        case 'menu3':
	            __webpack_require__.e/* nsure */(3, function (require) {
	                curMod = __webpack_require__(10);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        case 'menu5':
	            __webpack_require__.e/* nsure */(2, function (require) {
	                curMod = __webpack_require__(11);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        case 'menu6':
	            __webpack_require__.e/* nsure */(1, function (require) {
	                curMod = __webpack_require__(12);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        case 'hrm':
	            // hrm
	            __webpack_require__.e/* nsure */(6, function (require) {
	                curMod = __webpack_require__(7);
	                curMod.init(pageDatas.params);
	            });
	            break;
	        default:
	            // 默认 home
	            __webpack_require__.e/* nsure */(7, function (require) {
	                curMod = __webpack_require__(6);
	                curMod.init(pageDatas.params);
	            });
	    }
	}

	$(function () {
	    initMenu();
	    bindMenu();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
2
]);