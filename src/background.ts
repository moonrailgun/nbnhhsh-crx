import * as $ from 'jquery';

const API_URL = 'https://lab.magiconch.com/api/nbnhhsh/';
const resultCache = new Map();

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  const { guess } = request;

  if (guess) {
    const text = guess.match(/[a-z0-9]+/gi).join(','); // 分离出一段文字中的文本, 用逗号拼接

    if (resultCache.has(text)) {
      // 如果缓存中有数据
      callback(resultCache.get(text));
      return;
    }

    $.post(`${API_URL}guess`, { text }, (data) => {
      callback(data);
      resultCache.set(text, data);
    });
  }

  return true;
});
