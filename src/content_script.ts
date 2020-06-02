chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.getText) {
    // 返回当前选中文本
    sendResponse(window.getSelection().toString());
  }
});
