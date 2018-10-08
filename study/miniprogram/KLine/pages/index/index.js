const tsData = require('./tsData');
const kLineData = require('./kLineData');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tsData: {},
        kLineData: {}
    },
    onReady: function () {
        setTimeout(() => {
            this.setData({
                tsData
            });
        }, 5000);

        setTimeout(() => {
            this.setData({
                kLineData
            });
        }, 8000);
    }
})