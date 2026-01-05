// extensions/Indentation.js
import { Extension } from "@tiptap/core";
import { AllSelection, TextSelection } from "prosemirror-state";

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const Indentation = Extension.create({
  name: "indentation",

  addOptions() {
    return {
      types: ["paragraph", "heading", "listItem"], // 支持段落、标题、列表项
      minLevel: 0,
      maxLevel: 8, // 最大缩进级别（可改大）
      indentSize: 30, // 每级缩进 30px（可调整为 40px）
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const indent = parseInt(element.style.marginLeft) || 0;
              const level = Math.round(indent / this.options.indentSize);
              return clamp(level, this.options.minLevel, this.options.maxLevel);
            },
            renderHTML: (attributes) => {
              if (attributes.indent <= 0) return {};
              return {
                style: `margin-left: ${
                  attributes.indent * this.options.indentSize
                }px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    const setNodeIndentMarkup = (tr, pos, delta) => {
      const node = tr.doc.nodeAt(pos);
      if (!node) return tr;

      const nextLevel = clamp(
        (node.attrs.indent || 0) + delta,
        this.options.minLevel,
        this.options.maxLevel
      );
      const attrs = nextLevel > 0 ? { indent: nextLevel } : { indent: null };

      return tr.setNodeMarkup(
        pos,
        node.type,
        { ...node.attrs, ...attrs },
        node.marks
      );
    };

    const updateIndentLevel = (tr, delta) => {
      const { doc, selection } = tr;
      if (!doc || !selection) return tr;
      if (
        !(
          selection instanceof TextSelection ||
          selection instanceof AllSelection
        )
      )
        return tr;

      const { from, to } = selection;
      doc.nodesBetween(from, to, (node, pos) => {
        if (this.options.types.includes(node.type.name)) {
          tr = setNodeIndentMarkup(tr, pos, delta);
          return false;
        }
        return true;
      });
      return tr;
    };

    return {
      increaseIndent:
        () =>
        ({ tr, state, dispatch }) => {
          const newTr = updateIndentLevel(tr, 1);
          if (newTr.docChanged && dispatch) dispatch(newTr);
          return true;
        },
      decreaseIndent:
        () =>
        ({ tr, state, dispatch }) => {
          const newTr = updateIndentLevel(tr, -1);
          if (newTr.docChanged && dispatch) dispatch(newTr);
          return true;
        },
      // 新增：直接设置缩进级别
      setIndent:
        (level = 0) =>
        ({ tr, state, dispatch, editor }) => {
          const { doc, selection } = tr;
          if (!doc || !selection) return false;

          const clampedLevel = clamp(
            level,
            this.options.minLevel,
            this.options.maxLevel
          );
          let changed = false;

          doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const attrs =
                clampedLevel > 0 ? { indent: clampedLevel } : { indent: null };
              tr = tr.setNodeMarkup(
                pos,
                node.type,
                { ...node.attrs, ...attrs },
                node.marks
              );
              changed = true;
              return false;
            }
            return true;
          });

          if (changed && dispatch) dispatch(tr);
          return changed;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        // 在列表中 Tab 默认用于嵌套，不拦截
        if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
          return false;
        }
        return editor.commands.increaseIndent();
      },
      "Shift-Tab": () => this.editor.commands.decreaseIndent(),
    };
  },
});

export default Indentation;
