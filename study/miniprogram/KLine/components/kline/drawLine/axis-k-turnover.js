/**
 * 绘制k线图坐标
 * @class Axis
 * @author txj
*/
const onePixelLine = require('./onePixelLine');
const optData = require('../optData');

class Axis {
    constructor(ctx, maxVal, height) {
        this.ctx = ctx;
        this.width = optData.gw;
        this.height = height;

        this.minVal = 0;
        this.maxVal = maxVal;

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
    }

    numLineToBottom(num, Xaxis, color) {
        onePixelLine(this.ctx, Xaxis, this.numToYaxis(num), Xaxis, this.height, color, optData.bw * 0.7);
    }

    numToYaxis(num) {
        return (this.maxVal - num) * this.height / (this.maxVal - this.minVal);
    }
}

module.exports = Axis;