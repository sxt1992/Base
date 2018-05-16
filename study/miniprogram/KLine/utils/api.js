const comApi = (url, cfg = {}) => new Promise((resolve, reject) => {
    wx.request(Object.assign({}, cfg, {
        url,
        method: cfg.method || 'GET',
        success: d => {
            // res.statusCode
            if (d.data && d.data.flag) {
                if (cfg.success) {
                    cfg.success(resolve, d.data.data);
                } else {
                    resolve(d.data.data);
                }
            } else {
                reject(d.data ? d.data.msg : '数据返回有误!');
            }
        },
        fail: err => {
            reject(err.errMsg != null ? err.errMsg : '数据请求失败!');
        }
    }));
});
module.exports = {
    getDkData(stockNo) {
        //"2017-01-06,17.00,17.10,17.40,16.90,1462083,25.1亿,2.95%,+12.32"
        // [日期0，开盘价1，现价2，最高价3，最低价4，成交量5，成交额6，振幅7，涨跌8]
        // demo
        return new Promise((resolve, reject) => resolve(require('./demoData').data));
        return comApi('http://localhost:8080/kline.json', {
            method: 'post',
            data: {
                stockNo
            }
        });
    }
};