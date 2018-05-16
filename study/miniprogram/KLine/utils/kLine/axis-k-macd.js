/**
 * 绘制k线图坐标
 * @class Axis
 * @author txj
*/
const onePixelLine = require('./onePixelLine');
const globalData = getApp().globalData;

class Axis {
    constructor(ctx, maxVal, minVal, height) {
        this.ctx = ctx;
        this.width = globalData.gw;
        this.height = height;

        this.minVal = minVal;
        this.maxVal = maxVal;
        this.valLen = Math.abs(this.maxVal) + Math.abs(this.minVal);

        this.zero = this.valLen != 0 ? height * Math.abs(maxVal) / this.valLen : 0;
        if (minVal >= 0) {
            this.zero = this.height;
        }
        if (maxVal <= 0) {
            this.zero = 0;
        }

        this.init();
    }
    init() {
        const ctx = this.ctx;
        // 清屏
        ctx.clearRect(0, 0, this.width, this.height);

        // 方框
        onePixelLine(ctx, 1, 1, this.width - 1, 1);
        onePixelLine(ctx, this.width - 1, 1, this.width - 1, this.height - 1);
        onePixelLine(ctx, this.width - 1, this.height - 1, 1, this.height - 1);
        onePixelLine(ctx, 1, this.height - 1, 1, 1);

        // 零线,及其坐标数值
        if (this.minVal < 0 && this.maxVal > 0) {
            onePixelLine(ctx, 1, this.zero, this.width - 1, this.zero);
            this.yAxisLabel(ctx, 0, 3, 1 + this.zero);
        }

        // 最大、最小值,坐标数值
        this.yAxisLabel(ctx, this.maxVal.toFixed(2), 3, 1, 'top');
        this.yAxisLabel(ctx, this.minVal.toFixed(2), 3, -1 + this.height);
    }
    yAxisLabel(ctx, text, x, y, verticalAlign = 'bottom', align = 'left') {
        ctx.setFillStyle(globalData.colors.generalChar);
        ctx.setFontSize(10);
        ctx.setTextAlign(align);
        ctx.setTextBaseline(verticalAlign);
        ctx.fillText(text, x, y);
    }

    numLineToZero(num, Xaxis, color) {
        onePixelLine(this.ctx, Xaxis, this.numToYaxis(num), Xaxis, this.zero, color, globalData.bw * 0.7);
    }

    numToYaxis(num) {
        return (Math.abs(this.maxVal) - num) * this.height / this.valLen;
    }
}

module.exports = Axis;