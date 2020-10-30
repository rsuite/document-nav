const TEXT_NODE = 3;

export default function getInnerText(dom) {
  let text = '';
  var walker = document.createTreeWalker(dom, NodeFilter.SHOW_ALL, {
    acceptNode: function (node) {
      if (node.ariaHidden === 'true') {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  var node = walker.nextNode();
  while (node !== null) {
    if (node.nodeType === TEXT_NODE) {
      text += node.wholeText;
    }
    node = walker.nextNode();
  }

  return text.replace(/\s+/g, ' ').trim();
}
