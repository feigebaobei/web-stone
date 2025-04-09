要将内容脚本注入到没有 src 属性的 iframe 中，您需要采用特定方法，因为浏览器扩展对这类 iframe 的处理有一些限制。以下是一些可能的解决方案：

1. 使用 executeScript 方法，通过指定 frameId：

javascriptCopychrome.scripting.executeScript({
target: {tabId: tabId, frameIds: [frameId]},
function: yourFunction
});

2. 对于没有 src 的 iframe（空白 iframe），您可能需要先获取所有 frame 的 ID：

javascriptCopychrome.webNavigation.getAllFrames({tabId: tabId}, function(frames) {
// 处理查找到的所有 frames，包括无 src 的 iframe
});

3. 如果是动态创建的无 src iframe，您可以考虑使用 MutationObserver 来监听 DOM 变化，然后在检测到新 iframe 时进行脚本注入。
4. 另一种方法是从父页面脚本访问 iframe 的 contentWindow，然后通过它注入脚本：

javascriptCopyfunction injectToBlankIframes() {
const iframes = document.querySelectorAll('iframe:not([src])');
iframes.forEach(iframe => {
try {
const doc = iframe.contentDocument || iframe.contentWindow.document;
const script = doc.createElement('script');
script.textContent = '/_ 您的脚本内容 _/';
doc.head.appendChild(script);
} catch(e) {
console.error('无法访问 iframe:', e);
}
});
}
需要注意的是，如果 iframe 和主页面不同源，由于同源策略的限制，直接访问可能会失败。这种情况下，您需要使用浏览器扩展的特权 API。
您具体是在开发什么类型的浏览器扩展？有什么特定的应用场景吗？
