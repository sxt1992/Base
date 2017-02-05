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
    
    $.get(htmlPath, function (res) {
        $("#container").html(res);
        loadJs(modName);
    });
}

function loadJs(modName) {
    pageDatas.params = {};
    var curMod;
    var routerArr = ["home", "menu1", "menu2", "menu3", "menu5", "menu6", "hrm"];
    switch(modName){
        case 'menu1':
            require.ensure([], function (require) {
                curMod = require('./js/menu1');
                curMod.init(pageDatas.params);
            },'menu1');
            break;
        case 'menu2':
            require.ensure([], function (require) {
                curMod = require('./js/menu2');
                curMod.init(pageDatas.params);
            },'menu2');
            break;
        case 'menu3':
            require.ensure([], function (require) {
                curMod = require('./js/menu3');
                curMod.init(pageDatas.params);
            },'menu3');
            break;
        case 'menu5':
            require.ensure([], function (require) {
                curMod = require('./js/menu5');
                curMod.init(pageDatas.params);
            },'menu5');
            break;
        case 'menu6':
            require.ensure([], function (require) {
                curMod = require('./js/menu6');
                curMod.init(pageDatas.params);
            },'menu6');
            break;
        case 'hrm': // hrm
            require.ensure([], function (require) {
                curMod = require('./js/hrm');
                curMod.init(pageDatas.params);
            },'hrm');
            break;
        default: // 默认 home
            require.ensure([], function (require) {
                curMod = require('./js/home');
                curMod.init(pageDatas.params);
            },'home');
    }
}

$(function(){
    initMenu();
    bindMenu();
});