<template>
  <div class="rui-emoji">
    <ul class="emoji-controller" @click = 'changeActive' ref = 'controller' v-clickoutside = 'hide'>
      <li v-for = 'pannel,index in pannels'>{{ titles[index] }}</li>
    </ul>
    <ul class = 'emoji-container' ref = 'view' @click = 'selectItem'>
      <li v-for = 'emojiGroup in emojis'>
        <a href="javascript:;" v-for = 'emoji in emojiGroup'>
           <span class = 'emoji-item'
             :title = 'emoji'
             :class = '"sprite-" + getPureName(emoji)'
           >
           </span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import RangeUtil    from './rangeUtil';
import data         from './emoji-data';
import clickoutside from './clickoutside';
import getUnicode   from './getUnicodeMap';

const EXT    = '.png';
const PREFIX = 'sprite-';
const AREA_HEIGHT = 186;
const AREA_WIDTH  = 380;
let Path = '../images/';

const toArray = arrayLike => [].slice.call(arrayLike);

const getEleIndex = (ele) => {
  if (!ele) return -1;
  if (!ele.parentElement) return -1;
  return toArray(ele.parentElement.children).indexOf(ele);
};
export default {
  name: 'rui-emoji',
  data () {
    return {
      emojiData: data,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0,
      selection: null,
    };
  },
  props: {
    captions: Array,
    unicode: {
      default: false,
    },
  },
  directives: {
    clickoutside
  },
  mounted () {
    this.$controllers = toArray(this.$refs.controller.querySelectorAll('li'));
    this.$views = toArray(this.$refs.view.querySelectorAll('li'));
    this.$nextTick(() => {
      this.selectByIndex(0);
    });
    this.useUnicode = this.unicode;
    this.$nextTick(() => {
      this.handleUnicode();
    });
  },
  destroyed () {
    this.$btn.removeEventListener('mousedown', this.saveSelection, false);
  },
  methods: {
    appendTo ({ area, btn, position } = {}) {
      this.$area = area;
      this.$btn = btn;
      this.__position = position || 'top center';
      this.saveSelection = this.saveSelection.bind(this);
      this.$btn.addEventListener('mousedown', this.saveSelection, false);
      this.calcPosition(position);
      return this;
    },
    setPath (path) {
      if (path) {
        Path = path;
      }
      return this;
    },
    handleUnicode () {
      if (!this.useUnicode) return;
      console.time('handleUnicode')
      const view = this.$refs.view;
      const data = this.emojiData;
      Object.keys(data).forEach(panel => {
        const panelEmoji = data[panel];
        Object.keys(panelEmoji).forEach(item => {
          if (!getUnicode(this.getPureName(item))) {
            const ele = view.querySelector(`[title="${item}"]`);
            if (ele) {
              ele.parentElement.remove();
            }
          }
        });
      });
      console.timeEnd('handleUnicode')
    },
    calcPosition (position = this.__position) {
      const [vertical, horizontal] = position.split(' ');
      this.setVertical(vertical);
      this.setHorizontal(horizontal);
    },
    setVertical (vertical) {
      const btnTop = this.$btn.offsetTop, btnHeight = this.$btn.offsetHeight;
      if (vertical === 'top') {
        this.$el.style.top =  (btnTop - AREA_HEIGHT) + 'px';
      } else {
        this.$el.style.top =  (btnTop + btnHeight + 10) + 'px';
      }
    },
    setHorizontal (horizontal) {
      const btnLeft = this.$btn.offsetLeft, btnWidth = this.$btn.offsetWidth;
      let left;
      switch (horizontal) {
        case 'left':
          left = btnLeft;
          break;
        case 'right':
          left = btnLeft + btnWidth;
          break;
        default:
          left = btnLeft - AREA_WIDTH / 2;
      }
      this.$el.style.left = left + 'px';
    },

    hasFocus () {
      return document.activeElement === this.$area;
    },
    saveSelection () {
      if (this.hasFocus()) {
        this.selection = RangeUtil.saveSelection();
      }
    },
    insertEmoji (img) {
      this.$area.focus();
      if (this.selection) {
        RangeUtil.restoreSelection(this.selection);
      }
      this.$nextTick(() => {
        try {
          RangeUtil.replaceSelection(img);
          this.$area.focus();
        } catch (e) {}
      });
    },
    changeActive (e) {
      const tar = e.target;
      if (tar.tagName.toLowerCase() === 'ul') return;
      const index = getEleIndex(tar);
      if (index === this.activeIndex) return;
      this.activeIndex = index;
    },
    getPureName (name) {
      return name.replace(/:/g, '');
    },
    getFullName (name) {
      return name + EXT;
    },
    getPath (emojiName) {
      return Path + this.getFullName(emojiName);
    },
    addClass (list, index) {
      list.forEach(item => {
        item.classList.remove('active');
      });
      list[index].classList.add('active');
    },
    selectByIndex (index) {
      this.addClass(this.$controllers, index);
      this.addClass(this.$views, index);
    },
    getEmojiName (target) {
      const tag = this.getNormalTag(target);
      if (tag === 'ul' || tag === 'li') return '';
      let emojiTarget;
      if (tag === 'a') {
        emojiTarget = target.querySelector('span');
      } else {
        emojiTarget = target;
      }
      return this.getPureName(emojiTarget.title);
    },
    getNormalTag (tar) {
      return tar.tagName.toLowerCase();
    },
    selectItem (e) {
      const tar = e.target;
      const tag = this.getNormalTag(tar);
      if (tag === 'ul') return;
      if (tag === 'li') return;
      const emojiName = this.getEmojiName(tar);
      const filePath = this.getPath(emojiName);
      const img = this.generateImg(filePath, emojiName);
      this.$emit('select', img);
      this.insertEmoji(img);
    },

    generateImg (src, emojiName) {
      if (this.useUnicode) {
        const emoji = getUnicode(emojiName);
        const text = document.createTextNode(emoji);
        return text;
      }
      const img = new Image();
      img.src = src;
      img.alt = emojiName;
      img.title = emojiName;
      img.className = 'rui-emoji-img';
      img.width = 20;
      img.height = 20;
      return img;
    },
    hide (e) {
      if (e.target === this.$btn) return;
      this.$emit('hide', e);
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item]);
      });
    },
    titles () {
      return this.captions || this.pannels;
    }
  },
  watch: {
    activeIndex (index) {
      this.selectByIndex(index);
    }
  }
}
</script>

<style lang = 'scss' scoped>
@import './emoji-sprite.scss';

.rui-emoji {
  width: 380px;
  height: 186px;
  position: absolute;
  bottom: 30px;
  background: #fff;
  z-index: 10;
  box-shadow: 0 1px 5px rgba(0,0,0,.3);
  ul {
    list-style: none;
  }
  ul, li {
    margin: 0;
    padding: 0;
  }
  .emoji-controller {
    height: 36px;
    overflow: hidden;
    margin-bottom: 0;
    li {
      float: left;
      width: 76px;
      font-size: 12px;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }
  .emoji-container {
    height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      display: none;
      padding: 5px;
      &.active {
        display: block;
      }
      a {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out .2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
