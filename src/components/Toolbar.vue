<template>
  <div class="toolbar">
    <Btn icon="clear" @click="clearSelectedFormat" />
    <Divider />
    <Dropdown
      class="toolbar-dropdown"
      v-model="state.attr.fontFamily"
      :dataList="MAIL_FONT_FAMILY_LIST"
    >
    </Dropdown>
    <Dropdown
      class="toolbar-dropdown"
      v-model="state.attr.fontSize"
      :dataList="MAIL_FONT_SIZE_LIST"
    >
    </Dropdown>
    <Divider />
    <Btn v-model="state.attr.bold" icon="bold" @click="handleTextBold" />
    <Btn v-model="state.attr.italic" icon="italic" @click="handleTextItalic" />
    <Btn
      v-model="state.attr.underline"
      icon="underline"
      @click="handleTextUnderline"
    />
    <Btn v-model="state.attr.strike" icon="strike" @click="handleTextStrike" />
    <ColorPicker
      v-model="state.attr.color"
      default-color="#000000"
      icon="text"
    />
    <ColorPicker
      v-model="state.attr.bgColor"
      default-color="transparent"
      icon="background"
    />
    <Divider />
    <Btn
      v-model="state.attr.bulletList"
      icon="bullet-list"
      @click="handleTextBulletList"
    />

    <Btn
      v-model="state.attr.orderedList"
      icon="ordered-list"
      @click="handleTextOrderedList"
    />
    <!-- 增加缩进 -->
    <Btn
      v-model="state.attr.indent"
      icon="indent-increase"
      @click="handleTextIndent"
    />

    <!-- 减少缩进 -->
    <Btn
      v-model="state.attr.outdent"
      icon="indent-decrease"
      @click="handleTextOutdent"
    />
    <Dropdown
      class="toolbar-dropdown"
      v-model="state.attr.textAlign"
      :dataList="ALIGN_LIST"
      icon="text-align"
    >
    </Dropdown>
    <Dropdown
      class="toolbar-dropdown"
      v-model="state.attr.lineHeight"
      :dataList="LINE_HEIGHT_LIST"
      icon="line-height"
    >
    </Dropdown>
    <Divider />
    <Btn icon="horizontal-rule" @click="handleTextHorizontalRule" />
    <Btn icon="blockquote" @click="handleTextBlockquote" />
    <Btn icon="image" @click="openImageUpload" />
    <!-- 隐藏的 input 用于选择文件 -->
    <input
      type="file"
      ref="imageInput"
      accept="image/*"
      style="display: none"
      @change="handleImageSelect"
    />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  MAIL_FONT_FAMILY_LIST,
  MAIL_FONT_SIZE_LIST,
  ALIGN_LIST,
  LINE_HEIGHT_LIST,
} from "@/model/mail_constants";
import ColorPicker from "./ColorPicker.vue";
import Dropdown from "./Dropdown.vue";
import Btn from "./Btn.vue";
import Divider from "./Divider.vue";

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
    textAlign: {
      label: "左对齐",
      value: "left",
    },
    lineHeight: {
      label: "1.0",
      value: "1.0",
    },
  },
});

// 监听编辑器变化
onMounted(() => {});

const clearSelectedFormat = () => {
  console.log("Clear selected format");
};

const handleTextBold = () => {
  console.log("Handle text bold");
};

const handleTextItalic = () => {
  console.log("Handle text italic");
};

const handleTextUnderline = () => {
  console.log("Handle text underline");
};

const handleTextStrike = () => {
  console.log("Handle text strike");
};

const handleTextBulletList = () => {
  console.log("Handle text bullet list");
};

const handleTextOrderedList = () => {
  console.log("Handle text ordered list");
};

const handleTextIndent = () => {
  console.log("Handle text indent");
};

const handleTextOutdent = () => {
  console.log("Handle text outdent");
};

const handleTextHorizontalRule = () => {
  console.log("Handle text horizontal rule");
};

const handleTextBlockquote = () => {
  console.log("Handle text blockquote");
};

/**
 * ########################
 * ###### 图片上传 #########
 * ########################
 */
const imageInput = ref(null);
const openImageUpload = () => {
  imageInput.value?.click();
};

const insertImage = (url) => {
  if (!editor.value || !url) return;
  editor.value.chain().focus().setImage({ src: url }).run();
};

const handleImageSelect = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 先插入 base64 作为占位（即时显示）
  const reader = new FileReader();
  reader.onload = (event) => {
    const base64 = event.target.result;
    insertImage(base64); // 先用 base64 显示
  };
  reader.readAsDataURL(file);

  // 同时开始上传，成功后替换为真实 URL
  try {
    // 替换当前选中的图片（如果是刚插入的 base64 图）
  } catch (err) {
    console.error("上传失败", err);
    // 可选：提示用户失败
  }

  // 清空 input
  e.target.value = "";
};
/**
 * ########################
 * ###### 图片上传 #########
 * ########################
 */
</script>

<style lang="scss" scoped>
.toolbar {
  user-select: none;
  flex: 0 0 auto;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
}
</style>
