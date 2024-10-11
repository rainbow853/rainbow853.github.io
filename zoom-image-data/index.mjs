class ZoomImageData {
    constructor(param) {
        const { inData, inw, inh, outData, outw, outh, cellRatio, splitCell, splitCellSize } = param;
        this.inData = new Uint32Array(inData);
        this.inw = inw;
        this.outData = new Uint32Array(outData);
        this.inh = inh;
        this.outw = outw;
        this.outh = outh;
        this.splitCell = splitCell || false;
        this.splitCellSize = splitCellSize || 2;
        const cellWH = param.cellWH || 10;
        this.cellRatio = cellRatio || 1;
        if (this.cellRatio > 1) {
            this.cellW = cellWH;
            this.cellH = ~~(this.cellW / this.cellRatio);
        }
        else {
            this.cellH = cellWH;
            this.cellW = ~~(this.cellH * this.cellRatio);
        }
        this.zoomw = this.cellW * inw;
        this.zoomh = this.cellH * inh;
        this.resize(true);
    }
    /**
     * Update outputData
     */
    update() {
        const { inData, inw, inh, cellW, cellH, outData, outw, outh, invScale, invDx, invDy, splitCell, splitCellSize, } = this;
        const splitX = splitCell && (cellW / invScale) > splitCellSize;
        const splitY = splitCell && (cellH / invScale) > splitCellSize;
        let lr = -1;
        for (let i = 0; i < outh; i++) {
            const r = Math.floor((i * invScale + invDy) / cellH);
            if (r < 0 || r >= inh ||
                (splitY && lr !== r)) {
                outData.fill(0, i * outw, (i + 1) * outw);
                lr = r;
                continue;
            }
            lr = r;
            let lc = -1;
            for (let j = 0; j < outw; j++) {
                const c = Math.floor((j * invScale + invDx) / cellW);
                let index = i * outw + j;
                if (c < 0 || c >= inw ||
                    (splitX && lc !== c)) {
                    outData[index] = 0;
                    lc = c;
                    continue;
                }
                lc = c;
                outData[index] = inData[r * inw + c];
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
        this.updateMatrix(this.scale, this.dx + dx, this.dy + dy, silent);
    }
    /**
     * Scale ratio multiple at position(cx,cy) on outdata
     * @param cx
     * @param cy
     * @param ratio
     * @param silent Whether update outData
     */
    zoom(cx, cy, ratio, silent) {
        const { dx, dy, scale } = this;
        this.updateMatrix(scale * ratio, (dx - cx) * ratio + cx, (dy - cy) * ratio + cy, silent);
    }
    /**
     * like:
     *    background-size: contain;
     *    background-repeat: no-repeat;
     *    background-position: center;
     * @param silent Whether update outData
     */
    resize(silent) {
        const { zoomw, zoomh, outw, outh } = this;
        let scale;
        if (outw / outh > zoomw / zoomh) {
            scale = outh / zoomh;
        }
        else {
            scale = outw / zoomw;
        }
        this.updateMatrix(scale, (outw - zoomw * scale) / 2, (outh - zoomh * scale) / 2, silent);
    }
    /**
     * Update the transformation matrix.
     */
    updateMatrix(scale, dx, dy, silent) {
        this.scale = scale;
        this.dx = dx;
        this.dy = dy;
        this.updateInvMatrix();
        silent || this.update();
    }
    /**
     * Update the transformation matrix.
     */
    updateInvMatrix() {
        this.invScale = 1 / this.scale;
        this.invDx = -this.dx / this.scale;
        this.invDy = -this.dy / this.scale;
    }
    inCoorIsIn(x, y) {
        const { inw, inh } = this;
        return x >= 0 && x < inw && y >= 0 && y < inh;
    }
    outCoorIsIn(x, y) {
        const { outw, outh } = this;
        return x >= 0 && x < outw && y >= 0 && y < outh;
    }
    transInToOut(coors) {
        const { scale, dx, dy, cellW, cellH } = this;
        const result = [];
        for (let i = 1; i < coors.length; i = i + 2) {
            // Center
            result.push(~~((coors[i - 1] + 0.5) * cellW * scale + dx), ~~((coors[i] + 0.5) * cellH * scale + dy));
        }
        return result;
    }
    transOutToIn(coors) {
        const { invScale, invDx, invDy, cellW, cellH } = this;
        const result = [];
        for (let i = 1; i < coors.length; i = i + 2) {
            result.push(~~((coors[i - 1] * invScale + invDx) / cellW), ~~((coors[i] * invScale + invDy) / cellH));
        }
        return result;
    }
}
export { ZoomImageData, ZoomImageData as default };
