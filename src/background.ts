import * as $ from 'jquery';

const API_URL = 'https://lab.magiconch.com/api/nbnhhsh/';

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  const { guess } = request;

  if (guess) {
    const text = guess.match(/[a-z0-9]+/gi).join(','); // 分离出一段文字中的文本, 用逗号拼接

    $.post(`${API_URL}guess`, { text }, (data) => {
      callback(data);
    });
  }

  return true;
});
