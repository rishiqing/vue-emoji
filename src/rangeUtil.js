// referenced from emojiarea https://github.com/diy/jquery-emojiarea/blob/master/jquery.emojiarea.js#L51-L121
const doc = document;

let restoreSelection;
let saveSelection;
let replaceSelection;
if (window.getSelection) {
  restoreSelection = function (savedSelection) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    for (let i = 0, len = savedSelection.length; i < len; ++i) {
      sel.addRange(savedSelection[i]);
    }
  };
  saveSelection = function () {
    const sel = window.getSelection();
    const ranges = [];

    if (sel.rangeCount) {
      for (let i = 0, len = sel.rangeCount; i < len; ++i) {
        ranges.push(sel.getRangeAt(i));
      }
    }
    return ranges;
  };
  replaceSelection = function (content) {
    let range;
    const sel = window.getSelection();
    const node = typeof content === 'string' ? doc.createTextNode(content) : content;
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(doc.createTextNode(' '));
      range.insertNode(node);
      range.setStart(node, 0);

      window.setTimeout(() => {
        range = doc.createRange();
        range.setStartAfter(node);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }, 0);
    }
  };
} else if (doc.selection && doc.selection.createRange) {
  restoreSelection = function (savedSelection) {
    if (savedSelection) {
      savedSelection.select();
    }
  };
  saveSelection = function () {
    const sel = doc.selection;
    return (sel.type.toLowerCase() !== 'none') ? sel.createRange() : null;
  };
  replaceSelection = function (content) {
    const range = doc.selection.createRange();
    if (typeof content === 'string') {
      range.text = content;
    } else {
      range.pasteHTML(content.outerHTML);
    }
  };
}

export default new class {
  escapeRegex (str) {
    return (`${str}`).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
  htmlEntities (str) {
    return String(str)
           .replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;');
  }
  restoreSelection (...args) {
    return restoreSelection.call(null, ...args);
  }
  saveSelection (...args) {
    return saveSelection.call(null, ...args);
  }
  replaceSelection (...args) {
    return replaceSelection.call(null, ...args);
  }
}();
