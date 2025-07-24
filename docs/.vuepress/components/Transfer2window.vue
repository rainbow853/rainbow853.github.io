<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import TransferToWindow from 'transfer-to-window';

const inw = ref(64);
const inh = ref(64);
const outw = document.body.clientWidth;
const outh = document.body.clientHeight;
const minWH = ref(20);
const maxWH = ref(163840);
const limitInWindow = ref(true);
const limitSize = ref(100);
const transferData = ref(new TransferToWindow({
    inw: inw.value,
    inh: inh.value,
    outw,
    outh,
    minWH: minWH.value,
    maxWH: maxWH.value,
    limitInWindow: limitInWindow.value,
    limitSize: limitSize.value,
}))
const el = ref<HTMLElement>();
const style = computed(() => {
    if (!transferData) return;
    const { scale, dx, dy } = transferData.value;
    return {
        width: `${inw.value}px`,
        height: `${inh.value}px`,
        transform: `translate(${dx}px,${dy}px) scale(${scale})`
    }
})

watchEffect(() => {
    transferData.value = new TransferToWindow({
        inw: inw.value,
        inh: inh.value,
        outw,
        outh,
        minWH: minWH.value,
        maxWH: maxWH.value,
        limitInWindow: limitInWindow.value,
        limitSize: limitSize.value,
    })
})

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
    transferData.value.translate(cur[0] - pos[0], cur[1] - pos[1]);
    pos = cur;
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
    transferData.value.zoom(coor[0], coor[1], e.deltaY < 0 ? 1.1 : 0.9);
}

/**
 * 获取鼠标相对于canvas的坐标
 */
function getPosition(e: MouseEvent) {
    let rect = el.value!.getBoundingClientRect();
    return [e.pageX - rect.left, e.pageY - rect.top];
}

function reset() {
    transferData.value.resize();
}

</script>
<template>
    <div class="warpper" ref="el" @mousedown="mousedown" @wheel="wheel">
        <div :style="style"></div>
    </div>
    <div class="handle-dialog">
        <div>
            -> {{ outw }}/{{ outh }} <el-button @click="reset">刷新</el-button>
        </div>
        <div>
            {{ inw }}/{{ inh }}
            <el-input-number v-model="inw" :min="64" :max="16384" :step="100" />
            <el-input-number v-model="inh" :min="64" :max="16384" :step="100" />
        </div>
        <div>
            最小的宽高尺寸
            <el-input-number v-model="minWH" :min="64" :max="500" :step="1" />
        </div>
        <div>
            最大的宽高尺寸
            <el-input-number v-model="maxWH" :min="minWH" :max="163840" :step="100" />
        </div>
        <div>
            是否限制于窗口内部
            <el-switch v-model="limitInWindow" />
        </div>
        <div>
            窗口内的最小像素值
            <el-input-number v-model="limitSize" :min="0" :max="300" :step="1" />
        </div>
    </div>
</template>
<style scoped>
.warpper {
    position: fixed;
    inset: 0;
}

.warpper>div {
    background: linear-gradient(#39cccc, #f650cc);
    transform-origin: 0 0 0;
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