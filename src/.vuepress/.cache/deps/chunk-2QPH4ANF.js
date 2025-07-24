// node_modules/transfer-to-window/dist/index.mjs
var TransferToWindow = class {
  /**
   *
   * @param param 参数列表
   * @param silent 是否计算输入输出窗口之间的变化矩阵
   */
  constructor(param, silent) {
    const { inw, inh, outw, outh, cellW, cellH, minWH, maxWH, limitInWindow, limitSize } = param;
    this.inw = inw;
    this.inh = inh;
    this.outw = outw;
    this.outh = outh;
    this.cellW = cellW !== null && cellW !== void 0 ? cellW : 1;
    this.cellH = cellH !== null && cellH !== void 0 ? cellH : 1;
    this.minWH = minWH || 1;
    this.maxWH = maxWH || Infinity;
    this.minScale = this.maxScale = 1;
    this.limitInWindow = limitInWindow || false;
    this.limitSize = limitSize !== null && limitSize !== void 0 ? limitSize : 100;
    silent || this.resize();
  }
  /**
   * 平移
   * @param dx
   * @param dy
   */
  translate(dx, dy) {
    this.updateMatrix(this.scale, this.dx + dx, this.dy + dy);
  }
  /**
   * 以(cx,cy)为中心缩放ratio比例
   * @param cx
   * @param cy
   * @param ratio
   */
  zoom(cx, cy, ratio) {
    const { dx, dy, scale, minScale, maxScale } = this;
    if (scale * ratio > maxScale) {
      ratio = maxScale / scale;
    } else if (scale * ratio < minScale) {
      ratio = minScale / scale;
    }
    this.updateMatrix(scale * ratio, (dx - cx) * ratio + cx, (dy - cy) * ratio + cy);
  }
  /**
   * 以InCoor：(cx,cy)为中心缩放到scale比例
   * @param cx
   * @param cy
   * @param scale
   */
  zoomToByInCoor(cx, cy, scale) {
    const { outw, outh, minScale, maxScale, cellW, cellH } = this;
    scale = Math.min(maxScale, Math.max(minScale, scale));
    this.updateMatrix(scale, outw / 2 - cx * scale * cellW, outh / 2 - cy * scale * cellH);
  }
  /**
   * 将输入数据完整放置于输出窗口的正中间；效果类似于CSS效果：
   *    background-size: contain;
   *    background-repeat: no-repeat;
   *    background-position: center;
   */
  resize() {
    const { outw, outh, inw, inh, minWH, maxWH } = this;
    let scale;
    if (outw / outh > inw / inh) {
      scale = outh / inh;
    } else {
      scale = outw / inw;
    }
    this.minScale = Math.min(scale, minWH / inw, minWH / inh);
    this.maxScale = Math.max(scale, maxWH / inw, maxWH / inh);
    this.updateMatrix(scale, (outw - inw * scale) / 2, (outh - inh * scale) / 2);
  }
  /**
   * 将输入窗口的roi:[x,y,width,heigght]区域放置于输出窗口正中间
   * @param x 起点位置x
   * @param y 起点位置y
   * @param width 宽
   * @param height 高
   * @param margin roi的margin值
   */
  scrollToRect(x, y, width, height, margin) {
    margin = margin !== null && margin !== void 0 ? margin : 100;
    const { outw, outh, cellW, cellH } = this;
    const scale = Math.min((outw - margin * 2) / width / cellW, (outh - margin * 2) / height / cellH);
    this.zoomToByInCoor(x + width / 2, y + height / 2, scale);
  }
  /**
   * 更新输入->输出矩阵
   */
  updateMatrix(scale, dx, dy) {
    if (this.limitInWindow) {
      const { inw, inh, outw, outh, limitSize } = this;
      dx = Math.min(outw - limitSize, Math.max(-inw * scale + limitSize, dx));
      dy = Math.min(outh - limitSize, Math.max(-inh * scale + limitSize, dy));
    }
    this.scale = scale;
    this.scaleX = scale * this.cellW;
    this.scaleY = scale * this.cellH;
    this.dx = dx;
    this.dy = dy;
    this.updateInvMatrix();
  }
  /**
   * 更新输出->输入矩阵
   */
  updateInvMatrix() {
    this.invScaleX = 1 / this.scaleX;
    this.invScaleY = 1 / this.scaleY;
    this.invDx = -this.dx * this.invScaleX;
    this.invDy = -this.dy * this.invScaleY;
  }
  /**
   * 坐标(x,y)是否位于输入视框内
   */
  inCoorIsIn(x, y) {
    const { inw, inh } = this;
    return x >= 0 && x < inw && y >= 0 && y < inh;
  }
  /**
   * 坐标(x,y)是否位于输出视框内
   */
  outCoorIsIn(x, y) {
    const { outw, outh } = this;
    return x >= 0 && x < outw && y >= 0 && y < outh;
  }
  /**
   * 转化坐标组(x,y,...)
   */
  transCoors(coors, scaleX, scaleY, dx, dy) {
    const result = [];
    for (let i = 1; i < coors.length; i = i + 2) {
      result.push(~~(coors[i - 1] * scaleX + dx), ~~(coors[i] * scaleY + dy));
    }
    return result;
  }
  /**
   * 将输入坐标组(x,y,...)转化为输出坐标组
   */
  transInToOut(coors) {
    const { scaleX, scaleY, dx, dy } = this;
    return this.transCoors(coors, scaleX, scaleY, dx, dy);
  }
  /**
   * 将输出坐标组(x,y,...)转化为输入坐标组
   */
  transOutToIn(coors) {
    const { invScaleX, invScaleY, invDx, invDy } = this;
    return this.transCoors(coors, invScaleX, invScaleY, invDx, invDy);
  }
};

export {
  TransferToWindow
};
//# sourceMappingURL=chunk-2QPH4ANF.js.map
