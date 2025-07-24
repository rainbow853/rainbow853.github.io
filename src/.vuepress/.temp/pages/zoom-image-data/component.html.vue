<template><div><h2 id="效果" tabindex="-1"><a class="header-anchor" href="#效果"><span>效果</span></a></h2>
<ZoomImage /><h2 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes"><span>Attributes</span></a></h2>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
<th style="text-align:center">默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>content</td>
<td>按钮内容</td>
<td><code v-pre>string</code></td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td>name</td>
<td>图标class名：<code v-pre>kl-${name}</code></td>
<td><code v-pre>string</code></td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td>width</td>
<td>宽</td>
<td>`string</td>
<td style="text-align:center">number`</td>
</tr>
<tr>
<td>height</td>
<td>高</td>
<td>`string</td>
<td style="text-align:center">number`</td>
</tr>
<tr>
<td>warn</td>
<td>warn类型按钮</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td>large</td>
<td>large类型按钮</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td>highlight</td>
<td>高亮</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td>current</td>
<td>当前按钮</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td>disabled</td>
<td>禁用</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
<tr>
<td>canRemove</td>
<td>尾部是否有删除图标</td>
<td><code v-pre>boolean</code></td>
<td style="text-align:center">false</td>
</tr>
</tbody>
</table>
<h2 id="slot" tabindex="-1"><a class="header-anchor" href="#slot"><span>slot</span></a></h2>
<table>
<thead>
<tr>
<th>插槽名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>icon</td>
<td>图标</td>
</tr>
</tbody>
</table>
<h2 id="事件" tabindex="-1"><a class="header-anchor" href="#事件"><span>事件</span></a></h2>
<table>
<thead>
<tr>
<th>事件名</th>
<th style="text-align:center">参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>remove</td>
<td style="text-align:center">-</td>
<td>只可当canRemove为true时使用</td>
</tr>
</tbody>
</table>
</div></template>


<script setup>
import ZoomImage from './index.vue'
</script>