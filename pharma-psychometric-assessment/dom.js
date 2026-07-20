// Tiny DOM builder helper shared across app.js and results-view.js
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

// Shared masthead bar (logo mark + company name + doc id), used on every screen.
function brandMasthead(docId) {
  return el("div", { class: "masthead" }, [
    el("div", { class: "masthead-brand" }, [
      el("img", { src: "assets/logo-mark.png", alt: CONFIG.COMPANY_NAME, class: "masthead-logo" }),
      el("div", { class: "brand" }, CONFIG.COMPANY_NAME)
    ]),
    el("div", { class: "doc-id" }, docId)
  ]);
}
