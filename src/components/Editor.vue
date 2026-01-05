<template>
  <div class="email-editor">
    <!-- 工具栏 -->
    <el-button @click="getHtml">获取html值</el-button>
    <div class="toolbar">
      <div class="toolbar-btn">
        <svg-icon name="clear" @click="clearSelectedFormat" />
      </div>
      <div class="toolbar-divider"></div>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        @command="handleFontFamily"
      >
        <div class="toolbar-dropdown">
          <div
            class="label"
            :style="{ fontFamily: state.attr.fontFamily.value }"
          >
            {{ state.attr.fontFamily.label }}
          </div>
          <div class="arrow">
            <svg-icon class="mini-icon" name="arrow-down" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in MAIL_FONT_FAMILY_LIST"
              :key="item.value"
              :command="item"
            >
              <div
                :style="{
                  width: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: item.value,
                  fontSize: '12px',
                  color: '#13181d',
                }"
              >
                <div>{{ item.label }}</div>
                <div v-if="item.value === state.attr.fontFamily.value">
                  <svg-icon class="small-icon" name="check" />
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        @command="handleFontSize"
        max-height="650px"
      >
        <div class="toolbar-dropdown">
          <div class="label">
            {{ state.attr.fontSize.label }}
          </div>
          <div class="arrow">
            <svg-icon class="mini-icon" name="arrow-down" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in MAIL_FONT_SIZE_LIST"
              :key="item.value"
              :command="item"
            >
              <div
                :style="{
                  width: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#13181d',
                }"
              >
                <div>{{ item.label }}</div>
                <div v-if="item.value === state.attr.fontSize.value">
                  <svg-icon class="small-icon" name="check" />
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="toolbar-divider"></div>
      <div class="toolbar-btn" :class="{ active: state.attr.bold }">
        <svg-icon name="bold" @click="handleTextBold" />
      </div>
      <div class="toolbar-btn" :class="{ active: state.attr.italic }">
        <svg-icon name="italic" @click="handleTextItalic" />
      </div>
      <div class="toolbar-btn" :class="{ active: state.attr.underline }">
        <svg-icon name="underline" @click="handleTextUnderline" />
      </div>
      <div class="toolbar-btn" :class="{ active: state.attr.strike }">
        <svg-icon name="strike" @click="handleTextStrike" />
      </div>
      <div class="toolbar-select">
        <div class="toolbar-btn">
          <svg-icon name="text" :color="state.attr.color" />
        </div>
        <el-dropdown trigger="click">
          <div class="select-btn">
            <svg-icon
              class="mini-icon"
              name="arrow-down"
              @click="updateTextStyles"
            />
          </div>
          <template #dropdown>
            <ColorPicker
              v-model="state.attr.color"
              default-color="#000000"
              @change="updateTextStyles"
            />
          </template>
        </el-dropdown>
      </div>

      <div class="toolbar-select">
        <div class="toolbar-btn">
          <svg-icon name="background" :color="state.attr.bgColor" />
        </div>
        <el-dropdown trigger="click">
          <div class="select-btn">
            <svg-icon
              class="mini-icon"
              name="arrow-down"
              @click="updateTextStyles"
            />
          </div>
          <template #dropdown>
            <ColorPicker
              v-model="state.attr.bgColor"
              default-color="transparent"
              @change="updateTextStyles"
            />
          </template>
        </el-dropdown>
      </div>
      <div class="toolbar-divider"></div>
      <div class="toolbar-btn" :class="{ active: state.attr.bulletList }">
        <svg-icon name="bullet-list" @click="handleTextBulletList" />
      </div>
      <div class="toolbar-btn" :class="{ active: state.attr.orderedList }">
        <svg-icon name="ordered-list" @click="handleTextOrderedList" />
      </div>
      <!-- 增加缩进 -->
      <div
        class="toolbar-btn"
        @click="editor?.chain().focus().increaseIndent().run()"
      >
        <svg-icon name="indent-increase" />
      </div>

      <!-- 减少缩进 -->
      <div
        class="toolbar-btn"
        @click="editor?.chain().focus().decreaseIndent().run()"
      >
        <svg-icon name="indent-decrease" />
      </div>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        @command="handleTextAlign"
      >
        <div class="toolbar-dropdown">
          <div class="icon">
            <svg-icon name="text-align" />
          </div>
          <div class="arrow">
            <svg-icon class="mini-icon" name="arrow-down" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in ALIGN_LIST"
              :key="item.value"
              :command="item.value"
            >
              <div
                :style="{
                  width: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#13181d',
                }"
              >
                <div>
                  <span style="margin-right: 5px">
                    <svg-icon
                      class="small-icon"
                      :name="`align-${item.value}`"
                    />
                  </span>
                  <span>{{ item.label }}</span>
                </div>
                <div v-if="item.value === state.attr.textAlign">
                  <svg-icon class="small-icon" name="check" />
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        @command="handleLineHeight"
      >
        <div class="toolbar-dropdown">
          <div class="icon">
            <svg-icon name="line-height" />
          </div>
          <div class="arrow">
            <svg-icon class="mini-icon" name="arrow-down" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in LINE_HEIGHT_LIST"
              :key="item"
              :command="item"
            >
              <div
                :style="{
                  width: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#13181d',
                }"
              >
                <div>
                  {{ item }}
                </div>
                <div v-if="item === state.attr.lineHeight">
                  <svg-icon class="small-icon" name="check" />
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="toolbar-divider"></div>
      <div class="toolbar-btn">
        <svg-icon
          name="horizontal-rule"
          @click="editor?.chain().focus().setHorizontalRule().run()"
        />
      </div>
      <div class="toolbar-btn">
        <svg-icon
          name="blockquote"
          @click="editor?.chain().focus().toggleBlockquote().run()"
        />
      </div>
    </div>
    <!-- 编辑器内容 -->
    <editor-content class="editor-container" :editor="editor" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontSize, LineHeight } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";

import ColorPicker from "./ColorPicker.vue";

import {
  MAIL_FONT_FAMILY_LIST,
  MAIL_FONT_SIZE_LIST,
  ALIGN_LIST,
  LINE_HEIGHT_LIST,
} from "@/model/mail_constants";

import Indentation from "@/extensions/indentation";

const state = reactive({
  attr: {
    bold: false,
    italic: false,
    strike: false,
    underline: false,
    sort: false,
    noSort: false,
    color: "#000000",
    bgColor: "transparent",
    fontFamily: {
      label: "默认字体",
      value: "",
    },
    fontSize: {
      label: "字号",
      value: "",
    },
    textAlign: "",
    lineHeight: "1.0",
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
    // 新增文本对齐
    TextAlign.configure({
      types: ["heading", "paragraph"], // 支持标题和段落
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
    }),
  ],
  onUpdate: syncCurrentAttrs,
  onSelectionUpdate: syncCurrentAttrs,
});

const handleTextBold = () => {
  state.attr.bold = !state.attr.bold;
  editor.value?.chain().focus().toggleBold().run();
};

const handleTextItalic = () => {
  state.attr.italic = !state.attr.italic;
  editor.value?.chain().focus().toggleItalic().run();
};

const handleTextUnderline = () => {
  state.attr.underline = !state.attr.underline;
  editor.value?.chain().focus().toggleUnderline().run();
};

const handleTextStrike = () => {
  state.attr.strike = !state.attr.strike;
  editor.value?.chain().focus().toggleStrike().run();
};

const handleTextBulletList = () => {
  state.attr.bulletList = !state.attr.bulletList;
  editor.value?.chain().focus().toggleBulletList().run();
};

const handleTextOrderedList = () => {
  state.attr.orderedList = !state.attr.orderedList;
  editor.value?.chain().focus().toggleOrderedList().run();
};
const clearSelectedFormat = () => {
  if (!editor.value) return;

  editor.value
    .chain()
    .focus()
    // 先移除所有 marks（包括 bold, italic, strike, color, highlight, fontFamily, fontSize 等）
    .unsetAllMarks()

    // 再强制应用默认样式（确保彻底恢复）
    .setColor("#000000") // 默认文字颜色
    .unsetHighlight() // 清除背景高亮
    .unsetFontFamily() // 清除自定义字体
    .setFontSize("14px") // 恢复默认字号（根据你的默认设置）
    .setIndent(0) // 连续点几次确保归零，或直接设置 indent: 0
    .setTextAlign("left") // 新增：恢复左对齐

    .run();

  // 同步工具栏状态（可选，但强烈推荐）
  syncCurrentAttrs();
};

const handleTextAlign = (align) => {
  state.attr.textAlign = align;
  if (align) {
    editor.value?.chain().focus().setTextAlign(align).run();
  }
};

const updateTextStyles = () => {
  if (!editor.value) return;

  const { color, bgColor } = state.attr;

  console.log("Updating: text color =", color, "bgColor =", bgColor);

  editor.value
    .chain()
    .focus()
    // 先设置文字颜色（Color 扩展用 color）
    .setColor(color !== "#000000" ? color : null)
    // 再设置背景高亮（Highlight 扩展用 color 属性！）
    .setHighlight(bgColor !== "transparent" ? { color: bgColor } : null)
    .run();
};

const handleFontFamily = (command) => {
  state.attr.fontFamily = command;
  if (command.value) {
    editor.value?.chain().focus().setFontFamily(command.value).run();
  } else {
    editor.value?.chain().focus().unsetFontFamily().run();
  }
};

// 字号
const handleFontSize = (size) => {
  state.attr.fontSize = size;
  console.log("Updating: font size =", size);
  editor.value?.chain().focus().setFontSize(`${size.value}px`).run();
};

const handleLineHeight = (lineHeight) => {
  state.attr.lineHeight = lineHeight;
  editor.value?.chain().focus().setLineHeight(lineHeight).run();
};

// 实时同步工具栏状态
function syncCurrentAttrs() {
  if (!editor.value) return;
  state.attr.bold = editor.value.isActive("bold");
  state.attr.italic = editor.value.isActive("italic");
  state.attr.sort = editor.value.isActive("bulletList");
  state.attr.noSort = editor.value.isActive("orderedList");
  state.attr.underline = editor.value.isActive("underline");
  state.attr.strike = editor.value.isActive("strike");

  // 文字颜色
  const textAttrs = editor.value.getAttributes("textStyle");
  state.attr.color = textAttrs.color || "#000000";

  // 背景高亮
  const highlightAttrs = editor.value.getAttributes("highlight");
  state.attr.bgColor = highlightAttrs.color || "transparent";

  // 字体
  state.attr.fontFamily.value = textAttrs.fontFamily || "";
  state.attr.fontFamily.label =
    MAIL_FONT_FAMILY_LIST.find((f) => f.value === textAttrs.fontFamily)
      ?.label || "默认字体";

  // ====== 修复字号同步 ======
  const currentFontSize = textAttrs.fontSize
    ? textAttrs.fontSize.replace("px", "")
    : "";
  const sizeItem = MAIL_FONT_SIZE_LIST.find(
    (item) => item.value === currentFontSize
  );
  state.attr.fontSize.label = sizeItem ? sizeItem.label : "字号";
  state.attr.fontSize.value = sizeItem ? currentFontSize : "";
}

// 监听编辑器变化
onMounted(() => {
  if (editor.value) {
    editor.value.on("update", syncCurrentAttrs);
    editor.value.on("selectionUpdate", syncCurrentAttrs);
    syncCurrentAttrs(); // 初始化
  }
});
import juice from "juice";
const getHtml = () => {
  /**
   * :deep(.ProseMirror) {
      min-height: 100%;
      height: 100%;
      outline: none;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1;
      padding-top: 10px;
      p {
        margin: 0; 
        padding: 0;
      }
      blockquote {
        margin: 20px 0;
        padding: 16px 20px;
        background-color: #f8f9fa;
        border-left: 4px solid #007bff;
      }
    }
   */
  const editorCss = `
    p {
      margin: 0; 
      padding: 0;
    }
    blockquote {
      margin: 20px 0;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-left: 4px solid #007bff;
    }
`;
  const inlinedHtml = juice.inlineContent(editor.value.getHTML(), editorCss);
  console.log(inlinedHtml);
};
</script>

<style lang="scss" scoped>
.small-icon {
  width: 12px;
  height: 12px;
}
.mini-icon {
  width: 10px;
  height: 10px;
}
.email-editor {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 铺满屏幕 */
  max-width: 800px;
  margin: 0 auto;
  .toolbar {
    user-select: none;
    flex: 0 0 auto;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 8px;
    gap: 8px;
    .toolbar-btn {
      height: 28px;
      width: 28px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #e8eaed;
      }
      &.active {
        background-color: #dce0e4;
      }
    }
    .toolbar-dropdown {
      height: 28px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      .icon {
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .label {
        width: 58px;
        color: #13181d;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow {
        width: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        background-color: #e8eaed;
      }
    }
    .toolbar-select {
      display: flex;
      align-items: center;
      justify-content: center;

      .toolbar-btn {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:hover {
        background-color: #e8eaed;
        .toolbar-btn {
          &:hover {
            background-color: #dce0e6;
          }
        }
        .select-btn {
          &:hover {
            background-color: #dce0e6;
          }
        }
      }
      .select-btn {
        height: 28px;
        padding: 0 2px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .toolbar-divider {
    width: 1px;
    height: 16px;
    background-color: #ccc;
    margin: 0 4px;
  }
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
