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
    }, d => {
        let info = {
            tabUniqueId: d.dateList[0].calendarItemList[0].userTab.uniqueId,
            corpAddressUniqueId: d.dateList[0].calendarItemList[0].userTab.corp.addressList[0].uniqueId
        };

        let order = d.dateList[0].calendarItemList[0].corpOrderUser;
        if (order && typeof order == 'object' && Array.isArray(order.restaurantItemList)) {
            info.orderUniqueId = order.uniqueId;
            info.dish = {
                dishId: order.restaurantItemList[0].dishItemList[0].dish.id,
                dishIdName: order.restaurantItemList[0].dishItemList[0].dish.name
            };
        }
        return info;
    });
};

// 获取餐馆
urls.getRestaurantsList = (tabUniqueId) => {
    return api.get('https://meican.com/preorder/api/v2.1/restaurants/list', {
        tabUniqueId: tabUniqueId,
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
urls.getDishList = (tabUniqueId, restaurantUniqueId) => {
    return api.get('https://meican.com/preorder/api/v2.1/restaurants/show', {
        restaurantUniqueId: restaurantUniqueId,
        tabUniqueId: tabUniqueId,
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

// 点餐
urls.orderMeal = (tabUniqueId, addressUniqueId, dishId) => {
    return api.post('https://meican.com/preorder/api/v2.1/orders/add', {
        corpAddressUniqueId: addressUniqueId,
        order: JSON.stringify([{count: 1, dishId: dishId}]),
        tabUniqueId: tabUniqueId,
        targetTime: getWeekStart() + "+16:30",
        userAddressUniqueId: addressUniqueId
    }, d => {
        if (d.status === 'SUCCESSFUL') {
            return d.order.uniqueId;
        }
        return false;
    });
};

// 展示结果
urls.showOrder = (uniqueId, restaurantUniqueId) => {
    return api.post('https://meican.com/preorder/api/v2.1/orders/show', {
        uniqueId: uniqueId,
        type: 'CORP_ORDER'
    }, d => {
        if (!d || typeof d.restaurantItemList != 'object' || !d.restaurantItemList[0]
               || typeof d.restaurantItemList[0].dishItemList != 'object' || !d.restaurantItemList[0].dishItemList[0] ) {
            return false;
        }
        let dish = d.restaurantItemList[0].dishItemList[0].dish;
        return {
            dishId: dish.id,
            dishIdName: dish.name
        };
    });
};

// 取消订单
urls.delOrder = (orderUniqueId) => {
    return api.get('https://meican.com/preorder/api/v2.1/orders/delete', {
        uniqueId: orderUniqueId,
        type: "CORP_ORDER",
        restoreCart: false
    });
};


module.exports = urls;