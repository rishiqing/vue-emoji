// referenced from https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js#L22-L63
export default {
  inserted (el, { expression }, { elm, context }) {
    el.documentHandler = (e) =>  {
      if (elm.contains(e.target)) {
        return false;
      }
      if (expression) {
        const hide = context[expression](e);
        if (hide) {
          document.removeEventListener('click', el.documentHandler);
          el.documentHandler = null;
        }
      }
    };
    document.addEventListener('click', el.documentHandler);
  },
  unbind (el) {
    document.removeEventListener('click', el.documentHandler);
  }
};
