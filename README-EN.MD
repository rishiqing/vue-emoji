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

## Install
```
yarn add rui-vue-emoji
```

## Usage
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
### Used with webpack

```js
// styles.js
import 'rui-vue-emoji/dist/vue-emoji.css';
```
You may also consider using the emoji-sprite and single emoji-picture with `CDN`, you can upload images in `./images` to your CDN and then you need to make some little changes in your css and js files.

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

## Options

### event
* `select`: When a emoji is selected, the `select`event will be triggerd. The only parameter is an `img` element.
* `hide`: When `hide` event is triggerd, you need to close the emoji-pop in the parent component. It always triggerd when an element in page is clicked, and the click event object will be passed as the param.

### Methods

#### `appendTo`
You need to call this method when the parent component mounted to initialilze the params of emoji component. An object at least contains two properties `area` and `btn` should be passed as param. `area` means the element you want the emoji inserted and `btn` means the button is used to trigger emoji pop. The property `position` is optional. It can decide the emoji-pop's postion relative to the button. The default value is `top center`, means the emoji-pop is on the top of button and in the horizontal direction it's center is button. You can use `top` or `bottom` for vertical and `left`,`center` or `right` for horizontal.

#### `calcPosition`
This method is used to recalc the position of emoji pop, when the content of element `[contenteditable]` added, usually it's height will be changed, so we need to recalc the position of pop. But unfortunately I cannot find a way to listen to the change of height automaticaly, so you should listen it manualy, and then called the method.

`app.vue`
```js
watch: {
  showEmoji (value) { // showEmoji is the prop that control the pop's display.
    if (value) {
      this.$refs.emoji.calcPosition();
    }
  }
}
```

### Props

#### `captions`
By default, component uses Chinese as captions for different emoji panels like `表情、自然、物品、地点、符号`. If you want to use others, you can passed `captions` props in vue-template. The captions should be an Array, and each item should be a string.
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


## Development
```
git clone git@github.com:rishiqing/vue-emoji.git
cd vue-emoji
yarn
npm start
```

### Some Problems
Because I've just used Vue for a little time, so this component has too many problems. Such as I hope that I can pass some props in `template` to instead of calling  `appendTo` method of component after it's parent mounted. I think the current implementation is an ugly hack, but after I tried too many times, I cannot still find a good way to pass some references of other DOM nodes to child component when parent component is rendering it. Of course, maybe the most important reason is that I've made a wrong design with this, so if you have a better way to solve it, please tell me, thanks a lot.

