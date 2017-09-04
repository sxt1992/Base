let cheerio = require('cheerio'); // 操作 如同 jquery
let fs = require('fs');
let urls = require('./urls');

let logSuccFunc = () => {
    urls.getCalendarItemsListOneId().then( riLi => { // 获取日历
        urls.getRestaurantsList(riLi).then((rl) => {
            let allRlPromise = rl.map(function(one){
                return urls.getDishList(riLi, one.uniqueId);
            });
            Promise.all(allRlPromise).then(function(allDishList){
                let allMenu = [];
                for(let i = 0; i < rl.length; i += 1){
                    allMenu.push(Object.assign(rl[i], {menu: allDishList[i]}));
                }
                fs.writeFileSync('./menu.json', JSON.stringify(allMenu, null, 4));
            });
        });
    });
};

let loginStr = require('./cookieOpr').getCookie('PLAY_FLASH');
if(loginStr && require('querystring').parse(JSON.parse(loginStr.trim())).success){
    logSuccFunc();
}else{
    urls.login().then( d => {
        if (d) {
            logSuccFunc();
        }else {
            console.log('登录失败!');
        }
    });
}