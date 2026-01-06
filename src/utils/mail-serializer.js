export function serializeMailHtml(editorEl) {
  const root = editorEl.cloneNode(true);

  // 1️⃣ 移除编辑期标记
  root.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
  });

  // 2️⃣ font → span
  root.querySelectorAll("font").forEach((font) => {
    const span = document.createElement("span");
    Array.from(font.attributes).forEach((attr) => {
      if (attr.name !== "size") {
        span.setAttribute(attr.name, attr.value);
      }
    });
    while (font.firstChild) {
      span.appendChild(font.firstChild);
    }
    font.replaceWith(span);
  });

  // 3️⃣ 强制 inline（有限集）
  const IMPORTANT = [
    "font-size",
    "font-family",
    "font-weight",
    "font-style",
    "color",
    "background-color",
    "text-decoration",
    "line-height",
    "text-align",
  ];

  root.querySelectorAll("*").forEach((el) => {
    const style = window.getComputedStyle(el);
    IMPORTANT.forEach((prop) => {
      const val = style.getPropertyValue(prop);
      if (val && val !== "normal" && val !== "none") {
        el.style.setProperty(prop, val);
      }
    });
  });

  return root.innerHTML;
}
