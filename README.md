# vue-emoji

<p align="center">
  <a href="https://travis-ci.org/rishiqing/rishiqing-deploy/builds"><img src="https://img.shields.io/travis/rishiqing/vue-emoji.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/dt/rui-vue-emoji.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/v/rui-vue-emoji.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/l/rui-vue-emoji.svg" alt="License"></a>
  <br>
</p>

基于 Vue2.0 的emoji插件

[English](./README-EN.MD)

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

### 方法

#### `appendTo`
这个方法需要在父组件`mounted`的是时候进行调用， 以便初始化参数。
至少需要传递两个参数`area`以及`btn`, area表示需要将表情插入的地方， `btn`表示触发表情弹窗显示的按钮。
可选的`position`选项用于设置表情框的位置， 默认为`top center`, 表示在位于按钮的上方， 居中显示。 当第一个参数不为top的时候， 将会置于按钮下方。 第二个参数表示弹窗相对于按钮的位置， 可选的有`left`, `center`, `right`三个选项。

#### `calcPosition`
用于重新计算弹窗的位置， 当`[contenteditable]`内容增加的情况下， 通常其高度也会变化， 这个时候需要重新进行计算以更新弹窗的位置。 遗憾的是， 我没能找到一种自动监听其变化的方法， 所以需要手动监听， 然后再进行调用。

`app.vue`
```js
watch: {
  showEmoji (value) { // showEmoji 为控制弹窗隐藏显示的属性。
    if (value) {
      this.$refs.emoji.calcPosition();
    }
  }
}
```

#### `getImgPathByUnicode`
该方法接收一个表情编码， 如果能够找到对应的图片， 则会返回基于前面设定的路径的图片，  如果没有找到， 则会返回null。
```html
<vue-emoji
  v-show = 'showEmoji'
  ref = 'emoji'
  :unicode='true'
  @select = 'handleSelect'
  @hide = 'hide()'
></vue-emoji>
```

```js
handleSelect (img) {
  if (img.nodeType === 3) {
    var $img = new Image();
    $img.src =  this.$refs.emoji.getImgPathByUnicode(img.textContent);
    $app1.appendChild($img);
  }
  this.hide();
}
```

#### `setPath`
用于指定所需使用的图片的地址路径。 默认为当前根目录下的`images/`， 推荐使用CDN.

### 属性

#### `unicode`
默认情况下当选中一个表情的时候会以图片的方式插入对应区域。你可以通过配置`unicode`选项来开启`Unicode`支持， 也就是说， 在这种情况下， 选中一个表情的时候， 会插入对应的`Unicode`字符。需要注意的是， 相比于图片模式， 使用`Unicode`的时候会缺少一些表情。

```html
<vue-emoji
  v-show = 'showEmoji'
  ref = 'emoji'
  :unicode='true'
  @select = 'hide()'
  @hide = 'hide()'
></vue-emoji>
```

#### `captions`
默认情况下， 会使用`表情、自然、物品、地点、符号`来作为每个emoji栏目的标题， 可以通过使用组件的时候传入`captions`参数， 来改变标题文字。
```html
<vue-emoji
  v-show = 'showEmoji'
  ref = 'emoji'
  :captions = 'captions'
  @select = 'showEmoji = false'
  @hide = 'handleHide'
></vue-emoji>
```
```js
data () {
  return {
    captions: ['Expressions', 'Nature', 'Goods', 'Lacation', 'Symbol']
  }
}
```


## 开发
```
git clone git@github.com:rishiqing/vue-emoji.git
cd vue-emoji
yarn
npm start
```
### 一些小问题
因为接触Vue的时间比较短， 仓促之下做的这个东西也有太多不完善的地方。 比如我希望的是， 能够在`template`中就将元素的一些属性传递过去， 从而取代在`mounted`方法里面手动调用`appendTo`
的方式， 因为在我看来我现在的这种实现就是一个丑陋的hack, 然而当我多次尝试之后， 也没有找到一个能够在父组件中渲染子组件的时候， 向子组件里面传递父组件其他DOM节点的引用的方法。
当然， 也许更大的原因还是在于我设计上的失误。所以， 如果你有更好的方法， 欢迎告诉我， 在下不胜感激。
