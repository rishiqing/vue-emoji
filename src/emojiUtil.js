import emojiData from './emoji-data';
import unicodeMap from './getUnicodeMap';

class Emoji {
  getEmojiData () {
    return emojiData;
  }
  getUnicodeMap () {
    return unicodeMap;
  }
  getNameWithUnicode (unicode) {
    if (!unicode) return null;
    const names = Object.keys(unicodeMap);
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (unicodeMap[name].char === unicode) {
        return name;
      }
    }
    return null;
  }
  getUnicodeByName (name) {
    return (unicodeMap[name] || {}).char || '';
  }
}
export default new Emoji();
