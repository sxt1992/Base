const KLine = require('./drawLine/k-line');
const KTurnover = require('./drawLine/k-turnover');
const KMacd = require('./drawLine/k-macd');

const optData = require('./optData');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        originData: {
            type: Array,
            value: [],
            observer: function (newData) {
                this.getDkData(newData);
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        touchStartMilliSec: -1,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        moveStartIndex: 0,
        moveStartShowDataStart: 0,
        mTimeout: null,
        maxDistance: 0,
        // 画笔
        ctx_line: null,
        ctx_turnover: null,
        ctx_macd: null,
        // k 线
        KLine: null,
        allData: [],
        showData: [],
        // 显示起点,最右边开始,往右滑是+1,往左滑-1
        showDataStart: 0,
        // 显示数据长度
        showDataLen: optData.bn,
        // 数据是否在左边显示
        graphOnLeft: false,
        // 是否显示十字线
        showCrosshair: false,
        crossXaxis: '0px',
        crossYaxis: '0px',
        crosshairDate: '2018-03-16',
        showDataStartDate: '2018-03-01',
        showDataEndDate: '2018-03-20',
        // 搜索相关
        searchResFlag: false,
        showSearchRes: false,
        searchResXaxis: '0px',
        searchResYaxis: '0px',
        searchResDate: '2018-03-01',
        searchRes: '0.00',
        // 页面搜索
        searchWord: '',
        disabledSearch: true,
        // k 线 选择时,显示的值
        lineLabel: {
            o: '16.48',
            c: '16.47',
            h: '16.77',
            l: '16.40',
            v: '-0.15',
            f: '-0.19%'
        },
        // k 线 选择时,是否为红色
        lineLabelIsRed: {
            o: true,
            c: false,
            h: true,
            l: false,
            v: true,
            f: true
        },
        // 成交量,选择时,显示的值
        turnoverLabel: '33.12万',
        // 成交量,选择时,是否为红色
        turnoverLabelIsRed: false,
        // macd,选择时,显示的值
        macdLabel: {
            MACD: '+0.04',
            DIFF: '-0.22',
            DEA: '-0.30'
        },
        // macd,选择时,macd是否为红色
        macdLabelMACDIsRed: true
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
     * desc 查询数据,并绘制
     *
     * 参数:
     * d  格式: yyyy-MM-dd,查询日期
     * p  显示的价格
     * notDraw  默认绘制图像,不进行绘制
     *
     * 返回值:
     * {code: 0, msg: '', index: 12}
     *
     * code:
     *   0. 查询正确！
     *   1. 日期格式不对！
     *   2. 价格不能低于0！
     *   3. 日期范围不对!
     *   4. 价格范围为：xx-yy。所查价格不在查询区域！
     *
     * msg: 提示信息
     *
     * index: 当前值在所有的数据中的索引
     */
        searchData(d, p, notDraw) {
            const xArr = d.replace(/^\D+|\D+$/g, '').split(/\D/);
            if (xArr.length < 3) {
                return { code: 1, msg: '日期格式不对！' };
            }
            if (p < 0) {
                return { code: 2, msg: '价格不能低于0！' };
            }
            const xDateMillTime = new Date(...xArr).getTime();

            let maxVal = -Infinity;
            let minVal = Infinity;
            let startDate = '';
            let endDate = '';
            let index = -1;

            for (let i = 0; i < this.data.allData.length; i++) {
                //"2017-01-06,17.00,17.10,17.40,16.90,1462083,25.1亿,2.95%,+12.32"
                // [日期0，开盘价1，现价2，最高价3，最低价4，成交量5，成交额6，振幅7，涨跌8]
                const arr = this.data.allData[i].trim().split(',');
                if (!arr) {
                    continue;
                }

                if (i === 0) {
                    startDate = arr[0];
                }
                if (i === this.data.allData.length - 1) {
                    endDate = arr[0];
                }

                if (xDateMillTime === new Date(...arr[0].replace(/^\D+|\D+$/g, '').split(/\D/)).getTime()) {
                    index = i;
                }

                (maxVal < arr[1]) && (maxVal = +arr[1]);
                (maxVal < arr[2]) && (maxVal = +arr[2]);
                (maxVal < arr[3]) && (maxVal = +arr[3]);
                (maxVal < arr[4]) && (maxVal = +arr[4]);

                (minVal > arr[1]) && (minVal = +arr[1]);
                (minVal > arr[2]) && (minVal = +arr[2]);
                (minVal > arr[3]) && (minVal = +arr[3]);
                (minVal > arr[4]) && (minVal = +arr[4]);
            }
            if (index < 0) {
                return {
                    code: 3, msg: `日期范围为：${startDate} -- ${endDate}。所查日期不在数据区域！`
                };
            }
            if (minVal > p || maxVal < p) {
                return { code: 4, msg: `价格范围为：${minVal} -- ${maxVal}。所查价格不在数据区域！` };
            }
            if (notDraw) {
                return { code: 0, msg: '查询正确！', index };
            } else {
                this.drawSearchRes(d, p, index);
            }
        },
        /**
         * desc 绘制搜索结果
         *
         * 参数:
         * d  格式: yyyy-MM-dd,查询日期
         * p  显示的价格
         * index: 当前值在所有的数据中的索引
         */
        drawSearchRes(d, p, index) {
            const arr = d.replace(/^\D+|\D+$/g, '').split(/\D/);
            const resObj = {
                showCrosshair: false,   // 取消十字线
                searchResFlag: true,
                searchResDate: `${arr[0]}-${arr[1] < 10 ? '0' : ''}${+arr[1]}-${arr[2] < 10 ? '0' : ''}${+arr[2]}`,
                searchRes: +p
            };

            this.data.showDataStart = this.data.allData.length - index - Math.floor(optData.bn / 2);
            if (this.data.showDataStart < 0) {
                this.data.showDataStart = 0;
            }
            this.setData(resObj);
            this.draw();
        },
        /**
         * desc  页面是否允许搜索
         */
        searchSwitchChange(e) {
            this.setData({
                disabledSearch: !e.detail.value
            });
            this.data.searchResFlag = e.detail.value;
            if (!e.detail.value) {
                this.setData({
                    showSearchRes: false
                });
            }
        },
        /**
         * desc  搜索
         */
        search() {
            const arr = this.data.searchWord.trim().split(/,|，/);
            const d = arr && arr[0] && arr[0].replace(/^\D+|\D+$/g, '').split(/\D/);
            const p = arr && arr[1];
            if (!d || d.length < 3 || arr.length < 2) {
                wx.showModal({
                    title: '提示',
                    content: '参数格式不正确',
                    showCancel: false, //不显示取消按钮
                    confirmText: '确定'
                });
                return;
            }
            // 获取搜索参数
            const s = this.searchData(arr[0], arr[1], true);
            if (s.code !== 0) {
                wx.showModal({
                    title: '提示',
                    content: s.msg,
                    showCancel: false, //不显示取消按钮
                    confirmText: '确定'
                });
            } else {
                // 绘制搜索结果
                this.drawSearchRes(arr[0], arr[1], s.index);
            }
        },
        /**
         * desc  获取搜索框内容
         */
        getSearchWord(e) {
            this.data.searchWord = e.detail.value;
        },
        getDkData(data) {
            this.data.ctx_line = wx.createCanvasContext('k-line', this);
            this.data.ctx_turnover = wx.createCanvasContext('k-turnover', this);
            this.data.ctx_macd = wx.createCanvasContext('k-macd', this);
            this.data.allData = data;
            this.data.showDataStart = 0;
            this.draw();
        },
        draw() {
            if (!this.data.ctx_line || !this.data.ctx_turnover || !this.data.ctx_macd) {
                return;
            }
            const allDataLen = this.data.allData.length;
            const showDataStart = allDataLen - optData.bn - 29 - this.data.showDataStart;
            // 减去 29 , 为了计算 MA30
            const {
                maxVal_kLine,
                minVal_kLine,
                maxVal_kTurnover,
                maxVal_kMacd,
                minVal_kMacd,
                overShowDataLen
            } = this.dataProcess(this.data.allData.slice(showDataStart < 0 ? 0 : showDataStart, allDataLen - this.data.showDataStart));
            if (this.data.showData.length < 1) {
                return;
            }

            // 实际数组长度,与图表的中的 数组长度

            this.data.KLine = new KLine(
                this.data.ctx_line,
                this.data.showData,
                overShowDataLen,
                optData.sw * 380 / 750,
                maxVal_kLine,
                minVal_kLine
            );
            new KTurnover(
                this.data.ctx_turnover,
                this.data.showData,
                overShowDataLen,
                optData.sw * 220 / 750,
                maxVal_kTurnover
            );
            new KMacd(
                this.data.ctx_macd,
                this.data.showData,
                overShowDataLen,
                optData.sw * 230 / 750,
                maxVal_kMacd,
                minVal_kMacd
            );

            // 是否显示搜索,及显示坐标
            if (this.data.searchResFlag) {
                const searchDateMillTime = new Date(...this.data.searchResDate.replace(/^\D+|\D+$/g, '').split(/\D/)).getTime();
                let startMillTime = new Date(...this.data.showData[this.data.showData.length - optData.bn].date.replace(/^\D+|\D+$/g, '').split(/\D/)).getTime();
                let endMillTime = new Date(...this.data.showData[this.data.showData.length - 1].date.replace(/^\D+|\D+$/g, '').split(/\D/)).getTime();

                if (searchDateMillTime < startMillTime || searchDateMillTime > endMillTime) {
                    this.setData({
                        showSearchRes: false
                    });
                } else {
                    this.data.showData.forEach((item, showDataIndex) => {
                        if (item && item.date) {
                            const itemDateMillTime = new Date(...item.date.replace(/^\D+|\D+$/g, '').split(/\D/)).getTime();

                            if (itemDateMillTime == searchDateMillTime) {
                                const index = showDataIndex - (this.data.showData.length - optData.bn);
                                const searchObj = { showSearchRes: true };
                                if (!(index < 0 || index >= optData.bn || item.invalide)) {
                                    this.setData({
                                        showSearchRes: true,
                                        searchResXaxis: Math.round(optData.mw + optData.bw * (index + 1) - 0.5) + 'px',
                                        searchResYaxis: Math.round(this.data.KLine.numToYaxis(this.data.searchRes)) + 'px'
                                    });
                                }
                            }
                        }
                    });
                }
            } else {
                this.setData({
                    showSearchRes: false
                });
            }

            this.data.ctx_line.draw();
            this.data.ctx_turnover.draw();
            this.data.ctx_macd.draw();
        },
        dataProcess(originData) {
            let maxVal_kLine = -Infinity;
            let minVal_kLine = Infinity;

            let maxVal_kTurnover = -Infinity;

            let maxVal_kMacd = -Infinity;
            let minVal_kMacd = Infinity;


            // 蜡烛图 数据
            this.data.showData = [];

            //"2017-01-06,17.00,17.10,17.40,16.90,1462083,25.1亿,2.95%,+12.32"
            // [日期0，开盘价1，现价2，最高价3，最低价4，成交量5，成交额6，振幅7，涨跌8]
            originData.forEach((item, index) => {
                const arr = item.trim().split(',');
                // 单个 data 数据
                let curr = {};
                if (index) {
                    if (index == originData.length - 1) {
                        this.setData({
                            showDataEndDate: arr[0].trim()
                        });
                    }
                    const close = +arr[2];
                    const last = this.data.showData[this.data.showData.length - 1];
                    const EMA12 = last.EMA12 * (11 / 13) + close * (2 / 13);
                    const EMA26 = last.EMA26 * (25 / 27) + close * (2 / 27);
                    const DIFF = EMA12 - EMA26;
                    const DEA = last.DEA * (8 / 10) + DIFF * (2 / 10);
                    const MACD = 2 * (DIFF - DEA);

                    curr = { date: arr[0].trim(), EMA12, EMA26, DIFF, DEA, MACD };
                } else {
                    this.setData({
                        showDataStartDate: arr[0].trim()
                    });
                    curr = {
                        date: arr[0].trim(),
                        EMA12: +arr[2],
                        EMA26: +arr[2],
                        DIFF: 0,
                        DEA: 0,
                        MACD: 0
                    };
                }


                if (index >= optData.bn - this.data.showDataLen) {
                    if (arr[3] > maxVal_kLine) {
                        maxVal_kLine = +arr[3];
                    }
                    if (arr[4] < minVal_kLine) {
                        minVal_kLine = +arr[4];
                    }
                    if (arr[5] > maxVal_kTurnover) {
                        maxVal_kTurnover = +arr[5];
                    }

                    (curr.DIFF > maxVal_kMacd) && (maxVal_kMacd = curr.DIFF);
                    (curr.DEA > maxVal_kMacd) && (maxVal_kMacd = curr.DEA);
                    (curr.MACD > maxVal_kMacd) && (maxVal_kMacd = curr.MACD);

                    (curr.DIFF < minVal_kMacd) && (minVal_kMacd = curr.DIFF);
                    (curr.DEA < minVal_kMacd) && (minVal_kMacd = curr.DEA);
                    (curr.MACD < minVal_kMacd) && (minVal_kMacd = curr.MACD);
                }

                this.data.showData.push(Object.assign(curr, {
                    open: +arr[1],
                    close: +arr[2],
                    high: +arr[3],
                    low: +arr[4],
                    volume: +arr[5],  // 成交量
                    riseFall: arr[8],  // 涨跌
                    amplitude: arr[7]   // 涨幅
                }));
            });

            // 图像不足一屏,显示在左边
            if (this.data.graphOnLeft) {
                this.data.showData = this.data.showData.concat(Array(Math.abs(optData.bn - this.data.showDataLen)).fill({ invalide: true }));
            }
            return {
                maxVal_kLine,
                minVal_kLine,
                maxVal_kTurnover,
                maxVal_kMacd,
                minVal_kMacd,
                overShowDataLen: this.data.showData.length - optData.bn
            };
        },
        // 点击图像 处理
        tapCanvas(isShow) {
            const changeObj = {};
            if (!isShow) {
                changeObj.showCrosshair = !this.data.showCrosshair;
            }

            if (isShow || changeObj.showCrosshair) {
                const index = Math.round((this.data.endX - (5 / 750) * optData.sw - optData.mw) / optData.bw) - 1;
                const turnIndex = index + this.data.showData.length - optData.bn;
                const item = this.data.showData[turnIndex];
                const lastItem = this.data.showData[turnIndex < 1 ? 0 : turnIndex - 1];
                if (index < 0 || index >= optData.bn || item.invalide) {
                    return;
                }
                if (this.data.KLine) {
                    changeObj.crossYaxis = Math.round(this.data.KLine.numToYaxis(item.close)) + 'px';
                }
                changeObj.crossXaxis = Math.round(optData.mw + optData.bw * (index + 1) - 0.5) + 'px';

                changeObj.lineLabel = {
                    o: item.open,
                    c: item.close,
                    h: item.high,
                    l: item.low,
                    v: item.riseFall,
                    f: item.amplitude
                };
                // 十字线时间
                changeObj.crosshairDate = item.date;

                // 成交量
                changeObj.turnoverLabel = item.volume;
                if (changeObj.turnoverLabel > 10000) {
                    changeObj.turnoverLabel = (changeObj.turnoverLabel / 10000).toFixed(2) + '万';
                }
                changeObj.macdLabel = {
                    MACD: item.MACD.toFixed(3),
                    DIFF: item.DIFF.toFixed(3),
                    DEA: item.DEA.toFixed(3)
                }
                // 颜色相关
                // k 线 选择时,是否为红色
                changeObj.lineLabelIsRed = {
                    o: item.open < lastItem.open,
                    c: item.open > lastItem.open,
                    h: item.open > lastItem.open,
                    l: item.open < lastItem.open,
                    v: +item.riseFall > 0,
                    f: !/^[-—]/.test(`${item.amplitude}`.trim())
                };
                if (item.open < item.close) {
                    changeObj.turnoverLabelIsRed = true;
                } else {
                    changeObj.turnoverLabelIsRed = false;
                }
                if (item.MACD > 0) {
                    changeObj.macdLabelMACDIsRed = true;
                } else {
                    changeObj.macdLabelMACDIsRed = false;
                }
            }
            this.setData(changeObj);
        },
        // 滑动图像 处理
        swipCanvas() {
            if (!this.data.mTimeout || this.data.allData.length < 5) {
                return;
            }
            this.data.graphOnLeft = false;
            this.data.showDataLen = optData.bn;

            let ind = Math.round((this.data.endX - (5 / 750) * optData.sw - optData.mw) / optData.bw) - 1;
            ind = ind < 0 ? 0 : ind > optData.bn - 1 ? optData.bn : ind;

            let resInd = this.data.moveStartShowDataStart + ind - this.data.moveStartIndex;
            if (resInd > this.data.allData.length - 5) {
                this.data.showDataStart = this.data.allData.length - 5;
            } else if (resInd < 0) {
                this.data.showDataStart = resInd < 5 - optData.bn ? 5 - optData.bn : resInd;
                this.data.showDataLen = optData.bn - this.data.showDataStart;
                this.data.graphOnLeft = true;
            } else {
                this.data.showDataStart = resInd;
            }
            this.draw();
        },
        // 左右滑动
        canvasTouchstart: function (e) {
            this.data.startX = e.touches[0].pageX;
            this.data.startY = e.touches[0].pageY;
            this.data.endX = e.touches[0].pageX;
            this.data.endY = e.touches[0].pageY;

            const ind = Math.round((this.data.endX - (5 / 750) * optData.sw - optData.mw) / optData.bw) - 1;
            this.data.moveStartIndex = ind < 0 ? 0 : ind > optData.bn - 1 ? optData.bn : ind;

            this.data.touchStartMilliSec = new Date().getTime();
            this.data.maxDistance = 0;

            this.data.moveStartShowDataStart = this.data.showDataStart;
        },
        canvasTouchmove: function (e) {
            const curX = e.touches[0].pageX;
            const curY = e.touches[0].pageY;

            let dis = Math.abs(curX - this.data.startX);
            if (this.data.maxDistance < dis) {
                this.data.maxDistance = dis;
            }
            dis = Math.abs(curY - this.data.startY);
            if (this.data.maxDistance < dis) {
                this.data.maxDistance = dis;
            }

            if (Math.abs(curX - this.data.endX) > optData.bw) {
                this.data.endX = curX;
                if (this.data.showCrosshair) {
                    this.tapCanvas(true);
                } else {
                    this.data.mTimeout = true;
                    // clearTimeout(this.data.mTimeout);
                    // this.data.mTimeout = setTimeout(() => {

                    // }, 350);
                    this.swipCanvas();
                }
            }
        },
        canvasTouchend: function (e) {
            this.data.mTimeout = null;
            if (this.data.maxDistance < 6) {
                const milliSecLen = new Date().getTime() - this.data.touchStartMilliSec;
                if (milliSecLen > 40 && milliSecLen < 500) {
                    this.tapCanvas();
                }
            }
        }
    }
})
