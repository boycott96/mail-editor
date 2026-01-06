<template>
  <div class="email-editor">
    <!-- 工具栏 -->
    <Toolbar />
    <!-- 编辑器内容 -->
    <editor-content />
  </div>
</template>

<script setup>
import Toolbar from "./Toolbar.vue";
import EditorContent from "./EditorContent.vue";

// Props 定义
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.email-editor {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 铺满屏幕 */
  max-width: 800px;
  margin: 0 auto;
}
</style>
