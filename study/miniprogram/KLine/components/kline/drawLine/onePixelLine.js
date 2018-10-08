/**
 * 绘制单像素直线
*/
const optData = require('../optData');

/**
 *
 * @param ctx 画笔
 * @param fromX 起点 x 坐标
 * @param fromY  起点 y 坐标
 * @param toX 终点 x 坐标
 * @param toY 终点 y 坐标
 * @param color 线条颜色,不传,就是坐标系的颜色
 * @param lineWidth 线条宽度,不传,就是最细宽度
 */
module.exports = function (ctx, fromX, fromY, toX, toY, color = optData.colors.axis, lineWidth = optData.hairlineWidth) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.closePath();
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle(color);
    ctx.stroke();
}