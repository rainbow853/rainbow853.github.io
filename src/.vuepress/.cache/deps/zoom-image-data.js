import {
  TransferToWindow
} from "./chunk-2QPH4ANF.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/zoom-image-data/dist/index.mjs
var ZoomImageData = class extends TransferToWindow {
  constructor(param) {
    const cellWH = param.cellWH || 10;
    const cellRatio = param.cellRatio || 1;
    let cellW = cellWH;
    let cellH = cellWH;
    if (cellRatio > 1) {
      cellH = ~~(cellW / cellRatio);
    } else {
      cellW = ~~(cellH * cellRatio);
    }
    super(Object.assign(Object.assign({}, param), {
      inw: cellW * param.inw,
      inh: cellH * param.inh,
      cellW,
      cellH
    }), true);
    const { inw, inh, inData, outData, splitCell, splitCellSize } = param;
    this.sourceW = inw;
    this.sourceH = inh;
    this.sourceData = new Uint32Array(inData);
    this.outData = new Uint32Array(outData);
    this.splitCell = splitCell || false;
    this.splitCellSize = splitCellSize || 2;
    this.resize(true);
  }
  /**
   * Update outputData
   */
  update() {
    const { sourceData, sourceW, sourceH, outData, outw, outh, invScaleX, invScaleY, invDx, invDy, splitCell, splitCellSize } = this;
    const splitX = splitCell && 1 / invScaleX > splitCellSize;
    const splitY = splitCell && 1 / invScaleY > splitCellSize;
    let lr = -1;
    for (let i = 0; i < outh; i++) {
      const r = Math.floor(i * invScaleY + invDy);
      if (r < 0 || r >= sourceH || splitY && lr !== r) {
        outData.fill(0, i * outw, (i + 1) * outw);
        lr = r;
        continue;
      }
      lr = r;
      let lc = -1;
      for (let j = 0; j < outw; j++) {
        const c = Math.floor(j * invScaleX + invDx);
        let index = i * outw + j;
        if (c < 0 || c >= sourceW || splitX && lc !== c) {
          outData[index] = 0;
          lc = c;
          continue;
        }
        lc = c;
        outData[index] = sourceData[r * sourceW + c];
      }
    }
  }
  /**
   * Translate on outdata
   * @param dx
   * @param dy
   * @param silent Whether update outData
   */
  translate(dx, dy, silent) {
    super.translate(dx, dy);
    silent || this.update();
  }
  /**
   * Scale ratio multiple at position(cx,cy) on outdata
   * @param cx
   * @param cy
   * @param ratio
   * @param silent Whether update outData
   */
  zoom(cx, cy, ratio, silent) {
    super.zoom(cx, cy, ratio);
    silent || this.update();
  }
  /**
   * 以InCoor：(cx,cy)为中心缩放到scale比例
   * @param cx
   * @param cy
   * @param scale
   * @param silent 是否更新outData
   */
  zoomToByInCoor(cx, cy, scale, silent) {
    super.zoomToByInCoor(cx, cy, scale);
    silent || this.update();
  }
  /**
   * 将输入数据完整放置于输出窗口的正中间；效果类似于CSS效果：
   *    background-size: contain;
   *    background-repeat: no-repeat;
   *    background-position: center;
   * @param silent Whether update outData
   */
  resize(silent) {
    super.resize();
    silent || this.update();
  }
  /**
   * 坐标(x,y)是否位于输入视框内
   */
  inCoorIsIn(x, y) {
    const { sourceW, sourceH } = this;
    return x >= 0 && x < sourceW && y >= 0 && y < sourceH;
  }
};
export {
  ZoomImageData,
  ZoomImageData as default
};
//# sourceMappingURL=zoom-image-data.js.map
