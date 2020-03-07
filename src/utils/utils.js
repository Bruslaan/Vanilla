function createDOM(tag, attributes, inner_html = "", childs = []) {
    // dom attributes
    let dom = document.createElement(tag)
    for (let i = 0; i < attributes.length; i++) {
      for (key in attributes[i]) {
        dom.setAttribute(key, attributes[i][key])
      }
    }
    // inner html
    if (inner_html != "") {
      dom.innerHTML = inner_html
    }
    // append childs
    if (childs.length > 0) {
      for (let i=0;i<childs.length;i++) {
        dom.appendChild(childs[i])
      }
    }
    return dom
  }