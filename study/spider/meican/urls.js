let querystring = require('querystring');
let api = require('./tHttp');
let cookieOpr = require('./cookieOpr');

var urls = {};

let getWeekStart = (diffDay) => {
    if(!diffDay){
        diffDay = 0;
    }
    let t = new Date(new Date().getTime() + diffDay * 24 * 60 * 60 * 1000);
    return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
};

// 登录
urls.login = () => {
    return new Promise( res => {
        api.post('https://meican.com/account/directlogin', {
            username: 'taoxuejiao@souche.com',
            password: 'dc1234567890',
            remember: true,
            openId: '',
            loginType: 'username'
        }).then(() => {
            let pf = cookieOpr.getCookie('PLAY_FLASH');
            if(pf && querystring.parse(JSON.parse(pf.trim())).success){
                res(true);
            }else{
                res(false);
            }
        });
    });
};

// 获取日历菜单
urls.getCalendarItemsListOneId = () => {
    return api.get('https://meican.com/preorder/api/v2.1/calendarItems/list', {
        beginDate: getWeekStart(),
        endDate: getWeekStart(),
        noHttpGetCache: new Date().getTime(),
        withOrderDetail: false
    }, d => d.dateList[0].calendarItemList[0].userTab.uniqueId );
};

// 获取餐馆
urls.getRestaurantsList = (uniqueId) => {
    return api.get('https://meican.com/preorder/api/v2.1/restaurants/list', {
        tabUniqueId: uniqueId,
        noHttpGetCache: new Date().getTime(),
        targetTime: getWeekStart() + "+16:30"
    }, d => {
        let rl = [];
        d.restaurantList.forEach(function(restaurant) {
            rl.push({
                name: restaurant.name,
                uniqueId: restaurant.uniqueId
            });
        });
        return rl;
    });
};

// 获取餐品
urls.getDishList = (uniqueId, restaurantUniqueId) => {
    return api.get('https://meican.com/preorder/api/v2.1/restaurants/show', {
        restaurantUniqueId: restaurantUniqueId,
        tabUniqueId: uniqueId,
        noHttpGetCache: new Date().getTime(),
        targetTime: getWeekStart() + "+16:30"
    }, d => {
        let dl = [];
        d.dishList.forEach(function(dish){
            if (dish.id != dish.dishSectionId ) {
                dl.push({
                    id: dish.id,
                    name: dish.name
                });
            }
        });
        return dl;
    });
};

module.exports = urls;