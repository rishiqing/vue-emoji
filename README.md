# vue-emoji

基于 Vue2.0 的emoji插件

![Vue-emoji](http://omwkj1g99.bkt.clouddn.com/Vue-emoji.gif)

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
      if (e.target === this.$refs.btn) return;
      this.hide();
    }
  }
});
```
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
