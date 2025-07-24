<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import ZoomImageData from 'zoom-image-data';

const canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
const inw = 64;
const inh = 64;
const inData = new ArrayBuffer(inw * inh * 4);
const outw = document.body.clientWidth;
const outh = document.body.clientHeight;
const outImageData = new ImageData(outw, outh);
const showMark = ref(true);
// [inCoor.x, inCoor.y, outCoor.x, outCoor,y]
const markCoor = ref([0.5, 0.5, -16384, -16384]);
const cellRatio = ref(2);
const splitCell = ref(true);
const splitCellSize = ref(1);
let zoomImageData: ZoomImageData;
const { setDirty, getDirty } = ((initValue?: boolean) => {
    let isDrity = initValue ?? true;
    function setDirty(flag: boolean) {
        isDrity = flag;
    }
    function getDirty() {
        return isDrity;
    }
    return { setDirty, getDirty }
})()

let lastMatrix: number[];
watchEffect(() => {
    // 记录下上次的matrix
    if (zoomImageData) lastMatrix = [zoomImageData.scale, zoomImageData.dx, zoomImageData.dy];
    
    zoomImageData = new ZoomImageData({
        inw,
        inh,
        inData,
        outw,
        outh,
        outData: outImageData.data.buffer,
        cellRatio: cellRatio.value,
        splitCell: splitCell.value,
        splitCellSize: splitCellSize.value,
        minWH: 128,
        limitInWindow: true,
        limitSize: 100,
    })

    // 还原上次的matrix
    // @ts-ignore
    lastMatrix && zoomImageData.updateMatrix(...lastMatrix);
    setDirty(true);
})




/**
 * 初始化inData
 */
function fillInData() {
    const sourceData = zoomImageData.sourceData;
    for (let y = 0; y < inh; y++) {
        const s = 4291611705 - y * 512;
        for (let x = 0; x < inw; x++) {
            sourceData[y * inw + x] = s + x * 3;
        }
    }
}

/**
 * 平移
 */
let pos: number[];
function mousedown(e: MouseEvent) {
    pos = getPosition(e);
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
}
function mousemove(e: MouseEvent) {
    const cur = getPosition(e);
    zoomImageData.translate(cur[0] - pos[0], cur[1] - pos[1]);
    pos = cur;
    setDirty(true);
}
function mouseup() {
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
}

/**
 * 缩放
 */
function wheel(e: WheelEvent) {
    const coor = getPosition(e);
    zoomImageData.zoom(coor[0], coor[1], e.deltaY < 0 ? 1.1 : 0.9);
    setDirty(true);
}

/**
 * 获取鼠标相对于canvas的坐标
 */
function getPosition(e: MouseEvent) {
    let rect = canvas.value!.getBoundingClientRect();
    return [e.pageX - rect.left, e.pageY - rect.top];
}

function update() {
    requestAnimationFrame(update);
    if (!getDirty()) return;
    setDirty(false);

    zoomImageData.update();
    const coor = zoomImageData.transInToOut(markCoor.value.slice(0, 2));
    markCoor.value[2] = coor[0];
    markCoor.value[3] = coor[1];

    ctx && ctx.putImageData(outImageData, 0, 0);
}

onMounted(() => {
    if (!canvas.value) return;
    canvas.value.width = outw;
    canvas.value.height = outh;
    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    fillInData();
    update();
})

function reset() {
    zoomImageData.resize();
    setDirty(true);
}

</script>
<template>
    <div class="warpper">
        <canvas ref="canvas" @mousedown="mousedown" @wheel="wheel"></canvas>
        <div class="coor"></div>
        <div v-if="showMark" class="mark" :style="{ left: `${markCoor[2]}px`, top: `${markCoor[3]}px` }"></div>
    </div>
    <div class="handle-dialog">
        <div>
            {{ inw }}/{{ inh }} -> {{ outw }}/{{ outh }} <el-button @click="reset">刷新</el-button>
        </div>
        <div>
            单元格宽高比例
            <el-input-number v-model="cellRatio" :min="0.5" :max="5" :step="0.5" />
        </div>
        <div>
            分割线<el-switch v-model="splitCell" />
        </div>
        <div>
            单元格分割线的像素值
            <el-input-number v-model="splitCellSize" :min="0" :max="100" :step="1" />
        </div>
        <div>
            显示mark<el-switch v-model="showMark" />
        </div>
        <div>
            mark坐标X
            <el-input-number v-model="markCoor[0]" :min="0" :max="inw" :step="0.5" @change="setDirty(true)" />
        </div>
        <div>
            mark坐标Y
            <el-input-number v-model="markCoor[1]" :min="0" :max="inh" :step="0.5" @change="setDirty(true)" />
        </div>
    </div>
</template>
<style scoped>
.warpper {
    position: fixed;
    inset: 0;
}

.coor {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
}

.mark {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.mark::before,
.mark::after {
    content: "";
    display: block;
    top: 0;
    left: 0;
    background: #f00;
    transform-origin: 0 0;
}

.mark::before {
    width: 100px;
    height: 1px;
}

.mark::after {
    background: #f0f;
    width: 1px;
    height: 100px;
}

.handle-dialog {
    position: fixed;
    left: 100px;
    top: 100px;
    padding: 20px;
    border: 1px solid #ccc;
    background: #fff;
}
</style>