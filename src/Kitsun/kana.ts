const mapping = (function() {
  const gojuon = ['あ','い','う','え','お',
                  'か','き','く','け','こ',
                  'さ','し','す','せ','そ',
                  'た','ち','つ','て','と',
                  'な','に','ぬ','ね','の',
                  'は','ひ','ふ','へ','ほ',
                  'ま','み','む','め','も',
                  'や','yi','ゆ','ye','よ',
                  'ら','り','る','れ','ろ',
                  'わ','ゐ','wu','ゑ','を'];
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < gojuon.length; i += chunkSize) {
    const chunk = gojuon.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  const mapping = {};
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    for (let j = 0; j < 5; j++) {
      mapping[chunk[j]] = chunks[0][j];
    }
  }
  mapping['ゃ'] = 'あ';
  mapping['ゅ'] = 'う';
  mapping['ょ'] = 'お';
  return mapping;
})();
function hiraganaToVowel(c) {
  if (mapping[c]) {
    return mapping[c];
  }
  return c;
}
// converts katakana characters in the string to hiragana. will be a no-op if no katakana
// optionally converts choonpu in the input string to appropriate vowel sound
export function katakanaToHiragana(s, choonpu) {
  const lower = "ァ".codePointAt(0);
  const upper = "ヶ".codePointAt(0);
  const diff = "ア".codePointAt(0) - "あ".codePointAt(0);
  const chars = s.split("");
  const converted = [];
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const point = c.codePointAt(0);
    if (point >= lower && point <= upper) {
      converted.push(String.fromCodePoint(point - diff));
    } else if (c === 'ー' && i > 0 && choonpu) {
      const previous = converted[i - 1];
      converted.push(hiraganaToVowel(previous));
    } else {
      converted.push(c);
    }
  }
  return converted.join("");
}
