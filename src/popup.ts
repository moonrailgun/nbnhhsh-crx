import * as $ from 'jquery';
import './style/popup.less';

const guess = (text: string) => {
  chrome.runtime.sendMessage(
    {
      guess: text,
    },
    (response) => {
      $('#result').text(JSON.stringify(response));
    }
  );

  $('#guessText').text(text);
};

$(function () {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  $('#searchBtn').click(() => {
    const val = String($('#input').val());
    guess(val);
  });

  chrome.tabs.query(queryInfo, function (tabs) {
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
  });
});
