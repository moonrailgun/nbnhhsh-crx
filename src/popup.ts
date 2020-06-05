import * as $ from 'jquery';
import './style/popup.less';

const guess = (text: string) => {
  if (!text) {
    return;
  }

  $('#result').text('');
  $('.loading').show();
  $('.tip').hide();

  chrome.runtime.sendMessage(
    {
      guess: text,
    },
    (response) => {
      $('.loading').hide();

      if (!Array.isArray(response)) {
        return;
      }

      const items = response
        .filter((item) => Array.isArray(item.trans))
        .map((item) => {
          const { name, trans } = item;

          return `<div class="item"><h2>${name}</h2><p>${trans.join(
            ', '
          )}</p></div>`;
        });

      if (items.length > 0) {
        $('#result').html(items.join(''));
      } else {
        $('#result').html('<div class="tip">没有搜索到任意结果</div>');
      }
    }
  );
};

$(function () {
  $('#searchBtn').click(() => {
    const val = String($('#input').val());
    guess(val);
  });

  $('#input').bind('keydown', (e) => {
    if (e.which === 13) {
      const val = String($('#input').val());
      guess(val);
    }
  });

  $('#input').bind('input', () => {
    // 只允许输入英文
    // 把所有双字节文本全清空
    $('#input').val(
      $('#input')
        .val()
        .toString()
        .replace(/[^\x00-\x80]/gi, '')
    );
  });

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          getText: true,
        },
        (response) => {
          const selectedText = response;

          guess(selectedText);
        }
      );
    }
  );
});
