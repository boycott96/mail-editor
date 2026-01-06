export class EditorUtils {
  constructor(editorEl) {
    this.editor = editorEl;
  }

  /* =========================
   * Selection 基础
   * ========================= */

  getSelection() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    return sel;
  }

  getRange() {
    const sel = this.getSelection();
    return sel ? sel.getRangeAt(0) : null;
  }

  isCollapsed() {
    const range = this.getRange();
    return !range || range.collapsed;
  }

  /* =========================
   * Quote 安全区
   * ========================= */

  isInQuote(range = this.getRange()) {
    if (!range) return false;

    let node = range.commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentElement;
    }

    while (node && node !== this.editor) {
      if (node.dataset && node.dataset.mailQuote === "true") {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  ensureEditable(range) {
    if (!range) return false;
    if (this.isInQuote(range)) return false;
    return true;
  }

  /* =========================
   * 基础包裹工具
   * ========================= */

  wrapSelectionWithSpan(styleObj) {
    const range = this.getRange();
    if (!range || range.collapsed) return;
    if (!this.ensureEditable(range)) return;

    const span = document.createElement("span");
    Object.entries(styleObj).forEach(([k, v]) => {
      span.style[k] = v;
    });

    span.appendChild(range.extractContents());
    range.insertNode(span);

    // 恢复光标
    range.setStartAfter(span);
    range.collapse(true);
    const sel = this.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /* =========================
   * 对外格式 API
   * ========================= */

  toggleBold() {
    this.wrapSelectionWithSpan({ fontWeight: "bold" });
  }

  toggleItalic() {
    this.wrapSelectionWithSpan({ fontStyle: "italic" });
  }

  toggleUnderline() {
    this.wrapSelectionWithSpan({ textDecoration: "underline" });
  }

  setTextColor(color) {
    this.wrapSelectionWithSpan({ color });
  }

  setBackgroundColor(color) {
    this.wrapSelectionWithSpan({ backgroundColor: color });
  }

  setFontSize(px) {
    this.wrapSelectionWithSpan({ fontSize: px });
  }

  setFontFamily(font) {
    this.wrapSelectionWithSpan({ fontFamily: font });
  }

  /* =========================
   * 块级操作（最小化）
   * ========================= */

  insertHorizontalRule() {
    const range = this.getRange();
    if (!range || !this.ensureEditable(range)) return;

    const hr = document.createElement("hr");
    hr.style.border = "none";
    hr.style.borderTop = "1px solid #ccc";
    hr.style.margin = "12px 0";

    range.insertNode(hr);
    range.setStartAfter(hr);
    range.collapse(true);
  }
}
