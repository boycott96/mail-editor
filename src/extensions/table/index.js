import { Table } from "@tiptap/extension-table"; // 或从 '@tiptap/extension-table' 导入

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
      // 如果需要其他属性，如 align、role 等，也可以类似添加
      align: {
        default: null,
        parseHTML: (element) => element.getAttribute("align"),
        renderHTML: (attributes) => ({
          align: attributes.align,
        }),
      },
      role: {
        default: null,
        parseHTML: (element) => element.getAttribute("role"),
        renderHTML: (attributes) => ({
          role: attributes.role,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "table",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["table", HTMLAttributes, ["tbody", 0]]; // 或根据需要调整
  },
});

export { CustomTable };
