let hairlineWidth, // 最细线
    sw; // 屏幕宽度
wx.getSystemInfo({
    success: res => {
        hairlineWidth = 1 / res.pixelRatio;
        sw = res.screenWidth;
    }
});
// 图表宽度, 544 设计稿宽度
const chartWidth = sw * 544 / 750;
// 分时高度, 466 设计稿宽度
const timeshareHeight = sw * 466 / 750;
// 分量高度, 178 设计稿宽度
const quantumHeight = sw * 178 / 750;

// 刻度宽度, 240 = 4h, 再加上1为 11:30 - 13:00
const scaleCnt = 241;
const scaleWidth = chartWidth / scaleCnt;

// 红色k线
const redCor = '#dd2604';
// 绿色k线
const greenCor = '#2ea912';
// 灰色k线
const grayCor = '#d4d4d4';
// 平均价位线
const avgCor = '#da7817';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        originData: {
            type: Object,
            value: '',
            observer: function (newData) {
                this.processOriginData(newData);
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesterdayClose: 0,
        // 分时图画笔
        ctx_timeshare: null,
        // 分时量画笔
        ctx_quantum: null,
        // 分时图,标记
        timeShareWordsIsRed: false,
        // 分时量,标记
        quantumWrapWordsIsRed: false,
        // 是否显示五档图
        isFiveLevel: true,
        // 是否显示 十字线
        showCrosshair: false,
        // 十字线坐标横轴
        crossXaxis: '0',
        // 十字线标标纵轴
        crossYaxis: '0',
        crosshairText: '',
        tsData: [],
        fiveData: {
            buy: [],
            sale: []
        },
        detailData: [],
        maxPrice: 1,
        minPrice: 0,

        // 分时总量
        maxVolume: '',
        // 分时分量
        oneVolume: '',
        // 价
        timeSharePrice: '',
        // 值
        timeShareValue: '',
        // 均
        timeShareAvg: '',
        // 幅
        timeShareZf: ''
    },
    ready() {
        this.data.ctx_timeshare = wx.createCanvasContext('time-share-canvas', this);
        this.data.ctx_quantum = wx.createCanvasContext('quantum-canvas', this);
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processOriginData(d) {
            if (!d.timeseries) {
                return;
            }
            d.timeseries.sort((a, b) => (a.time - b.time));
            this.data.tsData = d.timeseries;
            const fiveData = { buy: [], sale: [] };
            d.fiveLevel.forEach(item => {
                fiveData.buy.push([(+item.buy).toFixed(2), item.buy_size]);
                fiveData.sale.unshift([(+item.sale).toFixed(2), item.sale_size]);
            });
            const detailData = [];
            d.fiveDetail.forEach(item => {
                detailData.push({
                    time: this.getTime(item.time),
                    price: (+item.price).toFixed(2),
                    volume: item.volume,
                    volumeIsRed: item.direction === 1 ? true : false
                });
            });

            const { maxVolume, maxPrice, minVolume, minPrice } = this.getMaxMinVal(d.timeseries);
            this.data.maxPrice = maxPrice;
            this.data.minPrice = minPrice;
            this.setData({
                fiveData,
                detailData,
                maxVolume
            });
            this.drawTimeshare(this.data.ctx_timeshare, d.timeseries, d.yesterdayClose);
            this.drawQuantum(this.data.ctx_quantum, d.timeseries, { maxVolume, minVolume });
        },
        changeIsFiveLevel(event) {
            this.setData({
                isFiveLevel: event.currentTarget.dataset.param
            });
        },
        // 分时图
        drawTimeshare(ctx, d, yesterdayClose) {
            if (!(d.length > 0)) {
                return;
            }

            this.drawPrice(ctx, d);
            this.drawAvgPrice(ctx, d);

            if (!yesterdayClose) {
                yesterdayClose = d[0].price;
            }
            this.data.yesterdayClose = yesterdayClose;

            const midLine = this.val2Axis(yesterdayClose);

            if (yesterdayClose < this.data.maxPrice) {
                const splitWd = (100 * (this.data.maxPrice - yesterdayClose) / yesterdayClose).toFixed(2) + '%';
                const maxVal = this.data.maxPrice;
                const maxLine = this.val2Axis(maxVal);
                const oppositeMaxVal = yesterdayClose * 2 - this.data.maxPrice;
                const oppositeMaxLine = this.val2Axis(oppositeMaxVal);

                this.drawText(ctx, (+maxVal).toFixed(2), 1, maxLine, redCor, 'top');
                this.drawText(ctx, splitWd, chartWidth - 3, maxLine, redCor, 'top', 'right');
                this.drawRect(ctx, 0, maxLine, chartWidth, maxLine, grayCor);

                this.drawText(ctx, (+oppositeMaxVal).toFixed(2), 1, oppositeMaxLine, greenCor);
                this.drawText(ctx, '-' + splitWd, chartWidth - 3, oppositeMaxLine, greenCor, 'bottom', 'right');
                this.drawRect(ctx, 0, oppositeMaxLine, chartWidth, oppositeMaxLine, grayCor);
            }
            this.drawText(ctx, (+yesterdayClose).toFixed(2), 1, midLine, '#999');
            this.drawText(ctx, '0%', chartWidth - 3, midLine, '#999', 'bottom', 'right');
            this.drawRect(ctx, 0, midLine, chartWidth, midLine, grayCor);
            ctx.draw();
        },
        // 分时图,获取坐标
        val2Axis(val) {
            const chartheight = timeshareHeight * 0.66;
            const startHeight = timeshareHeight * 0.05;
            return Math.round(startHeight + chartheight * (1 - (val - this.data.minPrice) / (this.data.maxPrice - this.data.minPrice)));
        },
        // 画价格线
        drawPrice(ctx, d) {
            ctx.beginPath();
            ctx.setLineWidth(1);
            ctx.setStrokeStyle('#4789db');

            d.forEach((item, index) => {
                const x = Math.round(index * scaleWidth);
                const y = this.val2Axis(item.price);
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
            ctx.lineTo(Math.round(d.length * scaleWidth), timeshareHeight);
            ctx.lineTo(0, timeshareHeight);
            ctx.closePath();
            ctx.setFillStyle('#e2edfb');
            ctx.fill();
        },
        // 画文字
        drawText(ctx, text, x, y, color, verticalAlign = 'bottom', align = 'left') {
            ctx.setFillStyle(color);
            ctx.setFontSize(10);
            ctx.setTextAlign(align);
            ctx.setTextBaseline(verticalAlign);
            ctx.fillText(text, x, y);
        },
        // 画 平均线
        drawAvgPrice(ctx, d) {
            ctx.beginPath();
            ctx.setLineWidth(hairlineWidth);
            ctx.setStrokeStyle(avgCor);

            d.forEach((item, index) => {
                const x = Math.round(index * scaleWidth);
                const y = this.val2Axis(item.avg);
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
            ctx.closePath();
        },
        // 分量图
        drawQuantum(ctx, d, { maxVolume, minVolume }) {
            if (!(d.length > 0)) {
                return;
            }
            const getAxisVal = val => (val - minVolume) / (maxVolume - minVolume);

            d.forEach((item, index) => {
                const x = Math.round(index * scaleWidth);
                let cor = redCor;
                if (index === 0) {
                    if (parseFloat(item.change) < 0) {
                        cor = greenCor;
                    }
                } else {
                    if (parseFloat(item.change) < parseFloat(d[index - 1].change)) {
                        cor = greenCor;
                    }
                }
                this.drawRect(ctx, x, Math.round(quantumHeight * (1 - getAxisVal(item.volume))), x, quantumHeight, cor);
            });
            ctx.draw();
        },
        // 十字线标记
        crosshairMark(curX) {
            let index = Math.round((curX - sw * 8 / 750) / scaleWidth);
            index = index < 1 ? 0 : index > this.data.tsData.length - 2 ? this.data.tsData.length - 1 : index;

            let quantumWrapWordsIsRed = true;
            const item = this.data.tsData[index];
            if (index === 0) {
                if (parseFloat(item.change) < 0) {
                    quantumWrapWordsIsRed = false;
                }
            } else {
                if (parseFloat(item.change) < parseFloat(this.data.tsData[index - 1].change)) {
                    quantumWrapWordsIsRed = false;
                }
            }
            this.setData({
                crossXaxis: `${Math.round(index * scaleWidth)}px`,
                crossYaxis: `${this.val2Axis(item.price)}px`,
                crosshairText: this.getTime(item.time),
                timeShareWordsIsRed: item.price > this.data.yesterdayClose,
                quantumWrapWordsIsRed,
                oneVolume: item.volume,
                timeSharePrice: (+item.price).toFixed(2),
                timeShareValue: item.change,
                timeShareAvg: (+item.avg).toFixed(2),
                timeShareZf: item.roc
            });
        },
        getTime(datetime) {
            datetime += '';
            const t = datetime + '';
            return `${t.slice(-4, -2)}:${t.slice(-2)}`;
        },
        getMaxMinVal(d) {
            let maxVolume = -Infinity, maxPrice = -Infinity, minVolume = Infinity, minPrice = Infinity;
            d.forEach(item => {
                if (item.volume > maxVolume) {
                    maxVolume = item.volume;
                }
                if (item.volume < minVolume) {
                    minVolume = item.volume;
                }
                if (item.price > maxPrice) {
                    maxPrice = item.price;
                }
                if (item.price < minPrice) {
                    minPrice = item.price;
                }
            });
            return { maxVolume, maxPrice, minVolume, minPrice };
        },
        /**
         * Desc 绘制长方形
         *
         * @param ctx 画笔
         * @param fromX 起点 x 坐标
         * @param fromY  起点 y 坐标
         * @param toX 终点 x 坐标
         * @param toY 终点 y 坐标
         * @param color 线条颜色,不传,就是坐标系的颜色
         * @param lineWidth 线条宽度,不传,就是最细宽度
         */
        drawRect(ctx, fromX, fromY, toX, toY, color, lineWidth = hairlineWidth) {
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.closePath();
            ctx.setLineWidth(lineWidth);
            ctx.setStrokeStyle(color);
            ctx.stroke();
        },
        tapCanvas() {
            const showCrosshair = !this.data.showCrosshair;
            if (showCrosshair) {
                this.crosshairMark(this.data.startX);
            }
            this.setData({
                showCrosshair
            });
        },
        moveCanvas(curX) {
            this.crosshairMark(curX);
        },
        canvasTouchstart(e) {
            this.data.startX = e.touches[0].pageX;
            this.data.startY = e.touches[0].pageY;

            this.data.touchStartMilliSec = new Date().getTime();
            this.data.maxDistance = 0;

            this.data.lastX = 0;
        },
        canvasTouchmove(e) {
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

            if (Math.abs(curX - this.data.startX) > scaleWidth) {
                if (this.data.showCrosshair) {
                    this.moveCanvas(curX);
                }
            }
        },
        canvasTouchend(e) {
            if (this.data.maxDistance < 6) {
                const milliSecLen = new Date().getTime() - this.data.touchStartMilliSec;
                if (milliSecLen > 40 && milliSecLen < 500) {
                    this.tapCanvas();
                }
            }
        }
    }
})
