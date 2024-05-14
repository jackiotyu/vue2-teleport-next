<p align="center">
<img src="https://cdn.jsdelivr.net/gh/jackiotyu/vue2-teleport-next@1.0.2/assets/icon.png" style="width:200px;" />
</p>

<h1 align="center">vue2-teleport-next</h1>

![NPM 版本](https://img.shields.io/npm/v/vue2-teleport-next)
![NPM 下载量](https://img.shields.io/npm/dw/vue2-teleport-next)
![GitHub 许可证](https://img.shields.io/github/license/jackiotyu/vue2-teleport-next)

[English](./README.md) | 中文文档

vue2-teleport-next 是一个轻量级的 npm 包，旨在将 Vue 3 的 [teleport 组件](https://cn.vuejs.org/guide/built-ins/teleport) 功能无缝集成到 Vue 2 项目中。teleport 组件是 Vue 3 的内置组件，允许开发人员将子组件动态渲染到 DOM 树中的任何位置。该包充当了一个桥梁，使 Vue 2 开发人员能够利用 Vue 3 的 teleport 功能的强大功能，而无需完全迁移到 Vue 3。

👉[演示地址](https://stackblitz.com/edit/vue2-vite-starter-85hxf5?file=src%2FApp.vue)

**👍主要特性：**

- 轻量且易于集成到 Vue 2 项目中，为 Vue 2 开发人员提供逐步采用 Vue 3 特性的无缝过渡。
- 使用vue2的虚拟dom实现，性能出色

**📦安装：**

```
npm install vue2-teleport-next
```

**🫱用法：**

```html
<template>
  <div>
      <button @click="modalOpen = true">
          打开全屏模态框！（带有 teleport！）
      </button>

      <Teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            我是一个被传送的模态框！
            （我的父级是 "body"）
            <button @click="modalOpen = false">
              关闭
            </button>
          </div>
        </div>
      </Teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport-next';

export default {
  components: {
    Teleport,
  },
  data() {
    return {
      modalOpen: false
    }
  }
}
</script>
```

| 属性名称   | 类型                   | 描述                      |
|------------|------------------------|---------------------------|
| to         | [String, HTMLElement]  | 指定目标路由或元素。      |
| disabled   | Boolean                | 指示组件是否禁用。        |
| multiSlot  | Boolean                | 指示组件是否支持多个插槽。|

### ❗注意
**该组件有一个 `multiSlot` 属性。**
- 当设置为 `true` 时，它将接收所有插槽内容，但会在外层添加一个额外的节点。
- 当设置为 `false` 时，不会添加额外的外层节点，而只会渲染第一个插槽的内容。
- 默认值为 `false`。

🚀通过 vue2-teleport-next 在您的 Vue 2 项目中无缝使用 Vue 3 teleport 组件的强大功能吧！