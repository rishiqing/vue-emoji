# vue-emoji
基于 Vue2.0 的emoji插件
![build](https://travis-ci.org/rishiqing/vue-emoji#)
![LICENSE](https://img.shields.io/github/license/mashape/apistatus.svg)

![Vue-emoji](https://camo.githubusercontent.com/a63545c2d6c885e1b8486fe27a4a3582404f1a7a/687474703a2f2f6f6d776b6a316739392e626b742e636c6f7564646e2e636f6d2f5675652d656d6f6a692e676966)

## 安装
```
yarn add rui-vue-emoji
```

## 使用示例
```html
<link rel="stylesheet" type="text/css" href="./node_modules/vue-emoji-component/dist/vue-emoji.css">
<script src = './vue.min.js'></script>
<script src = './node_modules/vue-emoji-component/dist/vue-emoji.js'></script>
```
```html
<div id="app">
  <div>
    <h1>Vue-Emoji</h1>
    <div contenteditable="" ref = 'edit' focus></div>
    <button ref = 'btn' @click = 'showEmoji = !showEmoji'>emoji</button>
    <vue-emoji
      v-show = 'showEmoji'
      ref = 'emoji'
      @select = 'showEmoji = false'
      @hide = 'handleHide'
    ></vue-emoji>
  </div>
</div>
```

```js
new Vue({
  el: '#app',
  components: {
    VueEmoji
  },
  data () {
    return {
      showEmoji : false
    }
  },
  mounted () {
    this.$refs.emoji.appendTo({
      area: this.$refs.edit,
      btn: this.$refs.btn,
      position: 'top left'
    });
  },
  methods: {
    hide () {
      this.showEmoji = false;
    },
    handleHide (e) {
      this.hide();
    }
  }
});
```
### 在`webpack`中引入

```js
// styles.js
import 'rui-vue-emoji/dist/vue-emoji.css';
```
你也可以考虑将雪碧图和单个图标上传到`CDN`, 那么需要改动一下`js`和`css`文件。

```css
[class*="sprite-"] {
  background-image: url("https://your.cdn.path/")!important;
}
```
```js
mounted () {
  this.$refs.emoji.appendTo({
    area: this.$refs.edit,
    btn: this.$refs.btn,
    position: 'top left'
  }).setPath('https://your.cdn.path/');
},
```
需要注意的是， 在`css`中控制雪碧图的路径， 在`js`中控制最后引用的单个表情图片的路径。


## 选项
### 事件
* `select`: 选中表情时会触发此事件， 事件参数为选中的表情对应的图片
* `hide`: 触发隐藏事件， 当发生这个事件后， 需要在父组件中对弹窗进行关闭, 含有一个事件对象， 表示点击的元素。
* 组件方法： `appendTo`

这个方法需要在父组件`mounted`的是时候进行调用， 以便初始化参数。
至少需要传递两个参数`area`以及`btn`, area表示需要将表情插入的地方， `btn`表示触发表情弹窗显示的按钮。
可选的`position`选项用于设置表情框的位置， 默认为`top center`, 表示在位于按钮的上方， 居中显示。 当第一个参数不为top的时候， 将会置于按钮下方。 第二个参数表示弹窗相对于按钮的位置， 可选的有`left`, `center`, `right`三个选项。

### 开发
```
git clone git@github.com:rishiqing/vue-emoji.git
cd vue-emoji
yarn
npm start
```
