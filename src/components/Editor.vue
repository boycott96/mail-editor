<template>
  <div class="email-editor">
    <!-- 工具栏 -->
    <Toolbar />
    <!-- 编辑器内容 -->
    <editor-content class="editor-container" :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontSize, LineHeight } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table"; // 官方推荐的表格套件
import Toolbar from "./Toolbar.vue";
import Indentation from "@/extensions/indentation";

// Props 定义
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const editor = useEditor({
  content: "<p></p>",
  extensions: [
    StarterKit,
    TextStyle, // 必须放在最前
    FontFamily,
    FontSize,
    Color.configure({ types: ["textStyle"] }),
    Highlight.configure({ multicolor: true }),
    LineHeight,
    Indentation,
    Image.configure({
      inline: false, // 默认块级图片，设为 true 可内联显示（如文字中嵌入）
      allowBase64: true, // 支持 base64 图片（粘贴时有用）
      HTMLAttributes: {
        class: "my-image-class", // 可自定义类名样式
      },
    }),
    // 新增文本对齐
    TextAlign.configure({
      types: ["heading", "paragraph"], // 支持标题和段落
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
    }),
    TableKit.configure({
      resizable: false, // 全局禁用列宽度调整（TipTap 最新版支持直接在 TableKit 上设置）

      // 配置 table 节点：添加一些常见的邮件表格默认属性
      table: {
        HTMLAttributes: {
          class: "wrapper", // 保留你的 class 示例
        },
      },

      // // 可选：为单元格添加默认属性（如果需要）
      // tableCell: {
      //   HTMLAttributes: {
      //     style: "padding: 10px;", // 示例
      //   },
      // },

      // 如果不需要某些子扩展，可以禁用（如官方示例）
      // tableHeader: false,
    }),
  ],
});
// 监听传入的 HTML 内容变化
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     if (editor.value && newValue !== editor.value.getHTML()) {
//       editor.value.commands.setContent(newValue);
//     }
//   }
// );
</script>

<style lang="scss" scoped>
.email-editor {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 铺满屏幕 */
  max-width: 800px;
  margin: 0 auto;

  .editor-container {
    flex: 1 1 auto; /* 占满剩余空间 */
    overflow-y: auto; /* 内容超出可滚动 */
    :deep(.ProseMirror) {
      min-height: 100%;
      height: 100%;
      outline: none;
      /* 邮件编辑常用 */
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1;
      padding-top: 10px;
      p {
        margin: 0; // 移除默认上下 margin
        padding: 0;
      }
      // 可选：更现代的卡片式引用
      blockquote {
        margin: 20px 0;
        padding: 16px 20px;
        background-color: #f8f9fa;
        border-left: 4px solid #007bff;
      }
    }
  }
}
</style>
