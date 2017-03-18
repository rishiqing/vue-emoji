# vue-emoji

<p align="center">
  <a href="https://travis-ci.org/rishiqing/rishiqing-deploy/builds"><img src="https://img.shields.io/travis/rishiqing/vue-emoji.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/dt/rui-vue-emoji.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/v/rui-vue-emoji.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/rui-vue-emoji"><img src="https://img.shields.io/npm/l/rui-vue-emoji.svg" alt="License"></a>
  <br>
</p>

An Emoji component for Vue2.0


![Vue-emoji](https://camo.githubusercontent.com/a63545c2d6c885e1b8486fe27a4a3582404f1a7a/687474703a2f2f6f6d776b6a316739392e626b742e636c6f7564646e2e636f6d2f5675652d656d6f6a692e676966)

## install
```
yarn add rui-vue-emoji
```

## usage
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
### used with webpack

```js
// styles.js
import 'rui-vue-emoji/dist/vue-emoji.css';
```
You may also consider use the emoji-sprite and single emoji-picture with `CDN`, then you need make some little changes in your css and js files.

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
Something you need to notice is that you should control the sprite path in your css file and single emoji picture path in js file.

## options

### event
* `select`: When a emoji is selected, the `select`event will be triggerd. The only parameter is an `img` element.
* `hide`: When `hide` event is triggerd, you need to close the emoji-pop in the parent component. It always triggerd when an element in page is clicked, and the click event object will be passed as the param.

### methods

#### `appendTo`
You need to call this method when the parent component mounted to initialilze the params of emoji component. An object at least contains two properties `area` and `btn` should be passed as param. `area` means the element you want the emoji inserted and `btn` means the button is used to trigger emoji pop. The property `position` is optional. It can decide the emoji-pop's postion relative to the button. The default value is `top center`, means the emoji-pop is on the top of button and in the horizontal direction it's center is button. You can use `top` or `bottom` for vertical and `left`,`center` or `right` for horizontal.

### props

#### `captions`
By default, component uses Chinese as captions for diffrent emoji pannels like `表情、自然、物品、地点、符号`. If you want to use others, you can passed `captions` props in vue-template. The captions should be an Array, and each item should be a string.
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


## development
```
git clone git@github.com:rishiqing/vue-emoji.git
cd vue-emoji
yarn
npm start
```
