require('bootstrapcss');
require('indexcss');

var pageDatas = {
    params: {},
    defaultRoute:'home'
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
    $("ul.sub-menu li a").on('click', function (e){
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

    var htmlPath = './html/'+modName+'.html';
    var jsPath = './js/' + modName;
    
    $.get(htmlPath, function (res) {
        $("#container").html(res);
        loadJs(jsPath,modName);
    });

   /* var curMod;
    var curHtml;
    require.ensure([], function (require) {
        curMod = require(jsPath);
        curHtml = require(htmlPath);
        $("#container").html(curHtml);
    },modName);  */  
    /*$.get(htmlPath, [], function (html) {
        $("#container").html(html);
        loadJs(jsPath);
    });*/
}

function loadJs(jsPath, modName) {
    /*require.ensure([], function (require) {
        var curMod = require(jsPath);
        curMod.init(pageDatas.params);
    },modName);*/
    var curMod;
    var routerArr=["home","menu1","menu2","menu3","menu5","menu6","hrm"];
    switch(modName){
        case routerArr[1]:
            require.ensure([], function (require) {
                curMod = require('./js/menu1');
                curMod.init(pageDatas.params);
            },modName);
            break;
        case routerArr[2]:
            require.ensure([], function (require) {
                curMod = require('./js/menu2');
                curMod.init(pageDatas.params);
            },modName);
            break;
        case routerArr[3]:
            require.ensure([], function (require) {
                curMod = require('./js/menu3');
                curMod.init(pageDatas.params);
            },modName);
            break;
        case routerArr[4]: // menu5
            require.ensure([], function (require) {
                curMod = require('./js/menu5');
                curMod.init(pageDatas.params);
            },modName);
            break;
        case routerArr[5]: // menu6
            require.ensure([], function (require) {
                curMod = require('./js/menu6');
                curMod.init(pageDatas.params);
            },modName);
            break;
        case routerArr[6]: // hrm
            require.ensure([], function (require) {
                curMod = require('./js/hrm');
                curMod.init(pageDatas.params);
            },modName);
            break;
        default: // 默认 home
            require.ensure([], function (require) {
                curMod = require('./js/home');
                curMod.init(pageDatas.params);
            },modName);
    }
}

$(function () {
    initMenu();
    bindMenu();
});